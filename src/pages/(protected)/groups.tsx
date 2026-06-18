"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Users } from "lucide-react";
import { useGroups } from "@/hooks/use-groups";
import { GroupsHeader } from "@/components/groups/groupsHeader";
import { GroupsTable } from "@/components/groups/groupsTable";
import { GroupDeleteModal } from "@/components/groups/groupsDeleteModal";
import { GroupFormModal } from "@/components/groups/groupsFormModal";
import { GroupSolicitationsModal } from "@/components/groups/groupsSolicitationsModal";
import { Button } from "@/components/ui/button";

export default function Groups() {
  const {
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
  } = useGroups();

  const [isSolicitationsOpen, setIsSolicitationsOpen] = useState(false);
  const [modalSuccessMsg, setModalSuccessMsg] = useState("");

  const handleModalSuccess = (msg: string) => {
    setModalSuccessMsg(msg);
    setTimeout(() => setModalSuccessMsg(""), 5000); // Some após 5s
  };

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-4 bg-neutral-50 font-sans text-slate-900">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <GroupsHeader onNewGroupClick={handleOpenCreate} />
        
        <Button
          onClick={() => setIsSolicitationsOpen(true)}
          variant="outline"
          className="flex items-center gap-2 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs h-9"
        >
          <Users className="w-4 h-4 text-amber-600" />
          Ver Pedidos de Entrada
        </Button>
      </div>
      
      <hr className="border-slate-200" />

      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-md text-sm font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
        </div>
      )}

      {modalSuccessMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-md text-sm font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {modalSuccessMsg}
        </div>
      )}
      
      {globalError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm font-medium animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600" />
          {globalError}
        </div>
      )}

      <GroupsTable
        groups={groupsData} 
        loading={loading} 
        onEdit={handleOpenEdit} 
        onDelete={handleOpenDelete} 
      />

      <GroupSolicitationsModal
        isOpen={isSolicitationsOpen}
        onOpenChange={setIsSolicitationsOpen}
        onSuccess={handleModalSuccess}
      />

      <GroupFormModal 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        isEditing={isEditing}
        formError={formError}
        formData={formData}
        loading={loading}
        onChange={handleInputChange}
        onSubmit={handleSubmitForm}
      />

      <GroupDeleteModal 
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        group={groupToDisable}
        loading={loading}
        onConfirm={handleConfirmDisable}
      />

    </div>
  );
}