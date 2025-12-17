import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import RadioCard from "../../components/RadioCard/RadioCard";
import "./InstallmentPage.css";

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

const getInstallmentState = (angsuran) => {
  const status = angsuran.status_angsuran.nama_status;

  if (status === "LUNAS") {
    return "PAID";
  }

  if (status === "TERLAMBAT") {
    return "OVERDUE_PAYABLE";
  }

  if (status === "BELUM_DIBAYAR") {
    const now = new Date();
    const dueDate = new Date(angsuran.tanggal_jatuh_tempo);
    const paymentWindowStart = new Date(
      dueDate.getFullYear(),
      dueDate.getMonth(),
      1
    );

    if (now >= paymentWindowStart) {
      return "PAYABLE";
    } else {
      return "UPCOMING";
    }
  }

  return "UNKNOWN";
};

const Receipt = ({ transaction, points }) => {
  if (!transaction) return null;
  return (
    <div className="receipt-content">
      {points && (
        <div className="points-reward-banner">
          Selamat! Kamu Mendapatkan <strong>+{points} Kredit Poin!</strong>
        </div>
      )}
      <ul className="receipt-details">
        <li>
          <span>Transaksi ID : </span>
          <strong>{transaction.id}</strong>
        </li>
        <li>
          <span>Tanggal Transaksi : </span>
          <strong>
            {new Date(transaction.tanggal_transaksi).toLocaleString("en-GB")}
          </strong>
        </li>
        <li>
          <span>Jumlah Transaksi : </span>
          <strong>{formatCurrency(transaction.jumlah_transaksi)}</strong>
        </li>
        <li>
          <span>Pembayaran Ke : </span>
          <strong>{transaction.kanal_pembayaran?.nama_kanal || "N/A"}</strong>
        </li>
      </ul>
    </div>
  );
};

