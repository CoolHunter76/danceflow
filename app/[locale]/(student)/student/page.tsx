import PageTransition from "@/components/animations/PageTransition"
import NeonCard from "@/components/ui/neon-card"
import NeonButton from "@/components/ui/neon-button"

export default function Page() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-glow">
          Gaby’s Club 💃
        </h1>

        <NeonButton>Escanear QR</NeonButton>

        <NeonCard>
          <span className="text-pink-400 font-bold">
            MIÉRCOLES
          </span>

          <h2 className="text-xl font-semibold">
            Bachata Intensivo
          </h2>

          <p className="text-gray-400">21:00 h</p>

          <p className="text-orange-400 mt-2">
            🍸 Consumo mínimo: 8€
          </p>
        </NeonCard>
      </div>
    </PageTransition>
  )
}