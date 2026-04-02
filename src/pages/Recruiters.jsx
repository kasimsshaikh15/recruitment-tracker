import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, Mail, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, Avatar, StatusBadge, useSortable, usePagination, Pagination, Confirm } from '../components/Shared'

function RecruiterForm({ initial = {}, onSave, onClose, companies, teams }) {
  const [d, setD] = useState({ name: '', email: '', phone: '', specialization: '', companyId: '', teamId: '', ...initial })
  const set = k => e => setD(x => ({ ...x, [k]: e.target.value }))
  const filteredTeams = teams.filter(t => !d.companyId || t.companyId === d.companyId)
  return (
    <>
      <div className="form-grid">
        <div className="form-group"><label>Full Name *</label><input className="form-control" value={d.name} onChange={set('name')} placeholder="Jane Smith" /></div>
        <div className="form-group"><label>Email *</label><input className="form-control" value={d.email} onChange={set('email')} placeholder="jane@company.com" /></div>
        <div className="form-group"><label>Phone</label><input className="form-control" value={d.phone} onChange={set('phone')} placeholder="9876543210" /></div>
        <div className="form-group"><label>Specialization</label><input className="form-control" value={d.specialization} onChange={set('specialization')} placeholder="Engineering, Finance..." /></div>
        <div className="form-group"><label>Company</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Team</label>
          <select className="form-control" value={d.teamId} onChange={set('teamId')}>
            <option value="">Select team</option>
            {filteredTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>
      <div className="modal-footer" style={{ padding: '16px 0 0' }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { if (!d.name || !d.email) return; onSave(d) }}>
          {initial.id ? 'Update Recruiter' : 'Create Recruiter'}
        </button>
      </div>
    </>
  )
}

export default function Recruiters() {
  const {
    currentUser, visibleRecruiters: recruiters, visibleCompanies: companies,
    visibleTeams: teams, visibleCandidates: candidates,
    addRecruiter, updateRecruiter, deleteRecruiter,
    markAttendance, getTodayAttendance,
    STATUSES, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter,
  } = useApp()

  const [search, setSearch]   = useState('')
  const [modal, setModal]     = useState(null)
  const [confirm, setConfirm] = useState(null)

  const canManageRecruiters = isSuperAdmin || isCompanyAdmin || isTeamLead
  const myRecruiterId = currentUser?.recruiterId

  const filtered = useMemo(() => recruiters.filter(r => {
    const q = search.toLowerCase()
    return !q || r.name.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.specialization?.toLowerCase().includes(q)
  }), [recruiters, search])

  const { sorted, toggle, SortIcon } = useSortable(filtered, 'name')
  const pag = usePagination(sorted, 20)

  const getStats = (rid) => {
    const cands = candidates.filter(c => c.recruiterId === rid)
    const statusMap = {}
    STATUSES.forEach(s => { statusMap[s] = cands.filter(c => c.status === s).length })
    return {
      total: cands.length,
      statusMap,
      joined: cands.filter(c => c.status === '🎉 Joined').length,
      selected: cands.filter(c => c.status === '✅ Selected').length,
    }
  }

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Recruiters</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
            {recruiters.length} {isRecruiter ? 'recruiter (your profile)' : 'recruiters'}
          </div>
        </div>
        {canManageRecruiters && (
          <button className="btn btn-primary" onClick={() => setModal('create')}>
            <Plus size={14} /> Create Recruiter
          </button>
        )}
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14} />
            <input className="search-input" placeholder="Search recruiters..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span className="table-header-count">{filtered.length} results</span>
        </div>

        <div className="table-scroll"><table>
          <thead>
            <tr>
              <th onClick={() => toggle('name')}>Recruiter <SortIcon col="name" /></th>
              <th>Contact</th>
              <th>Specialization</th>
              <th>Company / Team</th>
              <th>Attendance Today</th>
              <th>Total Submissions</th>
              <th>Selected / Joined</th>
              {canManageRecruiters && <th>Status Breakdown</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(r => {
              const co      = companies.find(c => c.id === r.companyId)
              const tm      = teams.find(t => t.id === r.teamId)
              const stats   = getStats(r.id)
              const todayAtt = getTodayAttendance(r.id)
              const isMe    = isRecruiter && r.id === myRecruiterId

              return (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={r.name} size={32} />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text)' }}>
                          {r.name}
                          {isMe && (
                            <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--accent)', color: 'white', padding: '1px 6px', borderRadius: 10 }}>You</span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>Recruiter</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                        <Mail size={11} style={{ color: 'var(--text3)' }} />
                        <a href={`mailto:${r.email}`} className="email-link">{r.email}</a>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                        <Phone size={11} style={{ color: 'var(--text3)' }} />
                        <a href={`tel:${r.phone}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{r.phone}</a>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>{r.specialization || '—'}</td>
                  <td>
                    <div style={{ fontSize: 12 }}>
                      {co && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: co.color }} />
                          <span style={{ fontWeight: 500 }}>{co.name}</span>
                        </div>
                      )}
                      {tm && <div style={{ color: 'var(--text3)' }}>{tm.name}</div>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600,
                        color: todayAtt?.status === 'Present' ? 'var(--green)' : todayAtt?.status === 'Absent' ? 'var(--red)' : 'var(--text3)',
                      }}>
                        {todayAtt?.status || '— Pending'}
                      </span>
                      {/* Recruiter marks own attendance */}
                      {isMe && (
                        <div style={{ display: 'flex', gap: 5 }}>
                          <button
                            style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: 5, padding: '3px 10px', cursor: 'pointer', fontSize: 11 }}
                            onClick={() => markAttendance(r.id, 'Present')}
                          >✓ Present</button>
                          <button
                            style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 5, padding: '3px 10px', cursor: 'pointer', fontSize: 11 }}
                            onClick={() => markAttendance(r.id, 'Absent')}
                          >✗ Absent</button>
                        </div>
                      )}
                      {/* Managers see monitoring label */}
                      {!isRecruiter && (
                        <span style={{ fontSize: 10, color: 'var(--text3)' }}>Monitoring only</span>
                      )}
                      {/* Other recruiter (not me) */}
                      {isRecruiter && !isMe && (
                        <span style={{ fontSize: 10, color: 'var(--text3)' }}>—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>{stats.total}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: 'var(--green)' }}>✅ {stats.selected}</span>
                      <span style={{ color: 'var(--text3)', margin: '0 6px' }}>·</span>
                      <span style={{ color: '#4ade80' }}>🎉 {stats.joined}</span>
                    </div>
                  </td>
                  {canManageRecruiters && (
                    <td>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {Object.entries(stats.statusMap).filter(([, v]) => v > 0).slice(0, 3).map(([s, v]) => (
                          <span key={s} style={{ fontSize: 10, background: 'var(--surface)', padding: '2px 6px', borderRadius: 4, color: 'var(--text2)' }}>
                            {s.slice(0, 6)}… {v}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}
                  <td>
                    {canManageRecruiters ? (
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button className="btn-icon" onClick={() => setModal(r)}><Edit3 size={13} /></button>
                        <button className="btn-icon" onClick={() => setConfirm(r.id)}><Trash2 size={13} /></button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--text3)' }}>View only</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table></div>{/* ✅ FIXED: closes table-scroll */}

        {pag.slice.length === 0 && (
          <div className="empty-state">
            <Search />
            <h3>No recruiters found</h3>
            <p>{isRecruiter ? 'Your profile will appear here' : 'Create your first recruiter'}</p>
          </div>
        )}
        <Pagination pagination={pag} />
      </div>{/* closes table-container */}

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal === 'create' ? 'Create Recruiter' : 'Edit Recruiter'} onClose={() => setModal(null)}>
          <RecruiterForm
            initial={modal === 'create' ? {} : modal}
            companies={companies}
            teams={teams}
            onSave={d => { modal === 'create' ? addRecruiter(d) : updateRecruiter(modal.id, d); setModal(null) }}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
      {confirm && (
        <Confirm
          message="Delete this recruiter?"
          onConfirm={() => { deleteRecruiter(confirm); setConfirm(null) }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}