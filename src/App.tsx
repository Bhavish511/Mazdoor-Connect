import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import CategoriesPage from '@/pages/CategoriesPage'
import CategoryDetailPage from '@/pages/CategoryDetailPage'
import WorkerDetailPage from '@/pages/WorkerDetailPage'
import BookingPage from '@/pages/BookingPage'
import LoginPage from '@/pages/LoginPage'
import CustomerDashboardPage from '@/pages/CustomerDashboardPage'
import CustomerBookingsPage from '@/pages/CustomerBookingsPage'
import WorkerDashboardPage from '@/pages/WorkerDashboardPage'
import AdminDashboardPage from '@/pages/AdminDashboardPage'
import RegisterPage from '@/pages/RegisterPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:category" element={<CategoryDetailPage />} />
            <Route path="/workers/:workerId" element={<WorkerDetailPage />} />
            <Route path="/book/:workerId" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
            <Route path="/customer/bookings" element={<CustomerBookingsPage />} />
            <Route path="/worker/dashboard" element={<WorkerDashboardPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<RegisterPage />} />
        </Routes>
    )
}

export default App
