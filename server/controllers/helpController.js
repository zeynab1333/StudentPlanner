const Help = require('../models/Help');

exports.submitHelp = async (req, res) => {
  try {
    const { issue } = req.body;
    if (!issue || !issue.trim()) {
      return res.status(400).json({ message: 'Issue is required.' });
    }
    const help = new Help({ issue });
    await help.save();
    res.status(201).json({ message: 'Help request submitted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
}; 