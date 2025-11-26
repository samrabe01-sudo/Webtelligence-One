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

// Loading Screen Animation
let loadingProgress = 0;
const progressFill = document.getElementById('progressFill');
const loadingText = document.getElementById('loadingText');

const loadingMessages = [
    'Hazırlanıyor...',
    'Bileşenler yükleniyor...',
    'Neredeyse hazır...',
    'Tamamlanıyor...'
];

function animateLoading() {
    if (loadingProgress < 100) {
        loadingProgress += Math.random() * 3 + 1;
        if (loadingProgress > 100) loadingProgress = 100;
        
        if (progressFill) {
            progressFill.style.width = loadingProgress + '%';
        }
        
        // Update loading message based on progress
        if (loadingText) {
            if (loadingProgress < 25) {
                loadingText.textContent = loadingMessages[0];
            } else if (loadingProgress < 60) {
                loadingText.textContent = loadingMessages[1];
            } else if (loadingProgress < 90) {
                loadingText.textContent = loadingMessages[2];
            } else {
                loadingText.textContent = loadingMessages[3];
            }
        }
        
        requestAnimationFrame(animateLoading);
    } else {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 600);
            }
        }, 300);
    }
}

// Loading başlat
if (progressFill) {
    setTimeout(() => animateLoading(), 200);
}

// Hero Video - Normal loop
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
    heroVideo.addEventListener('loadedmetadata', function() {
        this.play().catch(err => console.log('Video autoplay engellendi:', err));
    });
}

// Consultant Video - Normal loop
const consultantVideo = document.getElementById('consultantVideo');
if (consultantVideo) {
    consultantVideo.addEventListener('loadedmetadata', function() {
        this.play().catch(err => console.log('Consultant video autoplay engellendi:', err));
    });
}

// About Section Video - Normal loop
const aboutHeroVideo = document.getElementById('aboutHeroVideo');
if (aboutHeroVideo) {
    aboutHeroVideo.addEventListener('loadedmetadata', function() {
        this.play().catch(err => console.log('About video autoplay engellendi:', err));
    });
}

// Sayfa gerçek yüklenme ilerlemesini takip et
let resourcesLoaded = 0;
let totalResources = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Tüm kaynakları say (görseller, scriptler, css)
    totalResources = document.images.length + document.querySelectorAll('link[rel="stylesheet"]').length;
    
    // Her görselin yüklenmesini dinle
    Array.from(document.images).forEach(img => {
        if (img.complete) {
            resourcesLoaded++;
        } else {
            img.addEventListener('load', () => {
                resourcesLoaded++;
                updateRealProgress();
            });
            img.addEventListener('error', () => {
                resourcesLoaded++;
                updateRealProgress();
            });
        }
    });
});

function updateRealProgress() {
    if (totalResources > 0) {
        const realProgress = (resourcesLoaded / totalResources) * 100;
        // Bu gerçek ilerlemeyi kullanarak animasyonu hızlandırabilirsiniz
        if (loadingProgress < realProgress) {
            loadingProgress = realProgress;
        }
    }
}

// Hero Particles Canvas Animation
function initHeroParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.15 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    
    // Initialize hero particles
    initHeroParticles();
    
    // Initialize skills animations
    initializeSkills();
    
    // Initialize consultation functionality
    initializeConsultation();
});

// Modern Mobile Menu Toggle with improved UX
function toggleMobileMenu() {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open', isActive);
    
    hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    navMenu.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    
    // Announce to screen readers
    if (isActive) {
        navMenu.focus();
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');
}

// Hamburger click handler
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

// Keyboard support for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
    }
});

// Close on outside tap (mobile) with improved performance
document.addEventListener('click', (e) => {
    if (window.innerWidth < 900 && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    }
}, { passive: true });

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
        hamburger.focus();
    }
});

