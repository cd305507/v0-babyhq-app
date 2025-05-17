"use client"

import { useEffect, useRef } from "react"

interface CryVisualizerProps {
  isActive: boolean
}

export function CryVisualizer({ isActive }: CryVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Draw visualization
    const drawVisualization = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isActive) {
        // Draw active visualization (simulated waveform)
        const centerY = canvas.height / 2
        const width = canvas.width

        ctx.beginPath()
        ctx.moveTo(0, centerY)

        // Generate random waveform
        for (let x = 0; x < width; x += 5) {
          const amplitude = isActive ? Math.random() * 50 + 10 : 5
          const y = centerY + Math.sin(x * 0.05 + Date.now() * 0.005) * amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, centerY)
        ctx.strokeStyle = "rgba(147, 51, 234, 0.8)" // Purple
        ctx.lineWidth = 2
        ctx.stroke()

        // Add gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "rgba(147, 51, 234, 0.2)")
        gradient.addColorStop(1, "rgba(147, 51, 234, 0.05)")
        ctx.fillStyle = gradient
        ctx.fill()
      } else {
        // Draw inactive visualization (flat line with small bumps)
        const centerY = canvas.height / 2
        const width = canvas.width

        ctx.beginPath()
        ctx.moveTo(0, centerY)

        for (let x = 0; x < width; x += 10) {
          const y = centerY + Math.sin(x * 0.1) * 2
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = "rgba(100, 116, 139, 0.5)" // Slate
        ctx.lineWidth = 2
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(drawVisualization)
    }

    drawVisualization()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
