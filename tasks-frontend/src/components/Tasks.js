import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api';

function Tasks() {
    const [tasks, setTasks] = useState([]); // Хранит список задач
    const [statusFilter, setStatusFilter] = useState('all'); // Фильтр по статусу задач
    const [errorMessage, setErrorMessage] = useState(null); // Сообщения об ошибках
    const [newTaskTitle, setNewTaskTitle] = useState(''); // Название новой задачи
    const [newTaskDescription, setNewTaskDescription] = useState(null); // Статус новой задачи (по умолчанию - в процессе)
    const [newTaskStatus, setNewTaskStatus] = useState(false); // Статус новой задачи (по умолчанию - в процессе)
    const [editingTask, setEditingTask] = useState(null); // Задача, которая редактируется
    const token = localStorage.getItem('token'); // Получаем токен из localStorage

    // Используем useEffect для загрузки задач при монтировании компонента
    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await fetchTasks(token); // Запрашиваем задачи из API
                setTasks(response.data); // Сохраняем задачи в состоянии
                setErrorMessage(null); // Очищаем сообщение об ошибках
            } catch (error) {
                console.error('Error fetching tasks', error); // Логируем ошибку в консоль
                setErrorMessage('Не удалось загрузить задачи. Попробуйте снова.'); // Устанавливаем сообщение об ошибке
            }
        };
        getTasks(); // Вызываем функцию для загрузки задач
    }, [token]); // Зависимость от токена, чтобы обновить задачи при его изменении

    // Обработчик добавления новой задачи
    const handleAddTask = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        if (!newTaskTitle.trim()) return; // Если название пустое, ничего не делаем
        try {
            const response = await addTask(token, { title: newTaskTitle, description: newTaskDescription, status: newTaskStatus }); // Добавляем задачу
            setTasks([...tasks, response.data]); // Обновляем список задач
            setNewTaskTitle(''); // Очищаем поле ввода названия задачи
            setNewTaskStatus(false); // Сбрасываем статус новой задачи на "в процессе"
            setNewTaskDescription(''); // Очищаем поле ввода описания задачи
        } catch (error) {
            console.error('Error adding task', error); // Логируем ошибку в консоль
            setErrorMessage('Ошибка при добавлении задачи.'); // Устанавливаем сообщение об ошибке
        }
    };

    // Обработчик выбора задачи для редактирования
    const handleEditTask = (task) => {
        setEditingTask(task); // Устанавливаем задачу для редактирования
    };

    // Обработчик обновления задачи
    const handleUpdateTask = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        try {
            const response = await updateTask(editingTask.id, {
                title: editingTask.title,
                status: editingTask.status
            }, token); // Обновляем задачу через API

            setTasks(tasks.map(task =>
                task.id === editingTask.id ? response.data : task // Обновляем список задач с новой информацией
            ));

            setEditingTask(null); // Сбрасываем состояние редактирования
            setErrorMessage(null); // Очищаем сообщения об ошибках
        } catch (error) {
            console.error('Error updating task:', error); // Логируем ошибку в консоль
            setErrorMessage('Ошибка при обновлении задачи.'); // Устанавливаем сообщение об ошибке
        }
    };

    // Обработчик удаления задачи
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(token, taskId); // Удаляем задачу через API
            setTasks(tasks.filter(task => task.id !== taskId)); // Обновляем список задач, исключая удалённую
        } catch (error) {
            console.error('Error deleting task', error); // Логируем ошибку в консоль
            setErrorMessage('Ошибка при удалении задачи.'); // Устанавливаем сообщение об ошибке
        }
    };

    // Фильтруем задачи по статусу
    const filteredTasks = tasks.filter(task => {
        if (statusFilter === 'completed') return task.status === true; // Выполненные задачи
        if (statusFilter === 'pending') return task.status === false; // Задачи невыполненные
        return true; // Все задачи
    });

    return (
        <div>
            <h1>Tasks</h1>
            {errorMessage && <div className="error">{errorMessage}</div>} {/* Показываем сообщение об ошибке, если оно есть */}

            {/* Фильтр задач по статусу */}
            <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                <option value="all">Все</option>
                <option value="completed">Выполненные</option>
                <option value="pending">Не выполненные</option>
            </select>

            <ul>
                {/* Отображаем отфильтрованные задачи */}
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        Название: {task.title} ({task.status ? 'Выполнено' : 'Не выполнено'}) {/* Показываем статус задачи */}
                        Описание: {task.description ? task.description : '-'}  {/* Показываем статус задачи */}

                        <button onClick={() => handleEditTask(task)}>Редактировать</button>
                        <button onClick={() => handleDeleteTask(task.id)}>Удалить</button>
                    </li>
                ))}
            </ul>

            {/* Форма для добавления задачи */}
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Новая задача"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)} // Обновляем название новой задачи
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)} // Обновляем название новой задачи
                />
                <select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value === 'true')}>
                    <option value="false">Не выполнено</option>
                    <option value="true">Выполнено</option>
                </select>
                <button type="submit">Добавить задачу</button>
            </form>

            {/* Форма для редактирования задачи */}
            {editingTask && (
                <form onSubmit={handleUpdateTask}>
                    <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} // Обновляем название редактируемой задачи
                    />
                    <select
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value === 'true' })} // Обновляем статус редактируемой задачи
                    >
                        <option value="false">Не выполнено</option>
                        <option value="true">Выполнено</option>
                    </select>
                    <button type="submit">Сохранить изменения</button>
                    <button type="button" onClick={() => setEditingTask(null)}>Отмена</button> {/* Сбрасываем редактирование */}
                </form>
            )}
        </div>
    );
}

export default Tasks; // Экспортируем компонент
