from django.urls import path
from .views import UserRegistrationView, UserListView , UserDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairView

urlpatterns = [
    # users
    path('', UserListView.as_view(), name='user-list'),
    
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    
    # for Jwt authentication
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]