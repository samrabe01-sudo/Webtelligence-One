// ========================================
// INTERACTIVE CONSULTATION QUESTIONNAIRE
// ========================================

class ConsultationQuestionnaire {
    constructor() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.questions = this.getQuestions();
        
        // DOM Elements
        this.questionWrapper = document.getElementById('questionWrapper');
        this.progressFill = document.getElementById('progressFill');
        this.currentQuestionSpan = document.getElementById('currentQuestion');
        this.btnBack = document.getElementById('btnBack');
        this.btnNext = document.getElementById('btnNext');
        this.summaryDiv = document.getElementById('consultationSummary');
        this.summaryContent = document.getElementById('summaryContent');
        
        // Check if all elements exist
        if (!this.questionWrapper || !this.progressFill || !this.btnNext) {
            console.error('❌ Consultation elements not found!');
            console.log('questionWrapper:', this.questionWrapper);
            console.log('progressFill:', this.progressFill);
            console.log('btnNext:', this.btnNext);
            // Don't return - just log the error
        } else {
            console.log('✅ All consultation elements found, initializing...');
            this.init();
        }
    }

    init() {
        console.log('🚀 init() called');
        console.log('Questions array:', this.questions);
        console.log('Questions length:', this.questions.length);
        this.renderQuestion();
        this.attachEventListeners();
    }

    getQuestions() {
        return [
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
                    { value: 'portfolio', label: 'Portföy & Kişisel Marka', desc: 'İşlerinizi ve yeteneklerinizi sergileyin' },
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
                subtitle: 'İhtiyaç duyduğunuz tüm özellikleri seçin (Çoklu seçim yapabilirsiniz).',
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
                id: 'additionalNotes',
                icon: '📝',
                title: 'Eklemek İstediğiniz Özel Notlar Var mı?',
                subtitle: 'Projenizle ilgili özel isteklerinizi, referans sitelerinizi veya önemli detayları paylaşın.',
                type: 'textarea',
                placeholder: 'Örn: Referans olarak şu siteyi beğeniyorum: example.com\nMarka renklerimiz: Mavi ve beyaz\nÖzel bir özellik istiyorum: ...'
            }
        ];
    }

    attachEventListeners() {
        this.btnNext.addEventListener('click', () => this.nextQuestion());
        this.btnBack.addEventListener('click', () => this.previousQuestion());
        
        // Download brief button
        document.getElementById('btnDownloadBrief')?.addEventListener('click', () => this.downloadBrief());
        
        // Contact me button
        document.getElementById('btnContactMe')?.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    renderQuestion() {
        console.log('🎯 renderQuestion called');
        const question = this.questions[this.currentQuestionIndex];
        console.log('Current question:', question);
        
        if (!this.questionWrapper) {
            console.error('❌ questionWrapper is null!');
            return;
        }
        
        // Update progress
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = `${progress}%`;
        }
        if (this.currentQuestionSpan) {
            this.currentQuestionSpan.textContent = `Soru ${this.currentQuestionIndex + 1}`;
        }
        
        // Generate new question HTML
        const newHTML = this.getQuestionHTML(question);
        
        // Clear and insert new question
        this.questionWrapper.innerHTML = newHTML;
        
        // Force a reflow to ensure the DOM is updated
        void this.questionWrapper.offsetWidth;
        
        // Attach event listeners
        this.attachQuestionEventListeners(question);
        console.log('✅ Question rendered successfully');
        
        // Update navigation buttons
        if (this.btnBack) {
            this.btnBack.style.display = this.currentQuestionIndex > 0 ? 'inline-flex' : 'none';
        }
        this.updateNextButton();
    }

    getQuestionHTML(question) {
        console.log('📝 getQuestionHTML called with:', question);
        let optionsHTML = '';
        
        if (question.type === 'single') {
            console.log('Rendering single choice question');
            optionsHTML = `
                <div class="answer-options">
                    ${question.options.map(option => `
                        <div class="answer-option" data-value="${option.value}">
                            <div class="option-icon">${this.getOptionIcon(option.value)}</div>
                            <div class="option-content">
                                <h4>${option.label}</h4>
                                <p>${option.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'multiple') {
            console.log('Rendering multiple choice question');
            optionsHTML = `
                <div class="answer-multi-select">
                    ${question.options.map(option => `
                        <div class="checkbox-option" data-value="${option.value}">
                            <input type="checkbox" id="${option.value}" value="${option.value}">
                            <label for="${option.value}">${option.label}</label>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (question.type === 'text') {
            console.log('Rendering text input question');
            optionsHTML = `
                <div class="answer-text-input">
                    <label>${question.subtitle}</label>
                    <input type="text" placeholder="${question.placeholder}" id="textAnswer">
                </div>
            `;
        } else if (question.type === 'textarea') {
            console.log('Rendering textarea question');
            optionsHTML = `
                <div class="answer-text-input">
                    <label>${question.subtitle}</label>
                    <textarea placeholder="${question.placeholder}" id="textareaAnswer"></textarea>
                </div>
            `;
        }
        
        const html = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-icon">${question.icon}</span>
                    <h3 class="question-title">${question.title}</h3>
                    <p class="question-subtitle">${question.subtitle}</p>
                </div>
                ${optionsHTML}
            </div>
        `;
        
        console.log('Generated HTML length:', html.length);
        return html;
    }

    getOptionIcon(value) {
        const icons = {
            corporate: '🏢',
            ecommerce: '🛒',
            lead: '📧',
            portfolio: '🎨',
            webapp: '⚙️',
            none: '🆕',
            redesign: '🔄',
            improve: '⬆️',
            'modern-minimal': '✨',
            'bold-creative': '🎨',
            'corporate': '💼',
            playful: '🎮',
            luxury: '👑',
            startup: '🌱',
            standard: '📊',
            professional: '💼',
            premium: '💎',
            flexible: '🤝',
            urgent: '⚡',
            comfortable: '🌟'
        };
        return icons[value] || '✓';
    }

    attachQuestionEventListeners(question) {
        if (question.type === 'single') {
            const options = this.questionWrapper.querySelectorAll('.answer-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    this.answers[question.id] = option.dataset.value;
                    this.updateNextButton();
                });
            });
            
            // Pre-select if answer exists
            if (this.answers[question.id]) {
                const selectedOption = this.questionWrapper.querySelector(`[data-value="${this.answers[question.id]}"]`);
                if (selectedOption) selectedOption.classList.add('selected');
            }
        } else if (question.type === 'multiple') {
            const checkboxes = this.questionWrapper.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const parent = checkbox.closest('.checkbox-option');
                    if (checkbox.checked) {
                        parent.classList.add('selected');
                    } else {
                        parent.classList.remove('selected');
                    }
                    
                    this.answers[question.id] = Array.from(checkboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.value);
                    this.updateNextButton();
                });
            });
            
            // Pre-select if answers exist
            if (this.answers[question.id]) {
                this.answers[question.id].forEach(value => {
                    const checkbox = this.questionWrapper.querySelector(`input[value="${value}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.closest('.checkbox-option').classList.add('selected');
                    }
                });
            }
        } else if (question.type === 'text' || question.type === 'textarea') {
            const input = this.questionWrapper.querySelector('#textAnswer, #textareaAnswer');
            input.addEventListener('input', () => {
                this.answers[question.id] = input.value;
                this.updateNextButton();
            });
            
            // Pre-fill if answer exists
            if (this.answers[question.id]) {
                input.value = this.answers[question.id];
            }
        }
    }

    updateNextButton() {
        const question = this.questions[this.currentQuestionIndex];
        const hasAnswer = this.answers[question.id] && 
            (Array.isArray(this.answers[question.id]) ? this.answers[question.id].length > 0 : this.answers[question.id].trim() !== '');
        
        this.btnNext.disabled = !hasAnswer;
        
        // Change button text for last question
        if (this.currentQuestionIndex === this.questions.length - 1) {
            this.btnNext.innerHTML = '<i class="fas fa-check"></i> Analizi Tamamla';
        } else {
            this.btnNext.innerHTML = 'İleri <i class="fas fa-arrow-right"></i>';
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.showSummary();
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    showSummary() {
        this.questionWrapper.style.display = 'none';
        this.btnBack.style.display = 'none';
        this.btnNext.style.display = 'none';
        document.querySelector('.consultation-progress').style.display = 'none';
        this.summaryDiv.style.display = 'block';
        
        this.summaryContent.innerHTML = this.generateSummary();
    }

    generateSummary() {
        const projectTypes = {
            corporate: 'Kurumsal Kimlik & Tanıtım',
            ecommerce: 'E-Ticaret & Online Satış',
            lead: 'Müşteri Kazanımı (Lead Generation)',
            portfolio: 'Portföy & Kişisel Marka',
            webapp: 'Web Uygulaması'
        };
        
        const designStyles = {
            'modern-minimal': 'Modern & Minimalist',
            'bold-creative': 'Cesur & Yaratıcı',
            'corporate': 'Kurumsal & Resmi',
            'playful': 'Eğlenceli & Dinamik',
            'luxury': 'Lüks & Şık'
        };
        
        const budgets = {
            startup: '5,000 - 15,000 ₺ (Başlangıç)',
            standard: '15,000 - 30,000 ₺ (Standart)',
            professional: '30,000 - 50,000 ₺ (Profesyonel)',
            premium: '50,000 ₺+ (Premium)',
            flexible: 'Esnek (Görüşülecek)'
        };
        
        const timelines = {
            urgent: '2-4 Hafta (Acil)',
            standard: '1-2 Ay (Standart)',
            comfortable: '2-3 Ay (Rahat)',
            flexible: 'Esnek'
        };
        
        let recommendations = this.generateRecommendations();
        
        return `
            <div class="summary-section">
                <h4><i class="fas fa-bullseye"></i> Proje Tipi</h4>
                <p><strong>${projectTypes[this.answers.projectType] || 'Belirtilmedi'}</strong></p>
                <p>${this.getProjectTypeDescription(this.answers.projectType)}</p>
            </div>
            
            <div class="summary-section">
                <h4><i class="fas fa-users"></i> Hedef Kitle</h4>
                <p>${this.answers.targetAudience || 'Belirtilmedi'}</p>
            </div>
            
            <div class="summary-section">
                <h4><i class="fas fa-cogs"></i> İstenen Özellikler</h4>
                <ul>
                    ${Array.isArray(this.answers.features) ? 
                        this.answers.features.map(f => `<li>${this.getFeatureName(f)}</li>`).join('') : 
                        '<li>Belirtilmedi</li>'}
                </ul>
            </div>
            
            <div class="summary-section">
                <h4><i class="fas fa-palette"></i> Tasarım Stili</h4>
                <p><strong>${designStyles[this.answers.designStyle] || 'Belirtilmedi'}</strong></p>
            </div>
            
            <div class="summary-section">
                <h4><i class="fas fa-chart-line"></i> Bütçe & Zaman</h4>
                <p><strong>Bütçe:</strong> ${budgets[this.answers.budget] || 'Belirtilmedi'}</p>
                <p><strong>Teslim Süresi:</strong> ${timelines[this.answers.timeline] || 'Belirtilmedi'}</p>
            </div>
            
            ${this.answers.additionalNotes ? `
            <div class="summary-section">
                <h4><i class="fas fa-sticky-note"></i> Özel Notlar</h4>
                <p>${this.answers.additionalNotes}</p>
            </div>
            ` : ''}
            
            <div class="summary-section">
                <h4><i class="fas fa-lightbulb"></i> Profesyonel Önerilerim</h4>
                ${recommendations}
            </div>
        `;
    }

    getProjectTypeDescription(type) {
        const descriptions = {
            corporate: 'Şirket imajınızı güçlendirecek, profesyonel ve güven veren bir web sitesi oluşturacağız.',
            ecommerce: 'Kullanıcı dostu alışveriş deneyimi ve güvenli ödeme sistemi ile satışlarınızı artıracağız.',
            lead: 'Etkili formlar ve CTA\'larla potansiyel müşteri toplama odaklı bir platform geliştireceğiz.',
            portfolio: 'İşlerinizi ve yeteneklerinizi en iyi şekilde sergileyen, etkileyici bir portföy sitesi hazırlayacağız.',
            webapp: 'İhtiyaçlarınıza özel, ölçeklenebilir ve performanslı bir web uygulaması geliştireceğiz.'
        };
        return descriptions[type] || '';
    }

    getFeatureName(feature) {
        const names = {
            'contact-form': 'İletişim Formu',
            'blog': 'Blog / Haber Sistemi',
            'gallery': 'Galeri / Portföy',
            'ecommerce': 'E-Ticaret Sistemi',
            'user-login': 'Kullanıcı Girişi',
            'booking': 'Randevu Sistemi',
            'multi-language': 'Çoklu Dil',
            'analytics': 'Analitik & Raporlama',
            'social-integration': 'Sosyal Medya',
            'live-chat': 'Canlı Destek'
        };
        return names[feature] || feature;
    }

    generateRecommendations() {
        let recs = [];
        
        // Budget-based recommendations
        if (this.answers.budget === 'startup') {
            recs.push('Başlangıç bütçeniz için MVP (Minimum Viable Product) yaklaşımı öneririm. Temel özellikleri hayata geçirip, ilerleyen dönemlerde genişletebiliriz.');
        } else if (this.answers.budget === 'premium') {
            recs.push('Premium bütçeniz ile tam özelleştirilmiş, ileri seviye animasyonlar ve etkileşimli öğeler ekleyebiliriz.');
        }
        
        // Timeline recommendations
        if (this.answers.timeline === 'urgent') {
            recs.push('Acil teslimat için hazır tema altyapısı kullanarak hızlı bir çözüm önerebilirim. Ancak tam özelleştirilmiş tasarım için daha fazla süre gerekebilir.');
        }
        
        // Feature-based recommendations
        if (Array.isArray(this.answers.features)) {
            if (this.answers.features.includes('ecommerce')) {
                recs.push('E-ticaret için WooCommerce veya Shopify entegrasyonu öneriyorum. Güvenli ödeme altyapısı ve stok yönetimi kritik önem taşıyor.');
            }
            if (this.answers.features.includes('booking')) {
                recs.push('Randevu sistemi için kullanıcı dostu takvim entegrasyonu ve otomatik bildirimler ekleyelim.');
            }
            if (this.answers.features.length > 7) {
                recs.push('Çok sayıda özellik için modüler bir mimari öneririm. Bu sayede sistem ölçeklenebilir ve yönetilebilir olur.');
            }
        }
        
        // Design recommendations
        if (this.answers.designStyle === 'luxury') {
            recs.push('Lüks tasarım için high-end görsel içerik, özel tipografi ve premium animasyonlar kullanmalıyız.');
        } else if (this.answers.designStyle === 'modern-minimal') {
            recs.push('Minimalist tasarım için beyaz alanları etkili kullanarak, odak noktalarını vurgulayalım.');
        }
        
        // Project type specific recommendations
        if (this.answers.projectType === 'ecommerce') {
            recs.push('E-ticaret başarısı için hızlı yükleme süreleri, mobil uyumluluk ve SEO optimizasyonu kritik öneme sahip.');
        }
        
        if (recs.length === 0) {
            recs.push('Projeniz için detaylı bir teknik dokümantasyon hazırlayıp, en uygun teknoloji yığınını belirleyeceğim.');
            recs.push('Kullanıcı deneyimini optimize etmek için A/B testleri ve kullanılabilirlik analizleri yapabiliriz.');
        }
        
        return recs.map(rec => `<span class="recommendation-badge">💡 ${rec}</span>`).join('');
    }

    downloadBrief() {
        const briefContent = this.generateBriefText();
        const blob = new Blob([briefContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `web-tasarim-brief-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateBriefText() {
        return `
WEB TASARIM PROJESİ BRIEF
============================
Tarih: ${new Date().toLocaleDateString('tr-TR')}

1. PROJE TİPİ
${this.answers.projectType || 'Belirtilmedi'}

2. HEDEF KİTLE
${this.answers.targetAudience || 'Belirtilmedi'}

3. MEVCUT DURUM
${this.answers.existingSite || 'Belirtilmedi'}

4. İSTENEN ÖZELLİKLER
${Array.isArray(this.answers.features) ? this.answers.features.join(', ') : 'Belirtilmedi'}

5. TASARIM STİLİ
${this.answers.designStyle || 'Belirtilmedi'}

6. BÜTÇE
${this.answers.budget || 'Belirtilmedi'}

7. ZAMAN ÇİZELGESİ
${this.answers.timeline || 'Belirtilmedi'}

8. ÖZEL NOTLAR
${this.answers.additionalNotes || 'Yok'}

============================
Bu brief Mert Yüksel tarafından hazırlanmıştır.
İletişim: mertyuksll@gmail.com
Web: mexsuweb.com
`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 Checking for consultation questionnaire...');
    const consultationDiv = document.getElementById('consultationQuestionnaire');
    
    if (consultationDiv) {
        console.log('✅ Consultation div found!');
        try {
            window.consultationQuestionnaire = new ConsultationQuestionnaire();
            console.log('📋 Interactive Consultation Questionnaire Activated!');
        } catch (error) {
            console.error('❌ Error initializing questionnaire:', error);
        }
    } else {
        console.warn('⚠️ Consultation questionnaire div not found in DOM');
    }
});
