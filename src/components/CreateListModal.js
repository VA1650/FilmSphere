// src/components/CreateListModal.js

import React, { useState } from 'react';
import './CreateListModal.css';

function CreateListModal({ isOpen, onClose, onListCreated, currentUserId }) {
    const [listTitle, setListTitle] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!listTitle.trim()) {
            alert('Введите название списка.');
            return;
        }

        // POST запрос к API для создания списка
        fetch('http://localhost:5000/api/lists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: currentUserId,
                title: listTitle.trim()
            })
        })
        .then(res => {
            if (!res.ok) throw new Error('Не удалось создать список');
            return res.json();
        })
        .then(data => {
            alert(`Список "${listTitle}" успешно создан!`);
            onListCreated(data.list_id, data.title); // Вызываем функцию обновления
            setListTitle('');
            onClose();
        })
        .catch(err => {
            console.error('Ошибка создания списка:', err);
            alert('Ошибка при создании списка.');
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Создать новый список</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Название списка..." 
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        className="modal-input"
                        autoFocus
                    />
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Отмена</button>
                        <button type="submit" className="create-btn">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateListModal;