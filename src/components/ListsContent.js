import React, { useEffect, useState } from 'react';
import './ListsContent.css';

function ListsContent({ onListClick }) {
    const [lists, setLists] = useState([]); // Состояние для списков

    // Загружаем списки с сервера при загрузке компонента
    useEffect(() => {
        fetch('http://localhost:5000/api/lists')
            .then((response) => response.json())
            .then((data) => setLists(data))
            .catch((error) => console.error('Ошибка при загрузке списков:', error));
    }, []);

    return (
        <main>
            <div className="lists-grid">
                {lists.map((list) => (
                    <div
                        key={list.list_id}
                        className="list"
                        onClick={() => onListClick(list.list_id)}
                    >
                        <p>{list.title}</p>
                    </div>
                ))}
                <div className="create-list">
                    <button>Создать новый список</button>
                </div>
            </div>
        </main>
    );
}

export default ListsContent;
