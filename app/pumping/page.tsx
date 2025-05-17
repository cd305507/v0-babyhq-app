"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, History, BarChart3, Calendar, Droplet, Baby, Info } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { PumpingTracker } from "@/components/pumping-tracker"
import { PumpingInsights } from "@/components/pumping-insights"
import { PumpingSchedule } from "@/components/pumping-schedule"
import { MilkInventory } from "@/components/milk-inventory"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PumpingSessionForm } from "@/components/pumping-session-form"
import { FeedingRecommendation } from "@/components/feeding-recommendation"

export default function PumpingPage() {
  const [activeTab, setActiveTab] = useState("tracker")
  const [showSessionForm, setShowSessionForm] = useState(false)

  const handleSessionSubmit = (data: any) => {
    console.log("New pumping session submitted:", data)
    // Here you would typically update your state or send to an API
    setShowSessionForm(false)
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Pumping Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400">Track, manage, and optimize your pumping journey</p>
        </div>
        <Button onClick={() => setShowSessionForm(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Session
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="tracker">
            <Droplet className="h-4 w-4 mr-2" />
            Tracker
          </TabsTrigger>
          <TabsTrigger value="insights">
            <BarChart3 className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="inventory">
            <History className="h-4 w-4 mr-2" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="feeding">
            <Baby className="h-4 w-4 mr-2" />
            Feeding
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tracker">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pumping Sessions</CardTitle>
              <CardDescription>Track your pumping sessions, including duration, amount, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <PumpingTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pumping Insights</CardTitle>
              <CardDescription>
                Visualize your pumping data and get insights to optimize your pumping journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PumpingInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pumping Schedule</CardTitle>
              <CardDescription>Manage your pumping schedule and set reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <PumpingSchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Milk Inventory</CardTitle>
              <CardDescription>Track your stored milk inventory and manage usage</CardDescription>
            </CardHeader>
            <CardContent>
              <MilkInventory />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feeding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Feeding Recommendations</CardTitle>
                <CardDescription>Get recommendations for which milk to use based on time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedingRecommendation />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Time-of-Day Milk Guide</CardTitle>
                <CardDescription>Understanding the benefits of time-aware feeding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">🌅</div>
                    <div>
                      <div className="font-medium">Morning Milk (5:00 AM - 11:00 AM)</div>
                      <div className="text-sm text-slate-500">
                        Higher in cortisol to promote alertness and activity. Great for morning and daytime feedings.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">☀️</div>
                    <div>
                      <div className="font-medium">Afternoon Milk (11:00 AM - 5:00 PM)</div>
                      <div className="text-sm text-slate-500">
                        Balanced composition. Suitable for most feedings throughout the day.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">🌇</div>
                    <div>
                      <div className="font-medium">Evening Milk (5:00 PM - 9:00 PM)</div>
                      <div className="text-sm text-slate-500">
                        Beginning to increase in sleep-inducing components. Good for evening feedings.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">🌃</div>
                    <div>
                      <div className="font-medium">Night Milk (9:00 PM - 5:00 AM)</div>
                      <div className="text-sm text-slate-500">
                        Rich in melatonin and tryptophan to promote sleep. Ideal for bedtime and night feedings.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Research-Based Benefits</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Studies show that time-of-day appropriate milk can help regulate baby's circadian rhythm and
                        improve sleep patterns. Night milk contains up to 3x more melatonin than day milk.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showSessionForm} onOpenChange={setShowSessionForm}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <PumpingSessionForm onClose={() => setShowSessionForm(false)} onSubmit={handleSessionSubmit} />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
