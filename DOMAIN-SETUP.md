# 🌐 Domain Kurulum Rehberi - Webtelligence# 🌐 Domain Kurulum Rehberi - Mert Yüksel Portfoliou# 🌐 Domain Bağlama Rehberi



## 📋 Adım Adım Domain Kurulumu



### 1️⃣ Domain Satın Alındıktan Sonra## 📋 Adım Adım Domain Kurulumu## 1️⃣ Domain Satın Alma



#### Namecheap Panel Girişi (Önerilen):- GoDaddy, Namecheap, Domain.com gibi sitelerden domain alın

1. namecheap.com → Sign In

2. Account → Domain List  ### 1️⃣ Domain Satın Alındıktan Sonra- Önerilen: .com, .net, .org uzantıları

3. `webtelligence.com` → Manage



#### GoDaddy Panel (Alternatif):

1. godaddy.com → My Products#### Namecheap Panel Girişi (Önerilen):## 2️⃣ GitHub Pages Ayarları

2. Domains → Manage

3. DNS → Manage Zones1. namecheap.com → Sign In1. Bu repository'de Settings > Pages'e gidin



### 2️⃣ DNS Ayarları (KRİTİK ADIM)2. Account → Domain List  2. Source: "Deploy from a branch" seçin



#### Namecheap için Advanced DNS:3. `mertyuksel.com` → Manage3. Branch: "main" seçin

```dns

# A Records (GitHub Pages IP'leri)4. Custom domain kısmına domain'inizi yazın (örn: www.yoursite.com)

Type: A Record | Host: @ | Value: 185.199.108.153 | TTL: Automatic

Type: A Record | Host: @ | Value: 185.199.109.153 | TTL: Automatic  #### GoDaddy Panel (Alternatif):5. "Enforce HTTPS" seçeneğini aktifleştirin

Type: A Record | Host: @ | Value: 185.199.110.153 | TTL: Automatic

Type: A Record | Host: @ | Value: 185.199.111.153 | TTL: Automatic1. godaddy.com → My Products



# CNAME Record (www yönlendirmesi)2. Domains → Manage## 3️⃣ DNS Ayarları (GoDaddy)

Type: CNAME | Host: www | Value: samrabe01-sudo.github.io. | TTL: Automatic

```3. DNS → Manage ZonesGoDaddy DNS Management'a gidin ve şu kayıtları ekleyin:



#### GoDaddy için DNS Management:

```dns

Type: A | Name: @ | Value: 185.199.108.153 | TTL: 1 Hour### 2️⃣ DNS Ayarları (KRİTİK ADIM)### A Records:

Type: A | Name: @ | Value: 185.199.109.153 | TTL: 1 Hour

Type: A | Name: @ | Value: 185.199.110.153 | TTL: 1 Hour```

Type: A | Name: @ | Value: 185.199.111.153 | TTL: 1 Hour

Type: CNAME | Name: www | Value: samrabe01-sudo.github.io | TTL: 1 Hour#### Namecheap için Advanced DNS:Type: A

```

```dnsName: @

### 3️⃣ GitHub Pages Ayarları

# A Records (GitHub Pages IP'leri)Value: 185.199.108.153

#### Repository Settings:

1. GitHub → Webtelligence-One repositoryType: A Record | Host: @ | Value: 185.199.108.153 | TTL: AutomaticTTL: 1 Hour

2. **Settings** tab

3. Sol menüden **"Pages"**Type: A Record | Host: @ | Value: 185.199.109.153 | TTL: Automatic  

4. Source: **"Deploy from a branch"**

5. Branch: **main** / **(root)**Type: A Record | Host: @ | Value: 185.199.110.153 | TTL: AutomaticType: A  

6. Custom domain: **`webtelligence.com`**

7. **Save** butonuna tıklayınType: A Record | Host: @ | Value: 185.199.111.153 | TTL: AutomaticName: @

8. ✅ **"Enforce HTTPS"** (24 saat sonra aktif olur)

Value: 185.199.109.153

#### CNAME Dosyası:

