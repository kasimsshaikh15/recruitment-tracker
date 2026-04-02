// ─── HireTrakkr Backup / Restore Utilities ───────────────────────────────────

const BACKUP_VERSION = '3.0'

/**
 * Export all data as a downloadable JSON file.
 * Passwords are already hashed so safe to export.
 * FIX: recruitmentPartners was missing from previous exports — now included.
 */
export function exportBackup({ companies, teams, users, recruiters, recruitmentPartners, jobs, candidates, attendance }) {
  const backup = {
    app: 'HireTrakkr',
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    exportedDate: new Date().toLocaleDateString('en-IN'),
    data: {
      companies:            companies            || [],
      teams:                teams                || [],
      users:                users                || [],
      recruiters:           recruiters           || [],
      recruitmentPartners:  recruitmentPartners  || [],  // ← was missing before
      jobs:                 jobs                 || [],
      candidates:           candidates           || [],
      attendance:           attendance           || [],
    },
  }

  const json = JSON.stringify(backup, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `HireTrakkr_Backup_${new Date().toISOString().slice(0, 10)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  return true
}

/**
 * Read and validate an uploaded backup JSON file.
 * Returns parsed data or throws an error.
 * Supports both v2.0 (without recruitmentPartners) and v3.0 backups.
 */
export function readBackupFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.name.endsWith('.json')) {
      reject(new Error('Please upload a valid .json backup file'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result)

        if (parsed.app !== 'HireTrakkr') {
          reject(new Error('This file is not a HireTrakkr backup'))
          return
        }
        if (!parsed.data) {
          reject(new Error('Backup file is corrupted or invalid'))
          return
        }

        // Ensure all stores exist (backward compat with v2.0 backups)
        parsed.data.recruitmentPartners = parsed.data.recruitmentPartners || []
        parsed.data.companies           = parsed.data.companies           || []
        parsed.data.teams               = parsed.data.teams               || []
        parsed.data.users               = parsed.data.users               || []
        parsed.data.recruiters          = parsed.data.recruiters          || []
        parsed.data.jobs                = parsed.data.jobs                || []
        parsed.data.candidates          = parsed.data.candidates          || []
        parsed.data.attendance          = parsed.data.attendance          || []

        resolve(parsed)
      } catch {
        reject(new Error('Could not read file — it may be corrupted'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

/**
 * Get backup file size in human-readable format
 */
export function getBackupSize(data) {
  const json = JSON.stringify(data)
  const bytes = new Blob([json]).size
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}
