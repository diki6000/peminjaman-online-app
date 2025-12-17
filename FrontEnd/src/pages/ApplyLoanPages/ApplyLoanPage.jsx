import React, { useState, useEffect } from "react";
import api from "../../api"; // Axios instance
import "./ApplyLoanPage.css";

function ApplyLoanPage() {
  const [paketKredit, setPaketKredit] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaketKredit = async () => {
      try {
        const response = await api.get("/paket-kredit");
        setPaketKredit(response.data);
      } catch (err) {
        setError("Failed to load loan packages.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaketKredit();
  }, []);

  if (isLoading) {
    return <div>Loading available loan packages...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!paketKredit.length) {
    return <div>No loan packages are currently available.</div>;
  }

  return (
    <div>
      <h1>Apply for a Loan</h1>
      <h2>Choose a Loan Package:</h2>

      <div className="loan-list">
        {paketKredit.map((paket) => (
          <div key={paket.id} className="loan-card">
            <h3>{paket.nama_paket}</h3>
            <p>Installments: {paket.banyak_angsuran} months</p>
            <p>Interest: {paket.bunga_persen}%</p>
            <button>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplyLoanPage;
