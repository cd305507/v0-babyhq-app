"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

const data = [
  { day: "Mon", night: 8.5, naps: 3.5 },
  { day: "Tue", night: 9, naps: 3 },
  { day: "Wed", night: 7.5, naps: 4 },
  { day: "Thu", night: 8, naps: 3.5 },
  { day: "Fri", night: 8.5, naps: 3 },
  { day: "Sat", night: 9, naps: 2.5 },
  { day: "Sun", night: 8, naps: 3 },
]

export function SleepChart() {
  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ChartContainer title="Sleep Duration" description="Hours of sleep per day">
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
                          label: entry.dataKey === "night" ? "Night Sleep" : "Naps",
                          value: `${entry.value} hours`,
                          color: entry.color,
                        }))
                      }}
                    />
                  }
                />
                <Legend />
                <Bar dataKey="night" name="Night Sleep" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="naps" name="Naps" stackId="a" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </ChartContainer>
      </div>
    </Card>
  )
}
