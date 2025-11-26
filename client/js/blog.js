// ==========================================
// BLOG PAGE JAVASCRIPT - ULTRA MODERN 2025
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the blog page
    if (!document.querySelector('.blog-hero')) {
        return; // Exit if not on blog page
    }

    initBlogFunctionality();
});

function initBlogFunctionality() {
    // Dark mode toggle
    initDarkMode();
    
    // Enhanced scroll animations
    initEnhancedScrollAnimations();
    
    // Category filtering
    initCategoryFilter();
    
    // Blog search
    initBlogSearch();
    
    // Newsletter form
    initNewsletter();
    
    // Pagination
    initPagination();
    
    // Skeleton loading simulation
    initSkeletonLoading();
    
    // Scroll effects
    initScrollEffects();
    
    // Favorites system
    initFavoritesSystem();
    
    // Reading progress tracker
    initReadingProgress();
    
    // Smart recommendations
    initSmartRecommendations();
    
    // Make blog cards fully clickable
    initClickableCards();
    
    console.log('✨ Blog page initialized with ultra-modern features!');
}

// ==========================================
// DARK MODE TOGGLE
// ==========================================
function initDarkMode() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create dark mode toggle button
    const darkModeToggle = createDarkModeToggle();
    document.body.appendChild(darkModeToggle);
    
    // Update toggle button icon
    updateDarkModeIcon(darkModeToggle, currentTheme);
    
    // Toggle event
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(darkModeToggle, newTheme);
        
        // Animate transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        console.log(`🌓 Theme switched to: ${newTheme}`);
    });
}

function createDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.setAttribute('aria-label', 'Toggle dark mode');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    return toggle;
}

function updateDarkModeIcon(toggle, theme) {
    const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    toggle.innerHTML = `<i class="fas ${icon}"></i>`;
}

// ==========================================
// ENHANCED SCROLL ANIMATIONS
// ==========================================
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    document.querySelectorAll('.blog-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe other animated elements
    document.querySelectorAll('.blog-sidebar-widget').forEach(widget => {
        observer.observe(widget);
    });
}

// ==========================================
// SKELETON LOADING SIMULATION
// ==========================================
function initSkeletonLoading() {
    // This simulates initial loading state
    // In production, this would be used during actual data fetching
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach((card, index) => {
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
        }, 100 * index);
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    const blogCategories = document.querySelector('.blog-categories');
    let lastScroll = 0;
    
    if (!blogCategories) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for glassmorphism effect
        if (currentScroll > 100) {
            blogCategories.classList.add('scrolled');
        } else {
            blogCategories.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
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

// ==========================================
// ENHANCED BLOG SEARCH WITH AUTOCOMPLETE
// ==========================================
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    const searchBtn = document.querySelector('.blog-search-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!searchInput || !searchBtn) return;
    
    // Create autocomplete container
    const autocompleteContainer = createAutocompleteContainer(searchInput);
    
    // Load search history
    const searchHistory = getSearchHistory();
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            saveToSearchHistory(query);
            performSearch(query, blogCards);
            hideAutocomplete(autocompleteContainer);
        }
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                saveToSearchHistory(query);
                performSearch(query, blogCards);
                hideAutocomplete(autocompleteContainer);
            }
        }
    });
    
    // Real-time search with autocomplete
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            searchTimeout = setTimeout(() => {
                performSearch(query, blogCards);
                showAutocomplete(searchInput, autocompleteContainer, query, blogCards);
            }, 300);
        } else if (query.length === 0) {
            performSearch('', blogCards);
            hideAutocomplete(autocompleteContainer);
        }
    });
    
    // Show search history on focus
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() === '' && searchHistory.length > 0) {
            showSearchHistory(autocompleteContainer, searchHistory, searchInput, blogCards);
        }
    });
    
    // Hide autocomplete on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocompleteContainer.contains(e.target)) {
            hideAutocomplete(autocompleteContainer);
        }
    });
}

function createAutocompleteContainer(searchInput) {
    const container = document.createElement('div');
    container.className = 'search-autocomplete';
    container.style.display = 'none';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(container);
    return container;
}

