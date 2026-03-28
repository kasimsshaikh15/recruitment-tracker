// ─── HireTrakkr Security Utilities ───────────────────────────────────────────

/**
 * Hash a password using SHA-256 via Web Crypto API.
 * Returns a hex string. This is a ONE-WAY hash — cannot be reversed.
 * Used so plain-text passwords are never stored in IndexedDB or localStorage.
 */
export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + '_hiretrakkr_salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Verify a plain-text password against a stored hash.
 */
export async function verifyPassword(plainPassword, storedHash) {
  const hash = await hashPassword(plainPassword)
  return hash === storedHash
}

/**
 * Hash all users in a seed array — used once at first boot.
 */
export async function hashSeedUsers(users) {
  return Promise.all(users.map(async u => ({
    ...u,
    password: await hashPassword(u.password),
  })))
}

/**
 * CSRF token generator (for future API use)
 */
export const generateCSRFToken = () => {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
}
