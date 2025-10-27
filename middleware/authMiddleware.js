import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz: Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.admin = decoded; // { id, username }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Yetkisiz: Geçersiz token' });
  }
}
