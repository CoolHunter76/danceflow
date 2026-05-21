"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { Home, Calendar, QrCode, User, Settings } from "lucide-react"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-950 text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 space-y-6">

        <div className="text-xl font-bold">
          DanceFlow 💃
        </div>

        <nav className="space-y-3">

          <Link href="/es/student" className="flex items-center gap-2">
            <Home size={18}/> Inicio
          </Link>

          <Link href="/es/student/events" className="flex items-center gap-2">
            <Calendar size={18}/> Eventos
          </Link>

          <Link href="/es/student/scan" className="flex items-center gap-2">
            <QrCode size={18}/> Escanear
          </Link>

          <Link href="/es/student/profile" className="flex items-center gap-2">
            <User size={18}/> Perfil
          </Link>

          <Link href="/es/student/settings" className="flex items-center gap-2">
            <Settings size={18}/> Configuración
          </Link>

        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

    </div>
  )
}