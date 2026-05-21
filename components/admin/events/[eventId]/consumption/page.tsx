import { prisma } from "@/lib/prisma"
import ConsumptionList from "@/components/admin/ConsumptionList"

export default async function Page({ params }: { params: { eventId: string } }) {

  const { eventId } = params

  // 🔥 obtener TODOS los scans del evento
  const attendances = await prisma.attendance.findMany({
    where: {
      eventId,
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "asc", // importante para lógica
    },
  })

  // 🔥 map para guardar el último estado por usuario
  const userLastStatus = new Map()

  attendances.forEach(a => {
    userLastStatus.set(a.user.id, {
      user: a.user,
      type: a.type,
    })
  })

  // 🔥 quedarnos SOLO con usuarios cuyo último estado es ENTRY
  const users = Array.from(userLastStatus.values())
    .filter(u => u.type === "ENTRY")
    .map(u => u.user)

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Consumos del evento
      </h1>

      <ConsumptionList users={users} eventId={eventId} />

    </div>
  )
}