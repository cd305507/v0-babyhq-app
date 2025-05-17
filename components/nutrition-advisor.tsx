"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Utensils, AlertCircle, Info, Apple, Beef, CroissantIcon as Bread, Carrot, Egg, ArrowRight } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface NutritionData {
  date: string
  breastMilk: number // in oz or minutes
  formula: number // in oz
  solids: {
    fruits: number // number of servings
    vegetables: number
    proteins: number
    grains: number
    dairy: number
  }
}

interface NutritionAdvisorProps {
  babyAge: number // in months
  weight?: number // in lbs
  nutritionData?: NutritionData[]
}

export function NutritionAdvisor({ babyAge, weight = 15, nutritionData = [] }: NutritionAdvisorProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Generate mock nutrition data if none provided
  const getNutritionData = (): NutritionData[] => {
    if (nutritionData.length > 0) return nutritionData

    // Generate last 7 days of mock data
    const mockData: NutritionData[] = []
    const today = new Date()

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Randomize nutrition data within reasonable ranges
      const breastMilk = babyAge < 6 ? 20 + Math.random() * 10 : 15 + Math.random() * 8
      const formula = babyAge < 6 ? Math.random() * 5 : Math.random() * 10

      // Solids increase with age
      const solidsFactor = Math.max(0, (babyAge - 4) / 8) // 0 at 4mo, 0.5 at 8mo, 1 at 12mo

      mockData.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        breastMilk,
        formula,
        solids: {
          fruits: Math.round(solidsFactor * (1 + Math.random())),
          vegetables: Math.round(solidsFactor * (1 + Math.random())),
          proteins: Math.round(solidsFactor * (0.5 + Math.random())),
          grains: Math.round(solidsFactor * (0.5 + Math.random())),
          dairy: Math.round(solidsFactor * (0.5 + Math.random())),
        },
      })
    }

    return mockData
  }

  const data = getNutritionData()
  const today = data[data.length - 1]

  // Calculate nutrition metrics
  const calculateMetrics = () => {
    // Calculate milk intake
    const avgBreastMilk = data.reduce((sum, day) => sum + day.breastMilk, 0) / data.length
    const avgFormula = data.reduce((sum, day) => sum + day.formula, 0) / data.length
    const totalMilk = today.breastMilk + today.formula

    // Calculate recommended milk intake based on age and weight
    let recommendedMilk = 0
    if (babyAge < 6) {
      // 2.5 oz per pound of body weight for young babies
      recommendedMilk = weight * 2.5
    } else if (babyAge < 9) {
      // Gradually decreasing as solids increase
      recommendedMilk = weight * 2.2
    } else {
      recommendedMilk = weight * 1.8
    }

    // Calculate solid food metrics
    const totalSolids = Object.values(today.solids).reduce((sum, val) => sum + val, 0)

    // Recommended solids servings based on age
    let recommendedSolids = 0
    if (babyAge >= 6 && babyAge < 8) {
      recommendedSolids = 2
    } else if (babyAge >= 8 && babyAge < 10) {
      recommendedSolids = 3
    } else if (babyAge >= 10) {
      recommendedSolids = 4
    }

    return {
      avgBreastMilk: avgBreastMilk.toFixed(1),
      avgFormula: avgFormula.toFixed(1),
      totalMilk,
      recommendedMilk,
      milkPercentage: (totalMilk / recommendedMilk) * 100,
      totalSolids,
      recommendedSolids,
      solidsPercentage: recommendedSolids > 0 ? (totalSolids / recommendedSolids) * 100 : 0,
    }
  }

  const metrics = calculateMetrics()

  // Prepare data for pie chart
  const getSolidsFoodData = () => {
    return [
      { name: "Fruits", value: today.solids.fruits, color: "#f59e0b" },
      { name: "Vegetables", value: today.solids.vegetables, color: "#10b981" },
      { name: "Proteins", value: today.solids.proteins, color: "#6366f1" },
      { name: "Grains", value: today.solids.grains, color: "#d97706" },
      { name: "Dairy", value: today.solids.dairy, color: "#60a5fa" },
    ].filter((item) => item.value > 0)
  }

  const solidsFoodData = getSolidsFoodData()

  // Generate nutrition insights
  const getNutritionInsights = () => {
    const insights = []

    // Milk intake insights
    if (metrics.milkPercentage < 80) {
      insights.push({
        type: "warning",
        icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
        title: "Low Milk Intake",
        content: `Today's milk intake (${metrics.totalMilk.toFixed(1)} oz) is below the recommended amount (${metrics.recommendedMilk.toFixed(1)} oz) for your baby's weight.`,
      })
    } else if (metrics.milkPercentage > 120) {
      insights.push({
        type: "info",
        icon: <Info className="h-4 w-4 text-blue-500" />,
        title: "High Milk Intake",
        content: `Today's milk intake (${metrics.totalMilk.toFixed(1)} oz) is above the recommended amount (${metrics.recommendedMilk.toFixed(1)} oz). This may reduce appetite for solids.`,
      })
    } else {
      insights.push({
        type: "success",
        icon: <Utensils className="h-4 w-4 text-green-500" />,
        title: "Optimal Milk Intake",
        content: `Today's milk intake (${metrics.totalMilk.toFixed(1)} oz) is within the recommended range for your baby's weight.`,
      })
    }

    // Solids insights based on age
    if (babyAge >= 6) {
      if (metrics.solidsPercentage < 70) {
        insights.push({
          type: "warning",
          icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
          title: "Solids Intake",
          content: `Your baby had ${metrics.totalSolids} solid food servings today. Consider gradually increasing to ${metrics.recommendedSolids} servings for their age.`,
        })
      }

      // Food variety insights
      const foodGroups = Object.keys(today.solids).filter(
        (group) => today.solids[group as keyof typeof today.solids] > 0,
      ).length
      if (foodGroups < 3 && babyAge >= 8) {
        insights.push({
          type: "info",
          icon: <Info className="h-4 w-4 text-blue-500" />,
          title: "Food Variety",
          content: "Try to include more variety in solid foods. Aim for at least 3-4 different food groups daily.",
        })
      }
    }

    return insights
  }

  const insights = getNutritionInsights()

  // Food introduction recommendations based on age
  const getFoodRecommendations = () => {
    if (babyAge < 4) {
      return {
        current: "Breast milk or formula only",
        next: "Wait until 4-6 months before introducing solids",
        readySigns: [
          "Can hold head up steadily",
          "Shows interest in food",
          "Has doubled birth weight",
          "Can sit with support",
        ],
      }
    } else if (babyAge < 6) {
      return {
        current: "Breast milk or formula primarily",
        next: "Single-grain cereals, pureed fruits and vegetables",
        readySigns: [
          "Can sit with minimal support",
          "Has good head control",
          "Shows interest in food",
          "Opens mouth when food approaches",
          "Can move food from spoon to throat",
        ],
      }
    } else if (babyAge < 8) {
      return {
        current: "Pureed fruits, vegetables, and grains",
        next: "Mashed foods, soft finger foods, pureed meats",
        foods: [
          { name: "Sweet Potato", icon: <Carrot className="h-4 w-4 text-orange-500" /> },
          { name: "Banana", icon: <Apple className="h-4 w-4 text-yellow-500" /> },
          { name: "Avocado", icon: <Apple className="h-4 w-4 text-green-500" /> },
          { name: "Oatmeal", icon: <Bread className="h-4 w-4 text-amber-500" /> },
        ],
      }
    } else if (babyAge < 10) {
      return {
        current: "Mashed foods and soft finger foods",
        next: "Chopped foods, more protein sources",
        foods: [
          { name: "Yogurt", icon: <Utensils className="h-4 w-4 text-blue-500" /> },
          { name: "Soft Fruits", icon: <Apple className="h-4 w-4 text-red-500" /> },
          { name: "Pasta", icon: <Bread className="h-4 w-4 text-amber-500" /> },
          { name: "Tofu", icon: <Beef className="h-4 w-4 text-green-500" /> },
        ],
      }
    } else {
      return {
        current: "Chopped table foods, finger foods",
        next: "More textured foods, wider variety",
        foods: [
          { name: "Eggs", icon: <Egg className="h-4 w-4 text-yellow-500" /> },
          { name: "Cheese", icon: <Utensils className="h-4 w-4 text-yellow-500" /> },
          { name: "Beans", icon: <Beef className="h-4 w-4 text-amber-500" /> },
          { name: "Fish", icon: <Beef className="h-4 w-4 text-blue-500" /> },
        ],
      }
    }
  }

  const recommendations = getFoodRecommendations()

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Utensils className="h-5 w-5 text-purple-500" />
            Nutrition Advisor
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {babyAge < 6 ? "Milk-Based" : "Mixed Feeding"}
          </Badge>
        </div>
        <CardDescription>Personalized nutrition guidance for {babyAge} months</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="solids">Solids</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Today's Milk</div>
                  <div className="text-xl font-semibold">{metrics.totalMilk.toFixed(1)} oz</div>
                  <div className="text-xs text-slate-500">
                    {today.breastMilk.toFixed(1)} oz breast milk + {today.formula.toFixed(1)} oz formula
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Solid Foods</div>
                  <div className="text-xl font-semibold">{metrics.totalSolids} servings</div>
                  <div className="text-xs text-slate-500">
                    {babyAge < 6 ? "Not yet recommended" : `${metrics.recommendedSolids} recommended`}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Milk Intake vs. Recommended</span>
                  <span className="text-xs text-slate-500">
                    {metrics.totalMilk.toFixed(1)} / {metrics.recommendedMilk.toFixed(1)} oz
                  </span>
                </div>
                <Progress
                  value={Math.min(100, metrics.milkPercentage)}
                  className={`h-2 ${
                    metrics.milkPercentage < 80
                      ? "bg-amber-100 dark:bg-amber-900/30"
                      : metrics.milkPercentage > 120
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-green-100 dark:bg-green-900/30"
                  }`}
                />
                <div
                  className={`text-xs ${
                    metrics.milkPercentage < 80
                      ? "text-amber-600 dark:text-amber-400"
                      : metrics.milkPercentage > 120
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {metrics.milkPercentage < 80
                    ? "Below recommended range"
                    : metrics.milkPercentage > 120
                      ? "Above recommended range"
                      : "Within recommended range"}
                </div>
              </div>

              {babyAge >= 6 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Solid Foods vs. Recommended</span>
                    <span className="text-xs text-slate-500">
                      {metrics.totalSolids} / {metrics.recommendedSolids} servings
                    </span>
                  </div>
                  <Progress value={Math.min(100, metrics.solidsPercentage)} className="h-2" />
                </div>
              )}

              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      insight.type === "success"
                        ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                        : insight.type === "warning"
                          ? "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
                          : "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
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

        <TabsContent value="solids" className="m-0">
          <CardContent className="p-4">
            {babyAge < 6 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Utensils className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-medium mb-2">Solids Not Yet Recommended</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-4">
                  Most babies are ready to start solid foods around 6 months of age. Continue with breast milk or
                  formula as the primary source of nutrition.
                </p>
                <Button variant="outline" size="sm">
                  Learn About Readiness Signs
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={solidsFoodData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {solidsFoodData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(today.solids).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{key}</div>
                      <div className="text-xl font-semibold">
                        {value} {value === 1 ? "serving" : "servings"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 text-blue-800 dark:text-blue-300">
                    <Info className="h-4 w-4" />
                    Food Exposure Tracking
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1 mb-2">
                    Tracking food exposures helps monitor for allergies and build variety in your baby's diet.
                  </p>
                  <Button variant="outline" size="sm" className="w-full bg-white dark:bg-slate-800">
                    Track New Food Exposure
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>

        <TabsContent value="recommendations" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium text-purple-800 dark:text-purple-300">Current Stage ({babyAge} months)</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">{recommendations.current}</p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Coming Up Next</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">{recommendations.next}</p>
              </div>

              {recommendations.readySigns && (
                <div>
                  <h3 className="font-medium mb-2">Readiness Signs for Solids</h3>
                  <ul className="space-y-2">
                    {recommendations.readySigns.map((sign, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.foods && (
                <div>
                  <h3 className="font-medium mb-2">Foods to Try Now</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {recommendations.foods.map((food, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        {food.icon}
                        <span className="text-sm">{food.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full">View Full Feeding Guide for {babyAge} Months</Button>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
