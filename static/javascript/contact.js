// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');

    if (contactForm) {
        // Handle contact form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            if (!name || !email || !message) {
                showMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Prepare data for submission
            const formData = {
                name: name,
                email: email,
                message: message
            };
            
            // Submit to backend
            submitContact(formData);
        });
    }
    
    // Function to submit contact form to backend
    async function submitContact(data) {
        try {
            const response = await fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage(result.message, 'success');
                contactForm.reset();
            } else {
                showMessage(result.message, 'error');
            }
        } catch (error) {
            showMessage('Error sending message. Please try again.', 'error');
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
        contactMessage.textContent = message;
        contactMessage.className = `message-response ${type}`;
        contactMessage.style.display = 'block';
        
        setTimeout(() => {
            contactMessage.style.display = 'none';
        }, 5000);
    }
});
