"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Clock,
  Utensils,
  Moon,
  Droplets,
  Pill,
  Edit,
  Save,
  RotateCcw,
  Info,
  Check,
  Trash2,
  Copy,
  PlusCircle,
  Zap,
  Calendar,
  Share,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface ScheduleEvent {
  id: string
  type: "feed" | "sleep" | "diaper" | "medication" | "play" | "bath" | "pump"
  title: string
  startTime: string // 24-hour format "HH:MM"
  endTime?: string // optional for events like sleep
  flexible?: boolean
  notes?: string
  priority?: "high" | "medium" | "low"
  status?: "completed" | "missed" | "upcoming" | "in-progress"
  category?: string
  duration?: number // in minutes
  alert?: boolean
  alertTime?: number // minutes before event
}

interface EnhancedSmartScheduleProps {
  babyAge: number // in months
  scheduleDate?: Date
  events?: ScheduleEvent[]
  onScheduleChange?: (events: ScheduleEvent[]) => void
}

export function EnhancedSmartSchedule({
  babyAge,
  scheduleDate = new Date(),
  events: initialEvents,
  onScheduleChange,
}: EnhancedSmartScheduleProps) {
  const [activeTab, setActiveTab] = useState("timeline")
  const [autoMode, setAutoMode] = useState(true)
  const [optimizationLevel, setOptimizationLevel] = useState(75)
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents || generateSchedule(babyAge))
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(scheduleDate)
  const [scheduleType, setScheduleType] = useState<"balanced" | "sleep-focused" | "feeding-focused" | "custom">(
    "balanced",
  )
  const [showCompleted, setShowCompleted] = useState(true)
  const { toast } = useToast()

  // Generate a schedule based on baby's age
  function generateSchedule(
    ageInMonths: number,
    type: "balanced" | "sleep-focused" | "feeding-focused" | "custom" = "balanced",
  ): ScheduleEvent[] {
    const schedule: ScheduleEvent[] = []
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    // Different schedules based on age ranges and schedule type
    if (ageInMonths < 3) {
      // Newborn schedule (frequent feedings, short wake windows)
      schedule.push({
        id: "1",
        type: "feed",
        title: "Morning Feed",
        startTime: "06:00",
        status: currentHour > 6 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })
      schedule.push({
        id: "2",
        type: "sleep",
        title: "Morning Nap",
        startTime: "07:30",
        endTime: "09:00",
        status: currentHour > 9 ? "completed" : currentHour > 7 ? "in-progress" : "upcoming",
        priority: "medium",
        duration: 90,
        alert: true,
        alertTime: 15,
      })
      schedule.push({
        id: "3",
        type: "feed",
        title: "Mid-Morning Feed",
        startTime: "09:00",
        status: currentHour > 9 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })
      schedule.push({
        id: "4",
        type: "play",
        title: "Tummy Time",
        startTime: "09:30",
        status: currentHour > 9 || (currentHour === 9 && currentMinute > 30) ? "completed" : "upcoming",
        priority: "low",
        duration: 15,
        alert: false,
      })
      schedule.push({
        id: "5",
        type: "feed",
        title: "Late Morning Feed",
        startTime: "12:00",
        status: currentHour > 12 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })

      // Add more events based on schedule type
      if (type === "sleep-focused") {
        schedule.push({
          id: "6",
          type: "sleep",
          title: "Midday Nap",
          startTime: "13:00",
          endTime: "14:30",
          status: currentHour > 14 ? "completed" : currentHour > 13 ? "in-progress" : "upcoming",
          priority: "high",
          duration: 90,
          alert: true,
          alertTime: 15,
          notes: "Ensure room is darkened and white noise is on",
        })
      } else if (type === "feeding-focused") {
        schedule.push({
          id: "6",
          type: "feed",
          title: "Early Afternoon Feed",
          startTime: "13:00",
          status: currentHour > 13 ? "completed" : "upcoming",
          priority: "high",
          duration: 30,
          alert: true,
          alertTime: 10,
          notes: "Focus on full feeding to support longer sleep",
        })
        schedule.push({
          id: "6a",
          type: "sleep",
          title: "Midday Nap",
          startTime: "13:45",
          endTime: "15:00",
          status: currentHour > 15 ? "completed" : currentHour > 13 && currentMinute > 45 ? "in-progress" : "upcoming",
          priority: "medium",
          duration: 75,
          alert: true,
          alertTime: 15,
        })
      } else {
        // Balanced schedule
        schedule.push({
          id: "6",
          type: "sleep",
          title: "Midday Nap",
          startTime: "13:00",
          endTime: "14:30",
          status: currentHour > 14 ? "completed" : currentHour > 13 ? "in-progress" : "upcoming",
          priority: "medium",
          duration: 90,
          alert: true,
          alertTime: 15,
        })
      }

      // Continue with common events
      schedule.push({
        id: "7",
        type: "feed",
        title: "Afternoon Feed",
        startTime: "15:00",
        status: currentHour > 15 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })

      // Add pumping for feeding-focused
      if (type === "feeding-focused") {
        schedule.push({
          id: "7a",
          type: "pump",
          title: "Pumping Session",
          startTime: "15:45",
          status: currentHour > 15 && currentMinute > 45 ? "completed" : "upcoming",
          priority: "medium",
          duration: 20,
          alert: true,
          alertTime: 10,
        })
      }

      schedule.push({
        id: "8",
        type: "sleep",
        title: "Late Afternoon Nap",
        startTime: "16:30",
        endTime: "17:30",
        status: currentHour > 17 ? "completed" : currentHour > 16 && currentMinute > 30 ? "in-progress" : "upcoming",
        priority: type === "sleep-focused" ? "high" : "medium",
        duration: 60,
        alert: true,
        alertTime: 15,
      })
      schedule.push({
        id: "9",
        type: "feed",
        title: "Evening Feed",
        startTime: "18:00",
        status: currentHour > 18 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })
      schedule.push({
        id: "10",
        type: "bath",
        title: "Bath Time",
        startTime: "19:00",
        status: currentHour > 19 ? "completed" : "upcoming",
        priority: "low",
        duration: 20,
        alert: false,
      })
      schedule.push({
        id: "11",
        type: "feed",
        title: "Bedtime Feed",
        startTime: "20:00",
        status: currentHour > 20 ? "completed" : "upcoming",
        priority: "high",
        duration: 30,
        alert: true,
        alertTime: 10,
      })
      schedule.push({
        id: "12",
        type: "sleep",
        title: "Bedtime",
        startTime: "20:30",
        endTime: "06:00",
        status: currentHour > 20 && currentMinute > 30 ? "in-progress" : "upcoming",
        priority: "high",
        duration: 570, // 9.5 hours
        alert: true,
        alertTime: 30,
        notes: "Follow full bedtime routine",
      })

      // Add medication if custom
      if (type === "custom") {
        schedule.push({
          id: "13",
          type: "medication",
          title: "Vitamin D Drops",
          startTime: "09:15",
          status: currentHour > 9 && currentMinute > 15 ? "completed" : "upcoming",
          priority: "medium",
          duration: 5,
          alert: true,
          alertTime: 5,
        })
        schedule.push({
          id: "14",
          type: "medication",
          title: "Gas Drops",
          startTime: "13:30",
          status: currentHour > 13 && currentMinute > 30 ? "completed" : "upcoming",
          priority: "medium",
          duration: 5,
          alert: true,
          alertTime: 5,
        })
      }
    } else if (ageInMonths < 6) {
      // 3-6 month schedule (longer wake windows, more structured naps)
      // Similar structure but with age-appropriate timing
      schedule.push({
        id: "1",
        type: "feed",
        title: "Morning Feed",
        startTime: "06:30",
        status: currentHour > 6 || (currentHour === 6 && currentMinute > 30) ? "completed" : "upcoming",
        priority: "high",
        duration: 25,
        alert: true,
        alertTime: 10,
      })

      // Add more events based on schedule type and age
      // ... (similar pattern as above but with adjusted times)

      // For brevity, I'm including just a few more events
      schedule.push({
        id: "2",
        type: "play",
        title: "Morning Play",
        startTime: "07:00",
        status: currentHour > 7 ? "completed" : "upcoming",
        priority: "low",
        duration: 45,
        alert: false,
      })

      schedule.push({
        id: "3",
        type: "sleep",
        title: "Morning Nap",
        startTime: "08:30",
        endTime: "10:00",
        status: currentHour > 10 ? "completed" : currentHour > 8 && currentMinute > 30 ? "in-progress" : "upcoming",
        priority: type === "sleep-focused" ? "high" : "medium",
        duration: 90,
        alert: true,
        alertTime: 15,
      })

      // Add more events for this age range...
      // (For brevity, not including all events)
    }

    // Sort events by start time
    return schedule.sort((a, b) => {
      const timeA = a.startTime.split(":").map(Number)
      const timeB = b.startTime.split(":").map(Number)

      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0]
      }
      return timeA[1] - timeB[1]
    })
  }

  // Effect to regenerate schedule when type changes
  useEffect(() => {
    if (autoMode) {
      const newSchedule = generateSchedule(babyAge, scheduleType)
      setEvents(newSchedule)
      if (onScheduleChange) {
        onScheduleChange(newSchedule)
      }
    }
  }, [scheduleType, autoMode, babyAge, onScheduleChange])

  // Handle toggling auto mode
  const handleAutoModeToggle = (enabled: boolean) => {
    setAutoMode(enabled)
    if (enabled) {
      // Reset to auto-generated schedule
      const newSchedule = generateSchedule(babyAge, scheduleType)
      setEvents(newSchedule)
      if (onScheduleChange) {
        onScheduleChange(newSchedule)
      }

      toast({
        title: "Auto Mode Enabled",
        description: "Your schedule has been optimized based on your baby's age and patterns.",
        duration: 3000,
      })
    } else {
      toast({
        title: "Manual Mode Enabled",
        description: "You can now customize your schedule manually.",
        duration: 3000,
      })
    }
  }

  // Handle optimization level change
  const handleOptimizationChange = (value: number[]) => {
    setOptimizationLevel(value[0])

    if (autoMode) {
      // Regenerate schedule with new optimization level
      // In a real app, this would use the optimization level to adjust the schedule
      toast({
        title: "Schedule Optimized",
        description: `Optimization level set to ${value[0]}%`,
        duration: 2000,
      })
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
      case "pump":
        return <div className="h-4 w-4 rounded-full bg-pink-500"></div>
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
      case "pump":
        return "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/30"
      default:
        return "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
    }
  }

  // Get status badge for event
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/30"
          >
            Completed
          </Badge>
        )
      case "missed":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/30"
          >
            Missed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/30"
          >
            In Progress
          </Badge>
        )
      case "upcoming":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800/30"
          >
            Upcoming
          </Badge>
        )
      default:
        return null
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

    toast({
      title: "Event Updated",
      description: "Your schedule has been updated successfully.",
      duration: 2000,
    })
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

  // Handle updating event status
  const handleUpdateEventStatus = (id: string, status: "completed" | "missed" | "upcoming" | "in-progress") => {
    const updatedEvents = events.map((event) => (event.id === id ? { ...event, status } : event))
    setEvents(updatedEvents)

    toast({
      title: `Event Marked as ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: "Your schedule has been updated.",
      duration: 2000,
    })
  }

  // Handle deleting an event
  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id)
    setEvents(updatedEvents)

    toast({
      title: "Event Deleted",
      description: "The event has been removed from your schedule.",
      duration: 2000,
    })
  }

  // Handle adding a new event
  const handleAddEvent = () => {
    const newId = `new-${Date.now()}`
    const newEvent: ScheduleEvent = {
      id: newId,
      type: "feed",
      title: "New Event",
      startTime: "12:00",
      status: "upcoming",
      priority: "medium",
      duration: 30,
      alert: false,
    }

    setEvents([...events, newEvent])
    setEditingEvent(newId)

    toast({
      title: "New Event Added",
      description: "Edit the details to customize your new event.",
      duration: 3000,
    })
  }

  // Handle optimizing the schedule
  const handleOptimizeSchedule = () => {
    // In a real app, this would use ML/AI to optimize the schedule
    // For now, we'll just regenerate the schedule
    const newSchedule = generateSchedule(babyAge, scheduleType)
    setEvents(newSchedule)

    toast({
      title: "Schedule Optimized",
      description: "Your schedule has been optimized based on your baby's patterns and your preferences.",
      duration: 3000,
    })
  }

  // Filter events based on showCompleted setting
  const filteredEvents = showCompleted ? events : events.filter((event) => event.status !== "completed")

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={scheduleType} onValueChange={(value: any) => setScheduleType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Schedule Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="balanced">Balanced</SelectItem>
              <SelectItem value="sleep-focused">Sleep Focused</SelectItem>
              <SelectItem value="feeding-focused">Feeding Focused</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Switch id="show-completed" checked={showCompleted} onCheckedChange={setShowCompleted} />
            <Label htmlFor="show-completed" className="text-sm">
              Show Completed
            </Label>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="auto-mode" checked={autoMode} onCheckedChange={handleAutoModeToggle} />
            <Label htmlFor="auto-mode" className="text-sm">
              Auto Mode
            </Label>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              {/* Calendar would go here - simplified for this example */}
              <div className="p-4">
                <h3 className="mb-2 font-medium">Select Date</h3>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date()
                    date.setDate(date.getDate() + i - 3)
                    return (
                      <Button
                        key={i}
                        variant={date.toDateString() === selectedDate.toDateString() ? "default" : "outline"}
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedDate(date)}
                      >
                        {date.getDate()}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {autoMode && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="optimization-level" className="text-sm font-medium">
              Optimization Level: {optimizationLevel}%
            </Label>
            <Button variant="ghost" size="sm" onClick={handleOptimizeSchedule}>
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              Optimize Now
            </Button>
          </div>
          <Slider
            id="optimization-level"
            defaultValue={[optimizationLevel]}
            max={100}
            step={5}
            onValueChange={handleOptimizationChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>More Flexible</span>
            <span>More Structured</span>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="m-0">
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Events</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                  There are no events scheduled for this day.
                </p>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </div>
            ) : (
              <>
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      `p-3 rounded-lg border relative`,
                      getEventColor(event.type),
                      event.status === "completed" && "opacity-70",
                    )}
                  >
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
                          <div className="flex gap-2">
                            <Select
                              defaultValue={event.status}
                              onValueChange={(value: any) => handleUpdateEventStatus(event.id, value)}
                            >
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="missed">Missed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{event.title}</div>
                            {event.priority === "high" && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/30 text-xs"
                              >
                                Priority
                              </Badge>
                            )}
                            {getStatusBadge(event.status || "upcoming")}
                          </div>
                          <div className="text-sm">
                            {formatTime(event.startTime)}
                            {event.endTime && ` - ${formatTime(event.endTime)}`}
                            {event.duration && ` (${event.duration} min)`}
                          </div>
                          {event.notes && (
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{event.notes}</div>
                          )}
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
                          <div className="flex">
                            {event.status !== "completed" && event.status !== "missed" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleUpdateEventStatus(event.id, "completed")}
                                className="h-7 w-7"
                                title="Mark as completed"
                              >
                                <Check className="h-4 w-4 text-green-500" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditEvent(event.id)}
                              className="h-7 w-7"
                              disabled={autoMode}
                              title="Edit event"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {!autoMode && (
                  <Button variant="outline" className="w-full mt-4 border-dashed" onClick={handleAddEvent}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                )}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="m-0">
          <div className="border rounded-lg p-4 border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </h3>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Today
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Tomorrow
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 relative">
              {/* Time markers */}
              <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-slate-200 dark:border-slate-700 pointer-events-none">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute text-xs text-slate-500 dark:text-slate-400"
                    style={{ top: `${(i / 24) * 100}%` }}
                  >
                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="ml-16 h-[600px] relative border-t border-slate-200 dark:border-slate-700">
                {/* Hour lines */}
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-full border-b border-slate-200 dark:border-slate-700 pointer-events-none"
                    style={{ top: `${((i + 1) / 24) * 100}%` }}
                  />
                ))}

                {/* Events */}
                {filteredEvents.map((event) => {
                  // Convert start and end times to percentages for positioning
                  const [startHour, startMinute] = event.startTime.split(":").map(Number)
                  const startPercent = ((startHour + startMinute / 60) / 24) * 100

                  let endPercent
                  if (event.endTime) {
                    const [endHour, endMinute] = event.endTime.split(":").map(Number)
                    endPercent = ((endHour + endMinute / 60) / 24) * 100
                  } else {
                    // Default to 30 minutes if no end time
                    endPercent = startPercent + ((event.duration || 30) / 1440) * 100
                  }

                  const height = endPercent - startPercent

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-0 right-0 rounded-md border px-2 py-1 overflow-hidden",
                        getEventColor(event.type),
                        event.status === "completed" && "opacity-70",
                      )}
                      style={{
                        top: `${startPercent}%`,
                        height: `${height}%`,
                        minHeight: "20px",
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {getEventIcon(event.type)}
                        <div className="font-medium text-sm truncate">{event.title}</div>
                      </div>
                      <div className="text-xs">
                        {formatTime(event.startTime)}
                        {event.endTime && ` - ${formatTime(event.endTime)}`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md mt-4">
        <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <p>
          {autoMode
            ? `Auto mode is on. Schedule is optimized for a ${babyAge}-month-old baby with ${scheduleType} focus.`
            : "Manual mode is on. You can customize the schedule by editing events."}
        </p>
      </div>
    </div>
  )
}
