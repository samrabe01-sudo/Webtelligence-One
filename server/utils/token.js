import jwt from 'jsonwebtoken';

const ADMIN_EXP = process.env.JWT_ADMIN_EXPIRES || '2h';
const USER_EXP = process.env.JWT_USER_EXPIRES || '7d';

export function assertJwtSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET ortam değişkeni tanımlı değil. Sunucu başlatılamıyor.');
  }
}

export function issueUserToken(user) {
  assertJwtSecret();
  const payload = {
    sub: user._id.toString(),
    id: user._id.toString(),
    role: 'user',
    email: user.email,
    name: user.name
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: USER_EXP, algorithm: 'HS256' });
}

export function issueAdminToken(admin) {
  assertJwtSecret();
  const payload = {
    sub: admin._id.toString(),
    id: admin._id.toString(),
    role: 'admin',
    username: admin.username
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ADMIN_EXP, algorithm: 'HS256' });
}

export function verifyToken(token) {
  assertJwtSecret();
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
}
