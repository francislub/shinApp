// Mock data for admin dashboard
export async function fetchAdminDashboardStats() {
    // In a real app, this would be an API call
    return {
      teachersCount: 3,
      studentsCount: 1,
      classesCount: 3,
      subjectsCount: 2,
      activeTerms: 1,
      activeNotices: 1,
    }
  }
  