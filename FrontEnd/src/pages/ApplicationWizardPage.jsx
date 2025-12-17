import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

import "./ApplicationWizardPage.css";

import Step1_FillDetails from "./apply-loan-steps/Step1_FillDetails";
import Step2_SelectAccount from "./apply-loan-steps/Step2_SelectAccount";
import Step3_Confirmation from "./apply-loan-steps/Step3_Confirmation";
import Step4_PendingReview from "./apply-loan-steps/Step4_PendingReview";
import Step5_AwaitingDisbursement from "./apply-loan-steps/Step5_AwaitingDisbursement";
import RejectedScreen from "./apply-loan-steps/RejectedScreen";
import ApprovedOfferScreen from "./apply-loan-steps/ApprovedOfferScreen";

import Button, { Icons } from "../components/Button/Button";
import ProgressTracker from "../components/ProgressTracker/ProgressTracker";
import AddAccountModal from "../components/AddAccountModal/AddAccountModal";

const getStepFromStatus = (status) => {
  switch (status) {
    case "PENDING_REVIEW":
      return 4;
    case "DISETUJUI":
      return 3.5;
    case "MENUNGGU_PENCAIRAN":
      return 5;
    case "DITOLAK":
      return -1;
    default:
      return 6;
  }
};

function ApplicationWizardPage() {
  const navigate = useNavigate();
  const { pinjamanId, paketId } = useParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [loanPackage, setLoanPackage] = useState(null);
  const [kreditInfo, setKreditInfo] = useState(null);
  const [rekeningList, setRekeningList] = useState([]);
  const [rekeningLoading, setRekeningLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState({
    nominal_pinjaman: "",
    tujuan_pinjaman: "",
    rekening_pengguna_id: "",
  });

  const [loanData, setLoanData] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);

  const fetchRekeningList = useCallback(async () => {
    setRekeningLoading(true);
    try {
      const response = await api.get("/rekening-pengguna");
      setRekeningList(response.data.filter((r) => r.is_active));
    } catch (err) {
      console.error("Failed to load bank accounts", err);
      // Optionally set an error state here if you have one
    } finally {
      setRekeningLoading(false);
    }
  }, []);

  useEffect(() => {
    if (paketId) {
      setApplicationData((prevData) => ({ ...prevData, paket_id: paketId }));
    }
  }, [paketId]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      if (pinjamanId) {
        try {
          const response = await api.get(`/pinjamans/${pinjamanId}`);
          setLoanData(response.data);
          setCurrentStep(
            getStepFromStatus(response.data.status_pinjaman.nama_status)
          );
        } catch (err) {
          console.error("Failed to fetch existing loan", err);
          navigate("/paket-kredit");
        }
      } else if (paketId) {
        try {
          const [packageResponse, kreditInfoResponse] = await Promise.all([
            api.get(`/paket-kredit/${paketId}`),
            api.get("/user/kredit-info"),
          ]);
          setLoanPackage(packageResponse.data);
          setKreditInfo(kreditInfoResponse.data);
        } catch (error) {
          console.error("Failed to fetch initial application data", error);
          alert("Could not load application details.");
          navigate("/paket-kredit");
        }
      }
      setIsLoading(false);
    };

    fetchInitialData();
  }, [pinjamanId, paketId, navigate]);

  useEffect(() => {
    if (currentStep === 2) {
      fetchRekeningList();
    }
  }, [currentStep, fetchRekeningList]);

  useEffect(() => {
    // Only run this logic if we have an existing loan
    if (pinjamanId && loanData) {
      const status = loanData.status_pinjaman.nama_status;

      // List of statuses that have a dedicated screen in the wizard
      const wizardStatuses = [
        "PENDING_REVIEW",
        "DISETUJUI",
        "MENUNGGU_PENCAIRAN",
        "DITOLAK",
      ];

      // If the loan's status is NOT one of the wizard statuses, navigate away.
      if (!wizardStatuses.includes(status)) {
        navigate("/my-loans", { replace: true });
      }
    }
  }, [pinjamanId, loanData, navigate]); // This effect runs when these values change

  const STEPS = [
    { number: 1, title: "Detail Pinjaman" },
    { number: 2, title: "Akun Pencairan" },
    { number: 3, title: "Ajukan" },
    { number: 4, title: "Peninjauan" },
    { number: 5, title: "Pencairan" },
  ];

  const handleAccountAdded = () => {
    setIsAddAccountModalOpen(false); // Close the modal
    fetchRekeningList(); // And refresh the account list
  };

  const handleNext = () =>
    currentStep < 3 ? setCurrentStep((prev) => prev + 1) : handleSubmit();
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const handleCancel = () => {
    if (window.confirm("Are you sure?")) navigate("/paket-kredit");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        paket_kredit_id: parseInt(applicationData.paket_id, 10),
        nominal_pinjaman: Number(applicationData.nominal_pinjaman),
        tujuan_pinjaman: applicationData.tujuan_pinjaman,
        rekening_pengguna_id: parseInt(
          applicationData.rekening_pengguna_id,
          10
        ),
      };
      const response = await api.post("/pinjamans", payload);
      const newLoanId = response.data.data.id;
      navigate(`/pinjamans/${newLoanId}`, { replace: true });
    } catch (err) {
      console.error("Failed to submit application:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfferAction = async (actionType) => {
    setActionInProgress(true);
    try {
      await api.patch(`/pinjamans/${pinjamanId}/${actionType}`);
      const response = await api.get(`/pinjamans/${pinjamanId}`);
      setLoanData(response.data);
      setCurrentStep(
        getStepFromStatus(response.data.status_pinjaman.nama_status)
      );
    } catch (err) {
      alert(`Failed to ${actionType.replace("-", " ")}.`);
    } finally {
      setActionInProgress(false);
    }
  };

  const isStepValid = () => {
    if (!loanPackage || !kreditInfo) return false;
    switch (currentStep) {
      case 1:
        return (
          Number(applicationData.nominal_pinjaman) >= 100000 &&
          Number(applicationData.nominal_pinjaman) <=
            kreditInfo.limit_pinjaman_maksimal &&
          applicationData.tujuan_pinjaman.trim() !== ""
        );
      case 2:
        return !!applicationData.rekening_pengguna_id;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderWizardContent = () => {
    if (!pinjamanId && paketId) {
      switch (currentStep) {
        case 1:
          return (
            <Step1_FillDetails
              applicationData={applicationData}
              handleChange={handleChange}
              maxLimit={kreditInfo.limit_pinjaman_maksimal}
            />
          );
        case 2:
          return (
            <Step2_SelectAccount
              applicationData={applicationData}
              handleChange={handleChange}
              rekeningList={rekeningList}
              rekeningLoading={rekeningLoading}
              onAddNewAccount={() => setIsAddAccountModalOpen(true)}
            />
          );
        case 3:
          return (
            <Step3_Confirmation
              applicationData={applicationData}
              loanPackage={loanPackage}
              rekeningList={rekeningList}
            />
          );
        default:
          return null;
      }
    }

    if (pinjamanId && loanData) {
      const status = loanData.status_pinjaman.nama_status;
      switch (status) {
        case "PENDING_REVIEW":
          return <Step4_PendingReview />;
        case "DISETUJUI":
          return (
            <ApprovedOfferScreen
              pinjaman={loanData}
              onAction={handleOfferAction}
              loading={actionInProgress}
            />
          );
        case "MENUNGGU_PENCAIRAN":
          return <Step5_AwaitingDisbursement />;
        case "DITOLAK":
          return <RejectedScreen pinjaman={loanData} />;
        default:
          return null;
      }
    }

    return null;
  };

  if (isLoading) {
    return <div className="loading">Loading Pinjaman...</div>;
  }

  return (
    <div className="wizard-background">
      <div className="wizard-container">
        <div className="wizard-header">
          <h2 className="heading-2">
            {loanData
              ? `Status Pengajuan`
              : `Pengajuan Pinjaman: ${loanPackage?.nama_paket}`}
          </h2>
          <ProgressTracker steps={STEPS} currentStep={currentStep} />
        </div>

        <div className="wizard-content">{renderWizardContent()}</div>

        {currentStep > 0 && currentStep <= 3 && (
          <div className="wizard-actions">
            <Button variant="ghost" onClick={handleCancel}>
              Batal
            </Button>
            <div className="wizard-actions-right">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Sebelumnya
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isSubmitting}
                loading={isSubmitting}
                icon={currentStep === 3 ? Icons.Check : Icons.ArrowRight}
                iconPosition="right"
              >
                {currentStep === 3 ? "Ajukan Pinjaman" : "Langkah Selanjutnya"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <AddAccountModal
        isOpen={isAddAccountModalOpen}
        onClose={() => setIsAddAccountModalOpen(false)}
        onSuccess={handleAccountAdded}
      />
    </div>
  );
}

export default ApplicationWizardPage;
