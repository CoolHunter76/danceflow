"use server"

import { prisma } from "@/lib/prisma"
import { getTotalConsumption } from "./consumption"

export async function registerScan(data: {
  eventId: string
  userId: string       // usuario escaneado (alumno)
  type: "ENTRY" | "EXIT"
  scannerUserId: string // quien escanea (profesor/local)
}) {

  const { eventId, userId, type, scannerUserId } = data

  // 🔍 usuario que escanea (seguridad)
  const scanner = await prisma.user.findUnique({
    where: { id: scannerUserId },
  })

  if (!scanner) {
    return { success: false, message: "Scanner inválido ❌" }
  }

  if (scanner.status !== "APPROVED") {
    return { success: false, message: "Usuario no aprobado ❌" }
  }

  // 🔍 evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  })

  if (!event) {
    return { success: false, message: "Evento no existe ❌" }
  }

  // 🔍 último estado del usuario en el evento
  const lastScan = await prisma.attendance.findFirst({
    where: {
      userId,
      eventId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // ✅ 🔥 VALIDACIÓN ROLES

  // ENTRY → solo profesor
  if (type === "ENTRY" && scanner.role !== "TEACHER") {
    return {
      success: false,
      message: "Solo profesor valida entrada ❌",
    }
  }

  // EXIT → solo local
  if (type === "EXIT" && scanner.role !== "VENUE_OWNER") {
    return {
      success: false,
      message: "Solo el local valida salida ❌",
    }
  }

  // ✅ 🔥 LÓGICA DE NEGOCIO

  // 🟢 ENTRY
  if (type === "ENTRY") {
    if (lastScan?.type === "ENTRY") {
      return {
        success: false,
        message: "El usuario ya está dentro ❌",
      }
    }
  }

  // 🔴 EXIT
  if (type === "EXIT") {

    if (lastScan?.type !== "ENTRY") {
      return {
        success: false,
        message: "Debe entrar antes ❌",
      }
    }

    // 🔥 CONTROL CONSUMO MÍNIMO
    if (event.hasMinConsumption) {

      const total = await getTotalConsumption(userId, eventId)

      if (total < event.minConsumption) {
        return {
          success: false,
          message: `Consumo insuficiente (${total.toFixed(2)}€ / mínimo ${event.minConsumption.toFixed(2)}€) ❌`,
        }
      }
    }
  }

  // ✅ GUARDAR SCAN
  await prisma.attendance.create({
    data: {
      userId,
      eventId,
      type,
    },
  })

  return {
    success: true,
    message:
      type === "ENTRY"
        ? "Entrada registrada ✅"
        : "Salida registrada ✅",
  }
}