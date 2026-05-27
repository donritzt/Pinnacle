const pool = require('../db/pool');

const getAllPins = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT pins.*, users.username FROM pins JOIN users ON pins.user_id = users.id ORDER BY pins.created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPin = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT pins.*, users.username FROM pins JOIN users ON pins.user_id = users.id WHERE pins.id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pin niet gevonden' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPin = async (req, res) => {
  const { title, image_url, description } = req.body;
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      'INSERT INTO pins (user_id, title, image_url, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, title, image_url, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePin = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      'DELETE FROM pins WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, user_id]
    );
    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Niet toegestaan' });
    }
    res.json({ bericht: 'Pin verwijderd' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllPins, getPin, createPin, deletePin };