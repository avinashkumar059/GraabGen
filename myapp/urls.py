from django.urls import path
from .import views

urlpatterns = [
    path('home/',views.home,name='home'),
    path('',views.home,name='home'),
    path('about/',views.about,name='about'),
    path('team/',views.team,name='team'),
    path('choose/',views.choose,name='choose'),
    path('contact/',views.contact,name='contact'),
    path('service/',views.service,name='service'),
    path('review/',views.review,name='review'),
    
    # API endpoints for form submissions
    path('api/contact/', views.submit_contact, name='submit_contact'),
    path('api/review/', views.submit_review, name='submit_review'),
    path('api/reviews/', views.get_reviews, name='get_reviews'),
]