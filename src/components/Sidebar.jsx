import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Users, UserCheck, Building2,
  BarChart3, LogOut, Shield, UsersRound, CalendarCheck,
  Download, Upload, AlertTriangle, Handshake, Database,
} from 'lucide-react'
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
    visibleJobs: jobs,
    visibleCandidates: candidates,
    visibleCompanies: companies,
    visibleRecruiters: recruiters,
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
    e.target.value = ''
    if (ok) {
      // Data is updated in state — no reload needed since Firebase is source of truth
      // The state setters in importBackup already update UI
    }
  }

  return (
    <aside className="sidebar">
      {/* Logo — uses actual /logo.svg file */}
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="HireTrakkr Logo" style={{ width:52, height:52, marginBottom:8, display:'block' }} />
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:18, color:'var(--text)', letterSpacing:-0.3, lineHeight:1.2 }}>
          Hire<span style={{ color:'var(--accent)' }}>Trakkr</span>
        </h1>
        <p>hiretrakkr.com</p>
        {/* Firebase status badge */}
        <div className="firebase-badge" style={{ marginTop:6 }}>
          <span className="dot"/>
          <Database size={9} style={{ opacity:0.6 }}/>
          Make Hiring Simple
        </div>
      </div>

      {/* Role chip */}
      {currentUser && (
        <div style={{
          margin:'0 10px 10px',
          padding:'10px 12px',
          background:`${roleColor}10`,
          border:`1px solid ${roleColor}28`,
          borderRadius:9,
        }}>
          <div style={{ fontWeight:600, fontSize:12.5, color:roleColor }}>
            {currentUser.name || currentUser.username}
          </div>
          <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
            {ROLE_LABELS[currentUser.role] || currentUser.role}
            {currentUser.role === 'superAdmin' && ' 🔐'}
          </div>
        </div>
      )}

      {/* Warning banner */}
      <div style={{
        margin:'0 10px 10px',
        padding:'9px 11px',
        background:'rgba(245,158,11,0.06)',
        border:'1px solid rgba(245,158,11,0.2)',
        borderRadius:8,
        display:'flex', gap:8, alignItems:'flex-start',
      }}>
        <AlertTriangle size={13} style={{ color:'#f59e0b', flexShrink:0, marginTop:1 }} />
        <div style={{ fontSize:10.5, color:'#92714a', lineHeight:1.5 }}>
          <strong style={{ color:'#c98b3a' }}>Sync with HireTrakkr.</strong><br />
          Export backups regularly.
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-section-label">Overview</div>
        <NavLink to="/" end className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <LayoutDashboard /> Dashboard
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Recruitment</div>
        <NavLink to="/jobs" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <Briefcase /> Job Postings
          {openJobs > 0 && <span className="nav-badge">{openJobs}</span>}
        </NavLink>
        <NavLink to="/candidates" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <Users /> Candidates
          {candidates.length > 0 && <span className="nav-badge">{candidates.length}</span>}
        </NavLink>
        <NavLink to="/pipeline" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <BarChart3 /> Pipeline
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Management</div>
        <NavLink to="/recruiters" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <UserCheck /> Recruiters
          {!isRecruiter && recruiters.length > 0 && <span className="nav-badge">{recruiters.length}</span>}
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
          <CalendarCheck /> Attendance
        </NavLink>
        {(isSuperAdmin || isCompanyAdmin) && (
          <>
            <NavLink to="/companies" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
              <Building2 /> Companies
              {companies.length > 0 && <span className="nav-badge">{companies.length}</span>}
            </NavLink>
            <NavLink to="/recruitment-partners" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
              <Handshake /> Recruitment Partners
            </NavLink>
          </>
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <NavLink to="/teams" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
            <UsersRound /> Teams
          </NavLink>
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <NavLink to="/users" className={({ isActive }) => `nav-item${isActive?' active':''}`}>
            <Shield /> User Management
          </NavLink>
        )}
      </div>

      {/* Backup section */}
      <div style={{ padding:'14px 10px 0' }}>
        <div style={{
          fontSize:9.5, fontWeight:700, letterSpacing:1.2,
          textTransform:'uppercase', color:'var(--text3)', marginBottom:8, paddingLeft:4,
        }}>
          Data Backup
        </div>

        <button
          onClick={exportAllData}
          style={{
            width:'100%', display:'flex', alignItems:'center', gap:8,
            padding:'9px 12px', marginBottom:6,
            background:'var(--green-bg)',
            border:'1px solid rgba(34,197,94,0.2)',
            borderRadius:8, color:'#4ade80',
            cursor:'pointer', fontSize:12, fontWeight:500,
            fontFamily:'var(--font)', transition:'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(34,197,94,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(34,197,94,0.07)'}
        >
          <Download size={13} /> Export Backup (.json)
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            width:'100%', display:'flex', alignItems:'center', gap:8,
            padding:'9px 12px',
            background:'var(--accent-glow)',
            border:'1px solid rgba(79,124,255,0.2)',
            borderRadius:8, color:'var(--accent2)',
            cursor:'pointer', fontSize:12, fontWeight:500,
            fontFamily:'var(--font)', transition:'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(79,124,255,0.13)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(79,124,255,0.07)'}
        >
          <Upload size={13} /> Restore Backup
        </button>
        <input
          ref={fileInputRef}
          type="file" accept=".json"
          style={{ display:'none' }}
          onChange={handleImport}
        />
        <div style={{ fontSize:10, color:'var(--text3)', marginTop:6, paddingLeft:4, lineHeight:1.5 }}>
          Backup regularly to avoid data loss
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop:'auto', padding:'16px 12px', borderTop:'1px solid var(--border)' }}>
        <button
          onClick={logout}
          style={{
            width:'100%', display:'flex', alignItems:'center', gap:9,
            padding:'9px 12px',
            background:'var(--red-bg)',
            border:'1px solid rgba(239,68,68,0.15)',
            borderRadius:8, color:'#f87171',
            cursor:'pointer', fontSize:13, fontWeight:500,
            fontFamily:'var(--font)', transition:'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(239,68,68,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(239,68,68,0.06)'}
        >
          <LogOut size={15} /> Logout
        </button>
        <div style={{ fontSize:11, color:'var(--text3)', marginTop:10, paddingLeft:2 }}>HireTrakkr v1.0</div>
        <div style={{ fontSize:10, color:'var(--text3)', marginTop:1, paddingLeft:2 }}>HireTrakkr Edition</div>
      </div>
    </aside>
  )
}