const pool = require('../db/pool');

const savePin = async (req, res) => {
  const user_id = req.user.id;
  const { pinId } = req.params;
  try {
    const result = await pool.query(
      'INSERT INTO saves (user_id, pin_id) VALUES ($1, $2) RETURNING *',
      [user_id, pinId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const unsavePin = async (req, res) => {
  const user_id = req.user.id;
  const { pinId } = req.params;
  try {
    await pool.query(
      'DELETE FROM saves WHERE user_id = $1 AND pin_id = $2',
      [user_id, pinId]
    );
    res.json({ bericht: 'Pin verwijderd uit opgeslagen' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSavedPins = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      'SELECT pins.*, users.username FROM saves JOIN pins ON saves.pin_id = pins.id JOIN users ON pins.user_id = users.id WHERE saves.user_id = $1 ORDER BY saves.created_at DESC',
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { savePin, unsavePin, getSavedPins };