from django.shortcuts import render
from rest_framework.authentication import SessionAuthentication
from django.contrib.auth import get_user_model, login, logout
from rest_framework import viewsets, permissions, status
from .serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from .validations import *
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view
from django.http import JsonResponse

from rest_framework.authentication import SessionAuthentication
from .validations import custom_validation, validate_email, validate_password


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

# class ProjectViewSet(viewsets.ViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = Project_Models.objects.all()
#     serializers_class = ProjectSerializers

#     def list(self, request):
#         queryset = self.queryset
#         serializer = self.serializers_class(queryset, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = self.serializers_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         else:
#             return Response(serializer.errors, status=400)

#     def retrieve(self, request, pk=None):
#         try:
#             project = self.queryset.get(pk=pk)
#             serializer = self.serializers_class(project)
#             return Response(serializer.data)
#         except Project_Models.DoesNotExist:
#             return Response({"detail": "Project not found."}, status=404)

#     def update(self, request, pk=None):
#         try:
#             project = self.queryset.get(pk=pk)
#             serializer = self.serializers_class(project, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             else:
#                 return Response(serializer.errors, status=400)
#         except Project_Models.DoesNotExist:
#             return Response({"detail": "Project not found."}, status=404)

#     def destroy(self, request, pk=None):
#         try:
#             project = self.queryset.get(pk=pk)
#             project.delete()
#             return Response(status=204)
#         except Project_Models.DoesNotExist:
#             return Response({"detail": "Project not found."}, status=404)
