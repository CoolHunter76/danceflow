export type QRData = {
  eventId: string
  userId: string
  type: "ENTRY" | "EXIT"
}

export function parseQR(raw: string): QRData | null {
  try {
    const parts = raw.split("|")

    if (parts[0] !== "EVENT") return null

    const eventId = parts.find(p => p.startsWith("eventId="))?.split("=")[1]
    const userId = parts.find(p => p.startsWith("userId="))?.split("=")[1]
    const type = parts.find(p => p.startsWith("type="))?.split("=")[1]

    if (!eventId || !userId || !type) return null

    return {
      eventId,
      userId,
      type: type as "ENTRY" | "EXIT"
    }

  } catch {
    return null
  }
}