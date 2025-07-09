// Because You Won't™ - Interactive JavaScript
// Professional delivery service with maximum attitude and minimal patience

// =============================================================================
// MAIN INITIALIZATION - Consolidated DOMContentLoaded Handler
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeEverything();
    } catch (error) {
        console.error('Failed to initialize application:', error);
        // Fallback: ensure critical functionality still works
        initializeBasicNavigation();
    }
});

// Single initialization function that handles all setup
function initializeEverything() {
    showRandomLoadingMessage();
    
    // Core functionality initialization
    initializeNavigation();
    initializeScrollEffects();
    initializeFormValidation();
    initializeAnimations();
    
    // Enhanced UX features
    initializeFloatingActions();
    initializePricingTabs();
    initializeCollapsibleFAQ();
    initializeCollapsibleRules();
    initializeScrollProgress();
    initializeBackToTop();
    
    // Enhanced features
    initializeAccessibility();
    initializeLazyLoading();
    initializeTooltipSystem();
    initializePersonalityCardEffects();
    initializeServiceWorker();
    
    // Override validation with personality
    enhanceValidationWithPersonality();
    
    console.log("🚚 Because You Won't™ Delivery Service fully loaded and optimized");
    console.log("💡 Pro tip: Maybe try doing it yourself next time? (Just kidding, we both know you won't)");
    console.log("🎯 Found the console? You're already more tech-savvy than 90% of my clients");
    console.log("🎨 New UX improvements: Floating buttons, tabbed pricing, collapsible FAQ, and more!");
}

// =============================================================================
// NAVIGATION FUNCTIONALITY
// =============================================================================

function initializeNavigation() {
    try {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        // Mobile menu toggle
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', function(e) {
                e.preventDefault();
                navLinks.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                mobileToggle.setAttribute('aria-expanded',
                    navLinks.classList.contains('active') ? 'true' : 'false');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close mobile menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Smooth scrolling for navigation links
        const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
        navItems.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (mobileToggle) mobileToggle.classList.remove('active');
                    }
                }
            });
        });
        
        // Active navigation highlighting
        window.addEventListener('scroll', highlightActiveNavItem);
    } catch (error) {
        console.error('Navigation initialization failed:', error);
        initializeBasicNavigation();
    }
}

// Fallback navigation for error cases
function initializeBasicNavigation() {
    try {
        const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
        navItems.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    } catch (error) {
        console.error('Even basic navigation failed. This is embarrassing.', error);
    }
}

// Highlight active navigation item based on scroll position
function highlightActiveNavItem() {
    try {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Navigation highlighting failed:', error);
    }
}

// =============================================================================
// SCROLL EFFECTS AND ANIMATIONS
// =============================================================================


// =============================================================================
// FORM VALIDATION AND HANDLING
// =============================================================================

function initializeFormValidation() {
    try {
        const formButton = document.querySelector('.btn[href*="formspree"]');
        
        if (formButton) {
            formButton.addEventListener('click', function(e) {
                try {
                    // Show confirmation modal before opening form
                    const confirmation = confirm(
                        "You're about to open my job submission form. Make sure you have all the required information ready (unlike last time):\n\n" +
                        "• Your Minecraft IGN (not your real name, genius)\n" +
                        "• Pickup and drop-off coordinates (actual coordinates, not 'near the big tree')\n" +
                        "• Detailed description of items (be specific, I'm not psychic)\n" +
                        "• Payment offer (lowball offers will be publicly mocked)\n\n" +
                        "Ready to proceed, or do you need more time to procrastinate?"
                    );
                    
                    if (!confirmation) {
                        e.preventDefault();
                        return false;
                    }
                    
                    // Track form opening (if analytics were implemented)
                    trackEvent('form_opened', 'job_submission');
                } catch (error) {
                    console.error('Form button click handler failed:', error);
                }
            });
        }
        
        // Add form validation for any contact forms on the page
        const contactForms = document.querySelectorAll('form');
        contactForms.forEach(form => {
            form.addEventListener('submit', validateContactForm);
        });
        
        // Handle the sarcastic email option
        const contactPreference = document.getElementById('contact-preference');
        if (contactPreference) {
            contactPreference.addEventListener('change', function() {
                if (this.value === 'email') {
                    alert('Nice try! Email option is just there to mess with you. Pick Discord or in-game messaging like a civilized person.\n\n(Did you really think I\'d give out my email to random Minecraft players? The audacity! 😂)');
                    this.value = ''; // Reset selection
                }
            });
            
            // Add visual feedback when hovering over disabled email option
            contactPreference.addEventListener('mouseover', function(e) {
                if (e.target.tagName === 'OPTION' && e.target.disabled) {
                    console.log('Email hovering detected - nice try though! 📧🚫');
                }
            });
        }
        
        // Add pricing tooltip functionality
        initializePricingTooltip();
        
    } catch (error) {
        console.error('Form validation initialization failed:', error);
    }
}

