"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Event, EventWithId } from "@/types/Event";

export function useEvents() {
  const [eventsData, setEventsData] = useState<EventWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  
  const [formError, setFormError] = useState<string>("");
  const [eventToDelete, setEventToDelete] = useState<EventWithId | null>(null);
  
  const [formData, setFormData] = useState<Partial<EventWithId>>({
    title: "",
    dateTime: "",
    location: "",
    description: ""
  });

  const fetchEvents = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const response = await api.get("/api/v1/events");
      const pageContent = response.data.content || [];
      const sortedEvents = pageContent.sort((a: Event, b: Event) => 
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
      );
      
      setEventsData(sortedEvents);
    } catch (error) {
      console.error("Erro na listagem:", error);
      setGlobalError("Não foi possível carregar os eventos do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formError) setFormError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormError("");
    setFormData({ title: "", dateTime: "", location: "", description: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (event: EventWithId) => {
    setIsEditing(true);
    setFormError("");
    setFormData({ ...event });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (event: EventWithId) => {
    setEventToDelete(event);
    setIsDeleteOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title?.trim() || !formData.dateTime || !formData.location?.trim()) {
      setFormError("Título, data/hora e local são obrigatórios.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    const payload: Event = {
      title: formData.title,
      dateTime: formData.dateTime,
      location: formData.location,
      description: formData.description || "",
    };

    try {
      if (isEditing && formData.id) {
        await api.put(`/api/v1/events/${formData.id}`, payload);
        setSuccessMsg("Evento atualizado com sucesso!");
      } else {
        await api.post("/api/v1/events", payload);
        setSuccessMsg("Evento cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      fetchEvents(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      setFormError(error.response?.data?.message || "Ocorreu um erro ao salvar o evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete?.id) return;
    
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    try {
      await api.delete(`/api/v1/events/${eventToDelete.id}`);
      setSuccessMsg(`Evento "${eventToDelete.title}" excluído com sucesso!`);
      setIsDeleteOpen(false);
      fetchEvents(); 
    } catch (error) {
      console.error("Erro ao deletar:", error);
      setGlobalError("Não foi possível excluir o evento no momento.");
      setIsDeleteOpen(false);
    } finally {
      setLoading(false);
      setEventToDelete(null);
    }
  };

  return {
    eventsData, loading, globalError, successMsg,
    isFormOpen, setIsFormOpen, isEditing, formError, formData,
    isDeleteOpen, setIsDeleteOpen, eventToDelete,
    handleInputChange, handleOpenCreate, handleOpenEdit, handleOpenDelete,
    handleSubmitForm, handleConfirmDelete,
  };
}