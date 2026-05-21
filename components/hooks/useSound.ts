"use client"

export function useSound() {
  const playSuccess = () => {
    const audio = new Audio("/sounds/success.mp3")
    audio.play()
  }

  const playError = () => {
    const audio = new Audio("/sounds/error.mp3")
    audio.play()
  }

  return { playSuccess, playError }
}