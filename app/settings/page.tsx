"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Baby, Bell, Upload, Save, Users } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [babyName, setBabyName] = useState("Baby Biersack")
  const [babyDOB, setBabyDOB] = useState("2025-02-01")
  const [parent1Name, setParent1Name] = useState("Carolyn Biersack")
  const [parent2Name, setParent2Name] = useState("Olivia Biersack")

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Settings</h1>
      </div>

      <Tabs defaultValue="baby" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="baby">Baby</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data & Sync</TabsTrigger>
        </TabsList>

        <TabsContent value="baby">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-purple-500" />
                Baby Profile
              </CardTitle>
              <CardDescription>Manage your baby's information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 ring-4 ring-purple-100 dark:ring-slate-700">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Baby" />
                    <AvatarFallback>BB</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="babyName">Baby's Name</Label>
                    <Input id="babyName" value={babyName} onChange={(e) => setBabyName(e.target.value)} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="babyDOB">Expected Due Date</Label>
                      <Input id="babyDOB" type="date" value={babyDOB} onChange={(e) => setBabyDOB(e.target.value)} />
                      <p className="text-xs text-purple-500 dark:text-purple-400">August 19, 2025</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="babyGender">Gender</Label>
                      <Select defaultValue="female">
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="surprise">Surprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthWeight">Birth Weight</Label>
                      <Input id="birthWeight" defaultValue="7.5" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">lbs</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthHeight">Birth Height</Label>
                      <Input id="birthHeight" defaultValue="20" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">inches</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthHeadCirc">Head Circumference</Label>
                      <Input id="birthHeadCirc" defaultValue="13.5" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">inches</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pediatrician">Pediatrician</Label>
                    <Input id="pediatrician" defaultValue="Dr. Sarah Johnson" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="parents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-slate-500" />
                Parents Information
              </CardTitle>
              <CardDescription>Manage parent profiles for syncing between devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4 border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium mb-4">Parent 1</h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-16 w-16 ring-2 ring-purple-100 dark:ring-slate-700">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Parent 1" />
                        <AvatarFallback>CB</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parent1Name">Name</Label>
                          <Input
                            id="parent1Name"
                            value={parent1Name}
                            onChange={(e) => setParent1Name(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent1Relation">Relation</Label>
                          <Select defaultValue="mother">
                            <SelectTrigger>
                              <SelectValue placeholder="Select relation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parent1DeviceId">Device ID (for syncing)</Label>
                        <Input id="parent1DeviceId" defaultValue="DEVICE-123456" />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          This ID helps sync data between your devices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium mb-4">Parent 2</h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-16 w-16 ring-2 ring-purple-100 dark:ring-slate-700">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Parent 2" />
                        <AvatarFallback>OB</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parent2Name">Name</Label>
                          <Input
                            id="parent2Name"
                            value={parent2Name}
                            onChange={(e) => setParent2Name(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent2Relation">Relation</Label>
                          <Select defaultValue="mother">
                            <SelectTrigger>
                              <SelectValue placeholder="Select relation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="parent2DeviceId">Device ID (for syncing)</Label>
                        <Input id="parent2DeviceId" defaultValue="DEVICE-789012" />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          This ID helps sync data between your devices
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-500" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="feedingNotifications" className="text-base">
                        Feeding Reminders
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified when it's time for the next feeding
                      </p>
                    </div>
                    <Switch id="feedingNotifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sleepNotifications" className="text-base">
                        Sleep Windows
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified when baby's optimal sleep window is approaching
                      </p>
                    </div>
                    <Switch id="sleepNotifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="medicationNotifications" className="text-base">
                        Medication Reminders
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified when it's time for medication
                      </p>
                    </div>
                    <Switch id="medicationNotifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointmentNotifications" className="text-base">
                        Appointment Reminders
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified about upcoming appointments
                      </p>
                    </div>
                    <Switch id="appointmentNotifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sync Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="syncNotifications" className="text-base">
                        Partner Activity
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified when your partner logs an activity
                      </p>
                    </div>
                    <Switch id="syncNotifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="milestoneNotifications" className="text-base">
                        Milestone Alerts
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified when baby reaches a new milestone
                      </p>
                    </div>
                    <Switch id="milestoneNotifications" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Data & Sync Settings</CardTitle>
              <CardDescription>Manage your data and sync settings between devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Storage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="localStorage" className="text-base">
                        Local Storage
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Store data locally on this device</p>
                    </div>
                    <Switch id="localStorage" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="exportData">Export Data</Label>
                    <div className="flex gap-2">
                      <Button variant="outline">Export as CSV</Button>
                      <Button variant="outline">Export as JSON</Button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Export your data to back it up or transfer to another device
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="importData">Import Data</Label>
                    <div className="flex gap-2">
                      <Button variant="outline">Import Data</Button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Import previously exported data</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Device Sync</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableSync" className="text-base">
                        Enable Sync
                      </Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Sync data between your and your partner's devices
                      </p>
                    </div>
                    <Switch id="enableSync" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="syncMethod">Sync Method</Label>
                    <Select defaultValue="local">
                      <SelectTrigger>
                        <SelectValue placeholder="Select sync method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Network</SelectItem>
                        <SelectItem value="cloud">Cloud Storage</SelectItem>
                        <SelectItem value="manual">Manual Sync</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Choose how to sync data between devices
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="syncFrequency">Sync Frequency</Label>
                    <Select defaultValue="realtime">
                      <SelectTrigger>
                        <SelectValue placeholder="Select sync frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline">Sync Now</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
