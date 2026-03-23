import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, Mail, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, Avatar, StatusBadge, useSortable, usePagination, Pagination, Confirm } from '../components/Shared'

function RecruiterForm({ initial={}, onSave, onClose, companies }) {
  const [d, setD] = useState({ name:'', email:'', phone:'', specialization:'', companyId:'', ...initial })
  const set = k => e => setD(x=>({...x,[k]:e.target.value}))
  return (
    <>
      <div className="form-grid">
        <div className="form-group"><label>Full Name *</label><input className="form-control" value={d.name} onChange={set('name')} placeholder="Jane Smith"/></div>
        <div className="form-group"><label>Email *</label><input className="form-control" value={d.email} onChange={set('email')} placeholder="jane@company.com"/></div>
        <div className="form-group"><label>Phone</label><input className="form-control" value={d.phone} onChange={set('phone')} placeholder="9876543210"/></div>
        <div className="form-group"><label>Specialization</label><input className="form-control" value={d.specialization} onChange={set('specialization')} placeholder="Engineering, Finance..."/></div>
        <div className="form-group span-2"><label>Company</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="modal-footer" style={{padding:'16px 0 0'}}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{ if(!d.name||!d.email) return; onSave(d) }}>
          {initial.id ? 'Update Recruiter' : 'Create Recruiter'}
        </button>
      </div>
    </>
  )
}

export default function Recruiters() {
  const { recruiters, companies, candidates, addRecruiter, updateRecruiter, deleteRecruiter, STATUSES } = useApp()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const filtered = useMemo(() => recruiters.filter(r => {
    const q = search.toLowerCase()
    return !q || r.name.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q) || r.specialization?.toLowerCase().includes(q)
  }), [recruiters, search])

  const { sorted, toggle, SortIcon } = useSortable(filtered, 'name')
  const pag = usePagination(sorted, 20)

  const getStats = (rid) => {
    const cands = candidates.filter(c=>c.recruiterId===rid)
    const statusMap = {}
    STATUSES.forEach(s => { statusMap[s] = cands.filter(c=>c.status===s).length })
    return { total: cands.length, statusMap, joined: cands.filter(c=>c.status==='🎉 Joined').length, selected: cands.filter(c=>c.status==='✅ Selected').length }
  }

  return (
    <div className="content">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>Recruiters</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{recruiters.length} recruiters</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setModal('create')}><Plus size={14}/> Create Recruiter</button>
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14}/>
            <input className="search-input" placeholder="Search recruiters..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <span className="table-header-count">{filtered.length} results</span>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={()=>toggle('name')}>Recruiter <SortIcon col="name"/></th>
              <th>Contact</th>
              <th>Specialization</th>
              <th>Company</th>
              <th>Total Submissions</th>
              <th>Selected / Joined</th>
              <th>Status Breakdown</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(r => {
              const co = companies.find(c=>c.id===r.companyId)
              const stats = getStats(r.id)
              return (
                <tr key={r.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <Avatar name={r.name} size={32}/>
                      <div>
                        <div style={{fontWeight:500,color:'var(--text)'}}>{r.name}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>Recruiter</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',flexDirection:'column',gap:4}}>
                      <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}>
                        <Mail size={11} style={{color:'var(--text3)'}}/><a href={`mailto:${r.email}`} style={{color:'var(--accent)',textDecoration:'none'}}>{r.email}</a>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}>
                        <Phone size={11} style={{color:'var(--text3)'}}/>{r.phone}
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{r.specialization || '—'}</td>
                  <td>
                    {co ? <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{width:6,height:6,borderRadius:'50%',background:co.color}}/>
                      <span style={{fontSize:12}}>{co.name}</span>
                    </div> : '—'}
                  </td>
                  <td><span style={{fontSize:16,fontWeight:700,color:'var(--accent)'}}>{stats.total}</span></td>
                  <td>
                    <div style={{fontSize:12}}>
                      <span style={{color:'var(--green)'}}>✅ {stats.selected}</span>
                      <span style={{color:'var(--text3)',margin:'0 6px'}}>·</span>
                      <span style={{color:'#4ade80'}}>🎉 {stats.joined}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {Object.entries(stats.statusMap).filter(([,v])=>v>0).slice(0,3).map(([s,v])=>(
                        <span key={s} style={{fontSize:10,background:'var(--surface)',padding:'2px 6px',borderRadius:4,color:'var(--text2)'}}>{s.slice(0,6)}… {v}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',gap:5}}>
                      <button className="btn-icon" onClick={()=>setModal(r)}><Edit3 size={13}/></button>
                      <button className="btn-icon" onClick={()=>setConfirm(r.id)}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {pag.slice.length === 0 && (
          <div className="empty-state"><Search/><h3>No recruiters found</h3><p>Create your first recruiter</p></div>
        )}
        <Pagination pagination={pag}/>
      </div>

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal==='create' ? 'Create Recruiter' : 'Edit Recruiter'} onClose={()=>setModal(null)}>
          <RecruiterForm
            initial={modal==='create' ? {} : modal}
            companies={companies}
            onSave={d=>{ modal==='create' ? addRecruiter(d) : updateRecruiter(modal.id,d); setModal(null) }}
            onClose={()=>setModal(null)}
          />
        </Modal>
      )}
      {confirm && (
        <Confirm message="Delete this recruiter?" onConfirm={()=>{ deleteRecruiter(confirm); setConfirm(null) }} onCancel={()=>setConfirm(null)}/>
      )}
    </div>
  )
}
