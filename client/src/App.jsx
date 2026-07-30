import { Route, Routes } from 'react-router-dom'
import VendorList from './pages/VendorList'
import VendorMenu from './pages/student/VendorMenu'
import Cart from './pages/student/Cart'
import OrderStatus from './pages/student/OrderStatus'
import MerchantLogin from './pages/merchant/MerchantLogin'
import MerchantDashboard from './pages/merchant/MerchantDashboard'
import MerchantDashboardHome from './pages/merchant/MerchantDashboardHome'
import MerchantMenu from './pages/merchant/MerchantMenu'
import MerchantTokens from './pages/merchant/MerchantTokens'
import MerchantPayments from './pages/merchant/MerchantPayments'
import MerchantSettings from './pages/merchant/MerchantSettings'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDashboardHome from './pages/admin/AdminDashboardHome'
import MerchantRequests from './pages/admin/MerchantRequests'
import ViewMerchants from './pages/admin/ViewMerchants'
import MerchantDetails from './pages/admin/MerchantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import StudentLogin from './pages/student/StudentLogin'
import MockPayment from './pages/student/MockPayment'

export default function App() {
  return <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/student/login" element={<StudentLogin />} />
    <Route path="/vendors" element={<VendorList />} />
    <Route path="/vendor/:id" element={<VendorMenu />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/payment" element={<ProtectedRoute role="student"><MockPayment /></ProtectedRoute>} />
    <Route path="/order/:orderId" element={<OrderStatus />} />
    <Route path="/merchant/login" element={<MerchantLogin />} />
    <Route path="/merchant/dashboard" element={<ProtectedRoute role="merchant"><MerchantDashboard /></ProtectedRoute>}>
      <Route index element={<MerchantDashboardHome />} /><Route path="menu" element={<MerchantMenu />} /><Route path="tokens" element={<MerchantTokens />} /><Route path="payments" element={<MerchantPayments />} /><Route path="settings" element={<MerchantSettings />} />
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}>
      <Route index element={<AdminDashboardHome />} /><Route path="merchants" element={<ViewMerchants />} /><Route path="requests" element={<MerchantRequests />} /><Route path="merchants/:id" element={<MerchantDetails />} />
    </Route>
  </Routes>
}
