import React from "react";
import { Link } from "react-router-dom";
import Button, { Icons } from "../../components/Button/Button";
import RadioCard from "../../components/RadioCard/RadioCard";
import "./Step2.css";

function Step2_SelectAccount({
  applicationData,
  handleChange,
  rekeningList,
  rekeningLoading,
  rekeningError,
  onAddNewAccount,
}) {
  const handleSelect = (rekeningId) => {
    handleChange({
      target: {
        name: "rekening_pengguna_id",
        value: rekeningId,
      },
    });
  };

  const handleAddAccount = () => {
    alert("Redirect to Add Account Page or open modal here.");
  };

  if (rekeningLoading) {
    return <div className="step-loading">Loading your accounts...</div>;
  }

  if (rekeningError) {
    return <div className="step-error">{rekeningError}</div>;
  }

  return (
    <div className="select-account-container">
      <h3 className="heading-3" style={{ textAlign: "center" }}>
        Step 2: Where should we send the funds?
      </h3>
      <p
        className="body-text"
        style={{ textAlign: "center", marginBottom: "2.5rem" }}
      >
        This will be the account for disbursement. You can add a new one if
        needed.
      </p>

      <div className="account-list">
        {rekeningList.length > 0 ? (
          rekeningList.map((rekening) => (
            <RadioCard
              key={rekening.id}
              id={`rekening-${rekening.id}`}
              name="rekening_pengguna_id"
              value={rekening.id}
              checked={applicationData.rekening_pengguna_id === rekening.id}
              onChange={() => handleSelect(rekening.id)}
            >
              <div className="account-details">
                <div className="bank-logo">
                  {rekening.nama_provider.substring(0, 1)}
                </div>
                <div>
                  <strong className="account-provider">
                    {rekening.nama_provider}
                  </strong>
                  <p className="account-number">
                    {rekening.nomor_rekening} • {rekening.nama_pemilik_rekening}
                  </p>
                </div>
              </div>
            </RadioCard>
          ))
        ) : (
          <div className="no-accounts-message">
            <p>Kamu Tidak Punya Akun Bank.</p>
          </div>
        )}
      </div>

      <div className="add-account-action">
        <Button variant="ghost" onClick={onAddNewAccount} icon={Icons.Plus}>
          Tambahkan Akun Baru
        </Button>
      </div>
    </div>
  );
}

export default Step2_SelectAccount;
