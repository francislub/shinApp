"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { fetchParentDashboardStats } from "@/lib/api/parent"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import LoadingScreen from "@/components/ui/loading-screen"

export default function ParentDashboard() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    childrenCount: 0,
    subjectsCount: 0,
    upcomingEvents: 0,
    pendingPayments: 0,
    unreadNotices: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadDashboardData = async () => {
    try {
      const data = await fetchParentDashboardStats()
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
        <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.orange }]}>
          <View>
            <FontAwesome5 name="user-friends" size={24} color="white" style={styles.welcomeIcon} />
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Good morning, {user?.name}!</Text>
            <Text style={styles.welcomeSubtitle}>Welcome to your Parent Dashboard ({user?.email})</Text>
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
              You have {stats.childrenCount} children enrolled in our school.
            </Text>
          </Card>

          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="bell" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>
              Check the calendar for upcoming school events and parent-teacher meetings.
            </Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="My Children"
            value={stats.childrenCount}
            icon={<FontAwesome5 name="child" size={24} color={theme.colors.green} />}
            subtitle="Registered in school"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Subjects"
            value={stats.subjectsCount}
            icon={<FontAwesome5 name="book" size={24} color={theme.colors.blue} />}
            subtitle="Across all children"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={<Feather name="calendar" size={24} color={theme.colors.purple} />}
            subtitle="Next 30 days"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Pending Payments"
            value={stats.pendingPayments}
            icon={<Feather name="credit-card" size={24} color={theme.colors.red} />}
            subtitle="Due this month"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Unread Notices"
            value={stats.unreadNotices}
            icon={<Feather name="bell" size={24} color={theme.colors.yellow} />}
            subtitle="School announcements"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>My Children</Text>
        <Card style={[styles.childrenCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Overview of your children's performance
          </Text>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Payment History</Text>
        <Card style={[styles.paymentsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>Recent fee payments</Text>
        </Card>
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
    marginTop: 8,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  childrenCard: {
    padding: 16,
    marginBottom: 24,
  },
  paymentsCard: {
    padding: 16,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    padding: 16,
  },
})
