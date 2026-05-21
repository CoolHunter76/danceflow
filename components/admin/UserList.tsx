"use client"

import { deleteUser, updateUserRole } from "@/app/actions/users"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: string
}

export default function UserList({ users }: { users: User[] }) {
  const router = useRouter()

  return (
    <div className="space-y-4">

      {users.map(user => (
        <div
          key={user.id}
          className="bg-dark-card p-4 rounded-xl border flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-pink-400">{user.role}</p>
          </div>

          <div className="flex gap-2">

            {/* 🔥 CAMBIAR ROL */}
            <button
              onClick={async () => {
                await updateUserRole(user.id, "ADMIN")
                router.refresh()
              }}
              className="px-3 py-1 bg-blue-500 rounded"
            >
              Admin
            </button>

            {/* 🧨 ELIMINAR */}
            <button
              onClick={async () => {
                await deleteUser(user.id)
                router.refresh()
              }}
              className="px-3 py-1 bg-red-500 rounded"
            >
              Eliminar
            </button>

          </div>

        </div>
      ))}

    </div>
  )
}