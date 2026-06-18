import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GroupWithId } from "@/hooks/use-groups";
import { AlertCircle } from "lucide-react";

interface GroupFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  formError: string;
  formData: Partial<GroupWithId>; 
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function GroupFormModal({
  isOpen,
  onOpenChange,
  isEditing,
  formError,
  formData,
  loading,
  onChange,
  onSubmit,
}: GroupFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Grupo" : "Novo Grupo"}</DialogTitle>
            <DialogDescription>
              Preencha as informações cadastrais do grupo.
            </DialogDescription>
          </DialogHeader>

          {formError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded-md text-xs font-medium mt-3 animate-in fade-in duration-200">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              {formError}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Nome do Grupo *
              </label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name || ""} 
                onChange={onChange} 
                required 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="coordenadorId" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ID do Coordenador *
              </label>
              <Input 
                id="coordenador/Id" 
                name="coordenadorId" 
                value={formData.coordenadorId || ""} 
                onChange={onChange}
                required 
              />
       
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}