import type { ReactNode } from "react"
import { View, Text, StyleSheet } from "react-native"

interface StatCardProps {
  title: string
  value: number | string
  icon: ReactNode
  subtitle?: string
  change?: string
  backgroundColor: string
  textColor: string
}

export function StatCard({ title, value, icon, subtitle, change, backgroundColor, textColor }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      {subtitle && <Text style={[styles.subtitle, { color: `${textColor}99` }]}>{subtitle}</Text>}
      {change && <Text style={[styles.change, { color: `${textColor}99` }]}>{change}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  value: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  change: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    marginTop: 4,
  },
})
