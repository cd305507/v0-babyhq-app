"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Calendar, ArrowRight, Info, Check, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"

interface GrowthData {
  age: number // in months
  weight: number // in lbs
  height: number // in inches
  headCircumference: number // in inches
}

interface Milestone {
  id: string
  category: "motor" | "cognitive" | "social" | "language"
  title: string
  description: string
  typicalAgeRange: [number, number] // in months
  completed?: boolean
  completedDate?: Date
}

interface GrowthMilestonePredictorProps {
  babyAge: number // in months
  birthDate: Date
  growthData?: GrowthData[]
  completedMilestones?: string[]
}

export function GrowthMilestonePredictor({
  babyAge,
  birthDate,
  growthData = [],
  completedMilestones = [],
}: GrowthMilestonePredictorProps) {
  const [activeTab, setActiveTab] = useState("growth")

  // Generate mock growth data if none provided
  const getGrowthData = (): GrowthData[] => {
    if (growthData.length > 0) return growthData

    // Generate growth data based on WHO growth charts (simplified)
    const mockData: GrowthData[] = []

    // Birth data (50th percentile approximations)
    const birthWeight = 7.5 // lbs
    const birthHeight = 20 // inches
    const birthHeadCirc = 13.5 // inches

    // Monthly growth rates (simplified approximations)
    const monthlyWeightGain = [
      2.0,
      1.5,
      1.2,
      1.0,
      0.8,
      0.7,
      0.6,
      0.5,
      0.5,
      0.4,
      0.4,
      0.4, // 0-12 months
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3,
      0.3, // 12-24 months
    ]

    const monthlyHeightGain = [
      1.0,
      1.0,
      0.8,
      0.8,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5,
      0.5, // 0-12 months
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4,
      0.4, // 12-24 months
    ]

    const monthlyHeadCircGain = [
      0.75,
      0.75,
      0.5,
      0.5,
      0.25,
      0.25,
      0.25,
      0.25,
      0.25,
      0.25,
      0.25,
      0.25, // 0-12 months
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1,
      0.1, // 12-24 months
    ]

    // Generate data for each month
    let currentWeight = birthWeight
    let currentHeight = birthHeight
    let currentHeadCirc = birthHeadCirc

    for (let month = 0; month <= Math.min(babyAge, 24); month++) {
      if (month > 0) {
        currentWeight += monthlyWeightGain[Math.min(month - 1, monthlyWeightGain.length - 1)]
        currentHeight += monthlyHeightGain[Math.min(month - 1, monthlyHeightGain.length - 1)]
        currentHeadCirc += monthlyHeadCircGain[Math.min(month - 1, monthlyHeadCircGain.length - 1)]
      }

      mockData.push({
        age: month,
        weight: Number.parseFloat(currentWeight.toFixed(1)),
        height: Number.parseFloat(currentHeight.toFixed(1)),
        headCircumference: Number.parseFloat(currentHeadCirc.toFixed(1)),
      })
    }

    return mockData
  }

  const growthDataPoints = getGrowthData()

  // Get the most recent growth measurements
  const currentGrowth = growthDataPoints[growthDataPoints.length - 1]

  // Calculate growth percentiles (simplified approximation)
  const calculatePercentiles = () => {
    // These are very simplified approximations
    const weightPercentile = 50 + Math.floor(Math.random() * 30) - 15 // Random between 35-65th percentile
    const heightPercentile = 50 + Math.floor(Math.random() * 30) - 15 // Random between 35-65th percentile
    const headPercentile = 50 + Math.floor(Math.random() * 30) - 15 // Random between 35-65th percentile

    return { weightPercentile, heightPercentile, headPercentile }
  }

  const percentiles = calculatePercentiles()

  // Predict future growth (simplified)
  const predictGrowth = () => {
    const futureData = [...growthDataPoints]
    const lastData = growthDataPoints[growthDataPoints.length - 1]

    // Predict next 3 months
    for (let i = 1; i <= 3; i++) {
      const futureMonth = lastData.age + i
      const monthlyWeightGain = futureMonth < 6 ? 1.0 : futureMonth < 12 ? 0.5 : 0.3
      const monthlyHeightGain = futureMonth < 6 ? 0.8 : futureMonth < 12 ? 0.5 : 0.4
      const monthlyHeadGain = futureMonth < 6 ? 0.5 : futureMonth < 12 ? 0.25 : 0.1

      futureData.push({
        age: futureMonth,
        weight: Number.parseFloat((lastData.weight + monthlyWeightGain * i).toFixed(1)),
        height: Number.parseFloat((lastData.height + monthlyHeightGain * i).toFixed(1)),
        headCircumference: Number.parseFloat((lastData.headCircumference + monthlyHeadGain * i).toFixed(1)),
      })
    }

    return futureData
  }

  const predictedGrowth = predictGrowth()

  // Define milestones
  const getMilestones = (): Milestone[] => {
    return [
      // Motor milestones
      {
        id: "m1",
        category: "motor",
        title: "Holds head up during tummy time",
        description: "Baby can lift and hold head up briefly during supervised tummy time.",
        typicalAgeRange: [1, 2],
        completed: completedMilestones.includes("m1"),
      },
      {
        id: "m2",
        category: "motor",
        title: "Rolls from tummy to back",
        description: "Baby can roll from tummy to back (usually happens before back to tummy).",
        typicalAgeRange: [3, 5],
        completed: completedMilestones.includes("m2"),
      },
      {
        id: "m3",
        category: "motor",
        title: "Sits without support",
        description: "Baby can sit upright without needing to be propped up.",
        typicalAgeRange: [5, 7],
        completed: completedMilestones.includes("m3"),
      },
      {
        id: "m4",
        category: "motor",
        title: "Crawls",
        description: "Baby moves on hands and knees in a crawling motion.",
        typicalAgeRange: [7, 10],
        completed: completedMilestones.includes("m4"),
      },
      {
        id: "m5",
        category: "motor",
        title: "Pulls to stand",
        description: "Baby can pull up to standing position using furniture.",
        typicalAgeRange: [8, 11],
        completed: completedMilestones.includes("m5"),
      },
      {
        id: "m6",
        category: "motor",
        title: "Walks with assistance",
        description: "Baby takes steps while holding onto furniture or hands.",
        typicalAgeRange: [9, 12],
        completed: completedMilestones.includes("m6"),
      },
      {
        id: "m7",
        category: "motor",
        title: "Stands alone",
        description: "Baby can stand without holding onto anything.",
        typicalAgeRange: [10, 14],
        completed: completedMilestones.includes("m7"),
      },
      {
        id: "m8",
        category: "motor",
        title: "Walks alone",
        description: "Baby takes several steps without support.",
        typicalAgeRange: [11, 15],
        completed: completedMilestones.includes("m8"),
      },

      // Cognitive milestones
      {
        id: "c1",
        category: "cognitive",
        title: "Follows moving object",
        description: "Baby visually tracks a moving object from side to side.",
        typicalAgeRange: [1, 3],
        completed: completedMilestones.includes("c1"),
      },
      {
        id: "c2",
        category: "cognitive",
        title: "Recognizes familiar faces",
        description: "Baby shows recognition of parents and close caregivers.",
        typicalAgeRange: [2, 4],
        completed: completedMilestones.includes("c2"),
      },
      {
        id: "c3",
        category: "cognitive",
        title: "Finds partially hidden objects",
        description: "Baby can find objects that are partially hidden.",
        typicalAgeRange: [4, 6],
        completed: completedMilestones.includes("c3"),
      },
      {
        id: "c4",
        category: "cognitive",
        title: "Explores objects",
        description: "Baby examines objects by banging, shaking, and putting in mouth.",
        typicalAgeRange: [5, 7],
        completed: completedMilestones.includes("c4"),
      },
      {
        id: "c5",
        category: "cognitive",
        title: "Object permanence",
        description: "Baby looks for hidden objects where they saw them disappear.",
        typicalAgeRange: [7, 9],
        completed: completedMilestones.includes("c5"),
      },

      // Social milestones
      {
        id: "s1",
        category: "social",
        title: "Social smile",
        description: "Baby smiles in response to your smile or voice.",
        typicalAgeRange: [1, 3],
        completed: completedMilestones.includes("s1"),
      },
      {
        id: "s2",
        category: "social",
        title: "Laughs out loud",
        description: "Baby laughs in response to playful interactions.",
        typicalAgeRange: [3, 5],
        completed: completedMilestones.includes("s2"),
      },
      {
        id: "s3",
        category: "social",
        title: "Stranger anxiety",
        description: "Baby shows wariness or anxiety around unfamiliar people.",
        typicalAgeRange: [6, 9],
        completed: completedMilestones.includes("s3"),
      },
      {
        id: "s4",
        category: "social",
        title: "Plays interactive games",
        description: "Baby engages in games like peek-a-boo or pat-a-cake.",
        typicalAgeRange: [7, 10],
        completed: completedMilestones.includes("s4"),
      },
      {
        id: "s5",
        category: "social",
        title: "Waves bye-bye",
        description: "Baby waves in response to someone saying 'bye-bye'.",
        typicalAgeRange: [8, 11],
        completed: completedMilestones.includes("s5"),
      },

      // Language milestones
      {
        id: "l1",
        category: "language",
        title: "Coos and gurgles",
        description: "Baby makes vowel sounds like 'ooh' and 'aah'.",
        typicalAgeRange: [1, 3],
        completed: completedMilestones.includes("l1"),
      },
      {
        id: "l2",
        category: "language",
        title: "Babbles",
        description: "Baby makes consonant sounds like 'ba', 'da', 'ga'.",
        typicalAgeRange: [4, 6],
        completed: completedMilestones.includes("l2"),
      },
      {
        id: "l3",
        category: "language",
        title: "Responds to name",
        description: "Baby turns head when name is called.",
        typicalAgeRange: [5, 8],
        completed: completedMilestones.includes("l3"),
      },
      {
        id: "l4",
        category: "language",
        title: "Understands 'no'",
        description: "Baby shows understanding when told 'no'.",
        typicalAgeRange: [7, 9],
        completed: completedMilestones.includes("l4"),
      },
      {
        id: "l5",
        category: "language",
        title: "First word",
        description: "Baby says first recognizable word (may be 'mama' or 'dada').",
        typicalAgeRange: [10, 14],
        completed: completedMilestones.includes("l5"),
      },
    ]
  }

  const allMilestones = getMilestones()

  // Filter milestones by category
  const getMilestonesByCategory = (category: string) => {
    return allMilestones.filter((milestone) => milestone.category === category)
  }

  // Get upcoming milestones (not completed and within 3 months of current age)
  const getUpcomingMilestones = () => {
    return allMilestones
      .filter(
        (milestone) =>
          !milestone.completed &&
          milestone.typicalAgeRange[0] <= babyAge + 3 &&
          milestone.typicalAgeRange[0] >= babyAge - 1,
      )
      .sort((a, b) => a.typicalAgeRange[0] - b.typicalAgeRange[0])
  }

  // Get completed milestones
  const getCompletedMilestones = () => {
    return allMilestones.filter((milestone) => milestone.completed)
  }

  // Get overdue milestones (not completed and past typical age range)
  const getOverdueMilestones = () => {
    return allMilestones.filter(
      (milestone) => !milestone.completed && babyAge > milestone.typicalAgeRange[1] + 2, // Adding buffer of 2 months
    )
  }

  const upcomingMilestones = getUpcomingMilestones()
  const completedMilestonesCount = getCompletedMilestones().length
  const overdueMilestones = getOverdueMilestones()

  // Calculate milestone progress
  const calculateMilestoneProgress = () => {
    const expectedMilestones = allMilestones.filter((milestone) => milestone.typicalAgeRange[1] <= babyAge).length

    return {
      completed: completedMilestonesCount,
      expected: expectedMilestones,
      percentage: expectedMilestones > 0 ? (completedMilestonesCount / expectedMilestones) * 100 : 0,
    }
  }

  const milestoneProgress = calculateMilestoneProgress()

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Calculate estimated date for a milestone
  const getEstimatedDate = (ageInMonths: number) => {
    const date = new Date(birthDate)
    date.setMonth(date.getMonth() + ageInMonths)
    return formatDate(date)
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Growth & Milestone Predictor
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {babyAge} months old
          </Badge>
        </div>
        <CardDescription>Track growth patterns and upcoming developmental milestones</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="growth" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictedGrowth} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" label={{ value: "Age (months)", position: "insideBottom", offset: -5 }} />
                    <YAxis yAxisId="weight" label={{ value: "Weight (lbs)", angle: -90, position: "insideLeft" }} />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value} ${name === "weight" ? "lbs" : name === "height" ? "in" : "in"}`,
                        name,
                      ]}
                    />
                    <Legend />
                    <Line
                      yAxisId="weight"
                      type="monotone"
                      dataKey="weight"
                      name="Weight"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <ReferenceLine x={babyAge} stroke="#888" strokeDasharray="3 3" />
                    {/* Future predictions with dashed line */}
                    <Line
                      yAxisId="weight"
                      type="monotone"
                      dataKey="weight"
                      name="Predicted Weight"
                      stroke="#8884d8"
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={false}
                      activeDot={false}
                      data={predictedGrowth.filter((d) => d.age > babyAge)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Current Weight</div>
                  <div className="text-xl font-semibold">{currentGrowth.weight} lbs</div>
                  <div className="text-xs text-slate-500">{percentiles.weightPercentile}th percentile</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Current Height</div>
                  <div className="text-xl font-semibold">{currentGrowth.height} in</div>
                  <div className="text-xs text-slate-500">{percentiles.heightPercentile}th percentile</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Head Circumference</div>
                  <div className="text-xl font-semibold">{currentGrowth.headCircumference} in</div>
                  <div className="text-xs text-slate-500">{percentiles.headPercentile}th percentile</div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <Info className="h-4 w-4" />
                  Growth Prediction
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1 mb-2">
                  Based on your baby's current growth curve, we predict they'll reach approximately{" "}
                  {predictedGrowth[predictedGrowth.length - 1].weight} lbs by {babyAge + 3} months.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white dark:bg-slate-800">
                  View Detailed Growth Charts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="milestones" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Milestone Progress</span>
                  <span className="text-xs text-slate-500">
                    {milestoneProgress.completed} / {milestoneProgress.expected} expected milestones
                  </span>
                </div>
                <Progress value={milestoneProgress.percentage} className="h-2" />
              </div>

              <div>
                <h3 className="font-medium mb-3">Upcoming Milestones</h3>
                <div className="space-y-3">
                  {upcomingMilestones.length > 0 ? (
                    upcomingMilestones.slice(0, 3).map((milestone) => (
                      <div key={milestone.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-yellow-800 dark:text-yellow-300">{milestone.title}</h4>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">{milestone.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-white dark:bg-slate-800 whitespace-nowrap ml-2">
                            {milestone.typicalAgeRange[0]}-{milestone.typicalAgeRange[1]} mo
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-yellow-600 dark:text-yellow-500">
                          <Calendar className="h-3 w-3" />
                          Est: {getEstimatedDate(milestone.typicalAgeRange[0])} -{" "}
                          {getEstimatedDate(milestone.typicalAgeRange[1])}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-4 text-slate-500 dark:text-slate-400">
                      No upcoming milestones in the next 3 months.
                    </div>
                  )}
                </div>
              </div>

              {overdueMilestones.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Milestones to Watch
                  </h3>
                  <div className="space-y-3">
                    {overdueMilestones.slice(0, 2).map((milestone) => (
                      <div key={milestone.id} className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-300">{milestone.title}</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">{milestone.description}</p>
                          </div>
                          <Badge variant="outline" className="bg-white dark:bg-slate-800 whitespace-nowrap ml-2">
                            {milestone.typicalAgeRange[0]}-{milestone.typicalAgeRange[1]} mo
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-amber-600 dark:text-amber-500">
                          <Info className="h-3 w-3" />
                          Typically achieved by {milestone.typicalAgeRange[1]} months
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Recently Completed
                </h3>
                <div className="space-y-3">
                  {getCompletedMilestones().length > 0 ? (
                    getCompletedMilestones()
                      .slice(0, 2)
                      .map((milestone) => (
                        <div key={milestone.id} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <h4 className="font-medium text-green-800 dark:text-green-300">{milestone.title}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-green-600 dark:text-green-500">
                            <Check className="h-3 w-3" />
                            Completed
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center p-4 text-slate-500 dark:text-slate-400">
                      No completed milestones yet.
                    </div>
                  )}
                </div>
              </div>

              <Button className="w-full">
                View All Milestones
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
