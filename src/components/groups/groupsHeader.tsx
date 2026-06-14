import { Button } from "@/components/ui/button";

interface GroupsHeaderProps {
  onNewGroupClick: () => void;
}

export function GroupsHeader({ onNewGroupClick }: GroupsHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Grupos</h1>
        <p className="text-sm text-muted-foreground">Gerencie os grupos de usuários e seus coordenadores.</p>
      </div>
      <Button size="lg" onClick={onNewGroupClick} className="bg-slate-900 hover:bg-slate-800">
        Novo Grupo
      </Button>
    </header>
  );
}