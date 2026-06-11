import React, { useState, useEffect } from 'react';
import './AddFilmModal.css'; // Создадим этот файл ниже

function AddFilmModal({ isOpen, onClose, onAddFilm }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Поиск при вводе текста
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const timer = setTimeout(() => {
            fetch(`http://localhost:5000/api/movies/search?query=${query}`)
                .then(res => res.json())
                .then(data => setResults(data))
                .catch(err => console.error(err));
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Добавить фильм в список</h3>
                <input 
                    type="text" 
                    placeholder="Начните вводить название..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="modal-search-input"
                    autoFocus
                />
                
                <div className="modal-results">
                    {results.length === 0 && query.length > 1 && <p>Ничего не найдено</p>}
                    {results.map(movie => (
                        <div 
                            key={movie.movie_id} 
                            className="modal-result-item"
                            onClick={() => {
                                onAddFilm(movie.movie_id);
                                onClose();
                                setQuery(''); // Очистить после добавления
                            }}
                        >
                            <img src={movie.poster_url} alt="poster" />
                            <div className="result-info">
                                <span className="result-title">{movie.title}</span>
                                <span className="result-year">{movie.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="close-btn" onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
}

export default AddFilmModal;