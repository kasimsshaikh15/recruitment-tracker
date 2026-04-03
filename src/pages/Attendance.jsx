import React, { useState, useMemo } from 'react'
import { CheckCircle, XCircle, CalendarCheck, Search, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar, usePagination, Pagination } from '../components/Shared'

function AttBadge({ status }) {
  if (!status) return <span style={{ fontSize: 12, color: 'var(--text3)' }}>⏳ Pending</span>
  const ok = status === 'Present'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
      background: ok ? 'var(--green-bg)' : 'var(--red-bg)',
      color: ok ? 'var(--green)' : 'var(--red)',
      border: `1px solid ${ok ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
    }}>
      {ok ? <CheckCircle size={11} /> : <XCircle size={11} />} {status}
    </span>
  )
}

function MarkButtons({ personId, personType, currentStatus, onMark, selectedDate, small = false }) {
  const pad = small ? '4px 10px' : '10px 20px'
  const fz = small ? 12 : 13
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      <button
        onClick={() => onMark(personId, 'Present', personType, selectedDate)}
        style={{
          background: currentStatus === 'Present' ? 'var(--green)' : 'var(--green-bg)',
          color: currentStatus === 'Present' ? 'white' : 'var(--green)',
          border: '1px solid rgba(34,197,94,0.35)', borderRadius: 7,
          padding: pad, cursor: 'pointer', fontSize: fz, fontWeight: 600,
          transition: 'all .15s', fontFamily: 'var(--font)',
          display: 'flex', alignItems: 'center', gap: 5,
        }}
      >
        <CheckCircle size={small ? 11 : 13} /> Present
      </button>
      <button
        onClick={() => onMark(personId, 'Absent', personType, selectedDate)}
        style={{
          background: currentStatus === 'Absent' ? 'var(--red)' : 'var(--red-bg)',
          color: currentStatus === 'Absent' ? 'white' : 'var(--red)',
          border: '1px solid rgba(239,68,68,0.35)', borderRadius: 7,
          padding: pad, cursor: 'pointer', fontSize: fz, fontWeight: 600,
          transition: 'all .15s', fontFamily: 'var(--font)',
          display: 'flex', alignItems: 'center', gap: 5,
        }}
      >
        <XCircle size={small ? 11 : 13} /> Absent
      </button>
    </div>
  )
}

export default function Attendance() {
  const {
    currentUser,
    visibleRecruiters: recruiters = [],
    visibleAttendance = [],
    markAttendance,
    companies = [],
    teams = [],
    users = [],
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
  } = useApp()

  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const isToday = selectedDate === today
  const isManager = isSuperAdmin || isCompanyAdmin || isTeamLead

  const firstDayMonth = new Date(
    new Date().getFullYear(), new Date().getMonth(), 1
  ).toISOString().slice(0, 10)

  const myRecruiterProfile = isRecruiter
    ? recruiters.find(r => r.id === currentUser?.recruiterId) ?? null
    : null
  const myTLId = isTeamLead ? currentUser?.id : null

  const dateAtt = useMemo(
    () => visibleAttendance.filter(a => a.date === selectedDate),
    [visibleAttendance, selectedDate]
  )
  const getAtt = (personId) => dateAtt.find(a => a.personId === personId) ?? null

  const timeSince = (iso) => {
    if (!iso) return ''
    const s = Math.floor((Date.now() - new Date(iso)) / 1000)
    if (s < 60) return `${s}s ago`
    if (s < 3600) return `${Math.floor(s / 60)}m ago`
    return `${Math.floor(s / 3600)}h ago`
  }

  const allPersons = useMemo(() => {
    if (isSuperAdmin) {
      const tls = users
        .filter(u => u.role === 'teamLead')
        .map(u => ({ personId: u.id, name: u.name, email: u.email || '', companyId: u.companyId, teamId: u.teamId, type: 'teamLead' }))
      const recs = recruiters
        .map(r => ({ personId: r.id, name: r.name, email: r.email || '', companyId: r.companyId, teamId: r.teamId, type: 'recruiter' }))
      return [...tls, ...recs]
    }
    if (isCompanyAdmin) {
      const cid = currentUser?.companyId
      const tls = users
        .filter(u => u.role === 'teamLead' && u.companyId === cid)
        .map(u => ({ personId: u.id, name: u.name, email: u.email || '', companyId: u.companyId, teamId: u.teamId, type: 'teamLead' }))
      const recs = recruiters
        .filter(r => r.companyId === cid)
        .map(r => ({ personId: r.id, name: r.name, email: r.email || '', companyId: r.companyId, teamId: r.teamId, type: 'recruiter' }))
      return [...tls, ...recs]
    }
    if (isTeamLead) {
      return recruiters.map(r => ({
        personId: r.id, name: r.name, email: r.email || '',
        companyId: r.companyId, teamId: r.teamId, type: 'recruiter',
      }))
    }
    return []
  }, [isSuperAdmin, isCompanyAdmin, isTeamLead, users, recruiters, currentUser])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allPersons.filter(p => !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))
  }, [allPersons, search])

  const pag = usePagination(filtered, 15)

  const presentCount = filtered.filter(p => getAtt(p.personId)?.status === 'Present').length
  const absentCount = filtered.filter(p => getAtt(p.personId)?.status === 'Absent').length
  const pendingCount = filtered.length - presentCount - absentCount
  const pct = filtered.length > 0 ? Math.round((presentCount / filtered.length) * 100) : 0

  const hierarchyLabel = isSuperAdmin
    ? 'All companies · Super Admin can mark anyone'
    : isCompanyAdmin
    ? 'Your company · You can mark all Team Leads & Recruiters'
    : isTeamLead
    ? "Your team · Mark your own attendance + your team's recruiters"
    : 'Mark your own attendance'

  return (
    <div className="content">

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <CalendarCheck size={22} style={{ color: 'var(--accent)' }} /> Attendance
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>{hierarchyLabel}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {isManager && isToday && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--green-bg)', padding: '6px 14px', borderRadius: 20,
              border: '1px solid rgba(34,197,94,0.3)', fontSize: 11, fontWeight: 700, color: 'var(--green)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 1.8s infinite' }} />
              LIVE
            </div>
          )}
          <input
            type="date" value={selectedDate} min={firstDayMonth} max={today}
            onChange={e => setSelectedDate(e.target.value)}
            style={{
              padding: '8px 12px', borderRadius: 8,
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text)', fontSize: 13, cursor: 'pointer', outline: 'none',
              fontFamily: 'var(--font)',
            }}
          />
        </div>
      </div>

      {/* Recruiter: Self-mark */}
      {isRecruiter && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, marginBottom: 24,
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            📍 Mark Your Attendance
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            {!isToday && (
              <span style={{ marginLeft: 10, color: 'var(--yellow)', fontSize: 11, fontWeight: 500 }}>
                ⚠ Past date — marking allowed
              </span>
            )}
          </div>
          {!myRecruiterProfile ? (
            <div style={{
              background: 'var(--yellow-bg)', border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 8, padding: '12px 16px', fontSize: 13, color: 'var(--yellow)',
            }}>
              ⚠️ Your account is not linked to a Recruiter Profile. Ask your admin to link it in User Management.
            </div>
          ) : (
            <>
              <MarkButtons
                personId={myRecruiterProfile.id}
                personType="recruiter"
                currentStatus={getAtt(myRecruiterProfile.id)?.status}
                onMark={markAttendance}
                selectedDate={selectedDate}
              />
              {getAtt(myRecruiterProfile.id)?.status && (
                <div style={{
                  marginTop: 12, padding: '8px 14px', borderRadius: 8,
                  background: 'var(--green-bg)', color: 'var(--green)',
                  fontSize: 12, fontWeight: 600, border: '1px solid rgba(34,197,94,0.2)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <CheckCircle size={13} />
                  Saved: <strong>{getAtt(myRecruiterProfile.id).status}</strong>
                  {getAtt(myRecruiterProfile.id).markedAt && (
                    <span style={{ fontWeight: 400, color: 'var(--text3)' }}>
                      · {timeSince(getAtt(myRecruiterProfile.id).markedAt)}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Team Lead: Self-mark */}
      {isTeamLead && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 14, padding: 24, marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              📍 Your Own Attendance
            </div>
            <span style={{
              fontSize: 11, color: 'var(--text3)',
              background: 'var(--surface)', border: '1px solid var(--border)',
              padding: '3px 10px', borderRadius: 20,
            }}>
              Visible to Company Admin &amp; Super Admin
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 16 }}>
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <MarkButtons
            personId={myTLId}
            personType="teamLead"
            currentStatus={getAtt(myTLId)?.status}
            onMark={markAttendance}
            selectedDate={selectedDate}
          />
          {getAtt(myTLId)?.status && (
            <div style={{
              marginTop: 12, padding: '8px 14px', borderRadius: 8,
              background: 'var(--green-bg)', color: 'var(--green)',
              fontSize: 12, fontWeight: 600, border: '1px solid rgba(34,197,94,0.2)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <CheckCircle size={13} />
              Saved: <strong>{getAtt(myTLId).status}</strong>
              {getAtt(myTLId).markedAt && (
                <span style={{ fontWeight: 400, color: 'var(--text3)' }}>· {timeSince(getAtt(myTLId).markedAt)}</span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary Stats */}
      {isManager && filtered.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
          {[
            { label: 'Present', value: presentCount, color: 'var(--green)', bg: 'var(--green-bg)', border: 'rgba(34,197,94,0.2)' },
            { label: 'Absent', value: absentCount, color: 'var(--red)', bg: 'var(--red-bg)', border: 'rgba(239,68,68,0.2)' },
            { label: 'Pending', value: pendingCount, color: 'var(--yellow)', bg: 'var(--yellow-bg)', border: 'rgba(245,158,11,0.2)' },
            { label: 'Attendance %', value: `${pct}%`, color: 'var(--accent)', bg: 'var(--accent-glow)', border: 'rgba(59,130,246,0.2)' },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color, letterSpacing: '-1px', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Info banners */}
      {(isSuperAdmin || isCompanyAdmin) && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '11px 16px', marginBottom: 18,
          fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>🏢</span>
          <span>
            <strong style={{ color: 'var(--text)' }}>{isSuperAdmin ? 'Super Admin' : 'Company Admin'}:</strong>
            {' '}You can mark attendance for{' '}
            <strong style={{ color: 'var(--accent2)' }}>any Team Lead or Recruiter</strong>
            {' '}in your scope. Team Leads mark their own; you can override below.
          </span>
        </div>
      )}
      {isTeamLead && allPersons.length > 0 && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '11px 16px', marginBottom: 18,
          fontSize: 12, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>👥</span>
          <span>
            <strong style={{ color: 'var(--text)' }}>Team Lead:</strong>
            {' '}You can mark attendance for your team's recruiters below. Your own attendance is tracked in the card above.
          </span>
        </div>
      )}

      {/* Manager table */}
      {isManager && (
        <div className="table-container">
          <div className="filter-bar">
            <div className="search-wrap">
              <Search size={14} />
              <input
                className="search-input"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="table-header-count">{filtered.length} people</span>
            {!isToday && (
              <span style={{
                fontSize: 11, color: 'var(--yellow)', fontWeight: 600,
                background: 'var(--yellow-bg)', border: '1px solid rgba(245,158,11,0.2)',
                padding: '3px 10px', borderRadius: 20,
              }}>
                📅 Viewing {selectedDate}
              </span>
            )}
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  {(isSuperAdmin || isCompanyAdmin) && <th>Company / Team</th>}
                  <th>Status</th>
                  <th>Marked At</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {pag.slice.map(person => {
                  const att = getAtt(person.personId)
                  const co = companies.find(c => c.id === person.companyId)
                  const tm = teams.find(t => t.id === person.teamId)
                  return (
                    <tr key={person.personId}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar name={person.name} size={32} />
                          <div>
                            <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 13 }}>{person.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text3)' }}>{person.email || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                          background: person.type === 'teamLead' ? 'var(--accent-glow)' : 'var(--green-bg)',
                          color: person.type === 'teamLead' ? 'var(--accent2)' : 'var(--green)',
                          border: person.type === 'teamLead' ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(34,197,94,0.2)',
                        }}>
                          {person.type === 'teamLead' ? '👤 Team Lead' : '🎯 Recruiter'}
                        </span>
                      </td>
                      {(isSuperAdmin || isCompanyAdmin) && (
                        <td style={{ fontSize: 12 }}>
                          {co && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <div style={{ width: 7, height: 7, borderRadius: '50%', background: co.color || 'var(--accent)', flexShrink: 0 }} />
                              <span style={{ fontWeight: 500, color: 'var(--text)' }}>{co.name}</span>
                            </div>
                          )}
                          {tm && <div style={{ color: 'var(--text3)', marginTop: 2 }}>{tm.name}</div>}
                          {!co && !tm && <span style={{ color: 'var(--text3)' }}>—</span>}
                        </td>
                      )}
                      <td><AttBadge status={att?.status} /></td>
                      <td style={{ fontSize: 12, color: 'var(--text3)' }}>
                        {att ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Clock size={12} style={{ color: 'var(--text3)', flexShrink: 0 }} />
                            <div>
                              <div style={{ color: 'var(--text2)' }}>
                                {new Date(att.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                              <div style={{ fontSize: 10, marginTop: 1 }}>{timeSince(att.markedAt)}</div>
                            </div>
                          </div>
                        ) : '—'}
                      </td>
                      <td>
                        <MarkButtons
                          personId={person.personId}
                          personType={person.type}
                          currentStatus={att?.status}
                          onMark={markAttendance}
                          selectedDate={selectedDate}
                          small={true}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {pag.slice.length === 0 && (
            <div className="empty-state">
              <CalendarCheck />
              <h3>No people found</h3>
              <p>{search ? 'Try adjusting your search' : 'No team leads or recruiters visible in this scope'}</p>
            </div>
          )}
          <Pagination pagination={pag} />
        </div>
      )}

      {/* Recruiter: personal history */}
      {isRecruiter && myRecruiterProfile && (
        <div className="table-container" style={{ marginTop: 24 }}>
          <div className="table-header">
            <div className="table-header-title">Your Attendance This Month</div>
            <span className="table-header-count">
              {visibleAttendance.filter(a => a.personId === myRecruiterProfile.id).length} records
            </span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Marked At</th>
                </tr>
              </thead>
              <tbody>
                {visibleAttendance
                  .filter(a => a.personId === myRecruiterProfile.id)
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .slice(0, 31)
                  .map(a => (
                    <tr key={a.id}>
                      <td style={{ color: 'var(--text)', fontWeight: 500 }}>
                        {new Date(a.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        {a.date === today && (
                          <span style={{
                            marginLeft: 8, fontSize: 10,
                            background: 'var(--accent-glow)', color: 'var(--accent2)',
                            padding: '1px 7px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.2)',
                          }}>Today</span>
                        )}
                      </td>
                      <td><AttBadge status={a.status} /></td>
                      <td style={{ fontSize: 12, color: 'var(--text3)' }}>
                        {new Date(a.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {visibleAttendance.filter(a => a.personId === myRecruiterProfile.id).length === 0 && (
            <div className="empty-state">
              <CalendarCheck />
              <h3>No records yet</h3>
              <p>Mark your attendance above to get started</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}