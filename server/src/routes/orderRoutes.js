import { Router } from 'express';
import { createOrder, getVendorOrders, updateOrderStatus, getStudentOrders, addReview, getOrderDetails } from '../controllers/orderController.js';
import { protectStudent, protectVendor } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protectStudent, createOrder); 
router.get('/student/:email', protectStudent, getStudentOrders);
router.get('/:orderId', protectStudent, getOrderDetails);
router.post('/:orderId/review', protectStudent, addReview);

router.get('/vendor/:vendorId', protectVendor, getVendorOrders); 
router.patch('/:orderId/status', protectVendor, updateOrderStatus); 

export default router;
