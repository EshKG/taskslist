# views.py
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Task
from .serializers import TaskSerializer, UserSerializer

# Регистрация пользователя
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Получение списка задач и создание новой задачи
class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Возвращает задачи, принадлежащие текущему пользователю
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Устанавливаем владельца задачи как текущего пользователя
        serializer.save(owner=self.request.user)

# Получение, обновление и удаление конкретной задачи
class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Даем доступ только к задачам текущего пользователя
        return Task.objects.filter(owner=self.request.user)
