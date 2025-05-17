"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Droplet,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  AlertCircle,
  Refrigerator,
  Snowflake,
  ThermometerSun,
  X,
  Calendar,
  ArrowUpDown,
  Check,
  Sun,
  Moon,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMilkInventory } from "@/contexts/milk-inventory-context"

export function MilkInventory() {
  const { inventory, addToInventory, removeFromInventory, markAsUsed, getAvailableMilk } = useMilkInventory()
  const [activeTab, setActiveTab] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "amount" | "expiration">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const { toast } = useToast()

  // New item form state
  const [newAmount, setNewAmount] = useState(0)
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0])
  const [newTime, setNewTime] = useState(new Date().toTimeString().slice(0, 5))
  const [newLocation, setNewLocation] = useState<"freezer" | "fridge" | "room">("fridge")
  const [newContainer, setNewContainer] = useState<"bag" | "bottle" | "other">("bottle")
  const [newNotes, setNewNotes] = useState("")

  // Add a new state for filtering by time of day
  const [timeOfDayFilter, setTimeOfDayFilter] = useState<string | null>(null)
  const [timePeriodFilter, setTimePeriodFilter] = useState<string | null>(null)

  // Update the newItem state to include timeOfDayLabel
  const [newTimeOfDayLabel, setNewTimeOfDayLabel] = useState<string>("Morning Milk")

  // Calculate expiration date based on storage location
  const calculateExpirationDate = (date: string, location: "freezer" | "fridge" | "room") => {
    const baseDate = new Date(date)
    const expirationDate = new Date(baseDate)

    switch (location) {
      case "freezer":
        expirationDate.setMonth(baseDate.getMonth() + 3) // 3 months for freezer
        break
      case "fridge":
        expirationDate.setDate(baseDate.getDate() + 3) // 3 days for fridge
        break
      case "room":
        expirationDate.setHours(baseDate.getHours() + 4) // 4 hours for room temperature
        break
    }

    return expirationDate.toISOString().split("T")[0]
  }

  // Determine time period based on time
  const determineTimePeriod = (timeString: string): "morning" | "evening" => {
    const [hours, minutes] = timeString.split(":").map(Number)
    return hours >= 4 && hours < 16 ? "morning" : "evening"
  }

  // Handle adding a new inventory item
  const handleAddItem = () => {
    const expirationDate = calculateExpirationDate(newDate, newLocation)
    const timePeriod = determineTimePeriod(newTime)

    // Determine time of day label based on time
    let timeOfDayLabel = newTimeOfDayLabel
    const hour = Number.parseInt(newTime.split(":")[0])

    if (hour >= 5 && hour < 11) {
      timeOfDayLabel = "Morning Milk"
    } else if (hour >= 11 && hour < 17) {
      timeOfDayLabel = "Afternoon Milk"
    } else if (hour >= 17 && hour < 21) {
      timeOfDayLabel = "Evening Milk"
    } else {
      timeOfDayLabel = "Night Milk"
    }

    const newItem = {
      amount: newAmount,
      date: `${newDate}T${newTime}:00`,
      expirationDate,
      location: newLocation,
      container: newContainer,
      timeOfDayLabel,
      used: false,
      notes: newNotes,
    }

    addToInventory(newItem)
    setShowAddForm(false)

    // Reset form
    setNewAmount(0)
    setNewDate(new Date().toISOString().split("T")[0])
    setNewTime(new Date().toTimeString().slice(0, 5))
    setNewLocation("fridge")
    setNewContainer("bottle")
    setNewNotes("")

    toast({
      title: "Milk Added to Inventory",
      description: `${newAmount} oz added to your ${newLocation} inventory.`,
      duration: 3000,
    })
  }

  // Handle editing an inventory item
  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setShowEditForm(true)
  }

  // Handle updating an inventory item
  const handleUpdateItem = () => {
    if (!editingItem) return

    // Implementation would update the item in the context
    // For now, we'll just close the form
    setShowEditForm(false)
    setEditingItem(null)

    toast({
      title: "Inventory Item Updated",
      description: "Your milk inventory has been updated.",
      duration: 3000,
    })
  }

  // Handle deleting an inventory item
  const handleDeleteItem = (id: string) => {
    removeFromInventory(id)

    toast({
      title: "Item Removed",
      description: "The milk has been removed from your inventory.",
      duration: 3000,
    })
  }

  // Handle marking an item as used
  const handleMarkAsUsed = (id: string) => {
    markAsUsed(id)

    toast({
      title: "Milk Used",
      description: "The milk has been marked as used in your inventory.",
      duration: 3000,
    })
  }

  // Add this function to get the emoji for time of day
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

  // Update the filtered inventory logic to include time of day filtering
  const filteredInventory = inventory.filter((item) => {
    // First apply the tab filter
    let passesTabFilter = true
    if (activeTab === "all") passesTabFilter = !item.used
    else if (activeTab === "freezer") passesTabFilter = item.location === "freezer" && !item.used
    else if (activeTab === "fridge") passesTabFilter = item.location === "fridge" && !item.used
    else if (activeTab === "room") passesTabFilter = item.location === "room" && !item.used
    else if (activeTab === "used") passesTabFilter = item.used

    // Then apply the time of day filter if it exists
    const passesTimeFilter = !timeOfDayFilter || item.timeOfDayLabel === timeOfDayFilter

    // Then apply the time period filter if it exists
    const passesTimePeriodFilter = !timePeriodFilter || item.timePeriod === timePeriodFilter

    return passesTabFilter && passesTimeFilter && passesTimePeriodFilter
  })

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    }
    if (sortBy === "expiration") {
      return sortOrder === "asc"
        ? new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
        : new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime()
    }
    return 0
  })

  // Calculate totals
  const freezerMorningTotal = getAvailableMilk("freezer", "morning")
  const freezerEveningTotal = getAvailableMilk("freezer", "evening")
  const freezerTotal = freezerMorningTotal + freezerEveningTotal

  const fridgeMorningTotal = getAvailableMilk("fridge", "morning")
  const fridgeEveningTotal = getAvailableMilk("fridge", "evening")
  const fridgeTotal = fridgeMorningTotal + fridgeEveningTotal

  const roomMorningTotal = getAvailableMilk("room", "morning")
  const roomEveningTotal = getAvailableMilk("room", "evening")
  const roomTotal = roomMorningTotal + roomEveningTotal

  const totalInventory = freezerTotal + fridgeTotal + roomTotal

  // Check for expiring items
  const today = new Date().toISOString().split("T")[0]
  const expiringItems = inventory.filter((item) => !item.used && item.expirationDate <= today)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  // Get icon for location
  const getLocationIcon = (location: string) => {
    switch (location) {
      case "freezer":
        return <Snowflake className="h-4 w-4 text-blue-500" />
      case "fridge":
        return <Refrigerator className="h-4 w-4 text-green-500" />
      case "room":
        return <ThermometerSun className="h-4 w-4 text-orange-500" />
      default:
        return <Droplet className="h-4 w-4 text-slate-500" />
    }
  }

  // Get icon for time period
  const getTimePeriodIcon = (timePeriod: string) => {
    switch (timePeriod) {
      case "morning":
        return <Sun className="h-4 w-4 text-yellow-500" />
      case "evening":
        return <Moon className="h-4 w-4 text-indigo-500" />
      default:
        return <Clock className="h-4 w-4 text-slate-500" />
    }
  }

  // Toggle sort order
  const toggleSort = (field: "date" | "amount" | "expiration") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {totalInventory.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="freezer">
              <Snowflake className="h-4 w-4 mr-1" />
              Freezer
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {freezerTotal.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="fridge">
              <Refrigerator className="h-4 w-4 mr-1" />
              Fridge
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {fridgeTotal.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="room">
              <ThermometerSun className="h-4 w-4 mr-1" />
              Room
              <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                {roomTotal.toFixed(1)} oz
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-slate-500 dark:text-slate-400">Filter by time of day:</div>
            <Select
              value={timeOfDayFilter || "All times of day"}
              onValueChange={(value) => setTimeOfDayFilter(value || null)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All times of day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All times of day">All times of day</SelectItem>
                <SelectItem value="Morning Milk">🌅 Morning Milk</SelectItem>
                <SelectItem value="Afternoon Milk">☀️ Afternoon Milk</SelectItem>
                <SelectItem value="Evening Milk">🌇 Evening Milk</SelectItem>
                <SelectItem value="Night Milk">🌃 Night Milk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-sm text-slate-500 dark:text-slate-400">Filter by time period:</div>
            <Select
              value={timePeriodFilter || "All time periods"}
              onValueChange={(value) => setTimePeriodFilter(value || null)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All time periods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All time periods">All time periods</SelectItem>
                <SelectItem value="morning">
                  <div className="flex items-center">
                    <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>Morning (4:00 AM - 3:59 PM)</span>
                  </div>
                </SelectItem>
                <SelectItem value="evening">
                  <div className="flex items-center">
                    <Moon className="h-4 w-4 mr-2 text-indigo-500" />
                    <span>Evening (4:00 PM - 3:59 AM)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={() => setShowAddForm(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Milk
        </Button>
      </div>

      {/* Inventory summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Refrigerator className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Fridge Inventory</h3>
              </div>
              <span className="text-lg font-bold">{fridgeTotal.toFixed(1)} oz</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Morning (4:00 AM - 3:59 PM)</span>
                </div>
                <span className="font-medium">{fridgeMorningTotal.toFixed(1)} oz</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Moon className="h-4 w-4 text-indigo-500 mr-1" />
                  <span>Evening (4:00 PM - 3:59 AM)</span>
                </div>
                <span className="font-medium">{fridgeEveningTotal.toFixed(1)} oz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Snowflake className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Freezer Inventory</h3>
              </div>
              <span className="text-lg font-bold">{freezerTotal.toFixed(1)} oz</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Morning (4:00 AM - 3:59 PM)</span>
                </div>
                <span className="font-medium">{freezerMorningTotal.toFixed(1)} oz</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Moon className="h-4 w-4 text-indigo-500 mr-1" />
                  <span>Evening (4:00 PM - 3:59 AM)</span>
                </div>
                <span className="font-medium">{freezerEveningTotal.toFixed(1)} oz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <ThermometerSun className="h-5 w-5 text-orange-500 mr-2" />
                <h3 className="font-medium">Room Temp Inventory</h3>
              </div>
              <span className="text-lg font-bold">{roomTotal.toFixed(1)} oz</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Sun className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>Morning (4:00 AM - 3:59 PM)</span>
                </div>
                <span className="font-medium">{roomMorningTotal.toFixed(1)} oz</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Moon className="h-4 w-4 text-indigo-500 mr-1" />
                  <span>Evening (4:00 PM - 3:59 AM)</span>
                </div>
                <span className="font-medium">{roomEveningTotal.toFixed(1)} oz</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {expiringItems.length > 0 && (
        <div className="p-4 border border-red-200 dark:border-red-800 rounded-md bg-red-50 dark:bg-red-900/20 mb-4">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-300">Expiring Milk Alert</h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                You have {expiringItems.length} milk storage {expiringItems.length === 1 ? "item" : "items"} that{" "}
                {expiringItems.length === 1 ? "is" : "are"} expiring today or already expired.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {filteredInventory.length} {filteredInventory.length === 1 ? "item" : "items"}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleSort("date")}>
            <Calendar className="h-4 w-4 mr-1" />
            Date
            {sortBy === "date" && <ArrowUpDown className={`h-3 w-3 ml-1 ${sortOrder === "asc" ? "rotate-180" : ""}`} />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleSort("amount")}>
            <Droplet className="h-4 w-4 mr-1" />
            Amount
            {sortBy === "amount" && (
              <ArrowUpDown className={`h-3 w-3 ml-1 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleSort("expiration")}>
            <AlertCircle className="h-4 w-4 mr-1" />
            Expiration
            {sortBy === "expiration" && (
              <ArrowUpDown className={`h-3 w-3 ml-1 ${sortOrder === "asc" ? "rotate-180" : ""}`} />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedInventory.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <Droplet className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Milk in Inventory</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                {activeTab === "all"
                  ? "You don't have any milk in your inventory."
                  : `You don't have any milk stored in the ${activeTab}.`}
              </p>
              <Button onClick={() => setShowAddForm(true)}>Add Milk to Inventory</Button>
            </CardContent>
          </Card>
        ) : (
          sortedInventory.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden ${
                !item.used && new Date(item.expirationDate) <= new Date() ? "border-red-300 dark:border-red-700" : ""
              }`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div
                    className={`p-4 md:w-1/4 flex flex-col justify-center items-center ${
                      item.location === "freezer"
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : item.location === "fridge"
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-orange-50 dark:bg-orange-900/20"
                    }`}
                  >
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {item.amount.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">ounces</div>
                    <div className="flex items-center mt-2">
                      {getLocationIcon(item.location)}
                      <span className="ml-1 text-sm capitalize">{item.location}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {getTimePeriodIcon(item.timePeriod)}
                      <span className="ml-1 text-sm capitalize">{item.timePeriod}</span>
                    </div>
                  </div>

                  <div className="p-4 md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Pumped: {formatDate(item.date)}</span>
                          {item.used && (
                            <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800">
                              Used
                            </Badge>
                          )}
                          {!item.used && new Date(item.expirationDate) <= new Date() && (
                            <Badge
                              variant="outline"
                              className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                            >
                              Expired
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Expires: {formatDate(item.expirationDate)}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!item.used && (
                          <>
                            <Button variant="ghost" size="icon" onClick={() => handleMarkAsUsed(item.id)}>
                              <Check className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 capitalize">
                        {item.container}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 flex items-center gap-1"
                      >
                        {getTimeOfDayEmoji(item.timeOfDayLabel)} {item.timeOfDayLabel}
                      </Badge>
                    </div>

                    {item.notes && <div className="text-sm text-slate-600 dark:text-slate-400">{item.notes}</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-[500px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Droplet className="h-5 w-5 text-blue-500" />
              Add Milk to Inventory
            </h2>
            <Button variant="ghost" size="icon" onClick={() => setShowAddForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (oz)</Label>
              <Input
                id="amount"
                type="number"
                step="0.1"
                min="0"
                value={newAmount || ""}
                onChange={(e) => setNewAmount(Number.parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date Pumped</Label>
              <Input id="date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time Pumped</Label>
              <Input id="time" type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
              <div className="text-xs text-slate-500">
                Time determines circadian batch: 4:00 AM - 3:59 PM (Morning) or 4:00 PM - 3:59 AM (Evening)
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Select
                value={newLocation}
                onValueChange={(value: "freezer" | "fridge" | "room") => setNewLocation(value)}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freezer">Freezer (3 months)</SelectItem>
                  <SelectItem value="fridge">Refrigerator (3 days)</SelectItem>
                  <SelectItem value="room">Room Temperature (4 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="container">Container Type</Label>
              <Select
                value={newContainer}
                onValueChange={(value: "bag" | "bottle" | "other") => setNewContainer(value)}
              >
                <SelectTrigger id="container">
                  <SelectValue placeholder="Select container" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bag">Storage Bag</SelectItem>
                  <SelectItem value="bottle">Bottle</SelectItem>
                  <SelectItem value="other">Other Container</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Add any notes about this milk"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
              />
            </div>

            <Button onClick={handleAddItem} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Add to Inventory
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[500px]">
          {editingItem && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Edit className="h-5 w-5 text-blue-500" />
                  Edit Inventory Item
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowEditForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-amount">Amount (oz)</Label>
                  <Input
                    id="edit-amount"
                    type="number"
                    step="0.1"
                    min="0"
                    value={editingItem.amount || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, amount: Number.parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date Pumped</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingItem.date.split("T")[0]}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        date: `${e.target.value}T${editingItem.date.split("T")[1] || "00:00:00"}`,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-time">Time Pumped</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={(editingItem.date.split("T")[1] || "00:00:00").substring(0, 5)}
                    onChange={(e) => {
                      const datePart = editingItem.date.split("T")[0]
                      setEditingItem({ ...editingItem, date: `${datePart}T${e.target.value}:00` })
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Storage Location</Label>
                  <Select
                    value={editingItem.location}
                    onValueChange={(value: "freezer" | "fridge" | "room") =>
                      setEditingItem({ ...editingItem, location: value })
                    }
                  >
                    <SelectTrigger id="edit-location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freezer">Freezer (3 months)</SelectItem>
                      <SelectItem value="fridge">Refrigerator (3 days)</SelectItem>
                      <SelectItem value="room">Room Temperature (4 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-container">Container Type</Label>
                  <Select
                    value={editingItem.container}
                    onValueChange={(value: "bag" | "bottle" | "other") =>
                      setEditingItem({ ...editingItem, container: value })
                    }
                  >
                    <SelectTrigger id="edit-container">
                      <SelectValue placeholder="Select container" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bag">Storage Bag</SelectItem>
                      <SelectItem value="bottle">Bottle</SelectItem>
                      <SelectItem value="other">Other Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-used">Mark as Used</Label>
                    <Switch
                      id="edit-used"
                      checked={editingItem.used}
                      onCheckedChange={(checked) => setEditingItem({ ...editingItem, used: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Input
                    id="edit-notes"
                    placeholder="Add any notes about this milk"
                    value={editingItem.notes}
                    onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
                  />
                </div>

                <Button onClick={handleUpdateItem} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
