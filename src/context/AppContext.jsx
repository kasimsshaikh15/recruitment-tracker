import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo
} from 'react'

import { hashPassword, verifyPassword } from '../utils/security'
import { exportBackup as doExportBackup, readBackupFile } from '../utils/backup'
import { db, collection, doc, getDocs, setDoc, deleteDoc } from '../utils/firebase'

// ─── Firebase Helpers ─────────────────────────────────────────────
async function fsGetAll(store) {
  const snap = await getDocs(collection(db, store))
  return snap.docs.map(d => ({ ...d.data(), id: d.id }))
}

async function fsPut(store, record) {
  await setDoc(doc(db, store, record.id), record)
}

async function fsDelete(store, id) {
  await deleteDoc(doc(db, store, id))
}

async function fsPutMany(store, records) {
  for (const r of records) {
    await fsPut(store, r)
  }
}

// ─── Constants ────────────────────────────────────────────────────
const AUTH_LOGGED_KEY = 'hiretrakkr_loggedIn'
const AUTH_CURRENT_KEY = 'hiretrakkr_currentUser'

const uid = () => crypto.randomUUID()

const SUPER_ADMIN = {
  username: 'admin_hiretrakkr_system',
  password: 'HireTrakkr@Admin#2026Secure',
  role: 'superAdmin',
  name: 'Super Admin'
}

const STATUSES = [
  '📋 Applied',
  '📞 Screening',
  '🔍 Interview',
  '✅ Selected',
  '❌ Rejected',
  '🎉 Joined',
  '🔄 On Hold',
]

// ─── Context ──────────────────────────────────────────────────────
const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

