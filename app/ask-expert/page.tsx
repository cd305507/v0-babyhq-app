"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Loader2, Info } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// The comprehensive system prompt for the pediatric assistant
const SYSTEM_PROMPT = `You are BabyHQ, a warm, expert pediatric assistant trained on evidence-based information from the American Academy of Pediatrics (AAP), CDC, WHO, Mayo Clinic, Stanford Children's Health, HealthyChildren.org, and peer-reviewed pediatric literature.

Your goal is to answer caregiver questions about their baby in a reassuring, knowledgeable, and practical way—grounded in medical guidelines and developmental science.

You may personalize responses based on:
- Baby's age in days/weeks/months
- Tracked data (e.g., nap times, feed volume, growth percentiles, symptoms)
- Developmental milestones

Avoid vague or generic suggestions.
Only recommend seeing a pediatrician if:
- The question presents a red flag symptom
- The user asks about medication dosages, medical emergencies, or specific diagnostic situations

Always include:
- Normal developmental ranges when appropriate
- Expert-backed explanation in clear language
- Practical next steps (what to try, what to observe)
- Reassurance when within the normal range of variation

Cite milestones, feeding, sleep, or growth norms based on pediatric guidelines when relevant.

When appropriate, offer links to trustworthy resources or suggest app tools like sleep graphs, tracking summaries, or Smart Scheduler.`

