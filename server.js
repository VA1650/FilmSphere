const express = require('express');
const sqlite3 = require('sqlite3'); 
const cors = require('cors');

const app = express();
const PORT = 5000;               
const DB_PATH = './src/kinopoiskMini.db'; 

app.use(cors());
app.use(express.json()); 

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Подключено к базе данных SQLite');
    }
});

app.get('/api/movies', (req, res) => {
    const query = 'SELECT * FROM movies';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Ошибка при получении фильмов:', err.message);
            res.status(500).json({ error: 'Ошибка при получении списка фильмов' });
        } else {
            res.json(rows); 
        }
    });
});

app.get('/api/lists', (req, res) => {
    const query = 'SELECT * FROM lists';

    db.all(query, (err, rows) => {
        if (err) {
            console.error('Ошибка при получении списков:', err.message);
            res.status(500).json({ error: 'Ошибка при получении списков' });
        } else {
            res.json(rows); 
        }
    });
});

app.get('/api/lists/:id/movies', (req, res) => {
    const listId = req.params.id;
    const query = `
        SELECT movies.* 
        FROM movies
        INNER JOIN list_movies ON movies.movie_id = list_movies.movie_id
        WHERE list_movies.list_id = ?
    `;

    db.all(query, [listId], (err, rows) => {
        if (err) {
            console.error(`Ошибка при получении фильмов из списка ${listId}:`, err.message);
            res.status(500).json({ error: `Ошибка при получении фильмов из списка ${listId}` });
        } else {
            res.json(rows); 
        }
    });
});

app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const query = 'SELECT * FROM movies WHERE movie_id = ?';

    db.get(query, [movieId], (err, row) => {
        if (err) {
            console.error(`Ошибка при получении фильма ${movieId}:`, err.message);
            res.status(500).json({ error: `Ошибка при получении фильма ${movieId}` });
        } else {
            res.json(row); // Возвращаем данные о фильме
        }
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
