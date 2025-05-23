"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { fetchStudentDashboardStats } from "@/lib/api/student"
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import LoadingScreen from "@/components/ui/loading-screen"

export default function StudentDashboard() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    subjectsCount: 0,
    attendancePercentage: 0,
    averageGrade: "-",
    unreadNotices: 0,
    activeComplaints: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadDashboardData = async () => {
    try {
      const data = await fetchStudentDashboardStats()
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
        <Card style={[styles.welcomeCard, { backgroundColor: theme.colors.blue }]}>
          <View>
            <FontAwesome5 name="user-graduate" size={24} color="white" style={styles.welcomeIcon} />
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Good morning, {user?.name}!</Text>
            <Text style={styles.welcomeSubtitle}>Welcome to your Student Dashboard ({user?.rollNum})</Text>
          </View>
        </Card>

        <View style={styles.infoCards}>
          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="calendar" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>{formattedDate}</Text>
          </Card>

          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="award" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>
              Your current average grade is {stats.averageGrade}. Need help? Visit our documentation section for
              detailed guides.
            </Text>
          </Card>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="My Subjects"
            value={stats.subjectsCount}
            icon={<MaterialIcons name="subject" size={24} color={theme.colors.blue} />}
            subtitle="Enrolled this term"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Attendance"
            value={`${stats.attendancePercentage}%`}
            icon={<Feather name="check-circle" size={24} color={theme.colors.green} />}
            subtitle="Current term"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Average Grade"
            value={stats.averageGrade}
            icon={<Feather name="award" size={24} color={theme.colors.yellow} />}
            subtitle="Current term"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Notices"
            value={stats.unreadNotices}
            icon={<Feather name="bell" size={24} color={theme.colors.purple} />}
            subtitle="Unread notices"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Complaints"
            value={stats.activeComplaints}
            icon={<Feather name="message-circle" size={24} color={theme.colors.red} />}
            subtitle="Active complaints"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Attendance Overview</Text>
        <Card style={[styles.overviewCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>Your attendance by subject</Text>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Grade Distribution</Text>
        <Card style={[styles.overviewCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>Your grades by subject</Text>
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
  overviewCard: {
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
