import { Button } from "@/components/ui/button";

interface UsersHeaderProps {
  onNewUserClick: () => void;
}

export function UsersHeader({ onNewUserClick }: UsersHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Usuários</h1>
        <p className="text-sm text-muted-foreground">Gerencie a listagem, permissões e status dos colaboradores.</p>
      </div>
      <Button size="lg" onClick={onNewUserClick} className="bg-slate-900 hover:bg-slate-800">
        Novo Usuário
      </Button>
    </header>
  );
}