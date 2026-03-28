import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Super Admin hardcoded credentials (encrypted in production)
// IMPORTANT: Keep these credentials secure. Do not share with anyone.
// Username: admin_hiretrakkr_system
// Password: HireTrakkr@Admin#2026Secure (user enters in plain text, hashed on verification)
const SUPER_ADMIN_USERNAME = 'admin_hiretrakkr_system'
const SUPER_ADMIN_PASSWORD = 'HireTrakkr@Admin#2026Secure'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim()) { setError('Please enter your username'); return }
    if (!password.trim()) { setError('Please enter your password');  return }
    
    // Try to login (works for super admin with hardcoded creds, or other users from database)
    const ok = await login(username.trim(), password)
    if (ok) navigate('/')
    else setError('Incorrect username or password.')
  }

  const inp = {
    width: '100%', padding: '0.75rem',
    border: '2px solid #e1e5e9', borderRadius: '8px',
    fontSize: '1rem', boxSizing: 'border-box',
    transition: 'border-color 0.2s', outline: 'none',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"DM Sans", sans-serif', padding: '20px',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Card */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/logo.svg" alt="HireTrakkr" style={{ width: 72, height: 72 }} />
            <h1 style={{ margin: '0.75rem 0 0.25rem', color: '#1a1a1a', fontSize: '1.9rem', fontWeight: 700, fontFamily: '"Instrument Serif", serif' }}>
              HireTrakkr
            </h1>
            <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>HRMS and hiring simplified</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500, fontSize: '0.9rem' }}>Username</label>
              <input
                type="text" value={username} onChange={e => setUsername(e.target.value)}
                autoComplete="off"
                style={inp} placeholder="Enter username"
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e  => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 500, fontSize: '0.9rem' }}>Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                autoComplete="off"
                style={inp} placeholder="Enter password"
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e  => e.target.style.borderColor = '#e1e5e9'}
              />
            </div>

            {error && (
              <div style={{ background: '#fee', color: '#c33', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem', border: '1px solid #fcc' }}>
                {error}
              </div>
            )}

            <button type="submit" style={{
              width: '100%', padding: '0.8rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white', border: 'none', borderRadius: '8px',
              fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
            }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
