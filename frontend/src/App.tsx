import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import GuestPage from './pages/GuestPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/user/UserDashboard';
import UserClubs from './pages/user/UserClubs';
import UserEvents from './pages/user/UserEvents';
import UserMemberships from './pages/user/UserMemberships';
import UserNotices from './pages/user/UserNotices';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClubs from './pages/admin/AdminClubs';
import AdminEvents from './pages/admin/AdminEvents';
import AdminMemberships from './pages/admin/AdminMemberships';
import AdminNotices from './pages/admin/AdminNotices';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User area */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Navigate to="/user/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/clubs"
            element={
              <ProtectedRoute>
                <UserClubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/events"
            element={
              <ProtectedRoute>
                <UserEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/memberships"
            element={
              <ProtectedRoute>
                <UserMemberships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/notices"
            element={
              <ProtectedRoute>
                <UserNotices />
              </ProtectedRoute>
            }
          />

          {/* Admin area */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Navigate to="/admin/dashboard" replace />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/clubs"
            element={
              <AdminRoute>
                <AdminClubs />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/memberships"
            element={
              <AdminRoute>
                <AdminMemberships />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/notices"
            element={
              <AdminRoute>
                <AdminNotices />
              </AdminRoute>
            }
          />

          {/* Legacy redirects */}
          <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
