const express = require('express');
const router = express.Router();
const { getAllPins, getPin, createPin, deletePin } = require('../controllers/pinController');
const authMiddleware = require('../middlewares/auth');

router.get('/', getAllPins);
router.get('/:id', getPin);
router.post('/', authMiddleware, createPin);
router.delete('/:id', authMiddleware, deletePin);

module.exports = router;