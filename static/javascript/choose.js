
// Animation for stats counter
        document.addEventListener('DOMContentLoaded', function() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const statsSection = document.querySelector('.stats');
            
            // Function to check if element is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
            
            // Animate numbers when stats section comes into view
            function animateNumbers() {
                if (isInViewport(statsSection)) {
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent);
                        let count = 0;
                        const duration = 2000; // ms
                        const frameDuration = 1000 / 60; // 60 fps
                        const totalFrames = Math.round(duration / frameDuration);
                        const easeOutQuad = t => t * (2 - t);
                        
                        const counter = setInterval(() => {
                            const progress = easeOutQuad(++count / totalFrames);
                            const current = Math.round(target * progress);
                            
                            if (parseInt(stat.textContent) !== target) {
                                stat.textContent = current + (stat.textContent.includes('%') ? '%' : '+');
                            } else {
                                clearInterval(counter);
                            }
                        }, frameDuration);
                    });
                    
                    // Remove event listener after animation
                    window.removeEventListener('scroll', animateOnScroll);
                }
            }
            
            // Listen for scroll events
            function animateOnScroll() {
                animateNumbers();
            }
            
            window.addEventListener('scroll', animateOnScroll);
            
            // Trigger initially in case stats section is already in view
            animateNumbers();
        });