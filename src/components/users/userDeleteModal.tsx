import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "@/types/User";

interface UserDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  loading: boolean;
  onConfirm: () => void;
}

export function UserDeleteModal({ isOpen, onOpenChange, user, loading, onConfirm }: UserDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-1">⚠️ Confirmar Desativação</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja desativar o usuário <strong>{user?.name}</strong>? Esta ação revogará os acessos imediatos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Desativando..." : "Sim, Desativar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}