"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, Share2, Calendar } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ReportsPage() {
  const sleepData = [
    { day: "Mon", night: 8.5, naps: 3.5 },
    { day: "Tue", night: 9, naps: 3 },
    { day: "Wed", night: 7.5, naps: 4 },
    { day: "Thu", night: 8, naps: 3.5 },
    { day: "Fri", night: 8.5, naps: 3 },
    { day: "Sat", night: 9, naps: 2.5 },
    { day: "Sun", night: 8, naps: 3 },
  ]

  const feedingData = [
    { day: "Mon", breastfeeding: 6, bottle: 2, solids: 0 },
    { day: "Tue", breastfeeding: 7, bottle: 1, solids: 0 },
    { day: "Wed", breastfeeding: 5, bottle: 3, solids: 0 },
    { day: "Thu", breastfeeding: 6, bottle: 2, solids: 0 },
    { day: "Fri", breastfeeding: 5, bottle: 2, solids: 1 },
    { day: "Sat", breastfeeding: 4, bottle: 3, solids: 1 },
    { day: "Sun", breastfeeding: 6, bottle: 2, solids: 0 },
  ]

  const diaperData = [
    { name: "Wet", value: 35 },
    { name: "Dirty", value: 20 },
    { name: "Mixed", value: 15 },
  ]

  const COLORS = ["#60a5fa", "#92400e", "#8884d8"]

  const growthData = [
    { age: "Birth", weight: 7.5, height: 20, head: 13.5 },
    { age: "1 mo", weight: 9.2, height: 21.5, head: 14.5 },
    { age: "2 mo", weight: 11.0, height: 22.8, head: 15.2 },
    { age: "3 mo", weight: 12.5, height: 23.5, head: 16.2 },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Sleep" value="85.5 hours" change="+5%" />
        <StatCard title="Feedings" value="56 times" change="-2%" />
        <StatCard title="Diaper Changes" value="70 changes" change="+3%" />
        <StatCard title="Weight Gain" value="1.5 lbs" change="+12%" positive />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="feeding">Feeding</TabsTrigger>
          <TabsTrigger value="diaper">Diaper</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Sleep Patterns</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sleepData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="night" name="Night Sleep" stackId="a" fill="#6366f1" />
                      <Bar dataKey="naps" name="Naps" stackId="a" fill="#a5b4fc" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Feeding Frequency</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={feedingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="breastfeeding" name="Breastfeeding" fill="#8884d8" />
                      <Bar dataKey="bottle" name="Bottle" fill="#82ca9d" />
                      <Bar dataKey="solids" name="Solids" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Diaper Distribution</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diaperData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {diaperData.map((entry, index) => (
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Growth Trends</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        name="Weight (lbs)"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="height" name="Height (in)" stroke="#6366f1" />
                      <Line type="monotone" dataKey="head" name="Head (in)" stroke="#f59e0b" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sleep">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Analysis</CardTitle>
              <CardDescription>Detailed analysis of your baby's sleep patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Select this tab to view detailed sleep analytics
              </p>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sleepData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="night" name="Night Sleep" stackId="a" fill="#6366f1" />
                    <Bar dataKey="naps" name="Naps" stackId="a" fill="#a5b4fc" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feeding">
          <Card>
            <CardHeader>
              <CardTitle>Feeding Analysis</CardTitle>
              <CardDescription>Detailed analysis of your baby's feeding patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Select this tab to view detailed feeding analytics
              </p>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={feedingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="breastfeeding" name="Breastfeeding" fill="#8884d8" />
                    <Bar dataKey="bottle" name="Bottle" fill="#82ca9d" />
                    <Bar dataKey="solids" name="Solids" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diaper">
          <Card>
            <CardHeader>
              <CardTitle>Diaper Analysis</CardTitle>
              <CardDescription>Detailed analysis of your baby's diaper patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Select this tab to view detailed diaper analytics
              </p>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={diaperData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {diaperData.map((entry, index) => (
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
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Growth Analysis</CardTitle>
              <CardDescription>Detailed analysis of your baby's growth patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Select this tab to view detailed growth analytics
              </p>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" name="Weight (lbs)" stroke="#10b981" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="height" name="Height (in)" stroke="#6366f1" />
                    <Line type="monotone" dataKey="head" name="Head (in)" stroke="#f59e0b" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function StatCard({
  title,
  value,
  change,
  positive = false,
}: {
  title: string
  value: string
  change: string
  positive?: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${positive ? "text-green-500" : "text-red-500"}`}>{change} from last week</p>
      </CardContent>
    </Card>
  )
}
