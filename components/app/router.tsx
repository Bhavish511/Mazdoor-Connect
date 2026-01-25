"use client";

import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

// Lazy load pages for better performance
const HomePage = lazy(() => import("@/components/pages/home-page"));
const CategoriesPage = lazy(() => import("@/components/pages/categories-page"));
const CategoryDetailPage = lazy(
  () => import("@/components/pages/category-detail-page")
);
const WorkerProfilePage = lazy(
  () => import("@/components/pages/worker-profile-page")
);
const BookingPage = lazy(() => import("@/components/pages/booking-page"));
const LoginPage = lazy(() => import("@/components/pages/login-page"));
const RegisterPage = lazy(() => import("@/components/pages/register-page"));
const CustomerDashboard = lazy(
  () => import("@/components/pages/customer/dashboard-page")
);
const CustomerBookings = lazy(
  () => import("@/components/pages/customer/bookings-page")
);
const WorkerDashboard = lazy(
  () => import("@/components/pages/worker/dashboard-page")
);
const AdminDashboard = lazy(
  () => import("@/components/pages/admin/dashboard-page")
);

// Layout
import MainLayout from "@/components/layout/main-layout";

// Loading fallback
const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("customer" | "worker" | "admin")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// App Router Component
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<CategoryDetailPage />} />
            <Route path="/workers/:workerId" element={<WorkerProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Booking (requires auth) */}
            <Route
              path="/book/:workerId"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/bookings"
              element={
                <ProtectedRoute allowedRoles={["customer"]}>
                  <CustomerBookings />
                </ProtectedRoute>
              }
            />

            {/* Worker Routes */}
            <Route
              path="/worker/dashboard"
              element={
                <ProtectedRoute allowedRoles={["worker"]}>
                  <WorkerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
