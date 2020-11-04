
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = Profile.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        return Todo.objects.filter(author=self.request.user)


@api_view(['POST'])
def create_notification(request, todo):
    recipient = request.data['username']
    end_user = Profile.objects.filter(username=recipient)[0]
    sender = request.user
    todo_object = Todo.objects.get(pk=todo)
    message = f'{sender} has shared a todo file with you, kindly take a look'
    Notification.objects.create(
        recipient=end_user,
        sender=sender,
        todo_item=todo_object,
        message=message
    )
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_notifications(request):
    queryset = Notification.objects.filter(recipient=request.user)
    serializer = NotificationSerializer(queryset, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)