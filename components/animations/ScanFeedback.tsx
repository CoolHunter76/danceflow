"use client"

import { motion } from "framer-motion"

type ScanFeedbackProps = {
  success: boolean
}

export default function ScanFeedback({ success }: ScanFeedbackProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="flex flex-col items-center gap-4"
    >
      {/* ICONO */}
      <div
        className={`
          text-7xl
          ${success ? "text-green-400" : "text-red-400"}
        `}
      >
        {success ? "✅" : "❌"}
      </div>

      {/* TEXTO */}
      <p className="text-white text-lg font-semibold">
        {success ? "Acceso permitido" : "QR inválido"}
      </p>
    </motion.div>
  )
}