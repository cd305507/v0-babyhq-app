"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface BabyContextType {
  babyName: string
  setBabyName: (name: string) => void
  birthDate: Date
  setBirthDate: (date: Date) => void
  calculateAgeInMonths: () => number
  isExpected: boolean
}

const defaultBirthDate = new Date(2025, 7, 19) // August 19, 2025

const BabyContext = createContext<BabyContextType>({
  babyName: "Baby Biersack",
  setBabyName: () => {},
  birthDate: defaultBirthDate,
  setBirthDate: () => {},
  calculateAgeInMonths: () => 0,
  isExpected: true,
})

export function BabyProvider({ children }: { children: ReactNode }) {
  const [babyName, setBabyName] = useState("Baby Biersack")
  const [birthDate, setBirthDate] = useState<Date>(defaultBirthDate)

  const calculateAgeInMonths = (): number => {
    const today = new Date()

    // If birth date is in the future, return a negative age
    if (birthDate > today) {
      const monthsDiff =
        (birthDate.getFullYear() - today.getFullYear()) * 12 +
        (birthDate.getMonth() - today.getMonth()) +
        (birthDate.getDate() < today.getDate() ? -1 : 0)

      return -monthsDiff
    }

    // If birth date is in the past, calculate positive age
    const monthsDiff =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth()) +
      (today.getDate() >= birthDate.getDate() ? 0 : -1)

    return monthsDiff
  }

  // Determine if baby is expected (birth date in future) or already born
  const isExpected = birthDate > new Date()

  return (
    <BabyContext.Provider
      value={{
        babyName,
        setBabyName,
        birthDate,
        setBirthDate,
        calculateAgeInMonths,
        isExpected,
      }}
    >
      {children}
    </BabyContext.Provider>
  )
}

export const useBaby = () => useContext(BabyContext)
