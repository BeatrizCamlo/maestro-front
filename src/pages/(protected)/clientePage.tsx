"use client";

import React, { useState } from "react";
import { usePresentations } from "@/hooks/use-presentation";


export default function ClientePage() {
  const { 
    events, 
    groups, 
    formData, 
    formError, 
    successMsg, 
    loading, 
    handleInputChange, 
    handleCreateSolicitation 
  } = usePresentations();

  const [groupAction, setGroupAction] = useState<"join" | "create">("join");

  return (
    <div className="min-h-screen bg-neutral-extra-light p-6 font-sans max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-neutral-medium pb-4">
        <h1 className="text-2xl font-bold text-neutral-darkest uppercase">Area do Integrante / Músico</h1>
        <p className="text-xs text-neutral-medium mt-1">Gerencie sua participação em grupos da UFRN e solicite inserção em agendas culturais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLUNA 1 & 2: FORMULÁRIO DE NOVA SOLICITAÇÃO DE APRESENTAÇÃO */}
        <div className="md:col-span-2 bg-neutral-white p-6 rounded-2xl shadow-xl border border-neutral-light">
          <h2 className="text-sm font-bold uppercase text-primary-dark tracking-wide mb-4 border-b pb-2">
            <i className="fas fa-plus-circle mr-2"></i> Solicitar Espaço em Evento
          </h2>

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-md text-xs font-bold mb-4">
              {successMsg}
            </div>
          )}

          {formError && (
            <div className="bg-danger-pale border border-danger-light text-danger-dark px-4 py-2.5 rounded-md text-xs font-bold mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreateSolicitation} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-darkest mb-1">Seu Grupo Vinculado *</label>
              <select
                name="groupId"
                value={formData.groupId}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-sm text-neutral-darkest focus:ring-2 focus:ring-primary-light outline-none"
              >
                <option value="">Selecione o grupo que irá se apresentar...</option>
                {groups.map((g: any) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-darkest mb-1">Evento Alvo *</label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-sm text-neutral-darkest focus:ring-2 focus:ring-primary-light outline-none"
              >
                <option value="">Selecione o festival ou concerto...</option>
                {events.map((e: any) => (
                  <option key={e.id} value={e.id}>{e.title || e.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-darkest mb-1">Horário Proposto *</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-sm text-neutral-darkest focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-main hover:bg-primary-dark text-neutral-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? "Processando..." : "Enviar Solicitação à Coordenação"}
            </button>
          </form>
        </div>

        {/* COLUNA 3: ENTRAR OU SOLICITAR GRUPO */}
        <div className="bg-neutral-white p-6 rounded-2xl shadow-xl border border-neutral-light flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-primary-dark tracking-wide mb-4 border-b pb-2">
              <i className="fas fa-music mr-2"></i> Filiação Musical
            </h2>

            <div className="flex border rounded mb-4 overflow-hidden text-xs font-bold">
              <button 
                onClick={() => setGroupAction("join")}
                className={`flex-1 py-2 uppercase ${groupAction === 'join' ? 'bg-neutral-darkest text-neutral-white' : 'bg-neutral-light text-neutral-medium'}`}
              >
                Entrar
              </button>
              <button 
                onClick={() => setGroupAction("create")}
                className={`flex-1 py-2 uppercase ${groupAction === 'create' ? 'bg-neutral-darkest text-neutral-white' : 'bg-neutral-light text-neutral-medium'}`}
              >
                Sugerir Criação
              </button>
            </div>

            {groupAction === "join" ? (
              <div className="space-y-3">
                <p className="text-xs text-neutral-medium">Escolha um grupo musical ativo para solicitar sua entrada como integrante:</p>
                <select className="w-full p-2 bg-neutral-extra-light border rounded text-xs text-neutral-darkest outline-none">
                  <option value="">Selecione um grupo disponível...</option>
                  <option value="1">Grupo de Choro da UFRN</option>
                  <option value="2">Orquestra Filarmônica Universitária</option>
                </select>
                <button className="w-full bg-neutral-darkest text-neutral-white py-2 rounded text-xs font-bold hover:bg-black uppercase transition-colors">
                  Pedir Vínculo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-neutral-medium">Caso sua banda acadêmica não esteja listada, envie uma sugestão de fundação para auditoria:</p>
                <input type="text" placeholder="Nome do Novo Grupo" className="w-full p-2 bg-neutral-extra-light border rounded text-xs outline-none text-neutral-darkest" />
                <textarea placeholder="Breve justificativa ou objetivos do grupo..." rows={3} className="w-full p-2 bg-neutral-extra-light border rounded text-xs outline-none text-neutral-darkest" />
                <button className="w-full bg-neutral-darkest text-neutral-white py-2 rounded text-xs font-bold hover:bg-black uppercase transition-colors">
                  Enviar Proposta
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-dashed border-neutral-light text-[10px] text-neutral-medium text-center">
            Suas solicitações passam pela aprovação dos docentes responsáveis.
          </div>
        </div>

      </div>
    </div>
  );
}