// Contact form validation
function validateContactForm(e) {
    try {
        const form = e.target;
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        let errors = [];
        
        requiredFields.forEach(field => {
            try {
                if (!field.value.trim()) {
                    isValid = false;
                    errors.push(`${field.name || field.placeholder || 'This field'} is required`);
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        errors.push('Please enter a valid email address');
                        field.classList.add('error');
                    }
                }
            } catch (fieldError) {
                console.error('Field validation failed:', field, fieldError);
                isValid = false;
                errors.push('A field validation error occurred');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showValidationErrors(errors);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Form validation failed:', error);
        e.preventDefault();
        alert('Form validation encountered an error. Please try again.');
        return false;
    }
}

// Show validation errors (will be enhanced with personality later)
function showValidationErrors(errors) {
    alert('Please fix the following errors:\n\n• ' + errors.join('\n• '));
}

// =============================================================================
// ANIMATIONS AND INTERACTIVE ELEMENTS
// =============================================================================

function initializeAnimations() {
    try {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.about-card, .rule-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                try {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                } catch (error) {
                    console.error('Card hover effect failed:', error);
                }
            });
            
            card.addEventListener('mouseleave', function() {
                try {
                    this.style.transform = 'translateY(0) scale(1)';
                } catch (error) {
                    console.error('Card hover reset failed:', error);
                }
            });
        });
        
        // Button click effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                try {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        background-color: rgba(255, 255, 255, 0.7);
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        pointer-events: none;
                        z-index: 0;
                    `;
                    
                    // Ensure button can contain ripple effect
                    if (!this.style.position || this.style.position === 'static') {
                        this.style.position = 'relative';
                    }
                    this.style.overflow = 'hidden';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        try {
                            if (ripple.parentNode) {
                                ripple.remove();
                            }
                        } catch (removeError) {
                            console.error('Ripple cleanup failed:', removeError);
                        }
                    }, 600);
                } catch (error) {
                    console.error('Button ripple effect failed:', error);
                }
            });
        });
        
        // Easter egg - Konami code
        initializeKonamiCode();
        
    } catch (error) {
        console.error('Animations initialization failed:', error);
    }
}

// Konami Code Easter Egg
function initializeKonamiCode() {
    try {
        let konamiCode = '';
        const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
        const maxLen = 20; // Slightly more than 10 keys, since some codes are longer strings

        document.addEventListener('keydown', function(e) {
            try {
                konamiCode += e.code;

                // If not a prefix, trim to last N chars (length of sequence)
                if (konamiSequence.indexOf(konamiCode) !== 0) {
                    // Keep only the last N characters (N = konamiSequence.length)
                    konamiCode = konamiCode.slice(-konamiSequence.length);
                }

                if (konamiCode === konamiSequence) {
                    activateEasterEgg();
                    konamiCode = '';
                }
            } catch (error) {
                console.error('Konami code detection failed:', error);
                konamiCode = '';
            }
        });
    } catch (error) {
        console.error('Konami code initialization failed:', error);
    }
}

// Easter egg activation
function activateEasterEgg() {
    try {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.animation = 'rainbow 2s linear infinite';
            
            // Add rainbow animation CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { color: #ff0000; }
                    16.66% { color: #ff8000; }
                    33.33% { color: #ffff00; }
                    50% { color: #00ff00; }
                    66.66% { color: #0080ff; }
                    83.33% { color: #8000ff; }
                    100% { color: #ff0000; }
                }
            `;
            document.head.appendChild(style);
            
            alert("🎉 Easter Egg Activated! 🎉\n\nYou found my secret! Here's a special discount code: KONAMI2025\n\nMention this code for 10% off your first delivery!\n\n(Because you actually took the time to find this, unlike moving your own items. I respect that level of dedication to avoiding actual work 😏)");
            
            setTimeout(() => {
                try {
                    heroTitle.style.animation = '';
                    if (style.parentNode) {
                        style.remove();
                    }
                } catch (cleanupError) {
                    console.error('Easter egg cleanup failed:', cleanupError);
                }
            }, 10000);
        }
    } catch (error) {
        console.error('Easter egg activation failed:', error);
    }
}

