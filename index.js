import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// GET: Fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user" ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add a user
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO "user" (name) VALUES ($1) RETURNING *', 
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));