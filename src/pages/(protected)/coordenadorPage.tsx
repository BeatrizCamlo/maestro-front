"use client";

import React, { useState } from "react";
import Groups from "./groups";
import Events from "./events";
import Presentations from "./presentations";

type Tabs = "presentations" | "groups" | "events";

export default function CoordenadorPage() {
  const [activeTab, setActiveTab] = useState<Tabs>("presentations");

  return (
    <div className="min-h-screen bg-neutral-extra-light p-6 font-sans">
      {/* Cabeçalho do Painel */}
      <div className="mb-6 border-b border-neutral-medium pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark uppercase tracking-wide">
            Painel da Coordenação Musical
          </h1>
          <p className="text-xs text-neutral-medium mt-1">
            Gerencie as solicitações de apresentações, homologue eventos e controle as bandas/grupos cadastrados.
          </p>
        </div>
        <div className="bg-amber-500 text-neutral-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
          Role: Coordenador
        </div>
      </div>

      {/* Menu de Abas (Tabs) para Navegação Interna Limpa */}
      <div className="flex space-x-2 mb-6 border-b border-neutral-light pb-px">
        <button
          onClick={() => setActiveTab("presentations")}
          className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-t-lg transition-all border-t-2 ${
            activeTab === "presentations"
              ? "bg-neutral-white text-primary-main border-primary-main shadow-sm"
              : "text-neutral-medium hover:text-neutral-darkest border-transparent hover:bg-neutral-light"
          }`}
        >
          <i className="fas fa-calendar-check mr-2"></i> Solicitações & Apresentações
        </button>

        <button
          onClick={() => setActiveTab("groups")}
          className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-t-lg transition-all border-t-2 ${
            activeTab === "groups"
              ? "bg-neutral-white text-primary-main border-primary-main shadow-sm"
              : "text-neutral-medium hover:text-neutral-darkest border-transparent hover:bg-neutral-light"
          }`}
        >
          <i className="fas fa-users mr-2"></i> Grupos Musicais
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider rounded-t-lg transition-all border-t-2 ${
            activeTab === "events"
              ? "bg-neutral-white text-primary-main border-primary-main shadow-sm"
              : "text-neutral-medium hover:text-neutral-darkest border-transparent hover:bg-neutral-light"
          }`}
        >
          <i className="fas fa-guitar mr-2"></i> Cronograma de Eventos
        </button>
      </div>

      {/* Conteúdo Dinâmico Baseado na Aba Ativa */}
      <div className="bg-neutral-white p-6 rounded-b-2xl rounded-tr-2xl shadow-xl border border-neutral-light transition-all">
        {activeTab === "presentations" && <Presentations />}
        {activeTab === "groups" && <Groups />}
        {activeTab === "events" && <Events />}
      </div>
    </div>
  );
}