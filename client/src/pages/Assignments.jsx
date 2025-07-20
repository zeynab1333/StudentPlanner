import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const Assignments = () => {
  const [form, setForm] = useState({ title: '', dueDate: '' });
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  const fetchAssignments = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (err) {
      setError('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!form.title || !form.dueDate) {
      setError('All fields are required');
      return false;
    }
    if (new Date(form.dueDate) < new Date()) {
      setError('Due date must be in the future');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/assignments', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Assignment added!');
      setForm({ title: '', dueDate: '' });
      fetchAssignments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add assignment');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError('');
    try {
      await api.delete(`/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Assignment deleted!');
      fetchAssignments();
    } catch (err) {
      setError('Failed to delete assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-100 via-indigo-100 to-purple-100 py-10 px-2">
        <div className="bg-white/90 p-6 sm:p-10 rounded-3xl shadow-2xl border border-pink-200 w-full max-w-xl mb-10">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-600 tracking-wide drop-shadow">Add Assignment</h2>
          {error && <div className="mb-4 text-red-500 text-center font-medium animate-pulse">{error}</div>}
          {success && <div className="mb-4 text-green-600 text-center font-medium animate-pulse">{success}</div>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Assignment Title"
              value={form.title}
              onChange={handleChange}
              className="p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-pink-300 transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Assignment'}
            </button>
          </form>
        </div>
        <div className="bg-white/90 p-6 sm:p-10 rounded-3xl shadow-2xl border border-indigo-200 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Your Assignments</h2>
          {loading ? (
            <div className="text-center text-indigo-500">Loading...</div>
          ) : assignments.length === 0 ? (
            <div className="text-center text-gray-500">No assignments yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-purple-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-200 via-indigo-200 to-purple-200">
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Due Date</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((a) => (
                    <tr key={a._id} className="hover:bg-pink-50 transition">
                      <td className="py-2 px-4 text-center">{a.title}</td>
                      <td className="py-2 px-4 text-center">{new Date(a.dueDate).toLocaleDateString()}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleDelete(a._id)}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 hover:bg-pink-600 transition-all"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
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

export default Assignments;
