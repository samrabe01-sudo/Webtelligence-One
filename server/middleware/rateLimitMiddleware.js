import rateLimit from 'express-rate-limit';
import { logger } from '../utils/logger.js';

// Environment-driven values with safe fallbacks
const loginWindowMs = parseInt(process.env.RATE_LIMIT_LOGIN_WINDOW_MS || '60000', 10); // 1 dk
const loginMax = parseInt(process.env.RATE_LIMIT_LOGIN_MAX || '5', 10); // 1 dk içinde en fazla 5 deneme
const registerWindowMs = parseInt(process.env.RATE_LIMIT_REGISTER_WINDOW_MS || '60000', 10);
const registerMax = parseInt(process.env.RATE_LIMIT_REGISTER_MAX || '5', 10);

// Shared handler to produce consistent response and avoid user enumeration
function onLimitReached(req, res) {
  logger.warn({ ip: req.ip, path: req.originalUrl }, 'rate limit triggered');
}

const baseMessage = 'Çok fazla istek. Lütfen kısa süre sonra tekrar deneyin.';

export const loginLimiter = rateLimit({
  windowMs: loginWindowMs,
  max: loginMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: baseMessage },
  handler: (req, res, next, options) => {
    onLimitReached(req, res);
    return res.status(429).json({ error: baseMessage });
  }
});

export const registerLimiter = rateLimit({
  windowMs: registerWindowMs,
  max: registerMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: baseMessage },
  handler: (req, res, next, options) => {
    onLimitReached(req, res);
    return res.status(429).json({ error: baseMessage });
  }
});

export const adminLoginLimiter = loginLimiter; // Aynı değerleri kullanıyoruz; gerekirse ayrı env ile özelleştirilir.
