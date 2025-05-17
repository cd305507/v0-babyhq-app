"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Utensils, Moon, Droplets, Ruler, Pill, Clock, Timer, Baby, Milk } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

type EntryType = "feeding" | "sleep" | "diaper" | "growth" | "health"
type EntrySubType = string
type FrequentEntry = {
  type: EntryType
  subType: EntrySubType
  icon: React.ReactNode
  label: string
  color: string
  count: number
}

interface QuickEntryMenuProps {
  onEntryComplete?: (type: EntryType, subType: EntrySubType, data: any) => void
}

export function QuickEntryMenu({ onEntryComplete }: QuickEntryMenuProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<EntryType>("feeding")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // This would normally be stored in a database and updated over time
  // For demo purposes, we're using local state
  const [frequentEntries, setFrequentEntries] = useState<FrequentEntry[]>([
    {
      type: "feeding",
      subType: "breastfeeding-left",
      icon: <Baby className="h-4 w-4" />,
      label: "Breastfeeding (Left)",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      count: 15,
    },
    {
      type: "diaper",
      subType: "wet",
      icon: <Droplets className="h-4 w-4" />,
      label: "Wet Diaper",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      count: 12,
    },
    {
      type: "sleep",
      subType: "nap",
      icon: <Moon className="h-4 w-4" />,
      label: "Nap",
      color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      count: 8,
    },
    {
      type: "feeding",
      subType: "bottle",
      icon: <Milk className="h-4 w-4" />,
      label: "Bottle (3oz)",
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
      count: 6,
    },
    {
      type: "diaper",
      subType: "dirty",
      icon: <Droplets className="h-4 w-4" />,
      label: "Dirty Diaper",
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      count: 5,
    },
  ])

  const entryTypes = [
    { type: "feeding" as EntryType, icon: <Utensils className="h-4 w-4" />, label: "Feeding" },
    { type: "sleep" as EntryType, icon: <Moon className="h-4 w-4" />, label: "Sleep" },
    { type: "diaper" as EntryType, icon: <Droplets className="h-4 w-4" />, label: "Diaper" },
    { type: "growth" as EntryType, icon: <Ruler className="h-4 w-4" />, label: "Growth" },
    { type: "health" as EntryType, icon: <Pill className="h-4 w-4" />, label: "Health" },
  ]

  const quickOptions = {
    feeding: [
      { subType: "breastfeeding-left", label: "Breastfeeding (Left)", icon: <Baby className="h-4 w-4" /> },
      { subType: "breastfeeding-right", label: "Breastfeeding (Right)", icon: <Baby className="h-4 w-4" /> },
      { subType: "breastfeeding-both", label: "Breastfeeding (Both)", icon: <Baby className="h-4 w-4" /> },
      { subType: "bottle-formula", label: "Bottle (Formula)", icon: <Milk className="h-4 w-4" /> },
      { subType: "bottle-breastmilk", label: "Bottle (Breastmilk)", icon: <Milk className="h-4 w-4" /> },
      { subType: "solids", label: "Solid Food", icon: <Utensils className="h-4 w-4" /> },
    ],
    sleep: [
      { subType: "nap-start", label: "Start Nap", icon: <Moon className="h-4 w-4" /> },
      { subType: "nap-end", label: "End Nap", icon: <Clock className="h-4 w-4" /> },
      { subType: "night-start", label: "Start Night Sleep", icon: <Moon className="h-4 w-4" /> },
      { subType: "night-end", label: "Morning Wake-up", icon: <Clock className="h-4 w-4" /> },
    ],
    diaper: [
      { subType: "wet", label: "Wet Diaper", icon: <Droplets className="h-4 w-4" /> },
      { subType: "dirty", label: "Dirty Diaper", icon: <Droplets className="h-4 w-4" /> },
      { subType: "mixed", label: "Mixed Diaper", icon: <Droplets className="h-4 w-4" /> },
    ],
    growth: [
      { subType: "weight", label: "Weight", icon: <Ruler className="h-4 w-4" /> },
      { subType: "height", label: "Height", icon: <Ruler className="h-4 w-4" /> },
      { subType: "head", label: "Head Circumference", icon: <Ruler className="h-4 w-4" /> },
    ],
    health: [
      { subType: "temperature", label: "Temperature", icon: <Pill className="h-4 w-4" /> },
      { subType: "medication", label: "Medication", icon: <Pill className="h-4 w-4" /> },
      { subType: "symptom", label: "Symptom", icon: <Pill className="h-4 w-4" /> },
    ],
  }

  const handleQuickEntry = (type: EntryType, subType: EntrySubType) => {
    setLoading(true)

    // Simulate API call or data processing
    setTimeout(() => {
      // Update frequency count (in a real app, this would be in a database)
      const updatedEntries = [...frequentEntries]
      const existingEntryIndex = updatedEntries.findIndex((entry) => entry.type === type && entry.subType === subType)

      if (existingEntryIndex >= 0) {
        // Increment count for existing entry
        updatedEntries[existingEntryIndex].count += 1
      } else {
        // Add new entry to frequent list
        const newEntry = {
          type,
          subType,
          icon: quickOptions[type].find((opt) => opt.subType === subType)?.icon || <Plus className="h-4 w-4" />,
          label: quickOptions[type].find((opt) => opt.subType === subType)?.label || subType,
          color: getColorForType(type),
          count: 1,
        }
        updatedEntries.push(newEntry)
      }

      // Sort by count
      updatedEntries.sort((a, b) => b.count - a.count)

      // Update state
      setFrequentEntries(updatedEntries)

      // Call the callback
      if (onEntryComplete) {
        onEntryComplete(type, subType, { timestamp: new Date().toISOString() })
      }

      // Show success toast
      toast({
        title: "Entry added",
        description: `${quickOptions[type].find((opt) => opt.subType === subType)?.label || subType} recorded at ${new Date().toLocaleTimeString()}`,
      })

      setLoading(false)
      setOpen(false)
    }, 500)
  }

  const getColorForType = (type: EntryType): string => {
    switch (type) {
      case "feeding":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "sleep":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
      case "diaper":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "growth":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "health":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300"
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-lg">Quick Entry</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Add an entry with minimal effort</p>
          </div>

          {/* Frequent entries section */}
          {frequentEntries.length > 0 && (
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Timer className="h-4 w-4 text-slate-500" />
                Frequently Used
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {frequentEntries.slice(0, 4).map((entry, index) => (
                  <Button
                    key={`${entry.type}-${entry.subType}`}
                    variant="outline"
                    className={cn("h-auto py-3 px-3 justify-start font-normal text-left", entry.color)}
                    onClick={() => handleQuickEntry(entry.type, entry.subType)}
                    disabled={loading}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="flex items-center gap-2">
                        {entry.icon}
                        {entry.label}
                      </span>
                      <span className="text-xs opacity-70">
                        {entry.count} {entry.count === 1 ? "time" : "times"}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* All options */}
          <div className="p-4">
            <Tabs defaultValue="feeding" value={activeTab} onValueChange={(value) => setActiveTab(value as EntryType)}>
              <TabsList className="grid grid-cols-5 mb-4">
                {entryTypes.map((entry) => (
                  <TabsTrigger key={entry.type} value={entry.type} className="flex flex-col py-2 px-1 h-auto">
                    {entry.icon}
                    <span className="text-[10px] mt-1">{entry.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 gap-2">
                {quickOptions[activeTab].map((option) => (
                  <Button
                    key={option.subType}
                    variant="outline"
                    className={cn("justify-start h-auto py-3", getColorForType(activeTab))}
                    onClick={() => handleQuickEntry(activeTab, option.subType)}
                    disabled={loading}
                  >
                    <div className="flex items-center gap-2">
                      {option.icon}
                      <span>{option.label}</span>
                    </div>
                    {loading && <span className="ml-auto animate-spin">⏳</span>}
                  </Button>
                ))}
              </div>
            </Tabs>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
