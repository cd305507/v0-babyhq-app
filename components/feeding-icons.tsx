import { Apple, BabyIcon as BabyBottle } from "lucide-react"

interface FeedingIconProps {
  className?: string
}

export function BreastfeedingIcon({ className = "h-4 w-4" }: FeedingIconProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="relative w-full h-full">
        {/* Circle with dot in center to represent a breast */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" className="text-pink-500" />
          <circle cx="12" cy="12" r="3" fill="currentColor" className="text-pink-500" />
        </svg>
      </div>
    </div>
  )
}

export function BottleFeedingIcon({ className = "h-4 w-4" }: FeedingIconProps) {
  return (
    <div className="relative inline-flex">
      <BabyBottle className={`${className} text-blue-500`} />
    </div>
  )
}

export function SolidsIcon({ className = "h-4 w-4" }: FeedingIconProps) {
  return (
    <div className="relative inline-flex">
      <Apple className={`${className} text-green-500`} />
    </div>
  )
}

// Combined icon component that returns the appropriate icon based on type
export function FeedingIcon({ type, className = "h-4 w-4" }: { type: string; className?: string }) {
  switch (type) {
    case "Breastfeeding":
      return <BreastfeedingIcon className={className} />
    case "Bottle":
      return <BottleFeedingIcon className={className} />
    case "Solids":
      return <SolidsIcon className={className} />
    default:
      return <BreastfeedingIcon className={className} />
  }
}
