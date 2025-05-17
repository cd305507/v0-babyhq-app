import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Moon, Clock, Calendar, Info, History, Settings } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { SweetSpotPredictor } from "@/components/sweet-spot-predictor"

export default function SweetSpotPage() {
  // For demo purposes, we'll use a 4-month-old baby
  const demoAgeInMonths = 4

  // Mock data for recent naps
  const recentNaps = [
    {
      start: new Date(new Date().setHours(new Date().getHours() - 26)),
      end: new Date(new Date().setHours(new Date().getHours() - 24.5)),
      quality: "good" as const,
    },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 22)),
      end: new Date(new Date().setHours(new Date().getHours() - 21)),
      quality: "fair" as const,
    },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 18)),
      end: new Date(new Date().setHours(new Date().getHours() - 16.5)),
      quality: "good" as const,
    },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 14)),
      end: new Date(new Date().setHours(new Date().getHours() - 13)),
      quality: "poor" as const,
    },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 10)),
      end: new Date(new Date().setHours(new Date().getHours() - 9)),
      quality: "fair" as const,
    },
    {
      start: new Date(new Date().setHours(new Date().getHours() - 6)),
      end: new Date(new Date().setHours(new Date().getHours() - 5)),
      quality: "good" as const,
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">SweetSpot™ Nap Predictor</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Predict the ideal nap window before your baby becomes overtired
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <SweetSpotPredictor
            babyAge={demoAgeInMonths}
            lastWakeTime={new Date(new Date().setHours(new Date().getHours() - 1))}
            recentNaps={recentNaps}
          />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                About SweetSpot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                SweetSpot™ uses your baby's age, recent sleep patterns, and wake windows to predict the optimal time for
                the next nap, helping you put your baby down before they become overtired.
              </p>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">How it works:</h3>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
                  <li>Analyzes your baby's age-appropriate wake windows</li>
                  <li>Learns from your baby's individual sleep patterns</li>
                  <li>Adjusts predictions based on recent nap quality and duration</li>
                  <li>Provides a 15-30 minute window for optimal nap timing</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize SweetSpot Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="today" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-4 w-full max-w-md">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                Today's Nap Schedule
              </CardTitle>
              <CardDescription>Actual and predicted nap times for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-800 pb-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-indigo-500"></div>
                  <div className="mb-1 text-sm font-medium">Morning Wake-Up</div>
                  <div className="text-xs text-slate-500">6:30 AM</div>
                </div>

                <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-800 pb-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-indigo-500"></div>
                  <div className="mb-1 text-sm font-medium flex items-center gap-2">
                    Morning Nap
                    <Badge variant="outline" className="font-normal">
                      Completed
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">8:00 AM - 9:30 AM (1h 30m)</div>
                  <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Moon className="h-3 w-3" />
                    SweetSpot: 8:00 AM - 8:30 AM
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-800 pb-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-indigo-500"></div>
                  <div className="mb-1 text-sm font-medium">Mid-Morning Wake</div>
                  <div className="text-xs text-slate-500">9:30 AM</div>
                </div>

                <div className="relative pl-6 border-l-2 border-green-200 dark:border-green-800 pb-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="mb-1 text-sm font-medium flex items-center gap-2">
                    Afternoon Nap
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 font-normal">
                      Active Now
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">11:30 AM - ? (In progress)</div>
                  <div className="mt-1 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Moon className="h-3 w-3" />
                    SweetSpot: 11:15 AM - 11:45 AM
                  </div>
                </div>

                <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800 pb-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-blue-500"></div>
                  <div className="mb-1 text-sm font-medium flex items-center gap-2">
                    Late Afternoon Nap
                    <Badge variant="outline" className="font-normal">
                      Upcoming
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">Estimated: 2:30 PM - 3:30 PM</div>
                  <div className="mt-1 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Moon className="h-3 w-3" />
                    Predicted SweetSpot: 2:15 PM - 2:45 PM
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-purple-500"></div>
                  <div className="mb-1 text-sm font-medium">Bedtime</div>
                  <div className="text-xs text-slate-500">Estimated: 7:00 PM</div>
                  <div className="mt-1 text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Moon className="h-3 w-3" />
                    Recommended: 6:45 PM - 7:15 PM
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-slate-500" />
                Nap History
              </CardTitle>
              <CardDescription>Recent nap patterns and SweetSpot accuracy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <History className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nap History</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  View your baby's nap history and how well the SweetSpot predictions matched actual nap times.
                </p>
                <Button>View Detailed History</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                Sleep Patterns
              </CardTitle>
              <CardDescription>Identified patterns in your baby's sleep</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Sleep Pattern Analysis</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-4">
                  Analyze your baby's sleep patterns to identify trends and optimize nap schedules.
                </p>
                <Button>View Pattern Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
