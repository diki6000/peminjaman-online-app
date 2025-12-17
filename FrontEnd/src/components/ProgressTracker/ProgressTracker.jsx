import React from "react";
import "./ProgressTracker.css";

function ProgressTracker({ steps, currentStep }) {
  const getStepStatus = (stepNumber) => {
    if (currentStep === -1) {
      if (stepNumber < 4) return "completed";
      if (stepNumber === 4) return "active";
      return "upcoming";
    }

    if (currentStep === 3.5) {
      if (stepNumber < 4) return "completed";
      if (stepNumber === 4) return "active";
      return "upcoming";
    }

    if (currentStep > stepNumber) {
      return "completed";
    }
    if (currentStep === stepNumber) {
      return "active";
    }

    return "upcoming";
  };

  return (
    <div className="progress-tracker">
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(step.number);
        const connectorStatus = getStepStatus(step.number);

        return (
          <React.Fragment key={step.number}>
            {index > 0 && (
              <div
                className={`step-connector ${
                  connectorStatus !== "upcoming" ? "completed" : ""
                }`}
              />
            )}

            <div className="step-item">
              <div className={`step-circle ${stepStatus}`}>
                {stepStatus === "completed" ? "✔" : step.number}
              </div>
              <div className={`step-title ${stepStatus}`}>{step.title}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ProgressTracker;
