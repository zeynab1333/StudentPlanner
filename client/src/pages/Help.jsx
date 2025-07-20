import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Toaster, toast } from 'react-hot-toast';

const Help = () => {
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) {
      toast.error('Please describe your issue.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/help', { issue });
      toast.success("Thanks! We'll get back to you soon.");
      setIssue('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-pink-100 to-purple-200 px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl border border-indigo-100 flex flex-col items-center"
        >
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Need Help?</h1>
          <textarea
            className="w-full min-h-[120px] p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-y mb-6 text-lg"
            placeholder="Describe your issue..."
            value={issue}
            onChange={e => setIssue(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow hover:scale-105 transition-all text-lg disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Help;
