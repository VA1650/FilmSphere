import React, { useEffect, useState } from 'react';
import './MainContent.css';

function MainContent({ onFilmClick }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/movies')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Ошибка при загрузке фильмов:', error));
    }, []);

    return (
        <main>
        <div className="controls">
                <div className="dropdown">
                    <button>
                        Жанр
                        <img
                            src="https://cdn-icons-png.flaticon.com/256/0/159.png"
                            alt="dropdown-icon"
                            className="icon"
                        />
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Драма</a>
                        <a href="#">Комедия</a>
                        <a href="#">Боевик</a>
                        <a href="#">Ужасы</a>
                    </div>
                </div>
                <div className="sort">
                    <button>
                        Сортировать
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/8591/8591492.png"
                            alt="sort-icon"
                            className="icon"
                        />
                    </button>
                </div>
            </div>
            <div className="movie-grid">
                {movies.map((movie) => (
                    <div
                        className="movie"
                        key={movie.movie_id}
                        onClick={() => onFilmClick(movie.movie_id)}
                    >{/* Передаются ID */}
                        <img src={movie.poster_url} alt={movie.title} />
                        <p>{movie.title}</p>
                        <p>{movie.year}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default MainContent;

