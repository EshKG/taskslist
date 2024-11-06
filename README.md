
# taskslist

taskslist — приложение для управления списком задач с использованием Django для бэкенда и React для фронтенда.

## Стек технологий
- **Backend**: Django, Django REST Framework, Simple JWT
- **Frontend**: React

## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/yourusername/taskslist.git
cd taskslist
```

### 2. Настройка бэкенда (Django)

#### Установка зависимостей
```bash
pip install -r requirements.txt
```

#### Запуск сервера
Перейдите в папку `backend` и запустите сервер:
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

### 3. Настройка фронтенда (React)

#### Установка зависимостей
Перейдите в папку `frontend` и установите зависимости:
```bash
cd ../frontend
npm install
```

#### Запуск фронтенда
Запустите React-сервер разработки:
```bash
npm start
```

## API и аутентификация
Приложение поддерживает аутентификацию с помощью JWT, предоставленную пакетом `djangorestframework-simplejwt`.

## Комментарии и структура кода
Код проекта снабжен комментариями и имеет четкую структуру, обеспечивающую простоту в поддержке и расширении.

