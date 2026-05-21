"use server"

import { prisma } from "@/lib/prisma"

/**
 * ✅ Crear local (venue)
 */
export async function createVenue(data: {
  name: string
  address: string
  lat: number
  lng: number
  ownerId: string
}) {
  return prisma.venue.create({
    data: {
      name: data.name,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      ownerId: data.ownerId,
    },
  })
}

/**
 * ✅ Listar locales con dueño
 */
export async function getVenues() {
  return prisma.venue.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

/**
 * ✅ Obtener un local por ID
 */
export async function getVenueById(id: string) {
  return prisma.venue.findUnique({
    where: { id },
    include: {
      owner: true,
      events: true,
    },
  })
}

/**
 * ✅ Actualizar local
 */
export async function updateVenue(data: {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  ownerId: string
}) {
  return prisma.venue.update({
    where: { id: data.id },
    data: {
      name: data.name,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      ownerId: data.ownerId,
    },
  })
}

/**
 * ✅ Eliminar local
 */
export async function deleteVenue(id: string) {
  return prisma.venue.delete({
    where: { id },
  })
}