from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('user_name', 'email', 'role', 'password')

    def create(self, validated_data):
        user = User(
            user_name=validated_data['user_name'],
            email=validated_data['email'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'email', 'role')

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_name', 'email', 'role')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['user'] = {
        #     'user_name' :user.user_name,
        #     'email': user.email,
        #     'name': user.name,
        #     'role': user.role
        #     }
        
        token['user_name'] = user.user_name
        token['name']  = user.name
        token['email']  = user.email
        token['role']  = user.role
        return token
    
