"use client"

import type { ReactNode } from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"
import { useTheme } from "@/context/theme-context"

interface CardProps {
  children: ReactNode
  style?: ViewStyle
}

export function Card({ children, style }: CardProps) {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.cardBackground,
          shadowColor: theme.dark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)",
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
})
