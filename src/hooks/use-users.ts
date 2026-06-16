"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/User";
import api from "@/services/api";

export type UserWithId = User & { id?: string | number };

export function useUsers() {
  const [usersData, setUsersData] = useState<UserWithId[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  
  const [formError, setFormError] = useState<string>("");
  const [userToDisable, setUserToDisable] = useState<UserWithId | null>(null);
  
  const [formData, setFormData] = useState<UserWithId>({
    id: "",
    name: "",
    email: "",
    perfil: "SOLICITANTE",
    status: "ativo"
  });
  
  const fetchUsers = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const response = await api.get("/user-info");
      const pageContent = response.data.content || [];
      const usersWithKeys = pageContent.map((user: any) => ({
        ...user,
        id: user.id || user.email
      }));
      setUsersData(usersWithKeys);
    } catch (error) {
      console.error("Erro na listagem:", error);
      setGlobalError("Não foi possível carregar os usuários do servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formError) setFormError("");
    setFormData((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleOpenCreate = () => {
    setIsEditing(false);
    setFormError("");
    setFormData({ id: "", name: "", email: "", perfil: "SOLICITANTE", status: "ativo" });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (user: UserWithId) => {
    setIsEditing(true);
    setFormError("");
    setFormData({
      id: user.id || user.email,
      name: user.name,
      email: user.email,
      perfil: user.perfil,
      status: user.status,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (user: UserWithId) => {
    setUserToDisable(user);
    setIsDeleteOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Nome e Email são obrigatórios.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    const userId = formData.id;

    try {
      if (isEditing && userId) {
        await api.put(`/user-info/${userId}`, formData);
        setSuccessMsg("Usuário atualizado com sucesso!");
      } else {
        await api.post("/user-info", formData);
        setSuccessMsg("Usuário cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      fetchUsers(); 
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      
      if (error.response && error.response.status === 409) {
        setFormError(error.response.data.message || "Conflito de dados ou e-mail já cadastrado.");
      } else {
        setFormError(error.response?.data?.message || "Ocorreu um erro ao salvar o usuário.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDisable = async () => {
    if (!userToDisable || !userToDisable.id) return;
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");
    
    try {
      await api.delete(`/user-info/${userToDisable.id}`);
      setSuccessMsg(`Usuário ${userToDisable.name} excluído com sucesso!`);
      setIsDeleteOpen(false);
      fetchUsers(); 
    } catch (error: any) {
      console.error("Erro ao excluir:", error);
      if (error.response?.status === 409) {
        setGlobalError("Não é possível excluir o usuário devido a dependências ou regras de negócio.");
      } else {
        setGlobalError("Não foi possível excluir o usuário no momento.");
      }
      setIsDeleteOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteToCoordinator = async (id: string | number) => {
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");
    try {
      await api.patch(`/user-info/${id}/coordenador`);
      setSuccessMsg("Usuário promovido a coordenador com sucesso!");
      fetchUsers();
    } catch (error: any) {
      console.error("Erro ao promover usuário:", error);
      setGlobalError(error.response?.data?.message || "Erro ao tornar usuário coordenador.");
    } finally {
      setLoading(false);
    }
  };

  return {
    usersData,
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
    userToDisable,
    handleInputChange,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleSubmitForm,
    handleConfirmDisable,
    handlePromoteToCoordinator,
  };
}