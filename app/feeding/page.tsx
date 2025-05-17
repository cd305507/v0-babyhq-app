import { DailyOverview } from "@/components/daily-overview"
import DashboardLayout from "@/components/dashboard-layout"

export default function FeedingPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Feeding Tracker</h1>
      <DailyOverview type="feeding" />
    </DashboardLayout>
  )
}
