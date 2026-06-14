import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EventWithId } from "@/types/Event";
import { AlertCircle } from "lucide-react";

interface EventFormModalProps {
  isOpen: boolean; onOpenChange: (open: boolean) => void; isEditing: boolean;
  formError: string; formData: Partial<EventWithId>; loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function EventFormModal({ isOpen, onOpenChange, isEditing, formError, formData, loading, onChange, onSubmit }: EventFormModalProps) {
 
  const getCurrentDateTime = () => {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(Date.now() - tzoffset)).toISOString().slice(0, 16);
};

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Evento" : "Novo Evento"}</DialogTitle>
            <DialogDescription>Preencha os detalhes do evento. Campos com * são obrigatórios.</DialogDescription>
          </DialogHeader>

          {formError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-md text-xs font-medium mt-3">
              <AlertCircle className="w-3.5 h-3.5" />{formError}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-500">Título *</label>
              <Input id="title" name="title" value={formData.title || ""} onChange={onChange} required />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dateTime" className="text-xs font-bold uppercase tracking-wider text-slate-500">Data e Hora *</label>
              <Input id="dateTime" min={getCurrentDateTime()} name="dateTime" type="datetime-local" value={formData.dateTime || ""} onChange={onChange} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-slate-500">Local *</label>
              <Input id="location" name="location" value={formData.location || ""} onChange={onChange} required />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-slate-500">Descrição</label>
              <Input id="description" name="description" value={formData.description || ""} onChange={onChange} />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}