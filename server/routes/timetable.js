const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, timetableController.createTimetable);
router.get('/', auth, timetableController.getTimetable);

module.exports = router;
