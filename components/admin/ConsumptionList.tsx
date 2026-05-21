"use client"

import { addConsumption } from "@/app/actions/consption"
import { useRouter } from "next/navigation"
import { useState } from "react"

type User = {
  id: string
  name: string
  total: number 
}

type Props = {
  users: User[]
  eventId: string
}

export default function ConsumptionList({ users, eventId }: Props) {
  const router = useRouter()
  const [amount, setAmount] = useState<number>(5)

  return (
    <div className="space-y-4">

      {users.map((user) => (

        <div key={user.id} className="flex gap-4 items-center">

          {/* NOMBRE */}
          <p className="w-32">{user.name}</p>

          {/* ✅ TOTAL */}
          <p className="text-green-400 w-24">
            {user.total.toFixed(2)} €
          </p>

          {/* INPUT */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-20"
          />

          {/* BOTÓN */}
          <button
            onClick={async () => {
              await addConsumption({
                userId: user.id,
                eventId,
                amount,
              })
              router.refresh()
            }}
            className="bg-green-600 px-2 py-1 rounded"
          >
            Añadir
          </button>

        </div>

      ))}

    </div>
  )
}