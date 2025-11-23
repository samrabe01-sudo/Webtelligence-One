# Mert Yüksel - Profesyonel Web Tasarımcısı Portfolio

[![Deploy to GitHub Pages](https://github.com/samrabe01-sudo/Webtelligence-One/actions/workflows/pages.yml/badge.svg)](https://github.com/samrabe01-sudo/Webtelligence-One/actions/workflows/pages.yml)
[![Live](https://img.shields.io/badge/Live-mexsuweb.com-0ea5e9?logo=githubpages&logoColor=white)](https://mexsuweb.com)
[![Backup](https://img.shields.io/badge/Backup-gh--pages-6c5ce7)](https://samrabe01-sudo.github.io/Webtelligence-One/)


Modern, responsive ve interaktif bir portföy web sitesi. Yaratıcılık ve teknolojinin buluştuğu noktada, dijital dünyada fark yaratan web siteleri oluşturan Mert Yüksel'in profesyonel portföyü.

## 🌟 Özellikler

### ✨ Modern Tasarım
- **Gradient Backgrounds**: Modern gradyan arka planlar
- **Glassmorphism Effects**: Cam efekti tasarım öğeleri
- **Smooth Animations**: Akıcı geçiş animasyonları
- **Interactive Elements**: Kullanıcı etkileşimli öğeler

### 📱 Responsive Design
- **Mobile First**: Mobil cihaz öncelikli tasarım
- **Cross-device Compatibility**: Tüm cihazlarda mükemmel görünüm
- **Touch Friendly**: Dokunmatik cihazlar için optimize edilmiş
- **Flexible Grid System**: Esnek grid sistemi

### 🚀 Performance Optimized
- **Fast Loading**: Hızlı yükleme süreleri
- **Optimized Images**: Optimize edilmiş görseller
- **Minified Code**: Küçültülmüş kod yapısı
- **SEO Ready**: Arama motoru optimizasyonu

### 🎨 Interactive Features
- **Typing Animation**: Dinamik yazma animasyonu
- **Scroll Animations**: Kaydırma animasyonları
- **Hover Effects**: Hover efektleri
- **Portfolio Filtering**: Portföy filtreleme sistemi
- **Contact Form**: İletişim formu
- **Smooth Scrolling**: Akıcı kaydırma

## 📂 Proje Yapısı

```
Webtelligence-One/
│
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stil dosyası
├── script.js           # JavaScript dosyası
├── README.md           # Proje dokümantasyonu
├── images/             # Görseller klasörü (oluşturulacak)
│   ├── portfolio/      # Portföy görselleri
│   ├── profile/        # Profil fotoğrafları
│   └── icons/          # Icon dosyaları
└── assets/             # Diğer varlıklar
    ├── fonts/          # Font dosyaları
    └── documents/      # Dökümanlar (CV, sertifikalar)
```

## 🛠️ Teknolojiler

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling
  - Flexbox & Grid
  - CSS Animations
  - CSS Variables
  - Media Queries
- **JavaScript ES6+**: Modern JavaScript
  - DOM Manipulation
  - Event Handling
  - Async/Await
  - Local Storage

### Design Tools
- **Font Awesome**: Icon kütüphanesi
- **Google Fonts**: Poppins font ailesi
- **CSS Grid**: Layout sistemi
- **Flexbox**: Esnek kutular

### Performance
- **Intersection Observer**: Lazy loading
- **Debouncing**: Performance optimization
- **CSS Transforms**: Hardware acceleration
- **Minification**: Kod optimizasyonu

## 🎯 Bölümler

### 🏠 Ana Sayfa (Hero Section)
- Dinamik typing animasyonu
- Floating teknoloji iconları
- Call-to-action butonları
- Parallax efektleri

### 👨‍💻 Hakkımda
- Kişisel bilgiler
- İş deneyimi
- Misyon & vizyon
- İstatistikler (animasyonlu sayaçlar)

### 🛠️ Yetenekler
- Frontend teknolojiler
- Tasarım araçları
- Skill bar animasyonları
- Teknoloji grid'i

### 💼 Portföy
- Proje örnekleri
- Filtreleme sistemi
- Hover efektleri
- Proje detayları

### 🎯 Hizmetler
- Web geliştirme
- UI/UX tasarım
- Responsive design
- Website optimizasyonu

### 📞 İletişim
- İletişim formu
- Sosyal medya linkleri
- Lokasyon bilgileri
- Form validasyonu

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
/* Mobile: 320px - 767px */
/* Tablet: 768px - 1023px */
/* Desktop: 1024px+ */

@media (max-width: 768px) { /* Tablet & Mobile */ }
@media (max-width: 480px) { /* Mobile Only */ }
```

## 🚀 Kurulum

### 1. Projeyi İndirin
```bash
git clone https://github.com/samrabe01-sudo/Webtelligence-One.git
cd Webtelligence-One
```

### 2. Tarayıcıda Açın
```bash
# Basit HTTP server için (Python)
python -m http.server 8000

# Veya Node.js ile
npx serve .

# Veya VS Code Live Server uzantısı ile
# Live Server: Open with Live Server
```

### 3. Tarayıcıda Görüntüleyin
```
http://localhost:8000
```

## 🎨 Özelleştirme

### Renkler
```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --accent-color: #fd79a8;
    --text-dark: #2d3436;
    --text-light: #636e72;
    --background-light: #f8f9fa;
}
```

### Fontlar
```css
/* Ana font */
font-family: 'Poppins', sans-serif;

/* Font ağırlıkları */
font-weight: 300; /* Light */
font-weight: 400; /* Regular */
font-weight: 500; /* Medium */
font-weight: 600; /* SemiBold */
font-weight: 700; /* Bold */
```

### Animasyonlar
```css
/* Geçiş süreleri */
transition: all 0.3s ease;

/* Keyframe animasyonları */
@keyframes float { /* ... */ }
@keyframes fadeIn { /* ... */ }
@keyframes slideIn { /* ... */ }
```

## 📊 Performance Metrikleri

- **Loading Time**: < 2 saniye
- **Lighthouse Score**: 95+
- **Mobile Friendly**: ✅
- **SEO Optimized**: ✅
- **Accessibility**: WCAG 2.1 AA

## 🔧 Geliştirme

### 🟣 Deployment
- Otomatik yayın: GitHub Actions → `pages.yml`
- Canlı adres: https://mexsuweb.com (CNAME)
- Yedek adres: https://samrabe01-sudo.github.io/Webtelligence-One/

> Not: `deploy.yml` ve `static.yml` iş akışları devre dışı bırakıldı. Tek kaynak olarak `pages.yml` kullanılmaktadır.

### 🟠 Backend (Admin API) - Hızlı Başlangıç

Admin paneli ve API, Node.js/Express + MongoDB (Mongoose) ile bu repo içinde yer alır.

- Yerel çalıştırma:
  1) `.env` oluşturun (bkz. `.env.example`):
     - `MONGODB_URI` (lokal Mongo veya Atlas URI)
     - `JWT_SECRET`
  2) Paketleri kurun ve sunucuyu başlatın:
     - `npm install`
     - `npm run dev`
  3) Sağlık kontrolü: `GET http://localhost:4000/api/health`
  4) Admin seed (opsiyonel): `node scripts/seed-admin.js <username> <password>`
  5) Parola sıfırlama (opsiyonel): `npm run admin:reset -- <username> <newPassword>`

- Admin Panel URL (yerel): `http://localhost:4000/admin`

### 🚀 Render ile Tek Tık Deploy

[Deploy to Render](https://render.com/deploy?repo=https://github.com/samrabe01-sudo/Webtelligence-One)

Bu repo kökünde `render.yaml` bulunur. Import ettikten sonra Render üzerinde:
- Health Check Path: `/api/health`
- Env Vars: `MONGODB_URI`, `JWT_SECRET`
- İlk kurulum için otomatik admin seed etkin: `ADMIN_AUTO_SEED=true`, `ADMIN_SEED_USERNAME`, `ADMIN_SEED_PASSWORD`
  - İlk giriş sonrası `ADMIN_AUTO_SEED=false` yapmanız önerilir.

- Admin Panel URL (Render): `https://<render-host>/admin`

### CSS Değişkenleri
```css
:root {
    --primary-gradient: linear-gradient(135deg, #6c5ce7, #a29bfe);
    --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    --border-radius: 15px;
    --transition: all 0.3s ease;
}
```

### JavaScript Modülleri
- **Navigation**: Menü ve scroll yönetimi
- **Animations**: Scroll ve hover animasyonları
- **Forms**: Form validasyonu ve gönderimi
- **Utils**: Yardımcı fonksiyonlar

## 🌐 Tarayıcı Desteği

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ⚠️ IE 11 (Limited support)

## 📱 PWA Desteği (Planlanan)

- Service Worker
- Offline çalışma
- App manifest
- Push notifications

## 🚀 Gelecek Güncellemeler

### V2.0 Planları
- [ ] Dark mode toggle
- [ ] Multi-language support (EN/TR)
- [ ] Blog section
- [ ] Real-time chat
- [ ] Advanced animations
- [ ] CMS integration

### V2.1 Planları
- [ ] 3D elements
- [ ] WebGL animations
- [ ] Voice interface
- [ ] AI chatbot

## 📞 İletişim

- **Email**: mert.yuksel@email.com
- **Phone**: +90 555 123 45 67
- **Location**: İstanbul, Türkiye
- **LinkedIn**: [linkedin.com/in/mertyuksel](#)
- **GitHub**: [github.com/mertyuksel](#)
- **Behance**: [behance.net/mertyuksel](#)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🙏 Teşekkürler

- **Font Awesome** - Icon library
- **Google Fonts** - Poppins font family
- **Unsplash** - Stock photos (when used)
- **Community** - Open source inspiration

---

⭐ Bu projeyi beğendiyseniz star vermeyi unutmayın!

**Made with ❤️ by Mert Yüksel**