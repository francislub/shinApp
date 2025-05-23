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

interface TeacherTabLayoutProps {
  children: ReactNode
}

export function TeacherTabLayout({ children }: TeacherTabLayoutProps) {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Feather name="grid" size={20} color={theme.colors.text} />,
      route: "/(teacher)/dashboard",
      active: pathname === "/(teacher)/dashboard",
    },
    {
      title: "Classes",
      icon: <MaterialIcons name="class" size={20} color={theme.colors.text} />,
      route: "/(teacher)/classes",
      active: pathname === "/(teacher)/classes",
    },
    {
      title: "Subjects",
      icon: <MaterialIcons name="subject" size={20} color={theme.colors.text} />,
      route: "/(teacher)/subjects",
      active: pathname === "/(teacher)/subjects",
    },
    {
      title: "Attendance",
      icon: <Feather name="check-circle" size={20} color={theme.colors.text} />,
      route: "/(teacher)/attendance",
      active: pathname === "/(teacher)/attendance",
    },
    {
      title: "Exams",
      icon: <Feather name="file-text" size={20} color={theme.colors.text} />,
      route: "/(teacher)/exams",
      active: pathname === "/(teacher)/exams",
    },
    {
      title: "CT Comments",
      icon: <Feather name="message-square" size={20} color={theme.colors.text} />,
      route: "/(teacher)/ct-comments",
      active: pathname === "/(teacher)/ct-comments",
    },
    {
      title: "Notices",
      icon: <Feather name="bell" size={20} color={theme.colors.text} />,
      route: "/(teacher)/notices",
      active: pathname === "/(teacher)/notices",
    },
    {
      title: "Messages",
      icon: <Feather name="mail" size={20} color={theme.colors.text} />,
      route: "/(teacher)/messages",
      active: pathname === "/(teacher)/messages",
    },
    {
      title: "Profile",
      icon: <Feather name="user" size={20} color={theme.colors.text} />,
      route: "/(teacher)/profile",
      active: pathname === "/(teacher)/profile",
    },
  ]

  const handleMenuItemPress = (route: string) => {
    router.push(route)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="School Management" subtitle="Teacher Dashboard" showBackButton={false} />
      <View style={styles.content}>
        <Drawer
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
          onLogout={logout}
          userRole="Teacher"
          userName={user?.name || ""}
          userEmail={user?.email || ""}
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