// =============================================================================
// ENHANCED TOOLTIP SYSTEM WITH DATA ATTRIBUTES
// =============================================================================

function initializeTooltipSystem() {
    try {
        // Enhanced tooltip system using data-tooltip attributes
        const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
        
        elementsWithTooltips.forEach(element => {
            try {
                const tooltipText = element.getAttribute('data-tooltip');
                if (tooltipText && !element.title) {
                    element.title = tooltipText;
                }
            } catch (error) {
                console.error('Tooltip setup failed for element:', element, error);
            }
        });
        
        // Fallback: Add personality tooltips to elements without data-tooltip
        addFallbackTooltips();
        
    } catch (error) {
        console.error('Tooltip system initialization failed:', error);
        // Even the enhanced tooltips failed - just log it and move on
        console.log('Tooltips unavailable. Hover for disappointment instead.');
    }
}

// Fallback tooltips for backwards compatibility
function addFallbackTooltips() {
    try {
        const tooltipMappings = {
            '.hero-title': 'Yes, this is really my business name. Deal with it.',
            '.logo-text': 'Trademark pending. Patent on sarcasm still processing.',
            '.about-card:not([data-tooltip])': 'Hover for existential dread about your productivity',
            '.rule-card:not([data-tooltip])': 'Things I refuse to do (unlike your to-do list)',
            '.faq-item:not([data-tooltip])': 'Questions I answer with barely concealed frustration',
            '.contact-method:not([data-tooltip])': 'Ways to reach me when you inevitably need help'
        };
        
        Object.entries(tooltipMappings).forEach(([selector, message]) => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (!element.title && !element.getAttribute('data-tooltip')) {
                        element.title = message;
                    }
                });
            } catch (error) {
                console.warn(`Failed to add fallback tooltip for ${selector}:`, error);
            }
        });
    } catch (error) {
        console.error('Fallback tooltips failed:', error);
    }
}

// Legacy tooltip system removed - enhanced system handles all cases
// (Because supporting IE6 out of guilt is where I draw the line)

// =============================================================================
// ENHANCED LAZY LOADING WITH ERROR HANDLING
// =============================================================================

