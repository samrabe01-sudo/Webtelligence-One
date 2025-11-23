import { verifyToken } from '../utils/token.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz: Token gerekli' });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Yetkisiz: Admin token gerekli' });
    }
    req.admin = { id: decoded.id, username: decoded.username, role: 'admin' };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Yetkisiz: Geçersiz token' });
  }
}
