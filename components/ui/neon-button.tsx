"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function NeonButton({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <Button
        className="
          w-full h-24 text-xl font-semibold
          bg-linear-to-r from-neon-purple to-neon-pink
          shadow-neonPink
          rounded-xl
          transition-all
        "
      >
        {children}
      </Button>
    </motion.div>
  )
}