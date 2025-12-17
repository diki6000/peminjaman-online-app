import React from "react";
import "./Form.css";

function Input({ label, id, error, ...rest }) {
  const hasError = !!error;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`form-control ${hasError ? "is-invalid" : ""}`}
        {...rest}
      />
      {hasError && <p className="form-error-text">{error}</p>}
    </div>
  );
}

export default Input;
