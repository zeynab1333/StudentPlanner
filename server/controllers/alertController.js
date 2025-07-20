// GET /api/alerts - return static list of alerts
exports.getAlerts = (req, res) => {
  const alerts = [
    {
      id: 1,
      title: 'HELB Deadline',
      date: '2025-08-01',
      description: 'HELB loan application closes.'
    },
    {
      id: 2,
      title: 'Exam Week',
      date: '2025-09-10',
      description: 'Final exams begin.'
    },
    {
      id: 3,
      title: 'Registration Opens',
      date: '2025-07-25',
      description: 'Course registration for next semester opens.'
    }
  ];
  res.json(alerts);
};
