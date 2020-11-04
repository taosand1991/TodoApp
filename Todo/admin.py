from django.contrib import admin
from .models import *

# register your models to the django admin, optional if you are not using the admin panel
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Todo)
