import { redirect } from "next/navigation"

// Redirect straight to the dashboard - no login required
export default function Home() {
  redirect("/dashboard")
}
