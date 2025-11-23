# 🚀 Render ile Backend Deploy

Bu rehber Node.js/Express backend'i (bu repo) Render üzerinde Web Service olarak yayınlamanızı anlatır.

## 1) Hazırlık
- GitHub repo: `samrabe01-sudo/Webtelligence-One`
- .env değerleri (Render Dashboard > Environment):
  - `PORT=4000` (Render otomatik `PORT` atar; Express bunu kullanır. server.js `process.env.PORT || 4000` ile okuyor.)
  - `MONGODB_URI` (Atlas ya da başka bir Mongo URI)
  - `JWT_SECRET` (güçlü bir secret)

## 2) Yeni Web Service
- Render Dashboard > New > Web Service
- Repository: Webtelligence-One
- Branch: main
- Runtime: Node
- Build Command: `npm install`
- Start Command: `node server.js`
- Region: size/region ihtiyacınıza göre
- Environment: `Node` ve yukarıdaki env değişkenlerini girin
- Create Service

Render, deploy sonrası bir host adı verir: örn. `webtelligence-one.onrender.com`

## 3) Custom Domain (api.mexsuweb.com)
- Render service > Settings > Custom Domains > Add Custom Domain
- `api.mexsuweb.com` ekleyin
- Render CNAME hedefini gösterir; Cloudflare DNS'te `api` için CNAME kaydını o hosta yönlendirin
- SSL kurulumu Render tarafından otomatik tamamlanır

## 4) Frontend ile Entegrasyon
- Tavsiye edilen: Cloudflare Workers + Routes ile `www.mexsuweb.com/api/*` isteklerini `https://api.mexsuweb.com` adresine proxy'leyin (aynı origin hissi)
- Alternatif: Frontend'te `window.API_BASE = 'https://api.mexsuweb.com'` olarak ayarlayın
  - Admin: `public/admin/admin-config.js`
  - Ana site: `site-config.js` (kök dizinde; index.html'e eklenir)

## 5) Sağlık ve Test
- `GET https://api.mexsuweb.com/api/health` → `{ ok: true }`
- Admin: `POST https://api.mexsuweb.com/api/admin/login { username, password }`
- Public: `POST https://api.mexsuweb.com/api/public/login { email, password }`

### Render Health Check Ayarı
- Service > Settings > Health Checks bölümünde:
  - Health Check Path: `/api/health`
  - Health Check Interval: 10-30s arası (planınıza göre)
  - Failure Threshold: 3 (varsayılan uygundur)

Not: server.js içinde `/api/health` endpoint’i hazırdır ve `{ ok: true }` döner.

## 6) Sık Sorunlar
- 502/504: Instance uykuya geçmiş olabilir (free plan). İlk istek yavaş gelebilir.
- CORS: Aynı domain proxy ile sorun çözülür. Ayrı domaindeyseniz backend CORS'u açık (app.use(cors())).
- Mongo bağlantı hatası: MONGODB_URI doğruluğunu ve IP allow list (Atlas) ayarlarını kontrol edin.
