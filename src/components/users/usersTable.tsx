import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2, Loader2 } from "lucide-react";
import { User } from "@/types/User";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, loading, onEdit, onDelete }: UsersTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[25%] font-semibold text-slate-700">Nome</TableHead>
            <TableHead className="w-[35%] font-semibold text-slate-700">Email</TableHead>
            <TableHead className="w-[15%] font-semibold text-slate-700">Perfil</TableHead>
            <TableHead className="w-[15%] font-semibold text-slate-700">Status</TableHead>
            <TableHead className="w-[10%] text-center font-semibold text-slate-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                  Carregando usuários...
                </div>
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                Nenhum usuário cadastrado no momento.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.email} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                <TableCell className="text-slate-600">{user.email}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                    {user.perfil}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                    user.status === "ativo" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                    {user.status === "ativo" ? "Ativo" : "Desativado"}
                  </span>
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  
                  <Button variant="ghost" size="sm" onClick={() => onEdit(user)} title="Editar">
                    <SquarePen className="w-4 h-4 text-slate-600" />
                  </Button>
                  
                  {user.status === "ativo" && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(user)} title="Desativar">
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </Button>
                  )}
                  
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}