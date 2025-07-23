// Main JavaScript for IQVIA Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeHeroSlider();
    initializeTabSections();
    initializeCarousels();
    initializeScrollEffects();
    initializeAccordions();
    initializeSearch();
    initializeBackToTop();
    initializeNewsTickerPause();
});

// Navigation functionality
function initializeNavigation() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const primaryNav = document.querySelector('.primary-nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            primaryNav.classList.toggle('mobile-open');
        });
    }

    // Dropdown hover effects
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const menu = item.querySelector('.dropdown-menu');
        let hoverTimeout;

        item.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateX(-50%) translateY(0)';
        });

        item.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateX(-50%) translateY(-10px)';
            }, 100);
        });
    });

    // Smooth scrolling for jump links
    const jumpLinks = document.querySelectorAll('.jump-menu a, a[href^="#"]');
    jumpLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Hero slider functionality
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }

    // Start auto slide
    startAutoSlide();
}

// Tab sections functionality
function initializeTabSections() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding panel
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Carousel functionality
function initializeCarousels() {
    // Products carousel
    const productsCarousel = document.getElementById('products-carousel');
    if (productsCarousel) {
        initializeCarousel(productsCarousel, '.carousel-slide', '.carousel-prev', '.carousel-next', '.carousel-pagination .dot');
    }

    // Stats carousel (for mobile)
    const statsCarousel = document.getElementById('stats-carousel');
    if (statsCarousel && window.innerWidth <= 768) {
        // Convert stats to carousel on mobile
        const statItems = statsCarousel.querySelectorAll('.stat-item');
        if (statItems.length > 3) {
            initializeStatsCarousel(statsCarousel);
        }
    }
}

function initializeCarousel(container, slideSelector, prevSelector, nextSelector, dotSelector) {
    const slides = container.querySelectorAll(slideSelector);
    const prevBtn = container.querySelector(prevSelector);
    const nextBtn = container.querySelector(nextSelector);
    const dots = container.querySelectorAll(dotSelector);
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.fifty-fifty-section, .stat-item, .insight-card, .video-section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(27, 54, 93, 0.98)';
        } else {
            header.style.background = 'rgba(27, 54, 93, 0.95)';
        }

        // Auto-hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Jump links active state
    const sections = document.querySelectorAll('section[id]');
    const jumpLinks = document.querySelectorAll('.jump-menu a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        jumpLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Accordion functionality
function initializeAccordions() {
    const tileBtns = document.querySelectorAll('.tile-btn');
    
    tileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.parentNode.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close other open tiles
                tileBtns.forEach(otherBtn => {
                    const otherContent = otherBtn.parentNode.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('i');
                    otherContent.classList.remove('active');
                    otherContent.style.display = 'none';
                    otherIcon.style.transform = 'rotate(0deg)';
                });
                
                // Open clicked tile
                content.classList.add('active');
                content.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Search functionality
function initializeSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.querySelector('.search-input');

    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });
    }

    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });
    }

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });

    // Close search on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        }
    });
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// News ticker pause functionality
function initializeNewsTickerPause() {
    const ticker = document.querySelector('.ticker-content');
    
    if (ticker) {
        ticker.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });

        ticker.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

// Video play functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.play-button') || e.target.closest('.video-placeholder')) {
        e.preventDefault();
        const videoContainer = e.target.closest('.video-container');
        if (videoContainer) {
            // Simulate video play (replace with actual video implementation)
            const playButton = videoContainer.querySelector('.play-button');
            if (playButton) {
                playButton.style.opacity = '0';
                setTimeout(() => {
                    playButton.style.opacity = '1';
                }, 1000);
            }
        }
    }
});

// Utility functions
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

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize components that need resize handling
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
    });
}, 250));

// Performance optimization: Lazy load images
function initializeLazyLoading() {
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

// Initialize lazy loading if images with data-src exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initializeLazyLoading();
}

// Form validation and submission
function initializeFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                // Replace with actual form submission logic
            }
        });
    });
}

// Initialize form handling if forms exist
if (document.querySelectorAll('form').length > 0) {
    initializeFormHandling();
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Replace with actual analytics implementation
}

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.cta-btn')) {
        const ctaText = e.target.closest('.cta-btn').querySelector('.tile').textContent;
        trackEvent('cta_click', { cta_text: ctaText });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Handle errors gracefully
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Mobile navigation toggle
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.primary-nav');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});
