import React, { useState, useMemo } from 'react'
import { CheckCircle, XCircle, CalendarCheck, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar } from '../components/Shared'

function AttendanceBadge({ status }) {
  if (!status) return <span style={{ fontSize: 12, color: 'var(--text3)' }}>— Pending</span>
  const isPresent = status === 'Present'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
      background: isPresent ? '#dcfce7' : '#fee2e2',
      color: isPresent ? '#15803d' : '#b91c1c',
    }}>
      {isPresent ? <CheckCircle size={12} /> : <XCircle size={12} />}
      {status}
    </span>
  )
}

export default function Attendance() {
  const {
    currentUser,
    visibleRecruiters: recruiters,
    visibleAttendance,
    markAttendance,
    companies, teams,
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
  } = useApp()

  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [liveUpdate, setLiveUpdate] = useState(0) // Force refresh for real-time updates
  const isToday = selectedDate === today

  // Managers = superAdmin, companyAdmin, teamLead — they MONITOR only
  const isManager = isSuperAdmin || isCompanyAdmin || isTeamLead

  // Get first day of current month and last day
  const now = new Date()
  const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
  const lastDayMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10)

  // For recruiters: their own recruiter profile
  const myRecruiterProfile = isRecruiter ? recruiters.find(r => r.id === currentUser?.recruiterId) : null

  // DEBUG: Show debug info for recruiter role
  React.useEffect(() => {
    if (isRecruiter) {
      console.log('🔍 RECRUITER DEBUG:')
      console.log('  currentUser:', currentUser)
      console.log('  currentUser.recruiterId:', currentUser?.recruiterId)
      console.log('  recruiters list:', recruiters)
      console.log('  myRecruiterProfile found:', myRecruiterProfile)
    }
  }, [isRecruiter, currentUser, recruiters, myRecruiterProfile])

  // Auto-refresh for managers every 5 seconds to show live updates
  React.useEffect(() => {
    if (isManager && isToday) {
      const interval = setInterval(() => setLiveUpdate(u => u + 1), 5000)
      return () => clearInterval(interval)
    }
  }, [isManager, isToday])

  // Attendance records for selected date
  const dateAttendance = useMemo(
    () => visibleAttendance.filter(a => a.date === selectedDate),
    [visibleAttendance, selectedDate, liveUpdate]
  )

  const getAtt = (recruiterId) =>
    dateAttendance.find(a => a.recruiterId === recruiterId)

  // Check if attendance was marked recently (last 5 minutes)
  const isRecentlyMarked = (recruiterId) => {
    const att = getAtt(recruiterId)
    if (!att?.markedAt) return false
    const markedTime = new Date(att.markedAt)
    const now = new Date()
    const diffMinutes = (now - markedTime) / (1000 * 60)
    return diffMinutes < 5
  }

  // Get formatted time since marked
  const getTimeSinceMarked = (recruiterId) => {
    const att = getAtt(recruiterId)
    if (!att?.markedAt) return ''
    const markedTime = new Date(att.markedAt)
    const now = new Date()
    const diffSeconds = Math.floor((now - markedTime) / 1000)
    if (diffSeconds < 60) return `${diffSeconds}s ago`
    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.floor(diffMinutes / 60)
    return `${diffHours}h ago`
  }

  // Filtered recruiter list
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return recruiters.filter(r =>
      !q || r.name.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q)
    )
  }, [recruiters, search])

  // Summary counts
  const presentCount = filtered.filter(r => getAtt(r.id)?.status === 'Present').length
  const absentCount  = filtered.filter(r => getAtt(r.id)?.status === 'Absent').length
  const pendingCount = filtered.length - presentCount - absentCount

  return (
    <div className="content">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Attendance</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
            {isRecruiter ? '✅ Mark your attendance for any date this month' : '👁 Monitor your team\'s attendance'}
          </div>
        </div>
        {/* Date picker — all users can pick dates */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isManager && isToday && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#f0fdf4', padding: '6px 12px', borderRadius: 6,
              border: '1px solid #22c55e', fontSize: 11, fontWeight: 600, color: '#15803d'
            }}>
              <span style={{ animation: 'pulse 2s infinite' }}>●</span>
              LIVE SYNC
            </div>
          )}
          <input
            type="date" value={selectedDate} min={firstDayMonth} max={today}
            onChange={e => setSelectedDate(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--bg2)',
              color: 'var(--text)', fontSize: 13, cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* MANAGER: Live attendance updates indicator */}
      {isManager && isToday && dateAttendance.length > 0 && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: 10,
          padding: '16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{ fontSize: 24 }}>📊</div>
          <div>
            <div style={{ fontWeight: 600, color: '#15803d', fontSize: 13 }}>
              {dateAttendance.length} Recruiters Updated Today
            </div>
            <div style={{ fontSize: 11, color: '#15803d', marginTop: 4 }}>
              {dateAttendance.filter(a => a.status === 'Present').length} Present · {dateAttendance.filter(a => a.status === 'Absent').length} Absent
              {isToday && dateAttendance.some(a => isRecentlyMarked(a.recruiterId)) && (
                <span style={{ marginLeft: 8, background: '#dcfce7', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                  ⚡ Live Updates
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Role info banner */}
      {isRecruiter && (
        <>
          {!myRecruiterProfile ? (
            <div style={{
              background: '#fef3c7', border: '1px solid #fcd34d',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <CalendarCheck size={20} style={{ color: '#d97706', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#92400e' }}>
                  ⚠️ Recruiter Profile Not Linked
                </div>
                <div style={{ fontSize: 11, color: '#78350f', marginTop: 2 }}>
                  Your user account needs to be linked to a Recruiter Profile. Contact your admin to set this up in User Management.
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#f0fdf4', border: '1px solid #22c55e33',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <CalendarCheck size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#15803d' }}>
                  {getAtt(myRecruiterProfile?.id)?.status
                    ? `${new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}'s Status: ${getAtt(myRecruiterProfile?.id)?.status} ✓`
                    : `No attendance marked for ${new Date(selectedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`}
                </div>
                <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>
                  Use the date picker to select any date this month. Click Present or Absent to record your attendance.
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isManager && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '10px 16px', marginBottom: 20,
          fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>👁</span>
          <span>
            {isSuperAdmin && 'Viewing all recruiters across all companies.'}
            {isCompanyAdmin && 'Viewing all recruiters in your company.'}
            {isTeamLead && 'Viewing recruiters in your team.'}
            {' '}Pick a date to see attendance for that day, or view the monthly summary in the table below.
          </span>
        </div>
      )}

      {/* RECRUITER: BIG VISIBLE ATTENDANCE MARKING SECTION - TOP PRIORITY */}
      {isRecruiter && myRecruiterProfile && (
        <div style={{
          background: '#f0fdf4', border: '2px solid #22c55e',
          borderRadius: 12, padding: '24px', marginBottom: 24,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#15803d', marginBottom: 4 }}>
            📍 MARK YOUR ATTENDANCE
          </div>
          <div style={{ fontSize: 13, color: '#555', marginBottom: 16 }}>
            Date: {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
            <button
              onClick={() => markAttendance(myRecruiterProfile.id, 'Present')}
              style={{
                background: getAtt(myRecruiterProfile?.id)?.status === 'Present' ? '#22c55e' : '#f0fdf4',
                color: getAtt(myRecruiterProfile?.id)?.status === 'Present' ? 'white' : '#15803d',
                border: '2px solid #22c55e', borderRadius: 8,
                padding: '16px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
            >
              ✅ MARK PRESENT
            </button>
            <button
              onClick={() => markAttendance(myRecruiterProfile.id, 'Absent')}
              style={{
                background: getAtt(myRecruiterProfile?.id)?.status === 'Absent' ? '#ef4444' : '#fef2f2',
                color: getAtt(myRecruiterProfile?.id)?.status === 'Absent' ? 'white' : '#b91c1c',
                border: '2px solid #ef4444', borderRadius: 8,
                padding: '16px 20px', cursor: 'pointer', fontSize: 14, fontWeight: 700,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)'; }}
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
            >
              ❌ MARK ABSENT
            </button>
          </div>

          {getAtt(myRecruiterProfile?.id)?.status && (
            <div style={{ fontSize: 12, color: '#15803d', background: '#dcfce7', padding: '8px 12px', borderRadius: 6 }}>
              ✓ Status saved: <strong>{getAtt(myRecruiterProfile?.id)?.status}</strong>
            </div>
          )}
        </div>
      )}

      {isRecruiter && !myRecruiterProfile && (
        <div style={{
          background: '#fef3c7', border: '2px solid #fcd34d',
          borderRadius: 12, padding: '20px', marginBottom: 24,
          textAlign: 'center'
        }}>
          <CalendarCheck size={28} style={{ color: '#d97706', marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 6 }}>
            ⚠️ SETUP REQUIRED
          </div>
          <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.6 }}>
            Your account is not linked to a Recruiter Profile.<br/>
            <strong>Contact your admin</strong> to set up your account in User Management.<br/>
            They need to link your user to a recruiter profile.
            <br/><br/>
            <div style={{ background: '#fff8e1', padding: '8px 12px', borderRadius: 6, fontSize: 11, marginTop: 12 }}>
              <strong>Debug Info:</strong><br/>
              Your ID: {currentUser?.id}<br/>
              Recruiter ID: {currentUser?.recruiterId || 'NOT SET'}<br/>
              Available recruiters: {recruiters.length}
            </div>
          </div>
        </div>
      )}



      {isManager && (
        <>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
            📅 Monthly Attendance Summary
          </div>
          <div className="table-container" style={{ marginBottom: 20 }}>
            <table>
              <thead>
                <tr>
                  <th>Recruiter</th>
                  <th>Company / Team</th>
                  <th>Present Days</th>
                  <th>Absent Days</th>
                  <th>Pending Days</th>
                  <th>Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => {
                  const co = companies.find(c => c.id === r.companyId)
                  const tm = teams.find(t => t.id === r.teamId)
                  // Count attendance for this month
                  const monthAttendance = visibleAttendance.filter(a =>
                    a.recruiterId === r.id && a.date >= firstDayMonth && a.date <= today
                  )
                  const presentDays = monthAttendance.filter(a => a.status === 'Present').length
                  const absentDays = monthAttendance.filter(a => a.status === 'Absent').length
                  const workingDays = monthAttendance.length
                  const attendancePercent = workingDays > 0 ? Math.round((presentDays / workingDays) * 100) : 0

                  return (
                    <tr key={r.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar name={r.name} size={28} />
                          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{r.name}</div>
                        </div>
                      </td>
                      <td style={{ fontSize: 12 }}>
                        {co && <div style={{ fontWeight: 500, color: 'var(--text)' }}>{co.name}</div>}
                        {tm && <div style={{ fontSize: 11, color: 'var(--text3)' }}>{tm.name}</div>}
                      </td>
                      <td style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', textAlign: 'center' }}>{presentDays}</td>
                      <td style={{ fontSize: 12, fontWeight: 600, color: '#ef4444', textAlign: 'center' }}>{absentDays}</td>
                      <td style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', textAlign: 'center' }}>{workingDays - presentDays - absentDays}</td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: 12, fontWeight: 700,
                          color: attendancePercent >= 80 ? '#22c55e' : attendancePercent >= 60 ? '#f59e0b' : '#ef4444',
                          background: attendancePercent >= 80 ? '#f0fdf4' : attendancePercent >= 60 ? '#fffbeb' : '#fef2f2',
                          padding: '4px 8px', borderRadius: 6, display: 'inline-block'
                        }}>
                          {attendancePercent}%
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}


      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Present', count: presentCount, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Absent',  count: absentCount,  color: '#ef4444', bg: '#fef2f2' },
          { label: 'Pending', count: pendingCount,  color: '#f59e0b', bg: '#fffbeb' },
        ].map(({ label, count, color, bg }) => (
          <div key={label} style={{
            background: bg, border: `1px solid ${color}33`,
            borderRadius: 10, padding: '16px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color }}>{count}</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table - show for managers or if recruiter has profile linked */}
      {(isManager || (isRecruiter && myRecruiterProfile) || filtered.length > 0) && (
        <div className="table-container">
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
          📌 Daily Attendance for {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
        </div>
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14} />
            <input
              className="search-input"
              placeholder="Search recruiters..."
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span className="table-header-count">{filtered.length} recruiters</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Recruiter</th>
              {isManager && <th>Company / Team</th>}
              <th>Status</th>
              <th>Marked At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const att  = getAtt(r.id)
              const co   = companies.find(c => c.id === r.companyId)
              const tm   = teams.find(t => t.id === r.teamId)
              // Is this the logged-in recruiter's own row?
              const isMyRow = isRecruiter && currentUser?.recruiterId === r.id

              return (
                <tr key={r.id}>
                  {/* Name */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.name} size={32} />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 13 }}>
                          {r.name}
                          {isMyRow && (
                            <span style={{ marginLeft: 6, fontSize: 10, background: '#22c55e', color: 'white', padding: '1px 6px', borderRadius: 10 }}>You</span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>{r.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Company / Team — only managers see this */}
                  {isManager && (
                    <td style={{ fontSize: 12 }}>
                      {co && <div style={{ fontWeight: 500, color: 'var(--text)' }}>{co.name}</div>}
                      {tm && <div style={{ color: 'var(--text3)' }}>{tm.name}</div>}
                      {!co && !tm && <span style={{ color: 'var(--text3)' }}>—</span>}
                    </td>
                  )}

                  {/* Status badge */}
                  <td><AttendanceBadge status={att?.status} /></td>

                  {/* Time marked with LIVE badge */}
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>
                    {att ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div>
                          {new Date(att.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                            {getTimeSinceMarked(r.id)}
                          </div>
                        </div>
                        {isManager && isToday && isRecentlyMarked(r.id) && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: 3,
                            background: '#dcfce7', color: '#15803d',
                            padding: '2px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                            whiteSpace: 'nowrap'
                          }}>
                            ⚡ LIVE
                          </span>
                        )}
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* Action column */}
                  <td>
                    {/* RECRUITER: can only mark their own row, any date this month */}
                    {isRecruiter && isMyRow && selectedDate >= firstDayMonth && selectedDate <= today && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => markAttendance(r.id, 'Present')}
                          style={{
                            background: att?.status === 'Present' ? '#22c55e' : '#f0fdf4',
                            color: att?.status === 'Present' ? 'white' : '#15803d',
                            border: '1px solid #22c55e', borderRadius: 6,
                            padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                          }}
                        >✓ Present</button>
                        <button
                          onClick={() => markAttendance(r.id, 'Absent')}
                          style={{
                            background: att?.status === 'Absent' ? '#ef4444' : '#fef2f2',
                            color: att?.status === 'Absent' ? 'white' : '#b91c1c',
                            border: '1px solid #ef4444', borderRadius: 6,
                            padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                          }}
                        >✗ Absent</button>
                      </div>
                    )}

                    {/* RECRUITER: other recruiter's row — cannot touch */}
                    {isRecruiter && !isMyRow && (
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>— view only</span>
                    )}

                    {/* RECRUITER: own row but outside current month */}
                    {isRecruiter && isMyRow && (selectedDate < firstDayMonth || selectedDate > today) && (
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>Out of range</span>
                    )}

                    {/* MANAGER: can mark/override for today */}
                    {isManager && isToday && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button
                          onClick={() => markAttendance(r.id, 'Present')}
                          style={{
                            background: att?.status === 'Present' ? '#dcfce7' : '#f3f4f6',
                            color: att?.status === 'Present' ? '#15803d' : '#555',
                            border: '1px solid #e5e7eb', borderRadius: 6,
                            padding: '4px 10px', cursor: 'pointer', fontSize: 11,
                          }}
                        >Present</button>
                        <button
                          onClick={() => markAttendance(r.id, 'Absent')}
                          style={{
                            background: att?.status === 'Absent' ? '#fee2e2' : '#f3f4f6',
                            color: att?.status === 'Absent' ? '#b91c1c' : '#555',
                            border: '1px solid #e5e7eb', borderRadius: 6,
                            padding: '4px 10px', cursor: 'pointer', fontSize: 11,
                          }}
                        >Absent</button>
                      </div>
                    )}

                    {/* MANAGER: past date = read only */}
                    {isManager && !isToday && (
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>Read only</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">
            <CalendarCheck />
            <h3>No recruiters found</h3>
            <p>{isRecruiter ? 'Your attendance will appear here' : 'No recruiters in your scope'}</p>
          </div>
        )}
      </div>
      )}

      {/* Fallback: show this if absolutely nothing is visible */}
      {!isRecruiter && filtered.length === 0 && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '40px 20px', textAlign: 'center',
        }}>
          <CalendarCheck size={32} style={{ color: 'var(--text3)', marginBottom: 16 }} />
          <h3 style={{ color: 'var(--text2)' }}>No Recruiters Found</h3>
          <p style={{ color: 'var(--text3)', fontSize: 12 }}>
            {isSuperAdmin ? 'No recruiters in the system yet. Create recruiters first.' :
             isCompanyAdmin ? 'No recruiters assigned to your company.' :
             isTeamLead ? 'No recruiters in your team.' :
             'You don\'t have access to view recruiters.'}
          </p>
        </div>
      )}
    </div>
  )
}
