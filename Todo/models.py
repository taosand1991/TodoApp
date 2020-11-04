from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class Profile(AbstractUser):
    username = models.CharField(max_length=100, unique=True)

    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Todo(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=500, unique=True)
    description = models.TextField()
    time_stamp = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=50, blank=True, null=True)
    category = models.ForeignKey(Category, related_name='categories', on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    due_date = models.DateTimeField()


class Notification(models.Model):
    sender = models.ForeignKey(Profile,  on_delete=models.CASCADE)
    recipient = models.ForeignKey(Profile, related_name='recipients',  on_delete=models.CASCADE)
    todo_item = models.ForeignKey(Todo, on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=500)

    def __str__(self):
        return self.id

