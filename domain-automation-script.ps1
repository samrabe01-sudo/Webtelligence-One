# Domain Otomatik Kurulum Scripti - mexsuweb.com
# Bu script domain satın alındıktan sonra çalıştırılacak

Write-Host "MEXSUweb.com DOMAIN OTOMATİK KURULUM" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# CNAME dosyasını güncelle
Write-Host "`n1. CNAME dosyası güncelleniyor..." -ForegroundColor Yellow
$cnameContent = "mexsuweb.com"
Set-Content -Path "CNAME" -Value $cnameContent
Write-Host "✅ CNAME dosyası güncellendi: mexsuweb.com" -ForegroundColor Green

# Git değişikliklerini commit et
Write-Host "`n2. Git değişiklikleri commit ediliyor..." -ForegroundColor Yellow
git add CNAME
git commit -m "feat: Update domain to mexsuweb.com - Auto setup"
git push origin main
Write-Host "✅ Değişiklikler GitHub'a yüklendi" -ForegroundColor Green

# DNS kontrol bilgileri
Write-Host "`n3. DNS ayarları için namecheap.com'a gidin:" -ForegroundColor Yellow
Write-Host "   - mexsuweb.com → Manage → Advanced DNS" -ForegroundColor White
Write-Host "   - 4 adet A Record ekleyin:" -ForegroundColor White
Write-Host "     Type: A | Host: @ | Value: 185.199.108.153" -ForegroundColor Gray
Write-Host "     Type: A | Host: @ | Value: 185.199.109.153" -ForegroundColor Gray
Write-Host "     Type: A | Host: @ | Value: 185.199.110.153" -ForegroundColor Gray
Write-Host "     Type: A | Host: @ | Value: 185.199.111.153" -ForegroundColor Gray
Write-Host "   - 1 adet CNAME Record:" -ForegroundColor White
Write-Host "     Type: CNAME | Host: www | Value: samrabe01-sudo.github.io." -ForegroundColor Gray

Write-Host "`n4. GitHub Pages ayarları:" -ForegroundColor Yellow
Write-Host "   - GitHub.com → Repository → Settings → Pages" -ForegroundColor White
Write-Host "   - Custom domain: mexsuweb.com" -ForegroundColor Green
Write-Host "   - Enforce HTTPS işaretleyin" -ForegroundColor White

Write-Host "`n5. DNS propagation kontrolü:" -ForegroundColor Yellow
Write-Host "   - https://dnschecker.org → mexsuweb.com" -ForegroundColor White
Write-Host "   - 24 saat içinde tüm lokasyonlarda yeşil olmalı" -ForegroundColor White

Write-Host "`n✅ Otomatik kurulum tamamlandı!" -ForegroundColor Green
Write-Host "🕐 24-48 saat sonra https://mexsuweb.com erişilebilir olacak" -ForegroundColor Cyan