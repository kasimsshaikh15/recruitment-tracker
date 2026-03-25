// Security utilities for HireTrackr

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = []

  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Securely stores data in localStorage with encryption placeholder
 * @param {string} key - The storage key
 * @param {any} value - The value to store
 */
export const secureStore = (key, value) => {
  try {
    const data = JSON.stringify(value)
    // In a real application, you would encrypt this data
    // For now, we'll use base64 encoding as a placeholder
    const encoded = btoa(data)
    localStorage.setItem(key, encoded)
  } catch (error) {
    console.warn('Failed to store data securely:', error)
  }
}

/**
 * Securely retrieves data from localStorage
 * @param {string} key - The storage key
 * @returns {any} - The retrieved value
 */
export const secureRetrieve = (key) => {
  try {
    const encoded = localStorage.getItem(key)
    if (!encoded) return null
    // Decode the data
    const decoded = atob(encoded)
    return JSON.parse(decoded)
  } catch (error) {
    console.warn('Failed to retrieve data securely:', error)
    return null
  }
}

/**
 * Clears sensitive data from memory
 * @param {...string} variables - Variable names to clear
 */
export const clearSensitiveData = (...variables) => {
  variables.forEach(varName => {
    if (typeof window !== 'undefined' && window[varName]) {
      window[varName] = null
      delete window[varName]
    }
  })
}

/**
 * Rate limiting helper to prevent brute force attacks
 */
class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
    this.attempts = []
  }

  canAttempt() {
    const now = Date.now()
    // Remove old attempts outside the window
    this.attempts = this.attempts.filter(time => now - time < this.windowMs)

    return this.attempts.length < this.maxAttempts
  }

  recordAttempt() {
    this.attempts.push(Date.now())
  }

  getRemainingTime() {
    if (this.attempts.length === 0) return 0
    const oldestAttempt = Math.min(...this.attempts)
    const timePassed = Date.now() - oldestAttempt
    return Math.max(0, this.windowMs - timePassed)
  }
}

// Export a rate limiter instance for login attempts
export const loginRateLimiter = new RateLimiter()

/**
 * CSRF protection token generator (for future API integration)
 * @returns {string} - Random CSRF token
 */
export const generateCSRFToken = () => {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
}