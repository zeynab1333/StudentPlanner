// If you haven't already, install react-icons with: pnpm add react-icons
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaCalendarAlt, FaBook, FaBell } from 'react-icons/fa';

const cards = [
  {
    title: 'Timetable',
    description: 'View and manage your class schedule.',
    icon: <FaCalendarAlt className="text-indigo-500 text-5xl mb-7" />,
    to: '/timetable',
    btnClass: 'bg-indigo-500 hover:bg-indigo-600',
  },
  {
    title: 'Assignments',
    description: 'Track your assignments and deadlines.',
    icon: <FaBook className="text-pink-500 text-5xl mb-7" />,
    to: '/assignments',
    btnClass: 'bg-pink-500 hover:bg-pink-600',
  },
  {
    title: 'Alerts',
    description: 'See important alerts and reminders.',
    icon: <FaBell className="text-purple-500 text-5xl mb-7" />,
    to: '/alerts',
    btnClass: 'bg-purple-500 hover:bg-purple-600',
  },
];

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-pink-100 to-purple-200 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">Hey there, Superstar! 🌟</h1>
          <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">Your academic journey just got easier. Jump into your planner and make every day count!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map(card => (
              <div key={card.title} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-indigo-100 hover:shadow-2xl transition-shadow">
                {card.icon}
                <h2 className="text-2xl font-bold mb-2 text-gray-800">{card.title}</h2>
                <p className="text-gray-500 mb-6 text-center">{card.description}</p>
                <Link
                  to={card.to}
                  className={`w-full text-center ${card.btnClass} text-white px-4 py-2 rounded-lg font-semibold shadow transition-all`}
                >
                  Go to {card.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
