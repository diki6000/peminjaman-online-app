import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import Button, { Icons } from "../components/Button/Button";
import "./LoanStatusPage.css";

const formatCurrency = (amount) => {
  return `Rp ${Number(amount).toLocaleString("id-ID")}`;
};

function LoanStatusPage() {
  const { pinjamanId } = useParams();
  const navigate = useNavigate();

  const [pinjaman, setPinjaman] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  const fetchLoanStatus = async () => {
    try {
      const response = await api.get(`/pinjamans/${pinjamanId}`);
      setPinjaman(response.data);
    } catch (err) {
      setError(
        "Failed to load loan details. It might not exist or you may not have permission."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanStatus();
  }, [pinjamanId]);

  const handleAction = async (actionType) => {
    setActionInProgress(true);
    try {
      await api.patch(`/pinjamans/${pinjamanId}/${actionType}`);
      fetchLoanStatus();
    } catch (err) {
      alert(`Failed to ${actionType.replace("-", " ")}.`);
    } finally {
      setActionInProgress(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading loan status...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!pinjaman) {
    return <div className="error">No loan data found.</div>;
  }

  const { status_pinjaman, paket_kredit, angsurans } = pinjaman;

  const renderContentByStatus = () => {
    const statusName = status_pinjaman.nama_status;

    switch (statusName) {
      case "DISETUJUI":
        const approvedAmount = Number(pinjaman.nominal_disetujui);
        const requestedAmount = Number(pinjaman.nominal_pinjaman);
        const isAmountChanged = approvedAmount !== requestedAmount;

        return (
          <>
            <StatusCard
              status="approved"
              title="Offer Approved!"
              message="Our admin has reviewed your application. Please review the final terms and accept the offer to proceed."
            />
            <div className="details-grid">
              <div
                className={`comparison-box ${isAmountChanged ? "changed" : ""}`}
              >
                <h4>You Requested</h4>
                <p>{formatCurrency(requestedAmount)}</p>
              </div>
              <div className="comparison-box approved">
                <h4>We Approved</h4>
                <p>{formatCurrency(approvedAmount)}</p>
              </div>
            </div>
            {pinjaman.catatan_admin && (
              <div className="admin-notes">
                <strong>Admin Notes:</strong> {pinjaman.catatan_admin}
              </div>
            )}
            <div className="action-buttons">
              <Button
                onClick={() => handleAction("accept-offer")}
                disabled={actionInProgress}
                loading={actionInProgress}
                variant="secondary"
                size="large"
              >
                Accept Offer
              </Button>
              <Button
                onClick={() => handleAction("cancel-offer")}
                disabled={actionInProgress}
                variant="danger"
              >
                Decline Offer
              </Button>
            </div>
          </>
        );

      case "DITOLAK":
        return (
          <StatusCard
            status="rejected"
            title="Application Rejected"
            message={`Reason: ${
              pinjaman.catatan_admin || "No reason provided."
            }`}
          />
        );

      case "BERJALAN":
        return (
          <>
            <StatusCard
              status="active"
              title="Loan is Active"
              message="Your loan has been disbursed and the payment schedule is now active. Please make payments on time to avoid penalties."
            />
            <PaymentSchedule angsurans={angsurans} />
          </>
        );

      default:
        const statusMap = {
          PENDING_REVIEW: {
            status: "pending",
            title: "Application Pending",
            message:
              "Your application has been submitted and is currently waiting for admin review.",
          },
          MENUNGGU_PENCAIRAN: {
            status: "pending",
            title: "Awaiting Disbursement",
            message:
              "You have accepted the offer. Please wait for the funds to be transferred to your account.",
          },
          DIBATALKAN: {
            status: "cancelled",
            title: "Offer Cancelled",
            message: "You have declined or cancelled this loan offer.",
          },
          SELESAI: {
            status: "completed",
            title: "Loan Completed",
            message: "This loan has been fully paid off. Congratulations!",
          },
        };
        const details = statusMap[statusName] || {
          status: "unknown",
          title: "Unknown Status",
          message: "The loan status is not recognized.",
        };
        return <StatusCard {...details} />;
    }
  };

  return (
    <div className="status-page-container">
      <div className="status-header">
        <div>
          <h2 className="heading-2">{paket_kredit.nama_paket}</h2>
          <p className="body-text">
            Applied on:{" "}
            {new Date(pinjaman.created_at).toLocaleDateString("en-GB")}
          </p>
        </div>
        <StatusBadge status={status_pinjaman.nama_status} />
      </div>
      <div className="status-content">{renderContentByStatus()}</div>
    </div>
  );
}

const StatusCard = ({ status, title, message }) => (
  <div className={`status-card ${status}`}>
    <h3 className="heading-3">{title}</h3>
    <p>{message}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const formattedStatus = status.replace("_", " ").toLowerCase();
  return (
    <div className={`status-badge ${status.toLowerCase()}`}>
      {formattedStatus}
    </div>
  );
};

const PaymentSchedule = ({ angsurans }) => (
  <div className="schedule-container">
    <h3 className="heading-3">Payment Schedule</h3>
    <table className="payment-schedule-table">
      <thead>
        <tr>
          <th>Installment</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {angsurans.map((angsuran) => (
          <tr key={angsuran.id}>
            <td>{angsuran.angsuran_ke}</td>
            <td>
              {new Date(angsuran.tanggal_jatuh_tempo).toLocaleDateString(
                "en-GB"
              )}
            </td>
            <td>
              {formatCurrency(
                Number(angsuran.jumlah_pokok) + Number(angsuran.jumlah_bunga)
              )}
            </td>
            <td>
              <StatusBadge status={angsuran.status_angsuran.nama_status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LoanStatusPage;