function showAutocomplete(searchInput, container, query, blogCards) {
    const suggestions = generateSuggestions(query, blogCards);
    
    if (suggestions.length === 0) {
        hideAutocomplete(container);
        return;
    }
    
    container.innerHTML = suggestions.map(suggestion => `
        <div class="autocomplete-item" data-suggestion="${suggestion}">
            <i class="fas fa-search"></i>
            <span>${highlightQuery(suggestion, query)}</span>
        </div>
    `).join('');
    
    container.style.display = 'block';
    
    // Add click handlers
    container.querySelectorAll('.autocomplete-item').forEach(item => {
        item.addEventListener('click', () => {
            const suggestion = item.dataset.suggestion;
            searchInput.value = suggestion;
            saveToSearchHistory(suggestion);
            performSearch(suggestion, blogCards);
            hideAutocomplete(container);
        });
    });
}

function showSearchHistory(container, history, searchInput, blogCards) {
    if (history.length === 0) return;
    
    container.innerHTML = `
        <div class="autocomplete-header">
            <span>Son Aramalar</span>
            <button class="clear-history" onclick="clearSearchHistory()">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        ${history.slice(0, 5).map(term => `
            <div class="autocomplete-item history-item" data-suggestion="${term}">
                <i class="fas fa-history"></i>
                <span>${term}</span>
            </div>
        `).join('')}
    `;
    
    container.style.display = 'block';
    
    container.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => {
            const term = item.dataset.suggestion;
            searchInput.value = term;
            performSearch(term, blogCards);
            hideAutocomplete(container);
        });
    });
}

function hideAutocomplete(container) {
    container.style.display = 'none';
}

function generateSuggestions(query, blogCards) {
    const suggestions = new Set();
    const lowerQuery = query.toLowerCase();
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const words = title.toLowerCase().split(' ');
        
        words.forEach(word => {
            if (word.includes(lowerQuery) && word.length > 2) {
                suggestions.add(word);
            }
        });
        
        if (title.toLowerCase().includes(lowerQuery)) {
            suggestions.add(title);
        }
    });
    
    return Array.from(suggestions).slice(0, 5);
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

function getSearchHistory() {
    const history = localStorage.getItem('blogSearchHistory');
    return history ? JSON.parse(history) : [];
}

function saveToSearchHistory(query) {
    let history = getSearchHistory();
    history = history.filter(item => item !== query);
    history.unshift(query);
    history = history.slice(0, 10);
    localStorage.setItem('blogSearchHistory', JSON.stringify(history));
}

function clearSearchHistory() {
    localStorage.removeItem('blogSearchHistory');
    const container = document.querySelector('.search-autocomplete');
    if (container) hideAutocomplete(container);
    console.log('🗑️ Search history cleared');
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

// ==========================================
// NOTIFICATION SYSTEM - MODERN TOAST
// ==========================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
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

// ==========================================
// FAVORITES & BOOKMARKS SYSTEM
// ==========================================
function initFavoritesSystem() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const link = card.querySelector('a')?.href || '';
        
        // Create favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.setAttribute('aria-label', 'Add to favorites');
        favoriteBtn.dataset.postId = btoa(link); // Use encoded link as ID
        
        // Check if already favorited
        if (isFavorited(link)) {
            favoriteBtn.classList.add('favorited');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        // Add button to card
        const cardImage = card.querySelector('.blog-card-image');
        if (cardImage) {
            cardImage.style.position = 'relative';
            cardImage.appendChild(favoriteBtn);
        }
        
        // Handle favorite toggle
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isFav = favoriteBtn.classList.toggle('favorited');
            
            if (isFav) {
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
                addToFavorites({ title, link, timestamp: Date.now() });
                showNotification('💖 Favorilere eklendi!', 'success');
            } else {
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
                removeFromFavorites(link);
                showNotification('Favorilerden kaldırıldı', 'info');
            }
        });
    });
}

function isFavorited(link) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.link === link);
}

function getFavorites() {
    const favorites = localStorage.getItem('blogFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

function addToFavorites(post) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.link !== post.link);
    favorites.unshift(post);
    localStorage.setItem('blogFavorites', JSON.stringify(favorites));
}

