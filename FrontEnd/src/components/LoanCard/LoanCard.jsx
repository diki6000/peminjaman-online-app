// src/components/LoanCard/LoanCard.jsx (FINAL CORRECTED VERSION)

import React from "react";
import "./LoanCard.css";
import Button from "../Button/Button";

function LoanCard({ paket, isApplyDisabled, onApplyClick }) {
  return (
    <div className="loan-card">
      <h3 className="loan-card-title">{paket.nama_paket}</h3>
      <p className="loan-card-description">{paket.deskripsi}</p>

      <ul className="loan-card-details">
        <li>
          <strong>Angsuran:</strong> {paket.banyak_angsuran} months
        </li>
        <li>
          <strong>Bunga Pokok:</strong> {paket.bunga_persen}% per month
        </li>
        <li>
          <strong>Denda :</strong> Rp{" "}
          {Number(paket.denda_flat).toLocaleString()}
        </li>
      </ul>

      <div className="loan-card-action">
        <Button
          variant="outline"
          size="medium"
          fullWidth
          // The button is disabled if the user has an active loan.
          disabled={isApplyDisabled}
          // When clicked, it always calls the parent's handler function.
          onClick={() => onApplyClick(paket.id)}
        >
          Ajukan
        </Button>
      </div>
    </div>
  );
}

export default LoanCard;
