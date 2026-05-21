"use server"

import { prisma } from "@/lib/prisma"


export async function createEvent(data: {
  name: string
  date: string
  venueId: string
  teacherId: string
  hasMinConsumption: boolean
}) {
  return prisma.event.create({
    data: {
      name: data.name,
      date: new Date(data.date),
      venueId: data.venueId,
      teacherId: data.teacherId,
      hasMinConsumption: data.hasMinConsumption,
    },
  })
}

export async function getEvents() {
  return prisma.event.findMany({
    include: {
      venue: true,
      teacher: true,
    },
    orderBy: {
      date: "asc",
    },
  })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({
    where: { id },
  })
}