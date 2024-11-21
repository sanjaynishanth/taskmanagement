import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import ProjectsPage from './pages/ProjectsPage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/user-dashboard" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
        <ProtectedRoute requireAdmin>
          <HomePage />
        </ProtectedRoute>
      } />
      
      <Route path="/tasks" element={
        <ProtectedRoute requireAdmin>
          <TasksPage />
        </ProtectedRoute>
      } />
      
      <Route path="/projects" element={
        <ProtectedRoute requireAdmin>
          <ProjectsPage />
        </ProtectedRoute>
      } />

      <Route path="/user-dashboard" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={
        <Navigate to={user?.role === 'admin' ? '/' : '/user-dashboard'} replace />
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AppRoutes />
              </div>
            </main>
          </div>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;