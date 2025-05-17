"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Settings, Share, Download, PlusCircle, Info } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { EnhancedSmartSchedule } from "@/components/enhanced-smart-schedule"
import { SchedulePreferences } from "@/components/schedule-preferences"
import { ScheduleInsights } from "@/components/schedule-insights"

export default function SmartSchedulePage() {
  const [activeTab, setActiveTab] = useState("schedule")
  const [babyAge, setBabyAge] = useState(4) // Default to 4 months for demo
  const [scheduleDate, setScheduleDate] = useState(new Date())

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Smart Schedule</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Personalized daily routines optimized for your baby's development
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Optimized Daily Schedule
              </CardTitle>
              <CardDescription>
                Personalized schedule based on your baby's age, patterns, and your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedSmartSchedule babyAge={babyAge} scheduleDate={scheduleDate} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-500" />
                Schedule Preferences
              </CardTitle>
              <CardDescription>Customize how your baby's schedule is generated</CardDescription>
            </CardHeader>
            <CardContent>
              <SchedulePreferences babyAge={babyAge} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-green-500" />
                Schedule Insights
              </CardTitle>
              <CardDescription>Analytics and recommendations based on your baby's schedule adherence</CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleInsights babyAge={babyAge} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
