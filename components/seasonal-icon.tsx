import {
  Sun,
  Snowflake,
  Flower,
  Leaf,
  Umbrella,
  CloudSun,
  CloudSnow,
  CloudRain,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

type Season =
  | "summer"
  | "late-summer"
  | "early-fall"
  | "fall"
  | "early-winter"
  | "winter"
  | "early-spring"
  | "spring"
  | "early-summer"

interface SeasonalIconProps {
  season: Season
  size?: number
  className?: string
}

const seasonalIcons: Record<Season, LucideIcon> = {
  summer: Sun,
  "late-summer": CloudSun,
  "early-fall": Leaf,
  fall: Umbrella,
  "early-winter": CloudSnow,
  winter: Snowflake,
  "early-spring": CloudRain,
  spring: Flower,
  "early-summer": Sparkles,
}

const seasonalColors: Record<Season, string> = {
  summer: "text-amber-500",
  "late-summer": "text-orange-500",
  "early-fall": "text-amber-600",
  fall: "text-orange-600",
  "early-winter": "text-blue-400",
  winter: "text-blue-500",
  "early-spring": "text-emerald-400",
  spring: "text-emerald-500",
  "early-summer": "text-yellow-500",
}

const seasonalBgColors: Record<Season, string> = {
  summer: "bg-amber-100 dark:bg-amber-900/20",
  "late-summer": "bg-orange-100 dark:bg-orange-900/20",
  "early-fall": "bg-amber-100 dark:bg-amber-900/20",
  fall: "bg-orange-100 dark:bg-orange-900/20",
  "early-winter": "bg-blue-100 dark:bg-blue-900/20",
  winter: "bg-blue-100 dark:bg-blue-900/20",
  "early-spring": "bg-emerald-100 dark:bg-emerald-900/20",
  spring: "bg-emerald-100 dark:bg-emerald-900/20",
  "early-summer": "bg-yellow-100 dark:bg-yellow-900/20",
}

export function SeasonalIcon({ season, size = 24, className = "" }: SeasonalIconProps) {
  const IconComponent = seasonalIcons[season]
  const colorClass = seasonalColors[season]
  const bgColorClass = seasonalBgColors[season]

  return (
    <div className={`${bgColorClass} p-3 rounded-full inline-flex items-center justify-center ${className}`}>
      <IconComponent size={size} className={colorClass} />
    </div>
  )
}

export function getSeasonForDate(birthDate: Date, monthsOld: number): Season {
  const date = new Date(birthDate)
  date.setMonth(date.getMonth() + monthsOld)
  const month = date.getMonth()

  // 0 = January, 11 = December
  if (month === 11 || month === 0 || month === 1) return "winter"
  if (month === 2) return "early-spring"
  if (month === 3 || month === 4) return "spring"
  if (month === 5) return "early-summer"
  if (month === 6 || month === 7) return "summer"
  if (month === 8) return "late-summer"
  if (month === 9) return "early-fall"
  return "fall" // month === 10
}
