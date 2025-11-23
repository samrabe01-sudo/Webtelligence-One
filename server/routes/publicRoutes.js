import { Router } from 'express';
import { register, login, logActivity, purchasePackage } from '../controllers/publicController.js';
import { validateRegister, validateLogin, validateLogActivity, validatePurchasePackage, handleValidation } from '../middleware/validationMiddleware.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimitMiddleware.js';
import { sanitizeRequest } from '../middleware/sanitizationMiddleware.js';
import { userAuthMiddleware } from '../middleware/userAuthMiddleware.js';

const router = Router();

// Public endpoints
router.post('/register', registerLimiter, sanitizeRequest, validateRegister, handleValidation, register);
router.post('/login', loginLimiter, sanitizeRequest, validateLogin, handleValidation, login);

// Authenticated user endpoints
router.post('/log-activity', userAuthMiddleware, sanitizeRequest, validateLogActivity, handleValidation, logActivity);
router.post('/purchase-package', userAuthMiddleware, sanitizeRequest, validatePurchasePackage, handleValidation, purchasePackage);

export default router;
