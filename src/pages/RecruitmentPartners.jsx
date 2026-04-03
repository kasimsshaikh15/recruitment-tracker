import React, { useState, useMemo } from 'react'
import { Trash2, Edit3, Plus, Search, Mail, Phone, Globe, User, Handshake } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Modal, Confirm, useSortable, usePagination, Pagination } from '../components/Shared'

const EMPTY = {
  name: '', email: '', phone: '', specialization: '',
  companyId: '', website: '', contactPerson: '', notes: '', tenureDays: 60
}

function PartnerForm({ initial = {}, companies = [], onSave, onClose }) {
  const [d, setD] = useState({ ...EMPTY, ...initial })
  const set = k => e => setD(x => ({ ...x, [k]: e.target.value }))
  const canSave = d.name.trim() && d.email.trim() && d.companyId

  const handleSave = () => {
    if (!canSave) return
    onSave({ ...d, tenureDays: Math.min(365, Math.max(1, parseInt(d.tenureDays) || 60)) })
  }

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label>Partner Name *</label>
          <input className="form-control" value={d.name} onChange={set('name')} placeholder="e.g. StarRecruiters" />
        </div>
        <div className="form-group">
          <label>Company *</label>
          <select className="form-control" value={d.companyId} onChange={set('companyId')}>
            <option value="">Select company</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input className="form-control" type="email" value={d.email} onChange={set('email')} placeholder="contact@partner.com" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input className="form-control" value={d.phone} onChange={set('phone')} placeholder="e.g. 9988776655" />
        </div>
        <div className="form-group">
          <label>Contact Person</label>
          <input className="form-control" value={d.contactPerson} onChange={set('contactPerson')} placeholder="e.g. John Smith" />
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input className="form-control" value={d.specialization} onChange={set('specialization')} placeholder="e.g. Tech Staffing" />
        </div>
        <div className="form-group">
          <label>Website</label>
          <input className="form-control" value={d.website} onChange={set('website')} placeholder="e.g. partner.com" />
        </div>
        <div className="form-group">
          <label>Default Tenure Days</label>
          <input
            className="form-control"
            type="number"
            min="1"
            max="365"
            value={d.tenureDays}
            onChange={e => setD(x => ({ ...x, tenureDays: e.target.value }))}
          />
          <span style={{ fontSize: 11, color: 'var(--text3)' }}>
            Auto-applied to candidates via this partner (1–365 days)
          </span>
        </div>
        <div className="form-group span-2">
          <label>Notes</label>
          <textarea
            className="form-control"
            value={d.notes}
            onChange={set('notes')}
            placeholder="e.g. Specializes in backend developers…"
          />
        </div>
      </div>
      <div className="modal-footer" style={{ padding: '16px 0 0' }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button
          className="btn btn-primary"
          disabled={!canSave}
          onClick={handleSave}
        >
          {initial.id ? 'Update Partner' : 'Add Partner'}
        </button>
      </div>
    </>
  )
}

