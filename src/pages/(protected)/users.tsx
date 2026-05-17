"use client";

import { useUsers } from "@/hooks/use-users"; 
import { UsersHeader } from "@/components/users/usersHeader";
import { UsersTable } from "@/components/users/usersTable";
import { UserFormModal } from "@/components/users/userFormModal";
import { UserDeleteModal } from "@/components/users/userDeleteModal";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Users() {
  const {
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
  } = useUsers();

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-4 bg-neutral-50 font-sans text-slate-900">
      <UsersHeader onNewUserClick={handleOpenCreate} />
      
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

      <UsersTable 
        users={usersData} 
        loading={loading} 
        onEdit={handleOpenEdit} 
        onDelete={handleOpenDelete} 
      />

      <UserFormModal 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        isEditing={isEditing}
        formError={formError}
        formData={formData}
        loading={loading}
        onChange={handleInputChange}
        onSubmit={handleSubmitForm}
      />

      <UserDeleteModal 
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        user={userToDisable}
        loading={loading}
        onConfirm={handleConfirmDisable}
      />

    </div>
  );
}
