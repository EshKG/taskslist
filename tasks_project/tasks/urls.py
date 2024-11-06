from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, TaskListCreateView, TaskDetailView

# Определение URL-маршрутов для API
urlpatterns = [
    # Регистрация нового пользователя
    path('register/', RegisterView.as_view(), name='register'),

    # Получение JWT-токена (логин). TokenObtainPairView возвращает пару токенов — access и refresh
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Обновление JWT-токена. TokenRefreshView используется для получения нового access-токена по refresh-токену
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Просмотр списка задач или создание новой задачи
    path('tasks/', TaskListCreateView.as_view(), name='task_list_create'),

    # Получение, обновление или удаление конкретной задачи по её id (pk — первичный ключ)
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task_detail'),
]
