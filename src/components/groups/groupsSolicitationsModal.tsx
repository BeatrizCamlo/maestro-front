"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2, AlertCircle } from "lucide-react";
import api from "@/services/api";

interface VinculoSolicitation {
  id: number;
  alunoNome: string;
  alunoMatricula: string;
  grupoNome: string;
}

interface GroupSolicitationsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (msg: string) => void;
}

export function GroupSolicitationsModal({
  isOpen,
  onOpenChange,
  onSuccess,
}: GroupSolicitationsModalProps) {
  const [solicitations, setSolicitations] = useState<VinculoSolicitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);

  const fetchSolicitations = async () => {
    setLoading(true);
    try {
      const response = await api.get("/v1/grupos-musicais/solicitacoes-vinculo/pendentes");
      setSolicitations(response.data || []);
    } catch (err) {
      console.error("Erro ao carregar solicitações de vínculo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSolicitations();
    }
  }, [isOpen]);

  const handleAction = async (id: number, endpoint: "aprovar" | "recusar", actionName: string) => {
    setActionId(id);
    try {
      await api.put(`/v1/grupos-musicais/solicitacoes-vinculo/${id}/${endpoint}`, {});
      
      onSuccess(`Solicitação de entrada ${actionName} com sucesso!`);
      fetchSolicitations();
    } catch (err) {
      console.error(`Erro ao ${endpoint} solicitação:`, err);
    } finally {
      setActionId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Solicitações de Entrada (Alunos)</DialogTitle>
          <DialogDescription>
            Abaixo estão os alunos que solicitaram vínculo aos seus grupos musicais.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
          </div>
        ) : solicitations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-xl bg-slate-50">
            <AlertCircle className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-sm text-slate-500 font-medium">Nenhuma solicitação pendente.</p>
          </div>
        ) : (
          <div className="overflow-x-auto border rounded-lg max-h-[350px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b uppercase font-bold text-slate-500 sticky top-0">
                <tr>
                  <th className="p-3">Aluno</th>
                  <th className="p-3">Matrícula</th>
                  <th className="p-3">Grupo</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                {solicitations.map((sol) => (
                  <tr key={sol.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium">{sol.alunoNome}</td>
                    <td className="p-3 text-slate-500 font-mono">{sol.alunoMatricula}</td>
                    <td className="p-3 font-semibold text-sky-700">{sol.grupoNome}</td>
                    <td className="p-3 flex justify-center gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border border-emerald-100"
                        disabled={actionId !== null}
                        onClick={() => handleAction(sol.id, "aprovar", "aprovada")}
                      >
                        {actionId === sol.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-100"
                        disabled={actionId !== null}
                        onClick={() => handleAction(sol.id, "recusar", "recusada")}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}