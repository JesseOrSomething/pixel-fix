// Pixel Perfect - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Parallax effect for glass orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.glass-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.service-card, .glass-panel, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Enhanced glass card hover effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
            this.style.boxShadow = '0 25px 80px rgba(31, 38, 135, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
        });

        // Mouse tracking effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 10;
            const rotateY = (centerX - x) / centerX * 10;
            
            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Floating device animations with mouse interaction
    const floatingDevices = document.querySelectorAll('.floating-device');
    floatingDevices.forEach((device, index) => {
        device.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-20px) scale(1.1) rotate(5deg)';
        });
        
        device.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });

    // Optimized background gradient shift using requestAnimationFrame
    let gradientAngle = 135;
    let lastTime = 0;
    
    function animateGradient(currentTime) {
        if (currentTime - lastTime >= 100) { // Only update every 100ms
            gradientAngle += 0.5;
            document.body.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`;
            lastTime = currentTime;
        }
        requestAnimationFrame(animateGradient);
    }
    
    requestAnimationFrame(animateGradient);

    // Enhanced button effects
    const buttons = document.querySelectorAll('.glass-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Scroll to sections on button click
        if (button.textContent.includes('Our Services')) {
            button.addEventListener('click', function() {
                document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        if (button.textContent.includes('Get Quote')) {
            button.addEventListener('click', function() {
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // Form removed - contact via phone/email directly

    // Mobile Navigation Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Prevent body scroll when mobile nav is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile nav when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
                hamburgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Contact info interaction
    const contactLinks = document.querySelectorAll('.contact-details a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            showNotification('Contact info copied!', 'info');
            
            // Copy to clipboard if it's email or phone
            const text = this.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
            }
        });
    });

    // Simplified notification system (now uses CSS-based styles)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification glass-panel ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }, 3000);
    }

    // Advanced scroll animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        
        // Header background opacity based on scroll
        const nav = document.querySelector('.glass-nav');
        const navOpacity = Math.min(scrolled / 100, 1);
        nav.style.background = `rgba(255, 255, 255, ${0.08 + navOpacity * 0.05})`;
        
        // Parallax for hero elements
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroText && scrolled < windowHeight) {
            heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Loading animation completion
    document.body.classList.add('loaded');
    
    // Add dynamic glow effects to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(100, 200, 255, 0.6))';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }
});

// All CSS styles are now properly organized in style.css file
// This improves performance and maintainability by removing inline styles