function initializeLazyLoading() {
    try {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) {
            console.log('No lazy-loaded images found. That\'s fine, I guess.');
            return;
        }
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const dataSrc = img.dataset.src;
                        
                        // Check for missing data-src attribute
                        if (!dataSrc) {
                            console.warn('Lazy loading failed: missing data-src attribute on image:', img);
                            img.alt = 'Image loading failed (missing source)';
                            observer.unobserve(img);
                            return;
                        }
                        
                        // Add error handling for image loading
                        img.addEventListener('load', function() {
                            this.classList.remove('lazy');
                            console.log('Image loaded successfully:', dataSrc);
                        });
                        
                        img.addEventListener('error', function() {
                            console.error('Failed to load image:', dataSrc);
                            this.alt = 'Image failed to load';
                            this.classList.add('error');
                        });
                        
                        img.src = dataSrc;
                        observer.unobserve(img);
                    }
                } catch (error) {
                    console.error('Lazy loading failed for image:', entry.target, error);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => {
            try {
                imageObserver.observe(img);
            } catch (error) {
                console.error('Failed to observe image for lazy loading:', img, error);
            }
        });
        
    } catch (error) {
        console.error('Lazy loading initialization failed:', error);
        // Fallback: load all images immediately
        loadAllImagesImmediately();
    }
}

// Fallback: Load all images immediately if lazy loading fails
function loadAllImagesImmediately() {
    try {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            try {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
            } catch (error) {
                console.error('Failed to load image immediately:', img, error);
            }
        });
        console.log('Fallback: All images loaded immediately');
    } catch (error) {
        console.error('Even immediate image loading failed:', error);
    }
}

// =============================================================================
// ENHANCED SERVICE WORKER WITH CACHE STRATEGY
// =============================================================================

function initializeServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported. Welcome to the stone age.');
        return;
    }
    
    try {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('./sw.js', {
                scope: './'
            })
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope:', registration.scope);
                
                // Handle updates
                registration.addEventListener('updatefound', function() {
                    const newWorker = registration.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdatePrompt();
                            }
                        });
                    }
                });
                
                // Check for waiting service worker
                if (registration.waiting) {
                    showUpdatePrompt();
                }
            })
            .catch(function(err) {
                console.warn('ServiceWorker registration failed:', err);
                console.log('PWA features will be unavailable, but the site will still work.');
            });
            
            // Listen for service worker messages
            navigator.serviceWorker.addEventListener('message', function(event) {
                try {
                    if (event.data && event.data.type === 'CACHE_UPDATED') {
                        console.log('Cache updated:', event.data.url);
                    }
                } catch (error) {
                    console.error('Service worker message handling failed:', error);
                }
            });
            
        });
    } catch (error) {
        console.error('Service worker initialization failed:', error);
    }
}

// Show update prompt for PWA
function showUpdatePrompt() {
    try {
        const updateMessage = "A new version is available! Would you like to update?\n\n" +
                            "(Because staying up-to-date is apparently harder than moving your own items)";
        
        if (confirm(updateMessage)) {
            // Send message to service worker to skip waiting
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
            }
            
            // Reload the page
            window.location.reload();
        }
    } catch (error) {
        console.error('Update prompt failed:', error);
    }
}

// =============================================================================
// ACCESSIBILITY IMPROVEMENTS
// =============================================================================

function initializeAccessibility() {
    try {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Keyboard navigation for cards
        const interactiveCards = document.querySelectorAll('.about-card, .rule-card');
        interactiveCards.forEach(card => {
            try {
                card.setAttribute('tabindex', '0');
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            } catch (error) {
                console.error('Keyboard navigation setup failed for card:', card, error);
            }
        });
        
    } catch (error) {
        console.error('Accessibility initialization failed:', error);
    }
}

// =============================================================================
// PERSONALITY FEATURES
// =============================================================================

