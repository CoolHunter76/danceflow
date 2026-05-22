"use client"

import { addConsumption } from "@/app/actions/consumption"
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
  minConsumption: number 
}

export default function ConsumptionList({
  users,
  eventId,
  minConsumption,
}: Props) {

  const router = useRouter()
  const [amount, setAmount] = useState<number>(5)

  return (
    <div className="space-y-4">

      {users.map((user) => {

        const percentage =
          minConsumption > 0
            ? Math.min((user.total / minConsumption) * 100, 100)
            : 100

        const isEnough = user.total >= minConsumption

        return (
          <div key={user.id} className="space-y-1">

            <div className="flex items-center gap-4">

              <p className="w-32">{user.name}</p>

              <p
                className={`w-24 font-semibold ${
                  isEnough ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.total.toFixed(2)} €
              </p>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-20"
              />

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

            {minConsumption > 0 && (
              <div>

                <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
                  <div
                    className={`h-full ${
                      isEnough ? "bg-green-500" : "bg-orange-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {isEnough
                    ? `✅ Cumple mínimo (${user.total.toFixed(2)}€)`
                    : `❌ Faltan ${(minConsumption - user.total).toFixed(2)}€`}
                  {" · "}
                  {percentage.toFixed(0)}%
                </p>

              </div>
            )}

          </div>
        )
      })}

    </div>
  )
}