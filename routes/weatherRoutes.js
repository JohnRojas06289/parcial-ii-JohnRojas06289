const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/weather', authenticateToken, weatherController.getWeather);

module.exports = router;