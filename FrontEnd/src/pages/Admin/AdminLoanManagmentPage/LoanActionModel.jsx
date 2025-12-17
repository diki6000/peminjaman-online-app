import React, { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import Button from "../../../components/Button/Button";
import "./AdminLoanManagementPage.css";
export const ApproveLoanModal = ({
  loan,
  onClose,
  onSuccess,
  loading,
  apiCall,
}) => {
  const [formData, setFormData] = useState({
    nominal_disetujui: loan?.nominal_pinjaman || "",
    catatan_admin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // The apiCall function will be passed from the parent to handle the actual API request
    await apiCall(loan.id, formData);
    onSuccess(); // This will close the modal and refresh data in the parent
  };

  return (
    <Modal isOpen={!!loan} onClose={onClose} title="Approve Loan Terms">
      <p>
        <strong>kamu akan menyetujui Pinjaman untuk </strong>.
      </p>
      <div className="form-group">
        <label htmlFor="nominal_disetujui"></label>
        <input
          type="number"
          name="nominal_disetujui"
          id="nominal_disetujui"
          value={formData.nominal_disetujui}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="catatan_admin">Nota Admin (Optional)</label>
        <textarea
          name="catatan_admin"
          id="catatan_admin"
          value={formData.catatan_admin}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit} loading={loading}>
          Setujui
        </Button>
      </div>
    </Modal>
  );
};

// --- 2. Reject Loan Modal ---
export const RejectLoanModal = ({
  loan,
  onClose,
  onSuccess,
  loading,
  apiCall,
}) => {
  const [catatan_admin, setCatatanAdmin] = useState("");

  const handleSubmit = async () => {
    await apiCall(loan.id, { catatan_admin });
    onSuccess();
  };

  return (
    <Modal isOpen={!!loan} onClose={onClose} title="Reject Loan Application">
      <p>
        <strong>Kamu akan menolak ajuan pinjaman</strong>.
      </p>
      <div className="form-group">
        <label htmlFor="catatan_admin">Alasan Penolakan (Harus)</label>
        <textarea
          name="catatan_admin"
          id="catatan_admin"
          value={catatan_admin}
          onChange={(e) => setCatatanAdmin(e.target.value)}
          rows="4"
          required
        />
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleSubmit}
          loading={loading}
          disabled={!catatan_admin.trim()}
        >
          Kofirmasi Penolakan
        </Button>
      </div>
    </Modal>
  );
};

// --- 3. Disburse Loan Modal ---
export const DisburseLoanModal = ({
  loan,
  onClose,
  onSuccess,
  loading,
  apiCall,
}) => {
  const handleSubmit = async () => {
    await apiCall(loan.id);
    onSuccess();
  };

  return (
    <Modal isOpen={!!loan} onClose={onClose} title="Confirm Loan Disbursement">
      <div className="delete-confirmation">
        <p>
          Apakah kamu yakin ingin mencairkan{" "}
          <strong>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(loan?.nominal_disetujui)}
          </strong>{" "}
          to <strong>{loan?.user?.nama}</strong>?
        </p>
        <p>Pencairan ini akan mengaktifkan peminjaman.</p>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Batal
        </Button>
        <Button variant="primary" onClick={handleSubmit} loading={loading}>
          Ya, Cairkan Dana
        </Button>
      </div>
    </Modal>
  );
};

export const LoanDetailsModal = ({ loan, onClose }) => {
  if (!loan) return null;
  const destinationAccount = loan.rekening_pengguna
    ? `${loan.rekening_pengguna.nama_provider} - ${
        loan.rekening_pengguna.nomor_rekening
      } (${loan.rekening_pengguna.jenis_rekening?.nama_jenis || "N/A"})`
    : "Not Set";
  return (
    <Modal
      isOpen={!!loan}
      onClose={onClose}
      title={`Details for Loan #${loan.id}`}
    >
      <div className="loan-details-grid">
        <span>Applicant:</span>{" "}
        <strong>
          {loan.user?.nama} ({loan.user?.email})
        </strong>
        <span>Status:</span>{" "}
        <strong>{loan.status_pinjaman?.nama_status.replace("_", " ")}</strong>
        <span>Package:</span> <strong>{loan.paket_kredit?.nama_paket}</strong>
        <span>Amount Requested:</span>{" "}
        <strong>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(loan.nominal_pinjaman)}
        </strong>
        <span>Amount Approved:</span>{" "}
        <strong>
          {loan.nominal_disetujui
            ? new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(loan.nominal_disetujui)
            : "N/A"}
        </strong>
        <span>Angsuran:</span>{" "}
        <strong>{loan.paket_kredit?.banyak_angsuran} Bulan</strong>
        <span>Bunga:</span> <strong>{loan.paket_kredit?.bunga_persen}%</strong>
        <span>Tujuan:</span> <p>{loan.tujuan_pinjaman}</p>
        <span>Rekening:</span>{" "}
        <strong>
          {loan.rekening_pengguna
            ? `${loan.rekening_pengguna.jenis_rekening.nama_jenis} - ${loan.rekening_pengguna.nomor_rekening}`
            : "Not Set"}
        </strong>
        <span>Catatan Admin:</span> <p>{loan.catatan_admin || "None"}</p>
        <span>Tanggal Pengajuan:</span>{" "}
        <strong>{new Date(loan.created_at).toLocaleString()}</strong>
      </div>
      <div className="form-actions">
        <Button variant="secondary" onClick={onClose}>
          tutup
        </Button>
      </div>
    </Modal>
  );
};
