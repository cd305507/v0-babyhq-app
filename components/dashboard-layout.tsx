"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ParentBadge } from "@/components/parent-badge"
import {
  Utensils,
  Moon,
  Droplets,
  Ruler,
  Stethoscope,
  MessageSquare,
  BarChart,
  Bell,
  Settings,
  Star,
  Menu,
  X,
  Home,
  Brain,
  Calendar,
  Sparkles,
  Lightbulb,
  Volume2,
  Droplet,
} from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Feeding", href: "/feeding", icon: Utensils },
    { name: "Pumping", href: "/pumping", icon: Droplet },
    { name: "Sleep", href: "/sleep", icon: Moon },
    { name: "Diapering", href: "/diapering", icon: Droplets },
    { name: "Growth", href: "/growth", icon: Ruler },
    { name: "Health", href: "/health", icon: Stethoscope },
    { name: "Milestones", href: "/milestones", icon: Star },
    { name: "Ask Expert", href: "/ask-expert", icon: MessageSquare },
    { name: "Reports", href: "/reports", icon: BarChart },
    { name: "Reminders", href: "/reminders", icon: Bell },
  ]

  const advancedFeatures = [
    { name: "SweetSpot Nap Predictor", href: "/sweet-spot", icon: Sparkles },
    { name: "AI Sleep Coach", href: "/sleep-coach", icon: Brain },
    { name: "Cry Detection", href: "/cry-detection", icon: Volume2 },
    { name: "Smart Schedule", href: "/smart-schedule", icon: Calendar },
    { name: "Daily Tips", href: "/daily-tips", icon: Lightbulb },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white dark:bg-slate-800"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-slate-800 p-4 shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="bg-purple-100 dark:bg-purple-900/50 p-1 rounded-lg">
                <Star className="h-6 w-6 text-purple-500" />
              </div>
              <span className="font-bold text-xl text-slate-800 dark:text-white">BabyHQ</span>
            </Link>
            <ModeToggle />
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 mb-4">
              <h3 className="px-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Advanced Features
              </h3>
            </div>

            <nav className="space-y-1">
              {advancedFeatures.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <ParentBadge />
              <Link href="/settings">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}
