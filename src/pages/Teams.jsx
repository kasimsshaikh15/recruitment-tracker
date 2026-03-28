import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, UsersRound } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, Avatar, Confirm } from '../components/Shared'

function TeamForm({ initial = {}, onSave, onClose, companies, users }) {
  const [d, setD] = useState({ name: '', companyId: '', teamLeadId: '', ...initial })
  const set = k => e => setD(x => ({ ...x, [k]: e.target.value }))
  const leads = users.filter(u => u.role === 'teamLead' && (!d.companyId || u.companyId === d.companyId))
  return (
    <>
      <div className="form-grid">
        <div className="form-group"><label>Team Name *</label>
          <input className="form-control" value={d.name} onChange={set('name')} placeholder="Alpha Team" />
        </div>
        <div className="form-group"><label>Company *</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group span-2"><label>Team Lead</label>
          <select className="form-control" value={d.teamLeadId} onChange={set('teamLeadId')}>
            <option value="">Select team lead</option>
            {leads.map(u => <option key={u.id} value={u.id}>{u.name} ({u.username})</option>)}
          </select>
        </div>
      </div>
      <div className="modal-footer" style={{ padding: '16px 0 0' }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { if (!d.name || !d.companyId) return; onSave(d) }}>
          {initial.id ? 'Update Team' : 'Create Team'}
        </button>
      </div>
    </>
  )
}

export default function Teams() {
  const { visibleTeams: teams, companies, users, recruiters, candidates, visibleAttendance,
    addTeam, updateTeam, deleteTeam, isSuperAdmin, isCompanyAdmin, isTeamLead } = useApp()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const canEdit = isSuperAdmin || isCompanyAdmin

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return teams.filter(t => !q || t.name.toLowerCase().includes(q))
  }, [teams, search])

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Teams</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{teams.length} teams</div>
        </div>
        {canEdit && (
          <button className="btn btn-primary" onClick={() => setModal('create')}>
            <Plus size={14} /> Create Team
          </button>
        )}
      </div>

      <div className="search-wrap" style={{ maxWidth: 360, marginBottom: 16 }}>
        <Search size={14} />
        <input className="search-input" placeholder="Search teams..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map(team => {
          const co = companies.find(c => c.id === team.companyId)
          const lead = users.find(u => u.id === team.teamLeadId)
          const teamRecs = recruiters.filter(r => r.teamId === team.id)
          const teamCands = candidates.filter(c => teamRecs.map(r => r.id).includes(c.recruiterId))
          const todayAtt = visibleAttendance.filter(a => a.date === today && teamRecs.map(r => r.id).includes(a.recruiterId))
          const presentToday = todayAtt.filter(a => a.status === 'Present').length

          return (
            <div key={team.id} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 12, padding: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `${co?.color || 'var(--accent)'}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>👥</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text)' }}>{team.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text3)' }}>{co?.name || '—'}</div>
                  </div>
                </div>
                {canEdit && (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon" onClick={() => setModal(team)}><Edit3 size={13} /></button>
                    <button className="btn-icon" onClick={() => setConfirm(team.id)}><Trash2 size={13} /></button>
                  </div>
                )}
              </div>

              {lead && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 10px', background: 'var(--surface)', borderRadius: 8 }}>
                  <Avatar name={lead.name} size={24} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{lead.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>Team Lead</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  [teamRecs.length, 'Recruiters', 'var(--accent)'],
                  [teamCands.length, 'Candidates', 'var(--purple)'],
                  [presentToday, 'Present Today', 'var(--green)'],
                ].map(([v, l, color]) => (
                  <div key={l} style={{ background: 'var(--surface)', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color }}>{v}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>

              {teamRecs.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>Recruiters</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {teamRecs.slice(0, 4).map(r => (
                      <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'var(--surface)', padding: '3px 8px', borderRadius: 20, fontSize: 11 }}>
                        <Avatar name={r.name} size={16} />
                        {r.name.split(' ')[0]}
                      </div>
                    ))}
                    {teamRecs.length > 4 && (
                      <span style={{ fontSize: 11, color: 'var(--text3)', alignSelf: 'center' }}>+{teamRecs.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state"><UsersRound /><h3>No teams found</h3><p>Create your first team</p></div>
      )}

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal === 'create' ? 'Create Team' : 'Edit Team'} onClose={() => setModal(null)}>
          <TeamForm
            initial={modal === 'create' ? {} : modal}
            companies={companies} users={users}
            onSave={d => { modal === 'create' ? addTeam(d) : updateTeam(modal.id, d); setModal(null) }}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}
      {confirm && (
        <Confirm message="Delete this team?" onConfirm={() => { deleteTeam(confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />
      )}
    </div>
  )
}
