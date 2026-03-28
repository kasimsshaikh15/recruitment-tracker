import React, { useState, useMemo } from 'react'
import { Plus, Search, Trash2, Edit3, ExternalLink, Briefcase, Users, Building2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, StatusBadge, useSortable, usePagination, Pagination, Confirm } from '../components/Shared'

function CompanyForm({ initial={}, onSave, onClose }) {
  const [d, setD] = useState({ name:'', industry:'', location:'', website:'', contacts:'', ...initial })
  const set = k => e => setD(x=>({...x,[k]:e.target.value}))
  return (
    <>
      <div className="form-grid">
        <div className="form-group"><label>Company Name *</label><input className="form-control" value={d.name} onChange={set('name')} placeholder="XYZ Corp"/></div>
        <div className="form-group"><label>Industry</label><input className="form-control" value={d.industry} onChange={set('industry')} placeholder="Technology"/></div>
        <div className="form-group"><label>Location</label><input className="form-control" value={d.location} onChange={set('location')} placeholder="Bangalore"/></div>
        <div className="form-group"><label>Website</label><input className="form-control" value={d.website} onChange={set('website')} placeholder="company.com"/></div>
        <div className="form-group span-2"><label>Contact Person</label><input className="form-control" value={d.contacts} onChange={set('contacts')} placeholder="Ravi Kumar"/></div>
      </div>
      <div className="modal-footer" style={{padding:'16px 0 0'}}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={()=>{ if(!d.name) return; onSave(d) }}>
          {initial.id ? 'Update Company' : 'Create Company'}
        </button>
      </div>
    </>
  )
}

function CompanyCard({ company, jobs, candidates, onEdit, onDelete, onView }) {
  const jobCount = jobs.filter(j=>j.companyId===company.id).length
  const openJobs = jobs.filter(j=>j.companyId===company.id && j.status==='Open').length
  const candCount = candidates.filter(c=>c.companyId===company.id).length
  const joined = candidates.filter(c=>c.companyId===company.id && c.status==='🎉 Joined').length

  return (
    <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:20,transition:'border-color 0.2s'}}
      onMouseEnter={e=>e.currentTarget.style.borderColor='var(--border2)'}
      onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,borderRadius:10,background:company.color+'22',border:`1px solid ${company.color}44`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:company.color}}>
            {company.name[0]}
          </div>
          <div>
            <div style={{fontWeight:600,color:'var(--text)',fontSize:15}}>{company.name}</div>
            <div style={{fontSize:12,color:'var(--text3)'}}>{company.industry} · {company.location}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:6}}>
          <button className="btn-icon" onClick={onEdit}><Edit3 size={13}/></button>
          <button className="btn-icon" onClick={onDelete}><Trash2 size={13}/></button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
        {[
          [jobCount, 'Total Jobs', 'var(--accent)'],
          [openJobs, 'Open Jobs', 'var(--green)'],
          [candCount, 'Candidates', 'var(--purple)'],
          [joined, 'Joined', '#4ade80'],
        ].map(([val, label, color]) => (
          <div key={label} style={{background:'var(--surface)',borderRadius:8,padding:'10px 12px'}}>
            <div style={{fontSize:20,fontWeight:700,color}}>{val}</div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{label}</div>
          </div>
        ))}
      </div>

      {company.contacts && (
        <div style={{fontSize:12,color:'var(--text3)',marginBottom:12}}>Contact: <span style={{color:'var(--text2)'}}>{company.contacts}</span></div>
      )}

      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={onView}><Building2 size={12}/> View Details</button>
        {company.website && (
          <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm"><ExternalLink size={12}/></a>
        )}
      </div>
    </div>
  )
}

