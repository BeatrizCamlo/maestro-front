"use client";

import React from "react";
import Users from "./users";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-neutral-extra-light p-6 font-sans">
      {/* Cabeçalho do Painel Admin */}
      <div className="mb-8 border-b border-neutral-medium pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark uppercase tracking-wide">
            Painel do Administrador
          </h1>
          <p className="text-xs text-neutral-medium mt-1">
            Gerenciamento global de acessos, permissões e usuários do ecossistema SGAM.
          </p>
        </div>
        <div className="bg-primary-main text-neutral-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
          Role: Admin
        </div>
      </div>

      {/* Container de Renderização da Listagem/Ações de Usuários */}
      <div className="bg-neutral-white p-6 rounded-2xl shadow-xl border border-neutral-light">
        <Users />
      </div>
    </div>
  );
}