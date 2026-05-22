"use client"

import { deleteEvent } from "@/app/actions/events"
import { useRouter } from "next/navigation"

type Event = {
  id: string
  name: string
  date: Date
  venue: {
    name: string
  }
  teacher: {
    name: string
  }
}

type Props = {
  events: Event[]
}

export default function EventList({ events }: Props) {
  const router = useRouter()

  return (
    <div className="space-y-4">

      {events.map((event) => (

        <div
          key={event.id}
          className="bg-dark-card p-4 rounded-xl border flex justify-between"
        >
          <div>

            <p className="font-semibold">{event.name}</p>

            <p className="text-gray-400 text-sm">
              {new Date(event.date).toLocaleString()}
            </p>

            <p className="text-pink-400">
              {event.venue.name}
            </p>

            <p className="text-blue-400">
              Profesor: {event.teacher.name}
            </p>

          </div>

          <button
            onClick={async () => {
              await deleteEvent(event.id)
              router.refresh()
            }}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Eliminar
          </button>

        </div>

      ))}

    </div>
  )
}