function removeFromFavorites(link) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.link !== link);
    localStorage.setItem('blogFavorites', JSON.stringify(favorites));
}

// ==========================================
// READING PROGRESS TRACKER
// ==========================================
function initReadingProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressFill.style.width = `${Math.min(progress, 100)}%`;
    });
    
    // Track reading time
    trackReadingTime();
}

function trackReadingTime() {
    let startTime = Date.now();
    let readingTime = 0;
    
    const updateReadingTime = () => {
        readingTime = Math.floor((Date.now() - startTime) / 1000);
        
        // Save to localStorage every 10 seconds
        if (readingTime % 10 === 0) {
            const currentPage = window.location.pathname;
            saveReadingHistory(currentPage, readingTime);
        }
    };
    
    setInterval(updateReadingTime, 1000);
    
    // Save on page unload
    window.addEventListener('beforeunload', () => {
        const currentPage = window.location.pathname;
        saveReadingHistory(currentPage, readingTime);
    });
}

function saveReadingHistory(page, time) {
    let history = getReadingHistory();
    const existingIndex = history.findIndex(item => item.page === page);
    
    if (existingIndex >= 0) {
        history[existingIndex].time += time;
        history[existingIndex].lastVisit = Date.now();
    } else {
        history.push({ page, time, lastVisit: Date.now() });
    }
    
    history = history.slice(0, 50); // Keep last 50
    localStorage.setItem('blogReadingHistory', JSON.stringify(history));
}

function getReadingHistory() {
    const history = localStorage.getItem('blogReadingHistory');
    return history ? JSON.parse(history) : [];
}

// ==========================================
// SMART RECOMMENDATIONS
// ==========================================
function initSmartRecommendations() {
    const blogCards = document.querySelectorAll('.blog-card');
    const readingHistory = getReadingHistory();
    const favorites = getFavorites();
    
    // Calculate recommendation scores
    const recommendations = calculateRecommendations(blogCards, readingHistory, favorites);
    
    // Highlight recommended posts
    recommendations.slice(0, 3).forEach(rec => {
        const card = rec.element;
        const badge = document.createElement('div');
        badge.className = 'recommendation-badge';
        badge.innerHTML = '<i class="fas fa-star"></i> Önerilen';
        
        const cardContent = card.querySelector('.blog-card-content');
        if (cardContent) {
            cardContent.insertBefore(badge, cardContent.firstChild);
        }
    });
    
    console.log('🎯 Smart recommendations initialized');
}

function calculateRecommendations(blogCards, history, favorites) {
    const recommendations = [];
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent || '';
        const link = card.querySelector('a')?.href || '';
        const category = card.dataset.category || '';
        
        let score = 0;
        
        // Score based on category match with history
        const historicalCategories = history.map(h => h.category);
        if (historicalCategories.includes(category)) {
            score += 3;
        }
        
        // Score based on favorites
        if (favorites.some(fav => fav.link === link)) {
            score += 5;
        }
        
        // Score based on recency (newer posts get higher score)
        const cardIndex = Array.from(blogCards).indexOf(card);
        score += (blogCards.length - cardIndex) * 0.1;
        
        recommendations.push({ element: card, score, title, link });
    });
    
    return recommendations.sort((a, b) => b.score - a.score);
}

// ==========================================
// CLICKABLE BLOG CARDS
// ==========================================
function initClickableCards() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        // Find the main link in the card
        const mainLink = card.querySelector('.blog-read-more');
        
        if (!mainLink) return;
        
        const linkUrl = mainLink.getAttribute('href');
        
        // Make the entire card clickable
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on already clickable elements
            if (e.target.tagName === 'A' || 
                e.target.closest('a') || 
                e.target.tagName === 'BUTTON' ||
                e.target.closest('button') ||
                e.target.classList.contains('favorite-btn')) {
                return;
            }
            
            // Navigate to the blog post
            window.location.href = linkUrl;
        });
        
        // Add hover effect feedback
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    console.log(`✅ ${blogCards.length} blog cards made fully clickable`);
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
