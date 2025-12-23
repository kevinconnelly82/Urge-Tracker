import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import AuthPage from './components/AuthPage';
import AuthCallback from './components/AuthCallback';
import DashboardPage from './components/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage onAuthSuccess={() => {}} />
          )
        } 
      />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
