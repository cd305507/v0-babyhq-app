"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the inventory structure
interface MilkInventoryItem {
  id: string
  amount: number
  date: string
  expirationDate: string
  location: "freezer" | "fridge" | "room"
  container: "bag" | "bottle" | "other"
  timeOfDayLabel: string
  timePeriod: "morning" | "evening"
  used: boolean
  notes: string
}

interface MilkInventoryContextType {
  inventory: MilkInventoryItem[]
  addToInventory: (item: Omit<MilkInventoryItem, "id" | "timePeriod">) => void
  removeFromInventory: (id: string) => void
  updateInventory: (location: string, timePeriod: string, amount: number) => void
  markAsUsed: (id: string) => void
  getAvailableMilk: (location: string, timePeriod: string) => number
}

// Sample data for demonstration
const sampleInventory: MilkInventoryItem[] = [
  {
    id: "1",
    amount: 4.5,
    date: "2025-05-15",
    expirationDate: "2025-08-15",
    location: "freezer",
    container: "bag",
    timeOfDayLabel: "Morning Milk",
    timePeriod: "morning",
    used: false,
    notes: "Morning pump",
  },
  {
    id: "2",
    amount: 3.8,
    date: "2025-05-15",
    expirationDate: "2025-08-15",
    location: "freezer",
    container: "bag",
    timeOfDayLabel: "Afternoon Milk",
    timePeriod: "morning",
    used: false,
    notes: "Afternoon pump",
  },
  {
    id: "3",
    amount: 3.5,
    date: "2025-05-16",
    expirationDate: "2025-05-19",
    location: "fridge",
    container: "bottle",
    timeOfDayLabel: "Evening Milk",
    timePeriod: "evening",
    used: false,
    notes: "For tomorrow's daycare",
  },
  {
    id: "4",
    amount: 2.0,
    date: "2025-05-16",
    expirationDate: "2025-05-16",
    location: "room",
    container: "bottle",
    timeOfDayLabel: "Night Milk",
    timePeriod: "evening",
    used: false,
    notes: "For tonight's feeding",
  },
  {
    id: "5",
    amount: 4.0,
    date: "2025-05-14",
    expirationDate: "2025-08-14",
    location: "freezer",
    container: "bag",
    timeOfDayLabel: "Morning Milk",
    timePeriod: "morning",
    used: false,
    notes: "",
  },
]

const MilkInventoryContext = createContext<MilkInventoryContextType>({
  inventory: [],
  addToInventory: () => {},
  removeFromInventory: () => {},
  updateInventory: () => {},
  markAsUsed: () => {},
  getAvailableMilk: () => 0,
})

export function MilkInventoryProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<MilkInventoryItem[]>(sampleInventory)

  // Determine time period based on hour
  const determineTimePeriod = (hour: number): "morning" | "evening" => {
    return hour >= 4 && hour < 16 ? "morning" : "evening"
  }

  // Add a new item to inventory
  const addToInventory = (item: Omit<MilkInventoryItem, "id" | "timePeriod">) => {
    // Extract hour from the date to determine time period
    const pumpDate = new Date(item.date)
    const hour = pumpDate.getHours()
    const timePeriod = determineTimePeriod(hour)

    const newItem: MilkInventoryItem = {
      ...item,
      id: `milk-${Date.now()}`,
      timePeriod,
    }

    setInventory([...inventory, newItem])
  }

  // Remove an item from inventory
  const removeFromInventory = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id))
  }

  // Mark an item as used
  const markAsUsed = (id: string) => {
    setInventory(inventory.map((item) => (item.id === id ? { ...item, used: true } : item)))
  }

  // Update inventory based on location and time period
  const updateInventory = (location: string, timePeriod: string, amount: number) => {
    // If amount is negative, we're using milk
    if (amount < 0) {
      // Find items to use, prioritizing oldest items first
      const itemsToUse = inventory
        .filter((item) => item.location === location && item.timePeriod === timePeriod && !item.used)
        .sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())

      let remainingAmount = Math.abs(amount)

      // Mark items as used until we've used the requested amount
      const updatedInventory = inventory.map((item) => {
        if (remainingAmount <= 0 || !itemsToUse.includes(item)) {
          return item
        }

        if (item.amount <= remainingAmount) {
          // Use the entire item
          remainingAmount -= item.amount
          return { ...item, used: true }
        } else {
          // Use part of the item
          const newAmount = item.amount - remainingAmount
          remainingAmount = 0
          return { ...item, amount: newAmount }
        }
      })

      setInventory(updatedInventory)
    } else {
      // Adding milk - handled by addToInventory
    }
  }

  // Get available milk for a specific location and time period
  const getAvailableMilk = (location: string, timePeriod: string): number => {
    return inventory
      .filter((item) => item.location === location && item.timePeriod === timePeriod && !item.used)
      .reduce((total, item) => total + item.amount, 0)
  }

  return (
    <MilkInventoryContext.Provider
      value={{
        inventory,
        addToInventory,
        removeFromInventory,
        updateInventory,
        markAsUsed,
        getAvailableMilk,
      }}
    >
      {children}
    </MilkInventoryContext.Provider>
  )
}

export const useMilkInventory = () => useContext(MilkInventoryContext)
