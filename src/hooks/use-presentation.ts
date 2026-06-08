"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Group, Event, Presentation } from "@/types/Presentation";

export function usePresentations(coordinatorId?: string | number) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [pendingSolicitations, setPendingSolicitations] = useState<Presentation[]>([]);
  const [confirmedPresentations, setConfirmedPresentations] = useState<Presentation[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | number>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isCancelOpen, setIsCancelOpen] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [solicitationToCancel, setSolicitationToCancel] = useState<Presentation | null>(null);
  const [formData, setFormData] = useState({
    groupId: "",
    eventId: "",
    time: "",
  });

  const fetchData = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const groupsRes = await api.get("/api/v1/groups");
      const filteredGroups = groupsRes.data.filter(
        (g: any) => String(g.coordinatorId) === String(coordinatorId)
      );
      setGroups(filteredGroups);

      const eventsRes = await api.get("/api/v1/events");
      setEvents(eventsRes.data);

      const solicitationsRes = await api.get("/api/v1/solicitations?status=PENDING");
      setPendingSolicitations(solicitationsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
      
      // Fallbacks para testes offline
      setGroups([
        { id: "1", name: "Grupo de Choro Maestro", coordinatorId: String(coordinatorId) },
        { id: "2", name: "Orquestra Jovem", coordinatorId: String(coordinatorId) },
      ]);
      setEvents([
        { id: "101", name: "Festival de Verão 2026" },
        { id: "102", name: "Recital de Outono" },
      ]);
      setPendingSolicitations([
        { id: "501", groupId: "1", groupName: "Grupo de Choro Maestro", eventId: "101", eventName: "Festival de Verão 2026", time: "2026-07-15T20:00", status: "PENDING" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coordinatorId) {
      fetchData();
    }
  }, [coordinatorId]);

  // Busca apresentações confirmadas por Evento específico
  const fetchConfirmedPresentations = async (eventId: string | number) => {
    if (!eventId) {
      setConfirmedPresentations([]);
      return;
    }
    try {
      const response = await api.get(`/api/v1/events/${eventId}/presentations?status=CONFIRMED`);
      setConfirmedPresentations(response.data);
    } catch (error) {
      console.error("Erro ao buscar apresentações confirmadas:", error);
      setConfirmedPresentations([
        { id: "601", groupId: "2", groupName: "Orquestra Jovem", eventId: eventId, time: "2026-07-15T18:00", status: "CONFIRMED" }
      ]);
    }
  };

  useEffect(() => {
    fetchConfirmedPresentations(selectedEventId);
  }, [selectedEventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formError) setFormError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreate = () => {
    setFormError("");
    setFormData({ groupId: "", eventId: "", time: "" });
    setIsCreateOpen(true);
  };

  const handleCreateSolicitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.groupId || !formData.eventId || !formData.time) {
      setFormError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    try {
      await api.post("/api/v1/solicitations", formData);
      setSuccessMsg("Solicitação criada com sucesso!");
      setIsCreateOpen(false);
      fetchData(); 
    } catch (error: any) {
      console.error("Erro ao criar solicitação:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Erro de conflito de horário ou falha na API.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSolicitation = async (solicitationId: string | number) => {
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    try {
      await api.post(`/api/v1/solicitations/${solicitationId}/confirm`);
      setSuccessMsg("Solicitação confirmada com sucesso!");
      fetchData(); 
      if (selectedEventId) fetchConfirmedPresentations(selectedEventId);
    } catch (error: any) {
      console.error("Erro ao confirmar:", error);
      setGlobalError(error.response?.data?.message || "Erro ao confirmar solicitação.");
    } finally {
      setLoading(false);
    }
  };

  // Ajustado para receber 'Presentation' em vez de 'Solicitation' inexistente
  const handleOpenCancel = (solicitation: Presentation) => {
    setSolicitationToCancel(solicitation);
    setCancelReason("");
    setFormError("");
    setIsCancelOpen(true);
  };

  const handleConfirmCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solicitationToCancel) return;
    if (!cancelReason.trim()) {
      setFormError("O motivo do cancelamento é obrigatório.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    try {
      await api.post(`/api/v1/solicitations/${solicitationToCancel.id}/cancel`, {
        reason: cancelReason,
      });
      setSuccessMsg("Solicitação cancelada com sucesso!");
      setIsCancelOpen(false);
      fetchData(); 
    } catch (error: any) {
      console.error("Erro ao cancelar:", error);
      setFormError(error.response?.data?.message || "Erro ao processar cancelamento.");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}