function CompanyDetailModal({ company, jobs, candidates, recruiters, onClose }) {
  const cJobs = jobs.filter(j=>j.companyId===company.id)
  const cCands = candidates.filter(c=>c.companyId===company.id)
  const cRecs = recruiters.filter(r=>r.companyId===company.id)

  return (
    <Modal title={company.name} onClose={onClose} size="modal-lg">
      <div style={{display:'flex',gap:12,marginBottom:20}}>
        {[
          [cJobs.length, 'Job Postings'],
          [cJobs.filter(j=>j.status==='Open').length, 'Open Jobs'],
          [cCands.length, 'Candidates'],
          [cRecs.length, 'Recruiters'],
          [cCands.filter(c=>c.status==='🎉 Joined').length, 'Joined'],
        ].map(([v,l])=>(
          <div key={l} style={{flex:1,background:'var(--surface)',borderRadius:8,padding:'12px',textAlign:'center'}}>
            <div style={{fontSize:22,fontWeight:700,color:'var(--accent)'}}>{v}</div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:2}}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',marginBottom:10}}>Job Postings</div>
        {cJobs.length === 0 ? <p style={{color:'var(--text3)',fontSize:13}}>No jobs posted</p> :
          cJobs.map(j=>(
            <div key={j.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
              <div>
                <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{j.title}</div>
                <div style={{fontSize:11,color:'var(--text3)'}}>{j.location} · {j.experience}</div>
              </div>
              <StatusBadge status={j.status}/>
            </div>
          ))
        }
      </div>

      <div>
        <div style={{fontSize:12,fontWeight:600,color:'var(--text2)',marginBottom:10}}>Recent Candidates</div>
        {cCands.slice(0,5).map(c=>(
          <div key={c.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
            <div>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{c.name}</div>
              <div style={{fontSize:11,color:'var(--text3)'}}>{jobs.find(j=>j.id===c.jobId)?.title}</div>
            </div>
            <StatusBadge status={c.status}/>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default function Companies() {
  const { visibleCompanies: companies, visibleJobs: jobs, visibleCandidates: candidates, visibleRecruiters: recruiters, addCompany, updateCompany, deleteCompany } = useApp()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [viewModal, setViewModal] = useState(null)
  const [confirm, setConfirm] = useState(null)

  const filtered = useMemo(() => companies.filter(c => {
    const q = search.toLowerCase()
    return !q || c.name.toLowerCase().includes(q) || c.location?.toLowerCase().includes(q) || c.industry?.toLowerCase().includes(q)
  }), [companies, search])

  return (
    <div className="content">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>Companies</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{companies.length} client companies</div>
        </div>
        <button className="btn btn-primary" onClick={()=>setModal('create')}><Plus size={14}/> Create Company</button>
      </div>

      <div style={{marginBottom:20}}>
        <div className="search-wrap" style={{maxWidth:360}}>
          <Search size={14}/>
          <input className="search-input" placeholder="Search companies..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><Building2/><h3>No companies found</h3><p>Add your first client company</p></div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16}}>
          {filtered.map(co => (
            <CompanyCard key={co.id} company={co} jobs={jobs} candidates={candidates}
              onEdit={()=>setModal(co)}
              onDelete={()=>setConfirm(co.id)}
              onView={()=>setViewModal(co)}
            />
          ))}
        </div>
      )}

      {(modal === 'create' || (modal && modal.id)) && (
        <Modal title={modal==='create' ? 'Create Company' : 'Edit Company'} onClose={()=>setModal(null)}>
          <CompanyForm
            initial={modal==='create' ? {} : modal}
            onSave={d=>{ modal==='create' ? addCompany(d) : updateCompany(modal.id,d); setModal(null) }}
            onClose={()=>setModal(null)}
          />
        </Modal>
      )}

      {viewModal && (
        <CompanyDetailModal company={viewModal} jobs={jobs} candidates={candidates} recruiters={recruiters} onClose={()=>setViewModal(null)}/>
      )}

      {confirm && (
        <Confirm message="Delete this company?" onConfirm={()=>{ deleteCompany(confirm); setConfirm(null) }} onCancel={()=>setConfirm(null)}/>
      )}
    </div>
  )
}
