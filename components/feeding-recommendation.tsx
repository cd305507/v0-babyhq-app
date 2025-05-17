"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Info, Droplet, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MilkItem {
  id: string
  amount: number
  location: string
  timeOfDayLabel: string
  expirationDate: string
}

export function FeedingRecommendation() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string | null>(null)
  const [recommendedMilk, setRecommendedMilk] = useState<MilkItem | null>(null)
  const [availableMilk, setAvailableMilk] = useState<MilkItem[]>([])
  const { toast } = useToast()

  // Sample milk inventory for demonstration
  const milkInventory: MilkItem[] = [
    {
      id: "1",
      amount: 3.5,
      location: "fridge",
      timeOfDayLabel: "Morning Milk",
      expirationDate: "2025-05-19",
    },
    {
      id: "2",
      amount: 4.0,
      location: "fridge",
      timeOfDayLabel: "Afternoon Milk",
      expirationDate: "2025-05-18",
    },
    {
      id: "3",
      amount: 3.0,
      location: "fridge",
      timeOfDayLabel: "Evening Milk",
      expirationDate: "2025-05-19",
    },
    {
      id: "4",
      amount: 2.5,
      location: "fridge",
      timeOfDayLabel: "Night Milk",
      expirationDate: "2025-05-17",
    },
  ]

  // Determine the current time of day
  const getCurrentTimeOfDay = () => {
    const hour = currentTime.getHours()

    if (hour >= 5 && hour < 11) return "Morning Milk"
    if (hour >= 11 && hour < 17) return "Afternoon Milk"
    if (hour >= 17 && hour < 21) return "Evening Milk"
    return "Night Milk"
  }

  // Get emoji for time of day
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

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  // Set default selected time of day based on current time
  useEffect(() => {
    if (!selectedTimeOfDay) {
      setSelectedTimeOfDay(getCurrentTimeOfDay())
    }
  }, [currentTime, selectedTimeOfDay])

  // Find recommended milk based on selected time of day
  useEffect(() => {
    if (selectedTimeOfDay) {
      // Filter available milk by the selected time of day
      const matchingMilk = milkInventory.filter((item) => item.timeOfDayLabel === selectedTimeOfDay)

      if (matchingMilk.length > 0) {
        // Sort by expiration date (oldest first)
        const sorted = [...matchingMilk].sort(
          (a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime(),
        )
        setRecommendedMilk(sorted[0])
      } else {
        setRecommendedMilk(null)
      }

      // Set available milk for this feeding
      setAvailableMilk(milkInventory)
    }
  }, [selectedTimeOfDay])

  const handleUseMilk = (milk: MilkItem) => {
    toast({
      title: "Milk Selected for Feeding",
      description: `${milk.amount} oz of ${milk.timeOfDayLabel} has been selected for feeding.`,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          Feeding Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-500">
              Current time: {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="text-sm font-medium">
            {getTimeOfDayEmoji(getCurrentTimeOfDay())} {getCurrentTimeOfDay()} time
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select feeding time:</label>
          <Select value={selectedTimeOfDay || ""} onValueChange={setSelectedTimeOfDay}>
            <SelectTrigger>
              <SelectValue placeholder="Select time of day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Morning Milk">🌅 Morning Milk (5:00 AM - 11:00 AM)</SelectItem>
              <SelectItem value="Afternoon Milk">☀️ Afternoon Milk (11:00 AM - 5:00 PM)</SelectItem>
              <SelectItem value="Evening Milk">🌇 Evening Milk (5:00 PM - 9:00 PM)</SelectItem>
              <SelectItem value="Night Milk">🌃 Night Milk (9:00 PM - 5:00 AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {recommendedMilk ? (
          <div className="border rounded-md p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">Recommended Milk</div>
                <div className="text-sm text-slate-500">Based on time of day and expiration date</div>
              </div>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Best Match</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  {getTimeOfDayEmoji(recommendedMilk.timeOfDayLabel)}
                </div>
                <div>
                  <div className="font-medium">{recommendedMilk.timeOfDayLabel}</div>
                  <div className="text-sm text-slate-500">
                    Expires: {new Date(recommendedMilk.expirationDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{recommendedMilk.amount} oz</div>
            </div>

            <Button className="w-full" onClick={() => handleUseMilk(recommendedMilk)}>
              Use This Milk
            </Button>
          </div>
        ) : (
          <div className="border border-yellow-200 dark:border-yellow-800 rounded-md p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300">No Matching Milk Available</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  You don't have any {selectedTimeOfDay} in your inventory. Consider using milk from another time of
                  day.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="font-medium">Other Available Milk</div>
          <div className="space-y-2">
            {availableMilk
              .filter((milk) => milk.id !== (recommendedMilk?.id || ""))
              .map((milk) => (
                <div key={milk.id} className="border rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                      {getTimeOfDayEmoji(milk.timeOfDayLabel)}
                    </div>
                    <div>
                      <div className="font-medium">{milk.timeOfDayLabel}</div>
                      <div className="text-sm text-slate-500">
                        Expires: {new Date(milk.expirationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-medium">{milk.amount} oz</div>
                    <Button variant="outline" size="sm" onClick={() => handleUseMilk(milk)}>
                      Use
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-900/20">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300">Why Time of Day Matters</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Breastmilk composition changes throughout the day. Night milk contains melatonin to help baby sleep,
                while morning milk has more cortisol for daytime alertness.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
