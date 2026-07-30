import { Router } from 'express';
import { getVendorMenu, getVendors, updateMenuAvailability } from '../controllers/vendorController.js';

const router = Router();

router.get('/', getVendors);
router.get('/:id/menu', getVendorMenu);
router.patch('/menu/:itemId', updateMenuAvailability);

export default router;
