// src/utils/useDownloadCandidates.js
// Run: npm install xlsx

import { useState, useCallback } from 'react'
import * as XLSX from 'xlsx'
import { useApp } from '../context/AppContext'

export function useDownloadCandidates() {
  const {
    currentUser,
    isSuperAdmin,
    isCompanyAdmin,
    isTeamLead,
    isRecruiter,
    visibleCandidates,
    companies,
    teams,
    recruiters,
    jobs,
  } = useApp()

  const [downloading, setDownloading] = useState(false)

  const getLabel = useCallback(() => {
    if (isSuperAdmin) return 'All_Companies'
    if (isCompanyAdmin) {
      const co = companies.find(c => c.id === currentUser?.companyId)
      return co?.name?.replace(/\s+/g, '_') || 'Company'
    }
    if (isTeamLead) {
      const tm = teams.find(t => t.id === currentUser?.teamId)
      return tm?.name?.replace(/\s+/g, '_') || 'Team'
    }
    const rec = recruiters.find(r => r.id === currentUser?.recruiterId)
    return rec?.name?.replace(/\s+/g, '_') || 'My_Candidates'
  }, [isSuperAdmin, isCompanyAdmin, isTeamLead, currentUser, companies, teams, recruiters])

  const buildRows = useCallback((candidates) => {
    return candidates.map(c => {
      const company   = companies.find(x => x.id === c.companyId)
      const team      = teams.find(x => x.id === c.teamId)
      const recruiter = recruiters.find(x => x.id === c.recruiterId)
      const job       = jobs.find(x => x.id === c.jobId)

      const fmt = (dateStr) => {
        if (!dateStr) return '-'
        try { return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }
        catch { return '-' }
      }

      return {
        'Candidate Name':   c.name              || '-',
        'Email':            c.email             || '-',
        'Phone':            c.phone             || '-',
        'Gender':           c.gender            || '-',
        'Job Position':     job?.title          || '-',
        'Company':          company?.name       || '-',
        'Team':             team?.name          || '-',
        'Recruiter':        recruiter?.name     || '-',
        'Experience':       c.experience        || '-',
        'Location':         c.location          || '-',
        'Qualification':    c.qualification     || '-',
        'Skills':           Array.isArray(c.skills) ? c.skills.join(', ') : (c.skills || '-'),
        'Status':           c.status            || '-',
        'Applied Date':     fmt(c.appliedDate),
        'Date of Joining':  fmt(c.doj),
        'Notes':            c.notes             || '',
      }
    })
  }, [companies, teams, recruiters, jobs])

  const styleSheet = (ws, rowCount) => {
    const headerStyle = {
      font:      { bold: true, color: { rgb: 'FFFFFF' }, sz: 11 },
      fill:      { fgColor: { rgb: '1a1f2e' } },
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      border: {
        top:    { style: 'thin', color: { rgb: '4f7cff' } },
        bottom: { style: 'thin', color: { rgb: '4f7cff' } },
        left:   { style: 'thin', color: { rgb: '4f7cff' } },
        right:  { style: 'thin', color: { rgb: '4f7cff' } },
      },
    }
    const evenRowStyle = {
      fill:      { fgColor: { rgb: 'F0F4FF' } },
      font:      { sz: 10 },
      alignment: { vertical: 'center', wrapText: true },
    }

    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell = XLSX.utils.encode_cell({ r: 0, c: C })
      if (ws[cell]) ws[cell].s = headerStyle
    }
    for (let R = 1; R <= rowCount; R++) {
      for (let C = range.s.c; C <= range.e.c; C++) {
        const cell = XLSX.utils.encode_cell({ r: R, c: C })
        if (ws[cell] && R % 2 === 0) ws[cell].s = evenRowStyle
      }
    }

    ws['!cols'] = [
      { wch: 22 }, { wch: 28 }, { wch: 14 }, { wch: 8  },
      { wch: 22 }, { wch: 18 }, { wch: 16 }, { wch: 20 },
      { wch: 12 }, { wch: 16 }, { wch: 16 }, { wch: 30 },
      { wch: 24 }, { wch: 14 }, { wch: 14 }, { wch: 30 },
    ]
    ws['!freeze'] = { xSplit: 0, ySplit: 1, topLeftCell: 'A2', activePane: 'bottomLeft' }
  }

  const downloadCandidates = useCallback(async (overrideCandidates = null) => {
    setDownloading(true)
    try {
      const source = overrideCandidates ?? visibleCandidates
      if (!source || source.length === 0) {
        alert('No candidates to export.')
        return
      }

      const rows  = buildRows(source)
      const label = getLabel()
      const date  = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')

      let sheetName = 'Candidates'
      if (isSuperAdmin)   sheetName = 'All Candidates'
      if (isCompanyAdmin) sheetName = 'Company Candidates'
      if (isTeamLead)     sheetName = 'Team Candidates'
      if (isRecruiter)    sheetName = 'My Candidates'

      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(rows)
      styleSheet(ws, rows.length)
      XLSX.utils.book_append_sheet(wb, ws, sheetName.slice(0, 31))

      // Summary sheet
      const statusCounts = {}
      source.forEach(c => { statusCounts[c.status] = (statusCounts[c.status] || 0) + 1 })

      const summaryRows = [
        { 'Summary': 'Export Info',       'Value': '' },
        { 'Summary': 'Exported By',       'Value': currentUser?.name || currentUser?.username || '-' },
        { 'Summary': 'Role',              'Value': currentUser?.role || '-' },
        { 'Summary': 'Export Date',       'Value': date },
        { 'Summary': 'Total Candidates',  'Value': source.length },
        { 'Summary': '',                  'Value': '' },
        { 'Summary': 'Status Breakdown',  'Value': 'Count' },
        ...Object.entries(statusCounts).map(([status, count]) => ({ 'Summary': status, 'Value': count })),
      ]
      const wsSummary = XLSX.utils.json_to_sheet(summaryRows)
      wsSummary['!cols'] = [{ wch: 28 }, { wch: 20 }]
      XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

      XLSX.writeFile(wb, `HireTrakkr_${label}_${date}.xlsx`)
    } finally {
      setDownloading(false)
    }
  }, [visibleCandidates, buildRows, getLabel, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter, currentUser])

  return { downloadCandidates, downloading }
}
