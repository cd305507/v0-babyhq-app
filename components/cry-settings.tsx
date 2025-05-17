"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Settings, Shield, Download, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CrySettingsProps {
  autoDetectionEnabled: boolean
  setAutoDetectionEnabled: (enabled: boolean) => void
  sensitivityLevel: number[]
  setSensitivityLevel: (level: number[]) => void
}

export function CrySettings({
  autoDetectionEnabled,
  setAutoDetectionEnabled,
  sensitivityLevel,
  setSensitivityLevel,
}: CrySettingsProps) {
  const { toast } = useToast()

  const handleReset = () => {
    setAutoDetectionEnabled(false)
    setSensitivityLevel([70])
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values",
    })
  }

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your cry detection settings have been saved",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-slate-500" />
            Detection Settings
          </CardTitle>
          <CardDescription>Configure how the cry detection feature works</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Auto Detection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-Detection</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Automatically detect and analyze crying</p>
              </div>
              <Switch checked={autoDetectionEnabled} onCheckedChange={setAutoDetectionEnabled} />
            </div>

            {autoDetectionEnabled && (
              <div className="space-y-4 pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="sensitivity">Detection Sensitivity</Label>
                    <span className="text-sm font-medium">{sensitivityLevel}%</span>
                  </div>
                  <Slider
                    id="sensitivity"
                    value={sensitivityLevel}
                    onValueChange={setSensitivityLevel}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Higher sensitivity may detect more cries but could include other sounds
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detection-mode">Detection Mode</Label>
                  <RadioGroup defaultValue="standard" id="detection-mode">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard (Balanced accuracy and battery usage)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high-accuracy" id="high-accuracy" />
                      <Label htmlFor="high-accuracy">High Accuracy (Higher battery usage)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="battery-saver" id="battery-saver" />
                      <Label htmlFor="battery-saver">Battery Saver (Lower accuracy)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiet-period">Quiet Period</Label>
                  <div className="flex items-center gap-2">
                    <Input id="quiet-period" type="number" defaultValue={5} min={0} max={60} className="w-20" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">minutes between alerts</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Minimum time between cry alerts to prevent notification fatigue
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-medium">Notifications</h3>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="cry-alerts" className="text-base font-normal">
                  Cry Alerts
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Get notified when a cry is detected</p>
              </div>
              <Switch id="cry-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="unusual-alerts" className="text-base font-normal">
                  Unusual Cry Alerts
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Get notified for unusual cry patterns</p>
              </div>
              <Switch id="unusual-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="summary-alerts" className="text-base font-normal">
                  Daily Summary
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Receive a daily summary of cry patterns</p>
              </div>
              <Switch id="summary-alerts" />
            </div>
          </div>

          {/* Audio Settings */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-medium">Audio Settings</h3>

            <div className="space-y-2">
              <Label htmlFor="recording-quality">Recording Quality</Label>
              <RadioGroup defaultValue="medium" id="recording-quality">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low (Smaller file size)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (Balanced)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High (Better analysis)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="save-recordings" className="text-base font-normal">
                  Save Audio Recordings
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">Store cry audio for later review</p>
              </div>
              <Switch id="save-recordings" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="background-noise" className="text-base font-normal">
                  Background Noise Filtering
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Filter out ambient sounds for better analysis
                </p>
              </div>
              <Switch id="background-noise" defaultChecked />
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-medium">Privacy & Security</h3>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="local-processing" className="text-base font-normal">
                  Local Processing
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Process audio on-device without cloud upload
                </p>
              </div>
              <Switch id="local-processing" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection" className="text-base font-normal">
                  Anonymous Data Collection
                </Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Help improve cry detection by sharing anonymous data
                </p>
              </div>
              <Switch id="data-collection" />
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-300">Privacy First</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Your baby's cry audio is processed securely. With local processing enabled, audio never leaves your
                    device. We prioritize your family's privacy and security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-medium">Data Management</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Cry History
              </Button>

              <Button
                variant="outline"
                className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete All Recordings
              </Button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Deleting recordings will remove all audio files but keep the cry analysis data. To delete all data, go to
              Account Settings &gt; Data &amp; Privacy.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}
