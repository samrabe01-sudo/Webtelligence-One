#!/bin/bash

# GitHub'a deploy scripti
echo "🚀 Web sitesi deploy ediliyor..."

# Değişiklikleri ekle
git add .

# Commit mesajı
echo "📝 Commit mesajı girin:"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Website update - $(date +%Y-%m-%d)"
fi

git commit -m "$commit_message"

# GitHub'a push
git push origin main

echo "✅ Website başarıyla deploy edildi!"
echo "🌐 Siteniz yakında şu adreste yayında olacak:"
echo "https://samrabe01-sudo.github.io/Webtelligence-One/"

if [ -f "CNAME" ]; then
    domain=$(cat CNAME)
    echo "🎯 Custom domain: https://$domain"
fi