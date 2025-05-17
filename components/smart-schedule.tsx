"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Utensils, Moon, Droplets, Pill, Edit, Save, RotateCcw, Info } from "lucide-react"

interface ScheduleEvent {
  id: string
  type: "feed" | "sleep" | "diaper" | "medication" | "play" | "bath"
  title: string
  startTime: string // 24-hour format "HH:MM"
  endTime?: string // optional for events like sleep
  flexible?: boolean
  notes?: string
}

interface SmartScheduleProps {
  babyAge: number // in months
  scheduleDate?: Date
  events?: ScheduleEvent[]
  onScheduleChange?: (events: ScheduleEvent[]) => void
}

export function SmartSchedule({
  babyAge,
  scheduleDate = new Date(),
  events: initialEvents,
  onScheduleChange,
}: SmartScheduleProps) {
  const [activeTab, setActiveTab] = useState("today")
  const [autoMode, setAutoMode] = useState(true)
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents || generateSchedule(babyAge))
  const [editingEvent, setEditingEvent] = useState<string | null>(null)

  // Generate a schedule based on baby's age
  function generateSchedule(ageInMonths: number): ScheduleEvent[] {
    const schedule: ScheduleEvent[] = []

    // Different schedules based on age ranges
    if (ageInMonths < 3) {
      // Newborn schedule (frequent feedings, short wake windows)
      schedule.push({ id: "1", type: "feed", title: "Morning Feed", startTime: "06:00" })
      schedule.push({ id: "2", type: "sleep", title: "Morning Nap", startTime: "07:30", endTime: "09:00" })
      schedule.push({ id: "3", title: "Morning Nap", startTime: "07:30", endTime: "09:00" })
      schedule.push({ id: "3", type: "feed", title: "Mid-Morning Feed", startTime: "09:00" })
      schedule.push({ id: "4", type: "play", title: "Tummy Time", startTime: "09:30" })
      schedule.push({ id: "5", type: "feed", title: "Late Morning Feed", startTime: "12:00" })
      schedule.push({ id: "6", type: "sleep", title: "Midday Nap", startTime: "13:00", endTime: "14:30" })
      schedule.push({ id: "7", type: "feed", title: "Afternoon Feed", startTime: "15:00" })
      schedule.push({ id: "8", type: "sleep", title: "Late Afternoon Nap", startTime: "16:30", endTime: "17:30" })
      schedule.push({ id: "9", type: "feed", title: "Evening Feed", startTime: "18:00" })
      schedule.push({ id: "10", type: "bath", title: "Bath Time", startTime: "19:00" })
      schedule.push({ id: "11", type: "feed", title: "Bedtime Feed", startTime: "20:00" })
      schedule.push({ id: "12", type: "sleep", title: "Bedtime", startTime: "20:30", endTime: "06:00" })
    } else if (ageInMonths < 6) {
      // 3-6 month schedule (longer wake windows, more structured naps)
      schedule.push({ id: "1", type: "feed", title: "Morning Feed", startTime: "06:30" })
      schedule.push({ id: "2", type: "play", title: "Morning Play", startTime: "07:00" })
      schedule.push({ id: "3", type: "sleep", title: "Morning Nap", startTime: "08:30", endTime: "10:00" })
      schedule.push({ id: "4", type: "feed", title: "Mid-Morning Feed", startTime: "10:00" })
      schedule.push({ id: "5", type: "play", title: "Activity Time", startTime: "10:30" })
      schedule.push({ id: "6", type: "feed", title: "Lunch Feed", startTime: "13:00" })
      schedule.push({ id: "7", type: "sleep", title: "Afternoon Nap", startTime: "13:30", endTime: "15:00" })
      schedule.push({ id: "8", type: "feed", title: "Afternoon Feed", startTime: "15:00" })
      schedule.push({ id: "9", type: "play", title: "Playtime", startTime: "15:30" })
      schedule.push({ id: "10", type: "sleep", title: "Late Afternoon Nap", startTime: "17:00", endTime: "17:30" })
      schedule.push({ id: "11", type: "feed", title: "Dinner Feed", startTime: "18:00" })
      schedule.push({ id: "12", type: "bath", title: "Bath Time", startTime: "19:00" })
      schedule.push({ id: "13", type: "feed", title: "Bedtime Feed", startTime: "19:30" })
      schedule.push({ id: "14", type: "sleep", title: "Bedtime", startTime: "20:00", endTime: "06:30" })
    } else if (ageInMonths < 9) {
      // 6-9 month schedule (2-3 naps, introducing solids)
      schedule.push({ id: "1", type: "feed", title: "Morning Feed", startTime: "06:30" })
      schedule.push({ id: "2", type: "play", title: "Morning Play", startTime: "07:00" })
      schedule.push({ id: "3", type: "feed", title: "Breakfast (Solids)", startTime: "08:00" })
      schedule.push({ id: "4", type: "sleep", title: "Morning Nap", startTime: "09:00", endTime: "10:30" })
      schedule.push({ id: "5", type: "feed", title: "Mid-Morning Feed", startTime: "10:30" })
      schedule.push({ id: "6", type: "play", title: "Activity Time", startTime: "11:00" })
      schedule.push({ id: "7", type: "feed", title: "Lunch (Solids)", startTime: "12:00" })
      schedule.push({ id: "8", type: "sleep", title: "Afternoon Nap", startTime: "13:00", endTime: "14:30" })
      schedule.push({ id: "9", type: "feed", title: "Afternoon Feed", startTime: "14:30" })
      schedule.push({ id: "10", type: "play", title: "Playtime", startTime: "15:00" })
      schedule.push({ id: "11", type: "feed", title: "Dinner (Solids)", startTime: "17:00" })
      schedule.push({ id: "12", type: "bath", title: "Bath Time", startTime: "18:30" })
      schedule.push({ id: "13", type: "feed", title: "Bedtime Feed", startTime: "19:00" })
      schedule.push({ id: "14", type: "sleep", title: "Bedtime", startTime: "19:30", endTime: "06:30" })
    } else {
      // 9+ month schedule (2 naps, more solids)
      schedule.push({ id: "1", type: "feed", title: "Morning Feed", startTime: "06:30" })
      schedule.push({ id: "2", type: "play", title: "Morning Play", startTime: "07:00" })
      schedule.push({ id: "3", type: "feed", title: "Breakfast (Solids)", startTime: "08:00" })
      schedule.push({ id: "4", type: "play", title: "Activity Time", startTime: "08:30" })
      schedule.push({ id: "5", type: "sleep", title: "Morning Nap", startTime: "10:00", endTime: "11:30" })
      schedule.push({ id: "6", type: "feed", title: "Mid-Day Feed", startTime: "11:30" })
      schedule.push({ id: "7", type: "feed", title: "Lunch (Solids)", startTime: "12:30" })
      schedule.push({ id: "8", type: "play", title: "Playtime", startTime: "13:00" })
      schedule.push({ id: "9", type: "sleep", title: "Afternoon Nap", startTime: "14:00", endTime: "15:30" })
      schedule.push({ id: "10", type: "feed", title: "Afternoon Feed", startTime: "15:30" })
      schedule.push({ id: "11", type: "play", title: "Activity Time", startTime: "16:00" })
      schedule.push({ id: "12", type: "feed", title: "Dinner (Solids)", startTime: "17:30" })
      schedule.push({ id: "13", type: "bath", title: "Bath Time", startTime: "18:30" })
      schedule.push({ id: "14", type: "feed", title: "Bedtime Feed", startTime: "19:00" })
      schedule.push({ id: "15", type: "sleep", title: "Bedtime", startTime: "19:30", endTime: "06:30" })
    }

    return schedule
  }

  // Handle toggling auto mode
  const handleAutoModeToggle = (enabled: boolean) => {
    setAutoMode(enabled)
    if (enabled) {
      // Reset to auto-generated schedule
      const newSchedule = generateSchedule(babyAge)
      setEvents(newSchedule)
      if (onScheduleChange) {
        onScheduleChange(newSchedule)
      }
    }
  }

  // Format time for display
  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Get icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "feed":
        return <Utensils className="h-4 w-4 text-purple-500" />
      case "sleep":
        return <Moon className="h-4 w-4 text-indigo-500" />
      case "diaper":
        return <Droplets className="h-4 w-4 text-blue-500" />
      case "medication":
        return <Pill className="h-4 w-4 text-red-500" />
      case "play":
        return <div className="h-4 w-4 rounded-full bg-green-500"></div>
      case "bath":
        return <Droplets className="h-4 w-4 text-cyan-500" />
      default:
        return <Clock className="h-4 w-4 text-slate-500" />
    }
  }

  // Get background color for event type
  const getEventColor = (type: string) => {
    switch (type) {
      case "feed":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/30"
      case "sleep":
        return "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800/30"
      case "diaper":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30"
      case "medication":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30"
      case "play":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30"
      case "bath":
        return "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800/30"
      default:
        return "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    }
  }

  // Handle editing an event
  const handleEditEvent = (id: string) => {
    setEditingEvent(id)
  }

  // Handle saving an edited event
  const handleSaveEvent = (id: string) => {
    setEditingEvent(null)
    if (onScheduleChange) {
      onScheduleChange(events)
    }
  }

  // Handle updating event time
  const handleUpdateEventTime = (id: string, field: "startTime" | "endTime", value: string) => {
    const updatedEvents = events.map((event) => (event.id === id ? { ...event, [field]: value } : event))
    setEvents(updatedEvents)
  }

  // Handle updating event title
  const handleUpdateEventTitle = (id: string, value: string) => {
    const updatedEvents = events.map((event) => (event.id === id ? { ...event, title: value } : event))
    setEvents(updatedEvents)
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Smart Schedule
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch id="auto-mode" checked={autoMode} onCheckedChange={handleAutoModeToggle} />
              <Label htmlFor="auto-mode" className="text-sm">
                Auto Mode
              </Label>
            </div>
            <Badge variant="outline" className="font-normal">
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </Badge>
          </div>
        </div>
        <CardDescription>Optimized daily schedule based on your baby's age and patterns</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="m-0">
          <CardContent className="p-4 max-h-[400px] overflow-y-auto">
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventColor(event.type)} relative`}>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">{getEventIcon(event.type)}</div>

                    {editingEvent === event.id ? (
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => handleUpdateEventTitle(event.id, e.target.value)}
                          className="w-full px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                        />
                        <div className="flex gap-2">
                          <input
                            type="time"
                            value={event.startTime}
                            onChange={(e) => handleUpdateEventTime(event.id, "startTime", e.target.value)}
                            className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                          />
                          {event.endTime && (
                            <>
                              <span className="text-xs self-center">to</span>
                              <input
                                type="time"
                                value={event.endTime}
                                onChange={(e) => handleUpdateEventTime(event.id, "endTime", e.target.value)}
                                className="px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm">
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </div>
                      </div>
                    )}

                    <div className="flex-shrink-0">
                      {editingEvent === event.id ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSaveEvent(event.id)}
                          className="h-7 w-7"
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditEvent(event.id)}
                          className="h-7 w-7"
                          disabled={autoMode}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="tomorrow" className="m-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-medium mb-2">Tomorrow's Schedule</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                Plan ahead by customizing tomorrow's schedule. Changes will be saved for the next day.
              </p>
              <Button>Generate Tomorrow's Schedule</Button>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="custom" className="m-0">
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-medium mb-2">Custom Schedule</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                Create a custom schedule template for special days or routines.
              </p>
              <div className="flex gap-2">
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Load Template
                </Button>
                <Button>Create New Template</Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <p>
            {autoMode
              ? "Auto mode is on. Schedule is optimized based on your baby's age and patterns."
              : "Manual mode is on. You can customize the schedule by editing events."}
          </p>
        </div>
      </div>
    </Card>
  )
}
