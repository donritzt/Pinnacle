const express = require('express');
const router = express.Router();
const { getUser, getUserPins } = require('../controllers/userController');

router.get('/:id', getUser);
router.get('/:id/pins', getUserPins);

module.exports = router;