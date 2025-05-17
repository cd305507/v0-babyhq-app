import { Checkbox } from "@/components/ui/checkbox"
import { format, addMonths } from "date-fns"

interface MilestoneItemProps {
  title: string
  checked?: boolean
  achievedDate?: string
  birthDate: Date
  expectedAgeMonths: number
}

export function MilestoneItem({
  title,
  checked = false,
  achievedDate,
  birthDate,
  expectedAgeMonths,
}: MilestoneItemProps) {
  // Calculate the estimated date based on birth date and expected age
  const estimatedDate = addMonths(birthDate, expectedAgeMonths)
  const formattedEstimatedDate = format(estimatedDate, "MMM d, yyyy")

  return (
    <div className="flex items-start space-x-3 p-2 rounded-md transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <Checkbox id={title} checked={checked} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={title}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <div className="flex flex-col gap-1 mt-1">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium text-purple-600 dark:text-purple-400">Est:</span> {formattedEstimatedDate}
          </p>
          {achievedDate && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              <span className="font-medium">Achieved:</span> {achievedDate}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
