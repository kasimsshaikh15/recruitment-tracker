import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Users, UserCheck, Building2,
  BarChart3, LogOut, Shield, UsersRound, CalendarCheck,
  Download, Upload, AlertTriangle, Handshake } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ROLE_COLORS = {
  superAdmin:   '#ef4444',
  companyAdmin: '#f97316',
  teamLead:     '#a855f7',
  recruiter:    '#22c55e',
}
const ROLE_LABELS = {
  superAdmin:   'Super Admin',
  companyAdmin: 'Company Admin',
  teamLead:     'Team Lead',
  recruiter:    'Recruiter',
}

export default function Sidebar() {
  const {
    visibleJobs: jobs, visibleCandidates: candidates,
    visibleCompanies: companies, visibleRecruiters: recruiters,
    currentUser, logout,
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
    exportAllData, importBackup,
  } = useApp()

  const fileInputRef = useRef(null)
  const openJobs  = jobs.filter(j => j.status === 'Open').length
  const roleColor = ROLE_COLORS[currentUser?.role] || 'var(--accent)'

  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = await importBackup(file)
    // Reset input so same file can be re-selected
    e.target.value = ''
    if (ok) {
      alert('✅ Backup restored successfully! Page will reload.')
      setTimeout(() => window.location.reload(), 500)
    }
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="HireTrakkr Logo" style={{ width: '60px', marginBottom: '10px' }} />
        <h1>HireTrakkr</h1>
        <p>hiretrakkr.com</p>
      </div>

      {/* Logged-in user chip */}
      {currentUser && (
        <div style={{
          margin: '0 12px 12px', padding: '10px 12px',
          background: `${roleColor}11`, border: `1px solid ${roleColor}33`,
          borderRadius: 8,
        }}>
          <div style={{ fontWeight: 600, fontSize: 12, color: roleColor }}>
            {currentUser.name || currentUser.username}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>
            {ROLE_LABELS[currentUser.role] || currentUser.role}
            {currentUser.role === 'superAdmin' && ' 🔐'}
          </div>
        </div>
      )}

      {/* ── WARNING BANNER ── */}
      <div style={{
        margin: '0 12px 12px', padding: '10px 12px',
        background: '#fef9c3', border: '1px solid #fbbf24',
        borderRadius: 8, display: 'flex', gap: 8, alignItems: 'flex-start',
      }}>
        <AlertTriangle size={14} style={{ color: '#d97706', flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 10, color: '#92400e', lineHeight: 1.5 }}>
          <strong>Data stored in this browser only.</strong><br />
          Do NOT clear browser cache.<br />
          Take regular backups below.
        </div>
      </div>

      {/* Nav sections */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Overview</div>
        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <LayoutDashboard /> Dashboard
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Recruitment</div>
        <NavLink to="/jobs" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Briefcase /> Job Postings
          {openJobs > 0 && <span className="nav-badge">{openJobs}</span>}
        </NavLink>
        <NavLink to="/candidates" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <Users /> Candidates
          <span className="nav-badge">{candidates.length}</span>
        </NavLink>
        <NavLink to="/pipeline" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <BarChart3 /> Pipeline
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Management</div>
        <NavLink to="/recruiters" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <UserCheck /> Recruiters
          {!isRecruiter && <span className="nav-badge">{recruiters.length}</span>}
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
          <CalendarCheck /> Attendance
        </NavLink>
        {(isSuperAdmin || isCompanyAdmin) && (
          <>
            <NavLink to="/companies" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Building2 /> Companies
              <span className="nav-badge">{companies.length}</span>
            </NavLink>
            <NavLink to="/recruitment-partners" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Handshake /> Recruitment Partners
            </NavLink>
          </>
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <NavLink to="/teams" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <UsersRound /> Teams
          </NavLink>
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <NavLink to="/users" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Shield /> User Management
          </NavLink>
        )}
      </div>

      {/* ── BACKUP SECTION ── */}
      <div style={{ padding: '12px 12px 0' }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: 1,
          textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8,
        }}>
          Data Backup
        </div>

        {/* Export button */}
        <button
          onClick={exportAllData}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', marginBottom: 6,
            background: '#f0fdf4', border: '1px solid #22c55e44',
            borderRadius: 6, color: '#15803d', cursor: 'pointer',
            fontSize: 12, fontWeight: 500,
          }}
        >
          <Download size={13} /> Export Backup (.json)
        </button>

        {/* Import button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            background: '#eff6ff', border: '1px solid #3b82f644',
            borderRadius: 6, color: '#1d4ed8', cursor: 'pointer',
            fontSize: 12, fontWeight: 500,
          }}
        >
          <Upload size={13} /> Restore Backup
        </button>
        <input
          ref={fileInputRef}
          type="file" accept=".json"
          style={{ display: 'none' }}
          onChange={handleImport}
        />
        <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 6, paddingLeft: 4 }}>
          Backup regularly to avoid data loss
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={logout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', background: 'var(--bg2)',
            border: '1px solid var(--border)', borderRadius: 4,
            color: 'var(--text)', cursor: 'pointer',
          }}
        >
          <LogOut size={16} /> Logout
        </button>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 8 }}>HireTrakkr v2.0</div>
        <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Enterprise Edition</div>
      </div>
    </aside>
  )
}
