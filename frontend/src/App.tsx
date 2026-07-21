import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import { PageLoader } from './components/PageLoader';
import { RouteChangeHandler } from './components/RouteChangeHandler';

const GuestPage = lazy(() => import('./pages/GuestPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const UserClubs = lazy(() => import('./pages/user/UserClubs'));
const UserEvents = lazy(() => import('./pages/user/UserEvents'));
const UserMemberships = lazy(() => import('./pages/user/UserMemberships'));
const UserNotices = lazy(() => import('./pages/user/UserNotices'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminClubs = lazy(() => import('./pages/admin/AdminClubs'));
const AdminEvents = lazy(() => import('./pages/admin/AdminEvents'));
const AdminMemberships = lazy(() => import('./pages/admin/AdminMemberships'));
const AdminNotices = lazy(() => import('./pages/admin/AdminNotices'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function GlobalLoaderOverlay() {
  const { isLoading } = useLoading();
  if (!isLoading) return null;
  return <PageLoader />;
}

function AppRoutes() {
  return (
    <>
      <RouteChangeHandler />
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
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <AppRoutes />
          </Suspense>
          <GlobalLoaderOverlay />
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}