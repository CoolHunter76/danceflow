export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import EventList from "@/components/admin/EventList"

export default async function Page() {

  const events = await prisma.event.findMany({
    include: {
      venue: true,
      teacher: true,
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Eventos
      </h1>

      <EventList events={events} />

    </div>
  )
}