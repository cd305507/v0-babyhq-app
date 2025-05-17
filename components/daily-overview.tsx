"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Utensils,
  Moon,
  Droplets,
  Droplet,
  TrashIcon as Poop,
  Ruler,
  Pill,
  Plus,
  Clock,
  CalendarDays,
  Baby,
  Calendar,
} from "lucide-react"
import { FeedingChart } from "@/components/feeding-chart"
import { SleepChart } from "@/components/sleep-chart"
import { DiaperChart } from "@/components/diaper-chart"
import { GrowthChart } from "@/components/growth-chart"
import { EntryForm } from "@/components/entry-form"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useBaby } from "@/contexts/baby-context"
import { BreastfeedingIcon, BottleFeedingIcon, SolidsIcon } from "@/components/feeding-icons"

type OverviewType = "feeding" | "sleep" | "diaper" | "growth" | "health"
type FeedingType = "Breastfeeding" | "Bottle" | "Solids" | null

interface DailyOverviewProps {
  type: OverviewType
}

export function DailyOverview({ type }: DailyOverviewProps) {
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [selectedFeedingType, setSelectedFeedingType] = useState<FeedingType>(null)
  const [selectedDiaperType, setSelectedDiaperType] = useState<"Wet" | "Dirty" | "Mixed" | null>(null)
  const { birthDate, isExpected } = useBaby()

  const typeConfig = {
    feeding: {
      title: "Feeding Tracker",
      icon: <Utensils className="h-5 w-5 text-purple-500" />,
      description: "Track breastfeeding, bottle feeding, and solid foods",
      chart: <FeedingChart />,
      actions: [
        {
          label: "Breastfeed",
          icon: <BreastfeedingIcon className="h-5 w-5" />,
          onClick: () => {
            setSelectedFeedingType("Breastfeeding")
            setShowEntryForm(true)
          },
        },
        {
          label: "Bottle",
          icon: <BottleFeedingIcon className="h-5 w-5" />,
          onClick: () => {
            setSelectedFeedingType("Bottle")
            setShowEntryForm(true)
          },
        },
        {
          label: "Solids",
          icon: <SolidsIcon className="h-5 w-5" />,
          onClick: () => {
            setSelectedFeedingType("Solids")
            setShowEntryForm(true)
          },
        },
      ],
    },
    sleep: {
      title: "Sleep Tracker",
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      description: "Track naps and nighttime sleep patterns",
      chart: <SleepChart />,
      actions: [
        { label: "Start Sleep", icon: <Moon className="h-4 w-4" /> },
        { label: "End Sleep", icon: <Clock className="h-4 w-4" /> },
        { label: "Add Sleep", icon: <Plus className="h-4 w-4" /> },
      ],
    },
    diaper: {
      title: "Diaper Tracker",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      description: "Track diaper changes and patterns",
      chart: <DiaperChart />,
      actions: [
        {
          label: "Wet",
          icon: <Droplet className="h-4 w-4 text-blue-500" />,
          onClick: () => {
            setSelectedDiaperType("Wet")
            setShowEntryForm(true)
          },
        },
        {
          label: "Dirty",
          icon: <Poop className="h-4 w-4 text-amber-700" />,
          onClick: () => {
            setSelectedDiaperType("Dirty")
            setShowEntryForm(true)
          },
        },
        {
          label: "Mixed",
          icon: <Droplets className="h-4 w-4 text-purple-500" />,
          onClick: () => {
            setSelectedDiaperType("Mixed")
            setShowEntryForm(true)
          },
        },
      ],
    },
    growth: {
      title: "Growth Tracker",
      icon: <Ruler className="h-5 w-5 text-green-500" />,
      description: "Track weight, height, and head circumference",
      chart: <GrowthChart />,
      actions: [
        { label: "Add Weight", icon: <Plus className="h-4 w-4" /> },
        { label: "Add Height", icon: <Plus className="h-4 w-4" /> },
        { label: "Add Head", icon: <Plus className="h-4 w-4" /> },
      ],
    },
    health: {
      title: "Health Tracker",
      icon: <Pill className="h-5 w-5 text-red-500" />,
      description: "Track medications, symptoms, and doctor visits",
      chart: null,
      actions: [
        { label: "Medication", icon: <Pill className="h-4 w-4" /> },
        { label: "Symptom", icon: <Plus className="h-4 w-4" /> },
        { label: "Doctor Visit", icon: <Plus className="h-4 w-4" /> },
        { label: "Vaccine", icon: <Plus className="h-4 w-4" /> },
      ],
    },
  }

  const config = typeConfig[type]

  const handleEntrySubmit = (data: any) => {
    console.log("New entry submitted:", data)
    // Here you would typically update your state or send to an API
    setSelectedFeedingType(null)
    setSelectedDiaperType(null)
  }

  const handleCloseForm = () => {
    setShowEntryForm(false)
    setSelectedFeedingType(null)
    setSelectedDiaperType(null)
  }

  return (
    <div className="space-y-6">
      <Card className="card-hover-effect">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            {config.icon}
            <CardTitle>{config.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CalendarDays className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setSelectedFeedingType(null)
                setSelectedDiaperType(null)
                setShowEntryForm(true)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">{config.description}</CardDescription>

          <div className="flex flex-wrap gap-2 mb-6">
            {config.actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.onClick || (() => setShowEntryForm(true))}
              >
                {action.icon}
                <span className="ml-2">{action.label}</span>
              </Button>
            ))}
          </div>

          <Tabs defaultValue="today">
            <TabsList className="mb-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="animate-float mb-4">
                  <Baby className="h-16 w-16 text-purple-300 dark:text-purple-700" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-gradient">Waiting for Baby's Arrival</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  Your tracking journey will begin when your little one arrives on{" "}
                  {birthDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}. We're
                  excited to help you track every moment!
                </p>
                <div className="mt-6">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="week">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Weekly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="animate-bounce-subtle mb-4">
                      <CalendarDays className="h-12 w-12 text-slate-300 dark:text-slate-700" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-center">
                      Weekly data will appear here after your baby arrives on{" "}
                      {birthDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Monthly Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="animate-pulse-subtle mb-4">
                      <CalendarDays className="h-12 w-12 text-slate-300 dark:text-slate-700" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-center">
                      Monthly data will appear here after your baby arrives on{" "}
                      {birthDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showEntryForm} onOpenChange={setShowEntryForm}>
        <DialogContent className="sm:max-w-[550px] p-0">
          <EntryForm
            type={type}
            feedingType={selectedFeedingType}
            diaperType={selectedDiaperType}
            onClose={handleCloseForm}
            onSubmit={handleEntrySubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
