from django.urls import path
from .views import SignupView, LoginView,ForgotPasswordView,BookingView,PhotographerPortfolioView, ResetPasswordView,PhotographerProfileView,PortfolioView,PortfolioImageDetailView,PhotographerTeamView,PhotographyPackageView,PhotographerTeamDetailView,PhotographyPackageDetailView,AllPhotographersView,PhotographerDetailView
from . import views
urlpatterns = [
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path("auth/forgot/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("auth/reset/", ResetPasswordView.as_view(), name="reset-password"),
    path('photographer/profile/', PhotographerProfileView.as_view()),
    path('photographer/portfolio/', PortfolioView.as_view(), name='portfolio'),
    path('photographer/portfolio/<int:image_id>/', PortfolioImageDetailView.as_view(), name='portfolio-detail'),
    path('photographer/team/', PhotographerTeamView.as_view(), name='photographer-team'),
    path('photographer/packages/', PhotographyPackageView.as_view(), name='photographer-packages'),
    path('photographer/team/<int:team_id>/', PhotographerTeamDetailView.as_view()),
    path('photographer/packages/<int:package_id>/', PhotographyPackageDetailView.as_view()),
    path('photographer/all/', AllPhotographersView.as_view(), name='all-photographers'),
    path('photographer/<int:id>/', PhotographerDetailView.as_view(), name='photographer-detail'),
    path('photographer/<int:id>/portfolio/', PhotographerPortfolioView.as_view(), name='photographer-portfolio'),
    path('bookings/', BookingView.as_view(), name='create-booking'),
    path('photographer/<int:photographer_id>/reviews/', views.ReviewListCreateView.as_view(), name='photographer-reviews'),
    path('photographer/<int:photographer_id>/reviews/summary/', views.photographer_reviews_summary, name='photographer-reviews-summary'),
    path('reviews/<int:pk>/', views.ReviewDetailView.as_view(), name='review-detail'),
]

