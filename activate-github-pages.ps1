# GitHub Pages Otomatik Aktifleştirme Script'i
# Bu script GitHub Pages'i otomatik olarak aktif eder

param(
    [string]$GitHubToken = $null
)

Write-Host "🚀 GitHub Pages Otomatik Aktifleştirme" -ForegroundColor Green
Write-Host "=" * 50

# Repository bilgilerini al
$repoInfo = git remote get-url origin
if ($repoInfo -match "github\.com[:/]([^/]+)/([^/.]+)") {
    $owner = $matches[1]
    $repo = $matches[2].Replace('.git', '')
    Write-Host "📁 Repository: $owner/$repo" -ForegroundColor Cyan
} else {
    Write-Host "❌ Git repository bilgisi alınamadı!" -ForegroundColor Red
    exit 1
}

# GitHub token kontrolü
if (-not $GitHubToken) {
    Write-Host "🔑 GitHub Personal Access Token gerekli..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Token oluşturmak için:" -ForegroundColor White
    Write-Host "1. GitHub.com -> Settings -> Developer settings -> Personal access tokens" -ForegroundColor Gray
    Write-Host "2. 'Generate new token (classic)' tıklayın" -ForegroundColor Gray
    Write-Host "3. 'repo' yetkisini seçin" -ForegroundColor Gray
    Write-Host "4. Token'ı kopyalayın" -ForegroundColor Gray
    Write-Host ""
    $GitHubToken = Read-Host "GitHub Token'ınızı girin"
}

if (-not $GitHubToken) {
    Write-Host "❌ Token gerekli, işlem durduruluyor." -ForegroundColor Red
    exit 1
}

# GitHub Pages API endpoint
$apiUrl = "https://api.github.com/repos/$owner/$repo/pages"
$headers = @{
    "Authorization" = "Bearer $GitHubToken"
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "PowerShell-GitHub-Pages-Activator"
}

try {
    Write-Host "🔍 Mevcut GitHub Pages durumu kontrol ediliyor..." -ForegroundColor Yellow
    
    # Mevcut Pages durumunu kontrol et
    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        Write-Host "✅ GitHub Pages zaten aktif!" -ForegroundColor Green
        Write-Host "🌐 Web site URL: $($response.html_url)" -ForegroundColor Cyan
        Write-Host "📊 Durum: $($response.status)" -ForegroundColor White
        return
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 404) {
            Write-Host "📝 GitHub Pages henüz aktif değil, aktifleştiriliyor..." -ForegroundColor Yellow
        } else {
            throw $_
        }
    }
    
    # GitHub Pages'i aktifleştir
    $body = @{
        source = @{
            branch = "main"
            path = "/"
        }
        build_type = "legacy"
    } | ConvertTo-Json
    
    Write-Host "⚡ GitHub Pages aktifleştiriliyor..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "🎉 GitHub Pages başarıyla aktifleştirildi!" -ForegroundColor Green
    Write-Host "🌐 Web site URL: $($response.html_url)" -ForegroundColor Cyan
    Write-Host "📊 Durum: $($response.status)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "⏳ Web sitenizin yayınlanması 2-5 dakika sürebilir." -ForegroundColor Yellow
    Write-Host "📖 Deployment durumunu kontrol etmek için:" -ForegroundColor White
    Write-Host "   https://github.com/$owner/$repo/actions" -ForegroundColor Gray
    
    # Web sitesini otomatik aç
    Write-Host ""
    $openSite = Read-Host "🌐 Web sitesini şimdi açmak ister misiniz? (y/N)"
    if ($openSite -eq 'y' -or $openSite -eq 'Y') {
        Start-Process $response.html_url
        Write-Host "🚀 Web sitesi tarayıcıda açıldı!" -ForegroundColor Green
    }
    
} catch {
    Write-Host "❌ Hata oluştu:" -ForegroundColor Red
    
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "🔑 Kimlik doğrulama hatası. Token'ınızı kontrol edin." -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "🚫 Yetki hatası. Token'ın 'repo' yetkisine sahip olduğundan emin olun." -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "⚠️  Repository ayarları sorunu. Main branch'in var olduğundan emin olun." -ForegroundColor Yellow
    } else {
        Write-Host "$($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "🛠️  Manuel aktifleştirme için:" -ForegroundColor White
    Write-Host "   1. https://github.com/$owner/$repo/settings/pages" -ForegroundColor Gray
    Write-Host "   2. Source: Deploy from a branch" -ForegroundColor Gray
    Write-Host "   3. Branch: main / (root)" -ForegroundColor Gray
    Write-Host "   4. Save butonuna tıklayın" -ForegroundColor Gray
}