✅ Repository'de zaten hazır: `webtelligence.com`# CNAME Record (www yönlendirmesi)TTL: 1 Hour



### 4️⃣ SSL SertifikasıType: CNAME | Host: www | Value: samrabe01-sudo.github.io. | TTL: Automatic



#### Otomatik GitHub Pages SSL:```Type: A

- **Let's Encrypt** ücretsiz SSL

- **24 saat** içinde aktif olurName: @

- Yeşil kilit simgesi görünecek

#### GoDaddy için DNS Management:Value: 185.199.110.153

### 5️⃣ Test ve Doğrulama

```dnsTTL: 1 Hour

#### DNS Kontrol Araçları:

```bashType: A | Name: @ | Value: 185.199.108.153 | TTL: 1 Hour

# Terminal komutları

nslookup webtelligence.comType: A | Name: @ | Value: 185.199.109.153 | TTL: 1 HourType: A

dig webtelligence.com A

ping webtelligence.comType: A | Name: @ | Value: 185.199.110.153 | TTL: 1 HourName: @



# Online araçlarType: A | Name: @ | Value: 185.199.111.153 | TTL: 1 HourValue: 185.199.111.153

https://dnschecker.org/ → webtelligence.com

https://whatsmydns.net/ → webtelligence.comType: CNAME | Name: www | Value: samrabe01-sudo.github.io | TTL: 1 HourTTL: 1 Hour

```

``````

#### Site Erişim Testleri:

```

✅ http://webtelligence.com → Site açılıyor

✅ https://webtelligence.com → SSL ile güvenli### 3️⃣ GitHub Pages Ayarları### CNAME Record:

✅ www.webtelligence.com → www ile yönlendirme

✅ Mobil cihazdan erişim```

```

#### Repository Settings:Type: CNAME

### 6️⃣ Email Forwarding Kurulumu

1. GitHub → Webtelligence-One repositoryName: www

#### Namecheap Email Forwarding:

1. Domain Manage → **Email Forwarding** tab2. **Settings** tabValue: samrabe01-sudo.github.io

2. **Add Forwarder:**

   ```3. Sol menüden **"Pages"**TTL: 1 Hour

   info@webtelligence.com → mertyuksll@gmail.com

   contact@webtelligence.com → mertyuksll@gmail.com4. Source: **"Deploy from a branch"**```

   hello@webtelligence.com → mertyuksll@gmail.com

   admin@webtelligence.com → mertyuksll@gmail.com5. Branch: **main** / **(root)**

   ```

3. **Catch-All:** `*@webtelligence.com` → `mertyuksll@gmail.com`6. Custom domain: **`mertyuksel.com`**## 4️⃣ SSL Sertifikası



#### Gmail'de Professional Email Setup:7. **Save** butonuna tıklayın- GitHub Pages otomatik olarak Let's Encrypt SSL sertifikası sağlar

1. Gmail → ⚙️ Settings → **Accounts and Import**

2. **"Send mail as"** → **Add another email address**8. ✅ **"Enforce HTTPS"** (24 saat sonra aktif olur)- 24 saat içinde aktif olur

3. **Name:** Webtelligence

4. **Email:** info@webtelligence.com

5. **Reply-to:** mertyuksll@gmail.com

#### CNAME Dosyası:## 5️⃣ Deployment

---

✅ Repository'de zaten hazır: `mertyuksel.com`Değişiklikleri yüklemek için:

## ⏰ Bekleme Süreleri ve Timeline

```bash

| İşlem | Minimum | Maksimum | Not |

|-------|---------|----------|-----|### 4️⃣ SSL Sertifikası./deploy.ps1   # Windows

| **DNS Propagation** | 1 saat | 48 saat | Genelde 4-24 saat |

| **SSL Aktivasyonu** | 1 saat | 24 saat | GitHub Pages otomatik |# veya

| **Email Forwarding** | 5 dakika | 2 saat | Namecheap hızlı |

| **GitHub Pages Deploy** | 30 saniye | 10 dakika | Otomatik |#### Otomatik GitHub Pages SSL:./deploy.sh    # Linux/Mac



