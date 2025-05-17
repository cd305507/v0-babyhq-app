import { CardContent } from "@/components/ui/card"
import type * as React from "react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function ChartContainer({ title, description, children }: ChartContainerProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-start">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2 pb-4">{children}</CardContent>
    </Card>
  )
}

export function Chart({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface ChartTooltipContentProps {
  className?: string
  items: (data: { payload: any[] | undefined }) =>
    | {
        label: string
        value: string
        color: string
      }[]
    | undefined
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ className, items }) => {
  return (
    <div className={className}>
      {items({ payload: undefined })?.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-xs font-medium">{item.label}</span>
          <span className="text-xs text-muted-foreground">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export const ChartTooltip = () => null
