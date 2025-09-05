import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AuthPages } from './pages/AuthPages';
import { EventsPage } from './pages/EventsPage';
import { MyEventsPage } from './pages/MyEventsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// App Layout Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <AppLayout>
                <HomePage />
              </AppLayout>
            } />
            
            <Route path="/login" element={
              <AppLayout>
                <AuthPages />
              </AppLayout>
            } />
            
            <Route path="/signup" element={
              <AppLayout>
                <AuthPages />
              </AppLayout>
            } />
            
            <Route path="/events" element={
              <AppLayout>
                <EventsPage />
              </AppLayout>
            } />
            
            {/* Protected Routes */}
            <Route path="/my-events" element={
              <AppLayout>
                <ProtectedRoute>
                  <MyEventsPage />
                </ProtectedRoute>
              </AppLayout>
            } />
            
            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
