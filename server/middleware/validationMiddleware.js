import { body, validationResult } from 'express-validator';

// Paket whitelist (iş mantığı gereği izin verilen paketler)
const PACKAGE_WHITELIST = [
  'Temel', 'Pro', 'Premium', 'E-Ticaret', 'Kurumsal', 'Portföy'
];

// Ortak parola kuralı (yalnızca minimum uzunluk > 6)
const passwordRule = body('password')
  .isString().withMessage('Parola geçerli bir string olmalı')
  .isLength({ min: 7, max: 72 }).withMessage('Parola en az 7 karakter olmalı');

// Email kuralı
const emailRule = body('email')
  .isEmail().withMessage('Geçerli bir e-posta girin')
  .normalizeEmail();

// İsim kuralı - name veya username'den biri olmalı
const nameRule = body(['name', 'username'])
  .optional()
  .isString().withMessage('İsim geçerli bir string olmalı')
  .trim()
  .isLength({ min: 2, max: 60 }).withMessage('İsim 2-60 karakter olmalı');

// Register doğrulama - name veya username kabul et
export const validateRegister = [
  emailRule,
  passwordRule,
  body('name')
    .if(body('username').not().exists())
    .exists().withMessage('name veya username zorunludur'),
  body('username')
    .if(body('name').not().exists())
    .exists().withMessage('name veya username zorunludur'),
  nameRule,
];

// Login doğrulama
export const validateLogin = [
  emailRule,
  body('password').exists().withMessage('password zorunludur').isLength({ min: 7 }).withMessage('Parola en az 7 karakter olmalı')
];

// Admin login doğrulama
export const validateAdminLogin = [
  body('username')
    .isString().withMessage('Kullanıcı adı geçerli bir string olmalı')
    .trim()
    .isLength({ min: 3, max: 40 }).withMessage('Kullanıcı adı 3-40 karakter olmalı'),
  body('password').exists().withMessage('Şifre zorunludur').isLength({ min: 7 }).withMessage('Parola en az 7 karakter olmalı')
];

// Parola değiştirme doğrulama
export const validateChangePassword = [
  body('oldPassword').exists().withMessage('oldPassword zorunludur'),
  body('newPassword').exists().withMessage('newPassword zorunludur').isLength({ min: 7 }).withMessage('Parola en az 7 karakter olmalı'),
];

// Aktivite log doğrulama
export const validateLogActivity = [
  body('action')
    .isString().withMessage('action string olmalı')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('action 2-100 karakter olmalı')
    .matches(/^[A-Za-z0-9-_ ]+$/).withMessage('action yalnızca harf, rakam, tire ve alt çizgi içerebilir'),
  body('details')
    .optional()
    .isString().withMessage('details string olmalı')
    .trim()
    .isLength({ max: 500 }).withMessage('details en fazla 500 karakter olmalı')
];

// Paket satın alma doğrulama
export const validatePurchasePackage = [
  body('packageName')
    .isString().withMessage('packageName string olmalı')
    .trim()
    .isLength({ min: 2, max: 40 }).withMessage('packageName 2-40 karakter olmalı')
    .custom(value => {
      if (!PACKAGE_WHITELIST.includes(value)) {
        throw new Error('Geçersiz paket adı');
      }
      return true;
    })
];

// Ortak validation sonucu işleyici
export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Doğrulama hatası',
      errors: errors.array().map(e => ({ field: e.param, msg: e.msg }))
    });
  }
  next();
}
