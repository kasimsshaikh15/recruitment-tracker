import React, { useState } from 'react'
import { X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── Avatar ──────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  ['#1e3a5f','#4f7cff'],['#2d1b4e','#a855f7'],['#0d3320','#22c55e'],
  ['#3d2a00','#f59e0b'],['#0a2d35','#06b6d4'],['#3d1e0a','#f97316'],
]
export function Avatar({ name='?', size=32 }) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length
  const [bg, fg] = AVATAR_COLORS[idx]
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="avatar" style={{ width:size, height:size, background:bg, color:fg, fontSize: size*0.38 }}>
      {initials}
    </div>
  )
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
const STATUS_MAP = {
  'Open':'badge-open','Closed':'badge-closed',
  '📅 Interview Scheduled':'badge-interview',
  '➡️ Next Level':'badge-nextlevel',
  '✅ Selected':'badge-selected',
  '🎉 Joined':'badge-joined',
  '❌ Rejected':'badge-rejected',
  '🚫 Exit':'badge-exit',
  '⏸️ On Hold':'badge-onhold',
  'Screening':'badge-screening',
  'Shortlisted':'badge-shortlisted',
}
export function StatusBadge({ status }) {
  const cls = STATUS_MAP[status] || 'badge-closed'
  return <span className={`badge ${cls}`}>{status}</span>
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export function SkillTags({ skills=[] }) {
  return (
    <div className="skills-wrap">
      {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children, footer, size='' }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className={`modal ${size}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn-icon" onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

// ─── Confirm Dialog ──────────────────────────────────────────────────────────
export function Confirm({ message, onConfirm, onCancel }) {
  return (
    <Modal title="Confirm Action" onClose={onCancel} footer={
      <>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
      </>
    }>
      <p style={{color:'var(--text2)'}}>{message}</p>
    </Modal>
  )
}

// ─── Sortable Table ───────────────────────────────────────────────────────────
export function useSortable(data, defaultKey='') {
  const [sort, setSort] = useState({ key: defaultKey, dir: 'asc' })
  const toggle = (key) => setSort(s => ({ key, dir: s.key===key && s.dir==='asc' ? 'desc' : 'asc' }))
  const sorted = [...data].sort((a,b) => {
    const av = a[sort.key] ?? '', bv = b[sort.key] ?? ''
    const r = String(av).localeCompare(String(bv), undefined, { numeric:true })
    return sort.dir==='asc' ? r : -r
  })
  const SortIcon = ({ col }) => sort.key===col
    ? (sort.dir==='asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)
    : <span style={{opacity:0.3}}><ChevronUp size={12}/></span>
  return { sorted, sort, toggle, SortIcon }
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function usePagination(data, pageSize=20) {
  const [page, setPage] = useState(1)
  const total = data.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, pages)
  const slice = data.slice((safePage-1)*pageSize, safePage*pageSize)
  const start = total === 0 ? 0 : (safePage-1)*pageSize+1
  const end = Math.min(safePage*pageSize, total)
  return { page: safePage, setPage, pages, slice, total, start, end }
}

export function Pagination({ pagination }) {
  const { page, setPage, pages, total, start, end } = pagination
  if (total === 0) return null
  const nums = Array.from({length:Math.min(pages,7)}, (_,i) => {
    if (pages <= 7) return i+1
    if (page <= 4) return i < 5 ? i+1 : i===5 ? '...' : pages
    if (page >= pages-3) return i===0 ? 1 : i===1 ? '...' : pages-4+i
    return i===0 ? 1 : i===1 ? '...' : i===5 ? '...' : i===6 ? pages : page-2+i
  })
  return (
    <div className="pagination">
      <span className="pagination-info">Showing {start}–{end} of {total}</span>
      <div className="pagination-btns">
        <button className="page-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}><ChevronLeft size={13}/></button>
        {nums.map((n,i) => n==='...'
          ? <span key={`e${i}`} style={{padding:'0 4px',color:'var(--text3)',fontSize:12}}>…</span>
          : <button key={n} className={`page-btn${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
        )}
        <button className="page-btn" onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}><ChevronRight size={13}/></button>
      </div>
    </div>
  )
}

// ─── Skills input ─────────────────────────────────────────────────────────────
export function SkillsInput({ value=[], onChange }) {
  const [input, setInput] = useState('')
  const add = () => { const t = input.trim(); if(t && !value.includes(t)) { onChange([...value,t]); setInput('') } }
  const remove = (s) => onChange(value.filter(x=>x!==s))
  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input className="form-control" value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();add()}}}
          placeholder="Type skill and press Enter" />
        <button type="button" className="btn btn-ghost btn-sm" onClick={add}>Add</button>
      </div>
      <div className="skills-wrap">
        {value.map(s=>(
          <span key={s} className="skill-tag">
            {s}
            <button onClick={()=>remove(s)}><X size={10}/></button>
          </span>
        ))}
      </div>
    </div>
  )
}
