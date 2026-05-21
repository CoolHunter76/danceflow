import { getEvents } from "@/app/actions/events"
import EventList from "@/components/admin/EventList"

export default async function Page() {
  const events = await getEvents()

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Eventos
      </h1>

      <EventList events={events} />

    </div>
  )
}