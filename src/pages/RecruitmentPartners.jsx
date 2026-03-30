import React, { useState, useMemo } from 'react'
import { Trash2, Edit, Plus, Search, Mail, Phone, Globe, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function RecruitmentPartners() {
  const {
    visibleRecruitmentPartners: partners,
    companies,
    currentUser,
    isSuperAdmin, isCompanyAdmin,
    addRecruitmentPartner, updateRecruitmentPartner, deleteRecruitmentPartner,
    toast,
  } = useApp()

  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', specialization: '',
    companyId: '', website: '', contactPerson: '', notes: '', tenureDays: 60
  })

  // Get available companies based on user role
  const availableCompanies = useMemo(() => {
    if (isSuperAdmin) return companies
    if (isCompanyAdmin) return companies.filter(c => c.id === currentUser?.companyId)
    return []
  }, [companies, currentUser, isSuperAdmin, isCompanyAdmin])

  // Filtered list
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return partners.filter(p =>
      !q || p.name.toLowerCase().includes(q) || 
      p.email?.toLowerCase().includes(q) ||
      p.contactPerson?.toLowerCase().includes(q)
    )
  }, [partners, search])

  // Get company name
  const getCompanyName = (companyId) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown'
  }

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', specialization: '', companyId: '', website: '', contactPerson: '', notes: '' })
    setEditingId(null)
    setIsAdding(false)
  }

  // Handle add/edit
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.companyId) {
      toast('Please fill in required fields: Name, Email, and Company', 'error')
      return
    }
    if (formData.tenureDays < 1 || formData.tenureDays > 365) {
      toast('Tenure Days must be between 1 and 365', 'error')
      return
    }

    try {
      if (editingId) {
        await updateRecruitmentPartner(editingId, formData)
      } else {
        await addRecruitmentPartner(formData)
      }
      resetForm()
    } catch (err) {
      toast('Error saving recruitment partner', 'error')
    }
  }

  // Start editing
  const handleEdit = (partner) => {
    setFormData(partner)
    setEditingId(partner.id)
    setIsAdding(true)
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recruitment partner?')) {
      try {
        await deleteRecruitmentPartner(id)
      } catch (err) {
        toast('Error deleting recruitment partner', 'error')
      }
    }
  }

  return (
    <div className="content">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: 0 }}>
            🤝 Recruitment Partners
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4, margin: 0 }}>
            Manage external recruitment agencies and staffing partners
          </p>
        </div>
        {(isSuperAdmin || isCompanyAdmin) && (
          <button
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: '', email: '', phone: '', specialization: '', companyId: currentUser?.companyId || '', website: '', contactPerson: '', notes: '', tenureDays: 60 }); }}
            style={{
              background: 'var(--accent)', color: 'white',
              border: 'none', borderRadius: 8, padding: '10px 16px',
              cursor: 'pointer', fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            <Plus size={16} /> Add Partner
          </button>
        )}
      </div>

      {/* Info banner */}
      <div style={{
        background: '#f0fdf4', border: '1px solid #22c55e', borderRadius: 10,
        padding: '12px 16px', marginBottom: 20, fontSize: 12, color: '#15803d'
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>✓ Company Isolation</div>
        <div>Each company can only see and manage their own recruitment partners. Changes made by company admins are isolated to their company.</div>
      </div>

      {/* Form Modal */}
      {isAdding && (
        <div style={{
          background: 'white', border: '1px solid var(--border)', borderRadius: 12,
          padding: '20px', marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--text)' }}>
            {editingId ? 'Edit Recruitment Partner' : 'Add New Recruitment Partner'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Partner Name *
              </label>
              <input
                type="text" placeholder="e.g., StarRecruiters"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Email *
              </label>
              <input
                type="email" placeholder="contact@partner.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Phone
              </label>
              <input
                type="tel" placeholder="e.g., 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Specialization */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Specialization
              </label>
              <input
                type="text" placeholder="e.g., Tech Staffing"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Website */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Website
              </label>
              <input
                type="url" placeholder="e.g., partner.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Contact Person */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Contact Person
              </label>
              <input
                type="text" placeholder="e.g., John Smith"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Company */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Company *
              </label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              >
                <option value="">Select Company</option>
                {availableCompanies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Tenure Days */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Default Tenure Days ⏳
              </label>
              <input
                type="number" min="1" max="365" placeholder="e.g., 60"
                value={formData.tenureDays}
                onChange={(e) => setFormData({ ...formData, tenureDays: parseInt(e.target.value) || 60 })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box'
                }}
              />
              <div style={{ fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>
                Automatically applied to candidates placed through this partner
              </div>
            </div>

            {/* Notes */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 6 }}>
                Notes
              </label>
              <textarea
                placeholder="e.g., Specializes in backend developers, great for senior roles"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: 6,
                  border: '1px solid var(--border)', background: 'var(--bg2)',
                  color: 'var(--text)', fontSize: 12, boxSizing: 'border-box',
                  minHeight: 80, fontFamily: 'inherit', resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={resetForm}
              style={{
                background: 'var(--bg2)', color: 'var(--text)',
                border: '1px solid var(--border)', borderRadius: 6,
                padding: '8px 16px', cursor: 'pointer', fontSize: 12, fontWeight: 600
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                background: 'var(--accent)', color: 'white',
                border: 'none', borderRadius: 6, padding: '8px 16px',
                cursor: 'pointer', fontSize: 12, fontWeight: 600
              }}
            >
              {editingId ? 'Update' : 'Add'} Partner
            </button>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Partners', count: filtered.length, icon: '🤝', color: '#4f7cff' },
          { label: 'Companies', count: new Set(filtered.map(p => p.companyId)).size, icon: '🏢', color: '#a855f7' },
          { label: 'Specializations', count: new Set(filtered.map(p => p.specialization)).size, icon: '⭐', color: '#22c55e' },
        ].map(({ label, count, icon, color }) => (
          <div key={label} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '16px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color }}>{count}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 16, padding: '8px 12px', background: 'var(--bg2)',
        borderRadius: 8, border: '1px solid var(--border)'
      }}>
        <Search size={16} style={{ color: 'var(--text3)' }} />
        <input
          type="text" placeholder="Search by name, email, or contact person..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, background: 'transparent', border: 'none',
            color: 'var(--text)', fontSize: 13, outline: 'none'
          }}
        />
        <span style={{ fontSize: 12, color: 'var(--text3)' }}>{filtered.length} partners</span>
      </div>

      {/* Table */}
      {filtered.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Partner Name</th>
                <th>Contact Person</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Website</th>
                <th>Notes</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(partner => (
                <tr key={partner.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>
                      {partner.name}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                      <User size={14} style={{ color: 'var(--text3)' }} />
                      {partner.contactPerson || '—'}
                    </div>
                  </td>
                  <td>
                    <span style={{
                      background: 'var(--bg2)', padding: '3px 8px',
                      borderRadius: 4, fontSize: 11, fontWeight: 500, color: 'var(--text2)'
                    }}>
                      {partner.specialization || '—'}
                    </span>
                  </td>
                  <td>
                    <a href={`mailto:${partner.email}`} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      color: 'var(--accent)', textDecoration: 'none', fontSize: 12
                    }}>
                      <Mail size={14} /> {partner.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${partner.phone}`} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      color: 'var(--text2)', textDecoration: 'none', fontSize: 12
                    }}>
                      <Phone size={14} /> {partner.phone || '—'}
                    </a>
                  </td>
                  <td style={{ fontSize: 12, fontWeight: 500 }}>
                    {getCompanyName(partner.companyId)}
                  </td>
                  <td>
                    {partner.website ? (
                      <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        color: 'var(--accent)', textDecoration: 'none', fontSize: 12
                      }}>
                        <Globe size={14} /> {partner.website}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--text3)', maxWidth: 200 }}>
                    {partner.notes ? (
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', title: partner.notes }}>
                        {partner.notes}
                      </div>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                      {(isSuperAdmin || isCompanyAdmin) && (
                        <>
                          <button
                            onClick={() => handleEdit(partner)}
                            style={{
                              background: '#f0f4ff', border: '1px solid #a8c5ff',
                              borderRadius: 6, padding: '4px 8px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#4f7cff'
                            }}
                          >
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(partner.id)}
                            style={{
                              background: '#fef2f2', border: '1px solid #fca5a5',
                              borderRadius: 6, padding: '4px 8px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#ef4444'
                            }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          color: 'var(--text3)', background: 'var(--bg2)',
          borderRadius: 10, border: '1px dashed var(--border)'
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🤝</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>No Recruitment Partners Yet</div>
          <div style={{ fontSize: 12 }}>
            {isAdding ? 'Add your first recruitment partner using the form above' : 'Get started by adding your first recruitment partner'}
          </div>
        </div>
      )}
    </div>
  )
}
