"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useTheme } from "@/context/theme-context"

interface MenuItem {
  title: string
  icon: React.ReactNode
  route: string
  active: boolean
}

interface DrawerProps {
  menuItems: MenuItem[]
  onMenuItemPress: (route: string) => void
  onLogout: () => void
  userRole: string
  userName: string
  userEmail: string
}

export function Drawer({ menuItems, onMenuItemPress, onLogout, userRole, userName, userEmail }: DrawerProps) {
  const { theme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.cardBackground },
        isCollapsed ? styles.collapsedContainer : {},
      ]}
    >
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDrawer}>
        <Feather name={isCollapsed ? "chevron-right" : "chevron-left"} size={20} color={theme.colors.text} />
      </TouchableOpacity>

      {!isCollapsed && (
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <Text style={[styles.avatarText, { color: theme.colors.background }]}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.userName, { color: theme.colors.text }]}>{userName}</Text>
          <Text style={[styles.userRole, { color: theme.colors.textSecondary }]}>{userRole}</Text>
          <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>
      )}

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              item.active ? { backgroundColor: theme.colors.primaryLight } : {},
              isCollapsed ? styles.collapsedMenuItem : {},
            ]}
            onPress={() => onMenuItemPress(item.route)}
          >
            <View style={styles.menuIcon}>{item.icon}</View>
            {!isCollapsed && (
              <Text style={[styles.menuText, { color: item.active ? theme.colors.primary : theme.colors.text }]}>
                {item.title}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.logoutButton, isCollapsed ? styles.collapsedLogoutButton : {}]}
        onPress={onLogout}
      >
        <Feather name="log-out" size={20} color={theme.colors.text} />
        {!isCollapsed && <Text style={[styles.logoutText, { color: theme.colors.text }]}>Logout</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: "100%",
    borderRightWidth: 1,
    borderRightColor: "rgba(0, 0, 0, 0.1)",
  },
  collapsedContainer: {
    width: 60,
  },
  toggleButton: {
    padding: 12,
    alignItems: "flex-end",
  },
  userInfo: {
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4C6FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  userName: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  collapsedMenuItem: {
    justifyContent: "center",
    padding: 8,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  collapsedLogoutButton: {
    justifyContent: "center",
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
})
