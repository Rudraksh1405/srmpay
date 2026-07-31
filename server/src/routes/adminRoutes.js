import { Router } from 'express';
import { getAnalytics, getVendors, updateApproval } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/vendors', protectAdmin, getVendors); 
router.patch('/vendors/:id/approval', protectAdmin, updateApproval); 
router.get('/analytics', protectAdmin, getAnalytics);

export default router;
