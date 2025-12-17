// src/components/Form/RadioCard.jsx (or wherever you placed it)

import React from "react";
import "./RadioCard.css";

function RadioCard({ id, name, value, checked, onChange, children }) {
  // --- THE FIX IS HERE ---
  // We create a `className` string. It always has "radio-card".
  // If the `checked` prop is true, we add " is-checked" to the end.
  const cardClassName = `radio-card ${checked ? "is-checked" : ""}`.trim();

  return (
    <label htmlFor={id} className={cardClassName}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-card-input"
      />
      <div className="radio-card-content">{children}</div>
    </label>
  );
}

export default RadioCard;
