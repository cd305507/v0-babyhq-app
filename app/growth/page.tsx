import { DailyOverview } from "@/components/daily-overview"
import DashboardLayout from "@/components/dashboard-layout"

export default function GrowthPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Growth Tracker</h1>
      <DailyOverview type="growth" />
    </DashboardLayout>
  )
}