// Enhanced card interactions with personality
function initializePersonalityCardEffects() {
    try {
        const aboutCards = document.querySelectorAll('.about-card');
        const ruleCards = document.querySelectorAll('.rule-card');
        const faqItems = document.querySelectorAll('.faq-item');
        
        // About cards get encouraging(ish) messages
        aboutCards.forEach((card, index) => {
            try {
                const messages = [
                    "This is what I do. You're welcome.",
                    "Professional transportation (with attitude included)",
                    "Fast delivery (when I feel like it)",
                    "Insurance available (trust issues extra)"
                ];
                
                card.addEventListener('mouseenter', function() {
                    if (!this.dataset.originalTitle) {
                        this.dataset.originalTitle = this.title || '';
                    }
                    this.title = messages[index] || "I move stuff. You pay me. Simple.";
                });
                
                card.addEventListener('mouseleave', function() {
                    this.title = this.dataset.originalTitle || '';
                });
            } catch (error) {
                console.error('About card personality setup failed:', card, error);
            }
        });
        
        // Rule cards get extra snarky
        ruleCards.forEach(card => {
            try {
                card.addEventListener('mouseenter', function() {
                    this.style.cursor = 'not-allowed';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.cursor = 'pointer';
                });
            } catch (error) {
                console.error('Rule card personality setup failed:', card, error);
            }
        });
        
        // FAQ items get meta commentary
        faqItems.forEach((item, index) => {
            try {
                const metaComments = [
                    "Asked daily by people who clearly don't read",
                    "The answer is always 'pay me more'",
                    "Basic geography is apparently optional",
                    "Friendship doesn't pay for enchanted gear",
                    "Years of customer service made me this way",
                    "That's what insurance is for, genius",
                    "Do I look like Bob the Builder?",
                    "98% success rate, 100% attitude guaranteed"
                ];
                
                item.addEventListener('click', function() {
                    if (metaComments[index]) {
                        console.log(`Meta commentary: ${metaComments[index]}`);
                    }
                });
            } catch (error) {
                console.error('FAQ personality setup failed:', item, error);
            }
        });
        
    } catch (error) {
        console.error('Personality card effects initialization failed:', error);
    }
}

// Add personality to form validation errors
function showPersonalityValidationErrors(errors) {
    try {
        const snarkMessages = [
            "Well, this is embarrassing for you:",
            "Did you even try to fill this out correctly?",
            "I can't work with this level of incompetence:",
            "Let me guess, you also need help with basic reading comprehension:"
        ];
        
        const randomSnark = snarkMessages[Math.floor(Math.random() * snarkMessages.length)];
        alert(randomSnark + '\n\n• ' + errors.join('\n• ') + '\n\nTry again, but better this time.');
    } catch (error) {
        console.error('Personality validation messages failed:', error);
        // Fallback to basic validation
        showValidationErrors(errors);
    }
}

// Enhance validation with personality
function enhanceValidationWithPersonality() {
    try {
        // Override the original validation function with personality
        window.showValidationErrors = showPersonalityValidationErrors;
    } catch (error) {
        console.error('Failed to enhance validation with personality:', error);
    }
}

