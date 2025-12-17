import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import Button from "../../components/Button/Button";
import "./MyLoanPage.css";

const StatusBadge = ({ status }) => {
  const formattedStatus = status.replace("_", " ").toLowerCase();
  return (
    <div className={`status-badge ${status.toLowerCase()}`}>
      {formattedStatus}
    </div>
  );
};

const formatCurrency = (amount) =>
  `Rp ${Number(amount).toLocaleString("id-ID")}`;

function MyLoansPage() {
  const [loans, setLoans] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLoans = async (url = "/pinjamans") => {
    setIsLoading(true);
    try {
      const response = await api.get(url);
      setLoans(response.data.data);
      const { data, ...pagination } = response.data;
      setPaginationInfo(pagination);
    } catch (err) {
      console.error("Failed to fetch loans", err);
      setError("Could not load your loans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  if (isLoading) return <div className="loading">Loading Your Loans...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-loans-page">
      <div className="page-header">
        <h1 className="heading-1">Pinjaman Anda</h1>
      </div>

      {loans.length === 0 ? (
        <div className="no-loans-message">
          <p>You have no active or past loans.</p>
          <Link to="/paket-kredit">
            <Button variant="primary">Apply for a New Loan</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="loan-list">
            {loans.map((loan) => {
              const isLoanRunning =
                loan.status_pinjaman.nama_status === "BERJALAN";
              const destinationUrl = isLoanRunning
                ? `/my-installments/${loan.id}`
                : `/pinjamans/${loan.id}`;
              return (
                <Link
                  to={`${destinationUrl}`}
                  key={loan.id}
                  className="loan-summary-card"
                >
                  <div className="card-header">
                    <h3>{loan.paket_kredit.nama_paket}</h3>
                    <StatusBadge status={loan.status_pinjaman.nama_status} />
                  </div>
                  <div className="card-body">
                    <div>
                      <span>Total Utang</span>
                      <p>{formatCurrency(loan.total_hutang)}</p>
                    </div>
                    <div>
                      <span>Sisa Utang</span>
                      <p>{formatCurrency(loan.sisa_hutang)}</p>
                    </div>
                    <div>
                      <span>Jatu Tempo Selanjutnya</span>
                      <p>
                        {loan.tanggal_jatuh_tempo_berikutnya
                          ? new Date(
                              loan.tanggal_jatuh_tempo_berikutnya
                            ).toLocaleDateString("en-GB")
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="pagination-controls">
            <Button
              onClick={() => fetchLoans(paginationInfo.prev_page_url)}
              disabled={!paginationInfo?.prev_page_url}
            >
              Previous
            </Button>
            <span>
              Page {paginationInfo.current_page} of {paginationInfo.last_page}
            </span>
            <Button
              onClick={() => fetchLoans(paginationInfo.next_page_url)}
              disabled={!paginationInfo?.next_page_url}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyLoansPage;
