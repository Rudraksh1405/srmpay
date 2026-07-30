import { Router } from 'express';
import { createOrder, getStudentOrders, getVendorOrders, updateOrderStatus } from '../controllers/orderController.js';
const router = Router();
router.post('/', createOrder); router.get('/vendor/:vendorId', getVendorOrders); router.patch('/:orderId/status', updateOrderStatus); router.get('/student/:email', getStudentOrders);
export default router;
