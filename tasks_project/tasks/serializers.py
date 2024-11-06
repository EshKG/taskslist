# serializers.py
from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

# Сериализатор для задачи (Task), который определяет, какие поля будут передаваться через API
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'owner']  # Поля, которые будут видны в API
        read_only_fields = ['owner']  # Поле 'owner' доступно только для чтения и не может быть изменено через API

# Сериализатор для пользователя (User), чтобы можно было создавать и управлять пользователями через API
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Поля, которые будут видны и доступны в API
        extra_kwargs = {'password': {'write_only': True}}  # Настройка, чтобы пароль был только для записи (не возвращается в ответе API)

    # Метод для создания нового пользователя
    def create(self, validated_data):
        # Создаем нового пользователя через метод create_user, который автоматически хеширует пароль
        user = User.objects.create_user(**validated_data)
        return user
