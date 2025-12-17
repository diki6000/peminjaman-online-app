import React from "react";
import "./Step3.css";

function Step3_Confirmation({ applicationData, loanPackage, rekeningList }) {
  const selectedRekening = rekeningList.find(
    (rekening) => rekening.id === applicationData.rekening_pengguna_id
  );

  return (
    <div className="confirmation-container">
      <h3 className="heading-3" style={{ textAlign: "center" }}>
        Step 3: Review & Konfimasi
      </h3>
      <p
        className="body-text"
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Please review all the details below. This is the final step before
        submitting. Tolong review semua detail dibawah. Langkah ini merupakan
        langkah terakhir sebelum pengajuan
      </p>

      <div className="details-box">
        {/* --- Loan Details Section --- */}
        <div className="details-section">
          <h4 className="details-heading">Detail Pinjaman</h4>
          <ul className="details-list">
            <li className="detail-item">
              <span>Paket</span>
              <span>{loanPackage?.nama_paket || "N/A"}</span>
            </li>
            <li className="detail-item">
              <span>Banyak Pinjaman</span>
              <span>
                Rp{" "}
                {Number(applicationData.nominal_pinjaman).toLocaleString(
                  "id-ID"
                )}
              </span>
            </li>
            <li className="detail-item">
              <span>Tujuan</span>
              <span>{applicationData.tujuan_pinjaman}</span>
            </li>
          </ul>
        </div>

        {/* --- Disbursement Account Section --- */}
        <div className="details-section">
          <h4 className="details-heading">Akun Pencairan</h4>
          {selectedRekening ? (
            <ul className="details-list">
              <li className="detail-item">
                <span>Bank / Provider</span>
                <span>{selectedRekening.nama_provider}</span>
              </li>
              <li className="detail-item">
                <span>Nomor Akun</span>
                <span>{selectedRekening.nomor_rekening}</span>
              </li>
              <li className="detail-item">
                <span>Pemilik Akun</span>
                <span>{selectedRekening.nama_pemilik_rekening}</span>
              </li>
            </ul>
          ) : (
            <p className="detail-error">
              Tidak ada akun pencairan yang dipilih
            </p>
          )}
        </div>
      </div>

      <p className="confirmation-terms">
        Dengan mengajukan pinjaman, kamu telah mengkonfirmasi bahwa informasi di
        atas adalah benar dan kamu setuju dengan{" "}
        <a href="#">Syarat dan Ketentuan</a> kita
      </p>
    </div>
  );
}

export default Step3_Confirmation;
