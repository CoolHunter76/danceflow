"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

type NeonCardProps = {
  children: ReactNode
  className?: string
}

export default function NeonCard({
  children,
  className = "",
}: NeonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        bg-dark-card
        border border-neon-pink/20
        rounded-2xl
        p-5
        glass
        shadow-md
        hover:shadow-neonPink
        transition-all
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}