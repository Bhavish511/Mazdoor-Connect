import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/protected-route'

import HomePage from '@/pages/HomePage'
import CategoriesPage from '@/pages/CategoriesPage'
import CategoryDetailPage from '@/pages/CategoryDetailPage'
import WorkerDetailPage from '@/pages/WorkerDetailPage'
import BookingPage from '@/pages/BookingPage'
import LoginPage from '@/pages/LoginPage'
import CustomerDashboardPage from '@/pages/CustomerDashboardPage'
import CustomerBookingsPage from '@/pages/CustomerBookingsPage'
import CustomerProfilePage from '@/pages/CustomerProfilePage'
import CustomerFavoritesPage from '@/pages/CustomerFavoritesPage'
import WorkerDashboardPage from '@/pages/WorkerDashboardPage'
import WorkerProfilePage from '@/pages/WorkerProfilePage'
import WorkerSettingsPage from '@/pages/WorkerSettingsPage'
import WorkerAnalyticsPage from '@/pages/WorkerAnalyticsPage'
import AdminDashboardPage from '@/pages/AdminDashboardPage'
import AdminSettingsPage from '@/pages/AdminSettingsPage'
import VerificationQueuePage from '@/pages/VerificationQueuePage'
import RegisterPage from '@/pages/RegisterPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import HowItWorksPage from '@/pages/HowItWorksPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsOfServicePage from '@/pages/TermsOfServicePage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<CategoryDetailPage />} />
            <Route path="/workers/:workerId" element={<WorkerDetailPage />} />
            <Route path="/book/:workerId" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            {/* Customer Routes */}
            <Route path="/customer/dashboard" element={
                <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerDashboardPage />
                </ProtectedRoute>
            } />
            <Route path="/customer/bookings" element={
                <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerBookingsPage />
                </ProtectedRoute>
            } />
            <Route path="/customer/profile" element={
                <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerProfilePage />
                </ProtectedRoute>
            } />
            <Route path="/customer/favorites" element={
                <ProtectedRoute allowedRoles={['customer']}>
                    <CustomerFavoritesPage />
                </ProtectedRoute>
            } />

            {/* Worker Routes */}
            <Route path="/worker/dashboard" element={
                <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerDashboardPage />
                </ProtectedRoute>
            } />
            <Route path="/worker/profile" element={
                <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerProfilePage />
                </ProtectedRoute>
            } />
            <Route path="/worker/settings" element={
                <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerSettingsPage />
                </ProtectedRoute>
            } />
            <Route path="/worker/analytics" element={
                <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerAnalyticsPage />
                </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <AdminSettingsPage />
                </ProtectedRoute>
            } />
            <Route path="/admin/verification-queue" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <VerificationQueuePage />
                </ProtectedRoute>
            } />

            {/* Static Content */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
    )
}

export default App
