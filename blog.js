// ==========================================
// BLOG PAGE JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the blog page
    if (!document.querySelector('.blog-hero')) {
        return; // Exit if not on blog page
    }

    initBlogFunctionality();
});

function initBlogFunctionality() {
    // Category filtering
    initCategoryFilter();
    
    // Blog search
    initBlogSearch();
    
    // Newsletter form
    initNewsletter();
    
    // Pagination
    initPagination();
    
    // Scroll animations
    initScrollAnimations();
    
    console.log('📝 Blog page initialized!');
}

// Category Filter
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!categoryButtons.length || !blogCards.length) return;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            // Track category filter in analytics
            if (typeof Analytics !== 'undefined') {
                Analytics.trackBlogFilter(category);
            }
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            console.log(`🏷️ Filtered by category: ${category}`);
        });
    });
}

// Blog Search
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    const searchBtn = document.querySelector('.blog-search-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!searchInput || !searchBtn) return;
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value, blogCards);
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value, blogCards);
        }
    });
    
    // Real-time search (debounced)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value, blogCards);
        }, 500);
    });
}

function performSearch(query, blogCards) {
    const lowerQuery = query.toLowerCase().trim();
    
    // Track search query in analytics
    if (lowerQuery !== '' && typeof Analytics !== 'undefined') {
        Analytics.trackBlogSearch(lowerQuery);
    }
    
    if (lowerQuery === '') {
        // Show all cards if search is empty
        blogCards.forEach(card => {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }
    
    let foundCount = 0;
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = title.includes(lowerQuery) || 
                            description.includes(lowerQuery) || 
                            tags.some(tag => tag.includes(lowerQuery));
        
        if (matchesSearch) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 10);
            foundCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    console.log(`🔍 Search: "${query}" - Found ${foundCount} results`);
    
    // Show notification if no results
    if (foundCount === 0) {
        showNotification(`"${query}" için sonuç bulunamadı`, 'info');
    }
}

// Newsletter Subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!isValidEmail(email)) {
            showNotification('Lütfen geçerli bir email adresi girin', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Gönderiliyor...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Track newsletter signup in analytics
            if (typeof Analytics !== 'undefined') {
                Analytics.trackNewsletterSignup(email);
            }
            
            showNotification('✅ Newsletter aboneliği başarılı! Teşekkürler.', 'success');
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
        
        console.log(`📧 Newsletter subscription: ${email}`);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Pagination
function initPagination() {
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn:first-child');
    const nextBtn = document.querySelector('.pagination-btn:last-child');
    
    if (!paginationNumbers.length) return;
    
    paginationNumbers.forEach(pageBtn => {
        pageBtn.addEventListener('click', () => {
            // Remove active class from all
            paginationNumbers.forEach(btn => btn.classList.remove('active'));
            
            // Add active to clicked
            pageBtn.classList.add('active');
            
            // Scroll to top of blog content
            const blogContent = document.querySelector('.blog-content');
            if (blogContent) {
                blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            console.log(`📄 Page ${pageBtn.textContent} selected`);
        });
    });
    
    // Next/Prev buttons (placeholder functionality)
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination-number.active');
            const nextPage = activePage?.nextElementSibling;
            if (nextPage && nextPage.classList.contains('pagination-number')) {
                nextPage.click();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activePage = document.querySelector('.pagination-number.active');
            const prevPage = activePage?.previousElementSibling;
            if (prevPage && prevPage.classList.contains('pagination-number')) {
                prevPage.click();
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    const sidebarCards = document.querySelectorAll('.sidebar-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe blog cards
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe sidebar cards
    sidebarCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
}

// Notification System (reusing from main site)
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

// Mobile Menu (inherited from main site)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

console.log('✨ Blog page fully loaded and interactive!');
