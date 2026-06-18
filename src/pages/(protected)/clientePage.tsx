"use client";

import React, { useState } from "react";
import { usePresentations } from "@/hooks/use-presentation";
import { useGroups } from "@/hooks/use-groups";
import api from "@/services/api";

export default function ClientePage() {
  
  const { 
    events, 
    groups, 
    formData: presentationFormData, 
    formError: presentationFormError, 
    successMsg: presentationSuccessMsg, 
    loading: presentationLoading, 
    handleInputChange: handlePresentationInputChange, 
    handleCreateSolicitation 
  } = usePresentations();

  const { groupsData, fetchGroups } = useGroups();

  const [groupAction, setGroupAction] = useState<"join" | "create">("join");
  
  
  const [columnLoading, setColumnLoading] = useState(false);
  const [columnError, setColumnError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const [selectedGroup, setSelectedGroup] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupJustify, setNewGroupJustify] = useState("");
  const handleJoinGroup = async () => {
    if (!selectedGroup) return;
    
    setColumnLoading(true);
    setColumnError(null);

    try {
      const response = await api.post(`/v1/grupos-musicais/${selectedGroup}/vincular`, {
        userId: 1
      });

      setJoinSuccess(true);
      setSelectedGroup("");
      setTimeout(() => setJoinSuccess(false), 5000);
    } catch (error: any) {
      console.error(error);
      setColumnError(error.response?.data?.message || "Não foi possível solicitar o vínculo ao grupo.");
    } finally {
      setColumnLoading(false);
    }
  };

  const handleCreateGroupProposal = async () => {
    if (!newGroupName.trim() || !newGroupJustify.trim()) return;

    setColumnLoading(true);
    setColumnError(null);

    try {
      const payload = {
        name: newGroupName.trim(),
        coordenadorId: "1" 
      };

      await api.post("/api/v1/grupos-musicais", payload);

      setCreateSuccess(true);
      setNewGroupName("");
      setNewGroupJustify("");
      
      if (typeof fetchGroups === "function") {
        fetchGroups();
      }

      setTimeout(() => setCreateSuccess(false), 5000);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 409) {
        setColumnError("Já existe um grupo com este nome.");
      } else {
        setColumnError(error.response?.data?.message || "Ocorreu um erro ao salvar o grupo musical.");
      }
    } finally {
      setColumnLoading(false);
    }
  };

  const handleTabChange = (action: "join" | "create") => {
    setGroupAction(action);
    setColumnError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-extra-light p-6 font-sans max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-neutral-medium pb-4">
        <h1 className="text-2xl font-bold text-neutral-darkest uppercase">Area do Integrante / Músico</h1>
        <p className="text-xs text-neutral-medium mt-1">Gerencie sua participação em grupos da UFRN e solicite inserção em agendas culturais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="md:col-span-2 bg-neutral-white p-6 rounded-2xl shadow-xl border border-neutral-light">
          <h2 className="text-sm font-bold uppercase text-primary-dark tracking-wide mb-4 border-b pb-2">
            <i className="fas fa-plus-circle mr-2"></i> Solicitar Espaço em Evento
          </h2>

          {presentationSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-md text-xs font-bold mb-4">
              {presentationSuccessMsg}
            </div>
          )}

          {presentationFormError && (
            <div className="bg-danger-pale border border-danger-light text-danger-dark px-4 py-2.5 rounded-md text-xs font-bold mb-4">
              {presentationFormError}
            </div>
          )}

          <form onSubmit={handleCreateSolicitation} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-darkest mb-1">Seu Grupo Vinculado *</label>
              <select
                name="groupId"
                value={presentationFormData.groupId}
                onChange={handlePresentationInputChange}
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
                value={presentationFormData.eventId}
                onChange={handlePresentationInputChange}
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
                value={presentationFormData.time}
                onChange={handlePresentationInputChange}
                required
                className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-sm text-neutral-darkest focus:ring-2 focus:ring-primary-light outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={presentationLoading}
              className="w-full bg-primary-main hover:bg-primary-dark text-neutral-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
            >
              {presentationLoading ? "Processando..." : "Enviar Solicitação à Coordenação"}
            </button>
          </form>
        </div>

        <div className="bg-neutral-white p-6 rounded-2xl shadow-xl border border-neutral-light flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-primary-dark tracking-wide mb-4 border-b pb-2">
              <i className="fas fa-music mr-2"></i> Filiação Musical
            </h2>

            {/* Abas Alternadoras */}
            <div className="flex border border-neutral-light rounded mb-4 overflow-hidden text-xs font-bold shadow-sm">
              <button 
                type="button"
                onClick={() => handleTabChange("join")}
                className={`flex-1 py-2.5 uppercase transition-colors ${groupAction === 'join' ? 'bg-primary-main text-neutral-white' : 'bg-neutral-extra-light text-neutral-medium hover:bg-neutral-light'}`}
              >
                Entrar
              </button>
              <button 
                type="button"
                onClick={() => handleTabChange("create")}
                className={`flex-1 py-2.5 uppercase transition-colors ${groupAction === 'create' ? 'bg-primary-main text-neutral-white' : 'bg-neutral-extra-light text-neutral-medium hover:bg-neutral-light'}`}
              >
                Sugerir Criação
              </button>
            </div>

            {columnError && (
              <div className="bg-danger-pale border border-danger-light text-danger-dark px-4 py-2.5 rounded-md text-xs font-bold mb-4">
                {columnError}
              </div>
            )}

            {groupAction === "join" ? (
              <div className="space-y-4">
                <p className="text-xs text-neutral-medium">Escolha um grupo musical ativo para solicitar sua entrada como integrante:</p>
                
                {joinSuccess && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-md text-xs font-bold">
                    Pedido de vínculo enviado com sucesso!
                  </div>
                )}

                <select 
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  disabled={columnLoading}
                  className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-xs text-neutral-darkest focus:ring-2 focus:ring-primary-light outline-none disabled:opacity-50"
                >
                  <option value="">Selecione um grupo disponível...</option>
                  {groupsData.map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                
                <button 
                  type="button"
                  onClick={handleJoinGroup}
                  disabled={!selectedGroup || columnLoading}
                  className="w-full bg-primary-main hover:bg-primary-dark text-neutral-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-40"
                >
                  {columnLoading ? "Enviando..." : "Pedir Vínculo"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-neutral-medium">Caso sua banda acadêmica não esteja listada, envie uma sugestão de fundação para auditoria:</p>
                
                {createSuccess && (
                  <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-md text-xs font-bold">
                    Proposta de criação enviada com sucesso!
                  </div>
                )}

                <input 
                  type="text" 
                  placeholder="Nome do Novo Grupo" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  disabled={columnLoading}
                  className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-xs outline-none text-neutral-darkest focus:ring-2 focus:ring-primary-light disabled:opacity-50" 
                />
                
                <textarea 
                  placeholder="Breve justificativa ou objetivos do grupo..." 
                  rows={3} 
                  value={newGroupJustify}
                  onChange={(e) => setNewGroupJustify(e.target.value)}
                  disabled={columnLoading}
                  className="w-full p-2.5 bg-neutral-extra-light rounded border border-neutral-light text-xs outline-none text-neutral-darkest focus:ring-2 focus:ring-primary-light resize-none disabled:opacity-50" 
                />
                
                <button 
                  type="button"
                  onClick={handleCreateGroupProposal}
                  disabled={!newGroupName.trim() || !newGroupJustify.trim() || columnLoading}
                  className="w-full bg-primary-main hover:bg-primary-dark text-neutral-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-md disabled:opacity-40"
                >
                  {columnLoading ? "Salvando..." : "Enviar Proposta"}
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