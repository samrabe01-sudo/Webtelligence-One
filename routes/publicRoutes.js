import { Router } from 'express';
import { register, login, logActivity, purchasePackage } from '../controllers/publicController.js';
import { userAuthMiddleware } from '../middleware/userAuthMiddleware.js';

const router = Router();

// Public endpoints
router.post('/register', register);
router.post('/login', login);

// Authenticated user endpoints
router.post('/log-activity', userAuthMiddleware, logActivity);
router.post('/purchase-package', userAuthMiddleware, purchasePackage);

export default router;
