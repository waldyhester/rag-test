"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function UsersComponent() {
  const [showAddUser, setShowAddUser] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
        <Button onClick={() => setShowAddUser(!showAddUser)}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </header>
      {showAddUser && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adicionar Novo Usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Nome" />
            <Input type="email" placeholder="E-mail corporativo" />
            <Button className="w-full">Salvar</Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Último Acesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João Silva</TableCell>
                <TableCell>jo ao@empresa.com</TableCell>
                <TableCell>01/03/2024 14:30</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria Santos</TableCell>
                <TableCell>maria@empresa.com</TableCell>
                <TableCell>02/03/2024 09:15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
