// Security utilities for HireTrackr

/**
 * CSRF protection token generator (for future API integration)
 * @returns {string} - Random CSRF token
 */
export const generateCSRFToken = () => {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
}