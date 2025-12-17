// src/pages/Admin/AdminUserManagementPage.jsx

import React, { useState, useEffect } from "react";
import api from "../../../api";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Form/Input";
import "./AdminUserManagementPage.css";

// Helper components (can be reused from other pages or defined here)
const StatusBadge = ({ status }) => {
  const formattedStatus = status.replace("_", " ").toLowerCase();
  return (
    <div className={`status-badge ${status.toLowerCase()}`}>
      {formattedStatus}
    </div>
  );
};

// Assuming you have an InfoRow component for consistency
const InfoRow = ({ label, children }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    <div className="info-value-wrapper">{children}</div>
  </div>
);

function AdminUserManagementPage() {
  const [users, setUsers] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the verification modal
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [selectedUserForVerification, setSelectedUserForVerification] =
    useState(null);
  const [isFetchingUserDetails, setIsFetchingUserDetails] = useState(false); // For loading state of modal details
  const [isUpdatingUserStatus, setIsUpdatingUserStatus] = useState(false); // For Verify/Deny buttons
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
  });

  // --- Fetch Users (Main Table Data) ---
  const fetchUsers = async (url = "/admin/users") => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(url);
      setUsers(response.data.data);
      const { data, ...pagination } = response.data;
      setPaginationInfo(pagination);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleReviewClick = async (user) => {
    setSelectedUserForVerification(user);
    setIsVerificationModalOpen(true); // Open modal
    setIsFetchingUserDetails(true); // Start loading details

    try {
      const response = await api.get(`/admin/users/${user.id}`);
      setSelectedUserForVerification(response.data); // Replace with full details
    } catch (err) {
      console.error("Failed to fetch user verification details:", err);
      setModalMessage({
        isOpen: true,
        title: "Error",
        message:
          "Failed to load user details for verification. Please try again.",
        isError: true,
      });
      setIsVerificationModalOpen(false); // Close modal if details can't be loaded
    } finally {
      setIsFetchingUserDetails(false);
    }
  };

  // --- Handle Verify/Reject Action ---
  const handleUpdateUserStatus = async (status) => {
    if (!selectedUserForVerification) return;

    setIsUpdatingUserStatus(true);
    try {
      const response = await api.patch(
        `/admin/users/${selectedUserForVerification.id}/update-verification`,
        { status }
      );
      setModalMessage({
        isOpen: true,
        title: "Success",
        message: response.data.message || `User status updated to ${status}.`,
        isError: false,
      });
      setIsVerificationModalOpen(false); // Close the verification modal
      fetchUsers(); // Refresh the user list to show updated status
    } catch (err) {
      console.error("Failed to update user status:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to update user status. Please try again.";
      setModalMessage({
        isOpen: true,
        title: "Error",
        message: errorMessage,
        isError: true,
      });
    } finally {
      setIsUpdatingUserStatus(false);
    }
  };

  // Render Guards
  if (isLoading) {
    return <div className="loading">Loading Users...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-page-container">
      <h1 className="heading-1">User Management</h1>
      <p className="body-text">
        Manage user accounts and verification statuses.
      </p>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Credit Score</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data-message">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nama_lengkap}</td>
                  <td>{user.email}</td>
                  <td>{user.no_hp}</td>
                  <td>{user.kredit_skor}</td>
                  <td>{user.role?.nama_role || "N/A"}</td>
                  <td>
                    <StatusBadge
                      status={user.status_pengguna?.nama_status || "N/A"}
                    />
                  </td>
                  <td className="actions-cell">
                    {user.status_pengguna?.nama_status ===
                      "PENDING_VERIFICATION" && (
                      <Button
                        size="small"
                        onClick={() => handleReviewClick(user)}
                      >
                        Review
                      </Button>
                    )}
                    {user.status_pengguna?.nama_status !==
                      "PENDING_VERIFICATION" && (
                      <Button
                        size="small"
                        variant="outline"
                        onClick={() => handleReviewClick(user)}
                      >
                        View Details
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {paginationInfo && paginationInfo.last_page > 1 && (
        <div className="pagination-controls">
          <Button
            onClick={() => fetchUsers(paginationInfo.prev_page_url)}
            disabled={!paginationInfo?.prev_page_url}
          >
            Previous
          </Button>
          <span>
            Page {paginationInfo.current_page} of {paginationInfo.last_page}
          </span>
          <Button
            onClick={() => fetchUsers(paginationInfo.next_page_url)}
            disabled={!paginationInfo?.next_page_url}
          >
            Next
          </Button>
        </div>
      )}

      <Modal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        title={`Review User: ${
          selectedUserForVerification?.nama_lengkap || ""
        }`}
      >
        {isFetchingUserDetails ? (
          <div className="loading">Loading user details...</div>
        ) : selectedUserForVerification ? (
          <div className="user-details-modal-content">
            <h3>General Information</h3>
            <div className="info-grid">
              <InfoRow label="Full Name">
                {selectedUserForVerification.nama_lengkap}
              </InfoRow>
              <InfoRow label="Email">
                {selectedUserForVerification.email}
              </InfoRow>
              <InfoRow label="Phone Number">
                {selectedUserForVerification.no_hp}
              </InfoRow>
              <InfoRow label="Credit Score">
                {selectedUserForVerification.kredit_skor}
              </InfoRow>
              <InfoRow label="Current Status">
                <StatusBadge
                  status={
                    selectedUserForVerification.status_pengguna?.nama_status ||
                    "N/A"
                  }
                />
              </InfoRow>
            </div>

            <h3 style={{ marginTop: "20px" }}>Verification Data</h3>
            <div className="info-grid">
              {/* --- NEW: Direct rendering of label/value pairs for 2-column layout --- */}
              <div>
                <span className="info-label">KTP Number</span>
                <span
                  className={`info-value ${
                    !selectedUserForVerification.no_ktp ? "placeholder" : ""
                  }`}
                >
                  {selectedUserForVerification.no_ktp || "N/A"}
                </span>
              </div>
              <div>
                <span className="info-label">Mother's Maiden Name</span>
                <span
                  className={`info-value ${
                    !selectedUserForVerification.nama_ibu_kandung
                      ? "placeholder"
                      : ""
                  }`}
                >
                  {selectedUserForVerification.nama_ibu_kandung || "N/A"}
                </span>
              </div>
              <div>
                <span className="info-label">NPWP Number</span>
                <span
                  className={`info-value ${
                    !selectedUserForVerification.npwp ? "placeholder" : ""
                  }`}
                >
                  {selectedUserForVerification.npwp || "N/A"}
                </span>
              </div>
              <div>
                <span className="info-label">Emergency Contact</span>
                <span
                  className={`info-value ${
                    !selectedUserForVerification.no_hp_darurat
                      ? "placeholder"
                      : ""
                  }`}
                >
                  {selectedUserForVerification.no_hp_darurat || "N/A"}
                </span>
              </div>
              <div style={{ gridColumn: "1 / span 2" }}>
                {" "}
                {/* This spans both columns */}
                <span className="info-label">Full Address</span>
                <span
                  className={`info-value ${
                    !selectedUserForVerification.alamat ? "placeholder" : ""
                  }`}
                >
                  {selectedUserForVerification.alamat || "N/A"}
                </span>
              </div>
            </div>

            {/* ... (Verification Actions and Close button remain unchanged) ... */}
            {selectedUserForVerification.status_pengguna?.nama_status ===
              "PENDING_VERIFICATION" && (
              <div className="modal-actions" style={{ marginTop: "20px" }}>
                <Button
                  variant="danger"
                  onClick={() => handleUpdateUserStatus("REJECTED")}
                  disabled={isUpdatingUserStatus}
                  loading={isUpdatingUserStatus}
                >
                  Deny Verification
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleUpdateUserStatus("VERIFIED")}
                  disabled={isUpdatingUserStatus}
                  loading={isUpdatingUserStatus}
                >
                  Verify User
                </Button>
              </div>
            )}
            {selectedUserForVerification.status_pengguna?.nama_status !==
              "PENDING_VERIFICATION" && (
              <div className="modal-actions" style={{ marginTop: "20px" }}>
                <p className="body-text">
                  Verification status has been processed.
                </p>
              </div>
            )}
          </div>
        ) : (
          <p>No user selected or details failed to load.</p>
        )}
        {/* Close button for all paths */}
        {!isFetchingUserDetails && (
          <div className="modal-actions" style={{ marginTop: "20px" }}>
            <Button
              variant="outline"
              onClick={() => setIsVerificationModalOpen(false)}
            >
              Close
            </Button>
          </div>
        )}
      </Modal>

      {/* Generic Message Modal (for success/error from update) */}
      <Modal
        isOpen={modalMessage.isOpen}
        onClose={() => setModalMessage({ ...modalMessage, isOpen: false })}
        title={modalMessage.title}
      >
        <div className="submission-modal-content">
          <p className={modalMessage.isError ? "error-text" : ""}>
            {modalMessage.message}
          </p>
          <div className="modal-actions">
            <Button
              variant="primary"
              onClick={() =>
                setModalMessage({ ...modalMessage, isOpen: false })
              }
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminUserManagementPage;
