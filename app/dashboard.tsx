"use client"
import { Redirect } from "expo-router"
import { useAuth } from "@/context/auth-context"
import LoadingScreen from "@/components/ui/loading-screen"

export default function DashboardRedirect() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <Redirect href="/auth/login" />
  }

  // Redirect based on user role
  switch (user.role) {
    case "Admin":
      return <Redirect href="/(admin)/dashboard" />
    case "Teacher":
      return <Redirect href="/(teacher)/dashboard" />
    case "Student":
      return <Redirect href="/(student)/dashboard" />
    case "Parent":
      return <Redirect href="/(parent)/dashboard" />
    default:
      return <Redirect href="/auth/login" />
  }
}