// Random sarcastic loading messages
function showRandomLoadingMessage() {
    try {
        const messages = [
            "Loading... unlike your motivation to do this yourself",
            "Please wait... like you've been waiting to move those items",
            "Loading faster than your productivity levels",
            "Initializing attitude... complete",
            "Loading professional judgment systems..."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        console.log(randomMessage);
    } catch (error) {
        console.error('Random loading message failed:', error);
        console.log("Loading... (the sarcasm generator is broken, how ironic)");
    }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Utility function for event tracking (placeholder for analytics)
function trackEvent(action, category, label = '') {
    try {
        // This would integrate with analytics services like Google Analytics
        console.log(`Event tracked: ${action} | ${category} | ${label}`);
        
        // Example Google Analytics gtag implementation:
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', action, {
        //         event_category: category,
        //         event_label: label
        //     });
        // }
    } catch (error) {
        console.error('Event tracking failed:', error);
    }
}

// Dark mode toggle (bonus feature) - Currently disabled for light theme
function initializeDarkMode() {
    // Dark mode functionality removed to maintain light theme consistency
    // This function is preserved for potential future dark mode implementation
    console.log('Dark mode toggle disabled - light theme active');
}

// =============================================================================
// EXPORT FUNCTIONS FOR TESTING
// =============================================================================

// =============================================================================
// PRICING TOOLTIP FUNCTIONALITY
// =============================================================================

function initializePricingTooltip() {
    try {
        const pricingTrigger = document.querySelector('.pricing-tooltip-trigger');
        const pricingTooltip = document.querySelector('.pricing-tooltip');
        
        if (pricingTrigger && pricingTooltip) {
            // Enhanced hover functionality
            let isTooltipVisible = false;
            
            pricingTrigger.addEventListener('mouseenter', function() {
                isTooltipVisible = true;
                pricingTooltip.style.opacity = '1';
                pricingTooltip.style.visibility = 'visible';
                pricingTooltip.style.transform = 'translateY(0)';
                
                // Track tooltip usage
                trackEvent('pricing_tooltip_shown', 'form_interaction');
            });
            
            pricingTrigger.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!isTooltipVisible) {
                        pricingTooltip.style.opacity = '0';
                        pricingTooltip.style.visibility = 'hidden';
                        pricingTooltip.style.transform = 'translateY(-10px)';
                    }
                }, 200);
            });
            
            pricingTooltip.addEventListener('mouseenter', function() {
                isTooltipVisible = true;
            });
            
            pricingTooltip.addEventListener('mouseleave', function() {
                isTooltipVisible = false;
                setTimeout(() => {
                    if (!isTooltipVisible) {
                        pricingTooltip.style.opacity = '0';
                        pricingTooltip.style.visibility = 'hidden';
                        pricingTooltip.style.transform = 'translateY(-10px)';
                    }
                }, 200);
            });
            
            // Click functionality for mobile devices
            pricingTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = pricingTooltip.style.opacity === '1';
                
                if (isVisible) {
                    pricingTooltip.style.opacity = '0';
                    pricingTooltip.style.visibility = 'hidden';
                    pricingTooltip.style.transform = 'translateY(-10px)';
                } else {
                    pricingTooltip.style.opacity = '1';
                    pricingTooltip.style.visibility = 'visible';
                    pricingTooltip.style.transform = 'translateY(0)';
                }
                
                trackEvent('pricing_tooltip_clicked', 'form_interaction');
            });
            
            // Close tooltip when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (!pricingTrigger.contains(e.target) && !pricingTooltip.contains(e.target)) {
                    pricingTooltip.style.opacity = '0';
                    pricingTooltip.style.visibility = 'hidden';
                    pricingTooltip.style.transform = 'translateY(-10px)';
                    isTooltipVisible = false;
                }
            });
        }
    } catch (error) {
        console.error('Pricing tooltip initialization failed:', error);
    }
}

// =============================================================================
// FLOATING ACTION BUTTONS
// =============================================================================

function initializeFloatingActions() {
    try {
        const floatingButtons = document.querySelectorAll('.floating-btn');
        
        floatingButtons.forEach(button => {
            // Add click effects
            button.addEventListener('click', function(e) {
                if (!this.classList.contains('back-to-top')) {
                    // Smooth scroll to target section
                    const targetId = this.getAttribute('href')?.substring(1);
                    if (targetId) {
                        e.preventDefault();
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            const offsetTop = targetElement.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                            
                            // Add personality feedback
                            trackEvent('floating_button_clicked', 'navigation', targetId);
                        }
                    }
                }
            });
            
            // Enhanced hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
        
        console.log("🎯 Floating action buttons initialized - now you can be lazy AND efficient!");
    } catch (error) {
        console.error('Floating actions initialization failed:', error);
    }
}

// =============================================================================
// BACK TO TOP FUNCTIONALITY
// =============================================================================

function initializeBackToTop() {
    try {
        const backToTopBtn = document.querySelector('.back-to-top');
        
        if (backToTopBtn) {
            // Show/hide based on scroll position
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            // Smooth scroll to top
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Add personality feedback
                trackEvent('back_to_top_clicked', 'navigation');
                console.log("🔝 Back to top - because scrolling up is apparently too much work too!");
            });
        }
        
        console.log("⬆️ Back to top button ready for your scrolling laziness!");
    } catch (error) {
        console.error('Back to top initialization failed:', error);
    }
}

