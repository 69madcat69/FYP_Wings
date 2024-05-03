from django.urls import path,include
from . import views
from .views import *  
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
# router.register('Project',ProjectViewSet,basename='project')
# urlpatterns = router.urls


urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
]