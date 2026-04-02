import React from 'react'
import { useApp } from '../context/AppContext'
import { Avatar, StatusBadge } from '../components/Shared'
import { Briefcase, Users, UserCheck, Building2, TrendingUp, Clock, CheckCircle, XCircle, Shield, CalendarCheck } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#4f7cff','#a855f7','#22c55e','#f59e0b','#06b6d4','#f97316','#ef4444']

const ROLE_META = {
  superAdmin:   { label: 'Super Admin',    color: '#ef4444', bg: 'rgba(239,68,68,0.08)', icon: '🔐', desc: 'Viewing all companies & global data' },
  companyAdmin: { label: 'Company Admin',  color: '#f97316', bg: 'rgba(249,115,22,0.08)', icon: '🏢', desc: 'Viewing your company\'s teams & data' },
  teamLead:     { label: 'Team Lead',      color: '#a855f7', bg: 'rgba(168,85,247,0.08)', icon: '👥', desc: 'Viewing your team\'s recruiters & submissions' },
  recruiter:    { label: 'Recruiter',      color: '#22c55e', bg: 'rgba(34,197,94,0.08)', icon: '🎯', desc: 'Viewing your own submissions & attendance' },
}

function RoleBanner({ currentUser, visibleCompanies = [], teams = [] }) {
  if (!currentUser) return null
  const meta = ROLE_META[currentUser.role] || {}
  const company = visibleCompanies[0]
  const team = teams.find(t => t.id === currentUser.teamId)
  return (
    <div style={{
      background: `${meta.color}12`, border: `1px solid ${meta.color}30`,
      borderRadius: 10, padding: '12px 16px', marginBottom: 20,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ fontSize: 20 }}>{meta.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: meta.color, fontSize: 13 }}>
          {currentUser.name || currentUser.username} — {meta.label}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
          {meta.desc}
          {company && ` · ${company.name}`}
          {team && ` · ${team.name}`}
        </div>
      </div>
      <div style={{
        background: meta.color, color: 'white', fontSize: 10,
        padding: '3px 8px', borderRadius: 20, fontWeight: 600,
      }}>
        {currentUser.role}
      </div>
    </div>
  )
}

