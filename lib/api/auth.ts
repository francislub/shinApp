import AsyncStorage from "@react-native-async-storage/async-storage"

// Mock data for development
const MOCK_USERS = {
  admin: {
    id: "admin1",
    name: "Lubanjwa Francis",
    email: "lubanjwafrancispro@gmail.com",
    role: "Admin",
    schoolName: "Shining Stars Academy",
  },
  teacher: {
    id: "teacher1",
    name: "Simon",
    email: "larkstechhub@gmail.com",
    role: "Teacher",
  },
  student: {
    id: "student1",
    name: "Lubanjwa Francis",
    rollNum: "22001",
    role: "Student",
  },
  parent: {
    id: "parent1",
    name: "Lubanjwa Francis",
    email: "parent2@gmail.com",
    role: "Parent",
  },
}

interface LoginCredentials {
  userType: string
  identifier: string
  password: string
}

interface RegisterAdminData {
  name: string
  email: string
  schoolName: string
  password: string
}

export async function loginUser(credentials: LoginCredentials) {
  try {
    // For development, use mock data
    // In production, this would be an API call
    let user

    if (credentials.userType === "Admin" && credentials.identifier === "lubanjwafrancispro@gmail.com") {
      user = MOCK_USERS.admin
    } else if (credentials.userType === "Teacher" && credentials.identifier === "larkstechhub@gmail.com") {
      user = MOCK_USERS.teacher
    } else if (credentials.userType === "Student" && credentials.identifier === "22001") {
      user = MOCK_USERS.student
    } else if (credentials.userType === "Parent" && credentials.identifier === "parent2@gmail.com") {
      user = MOCK_USERS.parent
    } else {
      throw new Error("Invalid credentials")
    }

    // Store user data in AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(user))
    await AsyncStorage.setItem("token", "mock-token")

    return user
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function registerAdmin(data: RegisterAdminData) {
  try {
    // For development, just return success
    // In production, this would be an API call
    return { success: true }
  } catch (error) {
    console.error("Register error:", error)
    throw error
  }
}

export async function logoutUser() {
  try {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem("user")
    await AsyncStorage.removeItem("token")

    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const userJson = await AsyncStorage.getItem("user")
    if (!userJson) return null

    return JSON.parse(userJson)
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}
