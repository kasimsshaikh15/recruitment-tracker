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
    companies, teams, users,
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
  } = useApp()

  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const [liveUpdate, setLiveUpdate] = useState(0)
  const isToday = selectedDate === today

  const isManager = isSuperAdmin || isCompanyAdmin || isTeamLead

  const now = new Date()
  const firstDayMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10)
  const lastDayMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10)

  // For recruiters: their own recruiter profile
  const myRecruiterProfile = isRecruiter ? recruiters.find(r => r.id === currentUser?.recruiterId) : null
  
  // For team leads: their own team lead record
  const myTeamLeadRecord = isTeamLead ? currentUser : null

  React.useEffect(() => {
    if (isRecruiter) {
      console.log('🔍 RECRUITER DEBUG:', { currentUser, myRecruiterProfile, recruiters })
    }
  }, [isRecruiter, currentUser, recruiters, myRecruiterProfile])

  React.useEffect(() => {
    if (isManager && isToday) {
      const interval = setInterval(() => setLiveUpdate(u => u + 1), 5000)
      return () => clearInterval(interval)
    }
  }, [isManager, isToday])

  const dateAttendance = useMemo(
    () => visibleAttendance.filter(a => a.date === selectedDate),
    [visibleAttendance, selectedDate, liveUpdate]
  )

  // Get attendance by personId (works for both recruiters and team leads)
  const getAtt = (personId) =>
    dateAttendance.find(a => a.personId === personId) ||
    dateAttendance.find(a => a.recruiterId === personId) // backward compatibility

  const isRecentlyMarked = (personId) => {
    const att = getAtt(personId)
    if (!att?.markedAt) return false
    const markedTime = new Date(att.markedAt)
    const now = new Date()
    const diffMinutes = (now - markedTime) / (1000 * 60)
    return diffMinutes < 5
  }

  const getTimeSinceMarked = (personId) => {
    const att = getAtt(personId)
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

  // Build combined list for managers: both recruiters and team leads
  const allAttendancePersons = useMemo(() => {
    if (isSuperAdmin || isCompanyAdmin) {
      // Combine recruiters and team leads from current company
      const recs = recruiters.map(r => ({ ...r, type: 'recruiter', displayName: r.name, personId: r.id }))
      const tls = users.filter(u => u.companyId === (isCompanyAdmin ? currentUser?.companyId : undefined) && u.role === 'teamLead')
        .map(u => ({ ...u, type: 'teamLead', displayName: u.name, personId: u.id }))
      return [...recs, ...tls]
    }
    if (isTeamLead) {
      // Team lead sees their recruiters and themselves
      const recs = recruiters.map(r => ({ ...r, type: 'recruiter', displayName: r.name, personId: r.id }))
      return [...recs]
    }
    return []
  }, [recruiters, users, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allAttendancePersons.filter(p =>
      !q || p.displayName.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q)
    )
  }, [allAttendancePersons, search])

  const presentCount = filtered.filter(p => getAtt(p.personId)?.status === 'Present').length
  const absentCount = filtered.filter(p => getAtt(p.personId)?.status === 'Absent').length
  const pendingCount = filtered.length - presentCount - absentCount

  return (
    <div className="content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Attendance</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
            {isRecruiter ? '✅ Mark your attendance for any date this month' : isTeamLead ? '👤 Manage team lead and recruiter attendance' : '👁 Monitor your team\'s attendance'}
          </div>
        </div>
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

      {/* Manager: Live attendance updates indicator */}
      {isManager && isToday && dateAttendance.length > 0 && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: 10,
          padding: '16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12
        }}>
          <div style={{ fontSize: 24 }}>📊</div>
          <div>
            <div style={{ fontWeight: 600, color: '#15803d', fontSize: 13 }}>
              {dateAttendance.length} People Updated Today
            </div>
            <div style={{ fontSize: 11, color: '#15803d', marginTop: 4 }}>
              {dateAttendance.filter(a => a.status === 'Present').length} Present · {dateAttendance.filter(a => a.status === 'Absent').length} Absent
              {isToday && dateAttendance.some(a => isRecentlyMarked(a.personId || a.recruiterId)) && (
                <span style={{ marginLeft: 8, background: '#dcfce7', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                  ⚡ Live Updates
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Recruiter: Attendance marking section */}
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
                  Your user account needs to be linked to a Recruiter Profile in User Management.
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
              </div>
            </div>
          )}
        </>
      )}

      {/* Team Lead: Attendance marking section */}
      {isTeamLead && (
        <div style={{
          background: '#f0fdf4', border: '1px solid #22c55e33',
          borderRadius: 10, padding: '12px 16px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <CalendarCheck size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#15803d' }}>
              {getAtt(myTeamLeadRecord?.id)?.status
                ? `Your Status: ${getAtt(myTeamLeadRecord?.id)?.status} ✓`
                : 'You can mark your own attendance below'}
            </div>
          </div>
        </div>
      )}

      {isManager && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '10px 16px', marginBottom: 20,
          fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>👁</span>
          <span>
            Viewing both recruiters and team leads.
            {' '}Pick a date to see attendance for that day.
          </span>
        </div>
      )}

      {/* RECRUITER: Big attendance marking section */}
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
              onClick={() => markAttendance(myRecruiterProfile.id, 'Present', 'recruiter')}
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
              onClick={() => markAttendance(myRecruiterProfile.id, 'Absent', 'recruiter')}
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

      {/* TEAM LEAD: Big attendance marking section */}
      {isTeamLead && (
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
              onClick={() => markAttendance(myTeamLeadRecord.id, 'Present', 'teamLead')}
              style={{
                background: getAtt(myTeamLeadRecord?.id)?.status === 'Present' ? '#22c55e' : '#f0fdf4',
                color: getAtt(myTeamLeadRecord?.id)?.status === 'Present' ? 'white' : '#15803d',
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
              onClick={() => markAttendance(myTeamLeadRecord.id, 'Absent', 'teamLead')}
              style={{
                background: getAtt(myTeamLeadRecord?.id)?.status === 'Absent' ? '#ef4444' : '#fef2f2',
                color: getAtt(myTeamLeadRecord?.id)?.status === 'Absent' ? 'white' : '#b91c1c',
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

          {getAtt(myTeamLeadRecord?.id)?.status && (
            <div style={{ fontSize: 12, color: '#15803d', background: '#dcfce7', padding: '8px 12px', borderRadius: 6 }}>
              ✓ Status saved: <strong>{getAtt(myTeamLeadRecord?.id)?.status}</strong>
            </div>
          )}
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Present', count: presentCount, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Absent', count: absentCount, color: '#ef4444', bg: '#fef2f2' },
          { label: 'Pending', count: pendingCount, color: '#f59e0b', bg: '#fffbeb' },
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

      {/* Search & Filter */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 16, padding: '8px 12px', background: 'var(--bg2)',
        borderRadius: 8, border: '1px solid var(--border)'
      }}>
        <Search size={16} style={{ color: 'var(--text3)' }} />
        <input
          type="text" placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            color: 'var(--text)', fontSize: 13, outline: 'none'
          }}
        />
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>{filtered.length} people</span>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                {isManager && <th>Company/Team</th>}
                <th>Status</th>
                <th>Marked At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(person => {
                const att = getAtt(person.personId)
                const co = companies.find(c => c.id === person.companyId)
                const tm = teams.find(t => t.id === person.teamId)
                const isMyRow = isRecruiter ? currentUser?.recruiterId === person.personId : isTeamLead ? currentUser?.id === person.personId : false

                return (
                  <tr key={person.personId}>
                    {/* Name */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={person.displayName} size={32} />
                        <div>
                          <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 13 }}>
                            {person.displayName}
                            {isMyRow && (
                              <span style={{ marginLeft: 6, fontSize: 10, background: '#22c55e', color: 'white', padding: '1px 6px', borderRadius: 10 }}>You</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{person.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Type badge */}
                    <td>
                      <span style={{
                        background: person.type === 'teamLead' ? '#f0f4ff' : '#f0fdf4',
                        color: person.type === 'teamLead' ? '#4f7cff' : '#15803d',
                        padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600
                      }}>
                        {person.type === 'teamLead' ? '👤 Team Lead' : '🎯 Recruiter'}
                      </span>
                    </td>

                    {/* Company/Team */}
                    {isManager && (
                      <td style={{ fontSize: 12 }}>
                        {co && <div style={{ fontWeight: 500, color: 'var(--text)' }}>{co.name}</div>}
                        {tm && <div style={{ color: 'var(--text3)' }}>{tm.name}</div>}
                        {!co && !tm && <span style={{ color: 'var(--text3)' }}>—</span>}
                      </td>
                    )}

                    {/* Status badge */}
                    <td><AttendanceBadge status={att?.status} /></td>

                    {/* Time marked */}
                    <td style={{ fontSize: 12, color: 'var(--text3)' }}>
                      {att ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div>
                            {new Date(att.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            <div style={{ fontSize: 10, color: 'var(--text3)' }}>
                              {getTimeSinceMarked(person.personId)}
                            </div>
                          </div>
                          {isManager && isToday && isRecentlyMarked(person.personId) && (
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
                      {(isRecruiter && isMyRow && person.type === 'recruiter') || (isTeamLead && isMyRow && person.type === 'teamLead') ? (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => markAttendance(person.personId, 'Present', person.type)}
                            style={{
                              background: att?.status === 'Present' ? '#22c55e' : '#f0fdf4',
                              color: att?.status === 'Present' ? 'white' : '#15803d',
                              border: '1px solid #22c55e', borderRadius: 6,
                              padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                            }}
                          >✓ Present</button>
                          <button
                            onClick={() => markAttendance(person.personId, 'Absent', person.type)}
                            style={{
                              background: att?.status === 'Absent' ? '#ef4444' : '#fef2f2',
                              color: att?.status === 'Absent' ? 'white' : '#b91c1c',
                              border: '1px solid #ef4444', borderRadius: 6,
                              padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                            }}
                          >✗ Absent</button>
                        </div>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--text3)' }}>—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          color: 'var(--text3)', background: 'var(--bg2)',
          borderRadius: 10, border: '1px dashed var(--border)'
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>No records found</div>
        </div>
      )}
    </div>
  )
}
