const Timetable = require('../models/Timetable');

// POST /api/timetable - create a timetable entry
exports.createTimetable = async (req, res) => {
  try {
    const { day, subject, startTime, endTime } = req.body;
    const entry = new Timetable({
      user: req.user.userId,
      day,
      subject,
      startTime,
      endTime
    });
    await entry.save();
    res.status(201).json({ message: 'Timetable entry created', entry });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/timetable - get all timetable entries for the user
exports.getTimetable = async (req, res) => {
  try {
    const entries = await Timetable.find({ user: req.user.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
