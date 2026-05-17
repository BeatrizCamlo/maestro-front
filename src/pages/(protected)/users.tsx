"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/User";

import { Delete, SquarePen } from "lucide-react";

export default function Users() {
  const usersData: User[] = [
    { name: "arthur", email: "arthurboma@teste.com", perfil: "SOLICITANTE", status: "ativo" },
     { name: "arthur", email: "arthurboma@teste2.com", perfil: "SOLICITANTE", status: "ativo" },
  ];

  return (
    <div className="p-4 flex flex-col w-full min-h-screen gap-2">
      <header className="flex justify-between ">
        <p className="title">Usuarios</p>
        <Button size="lg">Novo Usuário</Button>
      </header>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/10">Nome</TableHead>
            <TableHead className="w-4/10">Email</TableHead>
            <TableHead className="w-2/10 ">Perfil</TableHead>
            <TableHead className="w-2/10">Status</TableHead>
            <TableHead className="w-2/10 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.name}>
              
              <TableCell >{user.name}</TableCell>
              
              <TableCell >{user.email}</TableCell>
              <TableCell >{user.perfil}</TableCell>
              <TableCell>{user.status}</TableCell>

              <TableCell className="flex justify-center items-center gap-2">
                <Button>
                  <SquarePen />
                </Button>

                <Button variant="destructive">
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
