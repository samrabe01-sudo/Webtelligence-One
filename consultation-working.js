// ========================================
// WORKING CONSULTATION QUESTIONNAIRE
// ========================================

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuestionnaire);
    } else {
        initQuestionnaire();
    }
    
    function initQuestionnaire() {
        const wrapper = document.getElementById('questionWrapper');
        const btnNext = document.getElementById('btnNext');
        const btnBack = document.getElementById('btnBack');
        const progressFill = document.getElementById('progressFill');
        const currentQuestionSpan = document.getElementById('currentQuestion');
        const summaryDiv = document.getElementById('consultationSummary');
        const summaryContent = document.getElementById('summaryContent');
        
        if (!wrapper || !btnNext) {
            console.warn('Questionnaire elements not found');
            return;
        }
        
        console.log('✅ Starting questionnaire...');
        
        let currentIndex = 0;
        const answers = {};
        
        const questions = [
            {
                id: 'projectType',
                icon: '🎯',
                title: 'Projenizin Ana Amacı Nedir?',
                subtitle: 'Web sitenizin temel işlevini ve hedefini belirleyelim.',
                type: 'single',
                options: [
                    { value: 'corporate', label: 'Kurumsal Kimlik & Tanıtım', desc: 'Şirket/marka bilgilendirme sitesi' },
                    { value: 'ecommerce', label: 'E-Ticaret & Online Satış', desc: 'Ürün satışı ve ödeme sistemi' },
                    { value: 'lead', label: 'Müşteri Kazanımı (Lead Gen)', desc: 'Form ve teklif toplama odaklı' },
                    { value: 'portfolio', label: 'Portföy & Kişisel Marka', desc: 'İşlerinizi sergileyin' },
                    { value: 'webapp', label: 'Web Uygulaması', desc: 'Özel fonksiyonlar ve kullanıcı paneli' }
                ]
            },
            {
                id: 'targetAudience',
                icon: '👥',
                title: 'Hedef Kitleniz Kimlerden Oluşuyor?',
                subtitle: 'Sitenizi ziyaret edecek kişileri tanımlayalım.',
                type: 'text',
                placeholder: 'Örn: 25-45 yaş arası, teknoloji meraklısı profesyoneller...'
            },
            {
                id: 'existingSite',
                icon: '🌐',
                title: 'Mevcut Bir Web Siteniz Var mı?',
                subtitle: 'Yenileme mi yapacağız yoksa sıfırdan mı başlayacağız?',
                type: 'single',
                options: [
                    { value: 'none', label: 'Hayır, Sıfırdan Başlayacağız', desc: 'İlk web sitemi oluşturuyorum' },
                    { value: 'redesign', label: 'Evet, Yenileme İstiyorum', desc: 'Mevcut siteyi güncellemek istiyorum' },
                    { value: 'improve', label: 'Evet, İyileştirme İstiyorum', desc: 'Bazı eksikleri gidermek istiyorum' }
                ]
            },
            {
                id: 'features',
                icon: '⚙️',
                title: 'Hangi Özelliklere İhtiyacınız Var?',
                subtitle: 'İhtiyaç duyduğunuz tüm özellikleri seçin (Çoklu seçim).',
                type: 'multiple',
                options: [
                    { value: 'contact-form', label: 'İletişim Formu' },
                    { value: 'blog', label: 'Blog / Haber Sistemi' },
                    { value: 'gallery', label: 'Galeri / Portföy Gösterimi' },
                    { value: 'ecommerce', label: 'E-Ticaret & Ödeme Sistemi' },
                    { value: 'user-login', label: 'Kullanıcı Girişi / Üyelik' },
                    { value: 'booking', label: 'Randevu / Rezervasyon Sistemi' },
                    { value: 'multi-language', label: 'Çoklu Dil Desteği' },
                    { value: 'analytics', label: 'Analitik & Raporlama' },
                    { value: 'social-integration', label: 'Sosyal Medya Entegrasyonu' },
                    { value: 'live-chat', label: 'Canlı Destek / Chatbot' }
                ]
            },
            {
                id: 'designStyle',
                icon: '🎨',
                title: 'Hangi Tasarım Stilini Tercih Edersiniz?',
                subtitle: 'Sitenizin görsel kimliğini belirleyelim.',
                type: 'single',
                options: [
                    { value: 'modern-minimal', label: 'Modern & Minimalist', desc: 'Sade, temiz ve profesyonel' },
                    { value: 'bold-creative', label: 'Cesur & Yaratıcı', desc: 'Renkli, dikkat çekici ve özgün' },
                    { value: 'corporate', label: 'Kurumsal & Resmi', desc: 'Güven veren, klasik ve profesyonel' },
                    { value: 'playful', label: 'Eğlenceli & Dinamik', desc: 'Genç, enerjik ve interaktif' },
                    { value: 'luxury', label: 'Lüks & Şık', desc: 'Zarif, premium ve etkileyici' }
                ]
            },
            {
                id: 'budget',
                icon: '💰',
                title: 'Projeniz İçin Bütçe Aralığınız Nedir?',
                subtitle: 'En uygun çözümü sunabilmemiz için bütçenizi belirtin.',
                type: 'single',
                options: [
                    { value: 'startup', label: '5,000 - 15,000 ₺', desc: 'Başlangıç seviyesi, temel özellikler' },
                    { value: 'standard', label: '15,000 - 30,000 ₺', desc: 'Standart, orta düzey özellikler' },
                    { value: 'professional', label: '30,000 - 50,000 ₺', desc: 'Profesyonel, gelişmiş özellikler' },
                    { value: 'premium', label: '50,000 ₺+', desc: 'Premium, tam özelleştirilmiş çözüm' },
                    { value: 'flexible', label: 'Esnek / Görüşelim', desc: 'Proje detaylarına göre belirleyelim' }
                ]
            },
            {
                id: 'timeline',
                icon: '📅',
                title: 'Projenizin Tamamlanma Süresi Ne Kadar Olmalı?',
                subtitle: 'Zaman çizelgenizi planlayalım.',
                type: 'single',
                options: [
                    { value: 'urgent', label: '2-4 Hafta (Acil)', desc: 'Hızlı teslimat gerekli' },
                    { value: 'standard', label: '1-2 Ay (Standart)', desc: 'Normal proje süreci' },
                    { value: 'comfortable', label: '2-3 Ay (Rahat)', desc: 'Detaylı planlama ve geliştirme' },
                    { value: 'flexible', label: 'Esnek / Belirli Değil', desc: 'Kalite odaklı, süre esnek' }
                ]
            },
            {
                id: 'contactInfo',
                icon: '📧',
                title: 'İletişim Bilgileriniz',
                subtitle: 'Size nasıl ulaşabiliriz?',
                type: 'contact',
                fields: ['name', 'email', 'phone', 'notes']
            }
        ];
        
        function renderQuestion() {
            const q = questions[currentIndex];
            
            // Track consultation progress
            if (typeof Analytics !== 'undefined' && currentIndex > 0) {
                Analytics.trackConsultationProgress(currentIndex + 1, q.id);
            }
            
            // Track consultation start on first question
            if (currentIndex === 0 && Object.keys(answers).length === 0) {
                if (typeof Analytics !== 'undefined') {
                    Analytics.trackConsultationStart();
                }
            }
            
            let optionsHTML = '';
            
            if (q.type === 'single') {
                optionsHTML = q.options.map(opt => `
                    <div class="answer-option" data-value="${opt.value}">
                        <div class="option-icon">✓</div>
                        <div class="option-content">
                            <h4>${opt.label}</h4>
                            <p>${opt.desc}</p>
                        </div>
                    </div>
                `).join('');
                optionsHTML = `<div class="answer-options">${optionsHTML}</div>`;
            } else if (q.type === 'multiple') {
                optionsHTML = q.options.map(opt => `
                    <div class="checkbox-option" data-value="${opt.value}">
                        <input type="checkbox" id="${opt.value}" value="${opt.value}">
                        <label for="${opt.value}">${opt.label}</label>
                    </div>
                `).join('');
                optionsHTML = `<div class="answer-multi-select">${optionsHTML}</div>`;
            } else if (q.type === 'text') {
                optionsHTML = `
                    <div class="answer-text-input">
                        <input type="text" id="textAnswer" placeholder="${q.placeholder}">
                    </div>
                `;
            } else if (q.type === 'contact') {
                optionsHTML = `
                    <div class="answer-text-input">
                        <label>Adınız Soyadınız *</label>
                        <input type="text" id="contactName" placeholder="Ad Soyad" required>
                        
                        <label style="margin-top: 15px;">E-posta Adresiniz *</label>
                        <input type="email" id="contactEmail" placeholder="ornek@email.com" required>
                        
                        <label style="margin-top: 15px;">Telefon Numaranız</label>
                        <input type="tel" id="contactPhone" placeholder="+90 5XX XXX XX XX">
                        
                        <label style="margin-top: 15px;">Ek Notlar</label>
                        <textarea id="contactNotes" placeholder="Projeniz hakkında eklemek istediğiniz notlar..." rows="4"></textarea>
                    </div>
                `;
            }
            
            wrapper.innerHTML = `
                <div class="question-card">
                    <div class="question-header">
                        <span class="question-icon">${q.icon}</span>
                        <h3 class="question-title">${q.title}</h3>
                        <p class="question-subtitle">${q.subtitle}</p>
                    </div>
                    ${optionsHTML}
                </div>
            `;
            
            // Update progress
            const progress = ((currentIndex + 1) / questions.length) * 100;
            progressFill.style.width = progress + '%';
            currentQuestionSpan.textContent = `Soru ${currentIndex + 1}`;
            
            // Attach events
            if (q.type === 'single') {
                wrapper.querySelectorAll('.answer-option').forEach(opt => {
                    opt.addEventListener('click', function() {
                        wrapper.querySelectorAll('.answer-option').forEach(o => o.classList.remove('selected'));
                        this.classList.add('selected');
                        answers[q.id] = this.dataset.value;
                        btnNext.disabled = false;
                    });
                });
                // Pre-select if already answered
                if (answers[q.id]) {
                    const selected = wrapper.querySelector(`[data-value="${answers[q.id]}"]`);
                    if (selected) {
                        selected.classList.add('selected');
                        btnNext.disabled = false;
                    }
                }
            } else if (q.type === 'multiple') {
                const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.addEventListener('change', function() {
                        const parent = this.closest('.checkbox-option');
                        if (this.checked) {
                            parent.classList.add('selected');
                        } else {
                            parent.classList.remove('selected');
                        }
                        
                        answers[q.id] = Array.from(checkboxes)
                            .filter(c => c.checked)
                            .map(c => c.value);
                        btnNext.disabled = answers[q.id].length === 0;
                    });
                });
                // Pre-select if already answered
                if (answers[q.id] && Array.isArray(answers[q.id])) {
                    answers[q.id].forEach(val => {
                        const cb = wrapper.querySelector(`input[value="${val}"]`);
                        if (cb) {
                            cb.checked = true;
                            cb.closest('.checkbox-option').classList.add('selected');
                        }
                    });
                    btnNext.disabled = false;
                }
            } else if (q.type === 'text') {
                const input = document.getElementById('textAnswer');
                input.addEventListener('input', function() {
                    answers[q.id] = this.value;
                    btnNext.disabled = this.value.trim() === '';
                });
                if (answers[q.id]) {
                    input.value = answers[q.id];
                    btnNext.disabled = false;
                }
            } else if (q.type === 'contact') {
                const nameInput = document.getElementById('contactName');
                const emailInput = document.getElementById('contactEmail');
                const phoneInput = document.getElementById('contactPhone');
                const notesInput = document.getElementById('contactNotes');
                
                function updateContactInfo() {
                    answers[q.id] = {
                        name: nameInput.value,
                        email: emailInput.value,
                        phone: phoneInput.value,
                        notes: notesInput.value
                    };
                    btnNext.disabled = !nameInput.value.trim() || !emailInput.value.trim();
                }
                
                nameInput.addEventListener('input', updateContactInfo);
                emailInput.addEventListener('input', updateContactInfo);
                phoneInput.addEventListener('input', updateContactInfo);
                notesInput.addEventListener('input', updateContactInfo);
                
                // Pre-fill if already answered
                if (answers[q.id]) {
                    nameInput.value = answers[q.id].name || '';
                    emailInput.value = answers[q.id].email || '';
                    phoneInput.value = answers[q.id].phone || '';
                    notesInput.value = answers[q.id].notes || '';
                    updateContactInfo();
                }
            }
            
            // Update buttons
            btnBack.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
            btnNext.disabled = !answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0);
            
            if (currentIndex === questions.length - 1) {
                btnNext.innerHTML = '<i class="fas fa-check"></i> Tamamla & Gönder';
            } else {
                btnNext.innerHTML = 'İleri <i class="fas fa-arrow-right"></i>';
            }
        }
        
        btnNext.addEventListener('click', function() {
            if (currentIndex < questions.length - 1) {
                currentIndex++;
                renderQuestion();
            } else {
                showSummaryAndSend();
            }
        });
        
        btnBack.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                renderQuestion();
            }
        });
        
        function showSummaryAndSend() {
            // Track consultation completion in analytics
            if (typeof Analytics !== 'undefined') {
                const projectType = answers.projectType || 'unknown';
                const budget = answers.budget || 0;
                Analytics.trackConsultationComplete(projectType, budget);
            }
            
            // Hide question wrapper and navigation
            wrapper.style.display = 'none';
            btnNext.style.display = 'none';
            btnBack.style.display = 'none';
            document.querySelector('.consultation-progress').style.display = 'none';
            
            // Show summary
            summaryDiv.style.display = 'block';
            
            // Generate summary content
            const labels = {
                projectType: { title: 'Proje Tipi', icon: '🎯' },
                targetAudience: { title: 'Hedef Kitle', icon: '👥' },
                existingSite: { title: 'Mevcut Durum', icon: '🌐' },
                features: { title: 'İstenen Özellikler', icon: '⚙️' },
                designStyle: { title: 'Tasarım Stili', icon: '🎨' },
                budget: { title: 'Bütçe', icon: '💰' },
                timeline: { title: 'Süre', icon: '📅' },
                contactInfo: { title: 'İletişim', icon: '📧' }
            };
            
            let summaryHTML = '';
            
            Object.keys(answers).forEach(key => {
                const label = labels[key];
                let value = answers[key];
                
                if (Array.isArray(value)) {
                    value = value.join(', ');
                } else if (typeof value === 'object') {
                    value = `${value.name} - ${value.email}${value.phone ? ' - ' + value.phone : ''}`;
                }
                
                summaryHTML += `
                    <div class="summary-section">
                        <h4><i class="fas fa-check-circle"></i> ${label.icon} ${label.title}</h4>
                        <p>${value}</p>
                    </div>
                `;
            });
            
            summaryContent.innerHTML = summaryHTML;
            
            // Send email via Netlify Form
            sendFormData();
        }
        
        function sendFormData() {
            // Show loading state
            const loadingHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">⏳</div>
                    <h3 style="color: #2d3748; margin-bottom: 10px;">Gönderiliyor...</h3>
                    <p style="color: #718096;">Lütfen bekleyin, formunuz işleniyor.</p>
                </div>
            `;
            summaryContent.innerHTML = loadingHTML;
            
            const formData = new FormData();
            formData.append('form-name', 'consultation');
            
            // Add all answers to form data
            Object.keys(answers).forEach(key => {
                let value = answers[key];
                if (Array.isArray(value)) {
                    value = value.join(', ');
                } else if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                formData.append(key, value);
            });
            
            // Add formatted brief
            const briefText = generateBriefText();
            formData.append('brief', briefText);
            
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                console.log('✅ Form başarıyla gönderildi!');
                showSuccessSummary();
            })
            .catch((error) => {
                console.error('❌ Form gönderilirken hata:', error);
                showErrorSummary();
            });
        }
        
        function showSuccessSummary() {
            const labels = {
                projectType: { title: 'Proje Tipi', icon: '🎯' },
                targetAudience: { title: 'Hedef Kitle', icon: '👥' },
                existingSite: { title: 'Mevcut Durum', icon: '🌐' },
                features: { title: 'İstenen Özellikler', icon: '⚙️' },
                designStyle: { title: 'Tasarım Stili', icon: '🎨' },
                budget: { title: 'Bütçe', icon: '💰' },
                timeline: { title: 'Süre', icon: '📅' },
                contactInfo: { title: 'İletişim', icon: '📧' }
            };
            
            let summaryHTML = `
                <div style="text-align: center; padding: 30px; background: linear-gradient(135deg, #00ff88, #00d4ff); border-radius: 16px; margin-bottom: 30px;">
                    <div style="font-size: 64px; margin-bottom: 15px;">✅</div>
                    <h3 style="color: #1a202c; font-size: 28px; margin-bottom: 10px; font-weight: 700;">Formunuz Başarıyla Gönderildi!</h3>
                    <p style="color: #2d3748; font-size: 16px;">En kısa sürede size dönüş yapacağım. Teşekkür ederim!</p>
                </div>
            `;
            
            Object.keys(answers).forEach(key => {
                if (!labels[key]) return;
                
                const label = labels[key];
                let value = answers[key];
                
                if (Array.isArray(value)) {
                    value = `<ul style="list-style: none; padding: 0; margin: 10px 0;">
                        ${value.map(v => `<li style="padding: 5px 0;">✓ ${v}</li>`).join('')}
                    </ul>`;
                } else if (typeof value === 'object') {
                    value = `
                        <div style="background: #f7fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
                            <p style="margin: 5px 0;"><strong>Ad Soyad:</strong> ${value.name}</p>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${value.email}</p>
                            ${value.phone ? `<p style="margin: 5px 0;"><strong>Telefon:</strong> ${value.phone}</p>` : ''}
                            ${value.notes ? `<p style="margin: 5px 0;"><strong>Notlar:</strong> ${value.notes}</p>` : ''}
                        </div>
                    `;
                }
                
                summaryHTML += `
                    <div class="summary-section">
                        <h4><i class="fas fa-check-circle"></i> ${label.icon} ${label.title}</h4>
                        <div>${value}</div>
                    </div>
                `;
            });
            
            summaryContent.innerHTML = summaryHTML;
        }
        
        function showErrorSummary() {
            summaryContent.innerHTML = `
                <div style="text-align: center; padding: 40px; background: #fff5f5; border-radius: 16px; border: 3px solid #ff6b6b;">
                    <div style="font-size: 64px; margin-bottom: 15px;">⚠️</div>
                    <h3 style="color: #c53030; font-size: 24px; margin-bottom: 15px; font-weight: 700;">Form Gönderilemedi</h3>
                    <p style="color: #742a2a; font-size: 16px; margin-bottom: 20px;">
                        Bir hata oluştu. Lütfen doğrudan benimle iletişime geçin:
                    </p>
                    <a href="mailto:mertyuksll@gmail.com" style="display: inline-block; background: #667eea; color: white; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-top: 10px;">
                        📧 Email Gönder: mertyuksll@gmail.com
                    </a>
                </div>
            `;
        }
        
        function generateBriefText() {
            let brief = 'WEB TASARIM PROJESİ DANIŞMANLIK FORMU\n';
            brief += '==========================================\n';
            brief += `Tarih: ${new Date().toLocaleDateString('tr-TR')}\n\n`;
            
            const contactInfo = answers.contactInfo || {};
            brief += `Müşteri: ${contactInfo.name || 'Belirtilmedi'}\n`;
            brief += `Email: ${contactInfo.email || 'Belirtilmedi'}\n`;
            brief += `Telefon: ${contactInfo.phone || 'Belirtilmedi'}\n\n`;
            
            brief += `1. PROJE TİPİ: ${answers.projectType || 'Belirtilmedi'}\n\n`;
            brief += `2. HEDEF KİTLE: ${answers.targetAudience || 'Belirtilmedi'}\n\n`;
            brief += `3. MEVCUT DURUM: ${answers.existingSite || 'Belirtilmedi'}\n\n`;
            brief += `4. İSTENEN ÖZELLİKLER: ${Array.isArray(answers.features) ? answers.features.join(', ') : 'Belirtilmedi'}\n\n`;
            brief += `5. TASARIM STİLİ: ${answers.designStyle || 'Belirtilmedi'}\n\n`;
            brief += `6. BÜTÇE: ${answers.budget || 'Belirtilmedi'}\n\n`;
            brief += `7. SÜRE: ${answers.timeline || 'Belirtilmedi'}\n\n`;
            brief += `8. EK NOTLAR: ${contactInfo.notes || 'Yok'}\n\n`;
            
            brief += '==========================================\n';
            brief += 'mexsuweb.com - Mert Yüksel\n';
            
            return brief;
        }
        
        // Download brief button functionality
        document.getElementById('btnDownloadBrief')?.addEventListener('click', function() {
            const brief = generateBriefText();
            const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `web-tasarim-brief-${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        
        // Contact button functionality
        document.getElementById('btnContactMe')?.addEventListener('click', function() {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Initial render
        renderQuestion();
    }
})();
