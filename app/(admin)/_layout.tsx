"use client"
import { Stack } from "expo-router"
import { AdminTabLayout } from "@/components/layouts/admin-tab-layout"
import { useAuth } from "@/context/auth-context"
import { Redirect } from "expo-router"

export default function AdminLayout() {
  const { user, isLoading } = useAuth()

  // Check if user is admin
  if (!isLoading && (!user || user.role !== "Admin")) {
    return <Redirect href="/auth/login" />
  }

  return (
    <AdminTabLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="students" />
        <Stack.Screen name="teachers" />
        <Stack.Screen name="parents" />
        <Stack.Screen name="classes" />
        <Stack.Screen name="subjects" />
        <Stack.Screen name="exams" />
        <Stack.Screen name="attendance" />
        <Stack.Screen name="report-cards" />
        <Stack.Screen name="payments" />
        <Stack.Screen name="notices" />
        <Stack.Screen name="profile" />
      </Stack>
    </AdminTabLayout>
  )
}
