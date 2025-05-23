"use client"

import type { ReactNode } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { usePathname, router } from "expo-router"
import { useTheme } from "@/context/theme-context"
import { Feather, FontAwesome5 } from "@expo/vector-icons"
import { useAuth } from "@/context/auth-context"
import { Drawer } from "@/components/ui/drawer"
import { Header } from "@/components/ui/header"

interface ParentTabLayoutProps {
  children: ReactNode
}

export function ParentTabLayout({ children }: ParentTabLayoutProps) {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Feather name="grid" size={20} color={theme.colors.text} />,
      route: "/(parent)/dashboard",
      active: pathname === "/(parent)/dashboard",
    },
    {
      title: "Children",
      icon: <FontAwesome5 name="child" size={20} color={theme.colors.text} />,
      route: "/(parent)/children",
      active: pathname === "/(parent)/children",
    },
    {
      title: "Attendance",
      icon: <Feather name="check-circle" size={20} color={theme.colors.text} />,
      route: "/(parent)/attendance",
      active: pathname === "/(parent)/attendance",
    },
    {
      title: "Results",
      icon: <Feather name="award" size={20} color={theme.colors.text} />,
      route: "/(parent)/results",
      active: pathname === "/(parent)/results",
    },
    {
      title: "Notices",
      icon: <Feather name="bell" size={20} color={theme.colors.text} />,
      route: "/(parent)/notices",
      active: pathname === "/(parent)/notices",
    },
    {
      title: "Payments",
      icon: <Feather name="credit-card" size={20} color={theme.colors.text} />,
      route: "/(parent)/payments",
      active: pathname === "/(parent)/payments",
    },
    {
      title: "Messages",
      icon: <Feather name="mail" size={20} color={theme.colors.text} />,
      route: "/(parent)/messages",
      active: pathname === "/(parent)/messages",
    },
    {
      title: "Profile",
      icon: <Feather name="user" size={20} color={theme.colors.text} />,
      route: "/(parent)/profile",
      active: pathname === "/(parent)/profile",
    },
  ]

  const handleMenuItemPress = (route: string) => {
    router.push(route)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header title="School Management" subtitle="Parent Dashboard" showBackButton={false} />
      <View style={styles.content}>
        <Drawer
          menuItems={menuItems}
          onMenuItemPress={handleMenuItemPress}
          onLogout={logout}
          userRole="Parent"
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
