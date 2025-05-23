"use client"

import type { ReactNode } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { usePathname, router } from "expo-router"
import { useTheme } from "@/context/theme-context"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import { useAuth } from "@/context/auth-context"
import { Drawer } from "@/components/ui/drawer"
import { Header } from "@/components/ui/header"

interface StudentTabLayoutProps {
  children: ReactNode
}

export function StudentTabLayout({ children }: StudentTabLayoutProps) {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Feather name="grid" size={20} color={theme.colors.text} />,
      route: "/(student)/dashboard",
      active: pathname === "/(student)/dashboard",
    },
    {
      title: "Subjects",
      icon: <MaterialIcons name="subject" size={20} color={theme.colors.text} />,
      route: "/(student)/subjects",
      active: pathname === "/(student)/subjects",
    },
    {
      title: "Attendance",
      icon: <Feather name="check-circle" size={20} color={theme.colors.text} />,
      route: "/(student)/attendance",
      active: pathname === "/(student)/attendance",
    },
    {
      title: "Exams",
      icon: <Feather name="file-text" size={20} color={theme.colors.text} />,
      route: "/(student)/exams",
      active: pathname === "/(student)/exams",
    },
    {
      title: "Results",
      icon: <Feather name="award" size={20} color={theme.colors.text} />,
      route: "/(student)/results",
      active: pathname === "/(student)/results",
    },
    {
      title: "Notices",
      icon: <Feather name="bell" size={20} color={theme.colors.text} />,
      route: "/(student)/notices",
      active: pathname === "/(student)/notices",
    },
    {
      title: "Complaints",
      icon: <Feather name="message-circle" size={20} color={theme.colors.text} />,
      route: "/(student)/complaints",
      active: pathname === "/(student)/complaints",
    },
    {
      title: "Profile",
      icon: <Feather name="user" size={20} color={theme.colors.text} />,
      route: "/(student)/profile",
      active: pathname === "/(student)/profile",
    },
  ]

  const handleMenuItemPress = (route: string) => {
    router.push(route)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="School Management" subtitle="Student Dashboard" showBackButton={false} />
      <View style={styles.content}>
        <Drawer
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
          onLogout={logout}
          userRole="Student"
          userName={user?.name || ""}
          userEmail={user?.rollNum || ""}
        />
        <View style={styles.mainContent}>{children}</View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  mainContent: {
    flex: 1,
  },
})
