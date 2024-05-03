from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User
UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.CharField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(email=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'password')