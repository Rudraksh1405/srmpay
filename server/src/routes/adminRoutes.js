import { Router } from 'express';
import { getAnalytics, getVendors, updateApproval } from '../controllers/adminController.js';
const router = Router();
router.get('/vendors', getVendors); router.patch('/vendors/:id/approval', updateApproval); router.get('/analytics', getAnalytics);
export default router;
