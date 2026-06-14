import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GroupWithId } from "@/hooks/use-groups"; // Importe a tipagem do seu hook

interface GroupDeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  group: GroupWithId | null;
  loading: boolean;
  onConfirm: () => void;
}

export function GroupDeleteModal({ isOpen, onOpenChange, group, loading, onConfirm }: GroupDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-1">⚠️ Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir o grupo <strong>{group?.name}</strong>? Esta ação é irreversível e removerá o grupo permanentemente.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Excluindo..." : "Sim, Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}