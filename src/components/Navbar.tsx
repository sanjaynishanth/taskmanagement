import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, Bell, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user || location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={user.role === 'admin' ? '/' : '/user-dashboard'} className="text-xl font-bold text-blue-600">
              TaskFlow
            </Link>
            {user.role === 'admin' && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`border-b-2 ${
                    location.pathname === '/'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent hover:border-gray-300 text-gray-500'
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className={`border-b-2 ${
                    location.pathname === '/tasks'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent hover:border-gray-300 text-gray-500'
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  Tasks
                </Link>
                <Link
                  to="/projects"
                  className={`border-b-2 ${
                    location.pathname === '/projects'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent hover:border-gray-300 text-gray-500'
                  } inline-flex items-center px-1 pt-1 text-sm font-medium`}
                >
                  Projects
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            
            <div className="ml-3 relative flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}