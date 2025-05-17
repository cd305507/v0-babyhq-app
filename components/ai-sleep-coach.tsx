"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Send, ThumbsUp, ThumbsDown, Lightbulb, Moon, Clock, BarChart, ArrowRight } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SleepData {
  date: string
  nightSleep: number
  napSleep: number
  totalSleep: number
  wakeups: number
}

interface SleepCoachProps {
  babyAge: number // in months
  sleepData?: SleepData[]
}

export function AISleepCoach({ babyAge, sleepData = [] }: SleepCoachProps) {
  const [activeTab, setActiveTab] = useState("insights")
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content:
        "Welcome to your AI Sleep Coach! I've analyzed your baby's sleep patterns and have some personalized insights and tips. What would you like to know about your baby's sleep?",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  // Generate mock sleep data if none provided
  const getSleepData = (): SleepData[] => {
    if (sleepData.length > 0) return sleepData

    // Generate last 7 days of mock data
    const mockData: SleepData[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Randomize sleep data within reasonable ranges
      const nightSleep = 7 + Math.random() * 3 // 7-10 hours
      const napSleep = 1 + Math.random() * 2 // 1-3 hours
      const wakeups = Math.floor(Math.random() * 4) // 0-3 wakeups

      mockData.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        nightSleep,
        napSleep,
        totalSleep: nightSleep + napSleep,
        wakeups,
      })
    }

    return mockData
  }

  const data = getSleepData()

  // Calculate sleep metrics
  const calculateMetrics = () => {
    const avgNightSleep = data.reduce((sum, day) => sum + day.nightSleep, 0) / data.length
    const avgNapSleep = data.reduce((sum, day) => sum + day.napSleep, 0) / data.length
    const avgTotalSleep = data.reduce((sum, day) => sum + day.totalSleep, 0) / data.length
    const avgWakeups = data.reduce((sum, day) => sum + day.wakeups, 0) / data.length

    // Age-based recommendations (simplified)
    let recommendedSleep = 14
    if (babyAge > 3) recommendedSleep = 13
    if (babyAge > 6) recommendedSleep = 12
    if (babyAge > 9) recommendedSleep = 11.5

    return {
      avgNightSleep: avgNightSleep.toFixed(1),
      avgNapSleep: avgNapSleep.toFixed(1),
      avgTotalSleep: avgTotalSleep.toFixed(1),
      avgWakeups: avgWakeups.toFixed(1),
      recommendedSleep,
      sleepDeficit: recommendedSleep - avgTotalSleep,
    }
  }

  const metrics = calculateMetrics()

  // Generate sleep insights based on data
  const getSleepInsights = () => {
    return [
      {
        type: "primary",
        icon: <BarChart className="h-4 w-4 text-blue-500" />,
        title: "Sleep Summary",
        content: `Your baby is averaging ${metrics.avgTotalSleep} hours of sleep daily (${metrics.avgNightSleep}h night + ${metrics.avgNapSleep}h naps).`,
      },
      {
        type: "warning",
        icon: <Clock className="h-4 w-4 text-amber-500" />,
        title: "Sleep Deficit",
        content:
          metrics.sleepDeficit > 0
            ? `Your baby may be under-sleeping by about ${metrics.sleepDeficit.toFixed(1)} hours based on age recommendations.`
            : "Your baby's sleep duration is within the recommended range for their age.",
      },
      {
        type: "tip",
        icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
        title: "Bedtime Suggestion",
        content: "Try moving bedtime earlier by 20-30 minutes to help reduce night wakings.",
      },
      {
        type: "pattern",
        icon: <Moon className="h-4 w-4 text-indigo-500" />,
        title: "Pattern Detected",
        content: "Days with shorter naps (<2h total) tend to have more night wakings.",
      },
    ]
  }

  const insights = getSleepInsights()

  // Generate sleep tips based on data and age
  const getSleepTips = () => {
    const tips = [
      {
        title: "Consistent Bedtime Routine",
        content: "Establish a 15-20 minute calming routine before bedtime to signal sleep time.",
        icon: <Clock className="h-4 w-4 text-indigo-500" />,
      },
      {
        title: "Optimal Wake Windows",
        content: `For ${babyAge} month olds, aim to keep wake windows between ${babyAge < 4 ? "60-90" : babyAge < 8 ? "90-120" : "120-180"} minutes to prevent overtiredness.`,
        icon: <Moon className="h-4 w-4 text-purple-500" />,
      },
      {
        title: "Early Bedtime",
        content: "An earlier bedtime (between 6:30-7:30pm) often leads to better night sleep quality.",
        icon: <Moon className="h-4 w-4 text-blue-500" />,
      },
    ]

    // Add age-specific tips
    if (babyAge < 4) {
      tips.push({
        title: "Swaddle Safely",
        content: "For babies under 4 months who aren't rolling yet, a proper swaddle can help with startle reflexes.",
        icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      })
    } else if (babyAge < 8) {
      tips.push({
        title: "Sleep Regression",
        content: "The 4-month sleep regression is normal as baby's sleep cycles mature. Stay consistent with routines.",
        icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      })
    } else {
      tips.push({
        title: "Nap Transition",
        content: "Around 7-9 months, many babies transition from 3 to 2 naps. Watch for signs of readiness.",
        icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      })
    }

    return tips
  }

  const tips = getSleepTips()

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: chatInput }])
    setChatInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        "how can i help my baby sleep longer":
          "Based on your baby's sleep patterns, I notice they're averaging shorter naps (about 35 minutes). For a baby at 4 months, try these strategies to extend naps:\n\n1. Make sure the sleep environment is optimal - dark room, white noise, comfortable temperature\n\n2. Watch for sleepy cues and try to put baby down at the first signs of tiredness\n\n3. Consider a gentle 'crib hour' approach - if baby wakes after a short nap, give them 10-15 minutes to potentially fall back asleep\n\n4. Ensure baby is getting enough daytime calories to minimize hunger wakings",
        "why does my baby wake up at night":
          "Night wakings can happen for several reasons at this age:\n\n1. Sleep cycles: Babies have shorter sleep cycles than adults and may briefly wake between them\n\n2. Hunger: At 4 months, many babies still need 1-2 night feedings\n\n3. Sleep associations: If baby falls asleep being rocked or fed, they may need the same to fall back asleep\n\n4. Development: The 4-month sleep regression often causes temporary disruptions\n\nLooking at your logs, I notice more night wakings on days with shorter daytime naps, suggesting overtiredness might be a factor.",
        "when should i transition to one nap":
          "For a 4-month-old, transitioning to one nap is still quite far away. Most babies transition from 2 naps to 1 nap between 15-18 months.\n\nRight now, your baby should be taking 3-4 naps per day, gradually moving toward 3 consistent naps. Around 6-8 months, many babies transition to 2 naps.\n\nSigns your baby is ready to drop a nap include:\n- Consistently fighting a particular nap\n- Taking too long to fall asleep\n- Short, poor quality naps\n- Early morning wakings\n\nI recommend maintaining your current nap schedule for now.",
      }

      // Default response if no specific match
      let responseContent =
        "Based on your baby's age and sleep patterns, I'd recommend focusing on consistent wake windows between naps (about 1.5-2 hours for a 4-month-old) and establishing a calming pre-sleep routine. The data shows your baby averages 3.2 night wakings, which is normal at this age, but we could work on extending the first sleep stretch by ensuring baby is well-fed before bedtime and considering a dream feed."

      // Check for specific responses
      for (const [question, answer] of Object.entries(aiResponses)) {
        if (chatInput.toLowerCase().includes(question.substring(0, 10))) {
          responseContent = answer
          break
        }
      }

      setChatMessages((prev) => [...prev, { role: "system", content: responseContent }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI Sleep Coach
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            Weekly Analysis
          </Badge>
        </div>
        <CardDescription>Personalized sleep insights and recommendations</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="coach">Ask Coach</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="insights" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="nightSleep" name="Night Sleep (h)" stroke="#6366f1" />
                    <Line type="monotone" dataKey="napSleep" name="Nap Sleep (h)" stroke="#a5b4fc" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Night Sleep</div>
                  <div className="text-xl font-semibold">{metrics.avgNightSleep}h</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Nap Sleep</div>
                  <div className="text-xl font-semibold">{metrics.avgNapSleep}h</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Total Sleep</div>
                  <div className="text-xl font-semibold">{metrics.avgTotalSleep}h</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Avg. Night Wakeups</div>
                  <div className="text-xl font-semibold">{metrics.avgWakeups}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sleep vs. Recommended</span>
                  <span className="text-xs text-slate-500">
                    {metrics.avgTotalSleep}h / {metrics.recommendedSleep}h
                  </span>
                </div>
                <Progress
                  value={(Number.parseFloat(metrics.avgTotalSleep) / metrics.recommendedSleep) * 100}
                  className="h-2"
                />
              </div>

              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      insight.type === "primary"
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                        : insight.type === "warning"
                          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
                          : insight.type === "tip"
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                            : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">{insight.icon}</div>
                      <div>
                        <div className="font-medium">{insight.title}</div>
                        <div className="text-sm">{insight.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="tips" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex-shrink-0 h-8 w-8 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{tip.content}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Personalized for {babyAge} months
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  At {babyAge} months, most babies need {metrics.recommendedSleep} hours of total sleep, with 3-4 naps
                  gradually transitioning to 3 consistent naps.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Age-Based Sleep Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="coach" className="m-0 flex flex-col h-[400px]">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  } p-3 rounded-lg`}
                >
                  {message.role !== "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Coach" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="space-y-2">
                    <p className="whitespace-pre-line">{message.content}</p>
                    {message.role !== "user" && message.role !== "system" && (
                      <div className="flex items-center gap-2 pt-1">
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not helpful
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">Coach is typing...</p>
                </div>
              </div>
            )}
          </div>
          <CardFooter className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask about sleep patterns, routines, or issues..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <Button type="submit" size="icon" onClick={handleSendMessage} disabled={isTyping || !chatInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
