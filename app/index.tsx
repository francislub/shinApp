"use client"
import { StyleSheet } from "react-native"
import { Redirect } from "expo-router"
import { useAuth } from "@/context/auth-context"
import LoadingScreen from "@/components/ui/loading-screen"

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />
  }

  return <Redirect href="/auth/login" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
