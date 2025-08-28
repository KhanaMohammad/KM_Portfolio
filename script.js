// Typed.js initialization for the hero section
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Creative Developer',
                'Front-end Designer',
                'Problem Solver',
                'Tech Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('opacity-0', 'transform', 'translate-y-10', 'transition-all', 'duration-1000');
        observer.observe(section);
    });

    // Add fade-in animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-gray-900', 'bg-opacity-95');
            navbar.classList.remove('glass-effect');
        } else {
            navbar.classList.remove('bg-gray-900', 'bg-opacity-95');
            navbar.classList.add('glass-effect');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation function
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
        notification.className = `notification fixed top-24 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        // Set notification content based on type
        let bgColor, textColor, icon;
        switch (type) {
            case 'success':
                bgColor = 'bg-green-600';
                textColor = 'text-white';
                icon = 'fas fa-check-circle';
                break;
            case 'error':
                bgColor = 'bg-red-600';
                textColor = 'text-white';
                icon = 'fas fa-exclamation-circle';
                break;
            default:
                bgColor = 'bg-blue-600';
                textColor = 'text-white';
                icon = 'fas fa-info-circle';
        }
        
        notification.className += ` ${bgColor} ${textColor}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Skill bars animation on scroll
    const skillBars = document.querySelectorAll('.bg-blue-500, .bg-purple-500, .bg-green-500');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width || '0%';
                entry.target.style.transition = 'width 1.5s ease-in-out';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('home');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.group');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading state
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        body:not(.loaded)::after {
            content: 'Loading...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
        }
    `;
    document.head.appendChild(loadingStyle);
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add cursor trail effect
    let cursorTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', function(e) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(dot);
        cursorTrail.push(dot);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldDot = cursorTrail.shift();
            if (oldDot && oldDot.parentNode) {
                oldDot.parentNode.removeChild(oldDot);
            }
        }
        
        // Animate trail
        cursorTrail.forEach((trailDot, index) => {
            const scale = 1 - (index / maxTrailLength);
            const opacity = 1 - (index / maxTrailLength);
            trailDot.style.transform = `scale(${scale})`;
            trailDot.style.opacity = opacity;
        });
    });
    
    // Add CSS for cursor trail
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-trail {
            animation: fadeOut 0.5s ease-out forwards;
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(cursorStyle);
});
