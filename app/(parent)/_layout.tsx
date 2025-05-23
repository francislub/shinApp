"use client"
import { Stack } from "expo-router"
import { ParentTabLayout } from "@/components/layouts/parent-tab-layout"
import { useAuth } from "@/context/auth-context"
import { Redirect } from "expo-router"

export default function ParentLayout() {
  const { user, isLoading } = useAuth()

  // Check if user is parent
  if (!isLoading && (!user || user.role !== "Parent")) {
    return <Redirect href="/auth/login" />
  }

  return (
    <ParentTabLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="children" />
        <Stack.Screen name="attendance" />
        <Stack.Screen name="results" />
        <Stack.Screen name="notices" />
        <Stack.Screen name="payments" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="profile" />
      </Stack>
    </ParentTabLayout>
  )
}
