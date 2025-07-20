import React from 'react';
import Navbar from '../components/Navbar';
import studentImg from '../assets/student.jpg';

const Home = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(99,102,241,0.7) 0%, rgba(236,72,153,0.7) 100%), url(${studentImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Shared Navbar */}
      <Navbar />
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-16">
        <div className="max-w-3xl w-full text-center flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-6 leading-tight">
            Welcome! <span className="text-yellow-300">Plan, Achieve, Succeed</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
            Your journey to a more organized, stress-free student life starts here. Stay on top of your classes, assignments, and deadlines—all in one place you'll love coming back to.
          </p>
          <ul className="text-white/90 text-lg font-medium space-y-2 mt-6 bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <li>🗓️ Effortlessly manage your timetable</li>
            <li>📚 Never miss an assignment or deadline</li>
            <li>🔔 Get friendly reminders and important alerts</li>
            <li>💡 Built for students, by students</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
