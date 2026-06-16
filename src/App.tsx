import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedLayout from './components/layout/protectedLayout';

// Componentes das Telas por Perfil (Mapeados conforme a pasta protected)
import AdminPage from './pages/(protected)/adminPage';
import CoordenadorPage from './pages/(protected)/coordenadorPage';
import ClientePage from './pages/(protected)/clientePage';

// Componentes Individuais Antigos (Mantidos para retrocompatibilidade)
import Users from './pages/(protected)/users';
import Presentations from './pages/(protected)/presentations';
import Groups from './pages/(protected)/groups';
import Events from './pages/(protected)/events';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        
        <Route element={<ProtectedLayout />}>
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/coordenadorPage" element={<CoordenadorPage />} />
          <Route path="/clientePage" element={<ClientePage />} />

          <Route path="/presentations" element={<Presentations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/events" element={<Events />} />
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