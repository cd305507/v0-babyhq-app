import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, Camera, Calendar, Baby, Sparkles } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { MilestoneItem } from "@/components/milestone-item"
import { SeasonalIcon } from "@/components/seasonal-icon"

export default function MilestonesPage() {
  // Baby's expected birth date: August 19, 2025
  const babyBirthDate = new Date(2025, 7, 19) // Month is 0-indexed (7 = August)

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white heading-fancy">Milestones Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your baby's developmental journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Expected Birth: Aug 19, 2025
          </Button>
        </div>
      </div>

      <Tabs defaultValue="0-1months" className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-4 overflow-x-auto">
          <TabsTrigger value="0-1months">0-1 mo</TabsTrigger>
          <TabsTrigger value="1-2months">1-2 mo</TabsTrigger>
          <TabsTrigger value="2-3months">2-3 mo</TabsTrigger>
          <TabsTrigger value="3-4months">3-4 mo</TabsTrigger>
          <TabsTrigger value="4-6months">4-6 mo</TabsTrigger>
          <TabsTrigger value="6-9months">6-9 mo</TabsTrigger>
          <TabsTrigger value="9-12months">9-12 mo</TabsTrigger>
          <TabsTrigger value="12-18months">12-18 mo</TabsTrigger>
          <TabsTrigger value="18-24months">18-24 mo</TabsTrigger>
        </TabsList>

        {/* 0-1 Month Milestones (Aug-Sep 2025) */}
        <TabsContent value="0-1months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="late-summer" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">0-1 Month Milestones</CardTitle>
                    <CardDescription>August 19 - September 19, 2025</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Recognizes parent's voice"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.5}
                    />
                    <MilestoneItem
                      title="Calms down when held or spoken to"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.5}
                    />
                    <MilestoneItem title="Makes eye contact" birthDate={babyBirthDate} expectedAgeMonths={0.75} />
                    <MilestoneItem title="Responds to touch" birthDate={babyBirthDate} expectedAgeMonths={0.25} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Cries to communicate needs"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.1}
                    />
                    <MilestoneItem
                      title="Makes small throaty sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.75}
                    />
                    <MilestoneItem title="Startles at loud sounds" birthDate={babyBirthDate} expectedAgeMonths={0.25} />
                    <MilestoneItem
                      title="Quiets to familiar voices"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Watches faces intently" birthDate={babyBirthDate} expectedAgeMonths={0.5} />
                    <MilestoneItem
                      title="Follows movement with eyes"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.75}
                    />
                    <MilestoneItem
                      title="Recognizes familiar objects and people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1}
                    />
                    <MilestoneItem
                      title="Begins to follow objects with eyes"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.75}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Moves head from side to side when on stomach"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.75}
                    />
                    <MilestoneItem
                      title="Keeps hands in tight fists"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={0.25}
                    />
                    <MilestoneItem title="Strong reflex movements" birthDate={babyBirthDate} expectedAgeMonths={0.25} />
                    <MilestoneItem title="Brings hands to face" birthDate={babyBirthDate} expectedAgeMonths={0.75} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 1-2 Month Milestones (Sep-Oct 2025) */}
        <TabsContent value="1-2months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="early-fall" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">1-2 Month Milestones</CardTitle>
                    <CardDescription>September 19 - October 19, 2025</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Begins to smile at people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.5}
                    />
                    <MilestoneItem title="Can briefly self-soothe" birthDate={babyBirthDate} expectedAgeMonths={1.75} />
                    <MilestoneItem title="Tries to look at parent" birthDate={babyBirthDate} expectedAgeMonths={1.25} />
                    <MilestoneItem title="Enjoys social play" birthDate={babyBirthDate} expectedAgeMonths={2} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Coos and makes gurgling sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.5}
                    />
                    <MilestoneItem
                      title="Turns head toward sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.75}
                    />
                    <MilestoneItem
                      title="Different cries for different needs"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.5}
                    />
                    <MilestoneItem title="Pays attention to faces" birthDate={babyBirthDate} expectedAgeMonths={1.25} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Follows things with eyes" birthDate={babyBirthDate} expectedAgeMonths={1.5} />
                    <MilestoneItem
                      title="Recognizes familiar people at a distance"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2}
                    />
                    <MilestoneItem
                      title="Begins to act bored if activity doesn't change"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.75}
                    />
                    <MilestoneItem title="Watches faces intently" birthDate={babyBirthDate} expectedAgeMonths={1.25} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Can hold head up briefly" birthDate={babyBirthDate} expectedAgeMonths={1.5} />
                    <MilestoneItem
                      title="Makes smoother movements with arms and legs"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={1.75}
                    />
                    <MilestoneItem title="Opens and closes hands" birthDate={babyBirthDate} expectedAgeMonths={1.25} />
                    <MilestoneItem
                      title="Pushes up when lying on tummy"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 2-3 Month Milestones (Oct-Nov 2025) */}
        <TabsContent value="2-3months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="fall" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">2-3 Month Milestones</CardTitle>
                    <CardDescription>October 19 - November 19, 2025</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Smiles spontaneously, especially at people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.5}
                    />
                    <MilestoneItem
                      title="Enjoys playing with people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                    <MilestoneItem
                      title="More communicative with face and body"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                    <MilestoneItem
                      title="Imitates some movements and facial expressions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Begins to babble" birthDate={babyBirthDate} expectedAgeMonths={2.5} />
                    <MilestoneItem title="Makes cooing sounds" birthDate={babyBirthDate} expectedAgeMonths={2.25} />
                    <MilestoneItem
                      title="Turns head toward direction of sound"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                    <MilestoneItem title="Responds to affection" birthDate={babyBirthDate} expectedAgeMonths={2.75} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Follows moving things with eyes"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.5}
                    />
                    <MilestoneItem
                      title="Recognizes familiar people at a distance"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                    <MilestoneItem
                      title="Begins to show hand-eye coordination"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3}
                    />
                    <MilestoneItem
                      title="Begins to act bored if activity doesn't change"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Can hold head up and begins to push up when lying on tummy"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.5}
                    />
                    <MilestoneItem
                      title="Makes smoother movements with arms and legs"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                    <MilestoneItem title="Opens and closes hands" birthDate={babyBirthDate} expectedAgeMonths={2.25} />
                    <MilestoneItem
                      title="Swipes at dangling objects"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={2.75}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 3-4 Month Milestones (Nov-Dec 2025) */}
        <TabsContent value="3-4months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="early-winter" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">3-4 Month Milestones</CardTitle>
                    <CardDescription>November 19 - December 19, 2025</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Smiles spontaneously, especially at people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.25}
                    />
                    <MilestoneItem
                      title="Copies some movements and facial expressions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.75}
                    />
                    <MilestoneItem
                      title="Enjoys playing with people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                    <MilestoneItem
                      title="More communicative and expressive with face and body"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Begins to babble" birthDate={babyBirthDate} expectedAgeMonths={3.75} />
                    <MilestoneItem
                      title="Babbles with expression and copies sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4}
                    />
                    <MilestoneItem
                      title="Cries differently for different needs"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.25}
                    />
                    <MilestoneItem
                      title="Responds to sounds by making sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Lets you know if happy or sad"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                    <MilestoneItem title="Responds to affection" birthDate={babyBirthDate} expectedAgeMonths={3.25} />
                    <MilestoneItem
                      title="Reaches for toy with one hand"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.75}
                    />
                    <MilestoneItem
                      title="Uses hands and eyes together"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4}
                    />
                    <MilestoneItem
                      title="Follows moving things with eyes"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                    <MilestoneItem
                      title="Recognizes familiar people at a distance"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Holds head steady, unsupported"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                    <MilestoneItem
                      title="Pushes down on legs when feet are on a hard surface"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.75}
                    />
                    <MilestoneItem
                      title="May be able to roll over from tummy to back"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4}
                    />
                    <MilestoneItem
                      title="Can hold a toy and shake it"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.75}
                    />
                    <MilestoneItem title="Brings hands to mouth" birthDate={babyBirthDate} expectedAgeMonths={3.25} />
                    <MilestoneItem
                      title="Begins to push up when lying on tummy"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={3.5}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 4-6 Month Milestones (Dec 2025-Feb 2026) */}
        <TabsContent value="4-6months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="winter" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">4-6 Month Milestones</CardTitle>
                    <CardDescription>December 19, 2025 - February 19, 2026</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Knows familiar faces and begins to know if someone is a stranger"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5}
                    />
                    <MilestoneItem
                      title="Likes to play with others, especially parents"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4.5}
                    />
                    <MilestoneItem
                      title="Responds to other people's emotions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5.5}
                    />
                    <MilestoneItem
                      title="Often seems happy and enjoys looking in a mirror"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Responds to sounds by making sounds"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4.5}
                    />
                    <MilestoneItem
                      title="Strings vowels together when babbling ('ah', 'eh', 'oh')"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5}
                    />
                    <MilestoneItem title="Responds to own name" birthDate={babyBirthDate} expectedAgeMonths={5.5} />
                    <MilestoneItem
                      title="Makes sounds to show joy and displeasure"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4.5}
                    />
                    <MilestoneItem
                      title="Begins to say consonant sounds (jabbering with 'm', 'b')"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={6}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Looks around at things nearby"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={4.5}
                    />
                    <MilestoneItem title="Brings things to mouth" birthDate={babyBirthDate} expectedAgeMonths={5} />
                    <MilestoneItem
                      title="Shows curiosity and tries to get things out of reach"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5.5}
                    />
                    <MilestoneItem
                      title="Begins to pass things from one hand to the other"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={6}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Rolls over in both directions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5}
                    />
                    <MilestoneItem
                      title="Begins to sit without support"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={6}
                    />
                    <MilestoneItem
                      title="When standing, supports weight on legs and might bounce"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={5.5}
                    />
                    <MilestoneItem
                      title="Rocks back and forth, sometimes crawling backward before moving forward"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={6}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 6-9 Month Milestones (Feb-May 2026) */}
        <TabsContent value="6-9months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="spring" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">6-9 Month Milestones</CardTitle>
                    <CardDescription>February 19 - May 19, 2026</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="May be afraid of strangers" birthDate={babyBirthDate} expectedAgeMonths={8} />
                    <MilestoneItem
                      title="May be clingy with familiar adults"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={7}
                    />
                    <MilestoneItem title="Has favorite toys" birthDate={babyBirthDate} expectedAgeMonths={7.5} />
                    <MilestoneItem title="Shows separation anxiety" birthDate={babyBirthDate} expectedAgeMonths={8.5} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Responds to own name" birthDate={babyBirthDate} expectedAgeMonths={6.5} />
                    <MilestoneItem
                      title="Makes sounds like 'mamamama' and 'bababababa'"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={8}
                    />
                    <MilestoneItem title="Understands 'no'" birthDate={babyBirthDate} expectedAgeMonths={7} />
                    <MilestoneItem
                      title="Copies sounds and gestures of others"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={8.5}
                    />
                    <MilestoneItem
                      title="Uses fingers to point at things"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Looks for things they see you hide"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={7.5}
                    />
                    <MilestoneItem title="Plays peek-a-boo" birthDate={babyBirthDate} expectedAgeMonths={7} />
                    <MilestoneItem
                      title="Passes things from one hand to another"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={6.5}
                    />
                    <MilestoneItem
                      title="Picks up things like cereal between thumb and index finger"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9}
                    />
                    <MilestoneItem
                      title="Watches the path of something as it falls"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={8}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Sits without support" birthDate={babyBirthDate} expectedAgeMonths={6.5} />
                    <MilestoneItem title="Stands while holding on" birthDate={babyBirthDate} expectedAgeMonths={8} />
                    <MilestoneItem title="Crawls" birthDate={babyBirthDate} expectedAgeMonths={8.5} />
                    <MilestoneItem
                      title="Can get into sitting position"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={7.5}
                    />
                    <MilestoneItem title="Pulls to stand" birthDate={babyBirthDate} expectedAgeMonths={9} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 9-12 Month Milestones (May-Aug 2026) */}
        <TabsContent value="9-12months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="summer" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">9-12 Month Milestones</CardTitle>
                    <CardDescription>May 19 - August 19, 2026</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Is shy or nervous with strangers"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10}
                    />
                    <MilestoneItem
                      title="Cries when mom or dad leaves"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9.5}
                    />
                    <MilestoneItem
                      title="Has favorite things and people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10.5}
                    />
                    <MilestoneItem
                      title="Shows fear in some situations"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11}
                    />
                    <MilestoneItem
                      title="Hands you a book when wanting to hear a story"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={12}
                    />
                    <MilestoneItem
                      title="Repeats sounds or actions to get attention"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Responds to simple verbal requests"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11}
                    />
                    <MilestoneItem
                      title="Uses simple gestures, like shaking head 'no'"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10}
                    />
                    <MilestoneItem
                      title="Says 'mama' and 'dada' and exclamations like 'uh-oh!'"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10.5}
                    />
                    <MilestoneItem
                      title="Tries to say words you say"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11.5}
                    />
                    <MilestoneItem
                      title="Explores things in different ways (shaking, banging, throwing)"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Watches the path of something as it falls"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9.5}
                    />
                    <MilestoneItem
                      title="Looks for things they see you hide"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10}
                    />
                    <MilestoneItem title="Plays peek-a-boo" birthDate={babyBirthDate} expectedAgeMonths={9} />
                    <MilestoneItem title="Puts things in mouth" birthDate={babyBirthDate} expectedAgeMonths={9.5} />
                    <MilestoneItem
                      title="Moves things smoothly from one hand to the other"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10.5}
                    />
                    <MilestoneItem
                      title="Picks up things like cereal between thumb and index finger"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11}
                    />
                    <MilestoneItem
                      title="Finds hidden objects easily"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={12}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Gets to a sitting position without help"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={9.5}
                    />
                    <MilestoneItem title="Pulls up to stand" birthDate={babyBirthDate} expectedAgeMonths={10} />
                    <MilestoneItem
                      title="Walks holding onto furniture ('cruising')"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={10.5}
                    />
                    <MilestoneItem title="May stand alone" birthDate={babyBirthDate} expectedAgeMonths={11} />
                    <MilestoneItem
                      title="May take a few steps without holding on"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={12}
                    />
                    <MilestoneItem
                      title="May try to feed themselves"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={11.5}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 12-18 Month Milestones (Aug 2026-Feb 2027) */}
        <TabsContent value="12-18months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="fall" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">12-18 Month Milestones</CardTitle>
                    <CardDescription>August 19, 2026 - February 19, 2027</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Likes to hand things to others as play"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={13}
                    />
                    <MilestoneItem title="May have temper tantrums" birthDate={babyBirthDate} expectedAgeMonths={15} />
                    <MilestoneItem
                      title="May be afraid of strangers"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={12.5}
                    />
                    <MilestoneItem
                      title="Shows affection to familiar people"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={14}
                    />
                    <MilestoneItem
                      title="Plays simple pretend, such as feeding a doll"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={16}
                    />
                    <MilestoneItem
                      title="May cling to caregivers in new situations"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={15.5}
                    />
                    <MilestoneItem
                      title="Points to show others something interesting"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={17}
                    />
                    <MilestoneItem
                      title="Explores alone but with parent close by"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={18}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Says several single words" birthDate={babyBirthDate} expectedAgeMonths={14} />
                    <MilestoneItem title="Says and shakes head 'no'" birthDate={babyBirthDate} expectedAgeMonths={13} />
                    <MilestoneItem
                      title="Points to show someone what they want"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={12.5}
                    />
                    <MilestoneItem
                      title="Points to get the attention of others"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={15}
                    />
                    <MilestoneItem
                      title="Knows what ordinary things are for (telephone, brush, spoon)"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={16}
                    />
                    <MilestoneItem
                      title="Shows interest in a doll or stuffed animal by pretending to feed"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={17}
                    />
                    <MilestoneItem title="Points to one body part" birthDate={babyBirthDate} expectedAgeMonths={17.5} />
                    <MilestoneItem title="May say 8 to 10 words" birthDate={babyBirthDate} expectedAgeMonths={18} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Finds things even when hidden under two or three covers"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={14}
                    />
                    <MilestoneItem
                      title="Begins to sort shapes and colors"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={16}
                    />
                    <MilestoneItem
                      title="Completes sentences and rhymes in familiar books"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={17}
                    />
                    <MilestoneItem
                      title="Plays simple make-believe games"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={15}
                    />
                    <MilestoneItem
                      title="Builds towers of 4 or more blocks"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={18}
                    />
                    <MilestoneItem
                      title="Might use one hand more than the other"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={17.5}
                    />
                    <MilestoneItem
                      title="Follows one-step verbal commands without any gestures"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={15.5}
                    />
                    <MilestoneItem
                      title="Can find things even when hidden under two or three covers"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={13}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Walks alone" birthDate={babyBirthDate} expectedAgeMonths={13} />
                    <MilestoneItem title="May walk up steps and run" birthDate={babyBirthDate} expectedAgeMonths={15} />
                    <MilestoneItem title="Pulls toys while walking" birthDate={babyBirthDate} expectedAgeMonths={14} />
                    <MilestoneItem
                      title="Can help undress themselves"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={16}
                    />
                    <MilestoneItem title="Drinks from a cup" birthDate={babyBirthDate} expectedAgeMonths={13.5} />
                    <MilestoneItem title="Eats with a spoon" birthDate={babyBirthDate} expectedAgeMonths={15.5} />
                    <MilestoneItem title="Scribbles on their own" birthDate={babyBirthDate} expectedAgeMonths={17} />
                    <MilestoneItem
                      title="Can follow 1-step verbal commands without gestures"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={18}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>

        {/* 18-24 Month Milestones (Feb-Aug 2027) */}
        <TabsContent value="18-24months">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SeasonalIcon season="spring" size={24} />
                  <div>
                    <CardTitle className="flex items-center gap-2">18-24 Month Milestones</CardTitle>
                    <CardDescription>February 19 - August 19, 2027</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    History
                  </Button>
                  <Button variant="default" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <span className="card-title-gradient">Social & Emotional</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Copies others, especially adults and older children"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={19}
                    />
                    <MilestoneItem
                      title="Gets excited when with other children"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={20}
                    />
                    <MilestoneItem
                      title="Shows more and more independence"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={21}
                    />
                    <MilestoneItem
                      title="Shows defiant behavior (doing what they've been told not to)"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={22}
                    />
                    <MilestoneItem
                      title="Plays mainly beside other children, but begins to include them in games"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={23}
                    />
                    <MilestoneItem title="Begins to show empathy" birthDate={babyBirthDate} expectedAgeMonths={24} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    <span className="card-title-gradient">Language & Communication</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Points to things or pictures when they are named"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={19}
                    />
                    <MilestoneItem
                      title="Knows names of familiar people and body parts"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={20}
                    />
                    <MilestoneItem
                      title="Says sentences with 2 to 4 words"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={21}
                    />
                    <MilestoneItem
                      title="Follows simple instructions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={22}
                    />
                    <MilestoneItem
                      title="Repeats words overheard in conversation"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={23}
                    />
                    <MilestoneItem
                      title="Points to things in a book"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={19.5}
                    />
                    <MilestoneItem title="Knows at least 50 words" birthDate={babyBirthDate} expectedAgeMonths={24} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span className="card-title-gradient">Cognitive</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem
                      title="Finds things even when hidden under multiple covers"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={19}
                    />
                    <MilestoneItem
                      title="Begins to sort shapes and colors"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={20}
                    />
                    <MilestoneItem
                      title="Completes sentences and rhymes in familiar books"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={21}
                    />
                    <MilestoneItem
                      title="Plays simple make-believe games"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={20.5}
                    />
                    <MilestoneItem
                      title="Builds towers of 4 or more blocks"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={22}
                    />
                    <MilestoneItem
                      title="Might use one hand more than the other"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={23}
                    />
                    <MilestoneItem
                      title="Follows two-step instructions"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={24}
                    />
                    <MilestoneItem
                      title="Names items in a picture book"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={22.5}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    <span className="card-title-gradient">Physical Development</span>
                  </h3>
                  <div className="space-y-2">
                    <MilestoneItem title="Stands on tiptoe" birthDate={babyBirthDate} expectedAgeMonths={20} />
                    <MilestoneItem title="Kicks a ball" birthDate={babyBirthDate} expectedAgeMonths={21} />
                    <MilestoneItem title="Begins to run" birthDate={babyBirthDate} expectedAgeMonths={19} />
                    <MilestoneItem
                      title="Climbs onto and down from furniture without help"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={22}
                    />
                    <MilestoneItem
                      title="Walks up and down stairs holding on"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={23}
                    />
                    <MilestoneItem title="Throws ball overhand" birthDate={babyBirthDate} expectedAgeMonths={21.5} />
                    <MilestoneItem
                      title="Makes or copies straight lines and circles"
                      birthDate={babyBirthDate}
                      expectedAgeMonths={24}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <MilestoneProgressCard />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

function MilestoneProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Milestone Progress
        </CardTitle>
        <CardDescription>Track your baby's overall developmental progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="animate-float mb-4">
            <Baby className="h-16 w-16 text-purple-300 dark:text-purple-700" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
            Your milestone tracking will begin after your baby arrives on August 19, 2025
          </p>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Set Reminders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
