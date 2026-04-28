/**
 * Felix Sihite - Portfolio
 * @author Felix Alveus Seventeen Sihite
 * @version 2.0.0
 */

(function() {
    'use strict';
    const CONFIG = {
        typingSpeed: 100,
        deletingSpeed: 50,
        typingDelay: 2000,
        particleCount: 30,
        counterDuration: 2000,
        scrollOffset: 200
    };

    const ROLES = [
        'Data Analyst',
        'Business Intelligence Analyst',
        'Machine Learning Practitioner',
        'AI Enthusiast',
        'Data Science Enthusiast',
        'Data Engineering Enthusiast',
        'UI/UX Designer'
    ];

    const elements = {
        preloader: document.getElementById('preloader'),
        navbar: document.getElementById('navbar'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        mobileMenu: document.getElementById('mobileMenu'),
        closeMobileMenu: document.getElementById('closeMobileMenu'),
        typingText: document.getElementById('typingText'),
        particles: document.getElementById('particles'),
        backToTop: document.getElementById('backToTop'),
        contactForm: document.getElementById('contactForm'),
        formMessage: document.getElementById('formMessage'),
        portfolioGrid: document.getElementById('portfolioGrid'),
        navLinks: document.querySelectorAll('.nav-link'),
        mobileLinks: document.querySelectorAll('.mobile-link'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        portfolioCards: document.querySelectorAll('.portfolio-card'),
        skillBars: document.querySelectorAll('.skill-progress'),
        statNumbers: document.querySelectorAll('.stat-number'),
        sections: document.querySelectorAll('section[id]')
    };

    function initPreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                elements.preloader.classList.add('hidden');
            }, 500);
        });
    }

    function initTypingEffect() {
        if (!elements.typingText) return;

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = ROLES[roleIndex];

            if (isDeleting) {
                elements.typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                elements.typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                setTimeout(() => {
                    isDeleting = true;
                }, CONFIG.typingDelay);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % ROLES.length;
            }

            const speed = isDeleting ? CONFIG.deletingSpeed : CONFIG.typingSpeed;
            setTimeout(type, speed);
        }

        type();
    }
    
    function initParticles() {
        if (!elements.particles) return;

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            elements.particles.appendChild(particle);
        }
    }
    
    function initMobileMenu() {
        if (!elements.mobileMenuBtn || !elements.mobileMenu) return;

        elements.mobileMenuBtn.addEventListener('click', () => {
            elements.mobileMenu.classList.add('open');
            document.body.classList.add('no-scroll');
            const overlay = document.querySelector('.mobile-overlay');
            if (overlay) overlay.classList.add('active');
        });

        elements.closeMobileMenu.addEventListener('click', closeMobileMenu);

        elements.mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('click', (e) => {
            if (elements.mobileMenu.classList.contains('open') &&
                !elements.mobileMenu.contains(e.target) &&
                !elements.mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    function closeMobileMenu() {
        elements.mobileMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
        const overlay = document.querySelector('.mobile-overlay');
        if (overlay) overlay.classList.remove('active');
    }

    function initNavbarScroll() {
        if (!elements.navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                elements.navbar.classList.add('scrolled');
            } else {
                elements.navbar.classList.remove('scrolled');
            }
        });
    }

    function initActiveNavLink() {
        window.addEventListener('scroll', () => {
            let current = '';

            elements.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= sectionTop - CONFIG.scrollOffset) {
                    current = section.getAttribute('id');
                }
            });

            elements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const yOffset = 0;
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function initSkillBars() {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;

                    obs.unobserve(bar); 
                }
            });
        }, {
            threshold: 0.3
        });

        elements.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    function initStatsCounter() {
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = CONFIG.counterDuration;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = `${target}+`;
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    elements.statNumbers.forEach(num => animateCounter(num));
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        elements.statNumbers.forEach(num => observer.observe(num));
    }

    function initPortfolioFilter() {
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                elements.portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });

                setTimeout(() => {
                    if (typeof AOS !== 'undefined') {
                        AOS.refresh();
                    }
                }, 100);
            });
        });
    }

    function initBackToTop() {
        if (!elements.backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        });
    }
    
    function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;

        emailjs.sendForm(
            "service_v4gqp",      
            "template_4yl1zsm",    
            this                  
        ).then(() => {
            showFormMessage('success', 'Message sent successfully! I will get back to you soon.');
            elements.contactForm.reset();
        }).catch((error) => {
            showFormMessage('error', 'Failed to send message. Please try again.');
            console.error('EmailJS Error:', error);
        }).finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

    function showFormMessage(type, message) {
        elements.formMessage.textContent = message;
        elements.formMessage.className = `form-message ${type}`;
        elements.formMessage.style.display = 'block';

        setTimeout(() => {
            elements.formMessage.style.display = 'none';
        }, 5000);
    }
    
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 50
            });
        }
    }
    
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const root = document.documentElement;

        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);

        if (toggle) {
            toggle.innerHTML = savedTheme === 'dark'
                ? '<i class="bx bx-moon"></i>'
                : '<i class="bx bx-sun"></i>';

            toggle.addEventListener('click', () => {
                const current = root.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';

                root.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);

                toggle.innerHTML = next === 'dark'
                    ? '<i class="bx bx-moon"></i>'
                    : '<i class="bx bx-sun"></i>';
            });
        }
    }

    function initCurrentYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function}
     */
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

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Limit in milliseconds
     * @returns {Function}
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    function init() {
        initPreloader();
        initTypingEffect();
        initParticles();
        initMobileMenu();
        initNavbarScroll();
        initActiveNavLink();
        initSmoothScroll();
        initSkillBars();
        initStatsCounter();
        initPortfolioFilter();
        initBackToTop();
        initContactForm();
        initAOS();
        initCurrentYear();
        initThemeToggle();

        console.log('%c Felix Sihite Portfolio ', 
            'background: linear-gradient(135deg, #2aa4ff, #0d85f8); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
        console.log('%c Built with ❤️ by Felix Sihite', 
            'color: #2aa4ff; font-size: 12px;');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();