// ✅ FIX: Added default empty arrays for both props to prevent .filter() on undefined
function AttendanceSummary({ visibleAttendance = [], visibleRecruiters = [] }) {
  const today = new Date().toISOString().slice(0, 10)
  const todayAtt = visibleAttendance.filter(a => a.date === today)
  const present = todayAtt.filter(a => a.status === 'Present').length
  const absent  = todayAtt.filter(a => a.status === 'Absent').length
  const total   = visibleRecruiters.length
  const pending = total - present - absent

  return (
    <div className="stat-card" style={{ gridColumn: 'span 1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <CalendarCheck size={16} style={{ color: 'var(--accent)' }} />
        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>Today's Attendance</div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)' }}>{present}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Present</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--red)' }}>{absent}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Absent</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text3)' }}>{pending}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>Pending</div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const {
    currentUser,
    visibleJobs: jobs = [],               // ✅ FIX: fallback to []
    visibleCandidates: candidates = [],   // ✅ FIX: fallback to []
    visibleCompanies: companies = [],     // ✅ FIX: fallback to []
    visibleRecruiters: recruiters = [],   // ✅ FIX: fallback to []
    visibleTeams: teams = [],             // ✅ FIX: fallback to []
    visibleAttendance = [],               // ✅ FIX: fallback to []
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
    STATUSES = [],                        // ✅ FIX: fallback to []
  } = useApp()

  const openJobs = jobs.filter(j => j.status === 'Open').length
  const statusCounts = STATUSES.map(s => ({
    name: s.replace(/[^\w\s]/g, '').trim(),
    value: candidates.filter(c => c.status === s).length
  })).filter(x => x.value > 0)

  const companyCounts = companies.map(co => ({
    name: co.name.split(' ')[0],
    jobs: jobs.filter(j => j.companyId === co.id).length,
    candidates: candidates.filter(c => c.companyId === co.id).length,
  }))

  const recruiterStats = recruiters.map(r => ({
    name: r.name.split(' ')[0],
    submissions: candidates.filter(c => c.recruiterId === r.id).length
  }))

  const teamStats = teams.map(t => ({
    name: t.name.replace(' Team', ''),
    candidates: candidates.filter(c =>
      recruiters.filter(r => r.teamId === t.id).map(r => r.id).includes(c.recruiterId)
    ).length
  }))

  const recent = [...candidates]
    .sort((a, b) => (b.appliedDate || '').localeCompare(a.appliedDate || ''))
    .slice(0, 6)

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '10px 14px', fontSize: 12 }}>
        <div style={{ color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => <div key={i} style={{ color: p.color }}>{p.name}: {p.value}</div>)}
      </div>
    )
  }

  return (
    <div className="content">
      <RoleBanner currentUser={currentUser} visibleCompanies={companies} teams={teams} />

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon blue"><Briefcase /></div>
          <div className="stat-value">{jobs.length}</div>
          <div className="stat-label">Total Job Postings</div>
          <div className="stat-change up">↑ {openJobs} open positions</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon green"><Users /></div>
          <div className="stat-value">{candidates.length}</div>
          <div className="stat-label">{isRecruiter ? 'My Candidates' : 'Total Candidates'}</div>
          <div className="stat-change up">↑ {candidates.filter(c => c.status === '🎉 Joined').length} joined</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon purple"><UserCheck /></div>
          <div className="stat-value">{recruiters.length}</div>
          <div className="stat-label">{isTeamLead ? 'Team Recruiters' : 'Active Recruiters'}</div>
          <div className="stat-change up">
            {isSuperAdmin ? `Managing ${companies.length} companies` :
             isCompanyAdmin ? `Across ${teams.length} teams` :
             isTeamLead ? `In your team` : 'Your profile'}
          </div>
        </div>
        {(isSuperAdmin || isCompanyAdmin) && (
          <div className="stat-card orange">
            <div className="stat-icon orange"><Building2 /></div>
            <div className="stat-value">{companies.length}</div>
            <div className="stat-label">Client Companies</div>
            <div className="stat-change up">{openJobs} open roles</div>
          </div>
        )}
        {isTeamLead && (
          <div className="stat-card orange">
            <div className="stat-icon orange"><Building2 /></div>
            <div className="stat-value">{teams.length}</div>
            <div className="stat-label">Your Team</div>
            <div className="stat-change up">{recruiters.length} recruiters</div>
          </div>
        )}
        <div className="stat-card cyan">
          <div className="stat-icon cyan"><TrendingUp /></div>
          <div className="stat-value">{candidates.filter(c => c.status === '✅ Selected' || c.status === '🎉 Joined').length}</div>
          <div className="stat-label">Successful Placements</div>
          <div className="stat-change up">
            ↑ {Math.round((candidates.filter(c => c.status === '✅ Selected' || c.status === '🎉 Joined').length / Math.max(1, candidates.length)) * 100)}% success rate
          </div>
        </div>
      </div>

      {/* Attendance Summary Card (for monitors) */}
      {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
        <div style={{ marginBottom: 20 }}>
          <AttendanceSummary visibleAttendance={visibleAttendance} visibleRecruiters={recruiters} />
        </div>
      )}

      {/* Recruiter self-attendance widget */}
      {isRecruiter && (() => {
        const today = new Date().toISOString().slice(0, 10)
        const myAtt = visibleAttendance.find(a => a.date === today)
        return (
          <div style={{
            background: myAtt?.status === 'Present' ? 'var(--green-bg)' : myAtt?.status === 'Absent' ? '#fef2f2' : 'var(--surface)',
            border: `1px solid ${myAtt?.status === 'Present' ? '#22c55e33' : myAtt?.status === 'Absent' ? '#ef444433' : 'var(--border)'}`,
            borderRadius: 10, padding: '14px 18px', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <CalendarCheck size={20} style={{ color: myAtt?.status === 'Present' ? '#22c55e' : myAtt?.status === 'Absent' ? '#ef4444' : 'var(--text3)' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>
                Today's Attendance: {myAtt?.status || 'Not yet marked'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>Go to Recruiters page to mark your attendance</div>
            </div>
          </div>
        )
      })()}

      {/* Charts */}
      <div className="chart-grid">
        {/* Company breakdown - only for superAdmin/companyAdmin */}
        {(isSuperAdmin || isCompanyAdmin) && (
          <div className="chart-card">
            <div className="chart-card-title">Candidates by Company</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={companyCounts} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="jobs" name="Jobs" fill="#4f7cff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="candidates" name="Candidates" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Team breakdown - superAdmin / companyAdmin */}
        {(isSuperAdmin || isCompanyAdmin) && teamStats.length > 0 && (
          <div className="chart-card">
            <div className="chart-card-title">Candidates by Team</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={teamStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="candidates" name="Candidates" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="chart-card">
          <div className="chart-card-title">Candidate Status Breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {statusCounts.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: 'var(--text3)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recruiter submissions - all roles except pure recruiter */}
        {!isRecruiter && (
          <div className="chart-card">
            <div className="chart-card-title">Submissions per Recruiter</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={recruiterStats} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <XAxis type="number" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="submissions" name="Submissions" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="chart-card">
          <div className="chart-card-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={14} /> Recent Activity
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {recent.length === 0 && (
              <div style={{ color: 'var(--text3)', fontSize: 13, textAlign: 'center', padding: 20 }}>No recent activity</div>
            )}
            {recent.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Avatar name={c.name} size={28} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{c.appliedDate}</div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}