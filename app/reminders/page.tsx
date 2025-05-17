"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellRing, Plus, Clock, Calendar, Trash2, Edit, Check, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Morning Feeding",
      type: "feeding",
      time: "7:00 AM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      enabled: true,
    },
    {
      id: 2,
      title: "Afternoon Nap",
      type: "sleep",
      time: "1:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      enabled: true,
    },
    {
      id: 3,
      title: "Vitamin D Drops",
      type: "medication",
      time: "9:00 AM",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      enabled: true,
    },
    {
      id: 4,
      title: "Pediatrician Appointment",
      type: "appointment",
      time: "10:30 AM",
      date: "May 30, 2025",
      enabled: true,
    },
  ])

  const toggleReminder = (id: number) => {
    setReminders(
      reminders.map((reminder) => (reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder)),
    )
  }

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id))
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reminders</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="appointment">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-purple-500" />
                  Active Reminders
                </CardTitle>
                <CardDescription>Manage your daily and recurring reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders
                    .filter((r) => r.enabled)
                    .map((reminder) => (
                      <ReminderItem
                        key={reminder.id}
                        reminder={reminder}
                        onToggle={toggleReminder}
                        onDelete={deleteReminder}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create New Reminder</CardTitle>
                <CardDescription>Set up a new reminder for your baby's care</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Reminder Title</Label>
                    <Input id="title" placeholder="e.g., Morning Feeding" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Reminder Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feeding">Feeding</SelectItem>
                        <SelectItem value="sleep">Sleep</SelectItem>
                        <SelectItem value="diaper">Diaper</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="appointment">Appointment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date (Optional)</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Repeat</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <Button key={day} variant="outline" className="h-8 w-8 p-0" type="button">
                          {day.charAt(0)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Reminder</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feeding">
          <Card>
            <CardHeader>
              <CardTitle>Feeding Reminders</CardTitle>
              <CardDescription>Manage your feeding schedule reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders
                  .filter((reminder) => reminder.type === "feeding")
                  .map((reminder) => (
                    <ReminderItem
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={toggleReminder}
                      onDelete={deleteReminder}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Reminders</CardTitle>
              <CardDescription>Manage your sleep schedule reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders
                  .filter((reminder) => reminder.type === "sleep")
                  .map((reminder) => (
                    <ReminderItem
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={toggleReminder}
                      onDelete={deleteReminder}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medication">
          <Card>
            <CardHeader>
              <CardTitle>Medication Reminders</CardTitle>
              <CardDescription>Manage your medication reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders
                  .filter((reminder) => reminder.type === "medication")
                  .map((reminder) => (
                    <ReminderItem
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={toggleReminder}
                      onDelete={deleteReminder}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointment">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Reminders</CardTitle>
              <CardDescription>Manage your appointment reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders
                  .filter((reminder) => reminder.type === "appointment")
                  .map((reminder) => (
                    <ReminderItem
                      key={reminder.id}
                      reminder={reminder}
                      onToggle={toggleReminder}
                      onDelete={deleteReminder}
                    />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

interface Reminder {
  id: number
  title: string
  type: string
  time: string
  days?: string[]
  date?: string
  enabled: boolean
}

interface ReminderItemProps {
  reminder: Reminder
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function ReminderItem({ reminder, onToggle, onDelete }: ReminderItemProps) {
  const [editing, setEditing] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feeding":
        return (
          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full">
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
        )
      case "sleep":
        return (
          <div className="bg-indigo-100 dark:bg-indigo-900/20 p-2 rounded-full">
            <Clock className="h-4 w-4 text-indigo-500" />
          </div>
        )
      case "medication":
        return (
          <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
            <Clock className="h-4 w-4 text-red-500" />
          </div>
        )
      case "appointment":
        return (
          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
            <Calendar className="h-4 w-4 text-green-500" />
          </div>
        )
      default:
        return (
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
            <BellRing className="h-4 w-4 text-slate-500" />
          </div>
        )
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
      <div className="flex items-center gap-3">
        {getTypeIcon(reminder.type)}
        <div>
          <h4 className="font-medium">{reminder.title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {reminder.time} {reminder.date ? `• ${reminder.date}` : ""}
            {reminder.days && reminder.days.length > 0 && (
              <span> • {reminder.days.length === 7 ? "Every day" : reminder.days.join(", ")}</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {editing ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setEditing(false)}>
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setEditing(false)}>
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </>
        ) : (
          <>
            <Switch checked={reminder.enabled} onCheckedChange={() => onToggle(reminder.id)} />
            <Button variant="ghost" size="icon" onClick={() => setEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(reminder.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
