import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import ListsContent from './components/ListsContent';
import ListContent from './components/ListContent';
import FilmCardContent from './components/FilmCardContent';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('MAIN'); // Возможные значения: MAIN, LISTS, LIST_DETAIL, FILM_DETAIL
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectedListTitle, setSelectedListTitle] = useState('');
    const [selectedFilmId, setSelectedFilmId] = useState(null);

    const handleListClick = (listId) => {
        setSelectedListId(listId);

        fetch(`http://localhost:5000/api/lists`)
            .then((response) => response.json())
            .then((data) => {
                const list = data.find((l) => l.list_id === listId);
                setSelectedListTitle(list?.title || 'Неизвестный список');
                setCurrentView('LIST_DETAIL');
            })
            .catch((error) => console.error('Ошибка загрузки списка:', error));
    };

    const handleFilmClick = (filmId) => {
        setSelectedFilmId(filmId);
        setCurrentView('FILM_DETAIL');
    };

    const handleAddToList = () => {
        alert(`Фильм добавлен в список!`);
    };

    return (
        <div className="app-container">
            <Header />
            {currentView === 'MAIN' && (
                <MainContent onFilmClick={handleFilmClick} />
            )}
            {currentView === 'LISTS' && (
                <ListsContent onListClick={handleListClick} />
            )}
            {currentView === 'LIST_DETAIL' && (
                <ListContent
                    listTitle={selectedListTitle}
                    listId={selectedListId}
                    onFilmClick={handleFilmClick}
                    onAddFilm={() => alert('Добавить фильм')}
                    onSave={() => alert('Сохранить список')}
                />
            )}
            {currentView === 'FILM_DETAIL' && (
                <FilmCardContent
                    filmId={selectedFilmId}
                    onAddToList={handleAddToList}
                />
            )}
            <Footer
                onMainClick={() => setCurrentView('MAIN')}
                onListsClick={() => setCurrentView('LISTS')}
            />
        </div>
    );
}

export default App;
