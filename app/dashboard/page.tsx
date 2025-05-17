"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Utensils, Moon, Droplets, Clock, Calendar, CalendarDays } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { DailyOverview } from "@/components/daily-overview"
import { Baby } from "lucide-react"
import { QuickEntryMenu } from "@/components/quick-entry-menu"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
// Add the import for useBaby
import { useBaby } from "@/contexts/baby-context"

// Update the Dashboard component to use the context
// Replace the static birth date calculation with the context

export default function Dashboard() {
  // Remove these lines:
  // const babyBirthDate = new Date(2025, 7, 19) // Month is 0-indexed (7 = August)
  // const today = new Date()
  // const babyAgeInMonths = ...

  // Add this:
  const { birthDate, babyName, calculateAgeInMonths, isExpected } = useBaby()
  const today = new Date()

  // For demo purposes, we'll use a positive age to show the features
  const demoAgeInMonths = 4 // Simulating a 4-month-old baby

  // Use state to control dynamic component loading
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)

  // Update the baby information section to use the context values
  // Find the section with the baby's information and update it:

  // Replace the Avatar section with:
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        {/* Update the baby's information at the top of the dashboard */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-4 border-purple-100 dark:border-slate-700">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt={babyName} />
            <AvatarFallback>
              {babyName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{babyName}</h1>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              {isExpected ? (
                <span>
                  Expected arrival:{" "}
                  {birthDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              ) : (
                <span>
                  Born: {birthDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              )}
              <Badge
                variant="outline"
                className="ml-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
              >
                {isExpected ? "Coming soon!" : `${calculateAgeInMonths()} months old`}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            May 16, 2025
          </Button>
          <QuickEntryMenu />
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="diaper">Diaper</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Replace the quick stat cards with "waiting for baby" versions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-purple-500" />
                  Feeding
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="text-center">
                  <div className="animate-bounce-subtle mb-2">
                    <Baby className="h-10 w-10 text-purple-300 dark:text-purple-700 mx-auto" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">Waiting for baby's arrival</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">August 19, 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  Sleep
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="text-center">
                  <div className="animate-float mb-2">
                    <Moon className="h-10 w-10 text-indigo-300 dark:text-indigo-700 mx-auto" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">Waiting for baby's arrival</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">August 19, 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Diaper
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="text-center">
                  <div className="animate-pulse-subtle mb-2">
                    <Droplets className="h-10 w-10 text-blue-300 dark:text-blue-700 mx-auto" />
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">Waiting for baby's arrival</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">August 19, 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              {/* Update the timeline section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-500" />
                    Countdown to Baby
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-gradient mb-2">Coming Soon!</h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        Your baby tracking journey begins on August 19, 2025
                      </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 max-w-md w-full">
                      <CountdownCard value="0" label="Months" />
                      <CountdownCard value="0" label="Days" />
                      <CountdownCard value="0" label="Hours" />
                      <CountdownCard value="0" label="Minutes" />
                    </div>

                    <div className="mt-8">
                      <Button>
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-500" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Pediatrician Visit</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">4-month checkup</p>
                      </div>
                      <Badge>May 30</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Vaccination Due</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">4-month vaccines</p>
                      </div>
                      <Badge>May 30</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advanced Features Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Advanced Features Preview</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Explore these advanced features that will be available after your baby arrives. For demonstration
              purposes, we're showing how they would work for a {demoAgeInMonths}-month-old baby.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <Button onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)} className="w-full">
                {showAdvancedFeatures ? "Hide Advanced Features" : "Show Advanced Features Preview"}
              </Button>

              {showAdvancedFeatures && (
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      The advanced features include SweetSpot Nap Predictor, AI Sleep Coach, Nutrition Advisor, Smart
                      Scheduling Tool, Daily Tip Engine, and Growth & Milestone Predictor.
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">
                      These features will help you optimize your baby's sleep schedule, receive personalized
                      recommendations, track nutrition against guidelines, create smart daily schedules, get daily
                      parenting tips, and predict upcoming developmental milestones.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feeding">
          <DailyOverview type="feeding" />
        </TabsContent>

        <TabsContent value="sleep">
          <DailyOverview type="sleep" />
        </TabsContent>

        <TabsContent value="diaper">
          <DailyOverview type="diaper" />
        </TabsContent>

        <TabsContent value="growth">
          <DailyOverview type="growth" />
        </TabsContent>

        <TabsContent value="health">
          <DailyOverview type="health" />
        </TabsContent>
      </Tabs>
      <Toaster />
    </DashboardLayout>
  )
}

function CountdownCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{value}</div>
      <div className="text-xs text-purple-600 dark:text-purple-400">{label}</div>
    </div>
  )
}
