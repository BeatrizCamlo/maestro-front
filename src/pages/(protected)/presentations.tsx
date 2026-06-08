"use client";

import { useState } from "react";
import { usePresentations } from "@/hooks/use-presentation";

export default function PresentationsPage() {
  const currentCoordinatorId = "1"; 
  
  const {
    groups,
    events,
    pendingSolicitations,
    confirmedPresentations,
    selectedEventId,
    setSelectedEventId,
    loading,
    globalError,
    successMsg,
    formError,
    isCreateOpen,
    setIsCreateOpen,
    isCancelOpen,
    setIsCancelOpen,
    formData,
    cancelReason,
    setCancelReason,
    solicitationToCancel,
    handleInputChange,
    handleOpenCreate,
    handleCreateSolicitation,
    handleConfirmSolicitation,
    handleOpenCancel,
    handleConfirmCancel,
  } = usePresentations(currentCoordinatorId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Solicitações de Apresentação</h1>
          <p className="text-sm text-gray-500">Gerencie as apresentações dos seus grupos e eventos.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
        >
          + Nova Solicitação
        </button>
      </div>

      {successMsg && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {successMsg}
        </div>
      )}
      {globalError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {globalError}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">  
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Solicitações Pendentes</h2>
          
          {loading && pendingSolicitations.length === 0 ? (
            <p className="text-gray-500 animate-pulse">Carregando solicitações...</p>
          ) : pendingSolicitations.length === 0 ? (
            <p className="text-gray-500 bg-gray-50 p-4 rounded-md border border-dashed">
              Nenhuma solicitação pendente no momento.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingSolicitations.map((solicitation) => (
                <div 
                  key={solicitation.id} 
                  className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-gray-800">{solicitation.groupName || `Grupo ID: ${solicitation.groupId}`}</h3>
                    <p className="text-sm text-gray-600">Evento: {solicitation.eventName || `Evento ID: ${solicitation.eventId}`}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Horário: {new Date(solicitation.time).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirmSolicitation(solicitation.id)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleOpenCancel(solicitation)}
                      disabled={loading}
                      className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded hover:bg-red-200 disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="space-y-4 border-l pl-0 lg:pl-8 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Apresentações Confirmadas</h2>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Filtrar por Evento:</label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um evento...</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>{event.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 pt-2">
            {!selectedEventId ? (
              <p className="text-xs text-gray-400 italic">Selecione um evento para listar a agenda firmada.</p>
            ) : confirmedPresentations.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Nenhuma apresentação confirmada para este evento.</p>
            ) : (
              confirmedPresentations.map((presentation) => (
                <div key={presentation.id} className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="font-semibold text-blue-900 text-sm">{presentation.groupName || `Grupo ${presentation.groupId}`}</p>
                  <p className="text-xs text-blue-700">{new Date(presentation.time).toLocaleString("pt-BR")}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleCreateSolicitation}
            className="bg-white p-6 rounded-lg max-w-md w-full space-y-4 shadow-xl"
          >
            <h3 className="text-lg font-bold text-gray-900">Nova Solicitação de Apresentação</h3>
            
            {formError && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{formError}</p>}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Seu Grupo *</label>
              <select
                name="groupId"
                value={formData.groupId}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                required
              >
                <option value="">Selecione um grupo...</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Evento Alvo *</label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                required
              >
                <option value="">Selecione o evento...</option>
                {events.map((e) => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Horário Proposto *</label>
              <input
                type="datetime-local"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Solicitação"}
              </button>
            </div>
          </form>
        </div>
      )}

      
      {isCancelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form 
            onSubmit={handleConfirmCancel}
            className="bg-white p-6 rounded-lg max-w-md w-full space-y-4 shadow-xl"
          >
            <h3 className="text-lg font-bold text-gray-900">Justificativa de Cancelamento</h3>
            <p className="text-sm text-gray-500">
              Você está prestes a rejeitar/cancelar a apresentação do grupo{" "}
              <span className="font-semibold">{solicitationToCancel?.groupName}</span>.
            </p>
            
            {formError && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{formError}</p>}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Motivo do Cancelamento *</label>
              <textarea
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Ex: Conflito de agenda externa com os músicos."
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsCancelOpen(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading || !cancelReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Processando..." : "Confirmar Cancelamento"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}