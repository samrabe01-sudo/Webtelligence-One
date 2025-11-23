# GitHub Deploy Script for Windows
Write-Host "🚀 Web sitesi deploy ediliyor..." -ForegroundColor Green

# Değişiklikleri ekle
git add .

# Commit mesajı al
$commitMessage = Read-Host "📝 Commit mesajı girin (boş bırakılırsa otomatik mesaj kullanılır)"

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Website update - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

git commit -m $commitMessage

# GitHub'a push
git push origin main

Write-Host "✅ Website başarıyla deploy edildi!" -ForegroundColor Green
Write-Host "🌐 Siteniz yakında şu adreste yayında olacak:" -ForegroundColor Cyan
Write-Host "https://samrabe01-sudo.github.io/Webtelligence-One/" -ForegroundColor Yellow

if (Test-Path "CNAME") {
    $domain = Get-Content "CNAME"
    Write-Host "🎯 Custom domain: https://$domain" -ForegroundColor Cyan
}

Write-Host "⏰ Deploy işlemi 2-5 dakika sürebilir." -ForegroundColor Yellow