function InstallmentPage() {
  const { pinjamanId } = useParams();
  const navigate = useNavigate();

  const [loanDetails, setLoanDetails] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAngsuran, setSelectedAngsuran] = useState(null);

  const [paymentChannels, setPaymentChannels] = useState([]);
  const [isChannelsLoading, setIsChannelsLoading] = useState(false);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);
  const [receiptToView, setReceiptToView] = useState(null);

  const fetchDetails = async () => {
    try {
      const [loanResponse, installmentsResponse] = await Promise.all([
        api.get(`/pinjamans/${pinjamanId}`),
        api.get(`/pinjamans/${pinjamanId}/angsurans`),
      ]);
      setLoanDetails(loanResponse.data);
      setInstallments(installmentsResponse.data);
    } catch (err) {
      console.error("Failed to fetch installment details", err);
      setError("Could not load details for this loan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllDetails = async () => {
      setIsLoading(true);
      try {
        const [loanResponse, installmentsResponse] = await Promise.all([
          api.get(`/pinjamans/${pinjamanId}`),
          api.get(`/pinjamans/${pinjamanId}/angsurans`),
        ]);
        setLoanDetails(loanResponse.data);
        setInstallments(installmentsResponse.data);
      } catch (err) {
        console.error("Failed to fetch installment details", err);
        setError("Could not load details for this loan.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDetails();
  }, [pinjamanId]);

  useEffect(() => {
    if (isPaymentModalOpen && paymentChannels.length === 0) {
      setIsChannelsLoading(true);
      api
        .get("/kanal-pembayarans")
        .then((response) => {
          setPaymentChannels(response.data);
        })
        .catch((err) => console.error("Failed to fetch payment channels", err))
        .finally(() => setIsChannelsLoading(false));
    }
  }, [isPaymentModalOpen]);

  const handlePayClick = (angsuran) => {
    setSelectedAngsuran(angsuran);
    setSelectedChannelId(null);
    setIsPaymentModalOpen(true);
  };

  const handleViewReceipt = async (angsuran) => {
    const mockReceipt = {
      id: `MOCK-${angsuran.id}`,
      tanggal_transaksi: angsuran.updated_at,
      jumlah_transaksi:
        Number(angsuran.jumlah_pokok) +
        Number(angsuran.jumlah_bunga) +
        Number(angsuran.jumlah_denda),
      kanal_pembayaran: { nama_kanal: "Mock Channel" },
    };
    setReceiptToView(mockReceipt);
  };

  const handleConfirmPayment = async () => {
    if (!selectedChannelId) {
      alert("Tolong Pilih kanal pembayaran.");
      return;
    }

    setIsPaying(true);
    try {
      const payload = {
        kanal_pembayaran_id: selectedChannelId,
      };
      const response = await api.post(
        `/angsurans/${selectedAngsuran.id}/pay`,
        payload
      );
      const {
        data: updatedLoan,
        transaction_history,
        points_added,
      } = response.data;

      setLoanDetails(updatedLoan);
      setInstallments(updatedLoan.angsurans);

      setIsPaymentModalOpen(false);

      setPaymentSuccessData({
        history: transaction_history,
        points: points_added,
      });
    } catch (err) {
      console.error("pembayaran gagal", err);
      alert(err.response?.data?.message || "Pembayaran. Tolong Coba Lagi.");
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading)
    return <div className="loading">Loading detail angsuran...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!loanDetails) return null;

  return (
    <>
      <div className="installment-detail-page">
        <div className="page-header">
          <div className="profile-back-link-wrapper">
            <Link to="/my-loans" className="back-link">
              <Button variant="outline" size="small">
                Back
              </Button>
            </Link>
          </div>
          <div className="header-info">
            <h1 className="heading-1">{loanDetails.paket_kredit.nama_paket}</h1>
            <p className="body-text">
              Total Hutang: {formatCurrency(loanDetails.total_hutang)} | Sisa:{" "}
              <strong style={{ color: "var(--primary)" }}>
                {formatCurrency(loanDetails.sisa_hutang)}
              </strong>
            </p>
          </div>
          <StatusBadge status={loanDetails.status_pinjaman.nama_status} />
        </div>

        <div className="installment-table-container">
          <table className="installment-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Bulan</th>
                <th>Jatuh Tempo</th>
                <th>Nominal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {installments
                .sort((a, b) => a.angsuran_ke - b.angsuran_ke)
                .map((angsuran) => {
                  const state = getInstallmentState(angsuran);
                  const isPayable =
                    state === "PAYABLE" || state === "OVERDUE_PAYABLE";

                  let amountToDisplay =
                    Number(angsuran.jumlah_pokok) +
                    Number(angsuran.jumlah_bunga);
                  if (state === "OVERDUE_PAYABLE") {
                    amountToDisplay += Number(angsuran.jumlah_denda);
                  }

                  return (
                    <tr key={angsuran.id}>
                      <td>{angsuran.angsuran_ke}</td>
                      <td className="month-cell">
                        <strong>
                          {new Date(
                            angsuran.tanggal_jatuh_tempo
                          ).toLocaleString("en-US", { month: "long" })}
                        </strong>
                      </td>
                      <td>
                        {new Date(
                          angsuran.tanggal_jatuh_tempo
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        {formatCurrency(amountToDisplay)}
                        {state === "OVERDUE_PAYABLE" && (
                          <span className="penalty-indicator"> (+ denda)</span>
                        )}
                      </td>
                      <td>
                        <StatusBadge
                          status={angsuran.status_angsuran.nama_status}
                        />
                      </td>
                      <td className="action-cell">
                        {isPayable && (
                          <Button
                            onClick={() => handlePayClick(angsuran)}
                            size="small"
                          >
                            Pay Now
                          </Button>
                        )}
                        {state === "UPCOMING" && (
                          <div className="upcoming-indicator">Not Yet Due</div>
                        )}
                        {state === "PAID" && (
                          <Button
                            variant="outline"
                            size="small"
                            onClick={() => handleViewReceipt(angsuran)}
                          >
                            View Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={`Bayar Angsuran #${selectedAngsuran?.angsuran_ke}`}
      >
        <div className="payment-modal-content">
          <div className="payment-summary">
            <span>Nominal Bayar:</span>
            <strong>
              {formatCurrency(
                selectedAngsuran
                  ? Number(selectedAngsuran.jumlah_pokok) +
                      Number(selectedAngsuran.jumlah_bunga) +
                      (getInstallmentState(selectedAngsuran) ===
                      "OVERDUE_PAYABLE"
                        ? Number(selectedAngsuran.jumlah_denda)
                        : 0)
                  : 0
              )}
            </strong>
          </div>

          <h4 className="payment-channels-title">Pilih Kanal Pembayaran</h4>

          {isChannelsLoading ? (
            <div className="loading">Loading Kanal...</div>
          ) : (
            <div className="payment-channels-list">
              {paymentChannels.map((channel) => (
                <RadioCard
                  key={channel.id}
                  id={`channel-${channel.id}`}
                  name="payment_channel"
                  value={channel.id}
                  checked={selectedChannelId === channel.id}
                  onChange={() => setSelectedChannelId(channel.id)}
                >
                  <div className="channel-details">
                    <strong className="channel-name">
                      {channel.nama_kanal}
                    </strong>
                    <p className="channel-info">
                      {channel.nomor_rekening} ({channel.nama_pemilik_rekening})
                    </p>
                  </div>
                </RadioCard>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <Button
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handleConfirmPayment}
              disabled={!selectedChannelId || isPaying}
              loading={isPaying}
            >
              Konfirmasi Pembayaran
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!paymentSuccessData}
        onClose={() => setPaymentSuccessData(null)}
        title="Pembayaran Berhasil!"
      >
        <Receipt
          transaction={paymentSuccessData?.history}
          points={paymentSuccessData?.points}
        />
        <div className="modal-actions">
          <Button variant="primary" onClick={() => setPaymentSuccessData(null)}>
            Close
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={!!receiptToView}
        onClose={() => setReceiptToView(null)}
        title="Payment Receipt"
      >
        <Receipt transaction={receiptToView} />
        <div className="modal-actions">
          <Button variant="primary" onClick={() => setReceiptToView(null)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default InstallmentPage;
