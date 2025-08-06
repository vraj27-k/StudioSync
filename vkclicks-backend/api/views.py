from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings

from .models import Photographer, PortfolioImage, PhotographerTeam, PhotographyPackage, Booking
from .serializers import (
    SignupSerializer, LoginSerializer, PhotographerSerializer, 
    PhotographerTeamSerializer, PhotographyPackageSerializer, 
    PortfolioImageSerializer, ForgotSerializer, ResetSerializer, BookingSerializer
)

# --- Auth and Profile Views ---

class SignupView(APIView):
    permission_classes = []

    def post(self, request):
        ser = SignupSerializer(data=request.data)
        if ser.is_valid():
            user = ser.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key}, status=201)
        return Response(ser.errors, status=400)

class LoginView(APIView):
    permission_classes = []

    def post(self, request):
        ser = LoginSerializer(data=request.data)
        if ser.is_valid():
            user = authenticate(**ser.validated_data)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"token": token.key})
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

class ForgotPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        ser = ForgotSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        email = ser.validated_data["email"]
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"success": True})
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_url = f"/reset-password/{uid}/{token}/"
        return Response({"success": True, "reset_url": reset_url})

class ResetPasswordView(APIView):
    permission_classes = []

    def post(self, request):
        ser = ResetSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        try:
            uid = force_str(urlsafe_base64_decode(ser.validated_data["uid"]))
            user = User.objects.get(pk=uid)
        except (ValueError, User.DoesNotExist):
            return Response({"detail": "Invalid reset link."}, status=400)

        if not default_token_generator.check_token(user, ser.validated_data["token"]):
            return Response({"detail": "Reset link expired or invalid."}, status=400)

        user.set_password(ser.validated_data["new_password"])
        user.save()
        return Response({"message": "Password reset successful."})

class PhotographerProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            if (not photographer.bio and not photographer.location and 
                not photographer.type_of_photography and not photographer.profile_picture):
                return Response({"profile_exists": False}, status=200)
            data = PhotographerSerializer(photographer).data
            data["user"] = {
                "username": request.user.username,
                "email": request.user.email,
            }
            team_members = PhotographerTeam.objects.filter(photographer=photographer)
            data["team"] = PhotographerTeamSerializer(team_members, many=True).data
            packages = PhotographyPackage.objects.filter(photographer=photographer)
            data["packages"] = PhotographyPackageSerializer(packages, many=True).data
            return Response(data)
        except Photographer.DoesNotExist:
            return Response({"profile_exists": False}, status=200)

    def post(self, request):
        serializer = PhotographerSerializer(data=request.data)
        if serializer.is_valid():
            profile, created = Photographer.objects.update_or_create(
                user=request.user,
                defaults={**serializer.validated_data}
            )
            resp = PhotographerSerializer(profile).data
            resp["user"] = {
                "username": request.user.username,
                "email": request.user.email,
            }
            return Response(resp, status=200)
        return Response(serializer.errors, status=400)

# --- Portfolio Views ---

