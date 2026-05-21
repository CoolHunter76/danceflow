"use server"

import { prisma } from "@/lib/prisma"

export async function addConsumption(data: {
  userId: string
  eventId: string
  amount: number
}) {
  return prisma.consumption.create({
    data,
  })
}


export async function getTotalConsumption(userId: string, eventId: string) {
  const result = await prisma.consumption.aggregate({
    where: {
      userId,
      eventId,
    },
    _sum: {
      amount: true,
    },
  })

  return result._sum.amount || 0
}

