"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "lucide-react"
import { useBaby } from "@/contexts/baby-context"
import { useToast } from "@/hooks/use-toast"

export function BirthDateSettings() {
  const { birthDate, setBirthDate, babyName, setBabyName, isExpected } = useBaby()
  const { toast } = useToast()

  const [name, setName] = useState(babyName)
  const [date, setDate] = useState(birthDate.toISOString().split("T")[0])

  const handleSave = () => {
    setBabyName(name)
    setBirthDate(new Date(date))

    toast({
      title: "Settings Updated",
      description: `Baby information has been updated successfully.`,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Baby Information
        </CardTitle>
        <CardDescription>Update your baby's name and birth date</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baby-name">Baby's Name</Label>
          <Input
            id="baby-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter baby's name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birth-date">{isExpected ? "Expected Birth Date" : "Birth Date"}</Label>
          <Input id="birth-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isExpected
              ? "You can update this once your baby arrives."
              : "Changing this will update age calculations throughout the app."}
          </p>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  )
}
