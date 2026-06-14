import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2, Loader2, Calendar } from "lucide-react";
import { EventWithId } from "@/types/Event";

interface EventsTableProps {
  events: EventWithId[];
  loading: boolean;
  onEdit: (event: EventWithId) => void;
  onDelete: (event: EventWithId) => void;
}

export function EventsTable({ events, loading, onEdit, onDelete }: EventsTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[30%] font-semibold text-slate-700">Título</TableHead>
            <TableHead className="w-[20%] font-semibold text-slate-700">Data e Hora</TableHead>
            <TableHead className="w-[25%] font-semibold text-slate-700">Local</TableHead>
            <TableHead className="w-[15%] text-center font-semibold text-slate-700">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && events.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center h-32"><Loader2 className="w-4 h-4 animate-spin mx-auto" /></TableCell></TableRow>
          ) : events.length === 0 ? (
            <TableRow><TableCell colSpan={4} className="text-center h-24 text-muted-foreground">Nenhum evento cadastrado.</TableCell></TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium text-slate-800">{event.title}</TableCell>
                <TableCell className="text-slate-600 flex items-center gap-2 mt-1">
                  {new Date(event.dateTime).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                </TableCell>
                <TableCell className="text-slate-600">{event.location}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(event)}><SquarePen className="w-4 h-4 text-slate-600" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(event)}><Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" /></Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}