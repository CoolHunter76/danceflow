"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { Role } from "@prisma/client"

type CreateUserInput = {
  name: string
  email: string
  password: string
  role: Role
  teacherId?: string | null
}

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(input.password, 10)

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      teacherId: input.teacherId ?? null,
    },
  })
}

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function deleteUser(userId: string) {
  return prisma.user.delete({
    where: { id: userId },
  })
}