class PortfolioView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            portfolio_images = PortfolioImage.objects.filter(photographer=photographer)
            serializer = PortfolioImageSerializer(portfolio_images, many=True)
            return Response(serializer.data)
        except Photographer.DoesNotExist:
            return Response([])

    def post(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            serializer = PortfolioImageSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(photographer=photographer)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except Photographer.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

class PortfolioImageDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, image_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            portfolio_image = PortfolioImage.objects.get(id=image_id, photographer=photographer)
            serializer = PortfolioImageSerializer(portfolio_image, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except (Photographer.DoesNotExist, PortfolioImage.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

    def delete(self, request, image_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            portfolio_image = PortfolioImage.objects.get(id=image_id, photographer=photographer)
            portfolio_image.delete()
            return Response({"detail": "Image deleted successfully"}, status=204)
        except (Photographer.DoesNotExist, PortfolioImage.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

# --- Photographer Team Views ---

class PhotographerTeamView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            team_members = PhotographerTeam.objects.filter(photographer=photographer)
            serializer = PhotographerTeamSerializer(team_members, many=True)
            return Response(serializer.data)
        except Photographer.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

    def post(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            serializer = PhotographerTeamSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(photographer=photographer)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except Photographer.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

class PhotographerTeamDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, team_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            team_member = PhotographerTeam.objects.get(id=team_id, photographer=photographer)
            serializer = PhotographerTeamSerializer(team_member, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except (Photographer.DoesNotExist, PhotographerTeam.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

    def delete(self, request, team_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            team_member = PhotographerTeam.objects.get(id=team_id, photographer=photographer)
            team_member.delete()
            return Response({"detail": "Team member deleted successfully"}, status=204)
        except (Photographer.DoesNotExist, PhotographerTeam.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

# --- Photography Package Views ---

class PhotographyPackageView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            packages = PhotographyPackage.objects.filter(photographer=photographer)
            serializer = PhotographyPackageSerializer(packages, many=True)
            return Response(serializer.data)
        except Photographer.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

    def post(self, request):
        try:
            photographer = Photographer.objects.get(user=request.user)
            serializer = PhotographyPackageSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(photographer=photographer)
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except Photographer.DoesNotExist:
            return Response({"detail": "Profile not found"}, status=404)

class PhotographyPackageDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, package_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            package = PhotographyPackage.objects.get(id=package_id, photographer=photographer)
            serializer = PhotographyPackageSerializer(package, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except (Photographer.DoesNotExist, PhotographyPackage.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

    def delete(self, request, package_id):
        try:
            photographer = Photographer.objects.get(user=request.user)
            package = PhotographyPackage.objects.get(id=package_id, photographer=photographer)
            package.delete()
            return Response({"detail": "Package deleted successfully"}, status=204)
        except (Photographer.DoesNotExist, PhotographyPackage.DoesNotExist):
            return Response({"detail": "Not found"}, status=404)

# --- Public (No Auth) Endpoints ---

class AllPhotographersView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        photographers_data = []
        try:
            photographers = Photographer.objects.all().select_related('user').prefetch_related(
                'photographerteam_set', 'photographypackage_set'
            )
            for photographer in photographers:
                photographer_data = {
                    'id': photographer.id,
                    'user': {'username': photographer.user.username},
                    'phone_number': photographer.phone_number,
                    'location': photographer.location,
                    'bio': photographer.bio,
                    'type_of_photography': photographer.type_of_photography,
                    'profile_picture': photographer.profile_picture.url if photographer.profile_picture else None,
                    'created_at': photographer.created_at
                }
                photographer_data["team"] = [
                    {'id': t.id, 'name': t.name, 'role': t.role}
                    for t in photographer.photographerteam_set.all()
                ]
                photographer_data["packages"] = [
                    {'id': p.id, 'name': p.name, 'event_type': p.event_type, 
                    'price': str(p.price), 'description': p.description}
                    for p in photographer.photographypackage_set.all()
                ]
                photographers_data.append(photographer_data)
            return Response(photographers_data, status=200)
        except Exception as e:
            return Response(
                {"error": f"Failed to fetch photographers: {str(e)}", "data": photographers_data},
                status=500
            )

class PhotographerDetailView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, id):
        try:
            photographer = Photographer.objects.get(id=id)
            photographer_data = PhotographerSerializer(photographer).data
            photographer_data["user"] = {
                "username": photographer.user.username,
                "email": photographer.user.email,
            }
            photographer_data["team"] = [
                {'id': t.id, 'name': t.name, 'role': t.role}
                for t in photographer.photographerteam_set.all()
            ]
            photographer_data["packages"] = [
                {'id': p.id, 'name': p.name, 'event_type': p.event_type,
                 'price': str(p.price), 'description': p.description,
                 'duration': p.duration, 'delivery_time': p.delivery_time,
                 'includes': p.includes}
                for p in photographer.photographypackage_set.all()
            ]
            return Response(photographer_data, status=200)
        except Photographer.DoesNotExist:
            return Response({"error": "Photographer not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class PhotographerPortfolioView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, id):
        try:
            photographer = Photographer.objects.get(id=id)
            portfolio_images = PortfolioImage.objects.filter(photographer=photographer)
            portfolio_data = [
                {
                    'id': img.id,
                    'image': img.image.url if img.image else None,
                    'caption': img.caption,
                    'created_at': img.created_at
                }
                for img in portfolio_images
            ]
            return Response(portfolio_data, status=200)
        except Photographer.DoesNotExist:
            return Response({"error": "Photographer not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)

# --- Booking View (PUBLIC) ---

from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Photographer, PhotographyPackage
from .serializers import BookingSerializer

class BookingView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        try:
            booking_data = request.data.copy()
            photographer_id = booking_data.get('photographer_id') or booking_data.get('photographerId')
            if not photographer_id:
                return Response({'error': 'Photographer ID is required'}, status=400)
            try:
                photographer = Photographer.objects.get(id=photographer_id)
                booking_data['photographer'] = photographer.id
            except Photographer.DoesNotExist:
                return Response({'error': 'Photographer not found'}, status=404)
            package_id = booking_data.get('package_id') or booking_data.get('packageId')
            if package_id:
                try:
                    package = PhotographyPackage.objects.get(id=package_id)
                    booking_data['package'] = package.id
                except PhotographyPackage.DoesNotExist:
                    booking_data['package'] = None
            for field in ['photographerId', 'packageId']:
                booking_data.pop(field, None)
            serializer = BookingSerializer(data=booking_data)
            if serializer.is_valid():
                booking = serializer.save()
                
                # ---- BEGIN email sending block ---
                try:
                    subject = f"New Booking via VK Clicks - {booking.client_name}"
                    message = f"""
Hi {photographer.user.first_name or photographer.user.username},

You have a new booking on VK Clicks!

CLIENT DETAILS:
- Name: {booking.client_name}
- Phone: {booking.client_phone}
- Email: {booking.client_email}

EVENT:
- Date: {booking.event_date}
- Time: {booking.event_time}
- Location: {booking.event_location}
- Event Type: {booking.event_type}

PACKAGE:
- {booking.package.name if booking.package else 'Custom'}
- Price: ₹{booking.package.price if booking.package else 'To be discussed'}

Special Requests: {booking.special_requests or 'None'}

Please log in to VK Clicks for more details or to confirm the booking.

Best,
VK Clicks Team
""".strip()
                    send_mail(
                        subject,
                        message,
                        settings.DEFAULT_FROM_EMAIL,
                        [photographer.user.email],
                        fail_silently=False,
                    )
                except Exception as email_exc:
                    # You may want to log this error in production!
                    pass
                # ----- END email sending block ----
                
                return Response({
                    'message': 'Booking request submitted successfully!',
                    'booking_id': booking.id,
                    'status': 'pending'
                }, status=201)
            else:
                return Response({
                    'error': 'Invalid booking data',
                    'details': serializer.errors
                }, status=400)
        except Exception as e:
            return Response({
                'error': f'Failed to process booking: {str(e)}'
            }, status=500)
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404
from .models import Review, Photographer
from .serializers import ReviewSerializer
import logging

logger = logging.getLogger(__name__)

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    authentication_classes = []  # ✅ Remove authentication completely
    permission_classes = [AllowAny]  # ✅ Explicitly allow anonymous access
    
    def get_queryset(self):
        photographer_id = self.kwargs.get('photographer_id')
        return Review.objects.filter(photographer_id=photographer_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        photographer_id = self.kwargs.get('photographer_id')
        client_email = serializer.validated_data.get('client_email')
        
        try:
            # Check if existing review exists for this photographer and client_email
            existing_review = Review.objects.filter(
                photographer_id=photographer_id, 
                client_email=client_email
            ).first()
            
            if existing_review:
                # Update existing review instead of creating new one
                for attr, value in serializer.validated_data.items():
                    setattr(existing_review, attr, value)
                existing_review.save()
                
                # Set the serializer instance to the updated review
                serializer.instance = existing_review
                logger.info(f"Review updated for photographer {photographer_id} by client {client_email}")
            else:
                # Create new review
                photographer = get_object_or_404(Photographer, id=photographer_id)
                serializer.save(photographer=photographer)
                logger.info(f"Review created for photographer {photographer_id} by client {client_email}")
                
        except Exception as e:
            logger.error(f"Error creating/updating review for photographer {photographer_id}, client {client_email}: {str(e)}")
            raise

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    authentication_classes = []  # ✅ Remove authentication
    permission_classes = [AllowAny]  # ✅ Explicitly allow anonymous access

@api_view(['GET'])
@permission_classes([AllowAny])  # ✅ Fix 401 error - allow anonymous access
def photographer_reviews_summary(request, photographer_id):
    """Get comprehensive review summary for a photographer"""
    try:
        photographer = get_object_or_404(Photographer, id=photographer_id)
        reviews = Review.objects.filter(photographer=photographer)
        
        # Calculate summary statistics
        summary = reviews.aggregate(
            average_rating=Avg('rating'),
            total_reviews=Count('id')
        )
        
        # Enhanced rating distribution with percentages
        rating_distribution = {}
        total_reviews = summary['total_reviews'] or 0
        
        for i in range(1, 6):
            count = reviews.filter(rating=i).count()
            percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
            rating_distribution[f'{i}_star'] = {
                'count': count,
                'percentage': round(percentage, 1)
            }
        
        # Get recent reviews (limit to 5 most recent)
        recent_reviews = ReviewSerializer(
            reviews.order_by('-created_at')[:5], 
            many=True
        ).data
        
        # Calculate rating trends (optional enhancement)
        rating_breakdown = {
            'excellent': reviews.filter(rating=5).count(),
            'very_good': reviews.filter(rating=4).count(), 
            'good': reviews.filter(rating=3).count(),
            'fair': reviews.filter(rating=2).count(),
            'poor': reviews.filter(rating=1).count()
        }
        
        return Response({
            'photographer_id': photographer_id,
            'photographer_name': photographer.user.username,
            'photographer_email': photographer.user.email,
            'average_rating': round(summary['average_rating'] or 0, 2),
            'total_reviews': total_reviews,
            'rating_distribution': rating_distribution,
            'rating_breakdown': rating_breakdown,
            'recent_reviews': recent_reviews,
            'has_reviews': total_reviews > 0
        }, status=status.HTTP_200_OK)
        
    except Photographer.DoesNotExist:
        logger.warning(f"Photographer {photographer_id} not found")
        return Response({
            'error': 'Photographer not found'
        }, status=status.HTTP_404_NOT_FOUND)
        
    except Exception as e:
        logger.error(f"Error fetching review summary for photographer {photographer_id}: {str(e)}")
        return Response({
            'error': f'An error occurred while fetching reviews: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([AllowAny])  # ✅ Fix 401 error - allow anonymous access
def photographer_all_reviews(request, photographer_id):
    """Get all reviews for a photographer with pagination"""
    try:
        photographer = get_object_or_404(Photographer, id=photographer_id)
        reviews = Review.objects.filter(photographer=photographer).order_by('-created_at')
        
        # Simple pagination (you can enhance this with Django's Paginator)
        page_size = 10
        page = int(request.GET.get('page', 1))
        start = (page - 1) * page_size
        end = start + page_size
        
        paginated_reviews = reviews[start:end]
        serialized_reviews = ReviewSerializer(paginated_reviews, many=True).data
        
        return Response({
            'reviews': serialized_reviews,
            'total_reviews': reviews.count(),
            'page': page,
            'has_next': end < reviews.count(),
            'has_previous': page > 1
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error fetching all reviews for photographer {photographer_id}: {str(e)}")
        return Response({
            'error': f'Error fetching reviews: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# ✅ NEW: Single endpoint for photographers with reviews (performance optimization)
@api_view(['GET'])
@permission_classes([AllowAny])
def photographers_with_reviews_summary(request):
    """Get all photographers with their review summaries in one call"""
    try:
        photographers = Photographer.objects.all()
        result = []
        
        for photographer in photographers:
            reviews = Review.objects.filter(photographer=photographer)
            review_summary = reviews.aggregate(
                average_rating=Avg('rating'),
                total_reviews=Count('id')
            )
            
            # Serialize photographer data
            photographer_data = {
                'id': photographer.id,
                'user': {
                    'username': photographer.user.username,
                    'email': photographer.user.email
                },
                'bio': photographer.bio,
                'specialization': photographer.specialization,
                'location': photographer.location,
                'type_of_photography': photographer.type_of_photography,
                'phone_number': photographer.phone_number,
                'profile_picture': photographer.profile_picture.url if photographer.profile_picture else None,
                'packages': [
                    {
                        'name': pkg.name,
                        'price': str(pkg.price),
                        'description': pkg.description
                    } for pkg in photographer.packages.all()
                ] if hasattr(photographer, 'packages') else [],
                # Include review summary directly
                'average_rating': round(review_summary['average_rating'] or 0, 1),
                'total_reviews': review_summary['total_reviews'] or 0
            }
            result.append(photographer_data)
            
        return Response(result, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Error fetching photographers with reviews: {str(e)}")
        return Response({
            'error': f'Error fetching photographers: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
