"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PumpingSessionForm } from "@/components/pumping-session-form"
import { Droplet, Clock, Edit, Trash2, PlusCircle, Mic, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data for demonstration
const samplePumpingSessions = [
  {
    id: "1",
    parent: "Carolyn",
    timestamp: "2025-05-16T08:30:00Z",
    sides: "both",
    leftAmount: 2.5,
    rightAmount: 2.0,
    totalAmount: 4.5,
    duration: 20,
    comfort: 4,
    letdown: 4,
    pumpModel: "spectra-s1",
    timeOfDayLabel: "Morning Milk",
    notes: "Morning session went well. Used massage mode for first 2 minutes.",
  },
  {
    id: "2",
    parent: "Carolyn",
    timestamp: "2025-05-16T12:15:00Z",
    sides: "both",
    leftAmount: 2.0,
    rightAmount: 1.8,
    totalAmount: 3.8,
    duration: 15,
    comfort: 3,
    letdown: 3,
    pumpModel: "spectra-s1",
    timeOfDayLabel: "Afternoon Milk",
    notes: "Felt a bit rushed during lunch break.",
  },
  {
    id: "3",
    parent: "Carolyn",
    timestamp: "2025-05-16T16:45:00Z",
    sides: "both",
    leftAmount: 1.8,
    rightAmount: 1.5,
    totalAmount: 3.3,
    duration: 18,
    comfort: 3,
    letdown: 2,
    pumpModel: "spectra-s1",
    timeOfDayLabel: "Afternoon Milk",
    notes: "Supply seems lower in the afternoon.",
  },
  {
    id: "4",
    parent: "Carolyn",
    timestamp: "2025-05-15T08:15:00Z",
    sides: "both",
    leftAmount: 2.3,
    rightAmount: 2.2,
    totalAmount: 4.5,
    duration: 22,
    comfort: 4,
    letdown: 4,
    pumpModel: "spectra-s1",
    timeOfDayLabel: "Morning Milk",
    notes: "Good morning session.",
  },
  {
    id: "5",
    parent: "Carolyn",
    timestamp: "2025-05-15T13:00:00Z",
    sides: "both",
    leftAmount: 1.9,
    rightAmount: 1.7,
    totalAmount: 3.6,
    duration: 17,
    comfort: 3,
    letdown: 3,
    pumpModel: "spectra-s1",
    timeOfDayLabel: "Afternoon Milk",
    notes: "",
  },
]

// Add this function to get the emoji for time of day
const getTimeOfDayEmoji = (label: string) => {
  switch (label) {
    case "Morning Milk":
      return "🌅"
    case "Afternoon Milk":
      return "☀️"
    case "Evening Milk":
      return "🌇"
    case "Night Milk":
      return "🌃"
    default:
      return "⏱️"
  }
}

// Add this function to determine time-of-day label based on time
const getTimeOfDayLabel = (timeString: string) => {
  const hour = Number.parseInt(timeString.split(":")[0], 10)

  if (hour >= 5 && hour < 11) return "Morning Milk"
  if (hour >= 11 && hour < 17) return "Afternoon Milk"
  if (hour >= 17 && hour < 21) return "Evening Milk"
  return "Night Milk"
}

export function PumpingTracker() {
  const [sessions, setSessions] = useState(samplePumpingSessions)
  const [activeTab, setActiveTab] = useState("today")
  const [editingSession, setEditingSession] = useState<string | null>(null)
  const [showSessionForm, setShowSessionForm] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const { toast } = useToast()

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id))
    toast({
      title: "Session Deleted",
      description: "The pumping session has been removed.",
      duration: 3000,
    })
  }

  const handleEditSession = (id: string) => {
    setEditingSession(id)
    setShowSessionForm(true)
  }

  const handleSessionSubmit = (data: any) => {
    if (editingSession) {
      // Update existing session
      setSessions(
        sessions.map((session) =>
          session.id === editingSession
            ? {
                ...session,
                ...data,
              }
            : session,
        ),
      )
      toast({
        title: "Session Updated",
        description: "Your pumping session has been updated.",
        duration: 3000,
      })
    } else {
      // Add new session
      const newSession = {
        id: `new-${Date.now()}`,
        ...data,
      }
      setSessions([newSession, ...sessions])
      toast({
        title: "Session Added",
        description: "Your new pumping session has been recorded.",
        duration: 3000,
      })
    }
    setEditingSession(null)
    setShowSessionForm(false)
  }

  const handleVoiceEntry = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Start recording
      toast({
        title: "Voice Recording Started",
        description: "Speak clearly to record your pumping session details.",
        duration: 3000,
      })
      // Simulate ending recording after 5 seconds
      setTimeout(() => {
        setIsRecording(false)
        toast({
          title: "Voice Entry Processed",
          description: "Added new pumping session: 3.5 oz total, 18 minutes, both sides.",
          duration: 3000,
        })
        // Add a simulated session from voice data
        const voiceSession = {
          id: `voice-${Date.now()}`,
          parent: "Carolyn",
          timestamp: new Date().toISOString(),
          sides: "both",
          leftAmount: 1.8,
          rightAmount: 1.7,
          totalAmount: 3.5,
          duration: 18,
          comfort: 4,
          letdown: 3,
          pumpModel: "spectra-s1",
          timeOfDayLabel: getTimeOfDayLabel(new Date().toTimeString().substring(0, 5)),
          notes: "Added via voice entry",
        }
        setSessions([voiceSession, ...sessions])
      }, 5000)
    } else {
      // Stop recording
      toast({
        title: "Voice Recording Stopped",
        description: "Processing your pumping session details...",
        duration: 3000,
      })
    }
  }

  // Filter sessions based on the active tab
  const today = new Date().toISOString().split("T")[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.timestamp).toISOString().split("T")[0]
    if (activeTab === "today") {
      return sessionDate === today
    } else if (activeTab === "yesterday") {
      return sessionDate === yesterday
    } else {
      return true // "all" tab
    }
  })

  // Calculate daily totals
  const todayTotal = sessions
    .filter((session) => new Date(session.timestamp).toISOString().split("T")[0] === today)
    .reduce((sum, session) => sum + session.totalAmount, 0)

  const yesterdayTotal = sessions
    .filter((session) => new Date(session.timestamp).toISOString().split("T")[0] === yesterday)
    .reduce((sum, session) => sum + session.totalAmount, 0)

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Format date for display
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="today">
              Today
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {todayTotal.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="yesterday">
              Yesterday
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {yesterdayTotal.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="all">All Sessions</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleVoiceEntry}
            className={isRecording ? "bg-red-100 dark:bg-red-900/20" : ""}
          >
            {isRecording ? <Volume2 className="h-4 w-4 mr-2 text-red-500" /> : <Mic className="h-4 w-4 mr-2" />}
            {isRecording ? "Recording..." : "Voice Entry"}
          </Button>
          <Button onClick={() => setShowSessionForm(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Session
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Droplet className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Pumping Sessions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                {activeTab === "today"
                  ? "You haven't recorded any pumping sessions today."
                  : activeTab === "yesterday"
                    ? "You didn't record any pumping sessions yesterday."
                    : "No pumping sessions have been recorded yet."}
              </p>
              <Button onClick={() => setShowSessionForm(true)}>Record First Session</Button>
            </CardContent>
          </Card>
        ) : (
          filteredSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 md:w-1/4 flex flex-col justify-center items-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {session.totalAmount.toFixed(1)}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">ounces</div>
                    <div className="flex items-center mt-2 text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {session.duration} min
                    </div>
                  </div>

                  <div className="p-4 md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={session.parent} />
                            <AvatarFallback className="text-[10px]">
                              {session.parent.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{session.parent}</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {formatTimestamp(session.timestamp)}
                          </span>
                          {activeTab === "all" && (
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {formatDate(session.timestamp)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditSession(session.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSession(session.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Left</div>
                        <div className="font-medium">{session.leftAmount.toFixed(1)} oz</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Right</div>
                        <div className="font-medium">{session.rightAmount.toFixed(1)} oz</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Sides</div>
                        <div className="font-medium capitalize">{session.sides}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Pump</div>
                        <div className="font-medium">
                          {session.pumpModel
                            .split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 flex items-center gap-1"
                      >
                        {getTimeOfDayEmoji(session.timeOfDayLabel)} {session.timeOfDayLabel}
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">
                        Comfort: {session.comfort}/5
                      </Badge>
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800">
                        Letdown: {session.letdown}/5
                      </Badge>
                    </div>

                    {session.notes && (
                      <div className="mt-3 text-sm text-slate-600 dark:text-slate-400 border-t pt-2 border-slate-200 dark:border-slate-700">
                        {session.notes}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showSessionForm} onOpenChange={setShowSessionForm}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <PumpingSessionForm
            onClose={() => {
              setShowSessionForm(false)
              setEditingSession(null)
            }}
            onSubmit={handleSessionSubmit}
            initialData={editingSession ? sessions.find((s) => s.id === editingSession) : undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
