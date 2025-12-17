import React, { createContext, useState, useEffect, useContext } from "react";
// --- FIX: Import Navigate from react-router-dom ---
import { Navigate } from "react-router-dom";
import api from "../api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // --- FIX 1: Update the login function ---
  // It now also saves the user object to localStorage, so other parts of the app can access it.
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // <-- ADD THIS LINE
    setUser(userData);
    setIsAuthenticated(true);
  };

  // --- FIX 2: Update the logout function ---
  // It now removes the correct token ('authToken') and the user object.
  const logout = () => {
    localStorage.removeItem("authToken"); // <-- CHANGE 'jwt_token' to 'authToken'
    localStorage.removeItem("user"); // <-- ADD THIS LINE to be thorough
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login"; // Force a full redirect to clear all state
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      // --- FIX 3: Look for the correct token name ---
      const token = localStorage.getItem("authToken"); // <-- CHANGE 'jwt_token' to 'authToken'

      if (token) {
        try {
          // Attempt to fetch user data with the token. Your API call is correct.
          const response = await api.get("/user");

          // Use the login function to set state AND save user data consistently
          login(response.data.user);
        } catch (error) {
          console.error("Authentication check failed:", error);
          // If the token is invalid, log the user out completely
          logout();
        }
      }
      setIsLoadingAuth(false); // Auth check complete
    };

    checkAuthStatus();
  }, []); // Empty dependency array means run once on mount

  const authContextValue = {
    user,
    isAuthenticated,
    isLoadingAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Your ProtectedRoute component is correct and will now work as expected
// because the context provides the correct auth state.
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoadingAuth } = useContext(AuthContext);

  if (isLoadingAuth) {
    // You can replace this with a proper loading spinner component
    return <div>Loading Authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    (!user?.role?.nama_role || !allowedRoles.includes(user.role.nama_role))
  ) {
    // Redirect to home if role doesn't match
    return <Navigate to="/" replace />;
  }

  return children;
};
