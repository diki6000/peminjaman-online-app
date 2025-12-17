import React from "react";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../../components/SharedStatusComponents/SharedStatusComponents";
import Button from "../../components/Button/Button";
import "./StatusScreen.css";

function RejectedScreen({ pinjaman }) {
  const navigate = useNavigate();

  return (
    <div className="status-screen-container">
      <StatusIcon status="rejected" />
      <h2 className="status-title">Pengajuan Tidak Disetujui</h2>
      <p className="status-message">
        {pinjaman.catatan_admin && (
          <div className="admin-notes-box">
            <strong>Catatan :</strong> {pinjaman.catatan_admin}
          </div>
        )}
      </p>
      <div className="status-actions">
        <Button
          onClick={() => navigate("/paket-kredit")}
          variant="primary"
          size="large"
        >
          Lihat Paket Pinjaman Lain
        </Button>
      </div>
    </div>
  );
}

export default RejectedScreen;
