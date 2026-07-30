import { Router } from 'express';
import { loginAdmin, loginStudent, loginVendor, registerStudent } from '../controllers/authController.js';
const router = Router();
router.post('/student/register', registerStudent); router.post('/student/login', loginStudent); router.post('/vendor/login', loginVendor); router.post('/admin/login', loginAdmin);
export default router;
