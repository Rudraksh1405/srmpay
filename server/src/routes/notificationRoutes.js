import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protectStudent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectStudent);
router.get('/', getNotifications);
router.put('/:notificationId/read', markAsRead);

export default router;
