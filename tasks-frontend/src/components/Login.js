import React, { useState } from 'react'; // Импортируем необходимые зависимости
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import { login } from '../api'; // Импортируем функцию для логина из API

const Login = () => {
  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Получаем функцию навигации

  // Обработчик события логина
  const handleLogin = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    try {
      const response = await login({ username, password }); // Вызываем функцию логина с введёнными данными
      localStorage.setItem('token', response.data.access); // Сохраняем токен в localStorage
      alert('Login successful!'); // Уведомляем о успешном входе
      console.log(response.data.access); // Логируем токен в консоль
      navigate('/tasks'); // Переходим на страницу задач
    } catch (error) {
      console.error('Login failed:', error); // Логируем ошибку в консоль
      alert('Login failed, please try again.'); // Уведомляем о неудачном входе
    }
  };

  return (
    <form onSubmit={handleLogin}> {/* Обработчик отправки формы */}
      <input
        type="text"
        placeholder="Username" // Подсказка для ввода имени пользователя
        value={username} // Значение поля ввода имени пользователя
        onChange={(e) => setUsername(e.target.value)} // Обновляем состояние при вводе
      />
      <input
        type="password"
        placeholder="Password" // Подсказка для ввода пароля
        value={password} // Значение поля ввода пароля
        onChange={(e) => setPassword(e.target.value)} // Обновляем состояние при вводе
      />
      <button type="submit">Login</button> {/* Кнопка для отправки формы логина */}
    </form>
  );
};

export default Login; // Экспортируем компонент логина
