import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import LoanCard from "../../components/LoanCard/LoanCard";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import "./PaketKreditPage.css";

function PaketKreditPage() {
  const navigate = useNavigate();

  const [paketKredit, setPaketKredit] = useState([]);
  const [userLoans, setUserLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [kreditInfo, setKreditInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [
          paketResponse,
          userLoansResponse,
          userResponse,
          kreditInfoResponse,
        ] = await Promise.all([
          api.get("/paket-kredit"),
          api.get("/pinjamans"),
          api.get("/user"),
          api.get("/user/kredit-info"),
        ]);

        const activePakets = paketResponse.data.filter(
          (paket) => paket.is_active
        );
        setPaketKredit(activePakets);
        setUserLoans(userLoansResponse.data.data || userLoansResponse.data);
        setUserStatus(userResponse.data.user.status_pengguna.nama_status);
        setKreditInfo(kreditInfoResponse.data);
      } catch (err) {
        console.error("Failed to fetch page data:", err);
        if (err.response && err.response.status === 401) {
        } else {
          setError("Failed to load page data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const ACTIVE_LOAN_STATUSES = [
    "PENDING_REVIEW",
    "DISETUJUI",
    "MENUNGGU_PENCAIRAN",
    "BERJALAN",
    "MACET",
  ];

  const activeLoanCount = userLoans.filter((loan) =>
    ACTIVE_LOAN_STATUSES.includes(loan.status_pinjaman.nama_status)
  ).length;

  const loanLimit = kreditInfo ? kreditInfo.maksimal_pinjaman_aktif : 0;

  const hasReachedLoanLimit = activeLoanCount >= loanLimit;

  const isApplyDisabled = hasReachedLoanLimit;

  const handleApplyClick = (paketId) => {
    if (userStatus === "VERIFIED") {
      navigate(`/apply-loan/${paketId}`);
    } else {
      setIsVerificationModalOpen(true);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="paket-kredit-page">
        <div className="paket-kredit-page-header">
          <h2 className="heading-2">
            Berikut Pilihan Paket Pinjaman yang kami sediakan
          </h2>
        </div>

        {isApplyDisabled && (
          <div className="active-loan-banner">
            <p>
              Kamu telah mencapai batasan pinjaman aktif sebanyak {loanLimit}{" "}
              pinjaman. Kamu tidak bisa mengajukan pinjaman lagi hingga pinjaman
              yang ada selesai
            </p>
            <Link to="/my-loans">
              <Button variant="secondary">Pinjaman Anda</Button>
            </Link>
          </div>
        )}

        <div className="loan-cards-grid">
          {paketKredit.map((paket) => (
            <LoanCard
              key={paket.id}
              paket={paket}
              isApplyDisabled={isApplyDisabled}
              onApplyClick={handleApplyClick}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={isVerificationModalOpen}
        onClose={() => setIsVerificationModalOpen(false)}
        title="Account Verification Required"
      >
        <div className="verification-modal-content">
          <p>
            Untuk menggajukan pinjaman, akun anda harus terverivikasi terlebih
            dahulu. Tolong verifikasi untuk melanjutkan
          </p>
          <div className="modal-actions">
            <Button
              variant="outline"
              onClick={() => setIsVerificationModalOpen(false)}
            >
              Close
            </Button>
            <Link to="/profile">
              <Button variant="primary">Profile</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PaketKreditPage;