// Improve scroll hide/show throttling
let lastScrollYNav = window.scrollY;
let tickingNav = false;
function handleNavScroll() {
    const currentY = window.scrollY;
    if (currentY > lastScrollYNav && currentY > 120) {
        navbar.classList.add('hide-up');
    } else {
        navbar.classList.remove('hide-up');
    }
    lastScrollYNav = currentY;
    tickingNav = false;
}
window.addEventListener('scroll', () => {
    if (!tickingNav) {
        requestAnimationFrame(handleNavScroll);
        tickingNav = true;
    }
}, { passive: true });

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Navbar Scroll Effect & Floating Elements
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollY / scrollHeight) * 100;
    
    // Navbar effect
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollToTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Update circular progress
    const progressCircle = document.querySelector('.scroll-progress-fill');
    if (progressCircle) {
        const circumference = 163; // 2 * PI * radius (26)
        const offset = circumference - (scrollProgress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
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
    // Yalnızca navbar'da tanımlı bağlantı ID'lerini incele (yan etkileri azaltır)
    const navIds = Array.from(document.querySelectorAll('.nav-menu .nav-link[href^="#"]'))
        .map(link => link.getAttribute('href').substring(1));
    const scrollPosition = window.scrollY + 100;

    navIds.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Counter Animation
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    counterAnimated = true;
    
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const duration = 3500; // 3.5 seconds for smoother animation
        const startTime = performance.now();
        
        const easeOutQuart = (x) => {
            return 1 - Math.pow(1 - x, 4);
        };
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            
            count = Math.floor(easedProgress * target);
            counter.innerText = count;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
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
    // Reveal skill cards
    revealSkillCards();

    // Animate skill level bars
    animateSkillBars();
    
    // Animate progress bars
    animateProgressBars();
    
    // Add hover effects
    addSkillHoverEffects();
}

// Reveal skill cards on scroll
function revealSkillCards() {
    const cards = document.querySelectorAll('.summary-card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
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



// Packages Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const packageItems = document.querySelectorAll('.package-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        packageItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'flex';
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
            if (entry.target.classList.contains('about-stats-grid') || entry.target.classList.contains('about-stats')) {
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
    const statsSection = document.querySelector('.about-stats-grid') || document.querySelector('.about-stats');
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
                // srcset desteği varsa önce srcset ayarla
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                img.src = img.dataset.src;
                img.classList.add('lazy-loaded');
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

// Dekoratif AI Rozetleri Lazy Load
function initAIBadgeLazy(){
    const badges = document.querySelectorAll('.ai-badge');
    if(!badges.length) return;
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                const img = entry.target.querySelector('.ai-badge-img');
                if(img && img.dataset.src && !img.src){
                    img.src = img.dataset.src;
                }
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    badges.forEach(b => io.observe(b));
}

document.addEventListener('DOMContentLoaded', initAIBadgeLazy);

// Gelişmiş görünürlük bazlı animasyon (kartlar + section header)
function initVisibilityReveal(){
    const revealEls = document.querySelectorAll('.service-card, .package-item, .blog-card, .section-header, .ai-badge');
    if(!revealEls.length) return;
    const revealObserver = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
}
document.addEventListener('DOMContentLoaded', initVisibilityReveal);

// ==========================================
// OVERFLOW DIAGNOSTICS (DEV HELPER)
// ==========================================
function detectHorizontalOverflow() {
    // Sadece localhost veya 127.0.0.1'daysak çalıştır (prod'da gereksiz)
    const host = window.location.hostname;
    if (!["localhost","127.0.0.1"].includes(host)) return;
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll('body *').forEach(el => {
        if (el.offsetParent === null) return; // gizli / detached
        const rect = el.getBoundingClientRect();
        if (rect.width > vw + 1 || rect.left < -5 || rect.right > vw + 5) {
            offenders.push({ el, rect });
            el.classList.add('overflow-outline');
        }
    });
    if (offenders.length) {
        console.group('%c[Overflow Tespiti]','color:#fff;background:#dc2626;padding:4px 8px;border-radius:4px;');
        offenders.forEach(o => {
            console.log('Eleman:', o.el.tagName + (o.el.className ? '.' + o.el.className.replace(/\s+/g,'.') : ''), 'Genişlik:', o.rect.width.toFixed(1), 'Sol:', o.rect.left.toFixed(1), 'Sağ:', o.rect.right.toFixed(1));
        });
        console.groupEnd();
    } else {
        console.log('%c[Overflow Tespiti] Sorun yok','color:#fff;background:#16a34a;padding:4px 8px;border-radius:4px;');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // İlk yüklemede ve resize sonrası tetikle
    detectHorizontalOverflow();
    window.addEventListener('resize', () => { detectHorizontalOverflow(); }, { passive:true });
});

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
            packages: [
                { title: "Temel Web Sitesi", description: "Küçük işletmeler için profesyonel site - ₺3.500", section: "#packages", category: "Temel Paket" },
                { title: "E-Ticaret Paketi", description: "Ödeme entegrasyonu ve ürün yönetimi - ₺7.500", section: "#packages", category: "Standart Paket" },
                { title: "Kurumsal Web Paketi", description: "API ve performans optimizasyonu - ₺15.000", section: "#packages", category: "Premium Paket" },
                { title: "Portföy Web Sitesi", description: "Freelancer ve yaratıcılar için galeri - ₺4.000", section: "#packages", category: "Temel Paket" },
                { title: "Sağlık & Klinik Paketi", description: "Randevu ve ödeme sistemi - ₺9.000", section: "#packages", category: "Standart Paket" },
                { title: "Restoran & Yemek Sipariş", description: "Dijital menü ve sipariş platformu - ₺10.500", section: "#packages", category: "Özel Paket" }
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
        // Eğer widget kaldırılmışsa tüm event bağlama işlemlerini atla
        if (!this.widget) {
            return;
        }
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
            packages: "#packages",
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

            // Başlangıç erişilebilirlik durumları
            if (this.chatWindow) {
                this.chatWindow.setAttribute('aria-hidden', 'true');
            }
            if (this.assistantToggle) {
                this.assistantToggle.setAttribute('aria-expanded', 'false');
            }
            this.previouslyFocusedElement = null;
            this.keyTrapHandler = this.handleKeyTrap.bind(this);
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
        if (!this.widget) return;
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
        if (!this.widget) return;
        if (this.hoverInterval) {
            clearInterval(this.hoverInterval);
            const statusText = this.widget.querySelector('.status-subtitle');
            if (statusText) {
                statusText.textContent = 'Çevrimiçi ve Hazır';
            }
        }
    }

    handleCtaClick() {
        if (!this.widget) return;
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
            this.openDialogAccessibility();
        } else {
            this.closeDialogAccessibility();
        }
    }

    closeWidget() {
        if (!this.isOpen) return; // zaten kapalı
        this.isOpen = false;
        this.closeDialogAccessibility();
    }

    // ----- Erişilebilirlik Yardımcıları -----
    getFocusableElements() {
        if (!this.chatWindow) return [];
        const selectors = 'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
        return Array.from(this.chatWindow.querySelectorAll(selectors))
            .filter(el => !el.disabled && el.offsetParent !== null);
    }

    openDialogAccessibility() {
        if (!this.chatWindow) return;
        this.chatWindow.style.display = 'flex';
        setTimeout(() => {
            this.chatWindow.classList.add('active');
        }, 10);

        // Add class to hide status bubble
        if (this.widget) {
            this.widget.classList.add('chat-open');
        }

        // ARIA durumları
        this.chatWindow.setAttribute('aria-hidden', 'false');
        if (this.assistantToggle) {
            this.assistantToggle.setAttribute('aria-expanded', 'true');
        }

        // Focus trap hazırlığı
        this.previouslyFocusedElement = document.activeElement;
        this.focusableElements = this.getFocusableElements();
        const first = this.input || this.focusableElements[0];
        if (first) first.focus();

        document.addEventListener('keydown', this.keyTrapHandler, true);
        this.trackEvent('ai_assistant_opened');
    }

    closeDialogAccessibility() {
        if (!this.chatWindow) return;
        this.chatWindow.classList.remove('active');
        setTimeout(() => {
            this.chatWindow.style.display = 'none';
        }, 300);

        // Remove class to show status bubble again
        if (this.widget) {
            this.widget.classList.remove('chat-open');
        }

        this.chatWindow.setAttribute('aria-hidden', 'true');
        if (this.assistantToggle) {
            this.assistantToggle.setAttribute('aria-expanded', 'false');
        }

        document.removeEventListener('keydown', this.keyTrapHandler, true);
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
        } else if (this.assistantToggle) {
            this.assistantToggle.focus();
        }
    }

    handleKeyTrap(e) {
        if (!this.isOpen) return;
        if (e.key === 'Escape') {
            e.preventDefault();
            this.closeWidget();
            return;
        }
        if (e.key !== 'Tab') return;

        this.focusableElements = this.getFocusableElements();
        if (!this.focusableElements.length) return;
        const first = this.focusableElements[0];
        const last = this.focusableElements[this.focusableElements.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
            if (active === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (active === last) {
                e.preventDefault();
                first.focus();
            }
        }
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
        messageDiv.setAttribute('role', 'article');
        const shortText = text.length > 120 ? text.slice(0,117) + '…' : text;
        if (sender === 'assistant') {
            messageDiv.setAttribute('aria-label', `Asistan mesajı: ${shortText}`);
        } else {
            messageDiv.setAttribute('aria-label', `Kullanıcı mesajı: ${shortText}`);
        }
        
        if (sender === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <div class="assistant-avatar-tiny">
                        <img src="../images/profile/ai_asistan.png" alt="AI Asistan" class="assistant-avatar-img-tiny" decoding="async" />
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
        
        if (this.detectIntent(lowerMessage, ['paket', 'package', 'çalışma', 'proje', 'örnek', 'göster', 'seçenek'])) {
            return this.handlePackages();
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

    handlePackages() {
        const packages = [
            "📦 Temel Web Sitesi - ₺2.500'den başlayan fiyatlarla",
            "🛒 E-Ticaret Paketi - ₺5.000'den başlayan fiyatlarla",
            "👑 Kurumsal Web Paketi - ₺10.000'den başlayan fiyatlarla",
            "💼 Portföy Web Sitesi - ₺3.000'den başlayan fiyatlarla",
            "🏥 Sağlık & Klinik Paketi - ₺6.500'den başlayan fiyatlarla",
            "🍽️ Restoran & Yemek Sipariş - ₺7.500'den başlayan fiyatlarla"
        ];
        
        const response = "Sizin için hazırladığım web tasarım paketlerimiz:\n\n" + 
            packages.join('\n') + 
            "\n\n💡 Her paket özelleştirilebilir ve ihtiyacınıza göre düzenlenebilir!";
        
        setTimeout(() => this.redirectToPage('packages'), 4000);
        return response + "\n\n🎨 4 saniye sonra paketler sayfasına yönlendiriyorum!";
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

// ==========================================
// AUTH MODALS (Login & Signup) - Interactive
// ==========================================
(function(){
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAuthModals);
    } else {
        initAuthModals();
    }
    
    function initAuthModals() {
        const loginModal = document.getElementById('modal-login');
        const signupModal = document.getElementById('modal-signup');

        if(!loginModal || !signupModal){
            console.log('Auth modals not found on this page');
            return;
        }

        console.log('Auth modals found, initializing...');

        const usernameRe = /^[\w\s]{2,}$/; // En az 2 karakter, harf, rakam, boşluk
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const passwordRe = /^.{8,}$/; // Minimum 8 karakter (HTML placeholder ile uyumlu)

        const openAuthModal = (which) => {
            const m = which === 'login' ? loginModal : signupModal;
            m.classList.add('active');
            m.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
            const firstInput = m.querySelector('input');
            setTimeout(()=> firstInput && firstInput.focus(), 100);
            console.log(`${which} modal opened`);
        };
        
        const closeAuthModal = (which) => {
            const m = which === 'login' ? loginModal : signupModal;
            m.classList.remove('active');
            m.setAttribute('aria-hidden','true');
            document.body.style.overflow = '';
            console.log(`${which} modal closed`);
        };

        // Attach click handlers to ALL login/signup buttons
        const allLoginButtons = document.querySelectorAll('#openLogin, .btn-auth--login');
        const allSignupButtons = document.querySelectorAll('#openSignup, .btn-auth--signup');
        
        console.log(`Found ${allLoginButtons.length} login buttons and ${allSignupButtons.length} signup buttons`);
        
        allLoginButtons.forEach((btn, index) => {
            console.log(`Attaching listener to login button ${index + 1}`, btn);
            btn.addEventListener('click', (e)=> {
                e.preventDefault();
                e.stopPropagation();
                console.log('Login button clicked');
                openAuthModal('login');
            });
        });
        
        allSignupButtons.forEach((btn, index) => {
            console.log(`Attaching listener to signup button ${index + 1}`, btn);
            btn.addEventListener('click', (e)=> {
                e.preventDefault();
                e.stopPropagation();
                console.log('Signup button clicked');
                openAuthModal('signup');
            });
        });

        // Overlay click closes
        [loginModal, signupModal].forEach(m => {
            m.addEventListener('click', (e)=>{ 
                if(e.target === m) {
                    m.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            const closeBtn = m.querySelector('.auth-close');
            closeBtn && closeBtn.addEventListener('click', ()=> {
                m.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Escape closes
        document.addEventListener('keydown', (e)=>{
            if(e.key === 'Escape'){
                if(loginModal.classList.contains('active') || signupModal.classList.contains('active')){
                    loginModal.classList.remove('active');
                    signupModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Toggle visibility buttons
        document.querySelectorAll('.auth-toggle').forEach(btn => {
            btn.addEventListener('click', ()=>{
                const id = btn.getAttribute('data-toggle');
                const input = document.getElementById(id);
                if(input){
                    const isPwd = input.type === 'password';
                    input.type = isPwd ? 'text' : 'password';
                    btn.textContent = isPwd ? 'Gizle' : 'Göster';
                    input.focus();
                }
            });
        });

        // Switch links (login <-> signup)
        document.querySelectorAll('[data-switch="login"]').forEach(a => a.addEventListener('click', (e)=>{
            e.preventDefault(); closeAuthModal('signup'); openAuthModal('login');
        }));
        document.querySelectorAll('[data-switch="signup"]').forEach(a => a.addEventListener('click', (e)=>{
            e.preventDefault(); closeAuthModal('login'); openAuthModal('signup');
        }));

        // Login validation
        const loginForm = document.getElementById('modalLoginForm');
        const loginId = document.getElementById('login-identifier');
        const loginPwd = document.getElementById('login-password');
        const loginIdErr = document.getElementById('login-identifier-err');
        const loginPwdErr = document.getElementById('login-password-err');

        function setErr(input, el, msg){ 
            if(input) input.classList.add('error'); 
            if(el) el.textContent = msg; 
        }
        function clrErr(input, el){ 
            if(input) input.classList.remove('error'); 
            if(el) el.textContent = ''; 
        }

        const API_BASE = (typeof window !== 'undefined' && window.API_BASE) ? window.API_BASE : '';

        if(loginForm){
            loginForm.addEventListener('submit', async (e)=>{
                e.preventDefault();
                let ok = true;
                const idVal = loginId.value.trim();
                if(!idVal){ 
                    setErr(loginId, loginIdErr, '⚠️ E-posta adresi boş bırakılamaz.'); 
                    ok = false; 
                }
                else if(!emailRe.test(idVal)){
                    setErr(loginId, loginIdErr, '⚠️ Geçerli bir e-posta adresi giriniz (örn: kullanici@site.com).'); 
                    ok = false;
                } else { 
                    clrErr(loginId, loginIdErr); 
                }

                if(!loginPwd.value){ 
                    setErr(loginPwd, loginPwdErr, '⚠️ Şifre alanı boş bırakılamaz.'); 
                    ok = false; 
                }
                else if(loginPwd.value.length < 8){
                    setErr(loginPwd, loginPwdErr, '⚠️ Şifre en az 8 karakter olmalıdır.');
                    ok = false;
                }
                else { 
                    clrErr(loginPwd, loginPwdErr); 
                }

                if(!ok) return;
                // Buton disable ve loading state
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Giriş yapılıyor...';
                
                try {
                    const res = await fetch(API_BASE + '/api/public/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: idVal, password: loginPwd.value })
                    });
                    
                    if(!res.ok) {
                        const data = await res.json().catch(() => ({}));
                        throw new Error(data.message || `Sunucu hatası: ${res.status}`);
                    }
                    
                    const data = await res.json();
                    
                    if(!data.token || !data.user){
                        throw new Error('Geçersiz sunucu yanıtı');
                    }
                    
                    localStorage.setItem('user_token', data.token);
                    localStorage.setItem('user_info', JSON.stringify(data.user));
                    showNotification('✅ Giriş başarılı! Hoş geldiniz ' + (data.user.name || '') + '. Profil sayfasına yönlendiriliyorsunuz...', 'success');
                    closeAuthModal('login');
                    loginForm.reset();
                    
                    // Profil sayfasına yönlendir
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                } catch(err){
                    console.error('Login error:', err);
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    let errorMsg = '❌ Giriş yapılamadı: ';
                    if(err.message.includes('Failed to fetch')){
                        errorMsg += 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.';
                    } else if(err.message.includes('401')){
                        errorMsg += 'E-posta veya şifre hatalı.';
                    } else {
                        errorMsg += err.message;
                    }
                    showNotification(errorMsg, 'error');
                }
            });
        }

        // Signup validation
        const suForm = document.getElementById('modalSignupForm');
        const suUsername = document.getElementById('su-username');
        const suEmail = document.getElementById('su-email');
        const suPwd = document.getElementById('su-password');
        const suCnf = document.getElementById('su-confirm');
        const suUErr = document.getElementById('su-username-err');
        const suEErr = document.getElementById('su-email-err');
        const suPErr = document.getElementById('su-password-err');
        const suCErr = document.getElementById('su-confirm-err');

        if(suForm){
            suForm.addEventListener('submit', async (e)=>{
                e.preventDefault();
                let ok = true;
                
                // Username validation
                if(!suUsername.value.trim()) { 
                    setErr(suUsername, suUErr, '⚠️ Kullanıcı adı boş bırakılamaz.'); 
                    ok=false; 
                }
                else if(suUsername.value.trim().length < 2){ 
                    setErr(suUsername, suUErr, '⚠️ Kullanıcı adı en az 2 karakter olmalıdır.'); 
                    ok=false; 
                }
                else if(!usernameRe.test(suUsername.value.trim())){ 
                    setErr(suUsername, suUErr, '⚠️ Kullanıcı adı sadece harf, rakam ve boşluk içerebilir.'); 
                    ok=false; 
                } else { 
                    clrErr(suUsername, suUErr); 
                }

                // Email validation
                if(!suEmail.value.trim()){ 
                    setErr(suEmail, suEErr, '⚠️ E-posta adresi boş bırakılamaz.'); 
                    ok=false; 
                }
                else if(!emailRe.test(suEmail.value.trim())){ 
                    setErr(suEmail, suEErr, '⚠️ Geçerli bir e-posta adresi giriniz (örn: kullanici@site.com).'); 
                    ok=false; 
                } else { 
                    clrErr(suEmail, suEErr); 
                }

                // Password validation
                if(!suPwd.value){ 
                    setErr(suPwd, suPErr, '⚠️ Şifre boş bırakılamaz.'); 
                    ok=false; 
                }
                else if(!passwordRe.test(suPwd.value)){ 
                    setErr(suPwd, suPErr, '⚠️ Şifre en az 8 karakter olmalıdır.'); 
                    ok=false; 
                }
                else if(!/[A-Za-z]/.test(suPwd.value) || !/[0-9]/.test(suPwd.value)){
                    setErr(suPwd, suPErr, '⚠️ Şifre en az bir harf ve bir rakam içermelidir.');
                    ok=false;
                }
                else { 
                    clrErr(suPwd, suPErr); 
                }

                // Confirm password validation
                if(!suCnf.value){ 
                    setErr(suCnf, suCErr, '⚠️ Şifre tekrarı boş bırakılamaz.'); 
                    ok=false; 
                }
                else if(suCnf.value !== suPwd.value){ 
                    setErr(suCnf, suCErr, '⚠️ Şifreler eşleşmiyor. Lütfen aynı şifreyi girin.'); 
                    ok=false; 
                } else { 
                    clrErr(suCnf, suCErr); 
                }

                if(!ok) return;
                
                // Buton disable ve loading state
                const submitBtn = suForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ Kaydediliyor...';
                
                try {
                    const res = await fetch(API_BASE + '/api/public/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            email: suEmail.value.trim(), 
                            password: suPwd.value, 
                            name: suUsername.value.trim(),
                            username: suUsername.value.trim() 
                        })
                    });
                    
                    if(!res.ok) {
                        const data = await res.json().catch(() => ({}));
                        throw new Error(data.message || `Sunucu hatası: ${res.status}`);
                    }
                    
                    const data = await res.json();
                    
                    if(!data.token || !data.user){
                        throw new Error('Geçersiz sunucu yanıtı');
                    }
                    
                    localStorage.setItem('user_token', data.token);
                    localStorage.setItem('user_info', JSON.stringify(data.user));
                    showNotification('🎉 Kaydınız başarıyla oluşturuldu! Hoş geldiniz ' + (data.user.name || '') + '. Profil sayfasına yönlendiriliyorsunuz...', 'success');
                    closeAuthModal('signup');
                    suForm.reset();
                    
                    // Profil sayfasına yönlendir
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);
                } catch(err){
                    console.error('Signup error:', err);
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    let errorMsg = '❌ Kayıt oluşturulamadı: ';
                    if(err.message.includes('Failed to fetch')){
                        errorMsg += 'Sunucuya bağlanılamıyor. İnternet bağlantınızı kontrol edin.';
                    } else if(err.message.includes('409') || err.message.includes('exists')){
                        errorMsg += 'Bu e-posta adresi zaten kullanılıyor.';
                    } else {
                        errorMsg += err.message;
                    }
                    showNotification(errorMsg, 'error');
                }
            });
        }
        
        // Gelişmiş auth UI senkronizasyonu
        function updateAuthUI(isAuth, user){
            const group = document.querySelector('.nav-auth-group');
            if(!group) return;
            
            if(isAuth && user){
                // Kullanıcı giriş yapmış
                const userName = user.name || user.username || 'Kullanıcı';
                const userInitial = userName.charAt(0).toUpperCase();
                
                group.innerHTML = `
                    <a href="profile.html" class="btn-auth btn-auth--login" title="Profilim">
                        <span class="user-avatar">${userInitial}</span>
                        <span class="user-name">${userName}</span>
                    </a>
                    <button class="btn-auth btn-auth--signup" id="btnLogoutUser" title="Çıkış Yap">
                        <i class="fas fa-sign-out-alt"></i> Çıkış
                    </button>
                `;
                
                const logoutBtn = document.getElementById('btnLogoutUser');
                logoutBtn?.addEventListener('click', ()=>{
                    if(confirm('Çıkış yapmak istediğinize emin misiniz?')){
                        localStorage.removeItem('user_token');
                        localStorage.removeItem('user_info');
                        showNotification('✅ Başarıyla çıkış yaptınız.', 'success');
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    }
                });
            } else {
                // Kullanıcı giriş yapmamış - default butonları göster
                group.innerHTML = `
                    <button id="openLogin" class="btn-auth btn-auth--login" aria-haspopup="dialog" aria-controls="modal-login">
                        <i class="fas fa-sign-in-alt"></i> Giriş Yap
                    </button>
                    <button id="openSignup" class="btn-auth btn-auth--signup" aria-haspopup="dialog" aria-controls="modal-signup">
                        <i class="fas fa-user-plus"></i> Kaydol
                    </button>
                `;
                
                // Yeni butonlara event listener ekle
                const loginBtn = document.getElementById('openLogin');
                const signupBtn = document.getElementById('openSignup');
                
                loginBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    openAuthModal('login');
                });
                
                signupBtn?.addEventListener('click', (e) => {
                    e.preventDefault();
                    openAuthModal('signup');
                });
            }
        }
        
        // Sayfa yüklenince token kontrolü ve UI güncelleme
        try {
            const token = localStorage.getItem('user_token');
            const userInfo = localStorage.getItem('user_info');
            
            if(token && userInfo){
                const user = JSON.parse(userInfo);
                updateAuthUI(true, user);
                console.log('User authenticated:', user.name || user.email);
            } else {
                updateAuthUI(false, null);
                console.log('No user authentication found');
            }
        } catch(err) {
            console.error('Auth UI initialization error:', err);
            // Token bozuksa temizle
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_info');
            updateAuthUI(false, null);
        }
        
        // Paket satın alma: .btn-package tıklamalarını yakala
        document.addEventListener('click', async (e) => {
            const btn = e.target.closest('.btn-package');
            if(!btn) return;
            e.preventDefault();
            const pkgName = btn.dataset.package || btn.closest('.package-item')?.querySelector('.package-header h3')?.textContent?.trim();
            if(!pkgName){
                console.warn('Paket adı bulunamadı');
                return;
            }

            const token = localStorage.getItem('user_token');
            if(!token){
                showNotification('Satın almak için lütfen giriş yapın.', 'info');
                openAuthModal('login');
                return;
            }

            try{
                const res = await fetch(API_BASE + '/api/public/purchase-package', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ packageName: pkgName })
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.message || 'Satın alma başarısız');

                // UI geri bildirimi
                showNotification(`🎉 "${pkgName}" paketi hesabınıza eklendi.`, 'success');
                btn.classList.add('purchased');
            }catch(err){
                showNotification(err.message, 'error');
            }
        });

        console.log('Auth modal initialization complete');
    }
})();

// ===== ULTRA PROFESSIONAL CONSULTATION QUESTIONNAIRE =====
(function() {
    const questions = [
        {
            category: "Proje Hedefleri",
            icon: "fa-rocket",
            title: "Projenizin ana amacı nedir?",
            description: "Web sitenizle ulaşmak istediğiniz birincil hedefi seçin",
            type: "choice",
            answers: [
                { icon: "fa-building", title: "Kurumsal Tanıtım", desc: "Şirket kimliği ve hizmetleri tanıtmak", value: "kurumsal" },
                { icon: "fa-shopping-cart", title: "E-Ticaret", desc: "Online ürün satışı yapmak", value: "e-ticaret" },
                { icon: "fa-pen-fancy", title: "İçerik & Blog", desc: "Makale ve içerik paylaşmak", value: "blog" },
                { icon: "fa-palette", title: "Portföy", desc: "Çalışmaları sergilemek", value: "portfoy" }
            ]
        },
        {
            category: "Hedef Kitle",
            icon: "fa-users",
            title: "Hedef kitleniz kimlerden oluşuyor?",
            description: "Sitenizi kimlerin ziyaret etmesini bekliyorsunuz?",
            type: "choice",
            answers: [
                { icon: "fa-user-tie", title: "B2B İş Dünyası", desc: "Kurumsal müşteriler ve partnerler", value: "b2b" },
                { icon: "fa-user", title: "B2C Son Kullanıcı", desc: "Bireysel müşteriler", value: "b2c" },
                { icon: "fa-briefcase", title: "Profesyoneller", desc: "Sektör uzmanları ve profesyoneller", value: "profesyonel" },
                { icon: "fa-users-cog", title: "Karma", desc: "Çoklu hedef kitle", value: "karma" }
            ]
        },
        {
            category: "Tasarım Tercihleri",
            icon: "fa-paint-brush",
            title: "Hangi tasarım stilini tercih edersiniz?",
            description: "Sitenizin görsel kimliği nasıl olmalı?",
            type: "choice",
            answers: [
                { icon: "fa-magic", title: "Minimalist & Modern", desc: "Sade, temiz ve çağdaş tasarım", value: "minimalist" },
                { icon: "fa-certificate", title: "Kurumsal & Profesyonel", desc: "Resmi ve güvenilir görünüm", value: "kurumsal" },
                { icon: "fa-star", title: "Yaratıcı & Cesur", desc: "Dikkat çekici ve özgün", value: "yaratici" },
                { icon: "fa-award", title: "Lüks & Premium", desc: "Şık ve prestijli", value: "lux" }
            ]
        },
        {
            category: "Özellikler",
            icon: "fa-cog",
            title: "Hangi özelliklere ihtiyacınız var?",
            description: "Sitenizde olmasını istediğiniz temel fonksiyonlar",
            type: "choice",
            answers: [
                { icon: "fa-blog", title: "Blog & Haberler", desc: "İçerik yönetim sistemi", value: "blog" },
                { icon: "fa-id-card", title: "Üye Girişi", desc: "Kullanıcı hesap sistemi", value: "uyelik" },
                { icon: "fa-envelope", title: "İletişim Formu", desc: "Mesaj gönderme sistemi", value: "form" },
                { icon: "fa-calendar-alt", title: "Randevu Sistemi", desc: "Online rezervasyon", value: "randevu" }
            ]
        },
        {
            category: "Bütçe",
            icon: "fa-money-bill-wave",
            title: "Bütçe aralığınız nedir?",
            description: "Projeniz için ayırdığınız bütçe",
            type: "choice",
            answers: [
                { icon: "fa-seedling", title: "Başlangıç", desc: "5.000 - 15.000 TL", value: "5000-15000" },
                { icon: "fa-chart-line", title: "Orta Düzey", desc: "15.000 - 30.000 TL", value: "15000-30000" },
                { icon: "fa-gem", title: "İleri Düzey", desc: "30.000 - 50.000 TL", value: "30000-50000" },
                { icon: "fa-crown", title: "Premium", desc: "50.000 TL ve üzeri", value: "50000+" }
            ]
        },
        {
            category: "Zaman Planı",
            icon: "fa-clock",
            title: "Projenizin tamamlanma süresi?",
            description: "Sitenizin ne kadar sürede hazır olmasını istiyorsunuz?",
            type: "choice",
            answers: [
                { icon: "fa-bolt", title: "Acil", desc: "2 hafta içinde", value: "2hafta" },
                { icon: "fa-running", title: "Hızlı", desc: "1 ay içinde", value: "1ay" },
                { icon: "fa-walking", title: "Normal", desc: "2-3 ay", value: "2-3ay" },
                { icon: "fa-hourglass-half", title: "Esnek", desc: "3+ ay, acele yok", value: "esnek" }
            ]
        },
        {
            category: "İçerik",
            icon: "fa-file-alt",
            title: "İçerikleriniz hazır mı?",
            description: "Metinler, görseller ve medya dosyaları",
            type: "choice",
            answers: [
                { icon: "fa-check-circle", title: "Hazır", desc: "Tüm içerikler mevcut", value: "hazir" },
                { icon: "fa-edit", title: "Kısmen Hazır", desc: "Bazı içerikler var", value: "kismen" },
                { icon: "fa-question-circle", title: "Hazır Değil", desc: "İçerik desteği gerekli", value: "yok" },
                { icon: "fa-user-friends", title: "Profesyonel İçerik", desc: "İçerik üretimi istiyorum", value: "profesyonel" }
            ]
        },
        {
            category: "SEO & Pazarlama",
            icon: "fa-search",
            title: "SEO ve dijital pazarlama önceliğiniz?",
            description: "Arama motorlarında görünürlük",
            type: "choice",
            answers: [
                { icon: "fa-star", title: "Çok Önemli", desc: "SEO birinci öncelik", value: "cok-onemli" },
                { icon: "fa-thumbs-up", title: "Önemli", desc: "SEO önemli ama tek değil", value: "onemli" },
                { icon: "fa-meh", title: "Orta", desc: "Temel SEO yeterli", value: "orta" },
                { icon: "fa-times-circle", title: "Öncelik Değil", desc: "Şimdilik SEO gerekmiyor", value: "dusuk" }
            ]
        },
        {
            category: "Mobil Uyumluluk",
            icon: "fa-mobile-alt",
            title: "Mobil cihazlar için önceliğiniz?",
            description: "Responsive tasarım ve mobil deneyim",
            type: "choice",
            answers: [
                { icon: "fa-mobile-alt", title: "Mobil Öncelikli", desc: "Mobil deneyim çok önemli", value: "mobil-first" },
                { icon: "fa-equals", title: "Eşit Önem", desc: "Mobil ve desktop eşit", value: "esit" },
                { icon: "fa-desktop", title: "Desktop Öncelikli", desc: "Masaüstü daha önemli", value: "desktop-first" },
                { icon: "fa-balance-scale", title: "Dengeli", desc: "Her iki platform da önemli", value: "dengeli" }
            ]
        },
        {
            category: "İletişim",
            icon: "fa-address-card",
            title: "İletişim bilgileriniz",
            description: "Teklif ve detaylar için size nasıl ulaşabilirim?",
            type: "form",
            fields: [
                { type: "text", name: "name", placeholder: "Ad Soyad", required: true },
                { type: "email", name: "email", placeholder: "E-posta Adresiniz", required: true },
                { type: "tel", name: "phone", placeholder: "Telefon (Opsiyonel)", required: false },
                { type: "text", name: "company", placeholder: "Şirket/Marka Adı (Opsiyonel)", required: false }
            ]
        }
    ];

    let currentQuestion = 0;
    const answers = {};

    // DOM Elements
    const questionStage = document.getElementById('questionStage');
    const btnNext = document.getElementById('btnNextPro');
    const btnBack = document.getElementById('btnBackPro');
    const progressFill = document.getElementById('progressFillPro');
    const currentStep = document.getElementById('currentStep');
    const totalSteps = document.getElementById('totalSteps');
    const progressPercentage = document.getElementById('progressPercentage');
    const stepDots = document.getElementById('stepDots');
    const consultationResults = document.getElementById('consultationResults');

    if (!questionStage) return;

    // Initialize
    totalSteps.textContent = questions.length;
    initStepDots();
    loadQuestion(0);

    function initStepDots() {
        stepDots.innerHTML = '';
        questions.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'step-dot-pro';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (index < currentQuestion) loadQuestion(index);
            });
            stepDots.appendChild(dot);
        });
    }

    function loadQuestion(index) {
        const q = questions[index];
        currentQuestion = index;

        // Update progress
        currentStep.textContent = index + 1;
        const progress = ((index + 1) / questions.length) * 100;
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.round(progress) + '%';

        // Update step dots
        document.querySelectorAll('.step-dot-pro').forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i < index) dot.classList.add('completed');
            else if (i === index) dot.classList.add('active');
        });

        // Update back button
        if (index === 0) {
            btnBack.classList.add('hidden');
        } else {
            btnBack.classList.remove('hidden');
        }

        // Build question HTML
        let html = `
            <div class="question-card-pro active">
                <div class="question-category">
                    <i class="fas ${q.icon}"></i>
                    <span>${q.category}</span>
                </div>
                <h3 class="question-title-pro">${q.title}</h3>
                <p class="question-desc-pro">${q.description}</p>
        `;

        if (q.type === 'choice') {
            html += '<div class="answer-grid">';
            q.answers.forEach(ans => {
                const selected = answers[index] === ans.value ? 'selected' : '';
                html += `
                    <div class="answer-card ${selected}" data-value="${ans.value}">
                        <div class="answer-icon">
                            <i class="fas ${ans.icon}"></i>
                        </div>
                        <h4>${ans.title}</h4>
                        <p>${ans.desc}</p>
                    </div>
                `;
            });
            html += '</div>';
        } else if (q.type === 'form') {
            html += '<div class="answer-form">';
            q.fields.forEach(field => {
                html += `
                    <div class="form-field">
                        <input 
                            type="${field.type}" 
                            name="${field.name}" 
                            placeholder="${field.placeholder}"
                            ${field.required ? 'required' : ''}
                            value="${answers[field.name] || ''}"
                            class="form-input-pro"
                        />
                    </div>
                `;
            });
            html += '</div>';
        }

        html += '</div>';
        questionStage.innerHTML = html;

        // Add event listeners
        if (q.type === 'choice') {
            document.querySelectorAll('.answer-card').forEach(card => {
                card.addEventListener('click', function() {
                    document.querySelectorAll('.answer-card').forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    answers[currentQuestion] = this.dataset.value;
                    btnNext.disabled = false;
                });
            });

            // Enable next if already answered
            btnNext.disabled = !answers[currentQuestion];
        } else if (q.type === 'form') {
            document.querySelectorAll('.form-input-pro').forEach(input => {
                input.addEventListener('input', validateForm);
            });
            validateForm();
        }

        // Update next button text
        btnNext.querySelector('span').textContent = index === questions.length - 1 ? 'Tamamla' : 'Devam Et';
    }

    function validateForm() {
        const inputs = document.querySelectorAll('.form-input-pro[required]');
        const allValid = Array.from(inputs).every(input => input.value.trim());
        btnNext.disabled = !allValid;

        // Save form data
        document.querySelectorAll('.form-input-pro').forEach(input => {
            answers[input.name] = input.value.trim();
        });
    }

    btnNext.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            loadQuestion(currentQuestion + 1);
        } else {
            showResults();
        }
    });

    btnBack.addEventListener('click', () => {
        if (currentQuestion > 0) {
            loadQuestion(currentQuestion - 1);
        }
    });

    function showResults() {
        document.querySelector('.questionnaire-container-pro').style.display = 'none';
        consultationResults.classList.remove('hidden');
        consultationResults.style.display = 'block';

        // Generate summary
        const summary = generateSummary();
        const summaryContainer = document.getElementById('resultsSummary');
        
        // Bilgilendirici başlangıç mesajı ekle
        const infoMessage = `
            <div class="results-info-banner">
                <div class="info-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="info-content">
                    <h4>🎉 Tebrikler! Danışmanlık Süreciniz Tamamlandı</h4>
                    <p>Proje ihtiyaçlarınızı başarıyla analiz ettik. Aşağıda size özel hazırladığımız detaylı değerlendirmeyi inceleyebilirsiniz.</p>
                    <p><strong>Sonraki Adımlar:</strong> Proje brief'inizi indirerek saklayabilir veya hemen bizimle iletişime geçerek teklifinizi alabilirsiniz.</p>
                </div>
            </div>
        `;
        
        summaryContainer.innerHTML = infoMessage + summary;

        // Add download functionality
        document.getElementById('btnDownloadBriefPro').addEventListener('click', downloadBrief);
        document.getElementById('btnContactPro').addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Sonuçlar bölümüne yumuşak kaydır
        setTimeout(() => {
            consultationResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    function generateSummary() {
        let html = '';
        
        const sections = [
            { title: 'Proje Amacı', icon: 'fa-rocket', key: 0 },
            { title: 'Hedef Kitle', icon: 'fa-users', key: 1 },
            { title: 'Tasarım Stili', icon: 'fa-paint-brush', key: 2 },
            { title: 'Özellikler', icon: 'fa-cog', key: 3 },
            { title: 'Bütçe', icon: 'fa-money-bill-wave', key: 4 },
            { title: 'Zaman Planı', icon: 'fa-clock', key: 5 },
            { title: 'İçerik Durumu', icon: 'fa-file-alt', key: 6 },
            { title: 'SEO Önceliği', icon: 'fa-search', key: 7 },
            { title: 'Mobil Uyumluluk', icon: 'fa-mobile-alt', key: 8 }
        ];

        sections.forEach(section => {
            const answer = questions[section.key].answers?.find(a => a.value === answers[section.key]);
            if (answer) {
                html += `
                    <div class="result-section">
                        <h4><i class="fas ${section.icon}"></i> ${section.title}</h4>
                        <p><strong>${answer.title}:</strong> ${answer.desc}</p>
                    </div>
                `;
            }
        });

        return html;
    }

    function downloadBrief() {
        let briefText = 'PROJE DANIŞMANLIK ANALİZİ\\n\\n';
        briefText += `İletişim Bilgileri:\\n`;
        briefText += `Ad Soyad: ${answers.name || '-'}\\n`;
        briefText += `E-posta: ${answers.email || '-'}\\n`;
        briefText += `Telefon: ${answers.phone || '-'}\\n`;
        briefText += `Şirket: ${answers.company || '-'}\\n\\n`;

        questions.forEach((q, i) => {
            if (q.type === 'choice') {
                const answer = q.answers.find(a => a.value === answers[i]);
                if (answer) {
                    briefText += `${q.category}: ${answer.title}\\n`;
                }
            }
        });

        const blob = new Blob([briefText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'proje-brief.txt';
        a.click();
    }
})();

// ==========================
// Instagram Link Animations
// ==========================
(function() {
    // Hero Instagram Link Animation
    const instagramLink = document.querySelector('.instagram-link');
    if (instagramLink) {
        // Particle effect on hover
        instagramLink.addEventListener('mouseenter', function() {
            createInstagramParticles(this);
        });

        // Click analytics
        instagramLink.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': 'Instagram Hero Link'
                });
            }
        });
    }

    // Contact Instagram Enhanced
    const contactInstagram = document.querySelector('.social-icon--instagram');
    if (contactInstagram) {
        contactInstagram.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': 'Instagram Contact Link'
                });
            }
        });

        // Pulse animation on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'pulse 0.6s ease-in-out';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 600);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(contactInstagram);
    }

    // Footer Instagram
    const footerInstagram = document.querySelector('.footer-instagram');
    if (footerInstagram) {
        footerInstagram.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'Social',
                    'event_label': 'Instagram Footer Link'
                });
            }
        });
    }

    // Create particle effect
    function createInstagramParticles(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 2 + Math.random() * 2;
            const tx = Math.cos(angle) * velocity * 30;
            const ty = Math.sin(angle) * velocity * 30;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    // Add pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
})();