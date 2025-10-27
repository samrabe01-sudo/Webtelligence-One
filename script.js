// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const typingText = document.getElementById('typing-text');

// Typing Animation
const typingTexts = [
    'Web Tasarımcısı',
    'Frontend Developer',
    'UI/UX Designer',
    'Problem Çözücü'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 100 : 150;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    
    // Initialize skills animations
    initializeSkills();
    
    // Initialize consultation functionality
    initializeConsultation();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect & Floating Elements
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Navbar effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Floating elements falling effect
    const floatingElements = document.querySelectorAll('.float-element');
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && floatingElements.length > 0) {
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = scrollY / (heroHeight * 0.5); // Start effect at 50% scroll
        
        floatingElements.forEach((element, index) => {
            if (scrollProgress > 0.3) { // Start falling when scrolled 30% through hero
                // Add delay for each element
                setTimeout(() => {
                    element.classList.add('falling');
                }, index * 200); // 200ms delay between each element
            } else {
                element.classList.remove('falling');
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link, .btn[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Only prevent default for anchor links (starting with #)
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For external links like blog.html, let the browser handle navigation naturally
    });
});

// Scroll to Top Button
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 50);
        } else {
            counter.innerText = target;
        }
    });
}

// Interactive Tech Cards Animation
// Interactive Tech Cards Animation - Simplified
function animateTechCards() {
    const levelBars = document.querySelectorAll('.level-bar');
    
    // Animate skill level bars with staggered timing
    levelBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        if (level) {
            setTimeout(() => {
                bar.style.width = level + '%';
            }, index * 100 + 200); // Reduced timing for smoother effect
        }
    });
}

// Simple Toast Notification instead of modal
function showSkillToast(skillName, skillLevel) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.skill-toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'skill-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <strong>${skillName}</strong>
            <div class="toast-level">Yetkinlik: ${skillLevel}%</div>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 2px solid #6c5ce7;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 10px 30px rgba(108, 92, 231, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        min-width: 200px;
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Modern Skills Animation
function initializeSkills() {
    // Animate skill level bars
    animateSkillBars();
    
    // Animate progress bars
    animateProgressBars();
    
    // Add hover effects
    addSkillHoverEffects();
}