// =============================================================================
// SCROLL PROGRESS BAR
// =============================================================================

function initializeScrollProgress() {
    try {
        const progressBar = document.querySelector('.scroll-progress-bar');
        
        if (progressBar) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.scrollY;
                const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / documentHeight) * 100;
                
                progressBar.style.width = scrollPercent + '%';
            });
            
            console.log("📊 Scroll progress bar initialized - now you can see how much procrastination remains!");
        }
    } catch (error) {
        console.error('Scroll progress initialization failed:', error);
    }
}

// =============================================================================
// PRICING TABS FUNCTIONALITY
// =============================================================================

function initializePricingTabs() {
    try {
        const tabs = document.querySelectorAll('.pricing-tab');
        const contents = document.querySelectorAll('.pricing-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab + '-content');
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Track tab usage
                trackEvent('pricing_tab_clicked', 'navigation', targetTab);
                
                // Add personality feedback
                const messages = {
                    'standard': "Basic jobs - because apparently moving items is rocket science for you",
                    'premium': "Premium options - for when money > effort (as usual)",
                    'budget': "Poor person menu - creative solutions for the financially challenged"
                };
                
                console.log(`💰 ${messages[targetTab] || 'Tab switched'}`);
            });
        });
        
        console.log("📑 Pricing tabs initialized - now you can organize your financial inadequacy!");
    } catch (error) {
        console.error('Pricing tabs initialization failed:', error);
    }
}

// =============================================================================
// COLLAPSIBLE FAQ FUNCTIONALITY
// =============================================================================

function initializeCollapsibleFAQ() {
    try {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const header = item.querySelector('h3');
            const answer = item.querySelector('.faq-answer');

            if (header && answer) {
                // Set ARIA attributes and role
                header.setAttribute('role', 'button');
                header.setAttribute('aria-expanded', item.classList.contains('expanded') ? 'true' : 'false');
                header.setAttribute('tabindex', '0');
                header.style.cursor = 'pointer';

                header.addEventListener('click', function() {
                    const isExpanded = item.classList.contains('expanded');

                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('expanded');
                            const otherHeader = otherItem.querySelector('h3');
                            if (otherHeader) {
                                otherHeader.setAttribute('aria-expanded', 'false');
                            }
                        }
                    });

                    // Toggle current item
                    if (isExpanded) {
                        item.classList.remove('expanded');
                        header.setAttribute('aria-expanded', 'false');
                    } else {
                        item.classList.add('expanded');
                        header.setAttribute('aria-expanded', 'true');
                    }

                    // Track FAQ usage
                    const faqNumber = item.dataset.faq;
                    trackEvent('faq_clicked', 'interaction', faqNumber);

                    // Add personality feedback
                    const snarkMessages = [
                        "Another genius discovers the FAQ section exists",
                        "Reading instructions? Revolutionary concept!",
                        "FAQ expanded - because apparently context clues weren't enough",
                        "Let me spell it out for you since subtlety is lost",
                        "FAQ opened - welcome to basic comprehension 101"
                    ];

                    if (!isExpanded) {
                        const randomSnark = snarkMessages[Math.floor(Math.random() * snarkMessages.length)];
                        console.log(`❓ ${randomSnark}`);
                    }
                });

                // Add keyboard accessibility
                header.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            }
        });

        console.log("❓ Collapsible FAQ initialized - now you can expand your ignorance one question at a time!");
    } catch (error) {
        console.error('Collapsible FAQ initialization failed:', error);
    }
}

// =============================================================================
// COLLAPSIBLE RULES FUNCTIONALITY
// =============================================================================

