"use client"

import { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "@/context/theme-context"
import { useAuth } from "@/context/auth-context"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { fetchTeacherDashboardStats } from "@/lib/api/teacher"
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import LoadingScreen from "@/components/ui/loading-screen"

export default function TeacherDashboard() {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState({
    classesCount: 0,
    subjectsCount: 0,
    studentsCount: 0,
    upcomingExamsCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadDashboardData = async () => {
    try {
      const data = await fetchTeacherDashboardStats()
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
            <FontAwesome5 name="book" size={24} color="white" style={styles.welcomeIcon} />
          </View>
          <View>
            <Text style={styles.welcomeTitle}>Good morning, {user?.name}!</Text>
            <Text style={styles.welcomeSubtitle}>Welcome to your Teacher Dashboard ({user?.email})</Text>
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
              You are teaching {stats.classesCount} classes with a total of {stats.studentsCount} students.
            </Text>
          </Card>

          <Card style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Feather name="bell" size={20} color={theme.colors.text} />
            <Text style={[styles.infoCardText, { color: theme.colors.text }]}>
              Check the calendar for upcoming school events and deadlines.
            </Text>
          </Card>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total Classes"
            value={stats.classesCount}
            icon={<MaterialIcons name="class" size={24} color={theme.colors.green} />}
            subtitle="Classes you are teaching"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Subjects"
            value={stats.subjectsCount}
            icon={<MaterialIcons name="subject" size={24} color={theme.colors.yellow} />}
            subtitle="Subjects you are teaching"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Total Students"
            value={stats.studentsCount}
            icon={<FontAwesome5 name="user-graduate" size={22} color={theme.colors.purple} />}
            subtitle="Students in your classes"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />

          <StatCard
            title="Upcoming Exams"
            value={stats.upcomingExamsCount}
            icon={<Feather name="file-text" size={24} color={theme.colors.red} />}
            subtitle="Exams in the next 30 days"
            backgroundColor={theme.colors.cardBackground}
            textColor={theme.colors.text}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Classes You Teach</Text>
        <Card style={[styles.classesCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Overview of classes and student counts
          </Text>
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
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  classesCard: {
    padding: 16,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    padding: 16,
  },
})
