const API_BASE_URL = 'http://localhost:3001/api'

export const authAPI = {
  // Login with password
  login: async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Authentication failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }
}
