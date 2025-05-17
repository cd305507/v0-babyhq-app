import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { BabyProvider } from "@/contexts/baby-context"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BabyHQ - All-in-One Newborn Tracker",
  description: "Track feeding, sleep, diapers, growth, and more for your baby",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <BabyProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </BabyProvider>
      </body>
    </html>
  )
}
