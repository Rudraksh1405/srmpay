import { Router } from 'express';
import { getVendorMenu, getVendors, updateMenuAvailability } from '../controllers/vendorController.js';
import { protectVendor } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getVendors);
router.get('/:id/menu', getVendorMenu);
router.patch('/menu/:itemId', protectVendor, updateMenuAvailability);

export default router;
