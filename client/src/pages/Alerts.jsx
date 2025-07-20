import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AlertCard from '../components/AlertCard';
import api from '../services/api';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data);
      } catch (err) {
        setError('Failed to load alerts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 py-12 px-4">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 drop-shadow text-center">Important Alerts & Reminders</h1>
        {loading && (
          <div className="text-lg text-purple-600 animate-pulse font-semibold">Loading alerts...</div>
        )}
        {error && (
          <div className="text-lg text-red-500 font-semibold animate-pulse mb-4">{error}</div>
        )}
        {!loading && !error && alerts.length === 0 && (
          <div className="text-lg text-gray-500 font-medium">No alerts at this time.</div>
        )}
        <div className="flex flex-col items-center w-full">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} {...alert} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Alerts;
