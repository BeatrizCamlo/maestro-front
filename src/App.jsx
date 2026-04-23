import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';

// Exemplo de uma página protegida que você criará depois
const Dashboard = () => <div className="text-center"><h2>Bem-vindo ao Maestro!</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={
          <main className="flex items-center justify-center min-h-screen p-4 text-center">
            <div>
              <h2 className="text-4xl font-bold text-primary-dark">404</h2>
              <p className="text-gray-600">Página não encontrada no sistema Maestro.</p>
            </div>
          </main>
        } />
      </Routes>
    </Router>
  );
}

export default App;