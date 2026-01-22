(function () {
    'use strict';

    /**
     * Initialize Team Members Grid
     * Handles scroll animations and hover effects for team member cards
     */
    const initTeamMembers = () => {
        // Get all team members sections
        const teamSections = document.querySelectorAll('.twork-team-members-section');

        if (teamSections.length === 0) {
            return;
        }

        teamSections.forEach((section) => {
            // Get attributes from data attributes
            const animationEnabled = section.dataset.animation === 'true';
            const animationType = section.dataset.animationType || 'fadeInUp';
            const animationDelay = parseInt(section.dataset.animationDelay) || 100;
            const hoverEnabled = section.dataset.hoverEffect === 'true';
            const hoverTranslateY = parseFloat(section.dataset.hoverTranslateY) || -8;
            const hoverScale = parseFloat(section.dataset.hoverScale) || 1.02;
            const hoverShadow = parseFloat(section.dataset.hoverShadow) || 1.5;

            // Get all team member cards
            const memberCards = section.querySelectorAll('.team-member-card');

            // Apply hover effects if enabled
            if (hoverEnabled && memberCards.length > 0) {
                memberCards.forEach((card) => {
                    const originalShadow = window.getComputedStyle(card).boxShadow;

                    card.addEventListener('mouseenter', function() {
                        this.style.transform = `translateY(${hoverTranslateY}px) scale(${hoverScale})`;
                        
                        // Enhance shadow on hover
                        if (originalShadow && originalShadow !== 'none') {
                            const shadowParts = originalShadow.split(') ');
                            if (shadowParts.length > 0) {
                                const enhancedShadow = shadowParts.map(part => {
                                    if (part.includes('rgba')) {
                                        return part.replace(/[\d.]+\)/, (match) => {
                                            const opacity = parseFloat(match);
                                            return (opacity * hoverShadow).toFixed(2) + ')';
                                        });
                                    }
                                    return part;
                                }).join(') ');
                                this.style.boxShadow = enhancedShadow;
                            }
                        }
                    });

                    card.addEventListener('mouseleave', function() {
                        this.style.transform = 'translateY(0) scale(1)';
                        this.style.boxShadow = originalShadow;
                    });
                });
            }

            // Setup scroll animations if enabled
            if (animationEnabled && memberCards.length > 0) {
                // Add animation class based on type
                memberCards.forEach((card, index) => {
                    if (!card.classList.contains('animate-on-scroll')) {
                        card.classList.add('animate-on-scroll');
                    }

                    // Apply animation type specific styles
                    switch (animationType) {
                        case 'fadeIn':
                            card.style.opacity = '0';
                            break;
                        case 'fadeInUp':
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(30px)';
                            break;
                        case 'slideInLeft':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(-50px)';
                            break;
                        case 'slideInRight':
                            card.style.opacity = '0';
                            card.style.transform = 'translateX(50px)';
                            break;
                        case 'zoomIn':
                            card.style.opacity = '0';
                            card.style.transform = 'scale(0.8)';
                            break;
                    }

                    // Set staggered delay
                    card.style.transitionDelay = `${index * animationDelay}ms`;
                });

                // Create Intersection Observer
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            
                            // Reset styles when visible
                            setTimeout(() => {
                                entry.target.style.opacity = '1';
                                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                            }, 50);

                            // Unobserve after animation to improve performance
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                // Observe all member cards
                memberCards.forEach((card) => {
                    observer.observe(card);
                });
            }

            // Social links hover effect
            const socialLinks = section.querySelectorAll('.social-link');
            socialLinks.forEach((link) => {
                const hoverColor = link.dataset.hoverColor || '#f48b2a';
                const hoverBgColor = link.dataset.hoverBgColor || '#f9f9f9';

                link.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = hoverBgColor;
                    this.style.color = hoverColor;
                });

                link.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                });
            });

            // Contact links accessibility
            const contactLinks = section.querySelectorAll('.contact-item a');
            contactLinks.forEach((link) => {
                link.addEventListener('focus', function() {
                    this.style.textDecoration = 'underline';
                });

                link.addEventListener('blur', function() {
                    this.style.textDecoration = 'none';
                });
            });
        });
    };

    /**
     * Initialize on DOM ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeamMembers);
    } else {
        initTeamMembers();
    }

    /**
     * Re-initialize on window load (for dynamic content)
     */
    window.addEventListener('load', initTeamMembers);

    /**
     * Lazy loading for member images
     */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.member-image[data-src]').forEach((img) => {
            imageObserver.observe(img);
        });
    }

})();

