import React, { useState, useEffect, useCallback } from "react";
import api from "../../../api";
import Button from "../../../components/Button/Button";
import {
  ApproveLoanModal,
  RejectLoanModal,
  DisburseLoanModal,
  LoanDetailsModal,
} from "./LoanActionModel";
import "./AdminLoanManagementPage.css";

// A small component for status badges
const StatusBadge = ({ status }) => (
  <span className={`status-badge status-${status?.toLowerCase()}`}>
    {status?.replace("_", " ") || "Tidak Diketahui"}
  </span>
);

function AdminLoanManagementPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const [actionLoading, setActionLoading] = useState(false);
  const [loanToApprove, setLoanToApprove] = useState(null);
  const [loanToReject, setLoanToReject] = useState(null);
  const [loanToDisburse, setLoanToDisburse] = useState(null);
  const [loanToView, setLoanToView] = useState(null);

  const fetchLoans = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/pinjamans?page=${page}`);
      setLoans(response.data.data);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch loans.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  const handleApiCall = async (apiFunction) => {
    setActionLoading(true);
    try {
      await apiFunction();
      setLoanToApprove(null);
      setLoanToReject(null);
      setLoanToDisburse(null);
      fetchLoans(pagination.current_page);
    } catch (err) {
      console.error(
        "API Action Failed:",
        err.response?.data?.message || err.message
      );
      alert(
        `Action failed: ${err.response?.data?.message || "An error occurred."}`
      );
    } finally {
      setActionLoading(false);
    }
  };

  const renderActionButtons = (loan) => {
    return (
      <>
        {loan.status_pinjaman?.nama_status !== "PENDING_REVIEW" &&
          loan.status_pinjaman?.nama_status !== "MENUNGGU_PENCAIRAN" && (
            <Button
              variant="secondary"
              size="small"
              onClick={() => setLoanToView(loan)}
            >
              Details
            </Button>
          )}

        {loan.status_pinjaman?.nama_status === "PENDING_REVIEW" && (
          <>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setLoanToView(loan)}
            >
              Details
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setLoanToApprove(loan)}
            >
              Terima
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={() => setLoanToReject(loan)}
            >
              Tolak
            </Button>
          </>
        )}

        {loan.status_pinjaman?.nama_status === "MENUNGGU_PENCAIRAN" && (
          <>
            <Button
              variant="secondary"
              size="small"
              onClick={() => setLoanToView(loan)}
            >
              Detail
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setLoanToDisburse(loan)}
            >
              Cairkan
            </Button>
          </>
        )}
      </>
    );
  };

  if (loading && !loans.length) return <div>Loading Loans...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <h1>Managemen Pinjaman</h1>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Id</th>
              <th>Peminjam</th>
              <th>Nominal</th>
              <th>Paket</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan?.id || "N/A"}</td>
                <td>{loan.user_id}</td>
                <td>{loan.user?.nama_lengkap || "N/A"}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(loan.nominal_pinjaman)}
                </td>
                <td>{loan.paket_kredit?.nama_paket || "N/A"}</td>
                <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                <td>
                  <StatusBadge status={loan.status_pinjaman?.nama_status} />
                </td>
                <td className="actions-cell">{renderActionButtons(loan)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loanToApprove && (
        <ApproveLoanModal
          loan={loanToApprove}
          onClose={() => setLoanToApprove(null)}
          loading={actionLoading}
          apiCall={(id, data) =>
            handleApiCall(() =>
              api.patch(`/admin/pinjamans/${id}/approve-terms`, data)
            )
          }
          onSuccess={() => {}}
        />
      )}
      {loanToReject && (
        <RejectLoanModal
          loan={loanToReject}
          onClose={() => setLoanToReject(null)}
          loading={actionLoading}
          apiCall={(id, data) =>
            handleApiCall(() =>
              api.patch(`/admin/pinjamans/${id}/reject`, data)
            )
          }
          onSuccess={() => {}}
        />
      )}
      {loanToDisburse && (
        <DisburseLoanModal
          loan={loanToDisburse}
          onClose={() => setLoanToDisburse(null)}
          loading={actionLoading}
          apiCall={(id) =>
            handleApiCall(() => api.patch(`/admin/pinjamans/${id}/disburse`))
          }
          onSuccess={() => {}}
        />
      )}
      {loanToView && (
        <LoanDetailsModal
          loan={loanToView}
          onClose={() => setLoanToView(null)}
        />
      )}
    </div>
  );
}

export default AdminLoanManagementPage;
