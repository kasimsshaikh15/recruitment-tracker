import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, Calendar, ArrowRight, CheckCircle, PartyPopper, XCircle, PauseCircle, LogOut, User, Phone, Mail, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, StatusBadge, SkillTags, SkillsInput, Avatar, useSortable, usePagination, Pagination, Confirm } from '../components/Shared'

const ACTIONS = [
  { label:'Schedule Interview', status:'📅 Interview Scheduled', cls:'btn-warning', icon:<Calendar size={12}/> },
  { label:'Next Level', status:'➡️ Next Level', cls:'btn-ghost', icon:<ArrowRight size={12}/> },
  { label:'Select', status:'✅ Selected', cls:'btn-success', icon:<CheckCircle size={12}/> },
  { label:'Mark Joined', status:'🎉 Joined', cls:'btn-success', icon:<PartyPopper size={12}/> },
  { label:'Reject', status:'❌ Rejected', cls:'btn-danger', icon:<XCircle size={12}/> },
  { label:'On Hold', status:'⏸️ On Hold', cls:'btn-warning', icon:<PauseCircle size={12}/> },
  { label:'Exit', status:'🚫 Exit', cls:'btn-ghost', icon:<LogOut size={12}/> },
]

function CandidateForm({ initial={}, onSave, onClose, companies, jobs, recruiters }) {
  const [d, setD] = useState({
    name:'', jobId:'', companyId:'', recruiterId:'', experience:'', skills:[], location:'', gender:'Male',
    qualification:'', status:'📅 Interview Scheduled', phone:'', email:'', notes:'', ...initial
  })
  const set = k => e => setD(x=>({...x,[k]:e.target.value}))
  return (
    <>
      <div className="form-grid">
        <div className="form-group"><label>Full Name *</label><input className="form-control" value={d.name} onChange={set('name')} placeholder="John Doe"/></div>
        <div className="form-group"><label>Email *</label><input className="form-control" value={d.email} onChange={set('email')} placeholder="john@email.com"/></div>
        <div className="form-group"><label>Phone</label><input className="form-control" value={d.phone} onChange={set('phone')} placeholder="9876543210"/></div>
        <div className="form-group"><label>Gender</label>
          <select className="form-control" value={d.gender} onChange={set('gender')}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="form-group"><label>Company</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Job Position</label>
          <select className="form-control" value={d.jobId} onChange={set('jobId')}>
            <option value="">Select job</option>
            {jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Recruiter</label>
          <select className="form-control" value={d.recruiterId} onChange={set('recruiterId')}>
            <option value="">Select recruiter</option>
            {recruiters.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        <div className="form-group"><label>Experience</label><input className="form-control" value={d.experience} onChange={set('experience')} placeholder="3 years"/></div>
        <div className="form-group"><label>Location</label><input className="form-control" value={d.location} onChange={set('location')} placeholder="Bangalore"/></div>
        <div className="form-group"><label>Qualification</label><input className="form-control" value={d.qualification} onChange={set('qualification')} placeholder="B.Tech"/></div>
        <div className="form-group"><label>Status</label>
          <select className="form-control" value={d.status} onChange={set('status')}>
            {['📅 Interview Scheduled','➡️ Next Level','✅ Selected','🎉 Joined','❌ Rejected','🚫 Exit','⏸️ On Hold'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group span-2"><label>Skills</label><SkillsInput value={d.skills} onChange={v=>setD(x=>({...x,skills:v}))}/></div>
        <div className="form-group span-2"><label>Notes</label><textarea className="form-control" value={d.notes} onChange={set('notes')} placeholder="Additional notes..."/></div>
      </div>
      <div className="modal-footer" style={{padding:'16px 0 0'}}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{ if(!d.name||!d.email) return; onSave(d) }}>
          {initial.id ? 'Update Candidate' : 'Create Candidate'}
        </button>
      </div>
    </>
  )
}

function ProfileDrawer({ candidate, onClose, jobs, companies, recruiters, setCandidateStatus, onEdit }) {
  const job = jobs.find(j=>j.id===candidate.jobId)
  const company = companies.find(c=>c.id===candidate.companyId)
  const recruiter = recruiters.find(r=>r.id===candidate.recruiterId)

  return (
    <div className="profile-drawer">
      <div className="drawer-header">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Avatar name={candidate.name} size={40}/>
          <div>
            <div style={{fontWeight:600,color:'var(--text)'}}>{candidate.name}</div>
            <div style={{fontSize:12,color:'var(--text3)'}}>{job?.title || '—'}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-icon" onClick={onEdit}><Edit3 size={14}/></button>
          <button className="btn-icon" onClick={onClose}><span style={{fontSize:16,lineHeight:1}}>×</span></button>
        </div>
      </div>
      <div className="drawer-body">
        <StatusBadge status={candidate.status}/>

        <div className="divider"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
          {[
            ['Company', company?.name, <MapPin size={12}/>],
            ['Recruiter', recruiter?.name, <User size={12}/>],
            ['Experience', candidate.experience, null],
            ['Qualification', candidate.qualification, null],
            ['Location', candidate.location, <MapPin size={12}/>],
            ['Gender', candidate.gender, null],
            ['Applied', candidate.appliedDate, null],
          ].map(([k,v,icon])=>(
            <div key={k}>
              <div style={{fontSize:11,color:'var(--text3)',marginBottom:2}}>{k}</div>
              <div style={{fontSize:13,color:'var(--text)',display:'flex',alignItems:'center',gap:4}}>{icon}{v||'—'}</div>
            </div>
          ))}
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:'var(--text3)',marginBottom:6}}>Contact</div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--text2)'}}>
              <Phone size={13} style={{color:'var(--text3)'}}/>
              <a href={`tel:${candidate.phone}`} style={{color:'inherit',textDecoration:'none'}}>{candidate.phone}</a>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--text2)'}}>
              <Mail size={13} style={{color:'var(--text3)'}}/>
              <a href={`mailto:${candidate.email}`} style={{color:'var(--accent)',textDecoration:'none'}}>{candidate.email}</a>
            </div>
          </div>
        </div>

        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,color:'var(--text3)',marginBottom:6}}>Skills</div>
          <SkillTags skills={candidate.skills}/>
        </div>

        {candidate.notes && (
          <div style={{marginBottom:16}}>
            <div style={{fontSize:11,color:'var(--text3)',marginBottom:4}}>Notes</div>
            <div style={{fontSize:13,color:'var(--text2)',background:'var(--surface)',padding:'10px 12px',borderRadius:8}}>{candidate.notes}</div>
          </div>
        )}

        <div className="divider"/>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',marginBottom:10}}>Quick Actions</div>
        <div className="action-strip">
          {ACTIONS.map(a=>(
            <button key={a.status} className={`btn btn-sm ${a.cls}`}
              style={{opacity:candidate.status===a.status?0.5:1}}
              onClick={()=>setCandidateStatus(candidate.id, a.status)}>
              {a.icon}{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Candidates() {
  const { candidates, jobs, companies, recruiters, addCandidate, updateCandidate, deleteCandidate, setCandidateStatus } = useApp()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCompany, setFilterCompany] = useState('All')
  const [filterJob, setFilterJob] = useState('All')
  const [modal, setModal] = useState(null)
  const [profile, setProfile] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const filtered = useMemo(() => candidates.filter(c => {
    const q = search.toLowerCase()
    if (filterStatus !== 'All' && c.status !== filterStatus) return false
    if (filterCompany !== 'All' && c.companyId !== filterCompany) return false
    if (filterJob !== 'All' && c.jobId !== filterJob) return false
    return !q || c.name.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q)
  }), [candidates, search, filterStatus, filterCompany, filterJob])

  const { sorted, toggle, SortIcon } = useSortable(filtered, 'name')
  const pag = usePagination(sorted, 20)

  return (
    <div className="content">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>Candidates</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{candidates.length} total candidates</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setModal('create')}><Plus size={14}/> Create Candidate</button>
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14}/>
            <input className="search-input" placeholder="Search candidates..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="filter-select" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            {['📅 Interview Scheduled','➡️ Next Level','✅ Selected','🎉 Joined','❌ Rejected','🚫 Exit','⏸️ On Hold'].map(s=><option key={s}>{s}</option>)}
          </select>
          <select className="filter-select" value={filterCompany} onChange={e=>setFilterCompany(e.target.value)}>
            <option value="All">All Companies</option>
            {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="filter-select" value={filterJob} onChange={e=>setFilterJob(e.target.value)}>
            <option value="All">All Jobs</option>
            {jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}
          </select>
          <span className="table-header-count">{filtered.length} results</span>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={()=>toggle('name')}>Candidate <SortIcon col="name"/></th>
              <th>Job</th>
              <th>Company</th>
              <th>Recruiter</th>
              <th onClick={()=>toggle('experience')}>Experience <SortIcon col="experience"/></th>
              <th>Skills</th>
              <th onClick={()=>toggle('location')}>Location <SortIcon col="location"/></th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(c => {
              const job = jobs.find(j=>j.id===c.jobId)
              const co = companies.find(x=>x.id===c.companyId)
              const rec = recruiters.find(r=>r.id===c.recruiterId)
              return (
                <tr key={c.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>setProfile(c)}>
                      <Avatar name={c.name} size={30}/>
                      <div>
                        <div style={{fontWeight:500,color:'var(--text)'}}>{c.name}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{job?.title||'—'}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      {co && <div style={{width:6,height:6,borderRadius:'50%',background:co.color}}/>}
                      <span style={{fontSize:12}}>{co?.name||'—'}</span>
                    </div>
                  </td>
                  <td style={{fontSize:12}}>{rec?.name||'—'}</td>
                  <td style={{fontSize:12}}>{c.experience}</td>
                  <td><SkillTags skills={c.skills?.slice(0,2)}/></td>
                  <td style={{fontSize:12}}>{c.location}</td>
                  <td><StatusBadge status={c.status}/></td>
                  <td>
                    <div style={{display:'flex',gap:5}}>
                      <button className="btn btn-sm btn-ghost" onClick={()=>setProfile(c)}><User size={12}/> Profile</button>
                      <button className="btn-icon" onClick={()=>setModal(c)}><Edit3 size={13}/></button>
                      <button className="btn-icon" onClick={()=>setConfirm(c.id)}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {pag.slice.length === 0 && (
          <div className="empty-state"><Search/><h3>No candidates found</h3><p>Try adjusting your filters</p></div>
        )}
        <Pagination pagination={pag}/>
      </div>

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal==='create' ? 'Add Candidate' : 'Edit Candidate'} onClose={()=>setModal(null)} size="modal-lg">
          <CandidateForm
            initial={modal==='create' ? {} : modal}
            companies={companies} jobs={jobs} recruiters={recruiters}
            onSave={d=>{ modal==='create' ? addCandidate(d) : updateCandidate(modal.id,d); setModal(null) }}
            onClose={()=>setModal(null)}
          />
        </Modal>
      )}

      {profile && (
        <>
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.3)',zIndex:199}} onClick={()=>setProfile(null)}/>
          <ProfileDrawer
            candidate={profile}
            onClose={()=>setProfile(null)}
            jobs={jobs} companies={companies} recruiters={recruiters}
            setCandidateStatus={(id,s)=>{ setCandidateStatus(id,s); setProfile(c=>({...c,status:s})) }}
            onEdit={()=>{ setModal(profile); setProfile(null) }}
          />
        </>
      )}

      {confirm && (
        <Confirm
          message="Remove this candidate permanently?"
          onConfirm={()=>{ deleteCandidate(confirm); setConfirm(null); if(profile?.id===confirm) setProfile(null) }}
          onCancel={()=>setConfirm(null)}
        />
      )}
    </div>
  )
}