export default function RecruitmentPartners() {
  const {
    visibleRecruitmentPartners: partners = [],
    visibleCandidates: candidates = [],
    companies = [],
    currentUser,
    isSuperAdmin, isCompanyAdmin,
    addRecruitmentPartner, updateRecruitmentPartner, deleteRecruitmentPartner,
  } = useApp()

  const [search,  setSearch]  = useState('')
  const [modal,   setModal]   = useState(null)
  const [confirm, setConfirm] = useState(null)

  const availableCompanies = useMemo(() => {
    if (isSuperAdmin)   return companies
    if (isCompanyAdmin) return companies.filter(c => c.id === currentUser?.companyId)
    return []
  }, [companies, currentUser, isSuperAdmin, isCompanyAdmin])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return partners.filter(p =>
      !q || p.name?.toLowerCase().includes(q) || p.email?.toLowerCase().includes(q) ||
      p.contactPerson?.toLowerCase().includes(q) || p.specialization?.toLowerCase().includes(q)
    )
  }, [partners, search])

  const { sorted, toggle, SortIcon } = useSortable(filtered, 'name')
  const pag = usePagination(sorted, 10)

  const getCompany    = id => companies.find(c => c.id === id)
  const getPlaceCount = id => candidates.filter(c => c.recruitmentPartnerId === id).length

  const handleSave = (data) => {
    if (modal === 'create') {
      addRecruitmentPartner(data)
    } else {
      updateRecruitmentPartner(modal.id, data)
    }
    setModal(null)
  }

  return (
    <div className="content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Handshake size={22} style={{ color: 'var(--accent)' }} /> Recruitment Partners
          </div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 3 }}>
            {partners.length} partners across {new Set(partners.map(p => p.companyId)).size} companies
          </div>
        </div>
        {(isSuperAdmin || isCompanyAdmin) && (
          <button className="btn btn-primary" onClick={() => setModal('create')}>
            <Plus size={14} /> Add Partner
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Partners',    value: partners.length,                                       color: 'var(--accent)' },
          { label: 'Companies Served',  value: new Set(partners.map(p => p.companyId)).size,          color: 'var(--purple)' },
          { label: 'Candidates Placed', value: candidates.filter(c => c.recruitmentPartnerId).length, color: 'var(--green)'  },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color, letterSpacing: '-1px' }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="filter-bar">
          <div className="search-wrap">
            <Search size={14} />
            <input
              className="search-input"
              placeholder="Search by name, email, contact…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span className="table-header-count">{filtered.length} results</span>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th onClick={() => toggle('name')}>Partner Name <SortIcon col="name" /></th>
                <th onClick={() => toggle('contactPerson')}>Contact <SortIcon col="contactPerson" /></th>
                <th onClick={() => toggle('specialization')}>Specialization <SortIcon col="specialization" /></th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Website</th>
                <th style={{ textAlign: 'center' }}>Tenure</th>
                <th style={{ textAlign: 'center' }}>Placed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pag.slice.map(p => {
                const co = getCompany(p.companyId)
                return (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text)' }}>{p.name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <User size={13} style={{ color: 'var(--text3)', flexShrink: 0 }} />
                        {p.contactPerson || '—'}
                      </div>
                    </td>
                    <td>
                      {p.specialization
                        ? <span className="badge badge-shortlisted">{p.specialization}</span>
                        : '—'}
                    </td>
                    <td>
                      {p.email
                        ? <a href={`mailto:${p.email}`} className="email-link"><Mail size={13} /> {p.email}</a>
                        : '—'}
                    </td>
                    <td>
                      {p.phone
                        ? <a href={`tel:${p.phone}`} className="email-link" style={{ color: 'var(--text2)' }}><Phone size={13} /> {p.phone}</a>
                        : '—'}
                    </td>
                    <td>
                      {co
                        ? <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: co.color }} />
                            {co.name}
                          </div>
                        : '—'}
                    </td>
                    <td>
                      {p.website
                        ? <a href={`https://${p.website}`} target="_blank" rel="noopener noreferrer" className="email-link">
                            <Globe size={13} /> {p.website}
                          </a>
                        : '—'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        background: 'var(--accent-glow)', color: 'var(--accent2)',
                        border: '1px solid rgba(79,124,255,0.2)',
                        padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>
                        {p.tenureDays || 60}d
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        background: 'var(--green-bg)', color: 'var(--green)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600
                      }}>
                        {getPlaceCount(p.id)}
                      </span>
                    </td>
                    <td>
                      {(isSuperAdmin || isCompanyAdmin) && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn-icon" onClick={() => setModal(p)}>
                            <Edit3 size={13} />
                          </button>
                          <button
                            className="btn-icon"
                            onClick={() => setConfirm(p.id)}
                            style={{ color: 'var(--red)', borderColor: 'rgba(239,68,68,0.2)' }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {pag.slice.length === 0 && (
          <div className="empty-state">
            <Handshake />
            <h3>No recruitment partners found</h3>
            <p>{search ? 'Try adjusting your search' : 'Add your first recruitment partner to get started'}</p>
          </div>
        )}

        <Pagination pagination={pag} />
      </div>

      {/* Add / Edit Modal */}
      {(modal === 'create' || (modal && modal.id)) && (
        <Modal
          title={modal === 'create' ? 'Add Recruitment Partner' : 'Edit Partner'}
          onClose={() => setModal(null)}
          size="modal-lg"
        >
          <PartnerForm
            initial={modal === 'create' ? {} : modal}
            companies={availableCompanies}
            onSave={handleSave}
            onClose={() => setModal(null)}
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      {confirm && (
        <Confirm
          message="Delete this recruitment partner? Candidates linked to them will lose the association."
          onConfirm={() => { deleteRecruitmentPartner(confirm); setConfirm(null) }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
}