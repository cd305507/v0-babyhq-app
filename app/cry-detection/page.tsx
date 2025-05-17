"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Mic, MicOff, Volume2, Clock, Settings, Info, AlertTriangle, CheckCircle2, HelpCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { CryVisualizer } from "@/components/cry-visualizer"
import { CryHistory } from "@/components/cry-history"
import { CryInsights } from "@/components/cry-insights"
import { CrySettings } from "@/components/cry-settings"
import { useToast } from "@/hooks/use-toast"

// Cry types and their associated suggestions
const CRY_TYPES = {
  hunger: {
    title: "Hunger",
    description: "Rhythmic, persistent cry that may increase in intensity",
    suggestions: [
      "Try feeding your baby soon",
      "Check when the last feeding occurred",
      "Look for hunger cues like rooting or sucking on fists",
    ],
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
  },
  pain: {
    title: "Pain/Discomfort",
    description: "Sudden, high-pitched, intense cry",
    suggestions: [
      "Check for diaper rash or wet diaper",
      "Look for signs of physical discomfort",
      "Check for fever or other illness symptoms",
      "Examine for hair wrapped around fingers/toes",
    ],
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  },
  tired: {
    title: "Sleepiness/Tiredness",
    description: "Whiny, nasal cry, often with yawning or eye rubbing",
    suggestions: [
      "Consider putting baby down for a nap",
      "Create a calm environment",
      "Try gentle rocking or swaddling",
      "Check if baby has been awake longer than usual",
    ],
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300",
  },
  colic: {
    title: "Colic/Fussiness",
    description: "Intense, inconsolable crying, often in the evening",
    suggestions: [
      "Try soothing techniques like swaddling or rocking",
      "Use white noise or gentle motion",
      "Consider gentle tummy massage",
      "Hold baby in different positions",
    ],
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
  },
  bored: {
    title: "Boredom/Attention",
    description: "Intermittent, mild crying that stops with interaction",
    suggestions: [
      "Engage with your baby through talking or singing",
      "Offer age-appropriate toys or activities",
      "Change baby's environment or position",
    ],
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  },
  gas: {
    title: "Gas/Digestive",
    description: "Sharp cries with drawing up of legs and flushed face",
    suggestions: [
      "Try gentle bicycle leg movements",
      "Give a gentle tummy massage",
      "Hold baby upright to help release gas",
      "Consider burping techniques",
    ],
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  },
}

// Mock cry history data
const MOCK_CRY_HISTORY = [
  {
    id: 1,
    timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    duration: 180, // seconds
    type: "hunger",
    confidence: 87,
    notes: "Stopped after feeding",
  },
  {
    id: 2,
    timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000),
    duration: 120,
    type: "tired",
    confidence: 92,
    notes: "Fell asleep after rocking",
  },
  {
    id: 3,
    timestamp: new Date(new Date().getTime() - 8 * 60 * 60 * 1000),
    duration: 240,
    type: "colic",
    confidence: 78,
    notes: "Difficult to soothe, tried multiple techniques",
  },
  {
    id: 4,
    timestamp: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    duration: 90,
    type: "gas",
    confidence: 85,
    notes: "Relieved after bicycle legs",
  },
  {
    id: 5,
    timestamp: new Date(new Date().getTime() - 28 * 60 * 60 * 1000),
    duration: 150,
    type: "pain",
    confidence: 81,
    notes: "Diaper rash found",
  },
  {
    id: 6,
    timestamp: new Date(new Date().getTime() - 32 * 60 * 60 * 1000),
    duration: 60,
    type: "bored",
    confidence: 75,
    notes: "Stopped when given toy",
  },
]

