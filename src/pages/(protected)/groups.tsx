"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { useGroups } from "@/hooks/use-groups";
import { GroupsHeader } from "@/components/groups/groupsHeader";
import { GroupsTable } from "@/components/groups/groupsTable";
import { GroupDeleteModal } from "@/components/groups/groupsDeleteModal";
import { GroupFormModal } from "@/components/groups/groupsFormModal";


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

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-4 bg-neutral-50 font-sans text-slate-900">
      <GroupsHeader onNewGroupClick={handleOpenCreate} />
      
      <hr className="border-slate-200" />

      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-md text-sm font-medium animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {successMsg}
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