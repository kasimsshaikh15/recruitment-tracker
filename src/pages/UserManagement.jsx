import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, Shield, Eye, EyeOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, Avatar, Confirm } from '../components/Shared'

const ROLE_COLORS = {
  companyAdmin: '#f97316',
  teamLead:     '#a855f7',
  recruiter:    '#22c55e',
  superAdmin:   '#ef4444',
}

// What each role is allowed to create
const CREATABLE_ROLES = {
  superAdmin:   ['companyAdmin', 'teamLead', 'recruiter'],
  companyAdmin: ['teamLead', 'recruiter'],
  teamLead:     ['recruiter'],
}

const ROLE_LABELS = {
  companyAdmin: 'Company Admin',
  teamLead:     'Team Lead',
  recruiter:    'Recruiter',
}

function UserForm({ initial = {}, onSave, onClose, companies, teams, recruiters, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead, addRecruiter }) {
  const creatableRoles = CREATABLE_ROLES[currentUser?.role] || []

  // Default role to the first creatable one
  const [d, setD] = useState({
    name: '', username: '', password: '',
    role: creatableRoles[0] || 'recruiter',
    // Pre-fill company for companyAdmin and teamLead
    companyId: isTeamLead || isCompanyAdmin ? (currentUser?.companyId || '') : '',
    // Pre-fill team for teamLead
    teamId: isTeamLead ? (currentUser?.teamId || '') : '',
    recruiterId: '', mobile: '',
    ...initial,
  })
  const [showPw, setShowPw] = useState(false)
  const [createNewRec, setCreateNewRec] = useState(false)
  const [newRec, setNewRec] = useState({ name: '', email: '', phone: '', specialization: '' })
  
  const set = k => e => setD(x => ({ ...x, [k]: e.target.value }))
  const setNewRec_ = k => e => setNewRec(x => ({ ...x, [k]: e.target.value }))

  const filteredTeams = teams.filter(t => !d.companyId || t.companyId === d.companyId)
  const filteredRecs  = recruiters.filter(r =>
    (!d.companyId || r.companyId === d.companyId) &&
    (!d.teamId || r.teamId === d.teamId)
  )

  // Create new recruiter profile and link it
  const handleCreateAndLinkRecruiter = async () => {
    if (!newRec.name || !newRec.email || !newRec.phone) {
      alert('⚠️ Please fill in recruiter name, email, and phone')
      return
    }
    const rec = {
      name: newRec.name,
      email: newRec.email,
      phone: newRec.phone,
      specialization: newRec.specialization,
      companyId: d.companyId,
      teamId: d.teamId || null,
    }
    await addRecruiter(rec)
    setCreateNewRec(false)
    setNewRec({ name: '', email: '', phone: '', specialization: '' })
    // Note: recruiters list will update and new profile will be available to select
  }

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name *</label>
          <input className="form-control" value={d.name} onChange={set('name')} placeholder="Jane Smith" />
        </div>
        <div className="form-group">
          <label>Username *</label>
          <input className="form-control" value={d.username} onChange={set('username')} placeholder="jane_smith" />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password *</label>
          <div style={{ position: 'relative' }}>
            <input
              className="form-control"
              type={showPw ? 'text' : 'password'}
              value={d.password} onChange={set('password')}
              placeholder="••••••••" style={{ paddingRight: 36 }}
            />
            <button type="button" onClick={() => setShowPw(s => !s)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)' }}>
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Role — only show what this user is allowed to create */}
        <div className="form-group">
          <label>Role *</label>
          <select className="form-control" value={d.role} onChange={set('role')}>
            {creatableRoles.map(r => (
              <option key={r} value={r}>{ROLE_LABELS[r]}</option>
            ))}
          </select>
        </div>

        {/* Company — SuperAdmin picks freely; others locked to own company */}
        <div className="form-group">
          <label>Company *</label>
          {isSuperAdmin ? (
            <select className="form-control" value={d.companyId} onChange={set('companyId')}>
              <option value="">Select company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          ) : (
            <input
              className="form-control"
              value={companies.find(c => c.id === currentUser?.companyId)?.name || ''}
              disabled style={{ opacity: 0.6 }}
            />
          )}
        </div>

        {/* Team — shown for teamLead and recruiter roles */}
        {(d.role === 'teamLead' || d.role === 'recruiter') && (
          <div className="form-group">
            <label>Team</label>
            {isTeamLead ? (
              // Team lead can only assign to their own team
              <input
                className="form-control"
                value={teams.find(t => t.id === currentUser?.teamId)?.name || ''}
                disabled style={{ opacity: 0.6 }}
              />
            ) : (
              <select className="form-control" value={d.teamId} onChange={set('teamId')}>
                <option value="">Select team</option>
                {filteredTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            )}
          </div>
        )}

        {/* Recruiter profile link + mobile */}
        {d.role === 'recruiter' && (
          <>
            <div className="form-group">
              <label>Link to Recruiter Profile *</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <select className="form-control" value={d.recruiterId} onChange={set('recruiterId')} style={{ borderColor: !d.recruiterId && !createNewRec ? '#ef4444' : 'var(--border)' }}>
                    <option value="">⚠️ Select an existing recruiter profile</option>
                    {filteredRecs.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                  {!d.recruiterId && !createNewRec && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>⚠️ Required - link to a profile or create one</div>}
                </div>
                <button
                  type="button"
                  onClick={() => setCreateNewRec(!createNewRec)}
                  style={{
                    background: createNewRec ? '#22c55e' : '#f0fdf4',
                    color: createNewRec ? 'white' : '#15803d',
                    border: '1px solid #22c55e', borderRadius: 6,
                    padding: '6px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 600, marginTop: 2,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {createNewRec ? '✓ Creating' : '+ Create New'}
                </button>
              </div>
            </div>

            {/* Inline recruiter profile creation form */}
            {createNewRec && (
              <div style={{
                background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: 8,
                padding: '12px', marginBottom: 12, gridColumn: '1 / -1'
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#15803d', marginBottom: 10 }}>
                  📝 Create New Recruiter Profile
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <input
                    className="form-control"
                    placeholder="Profile Name *"
                    value={newRec.name}
                    onChange={setNewRec_('name')}
                    style={{ fontSize: 12 }}
                  />
                  <input
                    className="form-control"
                    placeholder="Email *"
                    value={newRec.email}
                    onChange={setNewRec_('email')}
                    style={{ fontSize: 12 }}
                  />
                  <input
                    className="form-control"
                    placeholder="Phone *"
                    value={newRec.phone}
                    onChange={setNewRec_('phone')}
                    style={{ fontSize: 12 }}
                  />
                  <input
                    className="form-control"
                    placeholder="Specialization (e.g., Engineering)"
                    value={newRec.specialization}
                    onChange={setNewRec_('specialization')}
                    style={{ fontSize: 12 }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={handleCreateAndLinkRecruiter}
                    style={{
                      background: '#22c55e', color: 'white', border: 'none', borderRadius: 6,
                      padding: '6px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    }}
                  >
                    ✓ Create Profile & Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreateNewRec(false)
                      setNewRec({ name: '', email: '', phone: '', specialization: '' })
                    }}
                    style={{
                      background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 6,
                      padding: '6px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    }}
                  >
                    ✗ Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Mobile</label>
              <input className="form-control" value={d.mobile} onChange={set('mobile')} placeholder="9876543210" />
            </div>
          </>
        )}
      </div>

      {/* Info note about what's being created */}
      <div style={{
        background: `${ROLE_COLORS[d.role] || '#4f7cff'}10`,
        border: `1px solid ${ROLE_COLORS[d.role] || '#4f7cff'}30`,
        borderRadius: 8, padding: '10px 14px', marginTop: 8, fontSize: 12, color: 'var(--text2)',
      }}>
        {d.role === 'companyAdmin' && '🏢 This user will manage everything inside the selected company.'}
        {d.role === 'teamLead' && '👥 This user will manage recruiters and monitor attendance in their team.'}
        {d.role === 'recruiter' && (
          <>
            🎯 This user will add candidates and mark their own attendance.<br/>
            {!d.recruiterId && <span style={{ color: '#ef4444', fontWeight: 600 }}>⚠️ Must link to a Recruiter Profile above for attendance tracking.</span>}
          </>
        )}
      </div>

      <div className="modal-footer" style={{ padding: '16px 0 0' }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!d.name || !d.username || !d.password) return
            if (d.role === 'recruiter' && !d.recruiterId) {
              alert('⚠️ Please link a Recruiter Profile. This is required for the recruiter to mark attendance.')
              return
            }
            onSave(d)
          }}
        >
          {initial.id ? 'Update User' : `Create ${ROLE_LABELS[d.role] || 'User'}`}
        </button>
      </div>
    </>
  )
}

export default function UserManagement() {
  const {
    visibleUsers: users, companies, teams, recruiters,
    addUser, updateUser, deleteUser, addRecruiter,
    isSuperAdmin, isCompanyAdmin, isTeamLead, currentUser,
  } = useApp()

  const [search, setSearch]   = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [modal, setModal]     = useState(null)
  const [confirm, setConfirm] = useState(null)

  // What roles this user can filter/see
  const visibleRoleOptions = useMemo(() => {
    const allowed = CREATABLE_ROLES[currentUser?.role] || []
    return allowed.map(r => ({ value: r, label: ROLE_LABELS[r] }))
  }, [currentUser])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return users.filter(u =>
      (!q || u.name?.toLowerCase().includes(q) || u.username?.toLowerCase().includes(q)) &&
      (!roleFilter || u.role === roleFilter)
    )
  }, [users, search, roleFilter])

  // Hierarchy info banner per role
  const hierarchyInfo = {
    superAdmin:   'You can create Company Admins, Team Leads, and Recruiters.',
    companyAdmin: 'You can create Team Leads and Recruiters for your company.',
    teamLead:     'You can create Recruiters for your team.',
  }

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>User Management</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>
            {isSuperAdmin ? 'All system users' : isCompanyAdmin ? 'Users in your company' : 'Recruiters in your team'}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setModal('create')}>
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* Hierarchy info banner */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '10px 14px', marginBottom: 16,
        fontSize: 12, color: 'var(--text2)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span>ℹ️</span>
        <span>{hierarchyInfo[currentUser?.role]}</span>
        {isSuperAdmin && (
          <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--text3)' }}>
            Super Admin → Company Admin → Team Lead → Recruiter
          </span>
        )}
      </div>

      <div className="filter-bar" style={{ marginBottom: 16 }}>
        <div className="search-wrap">
          <Search size={14} />
          <input className="search-input" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {visibleRoleOptions.length > 1 && (
          <select className="form-control" style={{ width: 'auto', minWidth: 140 }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
            <option value="">All Roles</option>
            {visibleRoleOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        )}
        <span className="table-header-count">{filtered.length} users</span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Role</th>
              {(isSuperAdmin || isCompanyAdmin) && <th>Company</th>}
              {(isSuperAdmin || isCompanyAdmin) && <th>Team</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => {
              const co    = companies.find(c => c.id === u.companyId)
              const tm    = teams.find(t => t.id === u.teamId)
              const color = ROLE_COLORS[u.role] || 'var(--text3)'
              const isSelf = u.id === currentUser?.id

              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={u.name || u.username} size={32} />
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: 13 }}>
                          {u.name || u.username}
                          {isSelf && (
                            <span style={{ marginLeft: 6, fontSize: 10, background: 'var(--accent)', color: 'white', padding: '1px 6px', borderRadius: 10 }}>You</span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text3)' }}>{u.mobile || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code style={{ fontSize: 12, background: 'var(--surface)', padding: '2px 8px', borderRadius: 4 }}>
                      {u.username}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: `${color}18`, color, fontWeight: 600 }}>
                      {ROLE_LABELS[u.role] || u.role}
                    </span>
                  </td>
                  {(isSuperAdmin || isCompanyAdmin) && <td style={{ fontSize: 13 }}>{co?.name || '—'}</td>}
                  {(isSuperAdmin || isCompanyAdmin) && <td style={{ fontSize: 13 }}>{tm?.name || '—'}</td>}
                  <td>
                    {!isSelf ? (
                      <div style={{ display: 'flex', gap: 5 }}>
                        <button className="btn-icon" onClick={() => setModal(u)}><Edit3 size={13} /></button>
                        <button className="btn-icon" onClick={() => setConfirm(u.id)}><Trash2 size={13} /></button>
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

        {filtered.length === 0 && (
          <div className="empty-state">
            <Shield />
            <h3>No users found</h3>
            <p>
              {isTeamLead ? 'Add recruiters to your team' :
               isCompanyAdmin ? 'Add team leads and recruiters' :
               'Add company admins, team leads, and recruiters'}
            </p>
          </div>
        )}
      </div>

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal === 'create' ? 'Add User' : 'Edit User'} onClose={() => setModal(null)}>
          <UserForm
            initial={modal === 'create' ? {} : modal}
            companies={companies} teams={teams} recruiters={recruiters}
            currentUser={currentUser}
            isSuperAdmin={isSuperAdmin} isCompanyAdmin={isCompanyAdmin} isTeamLead={isTeamLead}
            addRecruiter={addRecruiter}
            onSave={d => { modal === 'create' ? addUser(d) : updateUser(modal.id, d); setModal(null) }}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {confirm && (
        <Confirm
          message="Delete this user? They will no longer be able to log in."
          onConfirm={() => { deleteUser(confirm); setConfirm(null) }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}
