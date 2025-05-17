"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, TrendingDown, Info, Download, Calendar } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for demonstration
const dailyData = [
  { day: "Mon", total: 12.5, left: 6.5, right: 6.0, sessions: 4 },
  { day: "Tue", total: 13.2, left: 7.0, right: 6.2, sessions: 4 },
  { day: "Wed", total: 11.8, left: 6.2, right: 5.6, sessions: 4 },
  { day: "Thu", total: 12.0, left: 6.3, right: 5.7, sessions: 4 },
  { day: "Fri", total: 11.5, left: 6.0, right: 5.5, sessions: 4 },
  { day: "Sat", total: 10.8, left: 5.5, right: 5.3, sessions: 3 },
  { day: "Sun", total: 11.0, left: 5.7, right: 5.3, sessions: 3 },
]

const timeOfDayData = [
  { time: "6-9 AM", amount: 4.5, sessions: 1 },
  { time: "9-12 PM", amount: 3.8, sessions: 1 },
  { time: "12-3 PM", amount: 3.3, sessions: 1 },
  { time: "3-6 PM", amount: 3.0, sessions: 1 },
  { time: "6-9 PM", amount: 2.8, sessions: 1 },
  { time: "9-12 AM", amount: 0, sessions: 0 },
  { time: "12-3 AM", amount: 0, sessions: 0 },
  { time: "3-6 AM", amount: 0, sessions: 0 },
]

const pumpTypeData = [
  { name: "Spectra S1", value: 65 },
  { name: "Haakaa", value: 20 },
  { name: "Manual", value: 15 },
]

const COLORS = ["#60a5fa", "#f59e0b", "#10b981", "#8884d8"]

export function PumpingInsights() {
  const [timeRange, setTimeRange] = useState("week")
  const [activeTab, setActiveTab] = useState("volume")

  // Calculate averages and trends
  const avgDailyVolume = dailyData.reduce((sum, day) => sum + day.total, 0) / dailyData.length
  const avgSessionVolume =
    dailyData.reduce((sum, day) => sum + day.total, 0) / dailyData.reduce((sum, day) => sum + day.sessions, 0)
  const volumeTrend = dailyData[dailyData.length - 1].total > dailyData[0].total ? "up" : "down"
  const sessionTrend = dailyData[dailyData.length - 1].sessions > dailyData[0].sessions ? "up" : "down"

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDailyVolume.toFixed(1)} oz</div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={`${
                  volumeTrend === "up"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                }`}
              >
                {volumeTrend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {volumeTrend === "up" ? "+5%" : "-3%"} from last week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Per Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSessionVolume.toFixed(1)} oz</div>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                Average per pumping session
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sessions Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(dailyData.reduce((sum, day) => sum + day.sessions, 0) / dailyData.length).toFixed(1)}
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={`${
                  sessionTrend === "up"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                }`}
              >
                {sessionTrend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {sessionTrend === "up" ? "+1" : "-1"} from last week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Side Difference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                (dailyData.reduce((sum, day) => sum + day.left, 0) /
                  dailyData.reduce((sum, day) => sum + day.right, 0) -
                  1) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
              >
                Left produces more
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <TabsContent value="volume" className="m-0 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Daily Pumping Volume</CardTitle>
            <CardDescription>Track your daily pumping output over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total (oz)"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="left" name="Left (oz)" stroke="#f59e0b" strokeWidth={1} />
                  <Line type="monotone" dataKey="right" name="Right (oz)" stroke="#10b981" strokeWidth={1} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md">
          <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <p>
            Your supply is typically highest in the morning and gradually decreases throughout the day. This is a normal
            pattern for most breastfeeding parents.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Volume by Time of Day</CardTitle>
            <CardDescription>See when your supply is highest</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeOfDayData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" name="Amount (oz)" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="patterns" className="m-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pumping Frequency</CardTitle>
              <CardDescription>Number of sessions per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" name="Sessions" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pump Type Usage</CardTitle>
              <CardDescription>Distribution of pump types used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pumpTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pumpTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Comfort & Letdown Success</CardTitle>
            <CardDescription>Track your pumping experience over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { day: "Mon", comfort: 3, letdown: 4 },
                    { day: "Tue", comfort: 4, letdown: 4 },
                    { day: "Wed", comfort: 3, letdown: 3 },
                    { day: "Thu", comfort: 3, letdown: 3 },
                    { day: "Fri", comfort: 4, letdown: 3 },
                    { day: "Sat", comfort: 4, letdown: 4 },
                    { day: "Sun", comfort: 3, letdown: 3 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="comfort" name="Comfort (1-5)" stroke="#f59e0b" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="letdown"
                    name="Letdown Success (1-5)"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Pattern Insights</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Your comfort levels tend to be higher when you pump in the morning. Consider scheduling your longer
                pumping sessions earlier in the day when possible.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="comparison" className="m-0 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pumped vs. Fed Comparison</CardTitle>
            <CardDescription>Compare your pumping output to baby's intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { day: "Mon", pumped: 12.5, fed: 11.0 },
                    { day: "Tue", pumped: 13.2, fed: 12.0 },
                    { day: "Wed", pumped: 11.8, fed: 12.5 },
                    { day: "Thu", pumped: 12.0, fed: 11.5 },
                    { day: "Fri", pumped: 11.5, fed: 11.0 },
                    { day: "Sat", pumped: 10.8, fed: 10.5 },
                    { day: "Sun", pumped: 11.0, fed: 10.0 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pumped" name="Pumped (oz)" fill="#60a5fa" />
                  <Bar dataKey="fed" name="Fed to Baby (oz)" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Supply vs. Demand</CardTitle>
              <CardDescription>Weekly balance of milk produced vs. consumed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">+5.8 oz</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">Weekly surplus</div>

                <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-2">
                  <div className="bg-blue-600 h-4 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between w-full max-w-md text-xs text-slate-500 dark:text-slate-400">
                  <span>Produced: 82.8 oz</span>
                  <span>Consumed: 77.0 oz</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Freezer Stash</CardTitle>
              <CardDescription>Track your stored milk inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">42.5 oz</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">Total frozen</div>

                <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-full h-4 mb-2">
                  <div className="bg-green-600 h-4 rounded-full" style={{ width: "42%" }}></div>
                </div>
                <div className="flex justify-between w-full max-w-md text-xs text-slate-500 dark:text-slate-400">
                  <span>Current</span>
                  <span>Goal: 100 oz</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-md bg-blue-50 dark:bg-blue-900/20">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300">Supply Analysis</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                You're currently producing more milk than your baby is consuming, which is helping build your freezer
                stash. At your current rate, you'll reach your freezer stash goal in approximately 2 weeks.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>
    </div>
  )
}
