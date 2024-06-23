from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager
from django.db.models.signals import post_save

class Project_Models(models.Model):
    FlightId = models.CharField(unique=True, max_length=8, null=True)
    DepartureL = models.CharField(max_length=500) 
    ArrivalL = models.CharField(max_length=500) 
    DepartureD = models.DateField()
    ArrivalD = models.DateField()

from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=100, default='John')  
    lastName = models.CharField(max_length=100, default='Doe')
    phone = models.CharField(max_length=14, default='123-456-7890')  
    is_verified = models.BooleanField(default=False)
    email_token = models.CharField(max_length=100, null=True, blank=True)
    forget_password = models.CharField(max_length=100, null=True, blank=True)
    last_login_time = models.DateTimeField(null=True, blank=True)
    last_logout_time = models.DateTimeField(null=True, blank=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def bookingManager(self):
        booking = Booking.objects.get(user=self)

class Booking(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    smtg = models.CharField(max_length=1000)
    verified = models.BooleanField(default=False)

def create_booking(sender, instance, created, **kwargs):
    if created:
        Booking.objects.create(user=instance)

def save_booking(sender, instance, created, **kwargs):
    instance.booking.save()

post_save.connect(create_booking, sender=User)
post_save.connect(save_booking, sender=User)


class FlightSearch(models.Model):
    origin_city = models.CharField(max_length=255)
    travel_city = models.CharField(max_length=255)
    depart_date = models.DateField()
    arrival_date = models.DateField()
    passengers = models.IntegerField()
    travel_class = models.CharField(max_length=50)

