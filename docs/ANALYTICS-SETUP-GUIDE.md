# 📊 Analytics & Tracking Kurulum Rehberi

Bu rehber, sitenize eklenen analytics ve tracking sistemlerinin nasıl aktif edileceğini açıklar.

---

## 🎯 Kurulum Özeti

Aşağıdaki tracking sistemleri **index.html** ve **blog.html** sayfalarına eklenmiştir:

1. ✅ **Google Analytics 4 (GA4)**
2. ✅ **Google Tag Manager (GTM)**
3. ✅ **Facebook Pixel**
4. ✅ **Hotjar Heat Maps & Recordings**
5. ✅ **Custom Event Tracking (analytics.js)**

---

## 📝 Adım Adım Kurulum

### 1️⃣ Google Analytics 4 (GA4) Kurulumu

**Nereye eklendi:** `index.html` ve `blog.html` dosyalarının `<head>` bölümü

**Yapılacaklar:**

1. **Google Analytics hesabı oluşturun:**
   - [analytics.google.com](https://analytics.google.com) adresine gidin
   - "Yönetim" → "Mülk Oluştur" → "GA4 Mülkü"
   - Web sitesi URL'nizi girin: `https://webtelligence.com`

2. **Measurement ID'nizi alın:**
   - Mülk ayarlarından "Veri Akışları" → Web akışını açın
   - **Measurement ID**'yi kopyalayın (Format: `G-XXXXXXXXXX`)

3. **Kodda değiştirin:**
   ```html
   <!-- index.html ve blog.html içinde -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
   
   `G-XXXXXXXXXX` kısmını kendi ID'nizle değiştirin (2 yerde)

**Test:**
- Sayfayı açın ve Chrome DevTools → Network'te `gtag/js` isteğinin başarılı olduğunu kontrol edin
- GA4 dashboard'da "Gerçek Zamanlı" bölümünde ziyaretçileri görmelisiniz (15-30 dakika içinde)

---

### 2️⃣ Google Tag Manager (GTM) Kurulumu

**Nereye eklendi:** `index.html` ve `blog.html` dosyalarının `<head>` ve `<body>` bölümleri

**Yapılacaklar:**

1. **GTM hesabı oluşturun:**
   - [tagmanager.google.com](https://tagmanager.google.com) adresine gidin
   - "Hesap Oluştur" → Hesap ve Konteyner adını girin
   - Platform: "Web" seçin

2. **Container ID'nizi alın:**
   - Konteyner oluşturulduktan sonra **Container ID**'yi kopyalayın (Format: `GTM-XXXXXXX`)

3. **Kodda değiştirin:**
   ```html
   <!-- index.html içinde <head> bölümünde -->
   <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
   
   <!-- <body> açılışından hemen sonra -->
   <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
   height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
   ```
   
   `GTM-XXXXXXX` kısmını kendi Container ID'nizle değiştirin (4 yerde)

**GTM Konfigürasyonu:**
- GTM dashboard'da Google Analytics 4 tag'ini ekleyin
- Measurement ID'nizi girin
- Trigger: "All Pages" seçin
- "Önizleme" modunda test edin
- "Gönder" butonuyla yayınlayın

**Test:**
- Chrome'da GTM önizleme modunu açın
- Sayfada hangi tag'lerin tetiklendiğini görün

---

### 3️⃣ Facebook Pixel Kurulumu

**Nereye eklendi:** `index.html` ve `blog.html` dosyalarının `<head>` bölümü

**Yapılacaklar:**

1. **Facebook Business Manager'da Pixel oluşturun:**
   - [business.facebook.com](https://business.facebook.com) → Ayarlar → Veri Kaynakları
   - "Ekle" → "Piksel"
   - Piksel adını girin: "Webtelligence Pixel"

2. **Pixel ID'nizi alın:**
   - Oluşturulan pikselin detaylarına girin
   - **Pixel ID**'yi kopyalayın (Sadece rakamlar, örn: `123456789012345`)

3. **Kodda değiştirin:**
   ```html
   <!-- index.html ve blog.html içinde -->
   <script>
     fbq('init', 'YOUR_PIXEL_ID');
     fbq('track', 'PageView');
   </script>
   <noscript><img height="1" width="1" style="display:none"
     src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
   /></noscript>
   ```
   
   `YOUR_PIXEL_ID` kısmını kendi Pixel ID'nizle değiştirin (4 yerde)

**Test:**
- Facebook Pixel Helper Chrome eklentisini yükleyin
- Sayfayı açın ve eklentide pikselin aktif olduğunu kontrol edin
- Facebook Events Manager'da "Test Events" bölümünden canlı olayları görün

---

### 4️⃣ Hotjar Kurulumu (Opsiyonel)

**Nereye eklendi:** `index.html` dosyasının `<head>` bölümü

**Yapılacaklar:**

1. **Hotjar hesabı oluşturun:**
   - [hotjar.com](https://www.hotjar.com) → "Sign Up"
   - Plan seçin (Free plan ile başlayabilirsiniz)

2. **Site ekleyin ve Hotjar ID alın:**
   - "New Site" → Site URL'nizi girin
   - **Site ID**'yi kopyalayın (Sadece rakamlar, örn: `1234567`)

3. **Kodda değiştirin:**
   ```html
   <!-- index.html içinde -->
   <script>
       (function(h,o,t,j,a,r){
           h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
           h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
           ...
       })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
   </script>
   ```
   
   `YOUR_HOTJAR_ID` kısmını kendi Site ID'nizle değiştirin (1 yerde)

4. **Hotjar'da kayıtları aktif edin:**
   - Dashboard → "Recordings" → "Start Recording"
   - Dashboard → "Heatmaps" → "New Heatmap" → URL'nizi girin

**Test:**
- Hotjar dashboard'da "Tracking Code Status" kontrolü yapın
- Yeşil onay işareti görmelisiniz

---

## 🎯 Custom Event Tracking (analytics.js)

**Nereye eklendi:** `analytics.js` dosyası tüm sayfalara dahil edildi

### Otomatik İzlenen Olaylar:

✅ **Portfolio proje tıklamaları**
- Hangi projelerin daha çok tıklandığını görün
- Google Analytics → Events → `Portfolio` kategorisi

✅ **Blog yazısı okumaları**
- Hangi blog yazılarının popüler olduğunu görün
- Google Analytics → Events → `Blog` kategorisi

✅ **Blog kategori filtreleme**
- Kullanıcıların hangi kategorilere ilgi duyduğunu görün

✅ **Blog arama sorguları**
- Kullanıcıların ne aradığını görün

✅ **Newsletter kayıtları**
- Kaç kişinin newsletter'a abone olduğunu izleyin
- Facebook Pixel: `Lead` eventi

✅ **Danışmanlık formu:**
- Form başlatma
- Her adımda ilerleme
- Form tamamlama (Conversion!)

✅ **Scroll derinliği** (25%, 50%, 75%, 100%)
- Kullanıcıların sayfayı ne kadar aşağı indiğini görün

✅ **Sayfada geçirilen süre** (30s, 1dk, 2dk, 5dk)
- Engagement metriği

✅ **Dış link tıklamaları**
- Hangi dış linklerin tıklandığını görün

✅ **CTA buton tıklamaları**
- Hangi call-to-action butonlarının etkili olduğunu görün

✅ **Sosyal medya tıklamaları**
- Hangi sosyal medya platformlarına gidildiğini görün

---

## 🔍 Conversion Goals (Dönüşüm Hedefleri)

### Google Analytics 4'te Conversion Ayarlama:

1. **GA4 Dashboard → Configure → Events**
2. Aşağıdaki event'leri "Mark as conversion" ile işaretleyin:
   - `newsletter_signup` - Newsletter kayıtları
   - `consultation_complete` - Danışmanlık formu tamamlama
   - `contact_form_submit` - İletişim formu gönderimi

3. **Dönüşüm değerleri:**
   - Newsletter: 5 TRY (düşük değerli lead)
   - Consultation: 100 TRY (yüksek değerli lead)
   - Contact: 20 TRY (orta değerli lead)

### Facebook Pixel Events:

Otomatik olarak izlenen Facebook events:
- `PageView` - Sayfa görüntüleme
- `ViewContent` - İçerik görüntüleme (Portfolio, Blog)
- `Lead` - Lead oluşturma (Newsletter, Consultation)
- `Contact` - İletişim formu

---

## 📊 Raporlama

### Google Analytics 4'te İzlenecek Metrikler:

1. **Genel Metrikler:**
   - Kullanıcı sayısı
   - Oturum sayısı
   - Sayfa görüntüleme
   - Ortalama oturum süresi
   - Hemen çıkma oranı

2. **Engagement Metrikleri:**
   - Scroll derinliği
   - Sayfada geçirilen süre
   - Olay sayısı (Events)

3. **Conversion Metrikleri:**
   - Newsletter kayıt oranı
   - Danışmanlık formu tamamlama oranı
   - İletişim formu gönderim oranı

4. **Portfolio Performansı:**
   - En çok tıklanan projeler
   - Kategori bazında ilgi

5. **Blog Performansı:**
   - En çok okunan yazılar
   - Ortalama okuma süresi
   - Popüler arama sorguları

### Hotjar'da İzlenecek Metrikler:

1. **Heatmaps:**
   - Kullanıcıların hangi bölgelere tıkladığını görün
   - Scroll haritası (nerede duruyorlar?)
   - Move haritası (fare hareketleri)

2. **Recordings:**
   - Kullanıcı oturumlarını izleyin
   - Sorunlu alanları tespit edin
   - Form abandonment (terk etme) analizi

3. **Funnels:**
   - Danışmanlık formu tamamlama hunisi
   - Hangi adımda kullanıcılar ayrılıyor?

---

## 🚀 Hızlı Test Kontrol Listesi

Siteyi yayınladıktan sonra şunları kontrol edin:

### ✅ Google Analytics 4:
- [ ] Gerçek zamanlı kullanıcılar görünüyor mu?
- [ ] Sayfa görüntüleme event'leri geliyor mu?
- [ ] Custom event'ler (portfolio_click, blog_read) tetikleniyor mu?

### ✅ Google Tag Manager:
- [ ] GTM önizleme modu çalışıyor mu?
- [ ] GA4 tag'i her sayfada tetikleniyor mu?

### ✅ Facebook Pixel:
- [ ] Facebook Pixel Helper eklentisi yeşil onay veriyor mu?
- [ ] Events Manager'da PageView görünüyor mu?
- [ ] Lead ve Contact event'leri test edildi mi?

### ✅ Hotjar:
- [ ] Tracking kodu aktif görünüyor mu?
- [ ] Kayıtlar başladı mı?

### ✅ Custom Events:
- [ ] Konsol logları event'leri gösteriyor mu? (F12 → Console)
- [ ] Portfolio projesine tıklayınca event tetikleniyor mu?
- [ ] Blog arama yapınca event kaydediliyor mu?

---

## 🔧 Troubleshooting (Sorun Giderme)

### Problem: Google Analytics'te veri görünmüyor

**Çözüm:**
1. Measurement ID'nin doğru olduğunu kontrol edin
2. Tarayıcı konsolunda (F12) hata var mı kontrol edin
3. Ad blocker kapalı mı?
4. 15-30 dakika bekleyin (veri gecikmesi olabilir)

### Problem: Facebook Pixel çalışmıyor

**Çözüm:**
1. Pixel ID'nin doğru olduğunu kontrol edin
2. Facebook Pixel Helper eklentisini yükleyin
3. Konsolda `fbq is not defined` hatası varsa, kodun `<head>` içinde olduğundan emin olun

### Problem: Events kaydedilmiyor

**Çözüm:**
1. `analytics.js` dosyasının yüklendiğini kontrol edin (Network tab)
2. Konsol loglarında event'leri görebiliyor musunuz?
3. `gtag` ve `fbq` fonksiyonları tanımlı mı? (Console'da `typeof gtag` yazın)

---

## 📞 Destek

Sorun yaşarsanız:
- Google Analytics Help Center
- Facebook Business Help Center
- Hotjar Support Docs

---

**🎉 Tebrikler!** Siteniz artık kapsamlı analytics tracking ile donatılmış durumda. Kullanıcı davranışlarını analiz ederek sitenizi sürekli geliştirebilirsiniz.

---

**Son Güncelleme:** 27 Ekim 2025
**Hazırlayan:** Mert Yüksel - Webtelligence
