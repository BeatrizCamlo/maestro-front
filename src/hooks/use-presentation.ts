"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [allAvailableGroups, setAllAvailableGroups] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    groupId: "",
    eventId: "",
    time: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const eventsRes = await api.get("/v1/events");
      const eventsContent = eventsRes.data.content || eventsRes.data || [];
      setEvents(eventsContent);

      const groupsRes = await api.get("/v1/grupos-musicais");
      const allGroups = groupsRes.data.content || groupsRes.data || [];
      
      const meusGrupos = allGroups.filter((g: any) => {
        return g.membros?.some((m: any) => String(m.id) === String(coordinatorId));
      });

      setGroups(meusGrupos);
      setAllAvailableGroups(allGroups); 

    } catch (error: any) {
      console.error("Erro ao carregar dados:", error);
      setGlobalError("Não foi possível carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, [coordinatorId]);

  useEffect(() => {
    if (coordinatorId) {
      fetchData();
    }
  }, [coordinatorId, fetchData]);

  const fetchConfirmedPresentations = useCallback(async (eventId: string | number) => {
    if (!eventId) {
      setConfirmedPresentations([]);
      return;
    }
    try {
      const response = await api.get("/presentation-requests/confirmed");
      const resContent = Array.isArray(response.data) 
        ? response.data 
        : (response.data.content || []);

      const filtered = resContent.filter((p: any) => String(p.eventId || p.event?.id) === String(eventId));
      setConfirmedPresentations(filtered);
    } catch (error) {
      console.error("Erro ao buscar apresentações confirmadas:", error);
      setGlobalError("Erro ao atualizar lista de apresentações confirmadas.");
    }
  }, []);

  useEffect(() => {
    fetchConfirmedPresentations(selectedEventId);
  }, [selectedEventId, fetchConfirmedPresentations]);

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
      const payload = {
        eventId: Number(formData.eventId),
      };

      const url = `/presentation-requests?musicalGroupId=${formData.groupId}&time=${encodeURIComponent(formData.time)}`;

      await api.post(url, payload);
      
      setSuccessMsg("Solicitação criada com sucesso!");
      setIsCreateOpen(false);
      fetchData(); 
    } catch (error: any) {
      console.error("Erro ao criar:", error);
      setFormError(error.response?.data?.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSolicitation = async (solicitationId: string | number) => {
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    try {
      await api.patch(`/presentation-requests/${solicitationId}/confirm`, {});
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
      await api.patch(`/presentation-requests/${solicitationToCancel.id}/cancel`, {
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
    groups, events, pendingSolicitations, confirmedPresentations,
    selectedEventId, setSelectedEventId, loading, globalError, successMsg,
    formError, isCreateOpen, setIsCreateOpen, isCancelOpen, setIsCancelOpen,
    formData, cancelReason, setCancelReason, solicitationToCancel,
    handleInputChange, handleOpenCreate, handleCreateSolicitation,
    handleConfirmSolicitation, handleOpenCancel, handleConfirmCancel,
  };
}