const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = require('./src/db/pool');

app.get('/test-db', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows[0]);
});

app.get('/', (req, res) => {
  res.json({ bericht: 'Server werkt!' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server draait op poort ${process.env.PORT}`);
});

