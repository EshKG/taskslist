import React, { useState } from 'react'; // Импортируем необходимые зависимости
import { register } from '../api'; // Импортируем функцию для регистрации из API

function Register() {
    const [username, setUsername] = useState(''); // Состояние для имени пользователя
    const [password, setPassword] = useState(''); // Состояние для пароля

    // Обработчик события регистрации
    const handleRegister = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        try {
            await register({ username, password }); // Вызываем функцию регистрации с введёнными данными
            alert('Registration successful'); // Уведомляем о успешной регистрации
        } catch (error) {
            console.error('Registration failed', error); // Логируем ошибку регистрации в консоль
        }
    };

    return (
        <form onSubmit={handleRegister}> {/* Обработчик отправки формы */}
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
            <button type="submit">Register</button> {/* Кнопка для отправки формы регистрации */}
        </form>
    );
}

export default Register; // Экспортируем компонент регистрации
