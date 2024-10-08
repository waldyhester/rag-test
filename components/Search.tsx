"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Star } from "lucide-react";
import Link from "next/link";

export default function SearchComponent() {
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["001"]); // Simulating pre-favorited item

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Busca de Licitações</h1>
      </header>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input placeholder="Buscar licitações..." className="flex-grow" />
          <Button>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <option value="">Estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </Select>
              <Select>
                <option value="">Setor</option>
                <option value="tecnologia">Tecnologia</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
              </Select>
              <Input type="date" placeholder="Data Inicial" />
              <Input type="date" placeholder="Data Final" />
              <Select>
                <option value="">Status</option>
                <option value="active">Ativa</option>
                <option value="closed">Encerrada</option>
                <option value="inTime">Dentro do Prazo</option>
              </Select>
              <Button className="w-full">Aplicar Filtros</Button>
            </CardContent>
          </Card>
        )}
        <div className="space-y-4">
          {["001", "002"].map((id) => (
            <Link key={id} href="/details" className="mt-2">
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">Licitação {id}/2024</h3>
                      <p className="text-sm text-gray-500">
                        Estado: {id === "001" ? "SP" : "RJ"} | Setor:{" "}
                        {id === "001" ? "Tecnologia" : "Saúde"}
                      </p>
                      <p className="text-sm">
                        Data Limite:{" "}
                        {id === "001" ? "15/03/2024" : "20/03/2024"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          favorites.includes(id) ? "fill-yellow-400" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
