"use client"
import { Stack } from "expo-router"
import { StudentTabLayout } from "@/components/layouts/student-tab-layout"
import { useAuth } from "@/context/auth-context"
import { Redirect } from "expo-router"

export default function StudentLayout() {
  const { user, isLoading } = useAuth()

  // Check if user is student
  if (!isLoading && (!user || user.role !== "Student")) {
    return <Redirect href="/auth/login" />
  }

  return (
    <StudentTabLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="subjects" />
        <Stack.Screen name="attendance" />
        <Stack.Screen name="exams" />
        <Stack.Screen name="results" />
        <Stack.Screen name="notices" />
        <Stack.Screen name="complaints" />
        <Stack.Screen name="profile" />
      </Stack>
    </StudentTabLayout>
  )
}
