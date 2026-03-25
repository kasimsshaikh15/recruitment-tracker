import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Briefcase, Users, UserCheck, Building2, BarChart3, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Sidebar() {
  const { jobs, candidates, companies, recruiters, logout } = useApp()
  const openJobs = jobs.filter(j=>j.status==='Open').length

  const handleLogout = () => {
    logout()
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="HireTrackr Logo" style={{ width: '60px', marginBottom: '10px' }} />
        <h1>Hire<span>Trackr</span></h1>
        <p>hiretrackr.com</p>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Overview</div>
        <NavLink to="/" end className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <LayoutDashboard /> Dashboard
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Recruitment</div>
        <NavLink to="/jobs" className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <Briefcase /> Job Postings
          {openJobs > 0 && <span className="nav-badge">{openJobs}</span>}
        </NavLink>
        <NavLink to="/candidates" className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <Users /> Candidates
          <span className="nav-badge">{candidates.length}</span>
        </NavLink>
        <NavLink to="/pipeline" className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <BarChart3 /> Pipeline
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Management</div>
        <NavLink to="/recruiters" className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <UserCheck /> Recruiters
          <span className="nav-badge">{recruiters.length}</span>
        </NavLink>
        <NavLink to="/companies" className={({isActive})=>`nav-item${isActive?' active':''}`}>
          <Building2 /> Companies
          <span className="nav-badge">{companies.length}</span>
        </NavLink>
      </div>

      <div style={{marginTop:'auto', padding:'16px 20px', borderTop:'1px solid var(--border)'}}>
        <button onClick={handleLogout} style={{width:'100%', display:'flex', alignItems:'center', gap:8, padding:'8px 12px', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:4, color:'var(--text)', cursor:'pointer'}}>
          <LogOut size={16} /> Logout
        </button>
        <div style={{fontSize:11,color:'var(--text3)', marginTop:8}}>HireTrackr v2.0</div>
        <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>Enterprise Edition</div>
      </div>
    </aside>
  )
}
