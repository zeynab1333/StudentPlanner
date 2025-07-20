import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const Timetable = () => {
  const [form, setForm] = useState({ day: '', subject: '', startTime: '', endTime: '' });
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const fetchTimetable = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/timetable', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data);
    } catch (err) {
      setError('Failed to fetch timetable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.day || !form.subject || !form.startTime || !form.endTime) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      await api.post('/timetable', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Timetable entry added!');
      setForm({ day: '', subject: '', startTime: '', endTime: '' });
      fetchTimetable();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 py-10">
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-pink-200 w-full max-w-xl mb-10">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 tracking-wide drop-shadow">Add Timetable Entry</h2>
          {error && <div className="mb-4 text-red-500 text-center font-medium animate-pulse">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center font-medium animate-pulse">{success}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              name="day"
              value={form.day}
              onChange={handleChange}
              className="p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="">Select Day</option>
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <div className="flex gap-4">
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="flex-1 p-3 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-indigo-300 transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Entry'}
            </button>
          </form>
        </div>
        <div className="bg-white/90 p-8 rounded-3xl shadow-2xl border border-indigo-200 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Your Timetable</h2>
          {loading ? (
            <div className="text-center text-indigo-500">Loading...</div>
          ) : entries.length === 0 ? (
            <div className="text-center text-gray-500">No entries yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-purple-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-200 via-indigo-200 to-purple-200">
                    <th className="py-2 px-4">Day</th>
                    <th className="py-2 px-4">Subject</th>
                    <th className="py-2 px-4">Start Time</th>
                    <th className="py-2 px-4">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-pink-50 transition">
                      <td className="py-2 px-4 text-center">{entry.day}</td>
                      <td className="py-2 px-4 text-center">{entry.subject}</td>
                      <td className="py-2 px-4 text-center">{entry.startTime}</td>
                      <td className="py-2 px-4 text-center">{entry.endTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Timetable;