// Animate skill level indicators
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                if (level) {
                    bar.style.setProperty('--level', level + '%');
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Animate progress bars in technical skills
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const fill = progressBar.querySelector('.progress-fill');
                const level = progressBar.getAttribute('data-level');
                
                if (fill && level) {
                    setTimeout(() => {
                        fill.style.width = level + '%';
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Add interactive hover effects
function addSkillHoverEffects() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for skill cards
        card.addEventListener('click', function() {
            const skillName = this.querySelector('h3').textContent;
            const levelText = this.querySelector('.level-text').textContent;
            
            showSkillNotification(skillName, levelText);
        });
    });
}

// Show skill notification
function showSkillNotification(skillName, level) {
    // Remove existing notifications
    const existingToast = document.querySelector('.skill-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'skill-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${skillName}</h4>
            <p>Yetenek Seviyesi: <strong>${level}</strong></p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 15px 35px rgba(108, 92, 231, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        max-width: 280px;
        transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.transition = 'transform 0.4s ease';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}



// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
            
            // Trigger skill bar animation for skills section
            if (entry.target.classList.contains('skills-content') || entry.target.classList.contains('tech-showcase')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add slide animations to specific elements
    const leftElements = document.querySelectorAll('.about-text, .contact-info');
    leftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    const rightElements = document.querySelectorAll('.about-stats, .contact-form-container');
    rightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
    
    // Observe stats and skills sections
    const statsSection = document.querySelector('.about-stats');
    const skillsSection = document.querySelector('.skills-content');
    const techShowcase = document.querySelector('.tech-showcase');
    
    if (statsSection) observer.observe(statsSection);
    if (skillsSection) observer.observe(skillsSection);
    if (techShowcase) observer.observe(techShowcase);
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Lütfen tüm gerekli alanları doldurun.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.innerHTML = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.7;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section (Enhanced)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    const profileCard = document.querySelector('.profile-card');
    
    // Profile card parallax effect
    if (profileCard && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = scrolled / heroHeight;
        
        if (scrollProgress <= 1) { // Only apply effect while in hero section
            const rotateX = scrollProgress * 15; // Max 15 degrees
            const rotateY = Math.sin(scrollProgress * Math.PI) * 10; // Sine wave effect
            const translateY = scrollProgress * 30; // Move up slightly
            
            profileCard.style.transform = `
                translateY(${translateY}px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
            `;
        }
    }
    
    // Enhanced floating elements effect
    const parallaxElements = document.querySelectorAll('.floating-elements .float-element');
    
    parallaxElements.forEach((element, index) => {
        if (!element.classList.contains('falling')) {
            const speed = (index + 1) * 0.3;
            const rotation = scrolled * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hide');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});

// Add loading screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);
});

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(108, 92, 231, 0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Mouse move effect for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const moveX = (x - rect.width / 2) * 0.01;
    const moveY = (y - rect.height / 2) * 0.01;
    
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.style.transform = `translateY(0px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    }
});

// Reset profile card position when mouse leaves hero section
document.querySelector('.hero').addEventListener('mouseleave', () => {
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)';
    }
});

// Lazy loading for images (when we add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Dark mode toggle (optional feature)
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        }
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
}

// Initialize dark mode toggle
document.addEventListener('DOMContentLoaded', initDarkModeToggle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Service worker registration for PWA (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics event tracking (placeholder for Google Analytics)
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Track important interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('navigation_click', {
                section: link.getAttribute('href').substring(1)
            });
        });
    });
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('button_click', {
                button_text: btn.textContent.trim()
            });
        });
    });
    
    // Track form submission
    contactForm.addEventListener('submit', () => {
        trackEvent('form_submit', {
            form_name: 'contact_form'
        });
    });
});

// ==========================================
// CONSULTATION SECTION FUNCTIONALITY
// ==========================================

function initializeConsultation() {
    const optionCards = document.querySelectorAll('.option-card');
    const selectedOptionInput = document.getElementById('selectedOption');
    const projectGoalInput = document.getElementById('project-goal');
    const consultationForm = document.getElementById('consultationForm');
    
    if (!optionCards.length || !selectedOptionInput || !projectGoalInput) {
        console.log('Consultation elements not found');
        return;
    }
    
    // Option cards selection functionality
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            optionCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Update hidden input and project goal field
            const optionNumber = this.getAttribute('data-option');
            const optionTitle = this.querySelector('h4').textContent;
            
            selectedOptionInput.value = optionNumber;
            projectGoalInput.value = optionTitle;
            
            console.log('Option selected:', optionTitle, 'Number:', optionNumber);
            
            // Add selection animation
            this.style.transform = 'translateY(-8px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Show success feedback
            showSelectionFeedback(optionTitle);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
    
    // Consultation form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const sector = document.getElementById('sector').value.trim();
            const email = document.getElementById('consultation-email').value.trim();
            const selectedOption = selectedOptionInput.value;
            
            if (!sector || !email || !selectedOption) {
                showNotification('Lütfen tüm zorunlu alanları doldurun ve bir proje tipi seçin.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('.btn-consultation');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Teşekkürler! Danışmanlık talebiniz alındı. 24 saat içinde size dönüş yapacağım.', 'success');
                
                // Reset form
                this.reset();
                optionCards.forEach(c => c.classList.remove('selected'));
                projectGoalInput.value = '';
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Track consultation request
                trackEvent('consultation_request', {
                    sector: sector,
                    project_type: selectedOption,
                    form_name: 'consultation_form'
                });
            }, 2000);
        });
    }
}

// ==========================================
// MODERN SEARCH SYSTEM
// ==========================================

class ModernSearch {
    constructor() {
        this.isOpen = false;
        this.searchData = {
            portfolio: [
                { title: "E-ticaret Sitesi", description: "Modern online mağaza tasarımı", section: "#portfolio", category: "E-ticaret" },
                { title: "Kurumsal Web Sitesi", description: "Profesyonel şirket sitesi", section: "#portfolio", category: "Kurumsal" },
                { title: "Blog Platformu", description: "İçerik yönetim sistemi", section: "#portfolio", category: "Blog" },
                { title: "Portfolio Sitesi", description: "Kişisel tanıtım sitesi", section: "#portfolio", category: "Portfolio" }
            ],
            services: [
                { title: "Web Tasarım", description: "Modern ve responsive web tasarımı", section: "#services", category: "Hizmet" },
                { title: "E-ticaret Çözümleri", description: "Online satış platformları", section: "#services", category: "Hizmet" },
                { title: "SEO Optimizasyonu", description: "Arama motoru optimizasyonu", section: "#services", category: "Hizmet" },
                { title: "Mobil Uygulama", description: "iOS ve Android uygulamaları", section: "#services", category: "Hizmet" }
            ],
            skills: [
                { title: "JavaScript", description: "Modern JavaScript geliştirme", section: "#skills", category: "Teknoloji" },
                { title: "React", description: "React framework geliştirme", section: "#skills", category: "Teknoloji" },
                { title: "Node.js", description: "Backend geliştirme", section: "#skills", category: "Teknoloji" },
                { title: "CSS3", description: "Modern CSS tasarım", section: "#skills", category: "Teknoloji" }
            ],
            about: [
                { title: "Hakkımda", description: "Mert Yüksel - Web geliştirici", section: "#about", category: "Kişisel" },
                { title: "Deneyim", description: "5+ yıl web geliştirme deneyimi", section: "#about", category: "Kişisel" },
                { title: "Eğitim", description: "Bilgisayar mühendisliği", section: "#about", category: "Kişisel" }
            ],
            contact: [
                { title: "İletişim", description: "Benimle iletişime geçin", section: "#contact", category: "İletişim" },
                { title: "Email", description: "mertyuksll@gmail.com", section: "#contact", category: "İletişim" },
                { title: "Randevu", description: "Proje görüşmesi için randevu alın", section: "#contact", category: "İletişim" }
            ]
        };
        this.allData = this.flattenData();
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }

    createElements() {
        this.navSearchTrigger = document.getElementById('navSearchTrigger');
        this.heroSearchTrigger = document.getElementById('heroSearchTrigger');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.getElementById('searchInput');
        this.searchClose = document.getElementById('searchClose');
        this.searchClear = document.getElementById('searchClear');
        this.searchVoice = document.getElementById('searchVoice');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.searchResults = document.getElementById('searchResults');
    }

    bindEvents() {
        // Navbar search trigger
        if (this.navSearchTrigger) {
            this.navSearchTrigger.addEventListener('click', () => this.openSearch());
        }
        // Hero search trigger
        if (this.heroSearchTrigger) {
            this.heroSearchTrigger.addEventListener('click', () => this.openSearch());
        }
        
        // Close search
        this.searchClose.addEventListener('click', () => this.closeSearch());
        this.searchOverlay.addEventListener('click', (e) => {
            if (e.target === this.searchOverlay) this.closeSearch();
        });
        
        // Search input
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('focus', () => this.showSuggestions());
        
        // Clear search
        this.searchClear.addEventListener('click', () => this.clearSearch());
        
        // Voice search (placeholder)
        this.searchVoice.addEventListener('click', () => this.handleVoiceSearch());
        
        // Suggestion clicks
        this.searchSuggestions.addEventListener('click', (e) => {
            const suggestionItem = e.target.closest('.suggestion-item');
            if (suggestionItem) {
                this.handleSuggestionClick(suggestionItem);
            }
        });
        
        // Result clicks
        this.searchResults.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                this.handleResultClick(resultItem);
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            
            // Escape to close search
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSearch();
            }
        });
    }

    openSearch() {
        this.isOpen = true;
        this.searchOverlay.classList.add('active');
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
        this.trackEvent('search_opened');
    }

    closeSearch() {
        this.isOpen = false;
        this.searchOverlay.classList.remove('active');
        this.clearSearch();
        this.trackEvent('search_closed');
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchClear.style.display = 'none';
        this.showSuggestions();
    }

    showSuggestions() {
        this.searchSuggestions.style.display = 'block';
        this.searchResults.style.display = 'none';
    }

    handleSearch(query) {
        if (query.trim() === '') {
            this.searchClear.style.display = 'none';
            this.showSuggestions();
            return;
        }
        
        this.searchClear.style.display = 'flex';
        this.searchSuggestions.style.display = 'none';
        this.searchResults.style.display = 'block';
        
        const results = this.searchInData(query);
        this.displayResults(results, query);
        
        this.trackEvent('search_performed', { query, resultCount: results.length });
    }

    searchInData(query) {
        const lowerQuery = query.toLowerCase();
        return this.allData.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.category.toLowerCase().includes(lowerQuery)
        );
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search-minus"></i>
                    <h3>"${query}" için sonuç bulunamadı</h3>
                    <p>Farklı anahtar kelimeler deneyin veya AI asistanımla konuşun!</p>
                </div>
            `;
            return;
        }

        const resultHtml = results.map(result => `
            <div class="search-result-item" data-section="${result.section}">
                <div class="result-icon">
                    <i class="${this.getCategoryIcon(result.category)}"></i>
                </div>
                <div class="result-content">
                    <h4 class="result-title">${this.highlightText(result.title, query)}</h4>
                    <p class="result-description">${this.highlightText(result.description, query)}</p>
                    <span class="result-category">${result.category}</span>
                </div>
                <div class="result-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `).join('');

        this.searchResults.innerHTML = `
            <div class="search-results-header">
                <span>${results.length} sonuç bulundu</span>
            </div>
            ${resultHtml}
        `;
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    getCategoryIcon(category) {
        const icons = {
            'E-ticaret': 'fas fa-shopping-cart',
            'Kurumsal': 'fas fa-building',
            'Blog': 'fas fa-blog',
            'Portfolio': 'fas fa-briefcase',
            'Hizmet': 'fas fa-cogs',
            'Teknoloji': 'fas fa-code',
            'Kişisel': 'fas fa-user',
            'İletişim': 'fas fa-envelope'
        };
        return icons[category] || 'fas fa-circle';
    }

    handleSuggestionClick(suggestionItem) {
        const searchTerm = suggestionItem.dataset.search;
        const targetSection = suggestionItem.dataset.target;
        
        if (searchTerm) {
            this.searchInput.value = searchTerm;
            this.handleSearch(searchTerm);
        } else if (targetSection) {
            this.closeSearch();
            this.scrollToSection(targetSection);
        }
    }

    handleResultClick(resultItem) {
        const section = resultItem.dataset.section;
        this.closeSearch();
        this.scrollToSection(section);
    }

    scrollToSection(section) {
        const targetElement = document.querySelector(section);
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            
            // Add highlight effect
            targetElement.style.animation = 'highlight 2s ease-in-out';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 2000);
        }
    }

    handleVoiceSearch() {
        // Voice search placeholder
        alert('Ses arama özelliği yakında eklenecek! 🎤');
        this.trackEvent('voice_search_attempted');
    }

    flattenData() {
        let allData = [];
        Object.values(this.searchData).forEach(category => {
            allData = allData.concat(category);
        });
        return allData;
    }

    trackEvent(eventName, data = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter_1: data,
                event_category: 'Modern Search',
                event_label: 'User Interaction'
            });
        }
        console.log(`Modern Search Event: ${eventName}`, data);
    }
}

