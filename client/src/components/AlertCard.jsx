import React from 'react';

const AlertCard = ({ title, date, description }) => {
  return (
    <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 border-l-8 border-pink-500 shadow-xl rounded-2xl p-6 mb-6 max-w-xl w-full transition-transform hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold text-pink-700 drop-shadow">{title}</h3>
        <span className="bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{new Date(date).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700 text-base font-medium">{description}</p>
    </div>
  );
};

export default AlertCard;
