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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/context/theme-context"
import { SafeAreaView } from "react-native-safe-area-context"
import { registerAdmin } from "@/lib/api/auth"

export default function RegisterScreen() {
  const { theme } = useTheme()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRegister = async () => {
    setError("")

    // Validation
    if (!name || !email || !schoolName || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await registerAdmin({
        name,
        email,
        schoolName,
        password,
      })

      // Show success message and navigate to login
      alert("Registration successful! Please check your email to verify your account.")
      router.replace("/auth/login")
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const navigateToLogin = () => {
    router.replace("/auth/login")
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style={theme.dark ? "light" : "dark"} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
              <Feather name="arrow-left" size={24} color={theme.colors.text} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Image source={require("@/assets/images/log.jpg")} style={styles.logo} />
              <Text style={[styles.logoText, { color: theme.colors.primary }]}>Shining Stars</Text>
            </View>

            <Text style={[styles.title, { color: theme.colors.text }]}>Create Admin Account</Text>

            <View style={styles.form}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
              <Input value={name} onChangeText={setName} placeholder="Enter your full name" />

              <Text style={[styles.label, { color: theme.colors.text }]}>Email Address</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={[styles.label, { color: theme.colors.text }]}>School Name</Text>
              <Input value={schoolName} onChangeText={setSchoolName} placeholder="Enter your school name" />

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

              <Text style={[styles.label, { color: theme.colors.text }]}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <Input
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  secureTextEntry={!showPassword}
                  rightIcon={
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                  }
                />
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button onPress={handleRegister} loading={loading} style={styles.registerButton}>
                Create Account
              </Button>

              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: theme.colors.text }]}>Already have an account?</Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={[styles.loginLink, { color: theme.colors.primary }]}>Sign In</Text>
                </TouchableOpacity>
              </View>
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
  formContainer: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
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
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginRight: 4,
  },
  loginLink: {
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
