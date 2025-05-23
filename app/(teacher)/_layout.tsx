"use client"
import { Stack } from "expo-router"
import { TeacherTabLayout } from "@/components/layouts/teacher-tab-layout"
import { useAuth } from "@/context/auth-context"
import { Redirect } from "expo-router"

export default function TeacherLayout() {
  const { user, isLoading } = useAuth()

  // Check if user is teacher
  if (!isLoading && (!user || user.role !== "Teacher")) {
    return <Redirect href="/auth/login" />
  }

  return (
    <TeacherTabLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="classes" />
        <Stack.Screen name="subjects" />
        <Stack.Screen name="attendance" />
        <Stack.Screen name="exams" />
        <Stack.Screen name="ct-comments" />
        <Stack.Screen name="notices" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="profile" />
      </Stack>
    </TeacherTabLayout>
  )
}
