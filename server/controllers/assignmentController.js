const Assignment = require('../models/Assignment');

// POST /api/assignments - create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }
    const due = new Date(dueDate);
    if (due < new Date()) {
      return res.status(400).json({ message: 'Due date must be in the future' });
    }
    const assignment = new Assignment({
      user: req.user.userId,
      title,
      dueDate: due
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment created', assignment });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/assignments - get all assignments for the user
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ user: req.user.userId }).sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/assignments/:id - delete an assignment
exports.deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
