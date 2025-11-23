# PowerShell Web Server for Portfolio
# Basit HTTP sunucu oluşturur

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()

Write-Host "🚀 Web sunucu başlatıldı!"
Write-Host "📍 Adres: http://localhost:8000"
Write-Host "⭐ Mert Yüksel Portfolio Web Sitesi"
Write-Host "❌ Durdurmak için Ctrl+C tuşlayın"
Write-Host ""

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $url = $request.Url.LocalPath
        
        # Ana sayfa için index.html
        if ($url -eq "/" -or $url -eq "/index.html") {
            $filePath = Join-Path $PSScriptRoot "index.html"
        }
        # CSS dosyası
        elseif ($url -eq "/styles.css") {
            $filePath = Join-Path $PSScriptRoot "styles.css"
        }
        # JavaScript dosyası
        elseif ($url -eq "/script.js") {
            $filePath = Join-Path $PSScriptRoot "script.js"
        }
        # Diğer dosyalar
        else {
            $filePath = Join-Path $PSScriptRoot $url.TrimStart('/')
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
            
            # Content-Type belirleme
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css"  { $response.ContentType = "text/css; charset=utf-8" }
                ".js"   { $response.ContentType = "text/javascript; charset=utf-8" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".gif"  { $response.ContentType = "image/gif" }
                ".ico"  { $response.ContentType = "image/x-icon" }
                default { $response.ContentType = "text/plain; charset=utf-8" }
            }
            
            $response.StatusCode = 200
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            # 404 - Dosya bulunamadı
            $notFound = @"
<!DOCTYPE html>
<html>
<head>
    <title>404 - Sayfa Bulunamadı</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
        h1 { color: #6c5ce7; }
    </style>
</head>
<body>
    <h1>404 - Sayfa Bulunamadı</h1>
    <p>Aradığınız sayfa mevcut değil.</p>
    <a href="/">Ana Sayfaya Dön</a>
</body>
</html>
"@
            $bytes = [System.Text.Encoding]::UTF8.GetBytes($notFound)
            $response.ContentType = "text/html; charset=utf-8"
            $response.StatusCode = 404
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        
        $response.Close()
        
        # Log
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "[$timestamp] $($request.HttpMethod) $($request.Url.LocalPath) - $($response.StatusCode)"
    }
}
catch {
    Write-Host "Hata: $($_.Exception.Message)"
}
finally {
    $listener.Stop()
    Write-Host "Web sunucu durduruldu."
}