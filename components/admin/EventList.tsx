"use client"

import { useState, useEffect } from "react"
import { createEvent } from "@/app/actions/events"
import { getVenues } from "@/app/actions/venues"
import { getUsers } from "@/app/actions/users"

type Venue = {
  id: string
  name: string
}

type User = {
  id: string
  name: string
  role: string
}

export default function Page() {

  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [venueId, setVenueId] = useState("")
  const [teacherId, setTeacherId] = useState("")

  const [venues, setVenues] = useState<Venue[]>([])
  const [teachers, setTeachers] = useState<User[]>([])

  useEffect(() => {
    async function load() {
      const v = await getVenues()
      const u = await getUsers()

      setVenues(v)
      setTeachers(u.filter(user => user.role === "TEACHER"))
    }

    load()
  }, [])

  const handleSubmit = async () => {
    await createEvent({
      name,
      date,
      venueId,
      teacherId,
    })

    alert("Evento creado ✅")
  }

  return (
    <div className="p-6 space-y-4">

      <h1 className="text-2xl font-bold">
        Crear Evento
      </h1>

      <input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="datetime-local"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* LOCAL */}
      <select onChange={(e) => setVenueId(e.target.value)}>
        <option value="">Selecciona local</option>

        {venues.map(v => (
          <option key={v.id} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* PROFESOR */}
      <select onChange={(e) => setTeacherId(e.target.value)}>
        <option value="">Selecciona profesor</option>

        {teachers.map(t => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="bg-pink-600 px-4 py-2"
      >
        Crear Evento
      </button>

    </div>
  )
}
