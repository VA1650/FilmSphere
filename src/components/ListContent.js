import React, { useEffect, useState } from 'react';
import './ListContent.css';

function ListContent({ listTitle, listId, onFilmClick, onAddFilm, onSave }) {
    const [films, setFilms] = useState([]); // Состояние для фильмов в списке

    // Загружаем фильмы из списка при загрузке компонента
    useEffect(() => {
        fetch(`http://localhost:5000/api/lists/${listId}/movies`)
            .then((response) => response.json())
            .then((data) => setFilms(data))
            .catch((error) => console.error('Ошибка при загрузке фильмов списка:', error));
    }, [listId]);

    return (
        <main>
            <div className="list-header">
                <div className="list-title">
                    <h2>{listTitle}</h2>
                </div>
                <div className="save-button">
                    <button onClick={onSave}>
                        Сохранить
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1442/1442912.png"
                            alt="save-icon"
                        />
                    </button>
                </div>
            </div>

            <div className="films-grid">
                {films.map((film) => (
                    <div
                        className="film-card"
                        key={film.movie_id}
                        onClick={() => onFilmClick(film.movie_id)}
                    >
                        <img src={film.poster_url} alt={film.title} />
                        <p>{film.title}</p>
                        <p>{film.year}</p>
                    </div>
                ))}
                <div className="add-film-card">
                    <button onClick={onAddFilm}>
                        <img
                            src="https://images.icon-icons.com/2715/PNG/512/plus_circle_icon_172263.png"
                            alt="add-icon"
                        />
                        Добавить фильм
                    </button>
                </div>
            </div>
        </main>
    );
}

export default ListContent;
