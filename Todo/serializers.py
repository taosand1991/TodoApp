from rest_framework import serializers
from .models import *
from rest_framework_jwt.settings import api_settings

# this below code is used for obtaining token to sign in users
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


# user serializer class to make Restful API for frontend consumption
class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_style': 'password'}, write_only=True)
    token = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'username', 'password', 'password2', 'token']
        extra_kwargs = {'password': {'write_only': True}}

    # below is the function for creating and retrieving token for a user

    def get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = Profile(username=validated_data['username'])
        password = validated_data['password']
        password2 = validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'password does not match'})
        user.set_password(validated_data['password'])
        user.save()
        return user


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class TodoSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'due_date', 'priority', 'time_stamp',
                  'completed', 'author', 'category_name', 'category']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'sender', 'recipient', 'todo_item', 'time_stamp', 'message']