// ==========================================
// AI ASSISTANT WIDGET FUNCTIONALITY
// ==========================================
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.messageHistory = [];
        this.userContext = {
            name: null,
            interest: null,
            budget: null,
            timeline: null,
            projectType: null
        };
        this.conversationState = 'greeting'; // greeting, collecting_info, providing_solution, closing
        this.responses = {
            greeting: [
                "Merhaba! Ben Webtelligence AI asistanınızım! 🤖 Size nasıl yardımcı olabilirim?",
                "Hoşgeldiniz! Web tasarım projeleriniz için buradayım. Hangi konuda yardıma ihtiyacınız var?",
                "Selam! Profesyonel web çözümlerimiz hakkında size yardımcı olmaya hazırım! 💼"
            ],
            services: {
                question: "Hangi tür web sitesi projeniz var? Size özel çözümler sunabilirim:",
                options: [
                    "🏢 Kurumsal Web Sitesi - Profesyonel şirket imajı",
                    "� E-ticaret Sitesi - Online satış platformu", 
                    "👤 Kişisel/Portfolio - Bireysel tanıtım sitesi",
                    "📰 Blog/İçerik Sitesi - İçerik yönetim sistemi",
                    "🎨 Özel Tasarım - Benzersiz ve yaratıcı çözümler"
                ],
                responses: {
                    kurumsal: "Harika! Kurumsal web siteleri konusunda uzmanız. Size profesyonel bir teklif hazırlayabilirim. Şirketinizin adı nedir?",
                    eticaret: "Mükemmel seçim! E-ticaret siteleri için özel çözümlerimiz var. Hangi ürünleri satacaksınız?",
                    portfolio: "Süper! Portfolio siteleri için birçok modern template'imiz var. Hangi alanda çalışıyorsunuz?",
                    blog: "Blog siteleri için CMS çözümlerimiz mevcut. İçerik türünüz nedir?",
                    ozel: "Yaratıcı projeler favorimiz! Aklınızdaki tasarım nasıl? Detayları paylaşır mısınız?"
                }
            },
            pricing: {
                question: "Bütçeniz hakkında bilgi verebilir misiniz? Size en uygun paketi önerebilirim:",
                options: [
                    "💰 5.000₺ - 10.000₺ (Temel paket)",
                    "💎 10.000₺ - 20.000₺ (Profesyonel paket)",
                    "🚀 20.000₺+ (Premium paket)",
                    "🤔 Emin değilim, danışmanlık istiyorum"
                ],
                responses: {
                    temel: "Temel paketimiz ile harika başlangıçlar yapıyoruz! 5-7 sayfalık responsive site, SEO optimizasyonu dahil. Detayları görmek ister misiniz?",
                    profesyonel: "Profesyonel paketimiz çok popüler! 10-15 sayfa, admin paneli, sosyal medya entegrasyonu dahil. Hemen detayları gösterelim!",
                    premium: "Premium paketimiz ile sınırsız olanaklar! Özel tasarım, gelişmiş özellikler, 1 yıl destek dahil. Portföyümüzü inceleyin!",
                    danismanlik: "Tabii ki! Size özel bir danışmanlık görüşmesi ayarlayalım. En uygun çözümü birlikte bulalım."
                }
            },
            portfolio: {
                question: "Hangi sektördeki projelerimizi görmek istersiniz?",
                options: [
                    "🏥 Sağlık ve Medikal",
                    "🏭 Sanayi ve Üretim", 
                    "🍕 Restoran ve Yemek",
                    "🏫 Eğitim ve Akademi",
                    "💼 Hizmet Sektörü",
                    "🛒 E-ticaret Projeleri"
                ],
                responses: {
                    saglik: "Sağlık sektöründe harika projelerimiz var! Modern, güvenli ve hasta dostu tasarımlar. Portfolyomuza göz atın!",
                    sanayi: "Sanayi siteleri için B2B odaklı profesyonel tasarımlarımız mevcut. Güçlü ve etkileyici sonuçlar!",
                    restoran: "Restoran siteleri favorilerimizden! Menü entegrasyonu, rezervasyon sistemi dahil lezzetli tasarımlar!",
                    egitim: "Eğitim platformları için kullanıcı dostu ve interaktif çözümlerimiz var. Öğrenci odaklı tasarımlar!",
                    hizmet: "Hizmet sektörü için güven veren, profesyonel tasarımlar. Müşteri memnuniyeti odaklı!",
                    eticaret: "E-ticaret projelerimiz satış odaklı! Kolay alışveriş deneyimi ve yüksek dönüşüm oranları!"
                }
            },
            contact: {
                question: "Size nasıl ulaşalım? En hızlı iletişim yolunu seçin:",
                options: [
                    "📧 Email ile iletişim",
                    "📞 Telefon görüşmesi",
                    "💬 WhatsApp mesajlaşma",
                    "🗓️ Randevu al",
                    "� Detaylı form doldur"
                ],
                responses: {
                    email: "Email: mertyuksll@gmail.com adresinden bana ulaşabilirsiniz. 24 saat içinde dönüş yapıyorum!",
                    telefon: "Telefon görüşmesi için email ile uygun saatleri paylaşın. Size en kısa sürede dönüş yapacağım!",
                    whatsapp: "WhatsApp için email adresimden iletişim bilgilerimi isteyebilirsiniz. Hızlı yanıt garantisi!",
                    randevu: "Randevu almak için iletişim formunu doldurun. Size uygun tarih ve saati ayarlayalım!",
                    form: "İletişim sayfasına yönlendirecek formla detaylı bilgi paylaşabilirsiniz!"
                }
            },
            technical: {
                question: "Teknik konularda size yardımcı olabilirim:",
                options: [
                    "⚡ Site hızı ve performans",
                    "📱 Mobil uyumluluk", 
                    "🔍 SEO optimizasyonu",
                    "🔒 Güvenlik çözümleri",
                    "🔧 Bakım ve destek",
                    "📊 Analytics ve raporlama"
                ],
                responses: {
                    performans: "Site hızı kritik önem taşıyor! %90+ PageSpeed skorları ile hızlı yüklenen siteler tasarlıyoruz.",
                    mobil: "Responsive tasarım standardımız! Tüm cihazlarda mükemmel görünüm garantisi.",
                    seo: "SEO konusunda uzmanız! Google'da üst sıralarda yer almanız için teknik SEO uyguluyoruz.",
                    guvenlik: "SSL sertifikası, güvenlik duvarı ve düzenli backup ile sitenizi koruyoruz.",
                    bakim: "1 yıl ücretsiz bakım ve destek! Sorunsuz çalışan siteler için sürekli takip.",
                    analytics: "Google Analytics, heatmap ve detaylı raporlarla site performansını takip ediyoruz."
                }
            },
            problem_solving: {
                "site_calişmiyor": "Site çalışmıyor mu? Hemen kontrol edelim! Hosting, domain veya kod kaynaklı olabilir. Acil destek veriyorum!",
                "yavaş_site": "Yavaş site can sıkıcı! Site hızını artırmak için optimizasyon hizmetimiz var. %300'e kadar hızlanma mümkün!",
                "mobile_problem": "Mobil sorunları çözmek uzmanlığımız! Responsive tasarım ile tüm cihazlarda mükemmel görünüm.",
                "seo_problem": "SEO sorunu mu? Google'da görünmeme nedenleri tespit ederiz. Teknik SEO ile çözüm!",
                "design_old": "Eski tasarım mı? Modern, trend tasarımlarla sitenizi yeniliyoruz. 2024 standartları!",
                "security_issue": "Güvenlik sorunu ciddi! Hemen SSL, firewall ve güvenlik taraması yapıyoruz."
            }
        };
        this.pageRoutes = {
            portfolio: "#portfolio",
            services: "#services", 
            pricing: "#pricing",
            contact: "#contact",
            about: "#about",
            home: "#hero"
        };
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
        this.addWelcomeMessage();
    }

    createElements() {
        // AI widget already exists in HTML, just get references
        this.widget = document.getElementById('ai-assistant');
        console.log('AI Widget found:', this.widget);
        
        if (this.widget) {
            this.chatWindow = this.widget.querySelector('.chat-window');
            this.messagesContainer = this.widget.querySelector('.chat-messages');
            this.input = this.widget.querySelector('.chat-input');
            this.sendBtn = this.widget.querySelector('.send-button');
            this.assistantToggle = this.widget.querySelector('.assistant-toggle');
            this.closeBtn = this.widget.querySelector('.chat-close');
            this.quickActionsContainer = this.widget.querySelector('.quick-actions');
            
            console.log('Chat Window found:', this.chatWindow);
            console.log('Assistant Toggle found:', this.assistantToggle);
            console.log('Input found:', this.input);
        } else {
            console.error('AI Assistant widget not found in DOM!');
        }
    }

    bindEvents() {
        // Widget toggle
        if (this.assistantToggle) {
            this.assistantToggle.addEventListener('click', () => {
                console.log('AI Assistant clicked!');
                this.toggleWidget();
            });
            
            // Enhanced hover interactions
            this.assistantToggle.addEventListener('mouseenter', () => {
                this.startHoverAnimation();
            });
            
            this.assistantToggle.addEventListener('mouseleave', () => {
                this.stopHoverAnimation();
            });
        } else {
            console.error('Assistant toggle not found!');
        }

        // Interactive CTA button in status bubble
        const ctaButton = this.widget.querySelector('.status-cta');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleCtaClick();
            });
        }

        // Control buttons
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeWidget();
            });
        }

        // Message input
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Quick actions
        if (this.quickActionsContainer) {
            this.quickActionsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('quick-action') || e.target.closest('.quick-action')) {
                    const button = e.target.closest('.quick-action');
                    const message = button.dataset.message;
                    if (message) {
                        this.input.value = message;
                        this.sendMessage();
                    }
                }
            });
        }
    }

    startHoverAnimation() {
        // Add dynamic text rotation in status bubble
        const statusText = this.widget.querySelector('.status-subtitle');
        const messages = [
            'Çevrimiçi ve Hazır',
            '7/24 Destek',
            'Anında Yanıt',
            'Problem Çözer'
        ];
        
        let messageIndex = 0;
        this.hoverInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            if (statusText) {
                statusText.textContent = messages[messageIndex];
            }
        }, 1500);
    }

    stopHoverAnimation() {
        if (this.hoverInterval) {
            clearInterval(this.hoverInterval);
            const statusText = this.widget.querySelector('.status-subtitle');
            if (statusText) {
                statusText.textContent = 'Çevrimiçi ve Hazır';
            }
        }
    }

    handleCtaClick() {
        // Animate CTA button click
        const ctaButton = this.widget.querySelector('.status-cta');
        if (ctaButton) {
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
                this.toggleWidget();
            }, 150);
        }
    }

    toggleWidget() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.chatWindow.style.display = 'flex';
            // Add a small delay to trigger CSS transitions
            setTimeout(() => {
                this.chatWindow.classList.add('active');
            }, 10);
            this.input.focus();
            this.trackEvent('ai_assistant_opened');
        } else {
            this.chatWindow.classList.remove('active');
            // Hide after transition completes
            setTimeout(() => {
                if (!this.isOpen) {
                    this.chatWindow.style.display = 'none';
                }
            }, 300);
        }
    }

    closeWidget() {
        this.isOpen = false;
        this.chatWindow.classList.remove('active');
        setTimeout(() => {
            this.chatWindow.style.display = 'none';
        }, 300);
    }

    addWelcomeMessage() {
        // Enhanced welcome message with user detection
        const welcomeTimeElement = document.getElementById('welcomeTime');
        if (welcomeTimeElement) {
            welcomeTimeElement.textContent = new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'});
        }
        
        // Add intelligent welcome based on time
        setTimeout(() => {
            const hour = new Date().getHours();
            let timeGreeting = "";
            
            if (hour < 12) {
                timeGreeting = "Günaydın!";
            } else if (hour < 18) {
                timeGreeting = "İyi günler!";
            } else {
                timeGreeting = "İyi akşamlar!";
            }
            
            const intelligentWelcome = `${timeGreeting} 🌟\n\nBen Webtelligence AI asistanınızım! Size şu konularda yardımcı olabilirim:\n\n✨ Acil site sorunları çözme\n💼 Proje danışmanlığı\n💰 Fiyat teklifi alma\n🎨 Tasarım örnekleri görme\n📞 Hızlı iletişim kurma\n\nHangi konuda yardıma ihtiyacınız var?`;
            
            this.addMessage(intelligentWelcome, 'assistant');
        }, 1000);
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';

        // Analyze user intent and update context
        this.analyzeUserIntent(message);

        // Add smart delay based on response complexity
        const responseComplexity = this.calculateResponseComplexity(message);
        const delay = 800 + (responseComplexity * 400);

        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'assistant');
            this.trackEvent('ai_message_sent', { 
                message: message, 
                intent: this.detectUserIntent(message),
                responseLength: response.length 
            });
        }, delay);
    }

    analyzeUserIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Update user context based on message
        if (lowerMessage.includes('acil') || lowerMessage.includes('urgent')) {
            this.conversationState = 'urgent_support';
        }
        
        if (lowerMessage.includes('bütçe') || lowerMessage.includes('para')) {
            this.userContext.budget = 'mentioned';
        }
        
        if (lowerMessage.includes('zaman') || lowerMessage.includes('ne zaman')) {
            this.userContext.timeline = 'mentioned';
        }
    }

    calculateResponseComplexity(message) {
        // Return complexity score (0-3) based on message content
        if (this.detectProblem(message.toLowerCase())) return 3;
        if (message.length > 50) return 2;
        if (message.includes('?')) return 1;
        return 0;
    }

    detectUserIntent(message) {
        const lowerMessage = message.toLowerCase();
        if (this.detectProblem(lowerMessage)) return 'problem_solving';
        if (this.detectIntent(lowerMessage, ['hizmet', 'service'])) return 'services';
        if (this.detectIntent(lowerMessage, ['portfolyo', 'portfolio'])) return 'portfolio';
        if (this.detectIntent(lowerMessage, ['fiyat', 'price'])) return 'pricing';
        if (this.detectIntent(lowerMessage, ['iletişim', 'contact'])) return 'contact';
        return 'general';
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="assistant-avatar-tiny">
                        <img src="images/Gemini_Generated_Image_1risk01risk01ris.png" alt="AI" class="assistant-avatar-img-tiny" decoding="async" />
                    </div>
                </div>
                <div class="message-content">
                    <p>${text.replace(/\n/g, '</p><p>')}</p>
                </div>
                <div class="message-time">
                    <span>${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
                <div class="message-time">
                    <span>${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
            `;
        }

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messageHistory.push({ text, sender, timestamp: Date.now() });
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Problem solving detection
        if (this.detectProblem(lowerMessage)) {
            return this.solveProblem(lowerMessage);
        }
        
        // Intent detection with advanced context
        if (this.detectIntent(lowerMessage, ['hizmet', 'service', 'neler', 'ne yapıyorsun', 'paket', 'çözüm'])) {
            return this.handleServices();
        }
        
        if (this.detectIntent(lowerMessage, ['portfolyo', 'portfolio', 'çalışma', 'proje', 'örnek', 'göster'])) {
            return this.handlePortfolio();
        }
        
        if (this.detectIntent(lowerMessage, ['fiyat', 'ücret', 'maliyet', 'price', 'bütçe', 'kaç para'])) {
            return this.handlePricing();
        }
        
        if (this.detectIntent(lowerMessage, ['iletişim', 'contact', 'ulaş', 'email', 'telefon', 'randevu'])) {
            return this.handleContact();
        }
        
        if (this.detectIntent(lowerMessage, ['teknik', 'hız', 'seo', 'mobil', 'güvenlik', 'performans'])) {
            return this.handleTechnical();
        }
        
        if (this.detectIntent(lowerMessage, ['merhaba', 'selam', 'hello', 'hi', 'hey'])) {
            return this.getRandomResponse(this.responses.greeting);
        }
        
        // Contextual responses based on conversation state
        if (this.conversationState === 'collecting_info') {
            return this.handleInfoCollection(message);
        }
        
        return this.generateSmartResponse(message);
    }

    detectIntent(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    detectProblem(message) {
        const problemKeywords = [
            'çalışmıyor', 'broken', 'hata', 'error', 'sorun', 'problem',
            'yavaş', 'slow', 'açılmıyor', 'loading', 'mobilde', 'mobile',
            'görünmüyor', 'seo', 'google', 'güvenlik', 'security', 'hack'
        ];
        return problemKeywords.some(keyword => message.includes(keyword));
    }

    solveProblem(message) {
        if (message.includes('çalışmıyor') || message.includes('açılmıyor')) {
            setTimeout(() => this.redirectToPage('contact'), 3000);
            return "🚨 Site çalışmıyor mu? Bu ciddi bir durum! Hemen kontrol edelim:\n\n1️⃣ Domain süresi dolmuş olabilir\n2️⃣ Hosting sorunu olabilir\n3️⃣ DNS ayarları bozulmuş olabilir\n\n💡 Acil destek için size ulaşacağım! İletişim sayfasına yönlendirecekken, email adresinizi paylaşabilir misiniz?";
        }
        
        if (message.includes('yavaş') || message.includes('slow')) {
            setTimeout(() => this.redirectToPage('services'), 4000);
            return "⚡ Yavaş site can sıkıcı! Site hızını artırmak için özel optimizasyon hizmetimiz var:\n\n🔧 Kod optimizasyonu\n📱 Görsel sıkıştırma\n☁️ CDN entegrasyonu\n💾 Cache sistemi\n\n📈 %300'e kadar hızlanma mümkün! Hizmetler sayfasına yönlendiriyorum...";
        }
        
        if (message.includes('mobilde') || message.includes('mobile')) {
            setTimeout(() => this.redirectToPage('portfolio'), 3000);
            return "📱 Mobil sorunları en yaygın problem! Responsive tasarım ile çözüyoruz:\n\n✅ Tüm cihazlarda mükemmel görünüm\n✅ Touch-friendly butonlar\n✅ Hızlı yükleme\n✅ Modern mobile UX\n\nPortfoyomuzdaki mobil örnekleri gösterecekken, hangi cihazda sorun yaşıyorsunuz?";
        }
        
        if (message.includes('seo') || message.includes('google')) {
            setTimeout(() => this.redirectToPage('services'), 3000);
            return "🔍 SEO sorunu mu? Google'da görünmemek büyük kayıp! Teknik SEO ile çözüm:\n\n📊 Site analizi\n🔧 Teknik düzeltmeler\n📝 İçerik optimizasyonu\n📈 Ranking takibi\n\nSEO hizmetlerimizi göstereceğim. Site adresinizi paylaşabilir misiniz?";
        }
        
        return "🔧 Sorunu anladım! Size özel bir çözüm hazırlayacağım. Detayları konuşmak için iletişime geçelim!";
    }

    handleServices() {
        this.conversationState = 'providing_solution';
        const response = this.responses.services.question + "\n\n" + 
            this.responses.services.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
        
        setTimeout(() => this.redirectToPage('services'), 5000);
        return response + "\n\n💡 5 saniye sonra hizmetler sayfasına yönlendirecekken, hangi seçenek size uygun?";
    }

    handlePortfolio() {
        const response = this.responses.portfolio.question + "\n\n" + 
            this.responses.portfolio.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
        
        setTimeout(() => this.redirectToPage('portfolio'), 4000);
        return response + "\n\n🎨 4 saniye sonra portfolyo sayfasına yönlendiriyorum!";
    }

    handlePricing() {
        const response = this.responses.pricing.question + "\n\n" + 
            this.responses.pricing.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
        
        setTimeout(() => this.redirectToPage('contact'), 6000);
        return response + "\n\n💰 Size özel teklif için iletişim sayfasına yönlendireceğim!";
    }

    handleContact() {
        const response = this.responses.contact.question + "\n\n" + 
            this.responses.contact.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
        
        setTimeout(() => this.redirectToPage('contact'), 3000);
        return response + "\n\n📞 3 saniye sonra iletişim sayfasına yönlendiriyorum!";
    }

    handleTechnical() {
        const response = this.responses.technical.question + "\n\n" + 
            this.responses.technical.options.map((option, index) => `${index + 1}. ${option}`).join('\n');
        
        return response + "\n\n🔧 Hangi teknik konuda yardıma ihtiyacınız var?";
    }

    handleInfoCollection(message) {
        // Collect user information for better service
        if (!this.userContext.name && this.askForName()) {
            this.userContext.name = message;
            return `Merhaba ${message}! Sizinle tanıştığıma memnun oldum. Hangi tür bir web sitesi projeniz var?`;
        }
        
        return "Bilgileri aldım! Size özel bir çözüm hazırlıyorum...";
    }

    generateSmartResponse(message) {
        // Advanced AI-like responses
        const smartResponses = [
            `"${message}" ile ilgili size yardımcı olabilirim! Web tasarım projelerinizde bu konu önemli. Detayları konuşalım!`,
            `İlginç bir konu! "${message}" hakkında profesyonel çözümlerimiz var. Size özel yaklaşım geliştirebilirim.`,
            `Bu konuda deneyimlerimiz var! "${message}" için size en uygun çözümü bulalım. İletişime geçelim!`
        ];
        
        return this.getRandomResponse(smartResponses);
    }

    redirectToPage(page) {
        if (this.pageRoutes[page]) {
            this.addMessage(`🔄 ${page.charAt(0).toUpperCase() + page.slice(1)} sayfasına yönlendiriyorum...`, 'assistant');
            
            setTimeout(() => {
                // Smooth scroll to section
                const targetSection = document.querySelector(this.pageRoutes[page]);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                    // Add highlight effect
                    targetSection.style.animation = 'highlight 2s ease-in-out';
                    setTimeout(() => {
                        targetSection.style.animation = '';
                    }, 2000);
                }
            }, 1000);
        }
    }

    askForName() {
        return Math.random() > 0.7; // 30% chance to ask for name
    }

    getRandomResponse(responses) {
        if (Array.isArray(responses)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return responses;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    trackEvent(eventName, data = {}) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                custom_parameter_1: data,
                event_category: 'AI Assistant',
                event_label: 'User Interaction'
            });
        }
        console.log(`AI Assistant Event: ${eventName}`, data);
    }
}

// Initialize Modern Search and AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modernSearch = new ModernSearch();
    window.aiAssistant = new AIAssistant();
    
    // Initialize Lazy Loading
    initLazyLoading();
    
    // Initialize Performance Monitoring
    initPerformanceMonitoring();
});

// ==========================================
// LAZY LOADING SYSTEM
// ==========================================
function initLazyLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Load srcset if exists
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // Add loaded class for fade-in effect
                    img.classList.add('lazy-loaded');
                    
                    observer.unobserve(img);
                    console.log('�️ Lazy loaded:', img.src);
                }
            });
        }, {
            rootMargin: '50px' // Load 50px before entering viewport
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }
    
    // Lazy load background images
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    if ('IntersectionObserver' in window) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.backgroundImage = `url(${element.dataset.bg})`;
                    element.removeAttribute('data-bg');
                    observer.unobserve(element);
                }
            });
        });
        
        lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
    }
    
    // Lazy load iframes (videos, maps, etc.)
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                    observer.unobserve(iframe);
                    console.log('📺 Lazy loaded iframe:', iframe.src);
                }
            });
        }, {
            rootMargin: '200px'
        });
        
        lazyIframes.forEach(iframe => iframeObserver.observe(iframe));
    }
    
    console.log('✅ Lazy Loading initialized');
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        // Monitor Largest Contentful Paint (LCP)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP monitoring not supported');
        }
        
        // Monitor First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('⚡ FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID monitoring not supported');
        }
    }
    
    // Log page load performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('📈 Performance Metrics:');
                console.log('  - DNS Lookup:', perfData.domainLookupEnd - perfData.domainLookupStart, 'ms');
                console.log('  - TCP Connection:', perfData.connectEnd - perfData.connectStart, 'ms');
                console.log('  - Server Response:', perfData.responseStart - perfData.requestStart, 'ms');
                console.log('  - Page Load:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                console.log('  - DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart, 'ms');
            }
        }, 0);
    });
    
    console.log('✅ Performance Monitoring initialized');
}

console.log('�🚀 Mert Yüksel Portfolio Website Loaded Successfully!');
console.log('📧 Contact: mertyuksll@gmail.com');
console.log('💼 Professional Web Design Consultation Available!');
console.log('🌐 Ready to create amazing web experiences!');
console.log('🤖 AI Assistant Ready for User Interactions!');
console.log('⚡ PWA & Performance Optimizations Active!');