"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Droplet, TrashIcon as Poop, Droplets } from "lucide-react"

const data = [
  { day: "Mon", wet: 5, dirty: 3 },
  { day: "Tue", wet: 6, dirty: 2 },
  { day: "Wed", wet: 4, dirty: 4 },
  { day: "Thu", wet: 5, dirty: 3 },
  { day: "Fri", wet: 6, dirty: 2 },
  { day: "Sat", wet: 5, dirty: 3 },
  { day: "Sun", wet: 4, dirty: 3 },
]

export function DiaperChart() {
  const renderLegendItem = (value: string, entry: any) => {
    const { color } = entry

    return (
      <span className="flex items-center gap-1.5">
        {value === "wet" ? (
          <Droplet className="h-4 w-4 text-blue-500" />
        ) : value === "dirty" ? (
          <Poop className="h-4 w-4 text-amber-700" />
        ) : (
          <Droplets className="h-4 w-4 text-purple-500" />
        )}
        <span style={{ color }}>{value === "wet" ? "Wet" : value === "dirty" ? "Dirty" : "Mixed"}</span>
      </span>
    )
  }

  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ChartContainer title="Diaper Changes" description="Number of diaper changes per day">
          <Chart>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-md"
                      items={({ payload }) => {
                        return payload?.map((entry) => ({
                          label: entry.dataKey === "wet" ? "Wet" : entry.dataKey === "dirty" ? "Dirty" : "Mixed",
                          value: `${entry.value} changes`,
                          color: entry.color,
                          icon:
                            entry.dataKey === "wet" ? (
                              <Droplet className="h-3 w-3" />
                            ) : entry.dataKey === "dirty" ? (
                              <Poop className="h-3 w-3" />
                            ) : (
                              <Droplets className="h-3 w-3" />
                            ),
                        }))
                      }}
                    />
                  }
                />
                <Legend formatter={renderLegendItem} />
                <Bar dataKey="wet" name="wet" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dirty" name="dirty" fill="#92400e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mixed" name="mixed" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </ChartContainer>
      </div>
    </Card>
  )
}
