import jwt from 'jsonwebtoken';

export function userAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Yetkisiz: Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    // Beklenen: { id, email, name }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Yetkisiz: Geçersiz token' });
  }
}
