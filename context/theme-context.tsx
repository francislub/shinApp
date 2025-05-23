"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ThemeColors {
  primary: string
  primaryLight: string
  secondary: string
  background: string
  cardBackground: string
  text: string
  textSecondary: string
  border: string
  inputBackground: string
  disabled: string
  disabledText: string
  destructive: string
  blue: string
  green: string
  yellow: string
  red: string
  purple: string
  teal: string
  orange: string
}

interface Theme {
  dark: boolean
  colors: ThemeColors
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: "#4C6FFF",
    primaryLight: "#EEF2FF",
    secondary: "#6C757D",
    background: "#F8F9FA",
    cardBackground: "#FFFFFF",
    text: "#212529",
    textSecondary: "#6C757D",
    border: "#DEE2E6",
    inputBackground: "#FFFFFF",
    disabled: "#E9ECEF",
    disabledText: "#ADB5BD",
    destructive: "#DC3545",
    blue: "#4C6FFF",
    green: "#28A745",
    yellow: "#FFC107",
    red: "#DC3545",
    purple: "#6F42C1",
    teal: "#20C997",
    orange: "#FD7E14",
  },
}

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: "#4C6FFF",
    primaryLight: "#1E2A4A",
    secondary: "#6C757D",
    background: "#121212",
    cardBackground: "#1E1E1E",
    text: "#F8F9FA",
    textSecondary: "#ADB5BD",
    border: "#343A40",
    inputBackground: "#2C2C2C",
    disabled: "#343A40",
    disabledText: "#6C757D",
    destructive: "#DC3545",
    blue: "#4C6FFF",
    green: "#28A745",
    yellow: "#FFC107",
    red: "#DC3545",
    purple: "#6F42C1",
    teal: "#20C997",
    orange: "#FD7E14",
  },
}

type ThemeType = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  themeType: ThemeType
  setThemeType: (type: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [themeType, setThemeType] = useState<ThemeType>("system")
  const [theme, setTheme] = useState<Theme>(systemColorScheme === "dark" ? darkTheme : lightTheme)

  useEffect(() => {
    const loadThemeType = async () => {
      try {
        const savedThemeType = await AsyncStorage.getItem("themeType")
        if (savedThemeType) {
          setThemeType(savedThemeType as ThemeType)
        }
      } catch (error) {
        console.error("Failed to load theme type:", error)
      }
    }

    loadThemeType()
  }, [])

  useEffect(() => {
    let selectedTheme: Theme

    if (themeType === "system") {
      selectedTheme = systemColorScheme === "dark" ? darkTheme : lightTheme
    } else {
      selectedTheme = themeType === "dark" ? darkTheme : lightTheme
    }

    setTheme(selectedTheme)

    const saveThemeType = async () => {
      try {
        await AsyncStorage.setItem("themeType", themeType)
      } catch (error) {
        console.error("Failed to save theme type:", error)
      }
    }

    saveThemeType()
  }, [themeType, systemColorScheme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        setThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
