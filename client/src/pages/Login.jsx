import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.email || !form.password) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-pink-200">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600 tracking-wide drop-shadow">Welcome Back</h2>
        {error && <div className="mb-4 text-red-500 text-center font-medium animate-pulse">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-pink-300 transition-all duration-200"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <span
            className="text-pink-600 cursor-pointer hover:underline hover:text-purple-700 transition"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