function initializeCollapsibleRules() {
    try {
        const rulesToggle = document.querySelector('.rules-toggle');
        const rulesContent = document.querySelector('.rules-content');

        if (rulesToggle && rulesContent) {
            // Set ARIA and role attributes initially
            rulesToggle.setAttribute('role', 'button');
            rulesToggle.setAttribute('aria-expanded', rulesToggle.classList.contains('expanded') ? 'true' : 'false');
            rulesToggle.setAttribute('tabindex', '0');

            rulesToggle.addEventListener('click', function() {
                const isExpanded = this.classList.contains('expanded');

                if (isExpanded) {
                    this.classList.remove('expanded');
                    rulesContent.classList.remove('expanded');
                    this.setAttribute('aria-expanded', 'false');
                    this.textContent = 'Click to Expand Full Rules & Terms';
                    console.log("📋 Rules collapsed - ignorance is bliss, I suppose");
                } else {
                    this.classList.add('expanded');
                    rulesContent.classList.add('expanded');
                    this.setAttribute('aria-expanded', 'true');
                    this.textContent = 'Click to Collapse Rules & Terms';
                    console.log("📋 Rules expanded - welcome to reality, where I have standards");
                }

                // Add the arrow back
                this.textContent += this.classList.contains('expanded') ? ' ▲' : ' ▼';

                trackEvent('rules_toggled', 'interaction', isExpanded ? 'collapsed' : 'expanded');
            });

            // Keyboard accessibility
            rulesToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }

        console.log("🚫 Collapsible rules initialized - now you can ignore my terms in a more organized way!");
    } catch (error) {
        console.error('Collapsible rules initialization failed:', error);
    }
}

// =============================================================================
// ENHANCED SCROLL EFFECTS WITH OFFSET
// =============================================================================

function initializeScrollEffects() {
    try {
        // Update navbar scroll effect to be always fixed
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                try {
                    if (window.scrollY > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                } catch (error) {
                    console.error('Navbar scroll effect failed:', error);
                }
            });
        }
        
        // Update smooth scrolling to account for fixed navbar
        const updateSmoothScrolling = () => {
            const navItems = document.querySelectorAll('a[href^="#"]');
            navItems.forEach(link => {
                link.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        e.preventDefault();
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navLinks = document.querySelector('.nav-links');
                        const mobileToggle = document.querySelector('.mobile-menu-toggle');
                        if (navLinks && navLinks.classList.contains('active')) {
                            navLinks.classList.remove('active');
                            if (mobileToggle) mobileToggle.classList.remove('active');
                        }
                    }
                });
            });
        };
        
        updateSmoothScrolling();
        
        // Parallax effect for hero section (reduced for performance)
        const hero = document.querySelector('.hero');
        if (hero) {
            let ticking = false;
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(function() {
                        try {
                            const scrolled = window.scrollY;
                            const rate = scrolled * -0.3; // Reduced parallax effect
                            hero.style.transform = `translateY(${rate}px)`;
                        } catch (error) {
                            console.error('Parallax effect failed:', error);
                        }
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                try {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                } catch (error) {
                    console.error('Animation observer failed for element:', entry.target, error);
                }
            });
        }, observerOptions);
        
        // Observe elements for animations
        const animateElements = document.querySelectorAll('.about-card, .rule-card, .contact-method');
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        console.log("🎬 Enhanced scroll effects initialized - now with 50% more smoothness!");
        
    } catch (error) {
        console.error('Scroll effects initialization failed:', error);
    }
}

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateContactForm,
        trackEvent,
        highlightActiveNavItem,
        initializeEverything,
        showPersonalityValidationErrors,
        initializePricingTooltip,
        initializeFloatingActions,
        initializeBackToTop,
        initializeScrollProgress,
        initializePricingTabs,
        initializeCollapsibleFAQ,
        initializeCollapsibleRules
    };
}