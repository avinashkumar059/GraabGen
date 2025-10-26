// JavaScript for handling service modal functionality
        // Service details data
        const serviceDetails = {
            "smart-attendance": {
                icon: '<i class="fas fa-robot"></i>',
                title: "Smart Attendance Management System",
                description: "Our Smart Attendance Management System leverages cutting-edge AI technology to revolutionize how organizations track and manage attendance. Using facial recognition, geolocation, and predictive analytics, our system eliminates manual processes while ensuring accuracy and security.",
                features: [
                    "Real-time facial recognition for automatic check-ins",
                    "Geofencing capabilities to ensure employees are at designated locations",
                    "Predictive analytics to forecast attendance patterns and staffing needs",
                    "Seamless integration with payroll and HR systems",
                    "Mobile app support for remote and field employees",
                    "Comprehensive reporting and analytics dashboard"
                ]
            },
            "biometric-attendance": {
                icon: '<i class="fas fa-fingerprint"></i>',
                title: "Biometrics Attendance Management System",
                "description": "Our Biometric Attendance Management System provides secure, accurate, and efficient tracking using advanced biometric technologies. By utilizing unique physiological characteristics, we eliminate buddy punching and ensure that attendance records are tamper-proof and reliable.",
                features: [
                    "Multiple biometric options: fingerprint, iris, and facial recognition",
                    "Fast and accurate identification with sub-second response times",
                    "Scalable solutions for organizations of all sizes",
                    "Cloud-based data storage with military-grade encryption",
                    "Real-time monitoring and instant alerts for anomalies",
                    "Compliance with global data protection regulations"
                ]
            },
            "manual-attendance": {
                icon: '<i class="fas fa-user-check"></i>',
                title: "Manual Attendance Management System",
                "description": "For organizations that prefer traditional methods or have specific requirements, our Manual Attendance Management System provides a digital framework for manual attendance tracking. This system combines the familiarity of traditional methods with the efficiency of digital record-keeping.",
                features: [
                    "User-friendly digital sign-in/sign-out interface",
                    "Customizable attendance sheets and registers",
                    "Automated calculation of working hours and overtime",
                    "Integration with existing ID card or badge systems",
                    "Backup and recovery options for data security",
                    "Simple reporting tools for managers and administrators"
                ]
            }
        };

        // Get DOM elements
        const modal = document.getElementById('serviceModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalIcon = document.getElementById('modalIcon');
        const modalBody = document.getElementById('modalBody');
        const closeBtn = document.querySelector('.close-modal');
        const featureCards = document.querySelectorAll('.feature-card');

        // Function to open modal with service details
        function openModal(serviceId) {
            const service = serviceDetails[serviceId];
            
            if (service) {
                modalIcon.innerHTML = service.icon;
                modalTitle.textContent = service.title;
                
                // Build modal body content
                let bodyContent = `
                    <p>${service.description}</p>
                    <h3 style="color: var(--neon-green); margin: 1.5rem 0 1rem;">Key Features:</h3>
                    <ul class="modal-features">
                `;
                
                service.features.forEach(feature => {
                    bodyContent += `<li>${feature}</li>`;
                });
                
                bodyContent += `</ul>`;
                
                modalBody.innerHTML = bodyContent;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        }

        // Function to close modal
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }

        // Add event listeners to feature cards
        featureCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.getAttribute('data-service');
                openModal(serviceId);
            });
        });

        // Close modal when clicking the close button
        closeBtn.addEventListener('click', closeModal);

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });