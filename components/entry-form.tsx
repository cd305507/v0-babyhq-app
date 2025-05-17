"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Utensils,
  Moon,
  Droplets,
  Droplet,
  TrashIcon as Poop,
  Ruler,
  Pill,
  X,
  Clock,
  AlertCircle,
  Refrigerator,
  Snowflake,
  ThermometerSun,
  FlaskRoundIcon as Flask,
} from "lucide-react"
import { BreastfeedingTimer } from "@/components/breastfeeding-timer"
import { useToast } from "@/hooks/use-toast"
import { useMilkInventory } from "@/contexts/milk-inventory-context"
import { BreastfeedingIcon, BottleFeedingIcon, SolidsIcon, FeedingIcon } from "@/components/feeding-icons"

interface EntryFormProps {
  type: "feeding" | "sleep" | "diaper" | "growth" | "health"
  feedingType?: "Breastfeeding" | "Bottle" | "Solids" | null
  diaperType?: "Wet" | "Dirty" | "Mixed" | null
  onClose: () => void
  onSubmit: (data: any) => void
}

export function EntryForm({ type, feedingType = null, diaperType = null, onClose, onSubmit }: EntryFormProps) {
  const [activeParent, setActiveParent] = useState<"carolyn" | "olivia">("carolyn")
  const [selectedFeedingType, setSelectedFeedingType] = useState<string | null>(feedingType)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [breastfeedingSide, setBreastfeedingSide] = useState("Left")
  const [recordingMode, setRecordingMode] = useState<"timer" | "manual">("timer")
  const [milkSource, setMilkSource] = useState<"fridge" | "freezer" | "room" | "formula">("fridge")
  const [bottleAmount, setBottleAmount] = useState<number>(0)
  const [manualOverride, setManualOverride] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<"auto" | "morning" | "evening">("auto")
  const { toast } = useToast()
  const [selectedDiaperType, setSelectedDiaperType] = useState<string | null>(diaperType)

  // Get the milk inventory context
  const { inventory, updateInventory, getAvailableMilk } = useMilkInventory()

  // Determine current time period (morning or evening)
  const getCurrentTimePeriod = () => {
    const now = new Date()
    const hour = now.getHours()
    return hour >= 4 && hour < 16 ? "morning" : "evening"
  }

  // Get available milk for the selected source and time period
  const getAvailableMilkForSource = () => {
    if (milkSource === "formula") return Number.POSITIVE_INFINITY

    const timePeriod = selectedBatch === "auto" ? getCurrentTimePeriod() : selectedBatch
    return getAvailableMilk(milkSource, timePeriod)
  }

  const availableMilk = getAvailableMilkForSource()
  const isLowInventory = availableMilk < bottleAmount && milkSource !== "formula"

  // Update the feeding type when the prop changes and set parent accordingly
  useEffect(() => {
    if (feedingType) {
      setSelectedFeedingType(feedingType)

      // Auto-select Olivia for breastfeeding entries
      if (feedingType === "Breastfeeding") {
        setActiveParent("olivia")
      }
    }
  }, [feedingType])

  // Update the diaper type when the prop changes
  useEffect(() => {
    if (diaperType) {
      setSelectedDiaperType(diaperType)
    }
  }, [diaperType])

  // Get feeding-specific fields based on the selected type
  const getFeedingFields = () => {
    if (selectedFeedingType === "Breastfeeding") {
      return [
        {
          name: "recordingMode",
          label: "Recording Mode",
          type: "tabs",
          options: ["timer", "manual"],
        },
        ...(recordingMode === "manual"
          ? [
              {
                name: "side",
                label: "Side",
                type: "select",
                options: ["Left", "Right", "Both"],
              },
              {
                name: "duration",
                label: "Duration (minutes)",
                type: "input",
                placeholder: "e.g., 15",
              },
            ]
          : []),
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ]
    } else if (selectedFeedingType === "Bottle") {
      return [
        { name: "amount", label: "Amount (oz)", type: "input", placeholder: "e.g., 3 oz" },
        {
          name: "milkType",
          label: "Milk Type",
          type: "select",
          options: ["Breast Milk", "Formula", "Mixed"],
        },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ]
    } else if (selectedFeedingType === "Solids") {
      return [
        {
          name: "foodType",
          label: "Food Type",
          type: "select",
          options: ["Puree", "Finger Food", "Table Food", "Snack"],
        },
        { name: "foods", label: "Foods", type: "input", placeholder: "e.g., Banana, Avocado" },
        { name: "amount", label: "Amount", type: "input", placeholder: "e.g., 2 tbsp" },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ]
    } else {
      // Default fields if no feeding type is selected
      return [
        { name: "feedingType", label: "Feeding Type", type: "select", options: ["Breastfeeding", "Bottle", "Solids"] },
        { name: "amount", label: "Amount", type: "input", placeholder: "e.g., 3 oz or 15 min" },
        { name: "side", label: "Side (if applicable)", type: "select", options: ["Left", "Right", "Both", "N/A"] },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ]
    }
  }

  const typeConfig = {
    feeding: {
      title: selectedFeedingType ? `Add ${selectedFeedingType} Entry` : "Add Feeding Entry",
      icon: selectedFeedingType ? (
        <FeedingIcon type={selectedFeedingType} className="h-5 w-5" />
      ) : (
        <Utensils className="h-5 w-5 text-purple-500" />
      ),
      fields: selectedFeedingType
        ? getFeedingFields()
        : [
            {
              name: "feedingType",
              label: "Feeding Type",
              type: "select",
              options: ["Breastfeeding", "Bottle", "Solids"],
              onChange: (value: string) => setSelectedFeedingType(value),
            },
            ...(selectedFeedingType ? getFeedingFields() : []),
          ],
    },
    sleep: {
      title: "Add Sleep Entry",
      icon: <Moon className="h-5 w-5 text-indigo-500" />,
      fields: [
        { name: "sleepType", label: "Sleep Type", type: "select", options: ["Nap", "Night Sleep"] },
        { name: "startTime", label: "Start Time", type: "time", defaultValue: new Date().toTimeString().slice(0, 5) },
        { name: "endTime", label: "End Time", type: "time", defaultValue: new Date().toTimeString().slice(0, 5) },
        { name: "location", label: "Location", type: "select", options: ["Crib", "Bassinet", "Parent's Bed", "Other"] },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ],
    },
    diaper: {
      title: "Add Diaper Entry",
      icon:
        selectedDiaperType === "Wet" ? (
          <Droplet className="h-5 w-5 text-blue-500" />
        ) : selectedDiaperType === "Dirty" ? (
          <Poop className="h-5 w-5 text-amber-700" />
        ) : selectedDiaperType === "Mixed" ? (
          <Droplets className="h-5 w-5 text-purple-500" />
        ) : (
          <Droplets className="h-5 w-5 text-blue-500" />
        ),
      fields: [
        {
          name: "diaperType",
          label: "Diaper Type",
          type: "select",
          options: ["Wet", "Dirty", "Mixed"],
          defaultValue: selectedDiaperType || undefined,
        },
        { name: "time", label: "Time", type: "time", defaultValue: new Date().toTimeString().slice(0, 5) },
        {
          name: "consistency",
          label: "Consistency (if applicable)",
          type: "select",
          options: ["Normal", "Loose", "Hard", "N/A"],
          defaultValue: selectedDiaperType === "Wet" ? "N/A" : undefined,
        },
        {
          name: "color",
          label: "Color (if applicable)",
          type: "select",
          options: ["Yellow", "Green", "Brown", "Black", "Other", "N/A"],
          defaultValue: selectedDiaperType === "Wet" ? "N/A" : undefined,
        },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ],
    },
    growth: {
      title: "Add Growth Entry",
      icon: <Ruler className="h-5 w-5 text-green-500" />,
      fields: [
        {
          name: "measurementType",
          label: "Measurement Type",
          type: "select",
          options: ["Weight", "Height", "Head Circumference"],
        },
        { name: "value", label: "Value", type: "input", placeholder: "e.g., 12.5 lbs or 23.5 in" },
        { name: "date", label: "Date", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
        { name: "location", label: "Location", type: "select", options: ["Home", "Doctor's Office", "Other"] },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ],
    },
    health: {
      title: "Add Health Entry",
      icon: <Pill className="h-5 w-5 text-red-500" />,
      fields: [
        {
          name: "healthType",
          label: "Entry Type",
          type: "select",
          options: ["Medication", "Symptom", "Doctor Visit", "Vaccine"],
        },
        { name: "name", label: "Name", type: "input", placeholder: "e.g., Tylenol or Fever" },
        { name: "time", label: "Time", type: "time", defaultValue: new Date().toTimeString().slice(0, 5) },
        { name: "dosage", label: "Dosage (if applicable)", type: "input", placeholder: "e.g., 2.5 ml" },
        { name: "notes", label: "Notes", type: "textarea", placeholder: "Any additional notes..." },
      ],
    },
  }

  const config = typeConfig[type]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())

    // Add parent information
    const parentInfo =
      activeParent === "carolyn"
        ? { name: "Carolyn", role: "Mommy", avatar: "/placeholder.svg?height=32&width=32", initials: "CB" }
        : { name: "Olivia", role: "Mama", avatar: "/placeholder.svg?height=32&width=32", initials: "OB" }

    // Add breastfeeding timer data if using timer mode
    if (type === "feeding" && selectedFeedingType === "Breastfeeding" && recordingMode === "timer") {
      data.side = breastfeedingSide
      data.duration = Math.round(timerSeconds / 60).toString()
    }

    // Handle bottle feeding and milk inventory sync
    if (type === "feeding" && selectedFeedingType === "Bottle" && milkSource !== "formula") {
      const amount = Number.parseFloat(data.amount as string) || bottleAmount

      // Determine which batch to use
      const timePeriod = selectedBatch === "auto" ? getCurrentTimePeriod() : selectedBatch

      // Check if there's enough milk
      if (getAvailableMilk(milkSource, timePeriod) < amount && !manualOverride) {
        toast({
          title: "Not enough milk",
          description: `There's not enough milk in the ${timePeriod} ${milkSource} stash. Please select a different source or use manual override.`,
          variant: "destructive",
        })
        return
      }

      // Update inventory
      updateInventory(milkSource, timePeriod, -amount)

      // Add milk source and batch info to the data
      data.milkSource = milkSource
      data.milkBatch = timePeriod
    }

    onSubmit({
      ...data,
      feedingType: selectedFeedingType || data.feedingType,
      parent: parentInfo,
      timestamp: data.timestamp || new Date().toISOString(),
    })

    onClose()
  }

  const handleFeedingTypeChange = (value: string) => {
    setSelectedFeedingType(value)

    // Auto-select Olivia for breastfeeding
    if (value === "Breastfeeding") {
      setActiveParent("olivia")
    }
  }

  const handleTimerUpdate = (seconds: number) => {
    setTimerSeconds(seconds)
  }

  const handleSideChange = (side: string) => {
    setBreastfeedingSide(side)
  }

  const handleBottleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBottleAmount(Number.parseFloat(e.target.value) || 0)
  }

  // Get icon for milk source
  const getMilkSourceIcon = (source: string) => {
    switch (source) {
      case "fridge":
        return <Refrigerator className="h-4 w-4 mr-2" />
      case "freezer":
        return <Snowflake className="h-4 w-4 mr-2" />
      case "room":
        return <ThermometerSun className="h-4 w-4 mr-2" />
      case "formula":
        return <Flask className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          {config.icon}
          {config.title}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form id="entryForm" onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="text-sm font-medium">Recording as:</div>
            <div className="flex gap-3">
              <button
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  activeParent === "carolyn"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
                onClick={() => setActiveParent("carolyn")}
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Carolyn" />
                  <AvatarFallback className="text-[10px]">CB</AvatarFallback>
                </Avatar>
                <span>Carolyn (Mommy)</span>
              </button>

              <button
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                  activeParent === "olivia"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
                onClick={() => setActiveParent("olivia")}
              >
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Olivia" />
                  <AvatarFallback className="text-[10px]">OB</AvatarFallback>
                </Avatar>
                <span>Olivia (Mama)</span>
              </button>
            </div>
          </div>

          {/* Special case for feeding type selection */}
          {type === "feeding" && !selectedFeedingType && (
            <div className="space-y-2">
              <Label htmlFor="feedingType">Feeding Type</Label>
              <Select name="feedingType" onValueChange={handleFeedingTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feeding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Breastfeeding">
                    <div className="flex items-center">
                      <BreastfeedingIcon className="h-4 w-4 mr-2" />
                      <span>Breastfeeding</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Bottle">
                    <div className="flex items-center">
                      <BottleFeedingIcon className="h-4 w-4 mr-2" />
                      <span>Bottle</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Solids">
                    <div className="flex items-center">
                      <SolidsIcon className="h-4 w-4 mr-2" />
                      <span>Solids</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Special case for breastfeeding timer */}
          {type === "feeding" && selectedFeedingType === "Breastfeeding" && (
            <div className="space-y-2">
              <Label>Recording Mode</Label>
              <Tabs value={recordingMode} onValueChange={(value) => setRecordingMode(value as "timer" | "manual")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timer">
                    <Clock className="h-4 w-4 mr-2" />
                    Timer
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    <Utensils className="h-4 w-4 mr-2" />
                    Manual
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="timer" className="pt-4">
                  <BreastfeedingTimer
                    onTimeUpdate={handleTimerUpdate}
                    onSideChange={handleSideChange}
                    initialSide={breastfeedingSide}
                  />
                  <input type="hidden" name="timerSeconds" value={timerSeconds} />
                </TabsContent>
                <TabsContent value="manual">
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="side">Side</Label>
                      <Select name="side" defaultValue="Left">
                        <SelectTrigger>
                          <SelectValue placeholder="Select side" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Left">Left</SelectItem>
                          <SelectItem value="Right">Right</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input id="duration" name="duration" placeholder="e.g., 15" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Bottle feeding with milk source selection */}
          {type === "feeding" && selectedFeedingType === "Bottle" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (oz)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="e.g., 3 oz"
                  value={bottleAmount || ""}
                  onChange={handleBottleAmountChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="milkSource">Milk Source</Label>
                <Select
                  name="milkSource"
                  value={milkSource}
                  onValueChange={(value: "fridge" | "freezer" | "room" | "formula") => setMilkSource(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select milk source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fridge">
                      <div className="flex items-center">
                        <Refrigerator className="h-4 w-4 mr-2" />
                        <span>Fridge</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="freezer">
                      <div className="flex items-center">
                        <Snowflake className="h-4 w-4 mr-2" />
                        <span>Freezer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="room">
                      <div className="flex items-center">
                        <ThermometerSun className="h-4 w-4 mr-2" />
                        <span>Room Temperature</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="formula">
                      <div className="flex items-center">
                        <Flask className="h-4 w-4 mr-2" />
                        <span>Formula</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Only show batch selection for breast milk sources */}
              {milkSource !== "formula" && (
                <>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manualOverride">Manual Batch Selection</Label>
                    <Switch id="manualOverride" checked={manualOverride} onCheckedChange={setManualOverride} />
                  </div>

                  {manualOverride && (
                    <div className="space-y-2">
                      <Label htmlFor="selectedBatch">Milk Batch</Label>
                      <Select
                        name="selectedBatch"
                        value={selectedBatch}
                        onValueChange={(value: "auto" | "morning" | "evening") => setSelectedBatch(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select milk batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto (Based on Time)</SelectItem>
                          <SelectItem value="morning">Morning Milk (4:00 AM - 3:59 PM)</SelectItem>
                          <SelectItem value="evening">Evening Milk (4:00 PM - 3:59 AM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Inventory status */}
                  <div
                    className={`p-3 rounded-md ${
                      isLowInventory
                        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        : "bg-blue-50 dark:bg-blue-900/20"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {isLowInventory ? (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        getMilkSourceIcon(milkSource)
                      )}
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            isLowInventory ? "text-red-800 dark:text-red-300" : "text-blue-800 dark:text-blue-300"
                          }`}
                        >
                          {isLowInventory ? "Not enough milk in inventory" : "Available Milk"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {isLowInventory
                            ? `Only ${availableMilk.toFixed(1)} oz available in the ${
                                selectedBatch === "auto" ? getCurrentTimePeriod() : selectedBatch
                              } ${milkSource} stash.`
                            : `${availableMilk.toFixed(1)} oz available in the ${
                                selectedBatch === "auto" ? getCurrentTimePeriod() : selectedBatch
                              } ${milkSource} stash.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Solids feeding */}
          {type === "feeding" && selectedFeedingType === "Solids" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="foodType">Food Type</Label>
                <Select name="foodType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Puree">Puree</SelectItem>
                    <SelectItem value="Finger Food">Finger Food</SelectItem>
                    <SelectItem value="Table Food">Table Food</SelectItem>
                    <SelectItem value="Snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="foods">Foods</Label>
                <Input id="foods" name="foods" placeholder="e.g., Banana, Avocado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" name="amount" placeholder="e.g., 2 tbsp" />
              </div>
            </>
          )}

          {/* For non-feeding types or for notes in all types */}
          {(type !== "feeding" || selectedFeedingType) && (
            <>
              {type !== "feeding" &&
                config.fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>

                    {field.type === "input" && (
                      <Input id={field.name} name={field.name} placeholder={field.placeholder} />
                    )}

                    {field.type === "textarea" && (
                      <Textarea id={field.name} name={field.name} placeholder={field.placeholder} />
                    )}

                    {field.type === "select" && (
                      <Select name={field.name} defaultValue={field.defaultValue}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option, i) => (
                            <SelectItem key={i} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {field.type === "time" && (
                      <Input id={field.name} name={field.name} type="time" defaultValue={field.defaultValue} />
                    )}

                    {field.type === "date" && (
                      <Input id={field.name} name={field.name} type="date" defaultValue={field.defaultValue} />
                    )}
                  </div>
                ))}
            </>
          )}

          {/* Notes field for all feeding types */}
          {type === "feeding" && selectedFeedingType && (
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" placeholder="Any additional notes..." />
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Switch id="notify" name="notify" defaultChecked />
            <Label htmlFor="notify">Notify other mom</Label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" form="entryForm" disabled={isLowInventory && !manualOverride && milkSource !== "formula"}>
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  )
}
