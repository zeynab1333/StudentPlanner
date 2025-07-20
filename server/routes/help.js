const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

// POST /api/help
router.post('/', helpController.submitHelp);

module.exports = router; 