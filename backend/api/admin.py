from django.contrib import admin

from .models import *
class UserAdmin(admin.ModelAdmin):
    list_display = ['email']

admin.site.register(User, UserAdmin)

class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'user']

admin.site.register(Booking, BookingAdmin)
