"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { fetchAdminDashboardStats } from "@/lib/api/admin"
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import LoadingScreen from "@/components/ui/loading-screen"

export default function AdminDashboard() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    teachersCount: 0,
    studentsCount: 0,
    classesCount: 0,
    subjectsCount: 0,
    activeTerms: 0,
    activeNotices: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadDashboardData = async () => {
    try {
      const data = await fetchAdminDashboardStats()
      setStats(data)
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    loadDashboardData()
  }

  if (loading && !refreshing) {
    return <LoadingScreen />
  }

  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.purple }]}>
          <View>
            <FontAwesome5 name="graduation-cap" size={24} color="white" style={styles.welcomeIcon} />
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Good morning, {user?.name}!</Text>
            <Text style={styles.welcomeSubtitle}>Welcome to your Admin Dashboard ({user?.email})</Text>
          </View>
        </Card>

        <View style={styles.infoCards}>
          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="calendar" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>{formattedDate}</Text>
          </Card>

          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="info" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>
              You have access to all Admin features and tools. Manage your school efficiently!
            </Text>
          </Card>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>School Overview</Text>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Teachers"
            value={stats.teachersCount}
            icon={<Feather name="users" size={24} color={theme.colors.blue} />}
            change="0% from last month"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Students"
            value={stats.studentsCount}
            icon={<FontAwesome5 name="user-graduate" size={22} color={theme.colors.purple} />}
            change="0% from last month"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Classes"
            value={stats.classesCount}
            icon={<MaterialIcons name="class" size={24} color={theme.colors.green} />}
            subtitle="Across all terms"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Subjects"
            value={stats.subjectsCount}
            icon={<MaterialIcons name="subject" size={24} color={theme.colors.yellow} />}
            subtitle="Across all classes"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Active Terms"
            value={stats.activeTerms}
            icon={<Feather name="calendar" size={24} color={theme.colors.teal} />}
            subtitle="Current academic year"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Active Notices"
            value={stats.activeNotices}
            icon={<Feather name="bell" size={24} color={theme.colors.red} />}
            subtitle="Published this month"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeCard: {
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeIcon: {
    marginRight: 16,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "white",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "rgba(255, 255, 255, 0.8)",
  },
  infoCards: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  infoCardText: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
})
