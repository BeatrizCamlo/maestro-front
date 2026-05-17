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
import { User } from "@/types/User";
import { AlertCircle } from "lucide-react";

interface UserFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  formError: string;
  formData: User; 
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UserFormModal({
  isOpen,
  onOpenChange,
  isEditing,
  formError,
  formData,
  loading,
  onChange,
  onSubmit,
}: UserFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
            <DialogDescription>
              Preencha as informações cadastrais do usuário.
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
                Nome Completo *
              </label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={onChange} 
                placeholder="Ex: Arthur Boma"
                required 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                E-mail corporativo *
              </label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={onChange} 
                placeholder="exemplo@teste.com"
                required 
                disabled={isEditing} 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="perfil" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Perfil de Acesso
              </label>
              <select
                id="perfil"
                name="perfil"
                value={formData.perfil}
                onChange={onChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="SOLICITANTE">Solicitante</option>
                <option value="COORDENADOR DE GRUPO">Coordenador de Grupo</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            {isEditing && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={onChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="ativo">Ativo</option>
                  <option value="desativado">Desativado</option>
                </select>
              </div>
            )}
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