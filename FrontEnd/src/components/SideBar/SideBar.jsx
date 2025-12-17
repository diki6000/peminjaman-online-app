import React, { useContext } from "react"; // 1. Import useContext
import { NavLink, Link } from "react-router-dom";
import "./Sidebar.css";

// 2. Import your AuthContext
import { AuthContext } from "../../context/AuthContext";

function AdminSidebar() {
  // 3. Get the logout function from the context
  const { logout } = useContext(AuthContext);

  // You no longer need a custom handleLogout function here.
  // The function from the context does everything correctly:
  // - Calls the /logout API endpoint
  // - Removes 'authToken' and 'user' from localStorage
  // - Sets isAuthenticated to false
  // - Redirects the user to the login page

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link to="/admin/users" className="admin-logo">
          {" "}
          {/* Changed link to a default admin page */}
          Admin Panel
        </Link>
        {/* We can improve this later to show the actual admin's name */}
        <p className="admin-user-info">Administrator</p>
      </div>
      <nav className="admin-nav">
        <ul>
          {/* Example of a more useful dashboard link */}
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Managemen User
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/loans"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Pinjaman
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/paket-kredit"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Paket Kredit
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/kanal-pembayaran"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Kanal Pembayaran
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="admin-sidebar-footer">
        <button className="admin-logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
