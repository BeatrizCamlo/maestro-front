"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Group } from "@/types/Group";

export type GroupWithId = Group & { id: string | number };

export function useGroups() {
  const [groupsData, setGroupsData] = useState<GroupWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  
  const [formError, setFormError] = useState<string>("");
  const [groupToDisable, setGroupToDisable] = useState<GroupWithId | null>(null);
  
  const [formData, setFormData] = useState<Partial<GroupWithId>>({
    name: "",
    coordenatorId: ""
  });

  const fetchGroups = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const response = await api.get("/v1/grupos-musicais");
      const pageContent = response.data.content || [];
      setGroupsData(pageContent);
    } catch (error) {
      console.error("Erro na listagem:", error);
      setGlobalError("Não foi possível carregar os grupos musicais do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formError) setFormError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormError("");
    setFormData({ name: "", coordenatorId: "" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (group: GroupWithId) => {
    setIsEditing(true);
    setFormError("");
    setFormData({
      id: group.id,
      name: group.name,
      coordenatorId: group.coordenatorId,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (group: GroupWithId) => {
    setGroupToDisable(group);
    setIsDeleteOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name?.trim() || !formData.coordenatorId?.trim()) {
      setFormError("Nome e Coordenador são obrigatórios.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    const payload: Group = {
      name: formData.name,
      coordenatorId: formData.coordenatorId,
    };

    try {
      if (isEditing && formData.id) {
        await api.put(`/v1/grupos-musicais/${formData.id}`, payload);
        setSuccessMsg("Grupo atualizado com sucesso!");
      } else {
        await api.post("/v1/grupos-musicais", payload);
        setSuccessMsg("Grupo cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      fetchGroups(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      
      if (error.response?.status === 409) {
        setFormError("Já existe um grupo com este nome ou conflito de dados.");
      } else {
        setFormError(error.response?.data?.message || "Ocorreu um erro ao salvar o grupo musical.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDisable = async () => {
    if (!groupToDisable?.id) return;
    
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    try {
      await api.delete(`/v1/grupos-musicais/${groupToDisable.id}`);
      setSuccessMsg(`Grupo "${groupToDisable.name}" excluído com sucesso!`);
      setIsDeleteOpen(false);
      fetchGroups(); 
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      if (error.response?.status === 409) {
        setGlobalError("Não é possível excluir o grupo pois ele possui dependências vinculadas.");
      } else {
        setGlobalError("Não foi possível excluir o grupo musical no momento.");
      }
      setIsDeleteOpen(false);
    } finally {
      setLoading(false);
      setGroupToDisable(null);
    }
  };

  return {
    groupsData,
    loading,
    globalError,
    successMsg,
    isFormOpen,
    setIsFormOpen,
    isEditing,
    formError,
    formData,
    isDeleteOpen,
    setIsDeleteOpen,
    groupToDisable,
    handleInputChange,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleSubmitForm,
    handleConfirmDisable,
  };
}