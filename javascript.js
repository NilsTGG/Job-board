// Because You Won't™ - Enhanced JavaScript with Personality
// Professional procrastination services since... whenever I get around to it

console.log("🚀 Because You Won't™ delivery service loading...");
console.log("💎 Professional item transportation for the professionally lazy");

// =============================================================================
// INITIALIZATION & SETUP
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("📦 Initializing delivery service interface...");
    
    // Initialize all components
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializePricingTabs();
    initializeFormValidation();
    initializeRulesToggle();
    initializeEasterEgg();
    initializeAccessibility();
    initializeErrorHandling();
    
    console.log("✅ All systems loaded. Ready to judge your life choices.");
});

// =============================================================================
// NAVIGATION & MOBILE MENU
// =============================================================================

function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    if (!navbar) {
        console.warn("⚠️ Navbar not found - navigation may not work properly");
        return;
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Active section highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavigation);
    updateActiveNavigation(); // Initial call
}

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) {
        console.warn("⚠️ Mobile menu elements not found");
        return;
    }
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Update ARIA attributes
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
}

// =============================================================================
// SCROLL EFFECTS & BACK TO TOP
// =============================================================================

function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!navbar) {
        console.warn("⚠️ Navbar not found for scroll effects");
        return;
    }
    
    function handleScroll() {
        const scrolled = window.scrollY > 50;
        
        // Navbar scroll effect
        navbar.classList.toggle('scrolled', scrolled);
        
        // Back to top button
        if (backToTopBtn) {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        }
    }
    
    // Back to top functionality
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Throttled scroll handler for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    handleScroll(); // Initial call
}

// =============================================================================
// PRICING TABS SYSTEM
// =============================================================================

function initializePricingTabs() {
    const tabs = document.querySelectorAll('.pricing-tab');
    const contents = document.querySelectorAll('.pricing-content');
    
    if (tabs.length === 0 || contents.length === 0) {
        console.warn("⚠️ Pricing tabs not found");
        return;
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            contents.forEach(c => {
                c.classList.remove('active');
                c.setAttribute('hidden', '');
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.removeAttribute('hidden');
            }
        });
        
        // Keyboard navigation for tabs
        tab.addEventListener('keydown', function(e) {
            const currentIndex = Array.from(tabs).indexOf(this);
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    tabs[nextIndex].focus();
                    tabs[nextIndex].click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    tabs[nextIndex].focus();
                    tabs[nextIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabs[0].focus();
                    tabs[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    tabs[tabs.length - 1].focus();
                    tabs[tabs.length - 1].click();
                    break;
            }
        });
    });
}

// =============================================================================
// FORM VALIDATION WITH PERSONALITY
// =============================================================================

