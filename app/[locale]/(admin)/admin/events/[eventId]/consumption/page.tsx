import { prisma } from "@/lib/prisma"
import ConsumptionList from "@/components/admin/ConsumptionList"

export default async function Page({
  params,
}: {
  params: { eventId: string }
}) {
  const { eventId } = params

  // obtener evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  })

  if (!event) {
    return <div>Evento no encontrado</div>
  }

  // ejemplo básico usuarios (ajústalo si ya tienes lógica avanzada)
  const users = await prisma.user.findMany()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Consumos del evento
      </h1>

      <ConsumptionList
        users={users}
        eventId={eventId}
        minConsumption={event.minConsumption}
      />
    </div>
  )
}