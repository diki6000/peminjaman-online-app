import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../../api";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input";
import "./AuthPage.css";

// Import the AuthContext
import { AuthContext } from "../../context/AuthContext";

function AuthPage({ isAdminLogin = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Get what we need from the AuthContext ---
  const { login: authContextLogin, isAuthenticated } = useContext(AuthContext);

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    password: "",
    password_confirmation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Effect to determine if we are in 'login' or 'register' mode based on URL
  useEffect(() => {
    if (isAdminLogin) {
      setMode("login");
    } else if (location.pathname === "/register") {
      setMode("register");
    } else {
      setMode("login");
    }
    setError(null);
  }, [location.pathname, isAdminLogin]);

  // --- CORRECTED Effect to redirect if the user is already logged in ---
  useEffect(() => {
    if (isAuthenticated) {
      // 1. Get the user object from localStorage (the most reliable source here)
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      // 2. Check the user's role and navigate accordingly
      if (user?.role?.nama_role === "ADMIN") {
        navigate("/admin/users"); // Redirect admins to their dashboard
      } else {
        navigate("/"); // Redirect all other authenticated users to home
      }
    }
    // The dependency array is correct. This effect runs when auth state changes.
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Your handleLogin function is already correct. No changes needed here.
  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // --- FIX: Always use the single, unified login endpoint ---
      const loginEndpoint = "/login"; // This no longer needs to be conditional

      const response = await api.post(loginEndpoint, {
        email: formData.email,
        password: formData.password,
      });

      // The rest of this logic is already perfect because it checks the role from the response
      const { user, access_token: token } = response.data;

      if (!user || !token) {
        throw new Error("Invalid login response from server.");
      }

      localStorage.setItem("authToken", token);
      authContextLogin(user);

      // This redirection logic now works for both admins and users seamlessly
      if (user?.role?.nama_role === "ADMIN") {
        navigate("/admin/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login Gagal.");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.post("/register", formData);
      alert("Registrasi Berhasil. Tolong login untuk melanjutkan");
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join(" ");
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Registrasi Gagal.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // --- JSX remains the same ---
  return (
    <div className="login-page-container">
      <div className="login-branding-panel">
        <div className="branding-content">
          <Link to="/" className="branding-logo">
            <img src="logo.svg" alt="" />
            <span>PinDar</span>
          </Link>
          <h1 className="branding-title">
            {isAdminLogin
              ? "Admin Access"
              : mode === "login"
              ? "Welcome Back"
              : "Join Us Today"}
          </h1>
          <p className="branding-subtitle">
            {isAdminLogin
              ? "Tolong masuk menggunakan akun admin kamu."
              : mode === "login"
              ? "Akses akun kamu dan kelola pinjamanmu dengan aman."
              : "Registrasikan akun kamu untuk memulai membuat pinjaman."}
          </p>
        </div>
      </div>
      <div className="login-form-panel">
        <div className="form-wrapper">
          <div className="form-header">
            <h2 className="heading-2">
              {isAdminLogin
                ? "Admin Login"
                : mode === "login"
                ? "Masuk Ke Akun Kamu"
                : "Buat Akun Baru"}
            </h2>
            {!isAdminLogin && (
              <p className="body-text">
                {mode === "login" ? "Tidak Punya Akun? " : "Sudah Punya Akun? "}
                <Link
                  to={mode === "login" ? "/register" : "/login"}
                  className="form-link"
                >
                  {mode === "login" ? "Sign up" : "Login"}
                </Link>
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            {mode === "register" && (
              <>
                <Input
                  label="Nama Lengkap"
                  id="nama_lengkap"
                  name="nama_lengkap"
                  type="text"
                  value={formData.nama_lengkap}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Nomer Hp"
                  id="no_hp"
                  name="no_hp"
                  type="tel"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            <Input
              label="Alamat Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {mode === "register" && (
              <Input
                label="Konfirmasi Password"
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            )}
            {error && <p className="form-error-text login-error">{error}</p>}
            <div className="form-actions-login">
              {mode === "login" ? (
                <Link to="/forgot-password" className="form-link">
                  Lupa password?
                </Link>
              ) : (
                <span />
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                size="large"
              >
                {isAdminLogin
                  ? "Login as Admin"
                  : mode === "login"
                  ? "Login"
                  : "Create Account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
