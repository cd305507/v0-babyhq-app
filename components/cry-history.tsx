"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, Info, Edit, Save } from "lucide-react"

interface CryHistoryProps {
  cryHistory: Array<{
    id: number
    timestamp: Date
    duration: number
    type: string
    confidence: number
    notes: string
  }>
  cryTypes: Record<string, any>
  onSaveNotes: (id: number, notes: string) => void
}

export function CryHistory({ cryHistory, cryTypes, onSaveNotes }: CryHistoryProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [editingNotes, setEditingNotes] = useState<{ id: number; notes: string } | null>(null)
  const [selectedCry, setSelectedCry] = useState<(typeof cryHistory)[0] | null>(null)

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Filter history based on active tab
  const filteredHistory = activeTab === "all" ? cryHistory : cryHistory.filter((cry) => cry.type === activeTab)

  // Group by date
  const groupedHistory = filteredHistory.reduce(
    (groups, cry) => {
      const date = cry.timestamp.toLocaleDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(cry)
      return groups
    },
    {} as Record<string, typeof cryHistory>,
  )

  // Handle notes editing
  const handleEditNotes = (id: number, currentNotes: string) => {
    setEditingNotes({ id, notes: currentNotes })
  }

  const handleSaveNotes = () => {
    if (editingNotes) {
      onSaveNotes(editingNotes.id, editingNotes.notes)
      setEditingNotes(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Cry History
          </CardTitle>
          <CardDescription>Review past cry events and your notes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Types</TabsTrigger>
              {Object.keys(cryTypes).map((type) => (
                <TabsTrigger key={type} value={type}>
                  {cryTypes[type].title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="space-y-6">
            {Object.keys(groupedHistory).length > 0 ? (
              Object.entries(groupedHistory).map(([date, cries]) => (
                <div key={date} className="space-y-3">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </h3>
                  <div className="space-y-2">
                    {cries.map((cry) => (
                      <div
                        key={cry.id}
                        className={`p-4 rounded-lg border ${cryTypes[cry.type]?.color || "bg-slate-100 dark:bg-slate-800"}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{cryTypes[cry.type]?.title || "Unknown"}</h4>
                          <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                            {cry.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs mb-3">
                          <Clock className="h-3 w-3" />
                          <span>
                            {cry.timestamp.toLocaleTimeString()} • {formatTime(cry.duration)} duration
                          </span>
                        </div>

                        {cry.notes && (
                          <div className="bg-white/50 dark:bg-slate-900/50 p-2 rounded text-sm mb-3">{cry.notes}</div>
                        )}

                        <div className="flex justify-between items-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedCry(cry)}>
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              {selectedCry && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle>Cry Details</DialogTitle>
                                    <DialogDescription>
                                      {new Date(selectedCry.timestamp).toLocaleString()}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 py-4">
                                    <div
                                      className={`p-4 rounded-lg ${cryTypes[selectedCry.type]?.color || "bg-slate-100 dark:bg-slate-800"}`}
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold">{cryTypes[selectedCry.type]?.title || "Unknown"}</h3>
                                        <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                                          {selectedCry.confidence}% confidence
                                        </Badge>
                                      </div>
                                      <p className="text-sm mb-2">{cryTypes[selectedCry.type]?.description}</p>
                                      <div className="flex items-center gap-2 text-xs">
                                        <Clock className="h-3 w-3" />
                                        <span>{formatTime(selectedCry.duration)} duration</span>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Suggested Actions:</h4>
                                      <ul className="space-y-2">
                                        {cryTypes[selectedCry.type]?.suggestions.map(
                                          (suggestion: string, index: number) => (
                                            <li key={index} className="flex items-start gap-2 text-sm">
                                              <div className="h-5 w-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-xs">
                                                {index + 1}
                                              </div>
                                              <span>{suggestion}</span>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-2">Your Notes:</h4>
                                      {editingNotes?.id === selectedCry.id ? (
                                        <div className="space-y-2">
                                          <Textarea
                                            value={editingNotes.notes}
                                            onChange={(e) =>
                                              setEditingNotes({ ...editingNotes, notes: e.target.value })
                                            }
                                            placeholder="Add your observations or what worked to soothe your baby..."
                                          />
                                          <Button size="sm" onClick={handleSaveNotes}>
                                            <Save className="h-4 w-4 mr-1" />
                                            Save Notes
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="flex justify-between items-start">
                                          <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded text-sm w-full min-h-[60px]">
                                            {selectedCry.notes || "No notes added yet."}
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditNotes(selectedCry.id, selectedCry.notes)}
                                            className="ml-2"
                                          >
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="sm" onClick={() => handleEditNotes(cry.id, cry.notes)}>
                            <Edit className="h-4 w-4 mr-1" />
                            {cry.notes ? "Edit Notes" : "Add Notes"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No cry events found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activeTab === "all"
                    ? "You haven't recorded any cry events yet."
                    : `No ${cryTypes[activeTab]?.title.toLowerCase()} cries have been recorded.`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes editing dialog */}
      {editingNotes && (
        <Dialog open={!!editingNotes} onOpenChange={(open) => !open && setEditingNotes(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Notes</DialogTitle>
              <DialogDescription>Add your observations or what worked to soothe your baby</DialogDescription>
            </DialogHeader>
            <Textarea
              value={editingNotes.notes}
              onChange={(e) => setEditingNotes({ ...editingNotes, notes: e.target.value })}
              placeholder="E.g., Baby calmed down after feeding, Diaper was wet, Fell asleep after rocking..."
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
