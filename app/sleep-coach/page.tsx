import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Moon, Clock, Calendar, BarChart, ArrowRight, Settings } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { AISleepCoach } from "@/components/ai-sleep-coach"

export default function SleepCoachPage() {
  // For demo purposes, we'll use a 4-month-old baby
  const demoAgeInMonths = 4

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">AI Sleep Coach</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Personalized sleep insights and recommendations for your baby
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AISleepCoach babyAge={demoAgeInMonths} />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                About Sleep Coach
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                The AI Sleep Coach analyzes your baby's sleep patterns and provides personalized recommendations to
                improve sleep quality and duration.
              </p>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Features:</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
                  <li>Weekly sleep analysis and insights</li>
                  <li>Age-appropriate sleep recommendations</li>
                  <li>Personalized tips for sleep challenges</li>
                  <li>Interactive AI chat for sleep questions</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <BarChart className="h-4 w-4 mr-2" />
                View Detailed Sleep Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="insights" className="mb-8">
        <TabsList className="grid grid-cols-4 mb-4 w-full max-w-md">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-indigo-500" />
                  Sleep Quality Analysis
                </CardTitle>
                <CardDescription>Based on the last 7 days of sleep data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                    <h3 className="font-medium text-indigo-800 dark:text-indigo-300">Night Sleep</h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                      Average: 9.2 hours (Recommended: 10-12 hours)
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-medium text-blue-800 dark:text-blue-300">Nap Sleep</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Average: 2.8 hours across 3 naps (Recommended: 3-4 hours)
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h3 className="font-medium text-amber-800 dark:text-amber-300">Night Wakings</h3>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      Average: 2.3 wakings per night (Typical for 4 months)
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Detailed Analysis
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  Sleep Schedule Optimization
                </CardTitle>
                <CardDescription>Recommended adjustments to improve sleep</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-300">Bedtime</h3>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      Current: 8:15 PM | Recommended: 7:30-7:45 PM
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="font-medium text-purple-800 dark:text-purple-300">Wake Windows</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                      Current: 1.5-2.5 hours | Recommended: 1.5-2 hours
                    </p>
                  </div>

                  <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <h3 className="font-medium text-cyan-800 dark:text-cyan-300">Nap Schedule</h3>
                    <p className="text-sm text-cyan-700 dark:text-cyan-400 mt-1">
                      Recommendation: Cap last nap by 5:00 PM to protect night sleep
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Generate Optimized Schedule
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-slate-500" />
                Sleep Trends
              </CardTitle>
              <CardDescription>Long-term sleep patterns and development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sleep Trend Analysis</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Track how your baby's sleep patterns evolve over time and through developmental stages.
                </p>
                <Button>View Sleep Trends</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-slate-500" />
                Personalized Sleep Tips
              </CardTitle>
              <CardDescription>Customized advice for your baby's sleep challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sleep Tips Library</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Browse our library of sleep tips and techniques tailored to your baby's age and sleep patterns.
                </p>
                <Button>Explore Sleep Tips</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-slate-500" />
                Sleep Resources
              </CardTitle>
              <CardDescription>Expert guides and tools for better baby sleep</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Moon className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sleep Resources</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Access expert guides, articles, and tools to help your baby sleep better.
                </p>
                <Button>Browse Resources</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
