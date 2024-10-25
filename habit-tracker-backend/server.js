const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5000' }));
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1995', 
    database: 'habit_tracker'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
// 1. Getting all habits
app.get('/habits', (req, res) => {
    db.query('SELECT * FROM habits', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
});

// 2. Adding a new habit
app.post('/habits', (req, res) => {
    const { name, date, isGood } = req.body;
    const sql = 'INSERT INTO habits (name, date, is_good) VALUES (?, ?, ?)';
    db.query(sql, [name, date, isGood], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Habit added successfully!', id: result.insertId });
    });
});

// 3. Delete a habit
app.delete('/habits/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM habits WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Habit deleted successfully!' });
    });
});

// 4. Update a habit
app.put('/habits/:id', (req, res) => {
    const { id } = req.params;
    const { name, date, isGood } = req.body;
    const sql = 'UPDATE habits SET name = ?, date = ?, is_good = ? WHERE id = ?';
    db.query(sql, [name, date, isGood, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Habit updated successfully!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
