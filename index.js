import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

// --- CORS Configuration ---
const corsOptions = {
  origin: [
      'https://reactjs-c1k2.onrender.com', 
      'http://localhost:5173'
    ],  
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));
// --------------------------

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

// Use Render's dynamic port or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});