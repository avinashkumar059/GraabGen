
        // Mobile menu functionality
        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Animation for stats counter
        document.addEventListener('DOMContentLoaded', function() {
            const statBoxes = document.querySelectorAll('.stat-box');
            const timelineItems = document.querySelectorAll('.timeline-content');
            
            // Simple animation for stats
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                
                statBoxes.forEach(box => {
                    const boxPosition = box.getBoundingClientRect().top;
                    
                    if (boxPosition < windowHeight * 0.75) {
                        box.style.opacity = 1;
                        box.style.transform = 'translateY(0)';
                    }
                });
                
                // Animation for timeline items
                timelineItems.forEach(item => {
                    const itemPosition = item.getBoundingClientRect().top;
                    
                    if (itemPosition < windowHeight * 0.75) {
                        item.style.opacity = 1;
                        item.style.transform = 'translateY(0)';
                    }
                });
            });
            
            // Trigger scroll event once to check initial position
            window.dispatchEvent(new Event('scroll'));
            
            // Add initial styles for animation
            statBoxes.forEach(box => {
                box.style.opacity = 0;
                box.style.transform = 'translateY(20px)';
                box.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            timelineItems.forEach(item => {
                item.style.opacity = 0;
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        });