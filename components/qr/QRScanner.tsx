"use client"

import { useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import ScanFeedback from "@/components/animations/ScanFeedback"
import { useSound } from "@/components/hooks/useSound"
import { parseQR } from "@/lib/qr/parseQR"
import { registerScan } from "@/app/actions/attendance"

export default function QRScanner() {
  const [success, setSuccess] = useState<boolean | null>(null)
  const [message, setMessage] = useState<string>("") 
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { playSuccess, playError } = useSound()

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden">

      {/* 📷 SCANNER */}
      <Scanner
        formats={["qr_code"]}
        onScan={async (detected) => {

          if (success !== null || isProcessing) return

          if (detected.length > 0) {
            const text = detected[0].rawValue

            setIsProcessing(true)

            // 🔥 PARSEAR QR
            const parsed = parseQR(text)

            // 📳 vibración
            navigator.vibrate?.(
              parsed ? 100 : [100, 50, 100]
            )

            setTimeout(async () => {

              if (!parsed) {
                setSuccess(false)
                setMessage("QR inválido ❌")
                playError()
              } else {

                // 🔥 LLAMADA REAL A BD
                const result = await registerScan(parsed)

                setSuccess(result.success)
                setMessage(result.message)

                if (result.success) {
                  playSuccess()
                } else {
                  playError()
                }
              }

              setTimeout(() => {
                setSuccess(null)
                setMessage("")
                setIsProcessing(false)
              }, 2500)

            }, 300)
          }
        }}
      />

      {/* 🧊 OVERLAY ESCANEO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="relative w-64 h-64">

          <div className="
            absolute inset-0
            border-4 border-neon-pink
            rounded-xl
            animate-glow
          " />

          <div className="
            absolute w-full h-[2px]
            bg-neon-pink
            animate-[scanline_2s_linear_infinite]
          " />

        </div>
      </div>

      {/* 🚫 BLOQUEO VISUAL */}
      {isProcessing && success === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm">Validando...</p>
          </div>
        </div>
      )}

      {/* ✅ RESULTADO */}
      {success !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <ScanFeedback success={success} message={message} />
        </div>
      )}

    </div>
  )
}