"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

const data = [
  { age: "Birth", weight: 7.5, height: 20, head: 13.5 },
  { age: "1 mo", weight: 9.2, height: 21.5, head: 14.5 },
  { age: "2 mo", weight: 11.0, height: 22.8, head: 15.2 },
  { age: "3 mo", weight: 12.5, height: 23.5, head: 16.2 },
]

export function GrowthChart() {
  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ChartContainer title="Growth Chart" description="Weight, height, and head circumference over time">
          <Chart>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="bg-white dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-md"
                      items={({ payload }) => {
                        return payload?.map((entry) => ({
                          label:
                            entry.dataKey === "weight"
                              ? "Weight (lbs)"
                              : entry.dataKey === "height"
                                ? "Height (in)"
                                : "Head (in)",
                          value: entry.value,
                          color: entry.color,
                        }))
                      }}
                    />
                  }
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  name="Weight (lbs)"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
                <Line yAxisId="left" type="monotone" dataKey="height" name="Height (in)" stroke="#6366f1" />
                <Line yAxisId="right" type="monotone" dataKey="head" name="Head (in)" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </Chart>
        </ChartContainer>
      </div>
    </Card>
  )
}
