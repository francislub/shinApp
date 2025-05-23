"use client"

import type { ReactNode } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { usePathname, router } from "expo-router"
import { useTheme } from "@/context/theme-context"
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { useAuth } from "@/context/auth-context"
import { Drawer } from "@/components/ui/drawer"
import { Header } from "@/components/ui/header"

interface AdminTabLayoutProps {
  children: ReactNode
}

export function AdminTabLayout({ children }: AdminTabLayoutProps) {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Feather name="grid" size={20} color={theme.colors.text} />,
      route: "/(admin)/dashboard",
      active: pathname === "/(admin)/dashboard",
    },
    {
      title: "Terms",
      icon: <Feather name="calendar" size={20} color={theme.colors.text} />,
      route: "/(admin)/terms",
      active: pathname === "/(admin)/terms",
    },
    {
      title: "Students",
      icon: <FontAwesome5 name="user-graduate" size={18} color={theme.colors.text} />,
      route: "/(admin)/students",
      active: pathname === "/(admin)/students",
    },
    {
      title: "Teachers",
      icon: <Feather name="users" size={20} color={theme.colors.text} />,
      route: "/(admin)/teachers",
      active: pathname === "/(admin)/teachers",
    },
    {
      title: "Parents",
      icon: <FontAwesome5 name="user-friends" size={18} color={theme.colors.text} />,
      route: "/(admin)/parents",
      active: pathname === "/(admin)/parents",
    },
    {
      title: "Classes",
      icon: <MaterialIcons name="class" size={20} color={theme.colors.text} />,
      route: "/(admin)/classes",
      active: pathname === "/(admin)/classes",
    },
    {
      title: "Subjects",
      icon: <MaterialIcons name="subject" size={20} color={theme.colors.text} />,
      route: "/(admin)/subjects",
      active: pathname === "/(admin)/subjects",
    },
    {
      title: "Exams",
      icon: <Feather name="file-text" size={20} color={theme.colors.text} />,
      route: "/(admin)/exams",
      active: pathname === "/(admin)/exams",
    },
    {
      title: "Attendance",
      icon: <Feather name="check-circle" size={20} color={theme.colors.text} />,
      route: "/(admin)/attendance",
      active: pathname === "/(admin)/attendance",
    },
    {
      title: "Report Cards",
      icon: <Feather name="award" size={20} color={theme.colors.text} />,
      route: "/(admin)/report-cards",
      active: pathname === "/(admin)/report-cards",
    },
    {
      title: "Payments",
      icon: <Feather name="credit-card" size={20} color={theme.colors.text} />,
      route: "/(admin)/payments",
      active: pathname === "/(admin)/payments",
    },
    {
      title: "Notices",
      icon: <Feather name="bell" size={20} color={theme.colors.text} />,
      route: "/(admin)/notices",
      active: pathname === "/(admin)/notices",
    },
    {
      title: "Profile",
      icon: <Feather name="user" size={20} color={theme.colors.text} />,
      route: "/(admin)/profile",
      active: pathname === "/(admin)/profile",
    },
  ]

  const handleMenuItemPress = (route: string) => {
    router.push(route)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title={`School Management`} subtitle={user?.schoolName || ""} showBackButton={false} />
      <View style={styles.content}>
        <Drawer
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
          onLogout={logout}
          userRole="Admin"
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
