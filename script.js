/**
 * Landing Page - Main JavaScript
 * Handles interactivity and animations
 */

// ============================================
// VARIABLES
// ============================================

const currentYear = new Date().getFullYear();
const cards = document.querySelectorAll('.card');
const sections = document.querySelectorAll('section');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Log initialization message
 */
function initializeApp() {
  console.log('%c🚀 Landing Page Loaded Successfully!', 'color: #00ff00; font-size: 14px; font-weight: bold;');
  console.log('%cVersion: 1.0.0', 'color: #0099ff; font-size: 12px;');
  console.log('%cBuilt with ❤️ by Karan Kumar', 'color: #ff6b6b; font-size: 12px;');
}

/**
 * Update footer year
 */
function updateFooterYear() {
  const footers = document.querySelectorAll('footer');
  footers.forEach(footer => {
    if (footer.textContent.includes('Project By')) {
      footer.innerHTML = `© ${currentYear} | Project By Karan Kumar`;
    }
  });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

/**
 * Observe elements coming into viewport
 */
function setupIntersectionObserver() {
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

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// ============================================
// CARD INTERACTIVITY
// ============================================

/**
 * Add keyboard accessibility to cards
 */
function setupCardAccessibility() {
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    // Add keyboard support (Enter key to activate)
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.focus();
      }
    });
  });
}

/**
 * Handle card hover effects
 */
function setupCardHoverEffects() {
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
      card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = '3px 5px 5px rgba(1, 1, 1, 0.2)';
    });
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================

/**
 * Setup smooth scrolling behavior
 */
function setupSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

/**
 * Handle reduced motion preferences
 */
function setupReducedMotionSupport() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    sections.forEach(section => {
      section.style.transition = 'none';
    });
    cards.forEach(card => {
      card.style.transition = 'none';
    });
  }
}

/**
 * Add focus styles for keyboard navigation
 */
function setupFocusStyles() {
  const style = document.createElement('style');
  style.textContent = `
    *:focus {
      outline: 2px solid #4CAF50;
      outline-offset: 2px;
    }
    .card:focus {
      box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.3);
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

/**
 * Monitor page performance
 */
function monitorPerformance() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'paint') {
            console.log(`⏱️ ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch (e) {
      console.log('Performance monitoring not supported');
    }
  }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

/**
 * Setup lazy loading for images
 */
function setupLazyLoading() {
  const images = document.querySelectorAll('img');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality
 */
function init() {
  // Update footer year
  updateFooterYear();
  
  // Setup observers and effects
  setupIntersectionObserver();
  setupCardAccessibility();
  setupCardHoverEffects();
  setupSmoothScroll();
  setupReducedMotionSupport();
  setupFocusStyles();
  setupLazyLoading();
  
  // Monitor performance
  monitorPerformance();
  
  // Log initialization
  initializeApp();
}

// ============================================
// RUN ON DOM READY
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// FUTURE FEATURES
// ============================================

/**
 * TODO: Add contact form with validation
 * TODO: Add testimonials section with carousel
 * TODO: Add dark mode toggle
 * TODO: Add navigation menu
 * TODO: Add scroll-to-top button
 * TODO: Add filters for project showcase
 */
