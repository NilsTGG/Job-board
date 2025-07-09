// UI/UX Diagnostic Script - Because You Won't™ Debug Analysis
// This script will help identify what's actually broken vs. what's just overwhelming

console.log("🔍 Starting UI/UX Diagnostic Analysis...");

// Check if we're running in browser
if (typeof window !== 'undefined') {
    
    // 1. COUNT PERSISTENT UI ELEMENTS
    function countPersistentElements() {
        const persistentElements = {
            navbar: document.querySelector('.navbar'),
            floatingButtons: document.querySelectorAll('.floating-btn'),
            progressBar: document.querySelector('.scroll-progress'),
            skipLink: document.querySelector('.skip-link')
        };
        
        let count = 0;
        let details = [];
        
        if (persistentElements.navbar) {
            count++;
            details.push('Fixed Navbar');
        }
        
        if (persistentElements.floatingButtons.length > 0) {
            count += persistentElements.floatingButtons.length;
            details.push(`${persistentElements.floatingButtons.length} Floating Buttons`);
        }
        
        if (persistentElements.progressBar) {
            count++;
            details.push('Scroll Progress Bar');
        }
        
        if (persistentElements.skipLink) {
            count++;
            details.push('Skip Link');
        }
        
        console.log(`📊 PERSISTENT UI ELEMENTS: ${count} total`);
        console.log(`📋 Details: ${details.join(', ')}`);
        
        if (count > 6) {
            console.warn("⚠️ ISSUE: Too many persistent UI elements (>6) - Interface clutter detected!");
        }
        
        return { count, details };
    }
    
    // 2. CHECK MOBILE RESPONSIVENESS
    function checkMobileIssues() {
        const floatingActions = document.querySelector('.floating-actions');
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        console.log(`📱 Viewport: ${viewport.width}x${viewport.height}`);
        
        if (viewport.width <= 768) {
            console.log("📱 Mobile viewport detected");
            
            if (floatingActions) {
                const rect = floatingActions.getBoundingClientRect();
                const rightEdge = rect.right;
                const bottomEdge = rect.bottom;
                
                console.log(`🎯 Floating buttons position: right=${rightEdge}px, bottom=${bottomEdge}px`);
                
                if (rightEdge > viewport.width - 10) {
                    console.warn("⚠️ ISSUE: Floating buttons may be off-screen on mobile!");
                }
                
                if (bottomEdge > viewport.height - 10) {
                    console.warn("⚠️ ISSUE: Floating buttons may be cut off on mobile!");
                }
            }
        }
        
        return viewport;
    }
    
    // 3. CHECK JAVASCRIPT ERRORS
    function checkJavaScriptErrors() {
        const originalError = window.onerror;
        let errorCount = 0;
        
        window.onerror = function(message, source, lineno, colno, error) {
            errorCount++;
            console.error(`🚨 JavaScript Error #${errorCount}:`, {
                message,
                source,
                line: lineno,
                column: colno,
                error
            });
            
            if (originalError) {
                originalError.apply(this, arguments);
            }
        };
        
        // Test key functions
        const functionTests = [
            { name: 'Navigation', test: () => document.querySelectorAll('.nav-links a').length > 0 },
            { name: 'Floating Buttons', test: () => document.querySelectorAll('.floating-btn').length > 0 },
            { name: 'Pricing Tabs', test: () => document.querySelectorAll('.pricing-tab').length > 0 },
            { name: 'FAQ Collapsible', test: () => document.querySelectorAll('.faq-item').length > 0 },
            { name: 'Form Elements', test: () => document.querySelectorAll('form').length > 0 }
        ];
        
        console.log("🧪 Testing key functionality...");
        functionTests.forEach(test => {
            try {
                const result = test.test();
                console.log(`✅ ${test.name}: ${result ? 'Found elements' : 'No elements found'}`);
            } catch (error) {
                console.error(`❌ ${test.name}: Error -`, error.message);
            }
        });
        
        return errorCount;
    }
    
    // 4. CHECK PERFORMANCE ISSUES
    function checkPerformanceIssues() {
        console.log("⚡ Checking performance metrics...");
        
        // Count event listeners (approximation)
        const elementsWithListeners = [
            document.querySelectorAll('[onclick]'),
            document.querySelectorAll('button'),
            document.querySelectorAll('a'),
            document.querySelectorAll('.floating-btn'),
            document.querySelectorAll('.pricing-tab'),
            document.querySelectorAll('.faq-item')
        ];
        
        let totalInteractiveElements = 0;
        elementsWithListeners.forEach(nodeList => {
            totalInteractiveElements += nodeList.length;
        });
        
        console.log(`🎛️ Total interactive elements: ${totalInteractiveElements}`);
        
        if (totalInteractiveElements > 50) {
            console.warn("⚠️ ISSUE: High number of interactive elements may impact performance!");
        }
        
        // Check scroll event listeners
        const scrollElements = document.querySelectorAll('[onscroll]');
        console.log(`📜 Elements with scroll events: ${scrollElements.length}`);
        
        return totalInteractiveElements;
    }
    
    // 5. CHECK NAVIGATION REDUNDANCY
    function checkNavigationRedundancy() {
        const navMethods = {
            mainNav: document.querySelectorAll('.nav-links a[href^="#"]'),
            floatingBtns: document.querySelectorAll('.floating-btn[href^="#"]'),
            otherLinks: document.querySelectorAll('a[href^="#"]:not(.nav-links a):not(.floating-btn)')
        };
        
        console.log("🧭 Navigation method analysis:");
        console.log(`📍 Main navigation links: ${navMethods.mainNav.length}`);
        console.log(`🎯 Floating button links: ${navMethods.floatingBtns.length}`);
        console.log(`🔗 Other internal links: ${navMethods.otherLinks.length}`);
        
        // Check for duplicate targets
        const allTargets = new Set();
        const duplicateTargets = new Set();
        
        [...navMethods.mainNav, ...navMethods.floatingBtns].forEach(link => {
            const target = link.getAttribute('href');
            if (allTargets.has(target)) {
                duplicateTargets.add(target);
            } else {
                allTargets.add(target);
            }
        });
        
        if (duplicateTargets.size > 0) {
            console.warn(`⚠️ ISSUE: Duplicate navigation targets found:`, Array.from(duplicateTargets));
        }
        
        return { navMethods, duplicateTargets };
    }
    
    // 6. CHECK VISUAL HIERARCHY ISSUES
    function checkVisualHierarchy() {
        console.log("👁️ Checking visual hierarchy...");
        
        const zIndexElements = [];
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const zIndex = style.zIndex;
            if (zIndex !== 'auto' && zIndex !== '0') {
                zIndexElements.push({
                    element: el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''),
                    zIndex: parseInt(zIndex)
                });
            }
        });
        
        zIndexElements.sort((a, b) => b.zIndex - a.zIndex);
        
        console.log("📚 Z-index stack (highest to lowest):");
        zIndexElements.forEach(item => {
            console.log(`  ${item.zIndex}: ${item.element}`);
        });
        
        if (zIndexElements.length > 5) {
            console.warn("⚠️ ISSUE: Complex z-index stacking may cause visual conflicts!");
        }
        
        return zIndexElements;
    }
    
    // RUN ALL DIAGNOSTICS
    function runFullDiagnostic() {
        console.log("🚀 Running comprehensive UI/UX diagnostic...");
        console.log("=" .repeat(60));
        
        const results = {
            persistentElements: countPersistentElements(),
            mobileCheck: checkMobileIssues(),
            jsErrors: checkJavaScriptErrors(),
            performance: checkPerformanceIssues(),
            navigation: checkNavigationRedundancy(),
            visualHierarchy: checkVisualHierarchy()
        };
        
        console.log("=" .repeat(60));
        console.log("📋 DIAGNOSTIC SUMMARY:");
        
        // Generate overall assessment
        let issueCount = 0;
        let recommendations = [];
        
        if (results.persistentElements.count > 6) {
            issueCount++;
            recommendations.push("Reduce persistent UI elements to improve visual clarity");
        }
        
        if (results.navigation.duplicateTargets.size > 0) {
            issueCount++;
            recommendations.push("Remove redundant navigation options");
        }
        
        if (results.performance > 50) {
            issueCount++;
            recommendations.push("Optimize interactive elements for better performance");
        }
        
        if (results.visualHierarchy.length > 5) {
            issueCount++;
            recommendations.push("Simplify z-index stacking to prevent visual conflicts");
        }
        
        console.log(`🎯 ISSUES IDENTIFIED: ${issueCount}`);
        
        if (issueCount > 0) {
            console.log("💡 RECOMMENDATIONS:");
            recommendations.forEach((rec, index) => {
                console.log(`  ${index + 1}. ${rec}`);
            });
        } else {
            console.log("✅ No major issues detected - user complaint may be subjective");
        }
        
        console.log("=" .repeat(60));
        
        return results;
    }
    
    // Auto-run diagnostics when script loads
    setTimeout(() => {
        runFullDiagnostic();
    }, 1000);
    
    // Make functions available globally for manual testing
    window.UIDebug = {
        runFullDiagnostic,
        countPersistentElements,
        checkMobileIssues,
        checkJavaScriptErrors,
        checkPerformanceIssues,
        checkNavigationRedundancy,
        checkVisualHierarchy
    };
    
} else {
    console.log("❌ Browser environment not detected - diagnostic script not loaded");
}