// Mock data for parent dashboard
export async function fetchParentDashboardStats() {
    // In a real app, this would be an API call
    return {
      childrenCount: 0,
      subjectsCount: 0,
      upcomingEvents: 0,
      pendingPayments: 0,
      unreadNotices: 0,
    }
  }
  