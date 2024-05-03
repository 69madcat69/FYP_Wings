from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

class Project_Models(models.Model):
    FlightId = models.CharField(unique=True, max_length=8, null=True)
    DepartureL = models.CharField(max_length=500) 
    ArrivalL = models.CharField(max_length=500) 
    DepartureD = models.DateField()
    ArrivalD = models.DateField()
    
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    phone = models.CharField(max_length=14)
    is_verified = models.BooleanField(default=False)
    email_token = models.CharField(max_length=100,null=True,blank=True)
    forget_password = models.CharField( max_length=100,null=True,blank=True)
    last_login_time = models.DateTimeField( null=True,blank=True)
    last_logout_time = models.DateTimeField( null=True,blank=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []