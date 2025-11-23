import { verifyToken } from '../utils/token.js';

export function userAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz: Token gerekli' });
  }

  try {
    const decoded = verifyToken(token);
    if (decoded.role !== 'user') {
      return res.status(401).json({ message: 'Yetkisiz: User token gerekli' });
    }
    req.user = { id: decoded.id, email: decoded.email, name: decoded.name, role: 'user' };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Yetkisiz: Geçersiz token' });
  }
}
