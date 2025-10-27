/**
 * Analytics & Tracking Utilities
 * Centralized event tracking for Google Analytics, Facebook Pixel, and custom events
 */

// Analytics Helper Functions
const Analytics = {
    // Google Analytics Event Tracking
    trackEvent: function(category, action, label, value) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
        console.log(`GA Event: ${category} - ${action} - ${label}`);
    },

    // Facebook Pixel Event Tracking
    trackFBEvent: function(eventName, params = {}) {
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, params);
        }
        console.log(`FB Pixel: ${eventName}`, params);
    },

    // Portfolio Project Click Tracking
    trackPortfolioClick: function(projectName, projectCategory) {
        this.trackEvent('Portfolio', 'click', projectName, 1);
        this.trackFBEvent('ViewContent', {
            content_name: projectName,
            content_category: projectCategory,
            content_type: 'portfolio'
        });
    },

    // Blog Post Read Tracking
    trackBlogRead: function(blogTitle, readDuration) {
        this.trackEvent('Blog', 'read', blogTitle, readDuration);
        this.trackFBEvent('ViewContent', {
            content_name: blogTitle,
            content_category: 'blog',
            content_type: 'article'
        });
    },

    // Blog Category Filter Tracking
    trackBlogFilter: function(category) {
        this.trackEvent('Blog', 'filter', category, 1);
    },

    // Blog Search Tracking
    trackBlogSearch: function(searchQuery) {
        this.trackEvent('Blog', 'search', searchQuery, 1);
    },

    // Newsletter Signup Tracking
    trackNewsletterSignup: function(email) {
        this.trackEvent('Engagement', 'newsletter_signup', 'blog_sidebar', 1);
        this.trackFBEvent('Lead', {
            content_name: 'Newsletter Signup',
            content_category: 'email_subscription'
        });
        
        // Google Analytics conversion event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'G-XXXXXXXXXX/newsletter_signup'
            });
        }
    },

    // Consultation Form Start Tracking
    trackConsultationStart: function() {
        this.trackEvent('Consultation', 'form_start', 'consultation_questionnaire', 1);
        this.trackFBEvent('InitiateCheckout', {
            content_name: 'Consultation Form',
            content_category: 'lead_generation'
        });
    },

    // Consultation Form Progress Tracking
    trackConsultationProgress: function(stepNumber, stepName) {
        this.trackEvent('Consultation', 'form_progress', `step_${stepNumber}_${stepName}`, stepNumber);
    },

    // Consultation Form Complete Tracking
    trackConsultationComplete: function(projectType, budget) {
        this.trackEvent('Consultation', 'form_complete', projectType, 1);
        this.trackFBEvent('Lead', {
            content_name: 'Consultation Complete',
            content_category: 'qualified_lead',
            value: budget || 0,
            currency: 'TRY'
        });
        
        // Google Analytics conversion event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'G-XXXXXXXXXX/consultation_complete',
                'value': budget || 0,
                'currency': 'TRY'
            });
        }
    },

    // Contact Form Submission Tracking
    trackContactForm: function(formType) {
        this.trackEvent('Contact', 'form_submit', formType, 1);
        this.trackFBEvent('Contact', {
            content_name: 'Contact Form',
            content_category: 'lead'
        });
    },

    // Download Tracking (Brief PDF)
    trackDownload: function(fileName) {
        this.trackEvent('Download', 'click', fileName, 1);
    },

    // Scroll Depth Tracking
    trackScrollDepth: function(percentage) {
        this.trackEvent('Engagement', 'scroll_depth', `${percentage}%`, percentage);
    },

    // Time on Page Tracking
    trackTimeOnPage: function(seconds) {
        this.trackEvent('Engagement', 'time_on_page', window.location.pathname, seconds);
    },

    // External Link Click Tracking
    trackExternalLink: function(url, linkText) {
        this.trackEvent('Navigation', 'external_link', url, 1);
    },

    // CTA Button Click Tracking
    trackCTAClick: function(buttonText, location) {
        this.trackEvent('CTA', 'click', `${buttonText} - ${location}`, 1);
    },

    // Social Media Click Tracking
    trackSocialClick: function(platform) {
        this.trackEvent('Social', 'click', platform, 1);
    },

    // Video Play Tracking (if videos added)
    trackVideoPlay: function(videoTitle) {
        this.trackEvent('Video', 'play', videoTitle, 1);
    },

    // Error Tracking
    trackError: function(errorMessage, errorLocation) {
        this.trackEvent('Error', 'javascript_error', `${errorLocation}: ${errorMessage}`, 1);
    }
};

// Automatic Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    
    // Track Portfolio Project Clicks
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectName = this.querySelector('h3, .project-title')?.textContent || 'Unknown Project';
            const projectCategory = this.dataset.category || 'uncategorized';
            Analytics.trackPortfolioClick(projectName, projectCategory);
        });
    });

    // Track Blog Post Clicks
    const blogLinks = document.querySelectorAll('.blog-card a, .blog-post-link');
    blogLinks.forEach(link => {
        link.addEventListener('click', function() {
            const blogTitle = this.querySelector('h3, .blog-title')?.textContent || this.textContent;
            Analytics.trackBlogRead(blogTitle, 0);
        });
    });

    // Track CTA Button Clicks
    const ctaButtons = document.querySelectorAll('.cta, .cta-button, [data-track="cta"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const location = this.closest('section')?.id || 'unknown';
            Analytics.trackCTAClick(buttonText, location);
        });
    });

    // Track External Links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="webtelligence.com"])');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            Analytics.trackExternalLink(this.href, this.textContent);
        });
    });

    // Track Social Media Links
    const socialLinks = document.querySelectorAll('.social-links a, [data-track="social"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.dataset.platform || this.href.match(/facebook|twitter|linkedin|instagram|github/i)?.[0] || 'unknown';
            Analytics.trackSocialClick(platform);
        });
    });

    // Scroll Depth Tracking
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                Analytics.trackScrollDepth(depth);
            }
        });
    });

    // Time on Page Tracking
    let timeOnPage = 0;
    const timeInterval = setInterval(() => {
        timeOnPage += 30; // Track every 30 seconds
        
        // Send milestone events
        if ([30, 60, 120, 300].includes(timeOnPage)) {
            Analytics.trackTimeOnPage(timeOnPage);
        }
    }, 30000);

    // Track time when user leaves
    window.addEventListener('beforeunload', function() {
        Analytics.trackTimeOnPage(timeOnPage);
        clearInterval(timeInterval);
    });

    // JavaScript Error Tracking
    window.addEventListener('error', function(event) {
        Analytics.trackError(event.message, event.filename);
    });

    // Track Form Abandonment (consultation form)
    const consultationForm = document.querySelector('#consultation-form, [data-form="consultation"]');
    if (consultationForm) {
        let formStarted = false;
        
        consultationForm.addEventListener('input', function() {
            if (!formStarted) {
                formStarted = true;
                Analytics.trackConsultationStart();
            }
        });
    }

    console.log('✅ Analytics tracking initialized');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}
