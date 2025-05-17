"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChartIcon, PieChart, Clock, Lightbulb } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface CryInsightsProps {
  cryHistory: Array<{
    id: number
    timestamp: Date
    duration: number
    type: string
    confidence: number
    notes: string
  }>
  cryTypes: Record<string, any>
}

export function CryInsights({ cryHistory, cryTypes }: CryInsightsProps) {
  const [timeRange, setTimeRange] = useState("week")

  // Filter data based on time range
  const getFilteredData = () => {
    const now = new Date()
    const cutoff = new Date()

    if (timeRange === "day") {
      cutoff.setDate(now.getDate() - 1)
    } else if (timeRange === "week") {
      cutoff.setDate(now.getDate() - 7)
    } else if (timeRange === "month") {
      cutoff.setMonth(now.getMonth() - 1)
    }

    return cryHistory.filter((cry) => cry.timestamp >= cutoff)
  }

  const filteredData = getFilteredData()

  // Prepare data for charts
  const prepareTypeDistribution = () => {
    const typeCounts: Record<string, number> = {}

    filteredData.forEach((cry) => {
      if (!typeCounts[cry.type]) {
        typeCounts[cry.type] = 0
      }
      typeCounts[cry.type]++
    })

    return Object.entries(typeCounts).map(([type, count]) => ({
      name: cryTypes[type]?.title || "Unknown",
      value: count,
      color: getColorForType(type),
    }))
  }

  const prepareTimeOfDayDistribution = () => {
    const hourCounts = Array(24).fill(0)

    filteredData.forEach((cry) => {
      const hour = cry.timestamp.getHours()
      hourCounts[hour]++
    })

    return hourCounts.map((count, hour) => ({
      name: formatHour(hour),
      count,
    }))
  }

  const prepareDurationByType = () => {
    const typeDurations: Record<string, { total: number; count: number }> = {}

    filteredData.forEach((cry) => {
      if (!typeDurations[cry.type]) {
        typeDurations[cry.type] = { total: 0, count: 0 }
      }
      typeDurations[cry.type].total += cry.duration
      typeDurations[cry.type].count++
    })

    return Object.entries(typeDurations).map(([type, data]) => ({
      name: cryTypes[type]?.title || "Unknown",
      avgDuration: data.count > 0 ? Math.round(data.total / data.count) : 0,
      color: getColorForType(type),
    }))
  }

  // Helper functions
  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM"
    if (hour === 12) return "12 PM"
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`
  }

  const getColorForType = (type: string) => {
    const colorMap: Record<string, string> = {
      hunger: "#f97316", // orange
      pain: "#ef4444", // red
      tired: "#6366f1", // indigo
      colic: "#a855f7", // purple
      bored: "#3b82f6", // blue
      gas: "#22c55e", // green
    }

    return colorMap[type] || "#94a3b8" // slate as default
  }

  const typeDistribution = prepareTypeDistribution()
  const timeOfDayDistribution = prepareTimeOfDayDistribution()
  const durationByType = prepareDurationByType()

  // Calculate insights
  const getMostCommonType = () => {
    if (typeDistribution.length === 0) return null
    return typeDistribution.reduce((prev, current) => (prev.value > current.value ? prev : current))
  }

  const getPeakCryingHours = () => {
    if (timeOfDayDistribution.every((item) => item.count === 0)) return []

    const maxCount = Math.max(...timeOfDayDistribution.map((item) => item.count))
    return timeOfDayDistribution.filter((item) => item.count === maxCount).map((item) => item.name)
  }

  const getLongestCryType = () => {
    if (durationByType.length === 0) return null
    return durationByType.reduce((prev, current) => (prev.avgDuration > current.avgDuration ? prev : current))
  }

  const mostCommonType = getMostCommonType()
  const peakCryingHours = getPeakCryingHours()
  const longestCryType = getLongestCryType()

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Cry Pattern Insights</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">Time Range:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm bg-transparent border border-slate-200 dark:border-slate-700 rounded px-2 py-1"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChartIcon className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-medium mb-2">No data available</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
              Record more cry events to see insights and patterns. Insights require at least one recorded cry in the
              selected time period.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Key Insights Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Key Insights
              </CardTitle>
              <CardDescription>Summary of cry patterns based on your recorded data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mostCommonType && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Most Common Cry Type
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: mostCommonType.color }}></div>
                      <span className="font-medium">{mostCommonType.name}</span>
                    </div>
                    <p className="text-sm mt-2">{mostCommonType.value} occurrences in this period</p>
                  </div>
                )}

                {peakCryingHours.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Peak Crying Time</h3>
                    <div className="font-medium">{peakCryingHours.join(", ")}</div>
                    <p className="text-sm mt-2">Consider adjusting routines around these times</p>
                  </div>
                )}

                {longestCryType && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Longest Average Duration
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: longestCryType.color }}></div>
                      <span className="font-medium">{longestCryType.name}</span>
                    </div>
                    <p className="text-sm mt-2">Avg. {formatTime(longestCryType.avgDuration)} per episode</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cry Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  Cry Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={typeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {typeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} occurrences`, "Count"]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Time of Day Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  Crying by Time of Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeOfDayDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip formatter={(value) => [`${value} occurrences`, "Count"]} />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Average Duration by Type */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-green-500" />
                  Average Duration by Cry Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={durationByType}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis
                        tickFormatter={(seconds) => `${Math.floor(seconds / 60)}m`}
                        label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
                      />
                      <Tooltip formatter={(seconds) => [formatTime(seconds as number), "Avg. Duration"]} />
                      <Bar dataKey="avgDuration">
                        {durationByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostCommonType && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <h3 className="font-medium mb-1 flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: mostCommonType.color }}></div>
                        For {mostCommonType.name} Cries
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Since this is your baby's most common cry type, try these specific techniques:
                      </p>
                      <ul className="text-sm mt-2 space-y-1 pl-5 list-disc">
                        {cryTypes[
                          Object.keys(cryTypes).find((key) => cryTypes[key].title === mostCommonType.name) || "hunger"
                        ]?.suggestions
                          .slice(0, 2)
                          .map((suggestion: string, index: number) => (
                            <li key={index}>{suggestion}</li>
                          ))}
                      </ul>
                    </div>
                  )}

                  {peakCryingHours.length > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <h3 className="font-medium mb-1 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        Timing Adjustment
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Your baby tends to cry most around {peakCryingHours.join(" and ")}. Consider:
                      </p>
                      <ul className="text-sm mt-2 space-y-1 pl-5 list-disc">
                        <li>Adjusting feeding schedule to be 30 minutes before peak crying time</li>
                        <li>Planning naps to avoid overtiredness during these hours</li>
                        <li>Creating a calming routine before these times</li>
                      </ul>
                    </div>
                  )}

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-medium mb-1 text-purple-800 dark:text-purple-300">
                      Track More for Better Insights
                    </h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      The more cry events you record, the more accurate our AI analysis becomes. Try to record at least
                      5-10 cries per week for optimal pattern detection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
