from django.contrib import admin

from .models import *
class UserAdmin(admin.ModelAdmin):
    list_display = ['email']

admin.site.register(User, UserAdmin)

class BookingAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['full_name', 'user', 'verified']

admin.site.register(Booking, BookingAdmin)
