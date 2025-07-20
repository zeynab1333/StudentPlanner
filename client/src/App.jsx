import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Timetable from './pages/Timetable';
import Assignments from './pages/Assignments';
import Alerts from './pages/Alerts';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Footer from './components/Footer';
import Help from './pages/Help';

// Layout component to wrap pages with footer
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <Register />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/timetable" element={
          <Layout>
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/assignments" element={
          <Layout>
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/alerts" element={
          <Layout>
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          </Layout>
        } />
        <Route path="/help" element={
          <Layout>
            <Help />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
