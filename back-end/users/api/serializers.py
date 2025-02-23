from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('user_name', 'email_address', 'role', 'password')

    def create(self, validated_data):
        user = User(
            user_name=validated_data['user_name'],
            email_address=validated_data['email_address'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user