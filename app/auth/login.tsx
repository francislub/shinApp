"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { router } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { Feather } from "@expo/vector-icons"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Picker } from "@/components/ui/picker"
import { useTheme } from "@/context/theme-context"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from "@/components/carousel"

const carouselItems = [
  {
    title: "Data-Driven Outcomes",
    subtitle: "Build Future Leaders",
    image: require("@/assets/images/buil.jpeg"),
  },
  {
    title: "Comprehensive Management",
    subtitle: "One Platform for All",
    image: require("@/assets/images/pip.jpeg"),
  },
  {
    title: "Seamless Communication",
    subtitle: "Connect Teachers, Parents & Students",
    image: require("@/assets/images/pipp.jpeg"),
  },
]

export default function LoginScreen() {
  const { theme } = useTheme()
  const { login } = useAuth()
  const [userType, setUserType] = useState("Admin")
  const [email, setEmail] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      if (!password) {
        throw new Error("Password is required")
      }

      if (userType === "Student" && !rollNumber) {
        throw new Error("Roll number is required")
      } else if (userType !== "Student" && !email) {
        throw new Error("Email is required")
      }

      // Call login function from auth context
      await login({
        userType,
        identifier: userType === "Student" ? rollNumber : email,
        password,
      })

      // Navigation will be handled by the auth context
    } catch (err: any) {
      setError(err.message || "Failed to login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const navigateToRegister = () => {
    router.push("/auth/register")
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.splitScreen}>
            <View style={styles.formContainer}>
              <View style={styles.logoContainer}>
                <Image source={require("@/assets/images/log.jpg")} style={styles.logo} />
                <Text style={[styles.logoText, { color: theme.colors.primary }]}>Shining Stars</Text>
              </View>

              <Text style={[styles.title, { color: theme.colors.text }]}>Login to your Account</Text>

              <View style={styles.form}>
                <Text style={[styles.label, { color: theme.colors.text }]}>Login As</Text>
                <Picker
                  selectedValue={userType}
                  onValueChange={(value) => setUserType(value)}
                  items={[
                    { label: "Administrator", value: "Admin" },
                    { label: "Teacher", value: "Teacher" },
                    { label: "Student", value: "Student" },
                    { label: "Parent", value: "Parent" },
                  ]}
                />

                {userType === "Student" ? (
                  <>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Roll Number</Text>
                    <Input value={rollNumber} onChangeText={setRollNumber} placeholder="Enter your roll number" />
                  </>
                ) : (
                  <>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Email Address</Text>
                    <Input
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </>
                )}

                <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
                <View style={styles.passwordContainer}>
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry={!showPassword}
                    rightIcon={
                      <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.colors.text} />
                      </TouchableOpacity>
                    }
                  />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>Forgot password?</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Button onPress={handleLogin} loading={loading} style={styles.loginButton}>
                  Sign In
                </Button>

                {userType === "Admin" && (
                  <View style={styles.registerContainer}>
                    <Text style={[styles.registerText, { color: theme.colors.text }]}>
                      Don&apos;t have an admin account?
                    </Text>
                    <TouchableOpacity onPress={navigateToRegister}>
                      <Text style={[styles.registerLink, { color: theme.colors.primary }]}>Create Admin Account</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.carouselContainer}>
              <Carousel items={carouselItems} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  splitScreen: {
    flex: 1,
    flexDirection: "row",
  },
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 1,
    display: "none", // Hidden on mobile, will be shown on tablet/desktop with media queries
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 8,
  },
  passwordContainer: {
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  loginButton: {
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 8,
  },
  registerLink: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
})
