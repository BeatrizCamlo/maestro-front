import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2, Loader2 } from "lucide-react";
import { GroupWithId } from "@/hooks/use-groups";

interface GroupsTableProps {
  groups: GroupWithId[];
  loading: boolean;
  onEdit: (group: GroupWithId) => void;
  onDelete: (group: GroupWithId) => void;
}

export function GroupsTable({ groups, loading, onEdit, onDelete }: GroupsTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[45%] font-semibold text-slate-700">Nome do Grupo</TableHead>
            <TableHead className="w-[40%] font-semibold text-slate-700">ID do Coordenador</TableHead>
            <TableHead className="w-[15%] text-center font-semibold text-slate-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && groups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center h-32 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                  Carregando grupos...
                </div>
              </TableCell>
            </TableRow>
          ) : groups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                Nenhum grupo cadastrado no momento.
              </TableCell>
            </TableRow>
          ) : (
            groups.map((group) => (
              <TableRow key={group.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{group.name}</TableCell>
                <TableCell className="text-slate-600">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                    {group.coordenadorId}
                  </span>
                </TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(group)} title="Editar">
                    <SquarePen className="w-4 h-4 text-slate-600" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(group)} title="Excluir">
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}