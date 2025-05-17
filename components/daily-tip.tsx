"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ChevronLeft, ChevronRight, Bookmark, Share2, ThumbsUp } from "lucide-react"

interface DailyTipProps {
  babyAge: number // in months
  tipCategory?: "sleep" | "feeding" | "development" | "health" | "parenting" | "all"
}

export function DailyTip({ babyAge, tipCategory = "all" }: DailyTipProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [bookmarked, setBookmarked] = useState<number[]>([])

  // Generate age-appropriate tips
  const getTips = () => {
    const allTips = [
      // Sleep tips
      {
        category: "sleep",
        title: "Establish a Bedtime Routine",
        content:
          "A consistent bedtime routine signals to your baby that it's time to sleep. Try a bath, book, and lullaby sequence every night.",
        ageRange: [0, 24],
      },
      {
        category: "sleep",
        title: "Drowsy But Awake",
        content:
          "Try putting your baby down drowsy but still awake. This helps them learn to fall asleep independently.",
        ageRange: [2, 12],
      },
      {
        category: "sleep",
        title: "White Noise for Better Sleep",
        content:
          "White noise can help mask household sounds and mimic the whooshing sounds of the womb, helping your baby sleep more soundly.",
        ageRange: [0, 12],
      },

      // Feeding tips
      {
        category: "feeding",
        title: "Hunger Cues",
        content:
          "Watch for early hunger signs: rooting, putting hands to mouth, and sucking motions. Crying is a late hunger cue.",
        ageRange: [0, 6],
      },
      {
        category: "feeding",
        title: "First Foods",
        content:
          "When starting solids around 6 months, single-ingredient purees like iron-fortified rice cereal, avocado, or sweet potato are great first foods.",
        ageRange: [5, 7],
      },
      {
        category: "feeding",
        title: "Self-Feeding Skills",
        content:
          "Encourage self-feeding with soft finger foods like small pieces of banana, well-cooked pasta, or toast strips.",
        ageRange: [8, 12],
      },

      // Development tips
      {
        category: "development",
        title: "Tummy Time",
        content:
          "Daily tummy time helps strengthen neck, shoulder, and arm muscles. Start with 1-2 minutes a few times a day.",
        ageRange: [0, 6],
      },
      {
        category: "development",
        title: "Social Smiles",
        content:
          "Around 6-8 weeks, your baby will begin to smile in response to you rather than just reflexively. Encourage these early social interactions!",
        ageRange: [1, 3],
      },
      {
        category: "development",
        title: "Object Permanence",
        content:
          "Your baby is developing object permanence—understanding that things exist even when out of sight. This is why peek-a-boo is suddenly fascinating!",
        ageRange: [4, 8],
      },

      // Health tips
      {
        category: "health",
        title: "Vaccination Schedule",
        content:
          "Keep up with your baby's vaccination schedule. Vaccines protect against serious diseases and are carefully timed for optimal effectiveness.",
        ageRange: [0, 24],
      },
      {
        category: "health",
        title: "Fever Guidelines",
        content:
          "For babies under 3 months, any temperature over 100.4°F (38°C) warrants a call to your doctor, even if they seem otherwise well.",
        ageRange: [0, 3],
      },
      {
        category: "health",
        title: "Teething Signs",
        content:
          "Drooling, fussiness, and chewing on objects can indicate teething. Most babies get their first tooth between 4-7 months.",
        ageRange: [3, 12],
      },

      // Parenting tips
      {
        category: "parenting",
        title: "Self-Care Matters",
        content:
          "Taking care of yourself isn't selfish—it's necessary. Even 10 minutes of me-time can help you be a more patient, present parent.",
        ageRange: [0, 24],
      },
      {
        category: "parenting",
        title: "Baby Wearing Benefits",
        content:
          "Wearing your baby in a carrier or wrap can reduce crying, promote bonding, and free up your hands for other tasks.",
        ageRange: [0, 12],
      },
      {
        category: "parenting",
        title: "Partner Communication",
        content:
          "Keep communication open with your partner about parenting approaches. Consistency between caregivers helps babies feel secure.",
        ageRange: [0, 24],
      },
    ]

    // Filter tips by age and category
    return allTips.filter((tip) => {
      const ageMatch = babyAge >= tip.ageRange[0] && babyAge <= tip.ageRange[1]
      const categoryMatch = tipCategory === "all" || tip.category === tipCategory
      return ageMatch && categoryMatch
    })
  }

  const tips = getTips()
  const currentTip = tips[currentTipIndex]

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)
  }

  const handlePrevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + tips.length) % tips.length)
  }

  const handleBookmark = () => {
    setBookmarked((prev) => {
      if (prev.includes(currentTipIndex)) {
        return prev.filter((idx) => idx !== currentTipIndex)
      } else {
        return [...prev, currentTipIndex]
      }
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sleep":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
      case "feeding":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "development":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "health":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "parenting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
    }
  }

  if (!currentTip) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Lightbulb className="h-8 w-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">No tips available for this age and category combination.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Daily Tip
          </CardTitle>
          <Badge className={getCategoryColor(currentTip.category)}>
            {currentTip.category.charAt(0).toUpperCase() + currentTip.category.slice(1)}
          </Badge>
        </div>
        <CardDescription>Age-appropriate guidance for your {babyAge}-month-old</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">{currentTip.title}</h3>
          <p className="text-slate-600 dark:text-slate-400">{currentTip.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 p-4">
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handlePrevTip} disabled={tips.length <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextTip} disabled={tips.length <= 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {currentTipIndex + 1} of {tips.length}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={bookmarked.includes(currentTipIndex) ? "text-yellow-500" : ""}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
