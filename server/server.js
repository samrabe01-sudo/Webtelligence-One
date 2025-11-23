import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import { initAdminOnBoot } from './scripts/init-admin-on-boot.js';
import { assertJwtSecret } from './utils/token.js';

dotenv.config();

// Fail-fast: JWT_SECRET zorunlu
try {
  assertJwtSecret();
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware - CORS'u development'ta daha geniş tut
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? (process.env.CLIENT_URL || 'http://localhost:8080')
    : true, // Development'ta tüm origin'lere izin ver
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Root endpoint - API bilgilendirmesi
app.get('/', (req, res) => {
  res.json({
    name: 'Webtelligence Backend API',
    version: '2.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      public: '/api/public/*',
      admin: '/api/admin/*'
    },
    message: 'Frontend için http://localhost:5500 adresini kullanın'
  });
});

// Service Worker - boş yanıt (404 yerine)
app.get('/sw.js', (req, res) => {
  res.type('application/javascript');
  res.send('// Service Worker disabled');
});

// 404 ve hata middleware'leri (en sonda)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Connect DB then start server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtelligence';
connectDB(MONGODB_URI).then(async () => {
  await initAdminOnBoot();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
