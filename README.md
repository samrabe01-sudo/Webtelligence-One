# 🌟 Webtelligence - Modern Portfolio Website

[![Live](https://img.shields.io/badge/Live-mexsuweb.com-0ea5e9?logo=githubpages&logoColor=white)](https://mexsuweb.com)
[![Version](https://img.shields.io/badge/version-2.0-brightgreen.svg)](https://github.com/samrabe01-sudo/Webtelligence-One)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Profesyonel web tasarım ve geliştirme portföy sitesi - Modern, responsive ve full-stack

---

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Deployment](#-deployment)
- [Teknolojiler](#-teknolojiler)

---

## ✨ Özellikler

### 🎨 Frontend
- ✅ Modern ve responsive tasarım
- ✅ Glassmorphism & gradient efektler
- ✅ Smooth scroll ve animasyonlar
- ✅ Blog sistemi
- ✅ İnteraktif danışmanlık formu
- ✅ AI chatbot asistan
- ✅ PWA desteği
- ✅ SEO optimize

### 🔐 Backend
- ✅ User authentication (JWT)
- ✅ Admin panel
- ✅ Kullanıcı yönetimi
- ✅ Aktivite tracking
- ✅ Paket satın alma sistemi
- ✅ RESTful API

---

## 📁 Proje Yapısı

```
Webtelligence-One/
│
├── 📁 client/                    # Frontend (Static Files)
│   ├── index.html               # Ana sayfa
│   ├── blog.html                # Blog sayfası
│   ├── css/
│   │   ├── main.css            # Ana CSS
│   │   └── blog.css            # Blog CSS
│   ├── js/
│   │   ├── config.js           # API config
│   │   ├── main.js             # Ana JavaScript
│   │   └── blog.js             # Blog JavaScript
│   └── images/                  # Görseller
│
├── 📁 server/                    # Backend (API)
│   ├── server.js                # Express server
│   ├── .env                     # Environment variables
│   ├── package.json             # Dependencies
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── routes/
│   │   ├── adminRoutes.js      # Admin endpoints
│   │   └── publicRoutes.js     # Public endpoints
│   ├── controllers/
│   │   ├── adminController.js  # Admin logic
│   │   └── publicController.js # User logic
│   ├── models/
│   │   ├── Admin.js            # Admin model
│   │   ├── User.js             # User model
│   │   └── UserActivity.js     # Activity model
│   ├── middleware/
│   │   ├── authMiddleware.js   # Admin auth
│   │   └── userAuthMiddleware.js # User auth
│   └── scripts/
│       ├── seed-admin.js       # Create admin
│       └── init-admin-on-boot.js # Auto admin
│
├── 📁 docs/                      # Documentation
│   ├── DEPLOYMENT.md            # Deploy guide
│   └── ...                      # Other guides
│
├── .gitignore
├── README.md                     # This file
└── PROJECT-RESTRUCTURE.md       # Restructure guide

```

---

## 🚀 Kurulum

### Gereksinimler

- Node.js (v18+)
- MongoDB (local veya Atlas)
- npm veya yarn

### 1️⃣ Repository'yi Klonlayın

```bash
git clone https://github.com/samrabe01-sudo/Webtelligence-One.git
cd Webtelligence-One
```

### 2️⃣ Backend Kurulumu

```bash
cd server
npm install
```

`.env` dosyasını düzenleyin:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/webtelligence
JWT_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:8080
ADMIN_AUTO_SEED=true
ADMIN_SEED_USERNAME=admin
ADMIN_SEED_PASSWORD=admin123
```

### 3️⃣ Frontend Kurulumu

```bash
cd ../client
```

`js/config.js` dosyasında API URL'ini kontrol edin:

```javascript
const API_BASE_DEV = 'http://localhost:4000';
const API_BASE_PROD = 'https://your-backend.onrender.com';
```

---

## 💻 Kullanım

### Backend'i Başlatma

```bash
cd server
npm run dev        # Development (nodemon)
npm start          # Production
```

Backend çalışıyor: `http://localhost:4000`

### Frontend'i Başlatma

```bash
cd client
# Seçenek 1: Live Server (VS Code extension)
# Seçenek 2: Python
python -m http.server 8080
# Seçenek 3: Node.js
npx serve -p 8080
```

Frontend çalışıyor: `http://localhost:8080`

### Admin Paneli

- URL: `http://localhost:4000/admin` (eğer public klasörü varsa)
- Veya manuel HTML aç: `client/admin.html`
- Kullanıcı adı: `admin`
- Şifre: `admin123`

---

## 🌐 Deployment

### Backend (Render)

1. Render.com'a giriş yapın
2. "New Web Service" oluşturun
3. GitHub repo'nuzu bağlayın
4. Root directory: `server`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Environment Variables ekleyin:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`
   - `ADMIN_AUTO_SEED=true` (ilk deploy için)

### Frontend (Netlify/Vercel)

#### Netlify:
```bash
cd client
# Deploy
netlify deploy --prod
```

#### Vercel:
```bash
cd client
vercel --prod
```

### GitHub Pages (Frontend Only)

```bash
# Root dizinde
git add .
git commit -m "Deploy"
git push origin main
```

GitHub Settings > Pages > Source: `main` branch

---

## 🛠️ Teknolojiler

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)
- Intersection Observer API
- Service Worker (PWA)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS

### Tools
- Git & GitHub
- VS Code
- Postman (API testing)
- MongoDB Compass

---

## 🔐 Güvenlik & Kimlik Doğrulama

### Parola Politikası
Parolalar için tek zorunluluk minimum 7 karakter uzunluk. Ek karmaşıklık (büyük/küçük harf, sayı, özel karakter) opsiyoneldir.

### JWT
- Kullanıcı ve admin için ayrı expiration: `JWT_USER_EXPIRES`, `JWT_ADMIN_EXPIRES`.
- Zorunlu gizli anahtar: `JWT_SECRET` (uygulama başlarken yoksa durur).
- Payload sade: `{ id, role }` (user için name/email client tarafında döndürülür).

### Rate Limiting
`express-rate-limit` ile:
- `/api/public/login` / `/api/public/register` ve `/api/admin/login` endpointlerinde 1 dakika içinde maksimum 5 istek (varsayılan). Değerler `.env` ile ayarlanabilir:
```
RATE_LIMIT_LOGIN_WINDOW_MS=60000
RATE_LIMIT_LOGIN_MAX=5
RATE_LIMIT_REGISTER_WINDOW_MS=60000
RATE_LIMIT_REGISTER_MAX=5
```

### Input Sanitization
- Tüm kritik POST endpointlerinde gövde alanları HTML escape edilir.
- NoSQL operator anahtarları (`$`, `.` içeren) kaldırılır.
- Null byte temizlenir, trim uygulanır.

### Hata Mesajları
- Başarısız login/register: "Geçersiz kimlik bilgileri" (enumeration azaltma).
- Register duplicate email: genel yanıt "Kayıt gerçekleştirilemedi".
- Standart validation hataları: `{ message: 'Doğrulama hatası', errors: [ { field, msg } ] }`.

### Satın Alma Sistemi
- Paket adı whitelist ile doğrulanır.
- Tekrar satın alım durumunda yanıt: `{ alreadyOwned: true }` ve activity log `newPurchase: false`.
- İlk satın alımda `newPurchase: true`.

### Structured Logging
- `pino` kullanılır (`LOG_LEVEL=info`).
- Login denemeleri, rate limit tetiklenmeleri, satın alma ve activity olayları loglanır.

### Örnek `.env`
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/webtelligence
JWT_SECRET=your-super-secret-key
JWT_USER_EXPIRES=7d
JWT_ADMIN_EXPIRES=2h
RATE_LIMIT_LOGIN_WINDOW_MS=60000
RATE_LIMIT_LOGIN_MAX=5
RATE_LIMIT_REGISTER_WINDOW_MS=60000
RATE_LIMIT_REGISTER_MAX=5
LOG_LEVEL=info
CLIENT_URL=http://localhost:8080
ADMIN_AUTO_SEED=false
ADMIN_SEED_USERNAME=admin
ADMIN_SEED_PASSWORD=admin123
```

### API Endpointleri

Kullanıcı (Public):
| Method | Endpoint | Açıklama |
|--------|----------|---------|
| POST | `/api/public/register` | Yeni kullanıcı kaydı |
| POST | `/api/public/login` | Kullanıcı girişi (JWT döner) |
| POST | `/api/public/log-activity` | Kullanıcı aktivite loglar |
| POST | `/api/public/purchase-package` | Paket satın alır / tekrar satın alma kontrolü |

Admin:
| Method | Endpoint | Açıklama |
|--------|----------|---------|
| POST | `/api/admin/login` | Admin girişi (JWT) |
| POST | `/api/admin/change-password` | Admin parola değişimi |
| GET | `/api/admin/users` | Tüm kullanıcılar |
| GET | `/api/admin/users/:id` | Kullanıcı detayı |
| GET | `/api/admin/activity/:userId` | Kullanıcı aktiviteleri |

Sağlık:
| Method | Endpoint | Açıklama |
|--------|----------|---------|
| GET | `/api/health` | Servis durumu |

### Örnek Login Yanıtı
```json
{
  "token": "<JWT>",
  "user": {
    "id": "656...",
    "email": "user@example.com",
    "name": "User",
    "purchasedPackages": ["Pro"]
  }
}
```

---
## 📚 Dokümantasyon

Detaylı dokümantasyon için [`docs/`](./docs/) klasörüne bakın:

- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Render Guide](./docs/RENDER-GUIDE.md)
- [Netlify Guide](./docs/NETLIFY-GUIDE.md)
- [Cloudflare Guide](./docs/CLOUDFLARE-GUIDE.md)
- [Domain Setup](./docs/DOMAIN-SETUP.md)
- [Project Restructure](./PROJECT-RESTRUCTURE.md)

---

## 🧪 Testing

### Backend API Test

```bash
cd server
npm test
```

### Manuel Test

```bash
# Health check
curl http://localhost:4000/api/health

# Register user
curl -X POST http://localhost:4000/api/public/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

---

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

---

## 👤 İletişim

**Mert Yüksel**
- Website: [mexsuweb.com](https://mexsuweb.com)
- Email: mertyuksll@gmail.com
- GitHub: [@samrabe01-sudo](https://github.com/samrabe01-sudo)

---

## 🌟 Yıldızlayın!

Bu projeyi beğendiyseniz, lütfen ⭐ vererek destekleyin!

---

**Not:** Bu proje v2.0 olarak yeniden yapılandırıldı. Eski yapı için git history'ye bakın.

**Son Güncelleme:** 23 Kasım 2025
