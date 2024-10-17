import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserSettings from './components/UserSettings';
import { Bell, User, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showUserSettings, setShowUserSettings] = useState<boolean>(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {isAuthenticated && (
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <Bell className="text-gray-600 cursor-pointer" />
            <div className="flex items-center space-x-4">
              <User
                className="text-gray-600 cursor-pointer"
                onClick={() => setShowUserSettings(true)}
              />
              <LogOut className="text-gray-600 cursor-pointer" onClick={handleLogout} />
            </div>
          </header>
        )}
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
        {showUserSettings && <UserSettings onClose={() => setShowUserSettings(false)} />}
      </div>
    </Router>
  );
};

export default App;