// ─── Provider ─────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [companies,            setCompanies]            = useState([])
  const [teams,                setTeams]                = useState([])
  const [users,                setUsers]                = useState([])
  const [jobs,                 setJobs]                 = useState([])
  const [candidates,           setCandidates]           = useState([])
  const [recruiters,           setRecruiters]           = useState([])
  const [attendance,           setAttendance]           = useState([])
  const [recruitmentPartners,  setRecruitmentPartners]  = useState([])  // ✅ NEW
  const [loading,              setLoading]              = useState(true)
  const [currentUser,          setCurrentUser]          = useState(null)
  const [isLoggedIn,           setIsLoggedIn]           = useState(false)

  // ─── Load Data ────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const [cos, tms, usrs, jbs, cands, recs, atts, partners] = await Promise.all([
          fsGetAll('companies'),
          fsGetAll('teams'),
          fsGetAll('users'),
          fsGetAll('jobs'),
          fsGetAll('candidates'),
          fsGetAll('recruiters'),
          fsGetAll('attendance'),
          fsGetAll('recruitmentPartners'),   // ✅ NEW
        ])

        setCompanies(cos)
        setTeams(tms)
        setUsers(usrs)
        setJobs(jbs)
        setCandidates(cands)
        setRecruiters(recs)
        setAttendance(atts)
        setRecruitmentPartners(partners)    // ✅ NEW

        if (localStorage.getItem(AUTH_LOGGED_KEY)) {
          const u = JSON.parse(localStorage.getItem(AUTH_CURRENT_KEY))
          if (u) {
            setCurrentUser(u)
            setIsLoggedIn(true)
          }
        }

      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ─── Role Helpers ─────────────────────────────────────────────
  const isSuperAdmin   = currentUser?.role === 'superAdmin'
  const isCompanyAdmin = currentUser?.role === 'companyAdmin'
  const isTeamLead     = currentUser?.role === 'teamLead'
  const isRecruiter    = currentUser?.role === 'recruiter'

  // ─── Visible Data (filtered by role) ─────────────────────────
  const visibleCompanies = useMemo(() => {
    if (isSuperAdmin) return companies
    return companies.filter(c => c.id === currentUser?.companyId)
  }, [companies, currentUser, isSuperAdmin])

  const visibleTeams = useMemo(() => {
    if (isSuperAdmin) return teams
    if (isCompanyAdmin) return teams.filter(t => t.companyId === currentUser?.companyId)
    if (isTeamLead) return teams.filter(t => t.id === currentUser?.teamId)
    return teams.filter(t => t.id === currentUser?.teamId)
  }, [teams, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  const visibleUsers = useMemo(() => {
    if (isSuperAdmin) return users
    if (isCompanyAdmin) return users.filter(u => u.companyId === currentUser?.companyId)
    if (isTeamLead) return users.filter(u => u.teamId === currentUser?.teamId)
    return users.filter(u => u.id === currentUser?.id)
  }, [users, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  const visibleRecruiters = useMemo(() => {
    if (isSuperAdmin) return recruiters
    if (isCompanyAdmin) return recruiters.filter(r => r.companyId === currentUser?.companyId)
    if (isTeamLead) return recruiters.filter(r => r.teamId === currentUser?.teamId)
    return recruiters.filter(r => r.id === currentUser?.recruiterId)
  }, [recruiters, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  const visibleJobs = useMemo(() => {
    if (isSuperAdmin) return jobs
    if (isCompanyAdmin) return jobs.filter(j => j.companyId === currentUser?.companyId)
    return jobs.filter(j => j.companyId === currentUser?.companyId)
  }, [jobs, currentUser, isSuperAdmin, isCompanyAdmin])

  const visibleCandidates = useMemo(() => {
    if (isSuperAdmin) return candidates
    if (isCompanyAdmin) return candidates.filter(c => c.companyId === currentUser?.companyId)
    if (isTeamLead) return candidates.filter(c => c.teamId === currentUser?.teamId)
    return candidates.filter(c => c.recruiterId === currentUser?.recruiterId)
  }, [candidates, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  // ✅ NEW — Recruitment Partners visible by role
  const visibleRecruitmentPartners = useMemo(() => {
    if (isSuperAdmin) return recruitmentPartners
    if (isCompanyAdmin) return recruitmentPartners.filter(p => p.companyId === currentUser?.companyId)
    return recruitmentPartners.filter(p => p.companyId === currentUser?.companyId)
  }, [recruitmentPartners, currentUser, isSuperAdmin, isCompanyAdmin])

  // ─── Login ────────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    if (
      username === SUPER_ADMIN.username &&
      password === SUPER_ADMIN.password
    ) {
      setCurrentUser(SUPER_ADMIN)
      setIsLoggedIn(true)
      localStorage.setItem(AUTH_LOGGED_KEY, 'true')
      localStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify(SUPER_ADMIN))
      return true
    }

    const found = users.find(u => u.username === username)
    if (!found) return false

    const match = await verifyPassword(password, found.password)
    if (!match) return false

    const { password: _pw, ...user } = found
    setCurrentUser(user)
    setIsLoggedIn(true)
    localStorage.setItem(AUTH_LOGGED_KEY, 'true')
    localStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify(user))
    return true
  }, [users])

  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.clear()
  }

  // ─── Companies CRUD ───────────────────────────────────────────
  const addCompany = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('companies', record)
    setCompanies(c => [...c, record])
  }

  const updateCompany = async (id, data) => {
    const record = { ...data, id }
    await fsPut('companies', record)
    setCompanies(c => c.map(x => x.id === id ? record : x))
  }

  const deleteCompany = async (id) => {
    await fsDelete('companies', id)
    setCompanies(c => c.filter(x => x.id !== id))
  }

  // ─── Teams CRUD ───────────────────────────────────────────────
  const addTeam = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('teams', record)
    setTeams(t => [...t, record])
  }

  const updateTeam = async (id, data) => {
    const record = { ...data, id }
    await fsPut('teams', record)
    setTeams(t => t.map(x => x.id === id ? record : x))
  }

  const deleteTeam = async (id) => {
    await fsDelete('teams', id)
    setTeams(t => t.filter(x => x.id !== id))
  }

  // ─── Users CRUD ───────────────────────────────────────────────
  const addUser = async (data) => {
    const hashed = await hashPassword(data.password)
    const record = { ...data, password: hashed, id: uid() }
    await fsPut('users', record)
    setUsers(u => [...u, record])
  }

  const updateUser = async (id, data) => {
    const existing = users.find(u => u.id === id)
    let record = { ...existing, ...data, id }
    if (data.password && data.password !== existing?.password) {
      record.password = await hashPassword(data.password)
    }
    await fsPut('users', record)
    setUsers(u => u.map(x => x.id === id ? record : x))
  }

  const deleteUser = async (id) => {
    await fsDelete('users', id)
    setUsers(u => u.filter(x => x.id !== id))
  }

  // ─── Recruiters CRUD ──────────────────────────────────────────
  const addRecruiter = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('recruiters', record)
    setRecruiters(r => [...r, record])
    return record
  }

  const updateRecruiter = async (id, data) => {
    const record = { ...data, id }
    await fsPut('recruiters', record)
    setRecruiters(r => r.map(x => x.id === id ? record : x))
  }

  const deleteRecruiter = async (id) => {
    await fsDelete('recruiters', id)
    setRecruiters(r => r.filter(x => x.id !== id))
  }

  // ─── Jobs CRUD ────────────────────────────────────────────────
  const addJob = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('jobs', record)
    setJobs(j => [...j, record])
  }

  const updateJob = async (id, data) => {
    const record = { ...data, id }
    await fsPut('jobs', record)
    setJobs(j => j.map(x => x.id === id ? record : x))
  }

  const deleteJob = async (id) => {
    await fsDelete('jobs', id)
    setJobs(j => j.filter(x => x.id !== id))
  }

  // ─── Candidates CRUD ──────────────────────────────────────────
  const addCandidate = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('candidates', record)
    setCandidates(c => [...c, record])
  }

  const updateCandidate = async (id, data) => {
    const record = { ...data, id }
    await fsPut('candidates', record)
    setCandidates(c => c.map(x => x.id === id ? record : x))
  }

  const deleteCandidate = async (id) => {
    await fsDelete('candidates', id)
    setCandidates(c => c.filter(x => x.id !== id))
  }

  // ─── Recruitment Partners CRUD ────────────────────────────────  ✅ NEW
  const addRecruitmentPartner = async (data) => {
    const record = { ...data, id: uid() }
    await fsPut('recruitmentPartners', record)
    setRecruitmentPartners(p => [...p, record])
    return record
  }

  const updateRecruitmentPartner = async (id, data) => {
    const record = { ...data, id }
    await fsPut('recruitmentPartners', record)
    setRecruitmentPartners(p => p.map(x => x.id === id ? record : x))
  }

  const deleteRecruitmentPartner = async (id) => {
    await fsDelete('recruitmentPartners', id)
    setRecruitmentPartners(p => p.filter(x => x.id !== id))
  }

  // ─── Attendance ───────────────────────────────────────────────
  const markAttendance = async (recruiterId, status) => {
    const today = new Date().toISOString().split('T')[0]
    const id = `${recruiterId}_${today}`
    const record = { id, recruiterId, date: today, status }
    await fsPut('attendance', record)
    setAttendance(a => {
      const filtered = a.filter(x => x.id !== id)
      return [...filtered, record]
    })
  }

  const getTodayAttendance = (recruiterId) => {
    const today = new Date().toISOString().split('T')[0]
    return attendance.find(a => a.recruiterId === recruiterId && a.date === today)
  }

  // ─── Backup ───────────────────────────────────────────────────
  const exportAllData = () => {
    doExportBackup({ companies, teams, users, jobs, candidates, recruiters, attendance, recruitmentPartners })
  }

  const importBackup = async (file) => {
    const parsed = await readBackupFile(file)
    const d = parsed.data

    await fsPutMany('companies',           d.companies           || [])
    await fsPutMany('teams',               d.teams               || [])
    await fsPutMany('users',               d.users               || [])
    await fsPutMany('jobs',                d.jobs                || [])
    await fsPutMany('candidates',          d.candidates          || [])
    await fsPutMany('recruiters',          d.recruiters          || [])
    await fsPutMany('attendance',          d.attendance          || [])
    await fsPutMany('recruitmentPartners', d.recruitmentPartners || [])  // ✅ NEW

    setCompanies(d.companies             || [])
    setTeams(d.teams                     || [])
    setUsers(d.users                     || [])
    setJobs(d.jobs                       || [])
    setCandidates(d.candidates           || [])
    setRecruiters(d.recruiters           || [])
    setAttendance(d.attendance           || [])
    setRecruitmentPartners(d.recruitmentPartners || [])  // ✅ NEW

    return true
  }

  // ─── Loading UI ───────────────────────────────────────────────
  if (loading) return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', flexDirection: 'column', gap: 16,
      background: 'var(--bg, #0f1117)', color: 'var(--text, #fff)'
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '3px solid #4f7cff', borderTopColor: 'transparent',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ fontSize: 14, opacity: 0.6 }}>Loading HireTrakkr...</div>
    </div>
  )

  return (
    <AppCtx.Provider value={{
      // auth
      currentUser,
      isLoggedIn,
      login,
      logout,

      // role helpers
      isSuperAdmin,
      isCompanyAdmin,
      isTeamLead,
      isRecruiter,

      // raw data
      companies,
      teams,
      users,
      jobs,
      candidates,
      recruiters,
      attendance,
      recruitmentPartners,           // ✅ NEW

      // visible (role-filtered) data
      visibleCompanies,
      visibleTeams,
      visibleUsers,
      visibleRecruiters,
      visibleJobs,
      visibleCandidates,
      visibleRecruitmentPartners,    // ✅ NEW

      // constants
      STATUSES,

      // companies
      addCompany,
      updateCompany,
      deleteCompany,

      // teams
      addTeam,
      updateTeam,
      deleteTeam,

      // users
      addUser,
      updateUser,
      deleteUser,

      // recruiters
      addRecruiter,
      updateRecruiter,
      deleteRecruiter,

      // jobs
      addJob,
      updateJob,
      deleteJob,

      // candidates
      addCandidate,
      updateCandidate,
      deleteCandidate,

      // recruitment partners         ✅ NEW
      addRecruitmentPartner,
      updateRecruitmentPartner,
      deleteRecruitmentPartner,

      // attendance
      markAttendance,
      getTodayAttendance,

      // backup
      exportAllData,
      importBackup,
    }}>
      {children}
    </AppCtx.Provider>
  )
}