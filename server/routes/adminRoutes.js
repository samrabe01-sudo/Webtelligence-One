import { Router } from 'express';
import { adminLogin, listUsers, getUserById, getUserActivity, changePassword } from '../controllers/adminController.js';
import { validateAdminLogin, validateChangePassword, handleValidation } from '../middleware/validationMiddleware.js';
import { adminLoginLimiter } from '../middleware/rateLimitMiddleware.js';
import { sanitizeRequest } from '../middleware/sanitizationMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Public
router.post('/login', adminLoginLimiter, sanitizeRequest, validateAdminLogin, handleValidation, adminLogin);

// Protected
router.post('/change-password', authMiddleware, sanitizeRequest, validateChangePassword, handleValidation, changePassword);
router.get('/users', authMiddleware, listUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.get('/activity/:userId', authMiddleware, getUserActivity);

export default router;