export default function AskExpertPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "system",
      content:
        "Welcome to BabyHQ's Ask-a-Pediatrician feature! I'm here to provide guidance based on expert pediatric knowledge. What questions do you have about your baby's health, development, or care?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [babyAge, setBabyAge] = useState("5 months") // Default age for demo purposes

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      // Enhanced AI responses based on the new system prompt
      const aiResponses = {
        "when should my baby start solid foods": {
          content: `Based on guidelines from the American Academy of Pediatrics and the World Health Organization, most babies are ready to start solid foods around 6 months of age.

At ${babyAge}, here are the readiness signs to look for:
• Good head and neck control
• Ability to sit with support
• Showing interest in food when others are eating
• Loss of the tongue-thrust reflex (pushing food out with tongue)
• Ability to move food to the back of the mouth

Start with iron-rich foods like iron-fortified cereals, pureed meats, or legumes. Introduce single-ingredient purees one at a time (waiting 3-5 days between new foods) to monitor for allergic reactions.

You can track your baby's food introductions and any reactions in the BabyHQ Feeding section. This will help you keep a record to share with your pediatrician at your next visit.`,
          source: "American Academy of Pediatrics",
        },
        "is it normal for my baby to wake up frequently at night": {
          content: `Yes, it's completely normal for babies at ${babyAge} to wake during the night. While some babies begin sleeping for longer stretches around 3-4 months, many continue to wake frequently throughout the first year.

Night wakings serve important biological functions:
• Ensures regular feeding for growth
• Maintains milk supply for breastfeeding mothers
• Protective mechanism against SIDS

Looking at your baby's sleep patterns in BabyHQ, frequent night waking is within the normal range of development. Most babies this age need 1-3 night feedings, and sleep consolidation happens gradually.

Things that might help:
• Establish a consistent bedtime routine
• Ensure baby is getting enough daytime feedings
• Try to keep night interactions calm and minimal

You can use our SweetSpot Nap Predictor to optimize daytime sleep, which sometimes helps with nighttime sleep. Remember that night waking is not a behavioral problem but a biological norm for infants.`,
          source: "Stanford Children's Health",
        },
        "how can i tell if my baby is getting enough breast milk": {
          content: `At ${babyAge}, here are reliable signs your baby is getting enough breast milk:

Physical indicators:
• 6+ wet diapers daily
• Regular bowel movements (yellow, seedy stool after day 4)
• Audible swallowing during feeds
• Appearing satisfied after feeds
• Consistent weight gain (regaining birth weight by 10-14 days, then gaining 4-7 oz per week)
• Alert when awake and meeting developmental milestones

Your BabyHQ tracking shows regular feeding patterns, which is a positive sign. The growth chart indicates steady weight gain along the expected curve.

If you're concerned, consider:
• Tracking feeding duration and frequency in the BabyHQ app
• Monitoring diaper output
• Attending your regular well-child visits to check weight gain

Remember that breast milk production works on supply and demand—frequent nursing helps maintain and increase your supply. If you have specific concerns, a lactation consultant can provide personalized support.`,
          source: "CDC Breastfeeding Guidelines",
        },
        "what's the normal temperature for a baby": {
          content: `A normal body temperature for a baby is typically between 97.5°F (36.4°C) and 99.5°F (37.5°C) when taken rectally, which is the most accurate method for infants.

Temperature measurement methods:
• Rectal (most accurate): 97.5°F - 99.5°F (36.4°C - 37.5°C)
• Axillary (armpit): 96.5°F - 98.5°F (35.8°C - 36.9°C)
• Temporal (forehead): 96.5°F - 99.5°F (35.8°C - 37.5°C)

A fever is generally considered:
• Rectal temperature of 100.4°F (38°C) or higher
• Axillary temperature of 99.4°F (37.4°C) or higher

For a baby at ${babyAge}:
• Call your pediatrician for any fever
• Seek immediate medical attention if fever is accompanied by lethargy, poor feeding, or unusual fussiness

You can track temperature readings in the BabyHQ Health section to monitor patterns and share with your doctor if needed.`,
          source: "Mayo Clinic",
        },
        "when should i worry about my baby's development": {
          content: `Development varies widely among babies, but there are certain milestones to watch for at different ages.

At ${babyAge}, most babies:
• Social: Smile responsively, recognize familiar faces
• Language: Coo, babble, turn toward sounds
• Cognitive: Follow objects with eyes, show curiosity
• Physical: Have good head control, push up during tummy time

Signs that warrant discussion with your pediatrician include:
• Not responding to loud sounds
• Not watching things as they move
• Not smiling at people
• Not bringing hands to mouth
• Not pushing down with legs when feet are on a hard surface

The BabyHQ Milestones tracker can help you monitor your baby's development against standard guidelines. Remember that each baby develops at their own pace, and small variations are usually normal.

If you have specific concerns about your baby's development, it's always appropriate to discuss them with your pediatrician at your next visit.`,
          source: "CDC Developmental Milestones",
        },
      }

      // Default response if no specific match
      let responseContent = `Thank you for your question about "${input}".

For a baby at ${babyAge}, this is an important topic. While each baby develops at their own pace, there are general guidelines that can help.

Based on pediatric expertise from sources like the American Academy of Pediatrics and the CDC, I can share that most babies at this age are developing skills in social interaction, motor control, and communication.

For this specific question, I'd recommend:
1. Tracking relevant patterns in your BabyHQ app
2. Observing your baby's response over the next few days
3. Discussing with your pediatrician at your next visit for personalized advice

Would you like more specific information about any aspect of this topic?`

      let source = "American Academy of Pediatrics"

      // Check for specific responses by looking for keywords in the input
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          responseContent = response.content
          source = response.source
          break
        }
      }

      const aiMessage = {
        id: messages.length + 2,
        role: "system",
        content: responseContent,
        source: source,
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Ask a Pediatrician</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                Expert Pediatric Guidance
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                Ask questions about your baby's health, development, feeding, sleep, and more
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">About this assistant</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p className="text-xs">
                        This assistant provides evidence-based information from trusted sources like the American
                        Academy of Pediatrics, CDC, WHO, and Mayo Clinic.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Baby's age:</span>
                <select
                  value={babyAge}
                  onChange={(e) => setBabyAge(e.target.value)}
                  className="text-sm bg-transparent border border-slate-200 dark:border-slate-700 rounded px-2 py-1"
                >
                  <option value="2 weeks">2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2 months">2 months</option>
                  <option value="3 months">3 months</option>
                  <option value="4 months">4 months</option>
                  <option value="5 months">5 months</option>
                  <option value="6 months">6 months</option>
                  <option value="9 months">9 months</option>
                  <option value="12 months">12 months</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      } p-3 rounded-lg`}
                    >
                      {message.role !== "user" && (
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Expert" />
                          <AvatarFallback>BH</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-2">
                        <div className="whitespace-pre-line">{message.content}</div>
                        {message.role !== "user" && message.id > 1 && message.source && (
                          <div className="flex flex-col gap-1 pt-1">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Source: {message.source}</div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Not helpful
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                      <p className="text-slate-500 dark:text-slate-400">Expert is typing...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="Ask a question about your baby's health, development, or care..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button type="submit" size="icon" onClick={handleSendMessage} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("When should my baby start solid foods?")}
                >
                  When should my baby start solid foods?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("Is it normal for my baby to wake up frequently at night?")}
                >
                  Is it normal for my baby to wake up frequently at night?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("How can I tell if my baby is getting enough breast milk?")}
                >
                  How can I tell if my baby is getting enough breast milk?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("What's the normal temperature for a baby?")}
                >
                  What's the normal temperature for a baby?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => setInput("When should I worry about my baby's development?")}
                >
                  When should I worry about my baby's development?
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">About This Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Our pediatric assistant is trained on evidence-based information from trusted sources like the American
                Academy of Pediatrics, CDC, WHO, and Mayo Clinic.
              </p>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                <p className="font-medium">This tool:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Provides general guidance based on your baby's age</li>
                  <li>References your tracked data when relevant</li>
                  <li>Offers practical next steps</li>
                  <li>Cites reliable medical sources</li>
                </ul>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 italic">
                Always consult with your pediatrician for medical advice specific to your baby.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
