'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

export default function FavoritesComponents() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Favoritos</h1>
      </header>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <Star className="h-4 w-4 mr-4 fill-yellow-400" />
            <div>
              <h3 className="font-bold">Licitação 001/2024</h3>
              <p className="text-sm text-gray-500">Estado: SP | Setor: Tecnologia</p>
              <p className="text-sm">Data Limite: 15/03/2024</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <Star className="h-4 w-4 mr-4 fill-yellow-400" />
            <div>
              <h3 className="font-bold">Licitação 002/2024</h3>
              <p className="text-sm text-gray-500">Estado: RJ | Setor: Saúde</p>
              <p className="text-sm">Data Limite: 20/03/2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}