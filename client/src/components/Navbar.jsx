import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/timetable', label: 'Timetable' },
  { to: '/assignments', label: 'Assignments' },
  { to: '/alerts', label: 'Alerts' },
  { to: '/help', label: 'Help' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-400 shadow-lg py-4 px-4 sm:px-6 flex items-center justify-between mb-8 relative">
      <div className="flex items-center space-x-2">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <polygon points="32,10 60,22 32,34 4,22 32,10" fill="#222"/>
          <rect x="16" y="32" width="32" height="8" rx="4" fill="#444"/>
          <line x1="32" y1="10" x2="32" y2="44" stroke="#FFD600" strokeWidth="2"/>
          <circle cx="32" cy="46" r="3" fill="#FFD600" stroke="#FFD600" strokeWidth="1"/>
        </svg>
        <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wide drop-shadow">Student Planner</span>
      </div>
      {/* Hamburger icon for mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-7 h-1 bg-white rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-7 h-1 bg-white rounded my-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-7 h-1 bg-white rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
      {/* Desktop links */}
      <div className="hidden sm:flex gap-6 items-center">
        {isLoggedIn ? (
          <>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg font-semibold px-4 py-2 rounded-xl transition-all duration-150 hover:bg-white/20 hover:text-white focus:outline-none ${location.pathname === link.to ? 'bg-white/30 text-white shadow' : 'text-white/80'}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="ml-4 bg-white/20 text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/40 transition-all duration-150 shadow"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {navLinks.filter(link => ['/', '/help'].includes(link.to)).map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-lg font-semibold px-4 py-2 rounded-xl transition-all duration-150 hover:bg-white/20 hover:text-white focus:outline-none ${location.pathname === link.to ? 'bg-white/30 text-white shadow' : 'text-white/80'}`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all"
            >
              Register
            </button>
          </>
        )}
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex flex-col items-center justify-center sm:hidden animate-fade-in">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-4xl font-bold focus:outline-none"
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="w-full max-w-xs bg-gradient-to-b from-indigo-500 via-pink-400 to-purple-500 shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-4 relative">
            {isLoggedIn ? (
              <>
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full text-lg font-semibold px-4 py-3 rounded-xl text-center transition-all duration-150 hover:bg-white/20 hover:text-white focus:outline-none ${location.pathname === link.to ? 'bg-white/30 text-white shadow' : 'text-white/80'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="w-full bg-white/20 text-white font-semibold px-4 py-3 rounded-xl hover:bg-white/40 transition-all duration-150 shadow mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {navLinks.filter(link => ['/', '/help'].includes(link.to)).map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full text-lg font-semibold px-4 py-3 rounded-xl text-center transition-all duration-150 hover:bg-white/20 hover:text-white focus:outline-none ${location.pathname === link.to ? 'bg-white/30 text-white shadow' : 'text-white/80'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); navigate('/login'); }}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 text-white font-semibold px-4 py-3 rounded-xl hover:bg-indigo-100 transition-all duration-150 shadow"
                >
                  Login
                </button>
                <button
                  onClick={() => { setMenuOpen(false); navigate('/register'); }}
                  className="w-full bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 text-white font-semibold px-4 py-3 rounded-xl hover:bg-indigo-100 transition-all duration-150 shadow"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
