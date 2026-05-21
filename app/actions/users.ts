"use server"

import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client" 

export async function createUser(data: {
  name: string
  email: string
  role: Role
}) {
  return prisma.user.create({
    data,
  })
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function updateUserRole(userId: string, role: Role) {
  return prisma.user.update({
    where: { id: userId },
    data: { role }, 
  })
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  })
}