---- **Let's Encrypt** ücretsiz SSL```



## 🧪 Test Checklist- **24 saat** içinde aktif olur



### ✅ Kurulum Kontrol Listesi:- Yeşil kilit simgesi görünecek## 🚀 Alternatif Hosting Seçenekleri

- [ ] Domain satın alındı

- [ ] DNS A records ayarlandı (4 adet)

- [ ] DNS CNAME record ayarlandı (www)

- [ ] GitHub Pages custom domain ayarlandı### 5️⃣ Test ve Doğrulama### Netlify (Önerilen)

- [ ] CNAME dosyası repository'de mevcut

- [ ] DNS propagation tamamlandı1. netlify.com'a üye olun

- [ ] SSL sertifikası aktif (yeşil kilit)

- [ ] www yönlendirmesi çalışıyor#### DNS Kontrol Araçları:2. "New site from Git" tıklayın

- [ ] Email forwarding kuruldu

- [ ] Mobil responsive test edildi```bash3. GitHub repository'nizi seçin



### 🔍 Debug Komutları:# Terminal komutları4. Deploy settings: Build command boş, Publish directory: "/"

```bash

# DNS A record kontrolünslookup mertyuksel.com5. Domain settings'den custom domain ekleyin

nslookup webtelligence.com 8.8.8.8

dig mertyuksel.com A

# CNAME kontrolü  

nslookup www.webtelligence.com 8.8.8.8ping mertyuksel.com### Vercel



# HTTP response kontrolü1. vercel.com'a üye olun

curl -I https://webtelligence.com

# Online araçlar2. "New Project" > GitHub'dan import edin

# SSL sertifika detayları

openssl s_client -connect webtelligence.com:443 -servername webtelligence.comhttps://dnschecker.org/ → mertyuksel.com3. Deploy ayarları otomatik

```

https://whatsmydns.net/ → mertyuksel.com4. Domain settings'den custom domain ekleyin

---

```

## 🚨 Sorun Giderme

## 📧 Contact Form

### ❌ **DNS Yayılmadı (24+ saat geçti):**

**Çözüm:**#### Site Erişim Testleri:- Netlify Forms: Otomatik çalışır, form submission'ları Netlify dashboard'da görünür

1. TTL süresini düşürün (300 saniye)

2. DNS cache temizleyin: `ipconfig /flushdns````- EmailJS: JavaScript ile email gönderimi

3. Farklı DNS kullanın: 8.8.8.8, 1.1.1.1

4. Domain sağlayıcı support'una yazın✅ http://mertyuksel.com → Site açılıyor- Formspree: Basit form backend servisi



### ❌ **SSL Aktif Olmadı:**✅ https://mertyuksel.com → SSL ile güvenli

**Çözüm:**

1. GitHub Pages settings'te "Enforce HTTPS" bekleyin✅ www.mertyuksel.com → www ile yönlendirme## 🔧 Performans Optimizasyonu

2. Custom domain'i kaldırıp tekrar ekleyin

3. 24 saat geçtikten sonra GitHub support✅ Mobil cihazdan erişim- Images: WebP formatına çevirin



### ❌ **Site 404 Error:**```- CSS/JS: Minify edin  

**Çözüm:**

1. Repository'nin **public** olduğunu kontrol edin- CDN: Cloudflare kullanın

2. GitHub Pages **source branch** doğru seçildi mi?

3. **CNAME** dosyası içeriği: `webtelligence.com` (www yok)### 6️⃣ Email Forwarding Kurulumu- SEO: Meta tags ekleyin

4. **index.html** dosyası root'ta olmalı



### ❌ **Email Forward Çalışmıyor:**

**Çözüm:**#### Namecheap Email Forwarding:## 📊 Analytics

1. MX records kontrol edin

2. Gmail spam klasörünü kontrol edin1. Domain Manage → **Email Forwarding** tab```html

3. Email forwarding ayarlarını yeniden yapın

2. **Add Forwarder:**<!-- Google Analytics -->

---

   ```<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

