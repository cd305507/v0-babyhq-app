import { DailyOverview } from "@/components/daily-overview"
import DashboardLayout from "@/components/dashboard-layout"

export default function SleepPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Sleep Tracker</h1>
      <DailyOverview type="sleep" />
    </DashboardLayout>
  )
}
