import { prisma } from "@/lib/prisma"
import ConsumptionList from "@/components/admin/ConsumptionList"
import { User, AttendanceType } from "@prisma/client"

export default async function Page({
  params,
}: {
  params: { eventId: string }
}) {
  const { eventId } = params

  // Obtener evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  })

  if (!event) {
    return <div>Evento no encontrado</div>
  }

  // Obtener historial de asistencia
  const attendances = await prisma.attendance.findMany({
    where: { eventId },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  })

  const userLastStatus = new Map<
    string,
    { user: User; type: AttendanceType }
  >()

  attendances.forEach((a) => {
    userLastStatus.set(a.user.id, {
      user: a.user,
      type: a.type,
    })
  })

  // Filtrar usuarios que están dentro del evento
  const usersInside = Array.from(userLastStatus.values())
    .filter((u) => u.type === "ENTRY")
    .map((u) => u.user)

  // Obtener consumos agrupados
  const consumptions = await prisma.consumption.groupBy({
    by: ["userId"],
    where: { eventId },
    _sum: {
      amount: true,
    },
  })

  const totalsMap = new Map<string, number>()

  consumptions.forEach((c) => {
    totalsMap.set(c.userId, c._sum.amount || 0)
  })

  // Construir estructura final para el componente
  const usersWithTotal = usersInside.map((user) => ({
    id: user.id,
    name: user.name,
    total: totalsMap.get(user.id) || 0,
  }))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Consumos del evento
      </h1>

      <ConsumptionList
        users={usersWithTotal}
        eventId={eventId}
        minConsumption={event.minConsumption}
      />
    </div>
  )
}