"use client"

import { useState } from "react"
import { createUser } from "@/app/actions/users"
import { Role } from "@prisma/client"

export default function Page() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [role, setRole] = useState<Role>("STUDENT")

  const handleSubmit = async () => {
    await createUser({
      name,
      email,
      password,
      role,
    })

    alert("Usuario creado")
  }

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">
        Crear Usuario
      </h1>

      {/* NOMBRE */}
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />

      {/* ROL */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className="border p-2 w-full"
      >
        <option value="STUDENT">Alumno</option>
        <option value="TEACHER">Profesor</option>
        <option value="VENUE_OWNER">Propietario local</option>
        <option value="ADMIN">Admin</option>
      </select>

      {/* BOTÓN */}
      <button
        onClick={handleSubmit}
        className="bg-pink-600 text-white px-4 py-2 rounded"
      >
        Crear
      </button>

    </div>
  )
}