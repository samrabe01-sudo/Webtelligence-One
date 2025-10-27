import { Router } from 'express';
import { adminLogin, listUsers, getUserById, getUserActivity, changePassword } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public
router.post('/login', adminLogin);

// Protected
router.post('/change-password', authMiddleware, changePassword);
router.get('/users', authMiddleware, listUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.get('/activity/:userId', authMiddleware, getUserActivity);

export default router;
