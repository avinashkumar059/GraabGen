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

// Review functionality
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviewsList');
const successMessage = document.getElementById('successMessage');
const averageRatingEl = document.getElementById('averageRating');
const totalReviewsEl = document.getElementById('totalReviews');

// Load reviews from localStorage
loadReviews();

// Handle review form submission
reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const reviewerName = document.getElementById('reviewerName').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('reviewText').value;
    
    // Create review object
    const review = {
        name: reviewerName,
        rating: parseInt(rating),
        text: reviewText,
        date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    // Save review
    saveReview(review);
    
    // Add review to display
    addReviewToDisplay(review);
    
    // Update stats
    updateReviewStats();
    
    // Reset form
    reviewForm.reset();
    
    // Show success message
    showSuccessMessage();
});

// Function to show success message
function showSuccessMessage() {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Function to save review to localStorage
function saveReview(review) {
    let reviews = [];
    
    // Get existing reviews from localStorage
    if (localStorage.getItem('reviews')) {
        reviews = JSON.parse(localStorage.getItem('reviews'));
    }
    
    // Add new review
    reviews.push(review);
    
    // Save back to localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Function to load reviews from localStorage
function loadReviews() {
    if (localStorage.getItem('reviews')) {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        
        // Clear "no reviews" message if it exists
        if (reviews.length > 0) {
            reviewsList.innerHTML = '';
        }
        
        // Add each review to display
        reviews.forEach(review => {
            addReviewToDisplay(review);
        });
        
        // Update stats
        updateReviewStats();
    }
}

// Function to update review statistics
function updateReviewStats() {
    if (localStorage.getItem('reviews')) {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        const totalReviews = reviews.length;
        
        if (totalReviews > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = (totalRating / totalReviews).toFixed(1);
            
            averageRatingEl.textContent = averageRating;
            totalReviewsEl.textContent = totalReviews;
        }
    }
}

// Function to add a review to the display
function addReviewToDisplay(review) {
    // Remove "no reviews" message if it exists
    const noReviews = reviewsList.querySelector('.no-reviews');
    if (noReviews) {
        noReviews.remove();
    }
    
    // Create review element
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    
    // Create stars based on rating
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < review.rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    
    reviewItem.innerHTML = `
        <div class="review-header-info">
            <div class="reviewer-name">${review.name}</div>
            <div class="review-date">${review.date}</div>
        </div>
        <div class="review-rating">${stars}</div>
        <div class="review-text">${review.text}</div>
    `;
    
    // Add to reviews list (prepend to show newest first)
    reviewsList.prepend(reviewItem);
}

// Mobile menu functionality
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');

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

// ✅ Automatically close menu when switching to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) { // adjust breakpoint as needed
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});


// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});