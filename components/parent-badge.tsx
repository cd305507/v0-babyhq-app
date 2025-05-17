"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ParentBadge() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 ring-2 ring-purple-100 dark:ring-slate-700">
        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
        <AvatarFallback>CB</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Carolyn Biersack</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Primary Parent</p>
      </div>
    </div>
  )
}
