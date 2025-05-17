"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BreastfeedingTimerProps {
  onTimeUpdate: (seconds: number) => void
  onSideChange: (side: string) => void
  initialSide?: string
}

export function BreastfeedingTimer({ onTimeUpdate, onSideChange, initialSide = "Left" }: BreastfeedingTimerProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [side, setSide] = useState(initialSide)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newValue = prev + 1
          onTimeUpdate(newValue)
          return newValue
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, onTimeUpdate])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
    onTimeUpdate(0)
  }

  const handleSideChange = (value: string) => {
    setSide(value)
    onSideChange(value)
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="border-purple-200 dark:border-purple-800">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm font-medium">Current Side:</div>
            <Select value={side} onValueChange={handleSideChange}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Side" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Left">Left</SelectItem>
                <SelectItem value="Right">Right</SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-4xl font-bold font-mono tabular-nums">{formatTime(seconds)}</div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={handleStart} size="sm" variant="default">
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            ) : (
              <Button onClick={handlePause} size="sm" variant="default">
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
            )}
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
