import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import SideLayout from "./layout/SideLayout";
import AdminLayout from "./layout/AdminLayout";

import { AuthProvider, ProtectedRoute } from "./context/AuthContext";

import PaketKreditPage from "./pages/PaketKreditPages/PaketKreditPage";
import ApplicationWizardPage from "./pages/ApplicationWizardPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MyLoansPage from "./pages/MyLoanPage/MyLoanPage";
import InstallmentPage from "./pages/InstallmentPage/InstallmentPage";
import AdminUserManagementPage from "./pages/Admin/AdminUserManagementPage/AdminUserManagementPage";
import AdminPaketKreditPage from "./pages/Admin/AdminPaketKreditPage/AdminPaketKreditPage";
import AdminLoanManagementPage from "./pages/Admin/AdminLoanManagmentPage/AdminLoanManagementPage";
import AdminKanalPembayaranPage from "./pages/Admin/AdminKanalPembayaranPage/AdminKanalPembayaranPage";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Mungkin salah url nya ato sudah dihapus kontent url tersebut.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="paket-kredit" element={<PaketKreditPage />} />
            <Route path="my-loans" element={<MyLoansPage />} />{" "}
          </Route>

          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          <Route
            element={
              <ProtectedRoute>
                <SideLayout />
              </ProtectedRoute>
            }
          >
            {" "}
            <Route
              path="/apply-loan/:paketId"
              element={<ApplicationWizardPage />}
            />
            <Route
              path="/pinjamans/:pinjamanId"
              element={<ApplicationWizardPage />}
            />
            <Route
              path="/my-installments/:pinjamanId"
              element={<InstallmentPage />}
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="users" element={<AdminUserManagementPage />} />
            <Route path="paket-kredit" element={<AdminPaketKreditPage />} />
            <Route path="loans" element={<AdminLoanManagementPage />} />
            <Route
              path="kanal-pembayaran"
              element={<AdminKanalPembayaranPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
