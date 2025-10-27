import { Router } from 'express';
import { adminLogin, listUsers, getUserById, getUserActivity } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public
router.post('/login', adminLogin);

// Protected
router.get('/users', authMiddleware, listUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.get('/activity/:userId', authMiddleware, getUserActivity);

export default router;
