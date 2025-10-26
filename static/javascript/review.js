
// Review functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Review script loaded');
    
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const successMessage = document.getElementById('successMessage');
    const averageRatingEl = document.getElementById('averageRating');
    const totalReviewsEl = document.getElementById('totalReviews');
    const reviewMessage = document.getElementById('reviewMessage');

    if (!reviewForm) {
        console.error('Review form not found');
        return;
    }

    console.log('Review form found, adding event listener');

    // Handle review form submission
    reviewForm.addEventListener('submit', function(e) {
        console.log('Form submit event triggered');
        e.preventDefault();
        
        const reviewerName = document.getElementById('reviewerName').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        const reviewText = document.getElementById('reviewText').value.trim();
        
        console.log('Form data:', { reviewerName, rating: rating?.value, reviewText });
        
        // Validate form
        if (!reviewerName || !rating || !reviewText) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Prepare data for submission
        const formData = {
            reviewerName: reviewerName,
            rating: parseInt(rating.value),
            reviewText: reviewText
        };
        
        console.log('Submitting review:', formData);
        
        // Submit to backend
        submitReview(formData);
    });

    // Function to submit review to backend
    async function submitReview(data) {
        try {
            console.log('Submitting to API...');
            const response = await fetch('/api/review/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            });
            
            console.log('Response received:', response.status);
            const result = await response.json();
            console.log('Response data:', result);
            
            if (result.success) {
                showMessage(result.message, 'success');
                reviewForm.reset();
                // Reload page to show updated reviews and stats
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showMessage(result.message, 'error');
            }
        } catch (error) {
            showMessage('Error submitting review. Please try again.', 'error');
            console.error('Error:', error);
        }
    }
    
    // Function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    // Function to show messages
    function showMessage(message, type) {
        if (reviewMessage) {
            reviewMessage.textContent = message;
            reviewMessage.className = `message-response ${type}`;
            reviewMessage.style.display = 'block';
            
            setTimeout(() => {
                reviewMessage.style.display = 'none';
            }, 5000);
        }
    }
});