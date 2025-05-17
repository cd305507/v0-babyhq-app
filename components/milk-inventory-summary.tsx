"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Refrigerator, Snowflake, ThermometerSun, Sun, Moon, PlusCircle } from "lucide-react"
import { useMilkInventory } from "@/contexts/milk-inventory-context"
import Link from "next/link"

export function MilkInventorySummary() {
  const { getAvailableMilk } = useMilkInventory()

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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Milk Inventory</span>
          <Badge variant="outline" className="ml-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            {totalInventory.toFixed(1)} oz
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Refrigerator className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Fridge</span>
              </div>
              <span className="text-sm font-bold">{fridgeTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Sun className="h-3 w-3 text-yellow-500 mr-1" />
              <span>Morning: {fridgeMorningTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Moon className="h-3 w-3 text-indigo-500 mr-1" />
              <span>Evening: {fridgeEveningTotal.toFixed(1)} oz</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Snowflake className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">Freezer</span>
              </div>
              <span className="text-sm font-bold">{freezerTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Sun className="h-3 w-3 text-yellow-500 mr-1" />
              <span>Morning: {freezerMorningTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Moon className="h-3 w-3 text-indigo-500 mr-1" />
              <span>Evening: {freezerEveningTotal.toFixed(1)} oz</span>
            </div>
          </div>

          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-md">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <ThermometerSun className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm font-medium">Room</span>
              </div>
              <span className="text-sm font-bold">{roomTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Sun className="h-3 w-3 text-yellow-500 mr-1" />
              <span>Morning: {roomMorningTotal.toFixed(1)} oz</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
              <Moon className="h-3 w-3 text-indigo-500 mr-1" />
              <span>Evening: {roomEveningTotal.toFixed(1)} oz</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/pumping">
            <Button variant="outline" size="sm">
              View Inventory
            </Button>
          </Link>
          <Link href="/pumping">
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Milk
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
