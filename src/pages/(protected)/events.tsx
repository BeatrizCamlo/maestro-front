"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import { EventsTable } from "@/components/events/eventsTable";
import { EventFormModal } from "@/components/events/eventsFormModal";
import { EventDeleteModal } from "@/components/events/eventsDeletemodal";
import { EventsHeader } from "@/components/events/evetnsHeader";

export default function Events() {
  const {
    eventsData, loading, globalError, successMsg,
    isFormOpen, setIsFormOpen, isEditing, formError, formData,
    isDeleteOpen, setIsDeleteOpen, eventToDelete,
    handleInputChange, handleOpenCreate, handleOpenEdit, handleOpenDelete,
    handleSubmitForm, handleConfirmDelete,
  } = useEvents();

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-4 bg-neutral-50 font-sans text-slate-900">
      <EventsHeader onNewEventClick={handleOpenCreate} />
      
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

      <EventsTable
        events={eventsData} 
        loading={loading} 
        onEdit={handleOpenEdit} 
        onDelete={handleOpenDelete} 
      />

      <EventFormModal 
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        isEditing={isEditing}
        formError={formError}
        formData={formData}
        loading={loading}
        onChange={handleInputChange}
        onSubmit={handleSubmitForm}
      />

      <EventDeleteModal 
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        event={eventToDelete}
        loading={loading}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}