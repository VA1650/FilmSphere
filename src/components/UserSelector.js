import React, { useState, useEffect } from 'react';
import '../App.css'; // Используем стили из App.css (там был .user-select-container)

function UserSelector({ onUserSelect }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        // Загружаем пользователей при запуске
        fetch('http://localhost:5000/api/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                if (data.length > 0) {
                    // Выбираем первого по умолчанию
                    setSelectedUserId(data[0].user_id);
                    onUserSelect(data[0].user_id);
                }
            })
            .catch(err => console.error('Ошибка загрузки пользователей:', err));
    }, [onUserSelect]);

    const handleChange = (e) => {
        const newId = Number(e.target.value);
        setSelectedUserId(newId);
        onUserSelect(newId);
    };

    return (
        <div className="user-select-container">
            <label htmlFor="user-select">Пользователь: </label>
            <select id="user-select" value={selectedUserId} onChange={handleChange}>
                {users.map(user => (
                    <option key={user.user_id} value={user.user_id}>
                        {user.username}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default UserSelector;