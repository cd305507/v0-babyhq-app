"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Bell, Calendar, Edit, Trash2, PlusCircle, Save, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample data for demonstration
const sampleSchedule = [
  {
    id: "1",
    time: "06:30",
    duration: 20,
    reminder: true,
    reminderTime: 10,
    notes: "Morning session",
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
  {
    id: "2",
    time: "09:30",
    duration: 15,
    reminder: true,
    reminderTime: 10,
    notes: "Mid-morning session",
    days: ["mon", "tue", "wed", "thu", "fri"],
  },
  {
    id: "3",
    time: "12:30",
    duration: 15,
    reminder: true,
    reminderTime: 10,
    notes: "Lunch break session",
    days: ["mon", "tue", "wed", "thu", "fri"],
  },
  {
    id: "4",
    time: "15:30",
    duration: 15,
    reminder: true,
    reminderTime: 10,
    notes: "Afternoon session",
    days: ["mon", "tue", "wed", "thu", "fri"],
  },
  {
    id: "5",
    time: "18:30",
    duration: 20,
    reminder: true,
    reminderTime: 10,
    notes: "Evening session",
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
  {
    id: "6",
    time: "21:30",
    duration: 20,
    reminder: true,
    reminderTime: 10,
    notes: "Before bed session",
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
]

export function PumpingSchedule() {
  const [schedule, setSchedule] = useState(sampleSchedule)
  const [activeTab, setActiveTab] = useState("schedule")
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [enableReminders, setEnableReminders] = useState(true)
  const [defaultReminderTime, setDefaultReminderTime] = useState<number[]>([10])
  const { toast } = useToast()

  // Format time for display
  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Format days for display
  const formatDays = (days: string[]) => {
    if (days.length === 7) return "Every day"
    if (
      days.includes("mon") &&
      days.includes("tue") &&
      days.includes("wed") &&
      days.includes("thu") &&
      days.includes("fri") &&
      !days.includes("sat") &&
      !days.includes("sun")
    ) {
      return "Weekdays"
    }
    if (
      !days.includes("mon") &&
      !days.includes("tue") &&
      !days.includes("wed") &&
      !days.includes("thu") &&
      !days.includes("fri") &&
      days.includes("sat") &&
      days.includes("sun")
    ) {
      return "Weekends"
    }
    return days.map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3)).join(", ")
  }

  // Handle deleting a schedule item
  const handleDeleteItem = (id: string) => {
    setSchedule(schedule.filter((item) => item.id !== id))
    toast({
      title: "Schedule Item Deleted",
      description: "The pumping schedule item has been removed.",
      duration: 3000,
    })
  }

  // Handle editing a schedule item
  const handleEditItem = (id: string) => {
    setEditingItem(id)
  }

  // Handle saving an edited schedule item
  const handleSaveItem = (id: string, updatedItem: any) => {
    setSchedule(schedule.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)))
    setEditingItem(null)
    toast({
      title: "Schedule Updated",
      description: "Your pumping schedule has been updated.",
      duration: 3000,
    })
  }

  // Handle adding a new schedule item
  const handleAddItem = () => {
    const newId = `new-${Date.now()}`
    const newItem = {
      id: newId,
      time: "12:00",
      duration: 15,
      reminder: enableReminders,
      reminderTime: defaultReminderTime[0],
      notes: "",
      days: ["mon", "tue", "wed", "thu", "fri"],
    }
    setSchedule([...schedule, newItem])
    setEditingItem(newId)
  }

  // Handle saving preferences
  const handleSavePreferences = () => {
    // Update all schedule items with new reminder settings
    if (!enableReminders) {
      setSchedule(schedule.map((item) => ({ ...item, reminder: false })))
    } else {
      setSchedule(schedule.map((item) => ({ ...item, reminder: true, reminderTime: defaultReminderTime[0] })))
    }

    toast({
      title: "Preferences Saved",
      description: "Your pumping schedule preferences have been updated.",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Bell className="h-4 w-4 mr-2" />
            Reminders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Pumping Schedule</h3>
            <Button onClick={handleAddItem}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Time
            </Button>
          </div>

          {schedule.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Schedule Items</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                  You haven't added any pumping schedule items yet.
                </p>
                <Button onClick={handleAddItem}>Add First Schedule Item</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {schedule.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {editingItem === item.id ? (
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor={`time-${item.id}`}>Time</Label>
                            <Input
                              id={`time-${item.id}`}
                              type="time"
                              defaultValue={item.time}
                              onChange={(e) => (item.time = e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`duration-${item.id}`}>Duration (minutes)</Label>
                            <Input
                              id={`duration-${item.id}`}
                              type="number"
                              min="5"
                              max="60"
                              step="5"
                              defaultValue={item.duration}
                              onChange={(e) => (item.duration = Number.parseInt(e.target.value))}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Days</Label>
                          <div className="flex flex-wrap gap-2">
                            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                              <Button
                                key={day}
                                type="button"
                                variant={item.days.includes(day) ? "default" : "outline"}
                                className="h-8 px-2 text-xs"
                                onClick={() => {
                                  if (item.days.includes(day)) {
                                    item.days = item.days.filter((d) => d !== day)
                                  } else {
                                    item.days = [...item.days, day]
                                  }
                                }}
                              >
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`reminder-${item.id}`}>Enable Reminder</Label>
                            <Switch
                              id={`reminder-${item.id}`}
                              checked={item.reminder}
                              onCheckedChange={(checked) => (item.reminder = checked)}
                            />
                          </div>
                          {item.reminder && (
                            <div className="space-y-2">
                              <Label htmlFor={`reminder-time-${item.id}`}>Reminder Time (minutes before)</Label>
                              <Input
                                id={`reminder-time-${item.id}`}
                                type="number"
                                min="1"
                                max="30"
                                defaultValue={item.reminderTime}
                                onChange={(e) => (item.reminderTime = Number.parseInt(e.target.value))}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`notes-${item.id}`}>Notes</Label>
                          <Input
                            id={`notes-${item.id}`}
                            placeholder="Add notes about this pumping session"
                            defaultValue={item.notes}
                            onChange={(e) => (item.notes = e.target.value)}
                          />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setEditingItem(null)}>
                            Cancel
                          </Button>
                          <Button onClick={() => handleSaveItem(item.id, item)}>
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <span className="text-lg font-medium">{formatTime(item.time)}</span>
                            {item.reminder && (
                              <Badge
                                variant="outline"
                                className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              >
                                <Bell className="h-3 w-3 mr-1" />
                                {item.reminderTime} min reminder
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {item.duration} minutes • {formatDays(item.days)}
                          </div>
                          {item.notes && <div className="text-sm mt-1">{item.notes}</div>}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditItem(item.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-md bg-blue-50 dark:bg-blue-900/20">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-800 dark:text-blue-300">Schedule Tips</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  For optimal milk production, try to pump every 3-4 hours during the day, with a longer stretch at
                  night if possible. Consistent pumping times help establish and maintain your supply.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reminder Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-reminders" className="text-base">
                    Enable Pumping Reminders
                  </Label>
                  <Switch id="enable-reminders" checked={enableReminders} onCheckedChange={setEnableReminders} />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Receive notifications for scheduled pumping sessions
                </p>
              </div>

              {enableReminders && (
                <div className="space-y-2">
                  <Label htmlFor="default-reminder-time">Default Reminder Time (minutes before)</Label>
                  <Slider
                    id="default-reminder-time"
                    value={defaultReminderTime}
                    max={30}
                    min={1}
                    step={1}
                    onValueChange={setDefaultReminderTime}
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1 minute</span>
                    <span>{defaultReminderTime[0]} minutes</span>
                    <span>30 minutes</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reminder-sound">Reminder Sound</Label>
                <Select defaultValue="chime">
                  <SelectTrigger id="reminder-sound">
                    <SelectValue placeholder="Select sound" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chime">Gentle Chime</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="silent">Silent (Vibrate Only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="snooze-option" className="text-base">
                    Enable Snooze Option
                  </Label>
                  <Switch id="snooze-option" defaultChecked />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Allow snoozing reminders when you can't pump immediately
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-calendar" className="text-base">
                    Sync with Calendar
                  </Label>
                  <Switch id="sync-calendar" defaultChecked />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Add pumping sessions to your device calendar
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="partner-notifications" className="text-base">
                    Partner Notifications
                  </Label>
                  <Switch id="partner-notifications" defaultChecked />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Send notifications to your partner when you start pumping
                </p>
              </div>

              <Button onClick={handleSavePreferences} className="w-full mt-4">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
