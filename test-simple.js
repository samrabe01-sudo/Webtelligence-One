// SIMPLE TEST VERSION
console.log('🔥 Simple test version loading...');

class SimpleConsultation {
    constructor() {
        console.log('Constructor başladı');
        
        this.wrapper = document.getElementById('questionWrapper');
        this.btnNext = document.getElementById('btnNext');
        
        if (!this.wrapper) {
            console.error('wrapper bulunamadı!');
            return;
        }
        
        if (!this.btnNext) {
            console.error('btnNext bulunamadı!');
            return;
        }
        
        console.log('Elementler bulundu, render ediliyor...');
        this.renderTest();
    }
    
    renderTest() {
        const html = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-icon">🎯</span>
                    <h3 class="question-title">Test Sorusu</h3>
                    <p class="question-subtitle">Bu bir test sorusudur</p>
                </div>
                <div class="answer-options">
                    <div class="answer-option" data-value="test1">
                        <div class="option-icon">✅</div>
                        <div class="option-content">
                            <h4>Seçenek 1</h4>
                            <p>İlk test seçeneği</p>
                        </div>
                    </div>
                    <div class="answer-option" data-value="test2">
                        <div class="option-icon">✅</div>
                        <div class="option-content">
                            <h4>Seçenek 2</h4>
                            <p>İkinci test seçeneği</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        console.log('HTML oluşturuldu, wrapper\'a ekleniyor...');
        this.wrapper.innerHTML = html;
        console.log('✅ HTML eklendi!');
        console.log('wrapper.innerHTML uzunluğu:', this.wrapper.innerHTML.length);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM yüklendi');
    setTimeout(() => {
        console.log('SimpleConsultation başlatılıyor...');
        new SimpleConsultation();
    }, 100);
});
