import { Utensils, Moon, Droplets, Star, Baby } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      time: "6:30 AM",
      type: "wake",
      icon: <Baby className="h-4 w-4 text-purple-500" />,
      title: "Woke Up",
      description: "Good mood, smiling",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
      parent: {
        name: "Carolyn",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
    },
    {
      id: 2,
      time: "6:45 AM",
      type: "feeding",
      icon: <Utensils className="h-4 w-4 text-purple-500" />,
      title: "Breastfeeding",
      description: "Left side - 12 min, Right side - 10 min",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
      parent: {
        name: "Carolyn",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
    },
    {
      id: 3,
      time: "7:15 AM",
      type: "diaper",
      icon: <Droplets className="h-4 w-4 text-blue-500" />,
      title: "Diaper Change",
      description: "Wet & dirty diaper",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      parent: {
        name: "Olivia",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "OB",
      },
    },
    {
      id: 4,
      time: "8:30 AM",
      type: "sleep",
      icon: <Moon className="h-4 w-4 text-indigo-500" />,
      title: "Morning Nap",
      description: "Slept for 45 minutes in crib",
      color: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300",
      parent: {
        name: "Olivia",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "OB",
      },
    },
    {
      id: 5,
      time: "9:30 AM",
      type: "feeding",
      icon: <Utensils className="h-4 w-4 text-purple-500" />,
      title: "Bottle Feeding",
      description: "3 oz formula",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
      parent: {
        name: "Carolyn",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
    },
    {
      id: 6,
      time: "10:15 AM",
      type: "diaper",
      icon: <Droplets className="h-4 w-4 text-blue-500" />,
      title: "Diaper Change",
      description: "Wet diaper",
      color: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300",
      parent: {
        name: "Olivia",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "OB",
      },
    },
    {
      id: 7,
      time: "11:30 AM",
      type: "milestone",
      icon: <Star className="h-4 w-4 text-yellow-500" />,
      title: "Milestone",
      description: "Rolled from back to side for the first time!",
      color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
      parent: {
        name: "Carolyn",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
    },
    {
      id: 8,
      time: "12:00 PM",
      type: "feeding",
      icon: <Utensils className="h-4 w-4 text-purple-500" />,
      title: "Breastfeeding",
      description: "Left side - 8 min, Right side - 12 min",
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
      parent: {
        name: "Carolyn",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CB",
      },
    },
  ]

  return (
    <TooltipProvider>
      <div className="relative space-y-4 py-2 max-h-[400px] overflow-y-auto pr-2">
        <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-gradient-to-b from-purple-200 via-blue-200 to-indigo-200 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30"></div>

        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 relative group">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${activity.color} shadow-sm transition-all duration-200 group-hover:scale-110`}
            >
              {activity.icon}
            </div>
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 group-hover:shadow-md group-hover:border-slate-300 dark:group-hover:border-slate-600">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{activity.title}</h4>
                <Badge variant="outline" className="ml-2 bg-slate-50 dark:bg-slate-900">
                  {activity.time}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{activity.description}</p>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={activity.parent.avatar || "/placeholder.svg"} alt={activity.parent.name} />
                        <AvatarFallback className="text-[10px]">{activity.parent.initials}</AvatarFallback>
                      </Avatar>
                      <span>Added by {activity.parent.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Recorded by {activity.parent.name}</p>
                  </TooltipContent>
                </Tooltip>

                <span className="text-xs text-slate-400 dark:text-slate-500">Just now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
