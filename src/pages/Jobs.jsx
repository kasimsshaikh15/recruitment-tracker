import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, MapPin, Clock, GraduationCap, CheckCircle, XCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, StatusBadge, SkillTags, SkillsInput, useSortable, usePagination, Pagination, Confirm, Avatar } from '../components/Shared'

function JobForm({ initial={}, onSave, onClose, companies }) {
  const [d, setD] = useState({
    title:'', companyId:'', location:'', experience:'', skills:[], qualification:'', status:'Open', description:'', ...initial
  })
  const set = k => e => setD(x=>({...x,[k]:e.target.value}))
  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label>Job Title *</label>
          <input className="form-control" value={d.title} onChange={set('title')} placeholder="e.g. Software Engineer"/>
        </div>
        <div className="form-group">
          <label>Company *</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Location</label>
          <input className="form-control" value={d.location} onChange={set('location')} placeholder="e.g. Bangalore"/>
        </div>
        <div className="form-group">
          <label>Experience</label>
          <input className="form-control" value={d.experience} onChange={set('experience')} placeholder="e.g. 2-5 years"/>
        </div>
        <div className="form-group">
          <label>Qualification</label>
          <input className="form-control" value={d.qualification} onChange={set('qualification')} placeholder="e.g. B.Tech/M.Tech"/>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" value={d.status} onChange={set('status')}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-group span-2">
          <label>Required Skills</label>
          <SkillsInput value={d.skills} onChange={v=>setD(x=>({...x,skills:v}))}/>
        </div>
        <div className="form-group span-2">
          <label>Description</label>
          <textarea className="form-control" value={d.description} onChange={set('description')} placeholder="Job description..."/>
        </div>
      </div>
      <div className="modal-footer" style={{padding:'16px 0 0'}}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{ if(!d.title||!d.companyId) return; onSave(d) }}>
          {initial.id ? 'Update Job' : 'Create Job Posting'}
        </button>
      </div>
    </>
  )
}

export default function Jobs() {
  const { jobs, companies, candidates, addJob, updateJob, deleteJob, setJobStatus } = useApp()
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCompany, setFilterCompany] = useState('All')
  const [modal, setModal] = useState(null) // null | 'create' | {job}
  const [confirm, setConfirm] = useState(null)

  const filtered = useMemo(() => jobs.filter(j => {
    const q = search.toLowerCase()
    if (filterStatus !== 'All' && j.status !== filterStatus) return false
    if (filterCompany !== 'All' && j.companyId !== filterCompany) return false
    return !q || j.title.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q)
  }), [jobs, search, filterStatus, filterCompany])

  const { sorted, toggle, SortIcon } = useSortable(filtered, 'title')
  const pag = usePagination(sorted, 15)

  const getCompany = id => companies.find(c=>c.id===id)
  const getCandidateCount = jid => candidates.filter(c=>c.jobId===jid).length

  return (
    <div className="content">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>Job Postings</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{jobs.filter(j=>j.status==='Open').length} open · {jobs.filter(j=>j.status==='Closed').length} closed</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setModal('create')}><Plus size={14}/> Create Job Posting</button>
      </div>

      <div className="table-container">
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14}/>
            <input className="search-input" placeholder="Search jobs..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="filter-select" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <select className="filter-select" value={filterCompany} onChange={e=>setFilterCompany(e.target.value)}>
            <option value="All">All Companies</option>
            {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <span className="table-header-count">{filtered.length} results</span>
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={()=>toggle('title')}>Job Title <SortIcon col="title"/></th>
              <th>Company</th>
              <th onClick={()=>toggle('location')}>Location <SortIcon col="location"/></th>
              <th>Experience</th>
              <th>Skills</th>
              <th>Qualification</th>
              <th>Candidates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pag.slice.map(j => {
              const co = getCompany(j.companyId)
              return (
                <tr key={j.id}>
                  <td style={{fontWeight:500,color:'var(--text)'}}>{j.title}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      {co && <div style={{width:8,height:8,borderRadius:'50%',background:co.color,flexShrink:0}}/>}
                      {co?.name || '—'}
                    </div>
                  </td>
                  <td><div style={{display:'flex',alignItems:'center',gap:4}}><MapPin size={12} style={{color:'var(--text3)'}}/>{j.location}</div></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:4}}><Clock size={12} style={{color:'var(--text3)'}}/>{j.experience}</div></td>
                  <td><SkillTags skills={j.skills?.slice(0,2)}/></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:4}}><GraduationCap size={12} style={{color:'var(--text3)'}}/>{j.qualification}</div></td>
                  <td><span style={{background:'var(--surface)',padding:'2px 8px',borderRadius:6,fontSize:12,color:'var(--text2)'}}>{getCandidateCount(j.id)}</span></td>
                  <td><StatusBadge status={j.status}/></td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      {j.status==='Open'
                        ? <button className="btn btn-sm btn-danger" onClick={()=>setJobStatus(j.id,'Closed')}><XCircle size={12}/> Close</button>
                        : <button className="btn btn-sm btn-success" onClick={()=>setJobStatus(j.id,'Open')}><CheckCircle size={12}/> Open</button>
                      }
                      <button className="btn-icon" onClick={()=>setModal(j)}><Edit3 size={13}/></button>
                      <button className="btn-icon" onClick={()=>setConfirm(j.id)}><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {pag.slice.length === 0 && (
          <div className="empty-state"><Search/><h3>No jobs found</h3><p>Try adjusting your filters</p></div>
        )}
        <Pagination pagination={pag}/>
      </div>

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal==='create' ? 'Create Job Posting' : 'Edit Job Posting'} onClose={()=>setModal(null)} size="modal-lg">
          <JobForm
            initial={modal==='create' ? {} : modal}
            companies={companies}
            onSave={d => { modal==='create' ? addJob(d) : updateJob(modal.id,d); setModal(null) }}
            onClose={()=>setModal(null)}
          />
        </Modal>
      )}

      {confirm && (
        <Confirm
          message="Delete this job posting? All associated data may be affected."
          onConfirm={()=>{ deleteJob(confirm); setConfirm(null) }}
          onCancel={()=>setConfirm(null)}
        />
      )}
    </div>
  )
}
