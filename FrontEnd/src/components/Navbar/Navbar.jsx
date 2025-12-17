import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import api from "../../api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error(
        "Logout API call failed, but logging out on client.",
        error
      );
    } finally {
      localStorage.removeItem("authToken");

      setIsLoggedIn(false);
      setIsDropdownOpen(false);

      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="Icon/logo.svg" alt="" />
          <span>PinDar</span>
        </NavLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/paket-kredit"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Ajukan Pinjaman
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/my-loans"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Pinjaman Anda
            </NavLink>
          )}
        </div>

        <div className="navbar-account">
          {isLoggedIn ? (
            <div className="account-menu">
              <button onClick={toggleDropdown} className="account-button">
                Account
                <svg
                  className={`chevron-icon ${isDropdownOpen ? "open" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <NavLink
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <Button variant="primary">Login</Button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
