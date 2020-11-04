from rest_framework import routers
from .views import UserViewSet, CategoryViewSet, TodoViewSet, create_notification, get_notifications
from django.urls import path


router = routers.DefaultRouter()

router.register('users', UserViewSet, basename='user')
router.register('categories', CategoryViewSet, basename='category')
router.register('todos', TodoViewSet, basename='todos')


urlpatterns = router.urls


urlpatterns += [
    path('notifications/<int:todo>/', create_notification, name='notification'),
    path('notifications/', get_notifications, name='notification'),
]