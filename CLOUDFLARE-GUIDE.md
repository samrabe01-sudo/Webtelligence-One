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