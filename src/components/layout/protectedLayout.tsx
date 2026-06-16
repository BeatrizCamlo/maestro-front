import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user_role');

  // Se não estiver logado, manda de volta para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // O layout apenas renderiza a rota filha correspondente (Outlet)
  // Sem forçar caminhos específicos aqui dentro!
  return (
    <div className="flex bg-neutral-extra-light min-h-screen">
      {/* Se você tiver uma Sidebar global, ela fica aqui */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}