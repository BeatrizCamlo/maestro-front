import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventWithId } from "@/types/Event";

interface EventDeleteModalProps {
  isOpen: boolean; onOpenChange: (open: boolean) => void; event: EventWithId | null;
  loading: boolean; onConfirm: () => void;
}

export function EventDeleteModal({ isOpen, onOpenChange, event, loading, onConfirm }: EventDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-600 flex items-center gap-1">⚠️ Confirmar Exclusão</DialogTitle>
          <DialogDescription>Tem certeza que deseja excluir o evento <strong>{event?.title}</strong>? Esta ação é irreversível.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>{loading ? "Excluindo..." : "Sim, Excluir"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}