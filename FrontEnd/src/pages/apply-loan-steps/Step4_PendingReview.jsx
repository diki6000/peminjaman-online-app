import React from "react";
import { Link } from "react-router-dom";
import { StatusIcon } from "../../components/SharedStatusComponents/SharedStatusComponents";
import "./StatusScreen.css";
import Button from "../../components/Button/Button";

function Step4_PendingReview() {
  return (
    <>
      <div className="status-screen-container">
        <StatusIcon status="pending" />
        <h2 className="status-title">Pengajuan Sedang Dalam Tinjauan</h2>
        <p className="status-message">
          Pengajuan pinjaman kamu telah berhasil dikirim. Tim kami sedan
          meninjau detail pinjaman, tolong tunggu dalam kurun waktu 24 hingga
          tinjauan selesai
        </p>
      </div>
      <div className="Back-Button">
        <Link to="/my-loans" className="back-link">
          <Button size="small" variant="outline">
            Home
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Step4_PendingReview;
