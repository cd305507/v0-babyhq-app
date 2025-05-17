"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Droplet, X, Clock, Save, Smile, Frown, Meh } from "lucide-react"

interface PumpingSessionFormProps {
  onClose: () => void
  onSubmit: (data: any) => void
  initialData?: any
}

// Add this function to determine time-of-day label based on time
const getTimeOfDayLabel = (timeString: string) => {
  const hour = Number.parseInt(timeString.split(":")[0], 10)

  if (hour >= 5 && hour < 11) return "Morning Milk"
  if (hour >= 11 && hour < 17) return "Afternoon Milk"
  if (hour >= 17 && hour < 21) return "Evening Milk"
  return "Night Milk"
}

export function PumpingSessionForm({ onClose, onSubmit, initialData }: PumpingSessionFormProps) {
  const [activeParent, setActiveParent] = useState<"carolyn" | "olivia">("carolyn")
  const [pumpingMode, setPumpingMode] = useState<"timer" | "manual">("timer")
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [pumpingSides, setPumpingSides] = useState<"left" | "right" | "both">(initialData?.sides || "both")
  const [leftAmount, setLeftAmount] = useState<number>(initialData?.leftAmount || 0)
  const [rightAmount, setRightAmount] = useState<number>(initialData?.rightAmount || 0)
  const [pumpingComfort, setPumpingComfort] = useState<number[]>([initialData?.comfort || 3])
  const [letdownSuccess, setLetdownSuccess] = useState<number[]>([initialData?.letdown || 3])
  const [pumpModel, setPumpModel] = useState<string>(initialData?.pumpModel || "")
  const [notes, setNotes] = useState<string>(initialData?.notes || "")
  const [startTime, setStartTime] = useState<string>(
    initialData?.startTime || new Date().toTimeString().substring(0, 5),
  )
  const [endTime, setEndTime] = useState<string>(initialData?.endTime || new Date().toTimeString().substring(0, 5))
  const [timeOfDayLabel, setTimeOfDayLabel] = useState<string>(
    initialData?.timeOfDayLabel || getTimeOfDayLabel(new Date().toTimeString().substring(0, 5)),
  )

  // Add this effect to update the time-of-day label when start time changes
  // Add this after the other state declarations
  useEffect(() => {
    if (pumpingMode === "manual") {
      setTimeOfDayLabel(getTimeOfDayLabel(startTime))
    }
  }, [startTime, pumpingMode])

  // Timer functionality
  const startTimer = () => {
    setIsTimerRunning(true)
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1)
    }, 1000)

    // Store the interval ID in a data attribute to clear it later
    document.getElementById("timer-container")?.setAttribute("data-interval-id", String(interval))
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
    const intervalId = document.getElementById("timer-container")?.getAttribute("data-interval-id")
    if (intervalId) {
      clearInterval(Number(intervalId))
    }
  }

  const resetTimer = () => {
    stopTimer()
    setTimerSeconds(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Calculate duration in minutes
    let duration = 0
    if (pumpingMode === "timer") {
      duration = Math.floor(timerSeconds / 60)
    } else {
      // Calculate duration from start and end time
      const start = new Date(`2000-01-01T${startTime}:00`)
      const end = new Date(`2000-01-01T${endTime}:00`)
      duration = (end.getTime() - start.getTime()) / 60000
    }

    const totalAmount = leftAmount + rightAmount

    const sessionData = {
      parent: activeParent === "carolyn" ? "Carolyn" : "Olivia",
      sides: pumpingSides,
      leftAmount,
      rightAmount,
      totalAmount,
      duration,
      comfort: pumpingComfort[0],
      letdown: letdownSuccess[0],
      pumpModel,
      notes,
      startTime: pumpingMode === "timer" ? new Date().toTimeString().substring(0, 5) : startTime,
      endTime: pumpingMode === "timer" ? new Date().toTimeString().substring(0, 5) : endTime,
      timestamp: new Date().toISOString(),
      timeOfDayLabel,
    }

    onSubmit(sessionData)
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          {initialData ? "Edit Pumping Session" : "New Pumping Session"}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form id="pumpingForm" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium">Recording as:</div>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  activeParent === "carolyn"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
                onClick={() => setActiveParent("carolyn")}
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Carolyn" />
                  <AvatarFallback className="text-[10px]">CB</AvatarFallback>
                </Avatar>
                <span>Carolyn</span>
              </button>

              <button
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  activeParent === "olivia"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
                onClick={() => setActiveParent("olivia")}
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Olivia" />
                  <AvatarFallback className="text-[10px]">OB</AvatarFallback>
                </Avatar>
                <span>Olivia</span>
              </button>
            </div>
          </div>

          <Tabs value={pumpingMode} onValueChange={(value: "timer" | "manual") => setPumpingMode(value)}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="timer">
                <Clock className="h-4 w-4 mr-2" />
                Timer Mode
              </TabsTrigger>
              <TabsTrigger value="manual">
                <Droplet className="h-4 w-4 mr-2" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timer" className="space-y-4">
              <div
                id="timer-container"
                className="flex flex-col items-center justify-center p-6 border rounded-lg border-slate-200 dark:border-slate-700"
              >
                <div className="text-4xl font-mono font-bold mb-4">{formatTime(timerSeconds)}</div>
                <div className="flex gap-2">
                  {!isTimerRunning ? (
                    <Button type="button" onClick={startTimer} className="bg-green-600 hover:bg-green-700">
                      Start
                    </Button>
                  ) : (
                    <Button type="button" onClick={stopTimer} className="bg-red-600 hover:bg-red-700">
                      Stop
                    </Button>
                  )}
                  <Button type="button" variant="outline" onClick={resetTimer}>
                    Reset
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="pumping-sides">Pumping Sides</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={pumpingSides === "left" ? "default" : "outline"}
                className={pumpingSides === "left" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setPumpingSides("left")}
              >
                Left Only
              </Button>
              <Button
                type="button"
                variant={pumpingSides === "right" ? "default" : "outline"}
                className={pumpingSides === "right" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setPumpingSides("right")}
              >
                Right Only
              </Button>
              <Button
                type="button"
                variant={pumpingSides === "both" ? "default" : "outline"}
                className={pumpingSides === "both" ? "bg-blue-600 hover:bg-blue-700" : ""}
                onClick={() => setPumpingSides("both")}
              >
                Both Sides
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="left-amount">Left Amount (oz)</Label>
              <Input
                id="left-amount"
                type="number"
                step="0.1"
                min="0"
                value={leftAmount}
                onChange={(e) => setLeftAmount(Number.parseFloat(e.target.value) || 0)}
                disabled={pumpingSides === "right"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="right-amount">Right Amount (oz)</Label>
              <Input
                id="right-amount"
                type="number"
                step="0.1"
                min="0"
                value={rightAmount}
                onChange={(e) => setRightAmount(Number.parseFloat(e.target.value) || 0)}
                disabled={pumpingSides === "left"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total-amount">Total Amount (oz)</Label>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(leftAmount + rightAmount).toFixed(1)} oz
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-of-day">Time of Day Label</Label>
            <Select value={timeOfDayLabel} onValueChange={setTimeOfDayLabel}>
              <SelectTrigger id="time-of-day">
                <SelectValue placeholder="Select time of day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Morning Milk">🌅 Morning Milk (5:00 AM - 11:00 AM)</SelectItem>
                <SelectItem value="Afternoon Milk">☀️ Afternoon Milk (11:00 AM - 5:00 PM)</SelectItem>
                <SelectItem value="Evening Milk">🌇 Evening Milk (5:00 PM - 9:00 PM)</SelectItem>
                <SelectItem value="Night Milk">🌃 Night Milk (9:00 PM - 5:00 AM)</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs text-slate-500">
              Breastmilk naturally changes throughout the day. Time-of-day tagging helps preserve melatonin-rich night
              milk for bedtime bottles.
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pump-model">Pump Model/Type</Label>
            <Select value={pumpModel} onValueChange={setPumpModel}>
              <SelectTrigger id="pump-model">
                <SelectValue placeholder="Select pump model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medela-pump-in-style">Medela Pump In Style</SelectItem>
                <SelectItem value="spectra-s1">Spectra S1</SelectItem>
                <SelectItem value="spectra-s2">Spectra S2</SelectItem>
                <SelectItem value="elvie">Elvie Pump</SelectItem>
                <SelectItem value="willow">Willow Pump</SelectItem>
                <SelectItem value="haakaa">Haakaa</SelectItem>
                <SelectItem value="manual">Manual Pump</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="comfort-level">Comfort Level</Label>
              <div className="flex gap-1">
                <Frown
                  className={`h-5 w-5 ${pumpingComfort[0] <= 2 ? "text-red-500" : "text-slate-300 dark:text-slate-600"}`}
                />
                <Meh
                  className={`h-5 w-5 ${pumpingComfort[0] > 2 && pumpingComfort[0] < 4 ? "text-yellow-500" : "text-slate-300 dark:text-slate-600"}`}
                />
                <Smile
                  className={`h-5 w-5 ${pumpingComfort[0] >= 4 ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`}
                />
              </div>
            </div>
            <Slider
              id="comfort-level"
              min={1}
              max={5}
              step={1}
              value={pumpingComfort}
              onValueChange={setPumpingComfort}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Uncomfortable</span>
              <span>Comfortable</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="letdown-success">Letdown Success</Label>
              <div className="text-sm text-slate-500">{letdownSuccess[0]}/5</div>
            </div>
            <Slider
              id="letdown-success"
              min={1}
              max={5}
              step={1}
              value={letdownSuccess}
              onValueChange={setLetdownSuccess}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Difficult</span>
              <span>Easy</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="How did the session go? Any observations?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch id="notify" defaultChecked />
            <Label htmlFor="notify">Notify other parent</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" form="pumpingForm">
          <Save className="h-4 w-4 mr-2" />
          Save Session
        </Button>
      </CardFooter>
    </Card>
  )
}
