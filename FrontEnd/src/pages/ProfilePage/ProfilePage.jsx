import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Form/Input";
import "./ProfilePage.css";

const InfoRow = ({ label, children }) => (
  <div className="info-row">
    <span className="info-label">{label}</span>
    <div className="info-value-wrapper">{children}</div>
  </div>
);

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationData, setVerificationData] = useState({
    no_ktp: "",
    nama_ibu_kandung: "",
    npwp: "",
    no_hp_darurat: "",
    alamat: "",
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [accountToDeleteId, setAccountToDeleteId] = useState(null);
  const [accountTypes, setAccountTypes] = useState([]);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [isAccountsLoading, setIsAccountsLoading] = useState(true);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    jenis_rekening_id: "1",
    nama_provider: "",
    nomor_rekening: "",
    nama_pemilik_rekening: "",
  });

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isSubmittingPersonalInfo, setIsSubmittingPersonalInfo] =
    useState(false);
  const [personalInfoData, setPersonalInfoData] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
  });

  const [modalContent, setModalContent] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
  });

  const [kreditInfo, setKreditInfo] = useState(null);

  const startDeleteProcess = (accountId) => {
    setAccountToDeleteId(accountId);
    setIsConfirmDeleteModalOpen(true);
  };

  const fetchUserProfile = useCallback(async () => {
    try {
      const [userResponse, kreditInfoResponse] = await Promise.all([
        api.get("/user"),
        api.get("/user/kredit-info"),
      ]);

      const userData = userResponse.data.user;
      const kreditData = kreditInfoResponse.data;

      setUser(userData);
      setKreditInfo(kreditData);

      setPersonalInfoData({
        nama_lengkap: userData.nama_lengkap || "",
        email: userData.email || "",
        no_hp: userData.no_hp || "",
      });
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      setError("Could not load your profile. Please try again later.");
    }
  }, []);

  const handlePersonalInfoEditToggle = () => {
    setIsEditingPersonalInfo((prev) => !prev);
    if (isEditingPersonalInfo) {
      setPersonalInfoData({
        nama_lengkap: user.nama_lengkap || "",
        email: user.email || "",
        no_hp: user.no_hp || "",
      });
    }
  };

  const fetchSavedAccounts = useCallback(async () => {
    setIsAccountsLoading(true);
    try {
      const response = await api.get("/rekening-pengguna");
      setSavedAccounts(response.data);
    } catch (err) {
      console.error("Failed to fetch saved accounts", err);
    } finally {
      setIsAccountsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchSavedAccounts();
    }
  }, [user, fetchSavedAccounts]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfoData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const loadPageData = async () => {
      setIsLoading(true);
      await fetchUserProfile();
      setIsLoading(false);
    };
    loadPageData();
  }, [fetchUserProfile]);

  useEffect(() => {
    api
      .get("/jenis-rekenings")
      .then((response) => {
        setAccountTypes(response.data);
      })
      .catch((err) => console.error("Failed to fetch account types", err));
  }, []);

  const handleAddAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAccountSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let submissionSucceeded = false;

    try {
      const payload = {
        ...newAccountData,
        jenis_rekening_id: parseInt(newAccountData.jenis_rekening_id, 10),
      };

      await api.post("/rekening-pengguna", payload);

      submissionSucceeded = true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to add account. Please check your details.";
      setModalContent({
        isOpen: true,
        title: "Submission Failed",
        message: errorMessage,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }

    if (submissionSucceeded) {
      setModalContent({
        isOpen: true,
        title: "Success",
        message: "Your new account has been saved successfully.",
        isError: false,
      });

      setIsAddAccountModalOpen(false);
      fetchSavedAccounts();
    }
  };

  const handleDeleteAccount = async () => {
    if (!accountToDeleteId) return;

    let deletionSucceeded = false;

    try {
      await api.delete(`/rekening-pengguna/${accountToDeleteId}`);

      deletionSucceeded = true;
    } catch (err) {
      setModalContent({
        isOpen: true,
        title: "Deletion Failed",
        message: "There was an error deleting the account.",
        isError: true,
      });
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setAccountToDeleteId(null);
    }

    if (deletionSucceeded) {
      setModalContent({
        isOpen: true,
        title: "Account Deleted",
        message: "The account has been successfully removed.",
        isError: false,
      });

      fetchSavedAccounts();
    }
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingPersonalInfo(true);

    let submissionSucceeded = false;

    try {
      await api.patch("/user/profile", personalInfoData);

      submissionSucceeded = true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      setModalContent({
        isOpen: true,
        title: "Update Failed",
        message: errorMessage,
        isError: true,
      });
    } finally {
      setIsSubmittingPersonalInfo(false);
    }

    if (submissionSucceeded) {
      setModalContent({
        isOpen: true,
        title: "Success",
        message: "Your profile has been updated.",
        isError: false,
      });

      setIsEditingPersonalInfo(false);

      fetchUserProfile();
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setVerificationData({
        no_ktp: user.no_ktp || "",
        nama_ibu_kandung: user.nama_ibu_kandung || "",
        npwp: user.npwp || "",
        no_hp_darurat: user.no_hp_darurat || "",
        alamat: user.alamat || "",
      });
    }
  };
  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setVerificationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/user/submit-verification", verificationData);
      setModalContent({
        isOpen: true,
        title: "Submission Successful",
        message:
          "Your verification data has been submitted and is now under review by our team.",
        isError: false,
      });

      setIsEditing(false);
      fetchUserProfile();
    } catch (err) {
      console.error("Verification submission failed", err);

      const errorMessage =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setModalContent({
        isOpen: true,
        title: "Submission Failed",
        message: errorMessage,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading Profile...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!user || !kreditInfo)
    return <div className="error">Data User tidak ditemukan.</div>;

  const status = user.status_pengguna?.nama_status;

  const isVerified = status === "VERIFIED";
  const isPending = status === "PENDING_VERIFICATION";
  const isRejected = status === "REJECTED";
  const isUnverified = status === "UNVERIFIED";

  const canEdit = status === "REJECTED";

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <div className="profile-back">
          <Link to="/" className="back-link">
            <Button size="small">Back</Button>
          </Link>
        </div>
        <div className="profile-avatar">{user.nama_lengkap.charAt(0)}</div>
        <div className="profile-header-info">
          <h1 className="heading-1">{user.nama_lengkap}</h1>
          <div className="profile-header-info-detail">
            <div className="tier-badge">{kreditInfo.nama_tingkat_kredit}</div>
            <div
              className={`status-tag ${isVerified ? "verified" : "unverified"}`}
            >
              <p>{user.status_pengguna?.nama_status || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="verification-banner info">
          <p>
            Verifikasi data kamu telah di kirim dan sedang dalam di tinjau oleh
            tim kami
          </p>
        </div>
      )}

      {isRejected && !isEditing && (
        <div className="verification-banner danger">
          <p>
            Verifikasi kamu sebelunya tidak diterima. Tolong tinjau dan kirim
            ulang data verifikasi anda
          </p>
        </div>
      )}

      {isUnverified && !isEditing && (
        <div className="verification-banner">
          <p>
            Akun Kamu Tidak terverifikasi. Verifikasikan akun kamu untuk
            mengajukan pinjamman
          </p>
          <Button onClick={handleEditToggle} variant="secondary">
            Verifikasi Sekarang
          </Button>
        </div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <div>
            <h3 className="section-title">Informasi Kredit</h3>
          </div>
          <div className="info-grid">
            <InfoRow label="Credit Skor">
              <span className="info-value">{user.kredit_skor}</span>
            </InfoRow>

            <InfoRow label="Batas Pinjaman">
              <span className="info-value">
                Rp{" "}
                {Number(kreditInfo.limit_pinjaman_maksimal).toLocaleString(
                  "id-ID"
                )}
              </span>
            </InfoRow>
            <InfoRow label="Maksimal Pinjaman Aktif">
              <span className="info-value">
                {kreditInfo.maksimal_pinjaman_aktif}
              </span>
            </InfoRow>
          </div>
        </div>
        <div className="profile-section">
          <div className="section-header-editable">
            <div>
              <h3 className="section-title">Informasi Pribadi</h3>
            </div>
            <Button
              onClick={handlePersonalInfoEditToggle}
              variant={isEditingPersonalInfo ? "outline" : "primary"}
            >
              {isEditingPersonalInfo ? "Cancel" : "Edit Info"}
            </Button>
          </div>

          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="info-grid">
              <InfoRow label="Full Name">
                {isEditingPersonalInfo ? (
                  <Input
                    type="text"
                    name="nama_lengkap"
                    value={personalInfoData.nama_lengkap}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                ) : (
                  <span className="info-value">{user.nama_lengkap}</span>
                )}
              </InfoRow>

              <InfoRow label="Email Address">
                {isEditingPersonalInfo ? (
                  <Input
                    type="email"
                    name="email"
                    value={personalInfoData.email}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                ) : (
                  <span className="info-value">{user.email}</span>
                )}
              </InfoRow>

              <InfoRow label="Phone Number">
                {isEditingPersonalInfo ? (
                  <Input
                    type="text"
                    name="no_hp"
                    value={personalInfoData.no_hp}
                    onChange={handlePersonalInfoChange}
                    required
                  />
                ) : (
                  <span className="info-value">{user.no_hp}</span>
                )}
              </InfoRow>
            </div>

            {isEditingPersonalInfo && (
              <div className="form-submit-action">
                <Button
                  type="submit"
                  variant="secondary"
                  size="large"
                  loading={isSubmittingPersonalInfo}
                  disabled={isSubmittingPersonalInfo}
                >
                  Simpan Perubahan
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-section">
          <div className="section-header-editable">
            <div>
              <h3 className="section-title">Data Verifikasi</h3>
              <p className="section-subtitle">
                Data pribadi ini hanya diggunakan untuk mengamankan akun kamu.
              </p>
            </div>

            {canEdit && (
              <Button
                onClick={handleEditToggle}
                variant={isEditing ? "outline" : "primary"}
              >
                {isEditing ? "Cancel" : "Edit Data"}
              </Button>
            )}
          </div>

          <form onSubmit={handleVerificationSubmit}>
            <div className="info-grid">
              <InfoRow label="No KTP">
                {isEditing ? (
                  <Input
                    type="text"
                    name="no_ktp"
                    value={verificationData.no_ktp}
                    onChange={handleVerificationChange}
                    placeholder="16-digit No KTP"
                    required
                  />
                ) : (
                  <span
                    className={`info-value ${!user.no_ktp && "placeholder"}`}
                  >
                    {user.no_ktp || "Belum Ada"}
                  </span>
                )}
              </InfoRow>

              <InfoRow label="Nama Ibu Kandung">
                {isEditing ? (
                  <Input
                    type="text"
                    name="nama_ibu_kandung"
                    value={verificationData.nama_ibu_kandung}
                    onChange={handleVerificationChange}
                    placeholder="Nama Lengkap Ibu Kandung"
                    required
                  />
                ) : (
                  <span
                    className={`info-value ${
                      !user.nama_ibu_kandung && "placeholder"
                    }`}
                  >
                    {user.nama_ibu_kandung || "Belum Ada"}
                  </span>
                )}
              </InfoRow>

              <InfoRow label="NPWP">
                {isEditing ? (
                  <Input
                    type="text"
                    name="npwp"
                    value={verificationData.npwp}
                    onChange={handleVerificationChange}
                    placeholder="15-digit NPWP"
                  />
                ) : (
                  <span className={`info-value ${!user.npwp && "placeholder"}`}>
                    {user.npwp || "Belum Ada"}
                  </span>
                )}
              </InfoRow>

              <InfoRow label="Kontak Darurat">
                {isEditing ? (
                  <Input
                    type="text"
                    name="no_hp_darurat"
                    value={verificationData.no_hp_darurat}
                    onChange={handleVerificationChange}
                    placeholder="0812..."
                    required
                  />
                ) : (
                  <span
                    className={`info-value ${
                      !user.no_hp_darurat && "placeholder"
                    }`}
                  >
                    {user.no_hp_darurat || "Belum Ada"}
                  </span>
                )}
              </InfoRow>

              <InfoRow label="Alamat Lengkap">
                {isEditing ? (
                  <textarea
                    name="alamat"
                    value={verificationData.alamat}
                    onChange={handleVerificationChange}
                    placeholder="Alamat Lengkap"
                    className="form-control-textarea"
                    rows="3"
                    required
                  ></textarea>
                ) : (
                  <span
                    className={`info-value ${!user.alamat && "placeholder"}`}
                  >
                    {user.alamat || "Belum Ada"}
                  </span>
                )}
              </InfoRow>
            </div>

            {isEditing && (
              <div className="form-submit-action">
                <Button
                  type="submit"
                  variant="secondary"
                  size="large"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isRejected
                    ? "Resubmit for Verification"
                    : "Submit for Verification"}
                </Button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-section">
          <div className="section-header-editable">
            <h3 className="section-title">Akun Pencairan Dana</h3>
            <Button onClick={() => setIsAddAccountModalOpen(true)}>
              + Tambahkan Akun Baru
            </Button>
          </div>

          {isAccountsLoading ? (
            <div className="loading">Loading accounts...</div>
          ) : (
            <div className="accounts-list">
              {savedAccounts.length > 0 ? (
                savedAccounts.map((acc) => (
                  <div key={acc.id} className="account-card">
                    <div>
                      <strong className="account-provider">
                        {acc.nama_provider}
                      </strong>
                      <p className="account-number">
                        {acc.nomor_rekening} ({acc.nama_pemilik_rekening})
                      </p>
                    </div>
                    <Button
                      onClick={() => startDeleteProcess(acc.id)}
                      variant="danger"
                      size="small"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p>Kamu belum memiliki akun.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalContent.isOpen}
        onClose={() => setModalContent({ ...modalContent, isOpen: false })}
        title={modalContent.title}
      >
        <div className="submission-modal-content">
          <p className={modalContent.isError ? "error-text" : ""}>
            {modalContent.message}
          </p>
          <div className="modal-actions">
            <Button
              variant="primary"
              onClick={() =>
                setModalContent({ ...modalContent, isOpen: false })
              }
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        title="Tambahkan Akun Pencairan Dana"
      >
        <form onSubmit={handleAddAccountSubmit}>
          <div className="form-group">
            <label htmlFor="jenis_rekening_id" className="form-label">
              Tipe Akun
            </label>
            <select
              id="jenis_rekening_id"
              name="jenis_rekening_id"
              value={newAccountData.jenis_rekening_id}
              onChange={handleAddAccountChange}
              className="form-control"
              required
            >
              {accountTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nama_jenis}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Nama Bank/Provider  (BCA, GoPay, ..)"
            name="nama_provider"
            value={newAccountData.nama_provider}
            onChange={handleAddAccountChange}
            required
          />
          <Input
            label="Nomor akun"
            name="nomor_rekening"
            value={newAccountData.nomor_rekening}
            onChange={handleAddAccountChange}
            required
          />
          <Input
            label="Nama Pemilik Akun"
            name="nama_pemilik_rekening"
            value={newAccountData.nama_pemilik_rekening}
            onChange={handleAddAccountChange}
            required
          />
          <div className="modal-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddAccountModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Simpan Account
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        title="Konfirmasi Penghapusan"
      >
        <div className="confirmation-modal-content">
          <p>Apakah kamu yakin akan menghapus akun ini?</p>
          <div className="modal-actions">
            <Button
              variant="outline"
              onClick={() => setIsConfirmDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Ya, Hapus Akun
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProfilePage;
