from django.db import models
from django.contrib.auth.models import User

class Photographer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    location = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    bio = models.TextField(blank=True)
    type_of_photography = models.CharField(max_length=200, blank=True)  # e.g., "Birthday,Wedding"
    created_at = models.DateTimeField(auto_now_add=True)  # Add this field

class PortfolioImage(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='portfolio/')
    caption = models.CharField(max_length=200, blank=True)
    
    # Add this field if you want it in admin
    created_at = models.DateTimeField(auto_now_add=True)
class PhotographerTeam(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    role = models.CharField(max_length=80, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Add this field


class PhotographyPackage(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    event_type = models.CharField(max_length=80)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Add this field

    
    # Add these fields if you want them in admin
    duration = models.IntegerField(default=1, help_text="Duration in hours")
    delivery_time = models.IntegerField(default=7, help_text="Delivery time in days")
    includes = models.TextField(blank=True)
from django.db import models
from django.contrib.auth.models import User

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    photographer = models.ForeignKey(Photographer, on_delete=models.CASCADE)
    package = models.ForeignKey(PhotographyPackage, on_delete=models.CASCADE, null=True, blank=True)
    client_name = models.CharField(max_length=100)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=15)
    event_date = models.DateField()
    event_time = models.TimeField()
    event_location = models.TextField()
    event_type = models.CharField(max_length=100, blank=True)
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.client_name} - {self.event_date}"

class Review(models.Model):
    photographer = models.ForeignKey(Photographer, on_delete=models.CASCADE, related_name='reviews')
    client_name = models.CharField(max_length=100)
    client_email = models.EmailField()
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 6)],  # 1 to 5 stars
        help_text="Rating from 1 to 5 stars"
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    booking = models.ForeignKey('Booking', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['photographer', 'client_email']  # One review per client per photographer

    def __str__(self):
        return f"{self.client_name} - {self.rating} stars for {self.photographer.user.username}"

