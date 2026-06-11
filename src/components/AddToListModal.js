import React, { useEffect, useState } from 'react';
import './AddToListModal.css';

function AddToListModal({ isOpen, onClose, userId, filmId }) {
    const [myLists, setMyLists] = useState([]);

    // Загружаем списки конкретного пользователя при открытии
    useEffect(() => {
        if (isOpen && userId) {
            fetch('http://localhost:5000/api/lists')
                .then(res => res.json())
                .then(data => {
                    // Фильтруем, оставляем только списки текущего пользователя
                    const userLists = data.filter(list => list.user_id === userId);
                    setMyLists(userLists);
                })
                .catch(err => console.error(err));
        }
    }, [isOpen, userId]);

    const handleAdd = (listId, listTitle) => {
        fetch(`http://localhost:5000/api/lists/${listId}/movies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movie_id: filmId })
        })
        .then(res => {
            if (res.status === 409) {
                alert(`Фильм уже есть в списке "${listTitle}"!`);
                return; 
            }
            if (res.ok) {
                alert(`Фильм добавлен в список "${listTitle}"!`);
                onClose();
            }
        })
        .catch(err => console.error(err));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Выберите список</h3>
                {!userId ? (
                    <p>Сначала выберите пользователя в шапке сайта.</p>
                ) : (
                    <div className="lists-selection-grid">
                        {myLists.length > 0 ? (
                            myLists.map(list => (
                                <button 
                                    key={list.list_id} 
                                    className="select-list-btn"
                                    onClick={() => handleAdd(list.list_id, list.title)}
                                >
                                    {list.title}
                                </button>
                            ))
                        ) : (
                            <p>У вас нет списков. Создайте их в разделе "Мои списки".</p>
                        )}
                    </div>
                )}
                <button className="cancel-btn full-width" onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
}

export default AddToListModal;