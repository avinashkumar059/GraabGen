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

        // Auto-close mobile menu on resize to desktop breakpoint
        const DESKTOP_BREAKPOINT = 968; // match CSS @media (max-width: 968px)

        function closeMenuIfDesktop() {
            if (window.innerWidth >= DESKTOP_BREAKPOINT) {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }

        // Simple debounce to avoid excessive calls during resize
        function debounce(fn, delay) {
            let timerId;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timerId);
                timerId = setTimeout(() => fn.apply(context, args), delay);
            };
        }

        window.addEventListener('resize', debounce(closeMenuIfDesktop, 150));
        // Ensure correct state on initial load as well
        closeMenuIfDesktop();