export default function CryDetectionPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<null | {
    type: keyof typeof CRY_TYPES
    confidence: number
    timestamp: Date
    duration: number
  }>(null)
  const [cryHistory, setCryHistory] = useState(MOCK_CRY_HISTORY)
  const [autoDetectionEnabled, setAutoDetectionEnabled] = useState(false)
  const [sensitivityLevel, setSensitivityLevel] = useState([70])
  const [activeTab, setActiveTab] = useState("detect")
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  // Simulate recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else if (!isAnalyzing) {
      setRecordingTime(0)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording, isAnalyzing])

  // Handle start/stop recording
  const toggleRecording = () => {
    if (!isRecording) {
      // Request microphone permission in a real implementation
      setIsRecording(true)
      toast({
        title: "Recording started",
        description: "Listening for baby's cry...",
      })
    } else {
      setIsRecording(false)
      if (recordingTime >= 3) {
        // Only analyze if we have at least 3 seconds of audio
        analyzeCry()
      } else {
        toast({
          title: "Recording too short",
          description: "Please record for at least 3 seconds",
          variant: "destructive",
        })
      }
    }
  }

  // Simulate cry analysis
  const analyzeCry = () => {
    setIsAnalyzing(true)

    // Simulate processing delay
    setTimeout(() => {
      // Randomly select a cry type for demo purposes
      const cryTypes = Object.keys(CRY_TYPES) as Array<keyof typeof CRY_TYPES>
      const randomType = cryTypes[Math.floor(Math.random() * cryTypes.length)]
      const randomConfidence = Math.floor(Math.random() * 20) + 75 // 75-95% confidence

      const result = {
        type: randomType,
        confidence: randomConfidence,
        timestamp: new Date(),
        duration: recordingTime,
      }

      setAnalysisResult(result)
      setIsAnalyzing(false)

      // Add to history
      setCryHistory([
        {
          id: cryHistory.length + 1,
          timestamp: result.timestamp,
          duration: result.duration,
          type: result.type,
          confidence: result.confidence,
          notes: "",
        },
        ...cryHistory,
      ])

      toast({
        title: `Cry detected: ${CRY_TYPES[randomType].title}`,
        description: `${randomConfidence}% confidence`,
      })
    }, 2000)
  }

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle saving notes for a cry event
  const saveNotes = (id: number, notes: string) => {
    setCryHistory(cryHistory.map((cry) => (cry.id === id ? { ...cry, notes } : cry)))
    toast({
      title: "Notes saved",
      description: "Your notes have been saved for this cry event",
    })
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Cry Detection & Interpretation</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Record and analyze your baby's cries to understand their needs
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Info className="h-4 w-4 mr-2" />
            How It Works
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="detect">Detect & Analyze</TabsTrigger>
          <TabsTrigger value="history">Cry History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="detect">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5 text-purple-500" />
                    Cry Detector
                  </CardTitle>
                  <CardDescription>Record your baby's cry for analysis or enable auto-detection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Audio Visualizer */}
                  <div className="h-40 bg-slate-50 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <CryVisualizer isActive={isRecording} />
                  </div>

                  {/* Recording Controls */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="lg"
                        className={`rounded-full h-16 w-16 ${isRecording ? "bg-red-500 hover:bg-red-600" : ""}`}
                        onClick={toggleRecording}
                        disabled={isAnalyzing}
                      >
                        {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                      </Button>
                      {isRecording && (
                        <div className="flex items-center gap-2 ml-2">
                          <div className="animate-pulse h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="text-sm font-medium">Recording: {formatTime(recordingTime)}</span>
                        </div>
                      )}
                      {isAnalyzing && (
                        <div className="flex items-center gap-2 ml-2">
                          <div className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                          <span className="text-sm font-medium">Analyzing cry pattern...</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {isRecording
                        ? "Tap to stop recording"
                        : isAnalyzing
                          ? "Processing audio..."
                          : "Tap to start recording your baby's cry"}
                    </p>
                  </div>

                  {/* Auto-detection Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <h3 className="font-medium">Auto-Detection</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Automatically detect and analyze crying
                      </p>
                    </div>
                    <Switch checked={autoDetectionEnabled} onCheckedChange={setAutoDetectionEnabled} />
                  </div>

                  {autoDetectionEnabled && (
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Detection Sensitivity</h3>
                        <span className="text-sm font-medium">{sensitivityLevel}%</span>
                      </div>
                      <Slider value={sensitivityLevel} onValueChange={setSensitivityLevel} max={100} step={1} />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Higher sensitivity may detect more cries but could include other sounds
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    Cry Analysis
                  </CardTitle>
                  <CardDescription>
                    {analysisResult ? "Interpretation and suggestions" : "Record a cry to see analysis"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${CRY_TYPES[analysisResult.type].color}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{CRY_TYPES[analysisResult.type].title}</h3>
                          <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                            {analysisResult.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{CRY_TYPES[analysisResult.type].description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>
                            {formatTime(analysisResult.duration)} duration at{" "}
                            {analysisResult.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Suggested Actions:</h4>
                        <ul className="space-y-2">
                          {CRY_TYPES[analysisResult.type].suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-300">Important Note</h4>
                            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                              This analysis is an AI-powered interpretation and should be used as a guide only. Trust
                              your parental instincts and consult a healthcare provider if you're concerned.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Volume2 className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Cry Detected Yet</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                        Record your baby's cry using the microphone button to receive an analysis and suggestions
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <CryHistory cryHistory={cryHistory} cryTypes={CRY_TYPES} onSaveNotes={saveNotes} />
        </TabsContent>

        <TabsContent value="insights">
          <CryInsights cryHistory={cryHistory} cryTypes={CRY_TYPES} />
        </TabsContent>

        <TabsContent value="settings">
          <CrySettings
            autoDetectionEnabled={autoDetectionEnabled}
            setAutoDetectionEnabled={setAutoDetectionEnabled}
            sensitivityLevel={sensitivityLevel}
            setSensitivityLevel={setSensitivityLevel}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
