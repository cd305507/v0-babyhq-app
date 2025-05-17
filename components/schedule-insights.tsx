"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
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
import { ChartContainer } from "@/components/ui/chart"
import { Calendar, Clock, Download, Info, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface ScheduleInsightsProps {
  babyAge: number
}

export function ScheduleInsights({ babyAge }: ScheduleInsightsProps) {
  const [timeRange, setTimeRange] = useState<string>("week")

  // Mock data for schedule adherence
  const adherenceData = [
    { day: "Mon", adherence: 92, target: 100 },
    { day: "Tue", adherence: 87, target: 100 },
    { day: "Wed", adherence: 95, target: 100 },
    { day: "Thu", adherence: 90, target: 100 },
    { day: "Fri", adherence: 85, target: 100 },
    { day: "Sat", adherence: 78, target: 100 },
    { day: "Sun", adherence: 82, target: 100 },
  ]

  // Mock data for event distribution
  const eventDistributionData = [
    { name: "Feeding", value: 35, color: "#9333ea" },
    { name: "Sleep", value: 40, color: "#6366f1" },
    { name: "Diaper", value: 15, color: "#3b82f6" },
    { name: "Medication", value: 5, color: "#ef4444" },
    { name: "Other", value: 5, color: "#94a3b8" },
  ]

  // Mock data for schedule optimization
  const optimizationData = [
    { category: "Sleep Quality", score: 85, recommendation: "Consider adjusting afternoon nap time" },
    { category: "Feeding Consistency", score: 92, recommendation: "Schedule is well optimized" },
    { category: "Routine Stability", score: 78, recommendation: "Try to maintain more consistent bedtime" },
    { category: "Development Support", score: 88, recommendation: "Add more tummy time activities" },
  ]

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  // Get score icon based on value
  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-blue-500" />
    if (score >= 70) return <AlertCircle className="h-5 w-5 text-yellow-500" />
    return <XCircle className="h-5 w-5 text-red-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="3months">Past 3 Months</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Insights
        </Button>
      </div>

      <Tabs defaultValue="adherence" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="adherence">Schedule Adherence</TabsTrigger>
          <TabsTrigger value="distribution">Event Distribution</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="adherence">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Schedule Adherence
              </CardTitle>
              <CardDescription>How closely your baby's actual schedule matched the planned schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    adherence: {
                      label: "Adherence",
                      color: "hsl(var(--chart-1))",
                    },
                    target: {
                      label: "Target",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adherenceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="adherence" fill="var(--color-adherence)" name="Adherence %" />
                      <Bar dataKey="target" fill="var(--color-target)" name="Target %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Insights:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Your schedule adherence is strong on weekdays (90% average)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>
                      Weekend adherence drops by 12% - consider adjusting weekend schedules to be more realistic
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Overall adherence of 87% is good for a {babyAge}-month-old baby's schedule</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Event Distribution
              </CardTitle>
              <CardDescription>Breakdown of different activities in your baby's schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Activity Breakdown:</h4>
                  <div className="space-y-2">
                    {eventDistributionData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium mb-2">Recommendations:</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {babyAge < 3
                        ? "Distribution is appropriate for a newborn. Sleep and feeding should dominate the schedule."
                        : babyAge < 6
                          ? "Consider adding more play activities as your baby becomes more alert and engaged."
                          : "Good balance of activities. As your baby grows, gradually increase play and learning activities."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-500" />
                Schedule Optimization
              </CardTitle>
              <CardDescription>Analysis and recommendations to improve your baby's schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationData.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {getScoreIcon(item.score)}
                        <h4 className="font-medium">{item.category}</h4>
                      </div>
                      <Badge variant="outline" className={`font-medium ${getScoreColor(item.score)}`}>
                        {item.score}/100
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.recommendation}</p>
                  </div>
                ))}

                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md mt-2">
                  <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <p>
                    These insights are based on your {babyAge}-month-old baby's patterns and general developmental
                    guidelines. Always consult with your pediatrician for personalized advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
