from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.tokens import Token
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'password']

class UserToken(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user) -> Token:
        token = super().get_token(user)

        token['smtg'] = user.booking.smtg
        token['full_name'] = user.booking.full_name

        return token


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True, validators = [validate_password])
    password2 = serializers.CharField(write_only = True, required = True)
    full_name = serializers.CharField(write_only = True, required = True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password':"Password Fields Didn't Match"}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])

        user.save()

        if "full_name" in validated_data:
            user.booking.full_name = validated_data['full_name']
            user.booking.save()

        return user

# class FlightSearchSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FlightSearch
#         fields = '__all__'