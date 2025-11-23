import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { connectDB } from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import { initAdminOnBoot } from './scripts/init-admin-on-boot.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files (admin panel frontend)
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

// Connect DB then start server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/webtelligence';
connectDB(MONGODB_URI).then(async () => {
  await initAdminOnBoot();
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
