import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.username || !form.email || !form.password) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-purple-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700 tracking-wide drop-shadow">Create Account</h2>
        {error && <div className="mb-4 text-red-500 text-center font-medium animate-pulse">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-purple-300 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-purple-700 cursor-pointer hover:underline hover:text-pink-600 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
