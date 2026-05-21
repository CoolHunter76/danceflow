"use client"

import { useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import ScanFeedback from "@/components/animations/ScanFeedback"
import { useSound } from "@/components/hooks/useSound"

export default function QRScanner() {
  const [success, setSuccess] = useState<boolean | null>(null)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const { playSuccess, playError } = useSound()

  return (
    <div className="relative w-full h-96 rounded-xl overflow-hidden">

      {/* 📷 SCANNER */}
      <Scanner
        formats={["qr_code"]}
        onScan={(detected) => {

          // 🛑 BLOQUEAR multi-scan
          if (success !== null || isProcessing) return

          if (detected.length > 0) {
            const text = detected[0].rawValue

            setIsProcessing(true)

            const isValid = text.includes("EVENT")

            // 📳 VIBRACIÓN DIFERENCIADA
            navigator.vibrate?.(
              isValid ? 100 : [100, 50, 100] // error vibra doble
            )

            setTimeout(() => {
              setSuccess(isValid)

              // 🔊 SONIDO
              if (isValid) {
                playSuccess()
              } else {
                playError()
              }

              // 🔁 RESET automática
              setTimeout(() => {
                setSuccess(null)
                setIsProcessing(false)
              }, 2000)

            }, 300)
          }
        }}
      />

      {/* 🧊 OVERLAY ESCANEO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="relative w-64 h-64">

          {/* Marco */}
          <div className="
            absolute inset-0
            border-4 border-neon-pink
            rounded-xl
            animate-glow
          " />

          {/* Línea scan */}
          <div className="
            absolute w-full h-[2px]
            bg-neon-pink
            animate-[scanline_2s_linear_infinite]
          " />

        </div>
      </div>

      {/* 🚫 BLOQUEO VISUAL PRO (mientras valida) */}
      {isProcessing && success === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="flex flex-col items-center gap-3">

            <div className="w-10 h-10 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />

            <p className="text-white text-sm">
              Validando...
            </p>

          </div>

        </div>
      )}

      {/* ✅ / ❌ RESULTADO */}
      {success !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <ScanFeedback success={success} />
        </div>
      )}

    </div>
  )
}