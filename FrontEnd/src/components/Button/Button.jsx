// src/components/Button/Button.jsx
import React from "react";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  type = "button",
  className = "",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
}) {
  const buttonClass = `
    button 
    button-${variant} 
    button-${size} 
    ${fullWidth ? "button-full-width" : ""}
    ${loading ? "button-loading" : ""}
    ${className}
  `.trim();

  const renderIcon = () => {
    if (loading) {
      return (
        <svg className="button-icon button-spinner" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="15.708"
            strokeDashoffset="15.708"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="2s"
              values="0 31.416;15.708 15.708;0 31.416"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="2s"
              values="0;-15.708;-31.416"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      );
    }

    if (Icon) {
      return <Icon className="button-icon" />;
    }

    return null;
  };

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {iconPosition === "left" && renderIcon()}
      {children && <span>{children}</span>}
      {iconPosition === "right" && renderIcon()}
    </button>
  );
}

// Pre-built icon components (you can expand this)
export const Icons = {
  CreditCard: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),

  ArrowRight: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </svg>
  ),

  Check: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),

  Download: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),

  Eye: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),

  Plus: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),

  User: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),

  Lock: (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
};

export default Button;
