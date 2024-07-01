from django.urls import path,include
from . import views
from .views import *  
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenRefreshView)

router = DefaultRouter()
# router.register('Project',ProjectViewSet,basename='project')
# urlpatterns = router.urls


urlpatterns = [
	# path('register', views.UserRegister.as_view(), name='register'),
	# path('login', views.UserLogin.as_view(), name='login'),
	# path('logout', views.UserLogout.as_view(), name='logout'),
	# path('user', views.UserView.as_view(), name='user'),
    path('getflight', get_aircraft, name='get_aircraft'),
    path('gethotel', SkyscannerHotelSearch, name='gethotel'),
    path('token', views.UserLogin.as_view(),name="token-obtain"),
    path('token/refresh', TokenRefreshView.as_view(), name="refresh-token"),
    path('register', views.RegisterView.as_view(), name="register-user"),
    path('test', views.protectedView, name="test"),
    path('profile', views.profileInfo, name="profileInfo"),
    path('profile2', views.UserProfileUpdate, name="profile2"),


]