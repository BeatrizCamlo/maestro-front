"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Group } from "@/types/Group";

export type GroupWithId = Group & { id: string };

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

  // 1. LISTAGEM (GET api/v1/groups)
  const fetchGroups = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const response = await api.get("/api/v1/groups");
      setGroupsData(response.data);
    } catch (error) {
      console.error("Erro na listagem:", error);
      // Fallback de dados locais (API offline)
      setGroupsData([
        { id: "1", name: "grupo de teste 1", coordenatorId: "101" },
        { id: "2", name: "grupo de teste 2", coordenatorId: "102" },
      ]);
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

  // 2. CADASTRO & 3. EDIÇÃO
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
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
        await api.put(`/api/v1/groups/${formData.id}`, payload);
        setSuccessMsg("Grupo atualizado com sucesso!");
      } else {

        await api.post("/api/v1/groups", payload);
        setSuccessMsg("Grupo cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      fetchGroups(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      
      if (error.response?.status === 409) {
        setFormError("Já existe um grupo com este nome.");
      } else {
        if (isEditing && formData.id) {
          setGroupsData((prev) => 
            prev.map((g) => (g.id === formData.id ? { ...g, ...payload } : g))
          );
          setSuccessMsg("Grupo atualizado localmente (API offline).");
        } else {
          setGroupsData((prev) => [
            ...prev, 
            { ...payload, id: Date.now().toString() }
          ]);
          setSuccessMsg("Grupo cadastrado localmente (API offline).");
        }
        setIsFormOpen(false);
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. DELETAR / DESATIVAR
  const handleConfirmDisable = async () => {
    if (!groupToDisable?.id) return;
    
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    try {
      // DELETE api/v1/groups/{id}
      await api.delete(`/api/v1/groups/${groupToDisable.id}`);
      setSuccessMsg(`Grupo ${groupToDisable.name} deletado com sucesso!`);
      setIsDeleteOpen(false);
      fetchGroups(); 
    } catch (error) {
      console.error("Erro ao deletar:", error);
      
      setGroupsData((prev) => prev.filter((g) => g.id !== groupToDisable.id));
      setSuccessMsg(`Grupo ${groupToDisable.name} deletado localmente (API offline).`);
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