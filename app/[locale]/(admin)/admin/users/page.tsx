import { getUsers } from "@/app/actions/users"
import UserList from "@/components/admin/UserList"

export default async function Page() {
  const users = await getUsers()

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Usuarios
      </h1>

      <UserList users={users} />

    </div>
  )
}
