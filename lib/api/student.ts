// Mock data for student dashboard
export async function fetchStudentDashboardStats() {
    // In a real app, this would be an API call
    return {
      subjectsCount: 0,
      attendancePercentage: 0,
      averageGrade: "-",
      unreadNotices: 0,
      activeComplaints: 0,
    }
  }
  