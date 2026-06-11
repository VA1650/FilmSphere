import React, { useEffect, useState } from 'react';
import './FilmCardContent.css';

function FilmCardContent({ filmId, onAddToList }) {
    const [film, setFilm] = useState(null);

    useEffect(() => {
        // Загружаем данные о фильме с сервера по его ID
        fetch(`http://localhost:5000/api/movies/${filmId}`)
            .then((response) => response.json())
            .then((data) => setFilm(data))
            .catch((error) => console.error('Ошибка при загрузке фильма:', error));
    }, [filmId]);

    if (!film) {
        return <p>Загружаются данные о фильме...</p>;
    }

    return (
        <main>
            <div className="film-card">
                <div className="film-image-section">
                    <img src={film.poster_url} alt={film.title} />
                    <div className="add-button">
                        <button onClick={onAddToList}>Добавить фильм в список</button>
                    </div>
                </div>
                <div className="film-info-section">
                    <p>
                        <strong>Название фильма:</strong> {film.title}
                    </p>
                    <p>
                        <strong>Год:</strong> {film.year}
                    </p>
                    <p>
                        <strong>Рейтинг:</strong> {film.rating}{' '}
                        <img
                            src="https://png.pngtree.com/png-vector/20221208/ourmid/pngtree-golden-star-in-3d-png-image_6515728.png"
                            alt="Рейтинг"
                            className="rating-star"
                        />
                    </p>
                    <p><strong>Описание:</strong></p>
                    <p>{film.description}</p>
                </div>
            </div>
        </main>
    );
}

export default FilmCardContent;
