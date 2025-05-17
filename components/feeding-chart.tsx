"use client"

import { Card } from "@/components/ui/card"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"

const data = [
  { day: "Mon", breastfeeding: 6, bottle: 2, solids: 0 },
  { day: "Tue", breastfeeding: 7, bottle: 1, solids: 0 },
  { day: "Wed", breastfeeding: 5, bottle: 3, solids: 0 },
  { day: "Thu", breastfeeding: 6, bottle: 2, solids: 0 },
  { day: "Fri", breastfeeding: 5, bottle: 2, solids: 1 },
  { day: "Sat", breastfeeding: 4, bottle: 3, solids: 1 },
  { day: "Sun", breastfeeding: 6, bottle: 2, solids: 0 },
]

export function FeedingChart() {
  return (
    <Card className="p-4">
      <div className="h-[300px] w-full">
        <ChartContainer title="Feeding Frequency" description="Number of feedings per day">
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
                          label:
                            entry.dataKey === "breastfeeding"
                              ? "Breastfeeding"
                              : entry.dataKey === "bottle"
                                ? "Bottle"
                                : "Solids",
                          value: `${entry.value} times`,
                          color: entry.color,
                        }))
                      }}
                    />
                  }
                />
                <Legend />
                <Bar dataKey="breastfeeding" name="Breastfeeding" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bottle" name="Bottle" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="solids" name="Solids" fill="#ffc658" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
        </ChartContainer>
      </div>
    </Card>
  )
}
