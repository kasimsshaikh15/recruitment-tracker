import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar, StatusBadge } from '../components/Shared'

// ✅ Updated STAGES
const STAGES = [
  { key:'📋 Applied',             label:'Applied',             color:'var(--text3)' },
  { key:'📞 Screening',           label:'Screening',           color:'var(--cyan)' },
  { key:'📅 Interview Scheduled', label:'Interview Scheduled', color:'var(--purple)' },
  { key:'✅ Interview Attended',  label:'Interview Attended',  color:'var(--blue)' },
  { key:'➡️ Next Level',          label:'Next Level',          color:'var(--cyan)' },
  { key:'✅ Selected',            label:'Selected',            color:'var(--green)' },
  { key:'🎉 Joined',              label:'Joined',              color:'#4ade80' },
  { key:'🚫 Screen Rejected',     label:'Screen Rejected',     color:'var(--red)' },
  { key:'❌ Interview Rejected',  label:'Interview Rejected',  color:'var(--red)' },
  { key:'💔 Offer Rejected',      label:'Offer Rejected',      color:'var(--red)' },
  { key:'⏸️ On Hold',             label:'On Hold',             color:'var(--yellow)' },
  { key:'🚫 Exit',                label:'Exit',                color:'var(--text3)' },
]

// ✅ Helper to format date safely
const formatDate = (dateStr) => {
  if (!dateStr) return null
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return null
  }
}

export default function Pipeline() {
  const {
    visibleCandidates: candidates = [],
    visibleJobs: jobs = [],
    visibleCompanies: companies = [],
    visibleRecruitmentPartners: recruitmentPartners = [],
    updateCandidate,
  } = useApp()

  const [search, setSearch] = useState('')
  const [filterCompany, setFilterCompany] = useState('All')
  const [filterJob, setFilterJob] = useState('All')
  const [filterPartner, setFilterPartner] = useState('All')
  const [dragging, setDragging] = useState(null)

  const filtered = useMemo(() => candidates.filter(c => {
    if (filterCompany !== 'All' && c.companyId !== filterCompany) return false
    if (filterJob !== 'All' && c.jobId !== filterJob) return false
    if (filterPartner !== 'All' && c.recruitmentPartnerId !== filterPartner) return false
    const q = search.toLowerCase()
    return !q || c.name.toLowerCase().includes(q)
  }), [candidates, search, filterCompany, filterJob, filterPartner])

  // ✅ Updated handleDrop — saves statusUpdatedAt on every stage change
  const handleDrop = async (status) => {
    if (dragging && dragging.status !== status) {
      await updateCandidate(dragging.id, {
        ...dragging,
        status,
        statusUpdatedAt: new Date().toISOString(), // ✅ track when stage changed
      })
    }
    setDragging(null)
  }

  return (
    <div className="content" style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:'var(--text)'}}>Pipeline</div>
          <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>Drag candidates between stages</div>
        </div>
      </div>

      <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
        <div className="search-wrap">
          <Search size={14}/>
          <input className="search-input" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <select className="filter-select" value={filterCompany} onChange={e=>setFilterCompany(e.target.value)}>
          <option value="All">All Companies</option>
          {companies.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="filter-select" value={filterJob} onChange={e=>setFilterJob(e.target.value)}>
          <option value="All">All Jobs</option>
          {jobs.map(j=><option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <select className="filter-select" value={filterPartner} onChange={e=>setFilterPartner(e.target.value)}>
          <option value="All">All Partners</option>
          {recruitmentPartners.map(rp=><option key={rp.id} value={rp.id}>{rp.name}</option>)}
        </select>
      </div>

      <div className="pipeline" style={{flex:1,alignItems:'flex-start'}}>
        {STAGES.map(stage => {
          const stageCandidates = filtered.filter(c=>c.status===stage.key)
          return (
            <div key={stage.key} className="pipeline-col"
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>handleDrop(stage.key)}
              style={{borderTop:`2px solid ${stage.color}`}}>
              <div className="pipeline-col-header">
                <span style={{color:stage.color}}>{stage.label}</span>
                <span style={{background:'var(--surface)',padding:'1px 7px',borderRadius:10,fontSize:11,color:'var(--text3)'}}>{stageCandidates.length}</span>
              </div>
              <div className="pipeline-col-body">
                {stageCandidates.length === 0 && (
                  <div style={{fontSize:12,color:'var(--text3)',textAlign:'center',padding:'16px 8px',border:'1px dashed var(--border)',borderRadius:8}}>
                    Drop here
                  </div>
                )}
                {stageCandidates.map(c => {
                  const job = jobs.find(j=>j.id===c.jobId)
                  const co = companies.find(x=>x.id===c.companyId)
                  const partner = recruitmentPartners.find(rp=>rp.id===c.recruitmentPartnerId)

                  const appliedDateFormatted = formatDate(c.appliedDate)
                  const updatedDateFormatted = formatDate(c.statusUpdatedAt)

                  return (
                    <div key={c.id} className="pipeline-card"
                      draggable
                      onDragStart={()=>setDragging(c)}
                      onDragEnd={()=>setDragging(null)}
                      style={{opacity: dragging?.id===c.id ? 0.5 : 1}}
                      title={partner ? `Partner: ${partner.name}` : ''}>

                      {/* Candidate name + job */}
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                        <Avatar name={c.name} size={26}/>
                        <div style={{minWidth:0}}>
                          <div className="pipeline-card-name" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.name}</div>
                          <div className="pipeline-card-sub">{job?.title||'—'}</div>
                        </div>
                      </div>

                      {/* Company */}
                      {co && (
                        <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text3)'}}>
                          <div style={{width:5,height:5,borderRadius:'50%',background:co.color}}/>
                          {co.name}
                        </div>
                      )}

                      {/* Partner */}
                      {partner && (
                        <div style={{fontSize:11,color:'var(--accent)',marginTop:4}}>
                          📌 {partner.name}
                        </div>
                      )}

                      {/* Experience */}
                      <div style={{fontSize:11,color:'var(--text3)',marginTop:4}}>{c.experience}</div>

                      {/* ✅ Date section — only shows if dates exist (safe for old data) */}
                      {(appliedDateFormatted || updatedDateFormatted) && (
                        <div style={{
                          marginTop:8,
                          paddingTop:8,
                          borderTop:'1px solid var(--border)',
                          display:'flex',
                          flexDirection:'column',
                          gap:3,
                        }}>
                          {appliedDateFormatted && (
                            <div style={{display:'flex',alignItems:'center',gap:4,fontSize:10,color:'var(--text3)'}}>
                              <span>📅</span>
                              <span>Applied:</span>
                              <span style={{color:'var(--text2)',fontWeight:500}}>
                                {appliedDateFormatted}
                              </span>
                            </div>
                          )}
                          {updatedDateFormatted && (
                            <div style={{display:'flex',alignItems:'center',gap:4,fontSize:10,color:'var(--text3)'}}>
                              <span>🔄</span>
                              <span>Updated:</span>
                              <span style={{color:'var(--text2)',fontWeight:500}}>
                                {updatedDateFormatted}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
