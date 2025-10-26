from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib import messages
import json
from .models import Contact, Review
from .mongodb_connection import connect_to_mongodb
from datetime import datetime

# Create your views here.
def index(request):
    return render(request, 'index.html')

def home(request):
    return render(request,"home.html")

def about(request):
    return render(request,"about.html")

def team(request):
    return render(request,"team.html")

def choose(request):
    return render(request,"choose.html")

def contact(request):
    # Connect to MongoDB
    connect_to_mongodb()
    
    # Get recent contacts for display (optional)
    recent_contacts = Contact.objects.order_by('-created_at')[:5]
    
    context = {
        'recent_contacts': recent_contacts
    }
    return render(request, "contact.html", context)

def service(request):
    return render(request,"service.html") 

def review(request):
    # Connect to MongoDB
    connect_to_mongodb()
    
    # Get reviews and calculate stats
    reviews = Review.objects.order_by('-created_at')
    total_reviews = reviews.count()
    
    if total_reviews > 0:
        average_rating = sum([review.rating for review in reviews]) / total_reviews
        average_rating = round(average_rating, 1)
    else:
        average_rating = 0
    
    context = {
        'reviews': reviews[:10],  # Show latest 10 reviews
        'total_reviews': total_reviews,
        'average_rating': average_rating,
    }
    return render(request, "review.html", context)

@csrf_exempt
@require_http_methods(["POST"])
def submit_contact(request):
    """Handle contact form submission"""
    try:
        # Connect to MongoDB
        connect_to_mongodb()
        
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not name or not email or not message:
            return JsonResponse({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        # Create and save contact
        contact = Contact(
            name=name,
            email=email,
            message=message
        )
        contact.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Thank you for your message! We will get back to you soon.'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error saving contact: {str(e)}'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def submit_review(request):
    """Handle review form submission"""
    try:
        # Connect to MongoDB
        connect_to_mongodb()
        
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate required fields
        reviewer_name = data.get('reviewerName', '').strip()
        rating = data.get('rating')
        review_text = data.get('reviewText', '').strip()
        
        if not reviewer_name or not rating or not review_text:
            return JsonResponse({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        # Validate rating
        try:
            rating = int(rating)
            if rating < 1 or rating > 5:
                raise ValueError("Rating must be between 1 and 5")
        except (ValueError, TypeError):
            return JsonResponse({
                'success': False,
                'message': 'Rating must be a number between 1 and 5'
            }, status=400)
        
        # Create and save review
        review = Review(
            reviewer_name=reviewer_name,
            rating=rating,
            review_text=review_text
        )
        review.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Thank you for your review!'
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error saving review: {str(e)}'
        }, status=500)

@require_http_methods(["GET"])
def get_reviews(request):
    """Get reviews for display"""
    try:
        # Connect to MongoDB
        connect_to_mongodb()
        
        # Get reviews
        reviews = Review.objects.order_by('-created_at')
        
        # Convert to list for JSON serialization
        reviews_data = []
        for review in reviews:
            reviews_data.append({
                'id': str(review.id),
                'reviewer_name': review.reviewer_name,
                'rating': review.rating,
                'review_text': review.review_text,
                'created_at': review.created_at.strftime('%B %d, %Y')
            })
        
        return JsonResponse({
            'success': True,
            'reviews': reviews_data
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': f'Error fetching reviews: {str(e)}'
        }, status=500)  