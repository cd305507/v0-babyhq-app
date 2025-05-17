import { DailyOverview } from "@/components/daily-overview"
import DashboardLayout from "@/components/dashboard-layout"

export default function DiaperingPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Diaper Tracker</h1>
      <DailyOverview type="diaper" />
    </DashboardLayout>
  )
}
