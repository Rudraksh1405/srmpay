import express from 'express';
import { getProfile, updatePassword, toggleFavorite } from '../controllers/studentController.js';
import { protectStudent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectStudent);

router.get('/profile', getProfile);
router.put('/password', updatePassword);
router.post('/favorites/:vendorId', toggleFavorite);

export default router;
