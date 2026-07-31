import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers & Global Components
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import StudentLogin from './pages/StudentLogin';
import VendorLogin from './pages/VendorLogin';
import AdminLogin from './pages/AdminLogin';

// Student Portal
import StudentLayout from './pages/student/StudentLayout';
import VendorList from './pages/student/VendorList';
import VendorMenu from './pages/student/VendorMenu';
import Cart from './pages/student/Cart';
import Checkout from './pages/student/Checkout';
import OrderStatus from './pages/student/OrderStatus';

// Vendor Portal
import VendorLayout from './pages/vendor/VendorLayout';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorMenuTab from './pages/vendor/VendorMenuTab';
import VendorSales from './pages/vendor/VendorSales';

// Admin Portal
import AdminLayout from './pages/admin/AdminLayout';
import AdminRequests from './pages/admin/AdminRequests';
import AdminVendors from './pages/admin/AdminVendors';
import AdminAnalytics from './pages/admin/AdminAnalytics';

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Student Portal */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentLayout /></ProtectedRoute>}>
            <Route index element={<VendorList />} />
            <Route path="vendor/:vendorId" element={<VendorMenu />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:tokenNumber" element={<OrderStatus />} />
          </Route>

          {/* Vendor Portal */}
          <Route path="/vendor" element={<ProtectedRoute allowedRoles={['vendor']}><VendorLayout /></ProtectedRoute>}>
            <Route index element={<VendorOrders />} />
            <Route path="menu" element={<VendorMenuTab />} />
            <Route path="sales" element={<VendorSales />} />
          </Route>

          {/* Admin Portal */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminVendors />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
