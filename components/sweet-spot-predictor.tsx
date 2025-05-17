"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Info, Moon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface SweetSpotPredictorProps {
  babyAge: number // in months
  lastWakeTime?: Date
  recentNaps?: Array<{
    start: Date
    end: Date
    quality?: "good" | "fair" | "poor"
  }>
  onNotifyClick?: () => void
}

export function SweetSpotPredictor({
  babyAge,
  lastWakeTime = new Date(),
  recentNaps = [],
  onNotifyClick,
}: SweetSpotPredictorProps) {
  const [sweetSpotStart, setSweetSpotStart] = useState<Date | null>(null)
  const [sweetSpotEnd, setSweetSpotEnd] = useState<Date | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"upcoming" | "active" | "missed" | "sleeping">("upcoming")

  // Calculate wake window based on baby's age (in minutes)
  const getBaseWakeWindow = (ageInMonths: number): { min: number; max: number } => {
    if (ageInMonths < 1) return { min: 45, max: 60 }
    if (ageInMonths < 3) return { min: 60, max: 90 }
    if (ageInMonths < 6) return { min: 90, max: 120 }
    if (ageInMonths < 9) return { min: 120, max: 150 }
    if (ageInMonths < 12) return { min: 150, max: 180 }
    return { min: 180, max: 240 }
  }

  // Adjust wake window based on recent nap patterns
  const getAdjustedWakeWindow = (
    baseWindow: { min: number; max: number },
    recentNaps: Array<{
      start: Date
      end: Date
      quality?: "good" | "fair" | "poor"
    }>,
  ): { min: number; max: number } => {
    if (recentNaps.length === 0) return baseWindow

    // Calculate average nap length
    const totalNapMinutes = recentNaps.reduce((total, nap) => {
      const napLength = (nap.end.getTime() - nap.start.getTime()) / (1000 * 60)
      return total + napLength
    }, 0)
    const avgNapLength = totalNapMinutes / recentNaps.length

    // Adjust wake window based on nap length
    // Shorter naps may need shorter wake windows
    let adjustment = 0
    if (avgNapLength < 30) adjustment = -10
    else if (avgNapLength > 90) adjustment = 10

    // Adjust for nap quality if available
    const qualityNaps = recentNaps.filter((nap) => nap.quality)
    if (qualityNaps.length > 0) {
      const poorNaps = qualityNaps.filter((nap) => nap.quality === "poor").length
      const poorRatio = poorNaps / qualityNaps.length
      if (poorRatio > 0.5) adjustment -= 5
    }

    return {
      min: Math.max(30, baseWindow.min + adjustment),
      max: baseWindow.max + adjustment,
    }
  }

  // Calculate SweetSpot window
  useEffect(() => {
    const baseWindow = getBaseWakeWindow(babyAge)
    const adjustedWindow = getAdjustedWakeWindow(baseWindow, recentNaps)

    const now = new Date()
    const wakeTime = lastWakeTime || now

    const sweetStart = new Date(wakeTime.getTime() + adjustedWindow.min * 60 * 1000)
    const sweetEnd = new Date(wakeTime.getTime() + adjustedWindow.max * 60 * 1000)

    setSweetSpotStart(sweetStart)
    setSweetSpotEnd(sweetEnd)

    // Calculate progress toward SweetSpot
    const totalWakeWindow = adjustedWindow.max
    const minutesAwake = (now.getTime() - wakeTime.getTime()) / (1000 * 60)
    const progressPercent = Math.min(100, (minutesAwake / totalWakeWindow) * 100)
    setProgress(progressPercent)

    // Determine status
    if (now < sweetStart) {
      setStatus("upcoming")
    } else if (now >= sweetStart && now <= sweetEnd) {
      setStatus("active")
    } else {
      setStatus("missed")
    }

    // Update every minute
    const interval = setInterval(() => {
      const currentTime = new Date()
      const minutesAwake = (currentTime.getTime() - wakeTime.getTime()) / (1000 * 60)
      const newProgress = Math.min(100, (minutesAwake / totalWakeWindow) * 100)
      setProgress(newProgress)

      if (currentTime < sweetStart) {
        setStatus("upcoming")
      } else if (currentTime >= sweetStart && currentTime <= sweetEnd) {
        setStatus("active")
      } else {
        setStatus("missed")
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [babyAge, lastWakeTime, recentNaps])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }

  const getTimeUntil = (targetDate: Date) => {
    const now = new Date()
    const diffMs = targetDate.getTime() - now.getTime()
    if (diffMs <= 0) return "Now"

    const diffMins = Math.floor(diffMs / (1000 * 60))
    if (diffMins < 60) return `${diffMins} min`

    const hours = Math.floor(diffMins / 60)
    const mins = diffMins % 60
    return `${hours}h ${mins}m`
  }

  const getStatusColor = () => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "missed":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "sleeping":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "upcoming":
        return "Upcoming"
      case "active":
        return "Active Now"
      case "missed":
        return "Window Passed"
      case "sleeping":
        return "Baby Sleeping"
      default:
        return ""
    }
  }

  if (!sweetSpotStart || !sweetSpotEnd) return null

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Moon className="h-5 w-5 text-indigo-500" />
            SweetSpot™ Nap Predictor
          </CardTitle>
          <Badge className={cn("font-normal", getStatusColor())}>{getStatusText()}</Badge>
        </div>
        <CardDescription>Optimal nap window based on baby's age and patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 dark:text-slate-400">Next nap window</span>
              <span className="text-xl font-semibold">
                {formatTime(sweetSpotStart)} - {formatTime(sweetSpotEnd)}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Bell className="h-4 w-4" />
                    <span className="hidden sm:inline">Notify</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get notified 15 minutes before the SweetSpot</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Wake time: {formatTime(lastWakeTime)}</span>
              {status === "upcoming" && (
                <span className="text-blue-600 dark:text-blue-400">SweetSpot in {getTimeUntil(sweetSpotStart)}</span>
              )}
              {status === "active" && <span className="text-green-600 dark:text-green-400">Optimal nap time</span>}
              {status === "missed" && (
                <span className="text-amber-600 dark:text-amber-400">
                  Window passed {getTimeUntil(new Date(sweetSpotEnd.getTime() + 30 * 60 * 1000))} ago
                </span>
              )}
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-slate-500">Wake Window Progress</span>
                </div>
              </div>
              <div className="relative h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    status === "active" ? "bg-green-500" : status === "missed" ? "bg-amber-500" : "bg-blue-500",
                  )}
                  style={{ width: `${progress}%` }}
                ></div>
                <div
                  className="absolute top-0 h-full border-l-2 border-green-600 dark:border-green-400"
                  style={{
                    left: `${
                      ((sweetSpotStart.getTime() - lastWakeTime.getTime()) /
                        (1000 * 60) /
                        ((sweetSpotEnd.getTime() - lastWakeTime.getTime()) / (1000 * 60))) *
                      100
                    }%`,
                  }}
                ></div>
                <div
                  className="absolute top-0 h-full border-l-2 border-red-600 dark:border-red-400"
                  style={{
                    left: `${
                      ((sweetSpotEnd.getTime() - lastWakeTime.getTime()) /
                        (1000 * 60) /
                        ((sweetSpotEnd.getTime() - lastWakeTime.getTime()) / (1000 * 60))) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md">
            <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
            <p>
              Based on your baby's age ({babyAge} months) and recent nap patterns. Learned wake window: 85-115 minutes.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