## 📊 SEO ve Analytics Kurulumu

   info@mertyuksel.com → mertyuksll@gmail.com<script>

### 🔍 **Google Search Console:**

1. [search.google.com/search-console](https://search.google.com/search-console)   contact@mertyuksel.com → mertyuksll@gmail.com  window.dataLayer = window.dataLayer || [];

2. **Add Property** → **URL prefix** → `https://webtelligence.com`

3. **Verify ownership** → DNS TXT record ekleyin   hello@mertyuksel.com → mertyuksll@gmail.com  function gtag(){dataLayer.push(arguments);}



### 📈 **Google Analytics 4:**   ```  gtag('js', new Date());

```html

<!-- Head tag'ine ekleyin -->3. **Catch-All:** `*@mertyuksel.com` → `mertyuksll@gmail.com`  gtag('config', 'GA_MEASUREMENT_ID');

<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<script></script>

  window.dataLayer = window.dataLayer || [];

  function gtag(){dataLayer.push(arguments);}#### Gmail'de Professional Email Setup:```

  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');1. Gmail → ⚙️ Settings → **Accounts and Import**

</script>

```2. **"Send mail as"** → **Add another email address**## 🛡️ Güvenlik



### 🗺️ **Sitemap.xml:**3. **Name:** Mert Yüksel- HTTPS her zaman aktif

Google Search Console'a sitemap ekleyin:

`https://webtelligence.com/sitemap.xml`4. **Email:** info@mertyuksel.com- CSP headers ekleyin



---5. **Reply-to:** mertyuksll@gmail.com- Regular backup alın



## 🎯 Final Kontrolü ve Başarı Kriterleri



### ✅ **Başarılı Kurulum Kriterleri:**---## ⏰ DNS Propagation

```

🌐 https://webtelligence.com → ✅ Ana site yükleniyor- DNS değişiklikleri 24-48 saat sürebilir

🌐 https://www.webtelligence.com → ✅ www yönlendirmesi

🔒 SSL Sertifikası → ✅ Yeşil kilit simgesi  ## ⏰ Bekleme Süreleri ve Timeline- DNS checker ile kontrol edin: dnschecker.org

📧 info@webtelligence.com → ✅ Email forwarding

📱 Mobil Erişim → ✅ Responsive tasarım

⚡ Hız Testi → ✅ <3 saniye yükleme

🔍 SEO → ✅ Google'da indekslendi| İşlem | Minimum | Maksimum | Not |## 📞 Destek

```

|-------|---------|----------|-----|DNS ayarları ile ilgili sorun yaşarsanız domain sağlayıcınızın support'una başvurun.

### 🧪 **Final Test Komutları:**| **DNS Propagation** | 1 saat | 48 saat | Genelde 4-24 saat |

```bash| **SSL Aktivasyonu** | 1 saat | 24 saat | GitHub Pages otomatik |

# Tüm test komutları| **Email Forwarding** | 5 dakika | 2 saat | Namecheap hızlı |

curl -I https://webtelligence.com| **GitHub Pages Deploy** | 30 saniye | 10 dakika | Otomatik |

curl -I https://www.webtelligence.com  

nslookup webtelligence.com---

dig webtelligence.com

ping webtelligence.com## 🧪 Test Checklist

```

### ✅ Kurulum Kontrol Listesi:

---- [ ] Domain satın alındı

- [ ] DNS A records ayarlandı (4 adet)

## 🎉 **Tebrikler! Domain Kurulumu Tamamlandı**- [ ] DNS CNAME record ayarlandı (www)

- [ ] GitHub Pages custom domain ayarlandı

**🚀 Profesyonel web siteniz artık yayında:**- [ ] CNAME dosyası repository'de mevcut

- **Ana Site:** https://webtelligence.com- [ ] DNS propagation tamamlandı

- **WWW:** https://www.webtelligence.com  - [ ] SSL sertifikası aktif (yeşil kilit)

- **Email:** info@webtelligence.com- [ ] www yönlendirmesi çalışıyor

- **Status:** 🌟 Webtelligence Corporate Website Live!- [ ] Email forwarding kuruldu

- [ ] Mobil responsive test edildi

**📈 Sonraki Adımlar:**

1. Google Analytics ve Search Console kurulumu### 🔍 Debug Komutları:

2. Social media linklerini güncelleme```bash

3. Business card'larda domain kullanımı# DNS A record kontrolü

4. Email imzasında domain entegrasyonunslookup mertyuksel.com 8.8.8.8



**💼 Artık tam bir profesyonel şirket web kimliğiniz var!**# CNAME kontrolü  
nslookup www.mertyuksel.com 8.8.8.8

# HTTP response kontrolü
curl -I https://mertyuksel.com

# SSL sertifika detayları
openssl s_client -connect mertyuksel.com:443 -servername mertyuksel.com
```

---

## 🚨 Sorun Giderme

### ❌ **DNS Yayılmadı (24+ saat geçti):**
**Çözüm:**
1. TTL süresini düşürün (300 saniye)
2. DNS cache temizleyin: `ipconfig /flushdns`
3. Farklı DNS kullanın: 8.8.8.8, 1.1.1.1
4. Domain sağlayıcı support'una yazın

### ❌ **SSL Aktif Olmadı:**
**Çözüm:**
1. GitHub Pages settings'te "Enforce HTTPS" bekleyin
2. Custom domain'i kaldırıp tekrar ekleyin
3. 24 saat geçtikten sonra GitHub support

### ❌ **Site 404 Error:**
**Çözüm:**
1. Repository'nin **public** olduğunu kontrol edin
2. GitHub Pages **source branch** doğru seçildi mi?
3. **CNAME** dosyası içeriği: `mertyuksel.com` (www yok)
4. **index.html** dosyası root'ta olmalı

### ❌ **Email Forward Çalışmıyor:**
**Çözüm:**
1. MX records kontrol edin
2. Gmail spam klasörünü kontrol edin
3. Email forwarding ayarlarını yeniden yapın

---

## 📊 SEO ve Analytics Kurulumu

### 🔍 **Google Search Console:**
1. [search.google.com/search-console](https://search.google.com/search-console)
2. **Add Property** → **URL prefix** → `https://mertyuksel.com`
3. **Verify ownership** → DNS TXT record ekleyin

### 📈 **Google Analytics 4:**
```html
<!-- Head tag'ine ekleyin -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 🗺️ **Sitemap.xml:**
Google Search Console'a sitemap ekleyin:
`https://mertyuksel.com/sitemap.xml`

---

## 🎯 Final Kontrolü ve Başarı Kriterleri

### ✅ **Başarılı Kurulum Kriterleri:**
```
🌐 https://mertyuksel.com → ✅ Ana site yükleniyor
🌐 https://www.mertyuksel.com → ✅ www yönlendirmesi
🔒 SSL Sertifikası → ✅ Yeşil kilit simgesi  
📧 info@mertyuksel.com → ✅ Email forwarding
📱 Mobil Erişim → ✅ Responsive tasarım
⚡ Hız Testi → ✅ <3 saniye yükleme
🔍 SEO → ✅ Google'da indekslendi
```

### 🧪 **Final Test Komutları:**
```bash
# Tüm test komutları
curl -I https://mertyuksel.com
curl -I https://www.mertyuksel.com  
nslookup mertyuksel.com
dig mertyuksel.com
ping mertyuksel.com
```

---

## 🎉 **Tebrikler! Domain Kurulumu Tamamlandı**

**🚀 Profesyonel web siteniz artık yayında:**
- **Ana Site:** https://mertyuksel.com
- **WWW:** https://www.mertyuksel.com  
- **Email:** info@mertyuksel.com
- **Status:** 🌟 Professional Developer Portfolio Live!

**📈 Sonraki Adımlar:**
1. Google Analytics ve Search Console kurulumu
2. Social media linklerini güncelleme
3. Business card'larda domain kullanımı
4. Email imzasında domain entegrasyonu

**💼 Artık tam bir profesyonel web geliştirici kimliğiniz var!**