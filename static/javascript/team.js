         document.addEventListener('DOMContentLoaded', function() {
            const teamGrid = document.querySelector('.team-grid');
            const teamMembers = document.querySelectorAll('.team-member');
            const dots = document.querySelectorAll('.swipe-dot');
            const prevArrow = document.querySelector('.nav-arrow.prev');
            const nextArrow = document.querySelector('.nav-arrow.next');
            
            let currentIndex = 0;
            let startX;
            let scrollLeft;
            let isDown = false;
            
            // Only apply swipe functionality on tablet/mobile
            if (window.innerWidth <= 1024) {
                setupSwipeFunctionality();
            }
            
            // Update on window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth <= 1024) {
                    setupSwipeFunctionality();
                } else {
                    // Remove event listeners for desktop
                    teamGrid.removeEventListener('touchstart', touchStart);
                    teamGrid.removeEventListener('touchmove', touchMove);
                    teamGrid.removeEventListener('mousedown', mouseDown);
                    teamGrid.removeEventListener('mouseleave', mouseLeave);
                    teamGrid.removeEventListener('mouseup', mouseUp);
                    teamGrid.removeEventListener('mousemove', mouseMove);
                }
            });
            
            function setupSwipeFunctionality() {
                // Add event listeners for touch devices
                teamGrid.addEventListener('touchstart', touchStart, false);
                teamGrid.addEventListener('touchmove', touchMove, false);
                
                // Also add mouse events for devices with both touch and mouse
                teamGrid.addEventListener('mousedown', mouseDown);
                teamGrid.addEventListener('mouseleave', mouseLeave);
                teamGrid.addEventListener('mouseup', mouseUp);
                teamGrid.addEventListener('mousemove', mouseMove);
                
                // Navigation arrows
                prevArrow.addEventListener('click', function() {
                    if (currentIndex > 0) {
                        currentIndex--;
                        scrollToCard(currentIndex);
                    }
                });
                
                nextArrow.addEventListener('click', function() {
                    if (currentIndex < teamMembers.length - 1) {
                        currentIndex++;
                        scrollToCard(currentIndex);
                    }
                });
                
                // Click on dots to navigate
                dots.forEach(dot => {
                    dot.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        currentIndex = index;
                        scrollToCard(currentIndex);
                    });
                });
            }
            
            function touchStart(e) {
                const touch = e.touches[0];
                startX = touch.pageX - teamGrid.offsetLeft;
                scrollLeft = teamGrid.scrollLeft;
            }
            
            function touchMove(e) {
                if (!startX) return;
                const touch = e.touches[0];
                const x = touch.pageX - teamGrid.offsetLeft;
                const walk = (x - startX) * 2;
                teamGrid.scrollLeft = scrollLeft - walk;
                updateActiveDot();
            }
            
            function mouseDown(e) {
                isDown = true;
                startX = e.pageX - teamGrid.offsetLeft;
                scrollLeft = teamGrid.scrollLeft;
            }
            
            function mouseLeave() {
                isDown = false;
            }
            
            function mouseUp() {
                isDown = false;
                updateActiveDot();
            }
            
            function mouseMove(e) {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - teamGrid.offsetLeft;
                const walk = (x - startX) * 2;
                teamGrid.scrollLeft = scrollLeft - walk;
            }
            
            function updateActiveDot() {
                const scrollPos = teamGrid.scrollLeft;
                const cardWidth = teamMembers[0].offsetWidth + parseInt(getComputedStyle(teamGrid).gap);
                currentIndex = Math.round(scrollPos / cardWidth);
                
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            function scrollToCard(index) {
                const cardWidth = teamMembers[0].offsetWidth + parseInt(getComputedStyle(teamGrid).gap);
                teamGrid.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
                
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });