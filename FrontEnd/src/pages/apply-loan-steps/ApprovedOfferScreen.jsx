import React from "react";
import { StatusIcon } from "../../components/SharedStatusComponents/SharedStatusComponents";
import Button from "../../components/Button/Button";
import "./StatusScreen.css";

const formatCurrency = (amount) =>
  `Rp ${Number(amount).toLocaleString("id-ID")}`;

function ApprovedOfferScreen({ pinjaman, onAction, loading }) {
  const approvedAmount = Number(pinjaman.nominal_disetujui);
  const requestedAmount = Number(pinjaman.nominal_pinjaman);
  const isAmountChanged = approvedAmount !== requestedAmount;

  return (
    <div className="status-screen-container">
      <StatusIcon status="approved" />
      <h2 className="status-title">Selamat! Pengajuan diterima.</h2>
      <p className="status-message">
        Tolong review detail di bawah dan terima untuk melanjutkan ke pencairan
      </p>

      <div className="comparison-grid">
        <div className={`comparison-box ${isAmountChanged ? "changed" : ""}`}>
          <h4>Kamu Meminta</h4>
          <p>{formatCurrency(requestedAmount)}</p>
        </div>
        <div className="comparison-box approved">
          <h4>Kita Menyetujui</h4>
          <p>{formatCurrency(approvedAmount)}</p>
        </div>
      </div>

      {pinjaman.catatan_admin && (
        <div className="admin-notes-box">
          <strong>Catatan :</strong> {pinjaman.catatan_admin}
        </div>
      )}

      <div className="status-actions">
        <Button
          onClick={() => onAction("accept-offer")}
          disabled={loading}
          loading={loading}
          variant="secondary"
          size="large"
        >
          Terima & Lanjutkan
        </Button>
        <Button
          onClick={() => onAction("cancel-offer")}
          disabled={loading}
          variant="ghost"
        >
          Tolak
        </Button>
      </div>
    </div>
  );
}

export default ApprovedOfferScreen;
