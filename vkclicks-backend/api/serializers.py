from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Photographer,Booking

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=6)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already taken")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        # DON'T create Photographer here at all!
        # Store phone_number elsewhere or collect it later
        return user




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
class ForgotSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True, min_length=6)
from rest_framework import serializers
from .models import Photographer, PortfolioImage, PhotographerTeam, PhotographyPackage



class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioImage
        fields = ["id", "image", "caption"]

# Add these serializers to your existing serializers.py

class PhotographerTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotographerTeam
        fields = ['id', 'name', 'role']

class PhotographyPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotographyPackage
        fields = '__all__'

class PhotographerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photographer
        fields = [
            "id", "phone_number", "location", "bio", "type_of_photography",
            "profile_picture", "created_at"
        ]
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
    def create(self, validated_data):
        return Booking.objects.create(**validated_data)
from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'photographer', 'client_name', 'client_email', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

    def validate(self, data):
        # Check if client already reviewed this photographer
        photographer = data.get('photographer')
        client_email = data.get('client_email')
        
        if Review.objects.filter(photographer=photographer, client_email=client_email).exists():
            raise serializers.ValidationError("You have already reviewed this photographer")
        
        return data
