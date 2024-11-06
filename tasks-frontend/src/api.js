import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Регистрация
export const register = (data) => axios.post(`${API_URL}/register/`, data);

// Логин
export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login/`, data); // Убираем Authorization, так как токена еще нет
  localStorage.setItem('token', response.data.access);
  localStorage.setItem('refreshToken', response.data.refresh); // Сохраняем refresh-токен
  return response;
};



// Получение списка задач
export const fetchTasks = (token) =>
  axios.get(`${API_URL}/tasks/`, { headers: { Authorization: `Bearer ${token}` } });

// Создание новой задачи
export const addTask = (token, data) =>
  axios.post(`${API_URL}/tasks/`, data, { headers: { Authorization: `Bearer ${token}` } });

// Обновление задачи (полное или частичное обновление)
export const updateTask = (taskId, data, token) =>
  axios.patch(`${API_URL}/tasks/${taskId}/`, data, { headers: { Authorization: `Bearer ${token}` } });

// Удаление задачи
export const deleteTask = (token, taskId) =>
  axios.delete(`${API_URL}/tasks/${taskId}/`, { headers: { Authorization: `Bearer ${token}` } });
