import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        {/* O container principal agora gerencia qual página mostrar baseada na URL */}
        <main className="flex-grow flex items-center justify-center p-4">
          <Routes>
            {/* Redireciona a raiz (/) para o login por padrão */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rota para 404 - Opcional */}
            <Route path="*" element={
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary-dark">404</h2>
                <p>Página não encontrada no sistema Maestro.</p>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;