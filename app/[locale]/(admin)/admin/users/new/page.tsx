"use client"

import { useState } from "react"
import { createUser } from "@/app/actions/users"
import { Role } from "@prisma/client"

export default function Page() {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  // 🔥 AQUÍ ESTÁ EL CAMBIO IMPORTANTE
  const [role, setRole] = useState<Role>("STUDENT")

  const handleSubmit = async () => {
    await createUser({
      name,
      email,
      role, // ✅ sin any
    })

    alert("Usuario creado")
  }

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">
        Crear Usuario
      </h1>

      <input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)} // ✅ cast controlado
      >
        <option value="STUDENT">Alumno</option>
        <option value="TEACHER">Profesor</option>
        <option value="VENUE_OWNER">Dueño Local</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-pink-600 px-4 py-2"
      >
        Crear
      </button>

    </div>
  )
}