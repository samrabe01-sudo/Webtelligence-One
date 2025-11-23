# ☁️ Cloudflare Nedir?

## 🎯 Cloudflare'in Ana İşlevleri:

### 1️⃣ **CDN (Content Delivery Network)**
- Sitenizin dünya çapında kopyalarını oluşturur
- Kullanıcılara en yakın sunucudan hizmet verir
- **Sonuç:** Site çok daha hızlı yüklenir

### 2️⃣ **DDoS Koruması**
- Kötü amaçlı saldırıları engeller
- Sitenizi çökertmeye çalışan botları filtreler
- **Sonuç:** Site her zaman erişilebilir kalır

### 3️⃣ **SSL Sertifikası**
- Ücretsiz HTTPS sertifikası
- Otomatik yenileme
- **Sonuç:** Site güvenli (yeşil kilit)

### 4️⃣ **Performans Optimizasyonu**
- CSS/JS dosyalarını sıkıştırır
- Görselleri optimize eder
- Cache sistemi ile hızlandırır
- **Sonuç:** %30-50 daha hızlı site

### 5️⃣ **Analytics**
- Ziyaretçi istatistikleri
- Bot trafiği filtrelemesi
- Performans metrikleri
- **Sonuç:** Google Analytics'e ek veriler

## 🚀 Cloudflare Kurulumu:

### Ücretsiz Plan (Yeterli):
1. cloudflare.com'a üye olun
2. Domain'inizi ekleyin
3. DNS kayıtlarını otomatik tarar
4. Nameserver'ları domain sağlayıcınızda değiştirin
5. Otomatik aktif olur

### Pro Plan ($20/ay):
- Daha gelişmiş analytics
- Daha hızlı CDN
- Gelişmiş güvenlik

## ⚡ Performans Artışı:
- **Önce:** 3-4 saniye yüklenme
- **Sonra:** 1-2 saniye yüklenme
- Mobilde daha da hızlı

---

## 🔀 /api/* Proxy (Cloudflare Workers + Routes)

Statik site (GitHub Pages/Netlify) + ayrı bir Node.js backend kullanıyorsanız, Cloudflare ile aynı domain altında API yayınlayabilirsiniz. Amaç: `https://www.mexsuweb.com/api/*` isteklerini backend'inize iletmek.

### 1) Worker Script (proxy)

Bu repo içinde örnek worker dosyası hazır: `cloudflare/worker-api-proxy.js`

Özeti: `/api/*` isteklerini `env.TARGET_API_ORIGIN` değişkenine (örn: `https://api.mexsuweb.com`) proxy'ler.

### 2) Wrangler ile deploy (opsiyonel)

wrangler.toml örneği:

```toml
name = "mexsuweb-api-proxy"
main = "cloudflare/worker-api-proxy.js"
compatibility_date = "2024-11-01"

[vars]
TARGET_API_ORIGIN = "https://api.mexsuweb.com"

routes = [
	{ pattern = "www.mexsuweb.com/api/*", zone_name = "mexsuweb.com" }
]
```

CLI:

```bash
wrangler login
wrangler deploy
```

### 3) Cloudflare Dashboard üzerinden (no-code)
1. Workers & Pages > Workers > Create Worker (Quick edit)
2. `cloudflare/worker-api-proxy.js` içeriğini kopyalayın
3. Settings > Variables > `TARGET_API_ORIGIN = https://api.mexsuweb.com`
4. Triggers > Routes > Add Route: `www.mexsuweb.com/api/*` (Zone: mexsuweb.com)
5. Kaydedin; anında aktif olur

### 4) DNS
Backend'iniz için (örn. Render) `api.mexsuweb.com` CNAME kaydı oluşturun; Render'ın verdiği hosta yönlendirin.

> Avantaj: Frontend kodu `/api/...` kullanmaya devam eder; CORS/çapraz origin sorunları minimuma iner.

---

## 🛡️ Önerilen Cache Rules ve Security Ayarları

Cloudflare Dashboard > Caching > Cache Rules ve Security alanlarında aşağıdaki önerileri uygulayın:

### Cache Rules
- Kural 1: Bypass cache for API
	- If URL Path matches: `/api/*`
	- Then: Cache level → Bypass
	- Not: API istekleri asla cache'lenmesin.

- Kural 2: Bypass cache for Service Worker
	- If URL Path matches: `/sw.js`
	- Then: Cache level → Bypass

- Kural 3: Cache Everything for static
	- If URL Path matches: `*`
	- And NOT matches: `/api/*|/sw.js`
	- Then: Cache level → Cache Everything, Edge TTL: 1 day (ihtiyaca göre)
	- Optionally: Add Browser Cache TTL e.g. 1 hour

Not: Netlify/GitHub Pages gibi platformlarda değişim frekansınıza göre TTL değerlerini ayarlayın.

### Security
- Security Level: Medium veya High (trafik durumunuza göre)
- Bot Fight Mode: Açık (API davranışında sorun görürseniz sadece statik için açık bırakın)
- WAF: /api/* için rate limiting düşünebilirsiniz (örn. 60 req/1m/IP)
- Always Use HTTPS: Açık

### SSL/TLS
- SSL/TLS mode: Full (Strict) önerilir (origin’de geçerli sertifika varsa)
- Automatic HTTPS Rewrites: Açık
- HTTP/2 ve HTTP/3: Açık

Bu ayarlar, statik içeriğin hızlı ve verimli sunulmasını, API isteklerinin ise her zaman origin’e yönlenmesini sağlar.