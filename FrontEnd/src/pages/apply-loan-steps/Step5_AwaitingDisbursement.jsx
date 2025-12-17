import React from "react";
import { useNavigate } from "react-router-dom";
import { StatusIcon } from "../../components/SharedStatusComponents/SharedStatusComponents";
import Button from "../../components/Button/Button";
import "./StatusScreen.css";

function Step5_AwaitingDisbursement() {
  const navigate = useNavigate();

  return (
    <div className="status-screen-container">
      <StatusIcon status="pending" />
      <h2 className="status-title">Menunggu Pencairan</h2>
      <p className="status-message">
        kamu telah mencetujuan pinjaman kamu. Dana akan segera kami proses dan
        transfer ke rekenin pencairan yang kamu pilih
      </p>
      <div className="status-actions">
        <Button
          onClick={() => navigate("/my-loans")}
          variant="primary"
          size="large"
        >
          Lihat Pinjaman Anda
        </Button>
      </div>
    </div>
  );
}

export default Step5_AwaitingDisbursement;