function initializeFormValidation() {
    const form = document.querySelector('.job-submission-form');
    
    if (!form) {
        console.warn("⚠️ Job submission form not found");
        return;
    }
    
    // Sarcastic validation messages
    const validationMessages = {
        'contact-name': [
            "Your Minecraft name. Not your real name. We're not that close.",
            "IGN stands for 'In-Game Name' - try to keep up.",
            "The name you use when you're pretending to be productive in Minecraft."
        ],
        'pickup-coords': [
            "X, Y, Z coordinates. Numbers. You know, like math but useful.",
            "If you write 'near the big tree' I'm dropping your stuff in lava.",
            "Coordinates are numbers, not vague descriptions of your base location."
        ],
        'dropoff-coords': [
            "Where you want your stuff. Be specific or it's going to the void.",
            "Destination coordinates. Try not to pick somewhere dangerous.",
            "The place where you want me to dump your procrastinated items."
        ],
        'items': [
            "What am I moving? Be specific. 'Stuff' is not a valid description.",
            "Describe your items like I'm not a mind reader (because I'm not).",
            "List what you need moved. Detailed descriptions prevent disappointment."
        ],
        'payment': [
            "What you're paying me. Diamonds preferred, exposure not accepted.",
            "Your payment offer. Remember: I have bills to pay and elytras to repair.",
            "How much you're willing to pay for not doing it yourself."
        ]
    };
    
    // Add validation to form fields
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const fieldName = field.getAttribute('name');
        
        field.addEventListener('blur', function() {
            validateField(this, fieldName);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this, fieldName);
            }
        });
    });
    
    function validateField(field, fieldName) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        // Basic required field validation
        if (!value) {
            isValid = false;
            const messages = validationMessages[fieldName];
            if (messages) {
                message = messages[Math.floor(Math.random() * messages.length)];
            } else {
                message = "This field is required. Try filling it out.";
            }
        }
        
        // Specific field validations
        if (value && fieldName === 'contact-name') {
            if (value.length < 3) {
                isValid = false;
                message = "Your IGN needs to be at least 3 characters. Even noobs have longer names.";
            }
        }
        
        if (value && (fieldName === 'pickup-coords' || fieldName === 'dropoff-coords')) {
            // Basic coordinate format check
            if (!value.match(/.*\d+.*\d+.*\d+.*/)) {
                isValid = false;
                message = "I need actual coordinates (X, Y, Z). 'Over there' doesn't count.";
            }
        }
        
        if (value && fieldName === 'items') {
            if (value.length < 10) {
                isValid = false;
                message = "Give me more details. 'Stuff' is not a valid item description.";
            }
        }
        
        // Update field appearance and show message
        updateFieldValidation(field, isValid, message);
        
        return isValid;
    }
    
    function updateFieldValidation(field, isValid, message) {
        const fieldContainer = field.closest('.form-group');
        let errorElement = fieldContainer.querySelector('.validation-message');
        
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
        } else {
            field.classList.add('error');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'validation-message';
                errorElement.style.cssText = `
                    color: var(--coral);
                    font-size: 0.9rem;
                    margin-top: 0.5rem;
                    font-style: italic;
                `;
                fieldContainer.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
        }
    }
    
    // Form submission with personality
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all required fields
        let allValid = true;
        requiredFields.forEach(field => {
            const fieldName = field.getAttribute('name');
            if (!validateField(field, fieldName)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            showNotification("Fix the errors above. I'm not submitting broken forms.", 'error');
            return;
        }
        
        // Show sarcastic confirmation
        const confirmationMessages = [
            "Really? You want me to handle this delivery job?",
            "Are you sure you can't do this yourself?",
            "Last chance to reconsider and do it yourself...",
            "Submitting this means you're officially giving up. Proceed?"
        ];
        
        const randomMessage = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
        
        if (confirm(randomMessage)) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Submitting (Against My Better Judgment)...";
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification("Job submitted. I'll get back to you when I feel like it.", 'success');
                    form.reset();
                    // Remove any error states
                    requiredFields.forEach(field => {
                        field.classList.remove('error');
                        const errorElement = field.closest('.form-group').querySelector('.validation-message');
                        if (errorElement) {
                            errorElement.remove();
                        }
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showNotification("Something went wrong. Try again or do it yourself.", 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        }
    });
}

// =============================================================================
// RULES TOGGLE FUNCTIONALITY
// =============================================================================

function initializeRulesToggle() {
    const rulesToggle = document.querySelector('.rules-toggle');
    const rulesContent = document.querySelector('.rules-content');
    
    if (!rulesToggle || !rulesContent) {
        console.warn("⚠️ Rules toggle elements not found");
        return;
    }
    
    rulesToggle.addEventListener('click', function() {
        const isExpanded = rulesContent.classList.contains('expanded');
        
        rulesContent.classList.toggle('expanded');
        rulesToggle.classList.toggle('expanded');
        rulesToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Update button text
        if (isExpanded) {
            rulesToggle.textContent = 'Click to Expand Full Rules & Terms';
        } else {
            rulesToggle.textContent = 'Click to Collapse Rules & Terms';
        }
    });
}

// =============================================================================
// KONAMI CODE EASTER EGG
// =============================================================================

function initializeEasterEgg() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        console.log("🌈 KONAMI CODE ACTIVATED! Rainbow mode engaged!");
        
        // Create rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            
            .rainbow-mode * {
                animation: rainbow 2s linear infinite !important;
            }
            
            .easter-egg-notification {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
                background-size: 400% 400%;
                animation: rainbow-bg 2s ease infinite;
                color: white;
                padding: 20px 40px;
                border-radius: 12px;
                font-size: 1.2rem;
                font-weight: bold;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            
            @keyframes rainbow-bg {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
        `;
        document.head.appendChild(style);
        
        // Add rainbow class to body
        document.body.classList.add('rainbow-mode');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.innerHTML = `
            🌈 RAINBOW MODE ACTIVATED! 🌈<br>
            <small>Congratulations, you found the secret!<br>
            Discount Code: RAINBOW10 (totally fake)</small>
        `;
        document.body.appendChild(notification);
        
        // Remove effects after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('rainbow-mode');
            notification.remove();
            style.remove();
            showNotification("Rainbow mode disabled. Back to judging your life choices.", 'info');
        }, 10000);
        
        showNotification("🌈 Secret rainbow mode activated! Enjoy the colors while they last.", 'success');
    }
}

// =============================================================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================================================

function initializeAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.focus();
            mainContent.scrollIntoView();
        });
    }
    
    // Keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName === 'BUTTON' || this.getAttribute('role') === 'button') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Make announceToScreenReader available globally
    window.announceToScreenReader = announceToScreenReader;
}

// =============================================================================
// ERROR HANDLING & NOTIFICATIONS
// =============================================================================

function initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        showNotification("Something broke. Probably not my fault.", 'error');
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        showNotification("A promise was broken. How fitting.", 'error');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'var(--coral)' : type === 'success' ? 'var(--mint-green)' : 'var(--primary-blue)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        max-width: 300px;
        font-family: var(--font-primary);
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader(message);
    }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// =============================================================================
// PERFORMANCE MONITORING
// =============================================================================

// Simple performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`📊 Page load time: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn("⚠️ Slow page load detected. Consider optimizing.");
            }
        }, 0);
    });
}

// =============================================================================
// EXPORT FOR TESTING (if needed)
// =============================================================================

// Make functions available for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeMobileMenu,
        initializeScrollEffects,
        initializePricingTabs,
        initializeFormValidation,
        showNotification,
        throttle,
        debounce
    };
}

console.log("✅ Because You Won't™ JavaScript loaded successfully");
console.log("💼 Ready to handle your procrastination professionally");