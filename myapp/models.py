from django.db import models
from mongoengine import Document, fields
from datetime import datetime

# MongoDB Models using MongoEngine

class Contact(Document):
    name = fields.StringField(required=True, max_length=100)
    email = fields.EmailField(required=True)
    message = fields.StringField(required=True)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'contacts',
        'ordering': ['-created_at']
    }
    
    def __str__(self):
        return f"{self.name} - {self.email}"

class Review(Document):
    reviewer_name = fields.StringField(required=True, max_length=100)
    rating = fields.IntField(required=True, min_value=1, max_value=5)
    review_text = fields.StringField(required=True)
    created_at = fields.DateTimeField(default=datetime.utcnow)
    
    meta = {
        'collection': 'reviews',
        'ordering': ['-created_at']
    }
    
    def __str__(self):
        return f"{self.reviewer_name} - {self.rating} stars"
