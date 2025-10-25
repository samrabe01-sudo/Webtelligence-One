# 🌐 Domain Bağlama Rehberi

## 1️⃣ Domain Satın Alma
- GoDaddy, Namecheap, Domain.com gibi sitelerden domain alın
- Önerilen: .com, .net, .org uzantıları

## 2️⃣ GitHub Pages Ayarları
1. Bu repository'de Settings > Pages'e gidin
2. Source: "Deploy from a branch" seçin
3. Branch: "main" seçin
4. Custom domain kısmına domain'inizi yazın (örn: www.yoursite.com)
5. "Enforce HTTPS" seçeneğini aktifleştirin

## 3️⃣ DNS Ayarları (GoDaddy)
GoDaddy DNS Management'a gidin ve şu kayıtları ekleyin:

### A Records:
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 Hour

Type: A  
Name: @
Value: 185.199.109.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.110.153
TTL: 1 Hour

Type: A
Name: @
Value: 185.199.111.153
TTL: 1 Hour
```

### CNAME Record:
```
Type: CNAME
Name: www
Value: samrabe01-sudo.github.io
TTL: 1 Hour
```

## 4️⃣ SSL Sertifikası
- GitHub Pages otomatik olarak Let's Encrypt SSL sertifikası sağlar
- 24 saat içinde aktif olur

## 5️⃣ Deployment
Değişiklikleri yüklemek için:
```bash
./deploy.ps1   # Windows
# veya
./deploy.sh    # Linux/Mac
```

## 🚀 Alternatif Hosting Seçenekleri

### Netlify (Önerilen)
1. netlify.com'a üye olun
2. "New site from Git" tıklayın
3. GitHub repository'nizi seçin
4. Deploy settings: Build command boş, Publish directory: "/"
5. Domain settings'den custom domain ekleyin

### Vercel
1. vercel.com'a üye olun
2. "New Project" > GitHub'dan import edin
3. Deploy ayarları otomatik
4. Domain settings'den custom domain ekleyin

## 📧 Contact Form
- Netlify Forms: Otomatik çalışır, form submission'ları Netlify dashboard'da görünür
- EmailJS: JavaScript ile email gönderimi
- Formspree: Basit form backend servisi

## 🔧 Performans Optimizasyonu
- Images: WebP formatına çevirin
- CSS/JS: Minify edin  
- CDN: Cloudflare kullanın
- SEO: Meta tags ekleyin

## 📊 Analytics
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🛡️ Güvenlik
- HTTPS her zaman aktif
- CSP headers ekleyin
- Regular backup alın

## ⏰ DNS Propagation
- DNS değişiklikleri 24-48 saat sürebilir
- DNS checker ile kontrol edin: dnschecker.org

## 📞 Destek
DNS ayarları ile ilgili sorun yaşarsanız domain sağlayıcınızın support'una başvurun.