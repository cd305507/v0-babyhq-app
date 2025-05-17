"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Save, AlertCircle, Info, Edit } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SchedulePreferencesProps {
  babyAge: number
}

export function SchedulePreferences({ babyAge }: SchedulePreferencesProps) {
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  // General preferences
  const [scheduleType, setScheduleType] = useState<string>("balanced")
  const [flexibility, setFlexibility] = useState<number[]>([50])
  const [enableReminders, setEnableReminders] = useState<boolean>(true)
  const [reminderTime, setReminderTime] = useState<number[]>([10])
  const [enableSync, setEnableSync] = useState<boolean>(true)

  // Feeding preferences
  const [feedingInterval, setFeedingInterval] = useState<number[]>([3])
  const [feedingDuration, setFeedingDuration] = useState<number[]>([30])
  const [trackVolume, setTrackVolume] = useState<boolean>(true)
  const [includeSolids, setIncludeSolids] = useState<boolean>(babyAge >= 6)

  // Sleep preferences
  const [maxAwakeTime, setMaxAwakeTime] = useState<number[]>([babyAge < 3 ? 60 : 120])
  const [napCount, setNapCount] = useState<string>(
    babyAge < 3 ? "4-5" : babyAge < 6 ? "3-4" : babyAge < 9 ? "2-3" : "1-2",
  )
  const [bedtime, setBedtime] = useState<string>("19:30")
  const [wakeTime, setWakeTime] = useState<string>("06:30")

  // Medication preferences
  const [hasMedications, setHasMedications] = useState<boolean>(false)
  const [medicationReminders, setMedicationReminders] = useState<boolean>(true)

  // Handle save preferences
  const handleSavePreferences = () => {
    // In a real app, this would save to a database or state management
    toast({
      title: "Preferences Saved",
      description: "Your schedule preferences have been updated.",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-type">Schedule Type</Label>
              <Select value={scheduleType} onValueChange={setScheduleType}>
                <SelectTrigger id="schedule-type">
                  <SelectValue placeholder="Select schedule type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
                  <SelectItem value="sleep-focused">Sleep Focused</SelectItem>
                  <SelectItem value="feeding-focused">Feeding Focused</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose the primary focus for your baby's schedule optimization
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="flexibility">Schedule Flexibility</Label>
              <Slider id="flexibility" value={flexibility} max={100} step={10} onValueChange={setFlexibility} />
              <div className="flex justify-between text-xs text-slate-500">
                <span>More Flexible</span>
                <span>More Structured</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust how strictly the schedule should be followed
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-reminders" className="text-base">
                  Enable Reminders
                </Label>
                <Switch id="enable-reminders" checked={enableReminders} onCheckedChange={setEnableReminders} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Receive notifications for upcoming schedule events
              </p>
            </div>

            {enableReminders && (
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Reminder Time (minutes before)</Label>
                <Slider
                  id="reminder-time"
                  value={reminderTime}
                  max={30}
                  min={1}
                  step={1}
                  onValueChange={setReminderTime}
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 minute</span>
                  <span>{reminderTime[0]} minutes</span>
                  <span>30 minutes</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-sync" className="text-base">
                  Sync with Calendar
                </Label>
                <Switch id="enable-sync" checked={enableSync} onCheckedChange={setEnableSync} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sync your baby's schedule with your device calendar
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feeding" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md">
              <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <p>These settings help optimize feeding times for a {babyAge}-month-old baby</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feeding-interval">Target Feeding Interval (hours)</Label>
              <Slider
                id="feeding-interval"
                value={feedingInterval}
                max={6}
                min={1}
                step={0.5}
                onValueChange={setFeedingInterval}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>1 hour</span>
                <span>{feedingInterval[0]} hours</span>
                <span>6 hours</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recommended for {babyAge} months: {babyAge < 3 ? "2-3" : babyAge < 6 ? "3-4" : "4-5"} hours
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feeding-duration">Average Feeding Duration (minutes)</Label>
              <Slider
                id="feeding-duration"
                value={feedingDuration}
                max={60}
                min={5}
                step={5}
                onValueChange={setFeedingDuration}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>5 min</span>
                <span>{feedingDuration[0]} min</span>
                <span>60 min</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="track-volume" className="text-base">
                  Track Feeding Volume
                </Label>
                <Switch id="track-volume" checked={trackVolume} onCheckedChange={setTrackVolume} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Include volume tracking in feeding schedule</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-solids" className="text-base">
                  Include Solid Foods
                </Label>
                <Switch id="include-solids" checked={includeSolids} onCheckedChange={setIncludeSolids} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {babyAge < 4
                  ? "Not recommended for babies under 4 months"
                  : babyAge < 6
                    ? "Optional for babies 4-6 months (consult pediatrician)"
                    : "Recommended for babies 6+ months"}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-md">
              <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
              <p>These settings help optimize sleep times for a {babyAge}-month-old baby</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-awake-time">Maximum Awake Time (minutes)</Label>
              <Slider
                id="max-awake-time"
                value={maxAwakeTime}
                max={240}
                min={30}
                step={15}
                onValueChange={setMaxAwakeTime}
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>30 min</span>
                <span>{maxAwakeTime[0]} min</span>
                <span>4 hours</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recommended for {babyAge} months:{" "}
                {babyAge < 3
                  ? "45-90 minutes"
                  : babyAge < 6
                    ? "1.5-2.5 hours"
                    : babyAge < 9
                      ? "2-3 hours"
                      : "3-4 hours"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nap-count">Target Number of Naps</Label>
              <Select value={napCount} onValueChange={setNapCount}>
                <SelectTrigger id="nap-count">
                  <SelectValue placeholder="Select nap count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4-5">4-5 naps (Newborn)</SelectItem>
                  <SelectItem value="3-4">3-4 naps (3-5 months)</SelectItem>
                  <SelectItem value="2-3">2-3 naps (6-9 months)</SelectItem>
                  <SelectItem value="1-2">1-2 naps (10+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedtime">Target Bedtime</Label>
                <Input id="bedtime" type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wake-time">Target Wake Time</Label>
                <Input id="wake-time" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
              </div>
            </div>

            <div className="p-3 border border-yellow-200 dark:border-yellow-800 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Sleep Safety Note</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Always follow safe sleep guidelines. Place baby on back, in a crib with firm mattress, no loose
                    bedding, pillows, or toys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="medication" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="has-medications" className="text-base">
                  Include Medications in Schedule
                </Label>
                <Switch id="has-medications" checked={hasMedications} onCheckedChange={setHasMedications} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add medication reminders to your baby's schedule
              </p>
            </div>

            {hasMedications && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="medication-reminders" className="text-base">
                      Medication Reminders
                    </Label>
                    <Switch
                      id="medication-reminders"
                      checked={medicationReminders}
                      onCheckedChange={setMedicationReminders}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Receive notifications for medication times
                  </p>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Medication Schedule</CardTitle>
                    <CardDescription>Add medications to include in your baby's schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded-md border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-red-500" />
                          <div>
                            <p className="font-medium">Vitamin D Drops</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Once daily with morning feed</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full">
                        Add Medication
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSavePreferences}>
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  )
}
