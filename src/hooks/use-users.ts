"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/User";
import api from "@/services/api";

// Extensão do tipo User para garantir o suporte ao {id} exigido no escopo
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

  // 1. LISTAGEM (GET api/v1/users)
  const fetchUsers = async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const response = await api.get("/api/v1/users");
      // Mapeia os dados garantindo que haja um id (usa o email como fallback caso o backend não envie id)
      const usersWithKeys = response.data.map((user: any) => ({
        ...user,
        id: user.id || user.email
      }));
      setUsersData(usersWithKeys);
    } catch (error) {
      console.error("Erro na listagem:", error);
      // Fallback de dados locais caso a API falte no teste local
      setUsersData([
        { id: "1", name: "arthur", email: "arthurboma@teste.com", perfil: "SOLICITANTE", status: "ativo" },
        { id: "2", name: "arthur", email: "arthurboma@teste2.com", perfil: "SOLICITANTE", status: "ativo" },
      ]);
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

  // 2. CADASTRO (POST api/v1/users) & 3. EDIÇÃO (PUT api/v1/users/{id})
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Nome e Email são obrigatórios.");
      return;
    }

    setLoading(true);
    setFormError("");
    setSuccessMsg("");

    const userId = formData.id || formData.email;

    try {
      if (isEditing) {
        // EDIÇÃO: Envia para api/v1/users/{id}
        await api.put(`/api/v1/users/${userId}`, formData);
        setSuccessMsg("Usuário atualizado com sucesso!");
      } else {
        // CADASTRO: Envia para api/v1/users
        await api.post("/api/v1/users", formData);
        setSuccessMsg("Usuário cadastrado com sucesso!");
      }
      setIsFormOpen(false);
      fetchUsers(); // Atualiza a lista vinda do banco automaticamente após ação
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      
      // Validação de E-mail duplicado baseada nas regras de negócio
      if (error.response && error.response.status === 409) {
        setFormError("Este e-mail já está cadastrado no sistema.");
      } else {
        // Fallback local caso queira testar a renderização visual sem banco de dados ativo
        if (isEditing) {
          setUsersData((prev) => prev.map((u) => (u.id === userId || u.email === formData.email ? formData : u)));
          setSuccessMsg("Usuário atualizado localmente (API offline).");
          setIsFormOpen(false);
        } else {
          if (usersData.some((u) => u.email === formData.email)) {
            setFormError("Este e-mail já está cadastrado na lista local.");
          } else {
            setUsersData((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
            setSuccessMsg("Usuário cadastrado localmente (API offline).");
            setIsFormOpen(false);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. DESATIVAÇÃO (DELETE api/v1/users/{id})
  const handleConfirmDisable = async () => {
    if (!userToDisable) return;
    setLoading(true);
    setGlobalError("");
    setSuccessMsg("");

    const userId = userToDisable.id || userToDisable.email;
    
    try {
      // DESATIVAÇÃO: Envia para api/v1/users/{id}
      await api.delete(`/api/v1/users/${userId}`);
      setSuccessMsg(`Usuário ${userToDisable.name} desativado com sucesso!`);
      setIsDeleteOpen(false);
      fetchUsers(); // Atualiza a lista após desativar
    } catch (error) {
      console.error("Erro ao desativar:", error);
      
      // Fallback local para simulação visual instantânea
      setUsersData((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: "desativado" as const } : u))
      );
      setSuccessMsg(`Usuário ${userToDisable.name} desativado localmente (API offline).`);
      setIsDeleteOpen(false);
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
  };
}