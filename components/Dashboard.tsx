"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardComponent() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtrar por período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1"
              />
            </div>
            <Button className="w-full">Aplicar Filtro</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-gray-500">Novos Documentos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-gray-500">Licitações Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
