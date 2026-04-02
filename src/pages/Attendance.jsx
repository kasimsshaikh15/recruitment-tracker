import React, { useState, useMemo } from 'react'
import { CheckCircle, XCircle, CalendarCheck, Search, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar, usePagination, Pagination } from '../components/Shared'

function AttBadge({ status }) {
  if (!status) return <span style={{ fontSize:12, color:'var(--text3)' }}>⏳ Pending</span>
  const isPresent = status === 'Present'
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:5,
      padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:600,
      background: isPresent ? 'var(--green-bg)' : 'var(--red-bg)',
      color: isPresent ? 'var(--green)' : 'var(--red)',
      border: `1px solid ${isPresent ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
    }}>
      {isPresent ? <CheckCircle size={12}/> : <XCircle size={12}/>} {status}
    </span>
  )
}

function MarkButtons({ personId, personType, currentStatus, onMark, small=false }) {
  const pad = small ? '4px 10px' : '10px 18px'
  const fz  = small ? 12 : 13
  return (
    <div style={{ display:'flex', gap:6 }}>
      <button onClick={() => onMark(personId, 'Present', personType)} style={{
        background: currentStatus === 'Present' ? 'var(--green)' : 'var(--green-bg)',
        color:      currentStatus === 'Present' ? 'white'        : 'var(--green)',
        border: '1px solid rgba(34,197,94,0.35)', borderRadius:7,
        padding:pad, cursor:'pointer', fontSize:fz, fontWeight:600,
        transition:'all .15s',
      }}>✓ Present</button>
      <button onClick={() => onMark(personId, 'Absent', personType)} style={{
        background: currentStatus === 'Absent' ? 'var(--red)' : 'var(--red-bg)',
        color:      currentStatus === 'Absent' ? 'white'      : 'var(--red)',
        border: '1px solid rgba(239,68,68,0.35)', borderRadius:7,
        padding:pad, cursor:'pointer', fontSize:fz, fontWeight:600,
        transition:'all .15s',
      }}>✗ Absent</button>
    </div>
  )
}

export default function Attendance() {
  const {
    currentUser,
    visibleRecruiters: recruiters = [],       // ✅ FIX
    visibleAttendance = [],                   // ✅ FIX — was causing crash at line 73
    markAttendance,
    companies = [],                           // ✅ FIX
    teams = [],                               // ✅ FIX
    users = [],                               // ✅ FIX
    isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
  } = useApp()

  const today = new Date().toISOString().slice(0, 10)
  const [selectedDate, setSelectedDate] = useState(today)
  const [search, setSearch] = useState('')
  const isToday = selectedDate === today
  const isManager = isSuperAdmin || isCompanyAdmin || isTeamLead

  const firstDayMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0,10)

  const myRecruiterId      = isRecruiter ? currentUser?.recruiterId : null
  const myRecruiterProfile = myRecruiterId ? recruiters.find(r => r.id === myRecruiterId) : null
  const myTLId             = isTeamLead ? currentUser?.id : null

  // ✅ FIX: visibleAttendance now guaranteed to be array
  const dateAtt = useMemo(
    () => visibleAttendance.filter(a => a.date === selectedDate),
    [visibleAttendance, selectedDate]
  )

  const getAtt = (personId) =>
    dateAtt.find(a => a.personId === personId) || null

  const timeSince = (markedAt) => {
    if (!markedAt) return ''
    const diff = Math.floor((Date.now() - new Date(markedAt)) / 1000)
    if (diff < 60)   return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`
    return `${Math.floor(diff/3600)}h ago`
  }

  const allPersons = useMemo(() => {
    if (isSuperAdmin) {
      const tls = users
        .filter(u => u.role === 'teamLead')
        .map(u => ({ id:u.id, personId:u.id, name:u.name, email:u.email||'', companyId:u.companyId, teamId:u.teamId, type:'teamLead' }))
      const recs = recruiters.map(r => ({ id:r.id, personId:r.id, name:r.name, email:r.email||'', companyId:r.companyId, teamId:r.teamId, type:'recruiter' }))
      return [...tls, ...recs]
    }
    if (isCompanyAdmin) {
      const myCompanyId = currentUser?.companyId
      const tls = users
        .filter(u => u.role === 'teamLead' && u.companyId === myCompanyId)
        .map(u => ({ id:u.id, personId:u.id, name:u.name, email:u.email||'', companyId:u.companyId, teamId:u.teamId, type:'teamLead' }))
      const recs = recruiters
        .filter(r => r.companyId === myCompanyId)
        .map(r => ({ id:r.id, personId:r.id, name:r.name, email:r.email||'', companyId:r.companyId, teamId:r.teamId, type:'recruiter' }))
      return [...tls, ...recs]
    }
    if (isTeamLead) {
      return recruiters.map(r => ({ id:r.id, personId:r.id, name:r.name, email:r.email||'', companyId:r.companyId, teamId:r.teamId, type:'recruiter' }))
    }
    return []
  }, [isSuperAdmin, isCompanyAdmin, isTeamLead, users, recruiters, currentUser])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return allPersons.filter(p => !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))
  }, [allPersons, search])

  const pag = usePagination(filtered, 10)

  const presentCount = filtered.filter(p => getAtt(p.personId)?.status === 'Present').length
  const absentCount  = filtered.filter(p => getAtt(p.personId)?.status === 'Absent').length
  const pendingCount = filtered.length - presentCount - absentCount
  const pct = filtered.length > 0 ? Math.round((presentCount / filtered.length) * 100) : 0

  return (
    <div className="content">

      {/* ── Header ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
        <div>
          <div style={{ fontSize:20, fontWeight:700, color:'var(--text)', display:'flex', alignItems:'center', gap:10 }}>
            <CalendarCheck size={22} style={{ color:'var(--accent)' }}/> Attendance
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginTop:3 }}>
            {isSuperAdmin   && 'All companies · Team Leads & Recruiters'}
            {isCompanyAdmin && 'Your company · Team Leads & Recruiters'}
            {isTeamLead     && 'Your team recruiters · Mark your own attendance below'}
            {isRecruiter    && 'Mark your own attendance'}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {isManager && isToday && (
            <div style={{
              display:'flex', alignItems:'center', gap:6,
              background:'var(--green-bg)', padding:'6px 12px', borderRadius:20,
              border:'1px solid rgba(34,197,94,0.3)', fontSize:11, fontWeight:700, color:'var(--green)',
            }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--green)', display:'inline-block', animation:'pulse 1.8s infinite' }}/>
              LIVE
            </div>
          )}
          <input
            type="date" value={selectedDate} min={firstDayMonth} max={today}
            onChange={e => setSelectedDate(e.target.value)}
            style={{
              padding:'8px 12px', borderRadius:8,
              border:'1px solid var(--border)', background:'var(--surface)',
              color:'var(--text)', fontSize:13, cursor:'pointer', outline:'none',
            }}
          />
        </div>
      </div>

      {/* ── RECRUITER: Self mark section ── */}
      {isRecruiter && (
        <div style={{
          background:'var(--bg2)', border:'1px solid var(--border)',
          borderRadius:14, padding:24, marginBottom:24,
        }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:4 }}>
            📍 Mark Your Attendance
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginBottom:16 }}>
            {new Date(selectedDate).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
          </div>

          {!myRecruiterProfile ? (
            <div style={{
              background:'var(--yellow-bg)', border:'1px solid rgba(245,158,11,0.3)',
              borderRadius:8, padding:'12px 16px', fontSize:13, color:'var(--yellow)',
            }}>
              ⚠️ Your user account is not linked to a Recruiter Profile. Ask your admin to link it in User Management.
            </div>
          ) : (
            <>
              <MarkButtons
                personId={myRecruiterProfile.id}
                personType="recruiter"
                currentStatus={getAtt(myRecruiterProfile.id)?.status}
                onMark={markAttendance}
              />
              {getAtt(myRecruiterProfile.id)?.status && (
                <div style={{
                  marginTop:12, padding:'8px 14px', borderRadius:8,
                  background:'var(--green-bg)', color:'var(--green)',
                  fontSize:12, fontWeight:600, border:'1px solid rgba(34,197,94,0.2)',
                }}>
                  ✓ Saved: <strong>{getAtt(myRecruiterProfile.id)?.status}</strong>
                  {getAtt(myRecruiterProfile.id)?.markedAt && (
                    <span style={{ marginLeft:8, fontWeight:400, color:'var(--text3)' }}>
                      · {timeSince(getAtt(myRecruiterProfile.id)?.markedAt)}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ── TEAM LEAD: Self mark section ── */}
      {isTeamLead && (
        <div style={{
          background:'var(--bg2)', border:'1px solid var(--border)',
          borderRadius:14, padding:24, marginBottom:24,
        }}>
          <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:4 }}>
            📍 Mark Your Own Attendance
          </div>
          <div style={{ fontSize:12, color:'var(--text3)', marginBottom:16 }}>
            {new Date(selectedDate).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
            <span style={{ marginLeft:8, color:'var(--text3)' }}>· Visible to Company Admin & Super Admin</span>
          </div>
          <MarkButtons
            personId={myTLId}
            personType="teamLead"
            currentStatus={getAtt(myTLId)?.status}
            onMark={markAttendance}
          />
          {getAtt(myTLId)?.status && (
            <div style={{
              marginTop:12, padding:'8px 14px', borderRadius:8,
              background:'var(--green-bg)', color:'var(--green)',
              fontSize:12, fontWeight:600, border:'1px solid rgba(34,197,94,0.2)',
            }}>
              ✓ Saved: <strong>{getAtt(myTLId)?.status}</strong>
              {getAtt(myTLId)?.markedAt && (
                <span style={{ marginLeft:8, fontWeight:400, color:'var(--text3)' }}>
                  · {timeSince(getAtt(myTLId)?.markedAt)}
                </span>
              )}
            </div>
          )}

          {allPersons.length > 0 && (
            <div style={{ marginTop:16, paddingTop:16, borderTop:'1px solid var(--border)' }}>
              <div style={{ fontSize:12, fontWeight:700, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.8px' }}>
                Your Team's Recruiter Attendance
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Summary Stats ── */}
      {(isManager || isTeamLead) && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:22 }}>
          {[
            { label:'Present',      value:presentCount, color:'var(--green)',  bg:'var(--green-bg)',      border:'rgba(34,197,94,0.2)' },
            { label:'Absent',       value:absentCount,  color:'var(--red)',    bg:'var(--red-bg)',        border:'rgba(239,68,68,0.2)' },
            { label:'Pending',      value:pendingCount, color:'var(--yellow)', bg:'var(--yellow-bg)',     border:'rgba(245,158,11,0.2)' },
            { label:'Attendance %', value:`${pct}%`,    color:'var(--accent)', bg:'var(--accent-glow)',   border:'rgba(79,124,255,0.2)' },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} style={{
              background: bg, border:`1px solid ${border}`,
              borderRadius:12, padding:'16px 18px',
            }}>
              <div style={{ fontSize:26, fontWeight:700, color, letterSpacing:'-1px' }}>{value}</div>
              <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Hierarchy note for managers ── */}
      {(isSuperAdmin || isCompanyAdmin) && (
        <div style={{
          background:'var(--surface)', border:'1px solid var(--border)',
          borderRadius:10, padding:'11px 16px', marginBottom:18,
          fontSize:12, color:'var(--text2)', display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ fontSize:16 }}>🏢</span>
          <span>
            {isSuperAdmin ? 'Viewing all Team Leads and Recruiters across all companies.' : 'Viewing all Team Leads and Recruiters in your company.'}
            {' '}Team Leads mark their own attendance; you can override below.
          </span>
        </div>
      )}

      {/* ── Main table (Manager + TL view) ── */}
      {isManager && (
        <div className="table-container">
          <div className="filter-bar">
            <div className="search-wrap">
              <Search size={14}/>
              <input
                className="search-input"
                placeholder="Search by name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="table-header-count">{filtered.length} people</span>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pag.slice.map(person => {
                  const att = getAtt(person.personId)
                  const co  = companies.find(c => c.id === person.companyId)
                  const tm  = teams.find(t => t.id === person.teamId)
                  const isMyOwnRow = isTeamLead && person.personId === myTLId

                  return (
                    <tr key={person.personId}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <Avatar name={person.name} size={32}/>
                          <div>
                            <div style={{ fontWeight:500, color:'var(--text)', fontSize:13 }}>
                              {person.name}
                              {isMyOwnRow && (
                                <span style={{
                                  marginLeft:6, fontSize:10, background:'var(--green)',
                                  color:'white', padding:'1px 6px', borderRadius:10,
                                }}>You</span>
                              )}
                            </div>
                            <div style={{ fontSize:11, color:'var(--text3)' }}>{person.email || '—'}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:5,
                          padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600,
                          background: person.type === 'teamLead' ? 'var(--accent-glow)' : 'var(--green-bg)',
                          color:      person.type === 'teamLead' ? 'var(--accent2)'     : 'var(--green)',
                          border:     person.type === 'teamLead' ? '1px solid rgba(79,124,255,0.2)' : '1px solid rgba(34,197,94,0.2)',
                        }}>
                          {person.type === 'teamLead' ? '👤 Team Lead' : '🎯 Recruiter'}
                        </span>
                      </td>

                      {(isSuperAdmin || isCompanyAdmin) && (
                        <td style={{ fontSize:12 }}>
                          {co && (
                            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                              <div style={{ width:7, height:7, borderRadius:'50%', background: co.color || 'var(--accent)', flexShrink:0 }}/>
                              <span style={{ fontWeight:500, color:'var(--text)' }}>{co.name}</span>
                            </div>
                          )}
                          {tm && <div style={{ color:'var(--text3)', marginTop:2 }}>{tm.name}</div>}
                          {!co && !tm && <span style={{ color:'var(--text3)' }}>—</span>}
                        </td>
                      )}

                      <td><AttBadge status={att?.status}/></td>

                      <td style={{ fontSize:12, color:'var(--text3)' }}>
                        {att ? (
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <Clock size={12} style={{ color:'var(--text3)' }}/>
                            <div>
                              <div style={{ color:'var(--text2)' }}>
                                {new Date(att.markedAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                              </div>
                              <div style={{ fontSize:10 }}>{timeSince(att.markedAt)}</div>
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
              <CalendarCheck/>
              <h3>No people found</h3>
              <p>{search ? 'Try adjusting your search' : 'No team leads or recruiters in this view'}</p>
            </div>
          )}
          <Pagination pagination={pag}/>
        </div>
      )}

      {/* ── Recruiter: view their own history ── */}
      {isRecruiter && myRecruiterProfile && (
        <div className="table-container" style={{ marginTop:24 }}>
          <div className="table-header">
            <div className="table-header-title">Your Attendance This Month</div>
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
                  .slice(0, 30)
                  .map(a => (
                    <tr key={a.id}>
                      <td style={{ color:'var(--text)', fontWeight:500 }}>
                        {new Date(a.date).toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' })}
                        {a.date === today && (
                          <span style={{ marginLeft:8, fontSize:10, background:'var(--accent-glow)', color:'var(--accent2)', padding:'1px 7px', borderRadius:10, border:'1px solid rgba(79,124,255,0.2)' }}>
                            Today
                          </span>
                        )}
                      </td>
                      <td><AttBadge status={a.status}/></td>
                      <td style={{ fontSize:12, color:'var(--text3)' }}>
                        {new Date(a.markedAt).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {visibleAttendance.filter(a => a.personId === myRecruiterProfile.id).length === 0 && (
            <div className="empty-state">
              <CalendarCheck/>
              <h3>No attendance records yet</h3>
              <p>Mark your attendance above to get started</p>
            </div>
          )}
        </div>
      )}

    </div>
  )
}