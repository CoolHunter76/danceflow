import { Geist} from "next/font/google"
import "@/app/globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.variable} font-sans bg-[#050505] text-white`}>
        {children}
      </body>
    </html>
  )
}