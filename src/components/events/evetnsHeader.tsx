import { Button } from "@/components/ui/button";

export function EventsHeader({ onNewEventClick }: { onNewEventClick: () => void }) {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Eventos</h1>
        <p className="text-sm text-muted-foreground">Gerencie o calendário e as informações dos eventos.</p>
      </div>
      <Button size="lg" onClick={onNewEventClick} className="bg-slate-900 hover:bg-slate-800">
        Novo Evento
      </Button>
    </header>
  );
}