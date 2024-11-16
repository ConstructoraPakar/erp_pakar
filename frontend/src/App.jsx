// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(''); // Nuevo estado para almacenar el nombre del usuario

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName'); // Recuperar el nombre del usuario
    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName || 'Usuario'); // Establecer el nombre del usuario
    }
  }, []);

  const handleLoginSuccess = () => {
    const storedUserName = localStorage.getItem('userName'); // Recuperar el nombre del usuario
    setIsAuthenticated(true);
    setUserName(storedUserName || 'Usuario');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName'); // Limpiar el nombre del usuario
    setIsAuthenticated(false);
    setUserName(''); // Limpiar el estado del nombre del usuario
  };

  return (
    <Router>
      {isAuthenticated ? (
        <Layout onLogout={handleLogout} userName={userName}> {/* Pasar userName al Layout */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
