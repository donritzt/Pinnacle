const express = require('express');
const router = express.Router();
const { savePin, unsavePin, getSavedPins } = require('../controllers/saveController');
const authMiddleware = require('../middlewares/auth');

router.post('/:pinId', authMiddleware, savePin);
router.delete('/:pinId', authMiddleware, unsavePin);
router.get('/', authMiddleware, getSavedPins);

module.exports = router;