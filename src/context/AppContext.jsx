import React, { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { hashPassword, verifyPassword, hashSeedUsers } from '../utils/security'
import { exportBackup as doExportBackup, readBackupFile } from '../utils/backup'

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = ['#4f7cff','#a855f7','#22c55e','#f59e0b','#06b6d4','#f97316','#ec4899','#14b8a6']
const DB_NAME = 'HireTrakkrDB'
const DB_VERSION = 3
const STORES = ['candidates','recruiters','jobs','companies','teams','users','attendance','recruitmentPartners']
export const STATUSES = ['📅 Interview Scheduled','➡️ Next Level','✅ Selected','🎉 Joined','❌ Rejected','🚫 Exit','⏸️ On Hold']

let _id = Date.now()
const uid = () => String(++_id)

// ─── Static Super Admin (never stored in DB) ──────────────────────────────────
// IMPORTANT: Keep these credentials secure. Do not share with anyone.
// Username: admin_hiretrakkr_system | Password: HireTrakkr@Admin#2026Secure
const SUPER_ADMIN = { username: 'admin_hiretrakkr_system', password: 'HireTrakkr@Admin#2026Secure', role: 'superAdmin', name: 'Super Admin' }

// ─── Seed Data ────────────────────────────────────────────────────────────────
const seed = () => {
  const companies = [
    { id:'c1', name:'Skilltechs',         industry:'Technology', location:'Bangalore', website:'skilltechs.com',       contacts:'Ravi Kumar',   color:'#4f7cff' },
    { id:'c2', name:'Isoftronics',        industry:'IT Services',location:'Pune',      website:'isoftronics.com',      contacts:'Meera Nair',   color:'#a855f7' },
    { id:'c3', name:'Srini HR Solutions', industry:'IT Services',location:'Mumbai',    website:'srinihrsolutions.com', contacts:'Suresh Patel', color:'#22c55e' },
    { id:'c4', name:'Wipro',              industry:'Technology', location:'Hyderabad', website:'wipro.com',            contacts:'Anita Singh',  color:'#f59e0b' },
    { id:'c5', name:'Accenture',          industry:'Consulting', location:'Delhi',     website:'accenture.com',        contacts:'John Mathew',  color:'#06b6d4' },
  ]

  const teams = [
    { id:'t1', name:'Alpha Team',   companyId:'c1', teamLeadId:'u_tl1' },
    { id:'t2', name:'Beta Team',    companyId:'c1', teamLeadId:'u_tl2' },
    { id:'t3', name:'Core Team',    companyId:'c2', teamLeadId:'u_tl3' },
    { id:'t4', name:'Delta Team',   companyId:'c3', teamLeadId:'u_tl4' },
    { id:'t5', name:'Epsilon Team', companyId:'c4', teamLeadId:'u_tl5' },
  ]

  const users = [
    // Company Admins
    { id:'u_ca1', username:'ca_skilltechs', password:'cadmin@123', role:'companyAdmin', name:'Ravi Kumar',   companyId:'c1' },
    { id:'u_ca2', username:'ca_isoft',      password:'cadmin@123', role:'companyAdmin', name:'Meera Nair',   companyId:'c2' },
    { id:'u_ca3', username:'ca_srini',      password:'cadmin@123', role:'companyAdmin', name:'Suresh Patel', companyId:'c3' },
    { id:'u_ca4', username:'ca_wipro',      password:'cadmin@123', role:'companyAdmin', name:'Anita Singh',  companyId:'c4' },
    { id:'u_ca5', username:'ca_accenture',  password:'cadmin@123', role:'companyAdmin', name:'John Mathew',  companyId:'c5' },
    // Team Leads
    { id:'u_tl1', username:'tl_alpha',   password:'teamlead@123', role:'teamLead', name:'Arjun Mehta',  companyId:'c1', teamId:'t1' },
    { id:'u_tl2', username:'tl_beta',    password:'teamlead@123', role:'teamLead', name:'Kavya Sharma', companyId:'c1', teamId:'t2' },
    { id:'u_tl3', username:'tl_core',    password:'teamlead@123', role:'teamLead', name:'Sanjay Iyer',  companyId:'c2', teamId:'t3' },
    { id:'u_tl4', username:'tl_delta',   password:'teamlead@123', role:'teamLead', name:'Nisha Reddy',  companyId:'c3', teamId:'t4' },
    { id:'u_tl5', username:'tl_epsilon', password:'teamlead@123', role:'teamLead', name:'Vikram Patel', companyId:'c4', teamId:'t5' },
    // Recruiters
    { id:'u_r1', username:'rec_jane',  password:'rec@123', role:'recruiter', name:'Jane Smith',   companyId:'c1', teamId:'t1', recruiterId:'r1', mobile:'9876543210' },
    { id:'u_r2', username:'rec_arun',  password:'rec@123', role:'recruiter', name:'Arun Kumar',   companyId:'c2', teamId:'t3', recruiterId:'r2', mobile:'9876543211' },
    { id:'u_r3', username:'rec_priya', password:'rec@123', role:'recruiter', name:'Priya Sharma', companyId:'c3', teamId:'t4', recruiterId:'r3', mobile:'9876543212' },
    { id:'u_r4', username:'rec_rahul', password:'rec@123', role:'recruiter', name:'Rahul Verma',  companyId:'c4', teamId:'t5', recruiterId:'r4', mobile:'9876543213' },
    { id:'u_r5', username:'rec_sneha', password:'rec@123', role:'recruiter', name:'Sneha Iyer',   companyId:'c5', teamId:null, recruiterId:'r5', mobile:'9876543214' },
  ]

  const recruiters = [
    { id:'r1', name:'Jane Smith',   email:'jane@hiretrakkr.com',  phone:'9876543210', specialization:'Engineering',  companyId:'c1', teamId:'t1' },
    { id:'r2', name:'Arun Kumar',   email:'arun@hiretrakkr.com',  phone:'9876543211', specialization:'Finance',      companyId:'c2', teamId:'t3' },
    { id:'r3', name:'Priya Sharma', email:'priya@hiretrakkr.com', phone:'9876543212', specialization:'Product',      companyId:'c3', teamId:'t4' },
    { id:'r4', name:'Rahul Verma',  email:'rahul@hiretrakkr.com', phone:'9876543213', specialization:'Data Science', companyId:'c4', teamId:'t5' },
    { id:'r5', name:'Sneha Iyer',   email:'sneha@hiretrakkr.com', phone:'9876543214', specialization:'Design',       companyId:'c5', teamId:null  },
  ]

  const recruitmentPartners = [
    { id:'rp1', name:'StarRecruiters',       email:'contact@starrecruiters.com',       phone:'9988776655', specialization:'Tech Staffing',   companyId:'c1', website:'starrecruiters.com', contactPerson:'Ravi Sharma', notes:'Excellent for backend roles' },
    { id:'rp2', name:'TechTalent Solutions', email:'info@techtalent.com',              phone:'9988776656', specialization:'IT Recruitment', companyId:'c1', website:'techtalent.com', contactPerson:'Priya Nair', notes:'Specialized in Python developers' },
    { id:'rp3', name:'GlobalStaff',         email:'sales@globalstaff.com',            phone:'9988776657', specialization:'Multi-domain',   companyId:'c2', website:'globalstaff.com', contactPerson:'Suresh Patel', notes:'International candidates' },
    { id:'rp4', name:'Elite Recruiters',    email:'hello@eliterecruitors.com',        phone:'9988776658', specialization:'Senior Roles',    companyId:'c3', website:'eliterecruitors.com', contactPerson:'Anita Verma', notes:'Executive placements' },
    { id:'rp5', name:'NextGen Talent',      email:'team@nextgentalent.com',           phone:'9988776659', specialization:'Entry-Level',     companyId:'c4', website:'nextgentalent.com', contactPerson:'Vikram Singh', notes:'Fresh graduates specialist' },
  ]

  const jobs = [
    { id:'j1', title:'Software Engineer',     companyId:'c1', location:'Bangalore', experience:'2-5 years', skills:['Python','Java'],                 qualification:'B.Tech/M.Tech', status:'Open',   postedDate:'2025-12-01', description:'Build scalable backend services.' },
    { id:'j2', title:'Senior Data Scientist', companyId:'c2', location:'Pune',      experience:'4-8 years', skills:['Python','ML','SQL'],              qualification:'M.Tech/PhD',    status:'Open',   postedDate:'2025-12-05', description:'Lead ML initiatives.' },
    { id:'j3', title:'Product Manager',       companyId:'c3', location:'Mumbai',    experience:'3-6 years', skills:['Product Strategy','Agile','SQL'], qualification:'MBA',           status:'Open',   postedDate:'2025-12-10', description:'Own product roadmap.' },
    { id:'j4', title:'DevOps Engineer',       companyId:'c4', location:'Hyderabad', experience:'2-4 years', skills:['Docker','Kubernetes','AWS'],       qualification:'B.Tech',        status:'Closed', postedDate:'2025-11-20', description:'Manage CI/CD pipelines.' },
    { id:'j5', title:'UI/UX Designer',        companyId:'c5', location:'Delhi',     experience:'1-3 years', skills:['Figma','Adobe XD','CSS'],          qualification:'B.Des',         status:'Open',   postedDate:'2025-12-12', description:'Design user-centric interfaces.' },
    { id:'j6', title:'Frontend Developer',    companyId:'c1', location:'Bangalore', experience:'2-4 years', skills:['React','TypeScript','CSS'],        qualification:'B.Tech',        status:'Open',   postedDate:'2025-12-15', description:'Build responsive UIs.' },
    { id:'j7', title:'Backend Engineer',      companyId:'c2', location:'Pune',      experience:'3-6 years', skills:['Node.js','PostgreSQL','Redis'],    qualification:'B.Tech/M.Tech', status:'Open',   postedDate:'2025-12-18', description:'Design APIs and microservices.' },
    { id:'j8', title:'QA Engineer',           companyId:'c3', location:'Chennai',   experience:'2-5 years', skills:['Selenium','Jest','Python'],        qualification:'B.Tech',        status:'Closed', postedDate:'2025-11-25', description:'Ensure product quality.' },
  ]

  const names = ['John Doe','Amit Sharma','Priya Gupta','Rahul Singh','Sneha Patel','Arjun Reddy','Meera Joshi','Siddharth Kumar','Kavitha Nair','Rohit Verma','Ananya Das','Vikas Mishra','Pooja Iyer','Suraj Pandey','Divya Menon','Karthik Rajan']
  const candidates = names.map((name, i) => ({
    id: `can${i+1}`,
    name,
    jobId:       jobs[i % jobs.length].id,
    companyId:   recruiters[i % recruiters.length].companyId,
    recruiterId: recruiters[i % recruiters.length].id,
    experience:  `${(i % 6) + 1} years`,
    skills:      [['Python','Java'],['React','TypeScript'],['Node.js','SQL'],['ML','Python'],['Figma','CSS'],['AWS','Docker']][i % 6],
    location:    ['Bangalore','Pune','Mumbai','Hyderabad','Delhi','Chennai'][i % 6],
    gender:      i % 2 === 0 ? 'Male' : 'Female',
    qualification: ['B.Tech','M.Tech','MBA','B.Des','PhD'][i % 5],
    status:      STATUSES[i % STATUSES.length],
    phone:       `98765${String(43200 + i).padStart(5,'0')}`,
    email:       `${name.toLowerCase().replace(' ','.')}@email.com`,
    appliedDate: `2025-12-${String((i % 28)+1).padStart(2,'0')}`,
    notes:       ''
  }))

  return { companies, teams, users, recruiters, recruitmentPartners, jobs, candidates, attendance: [] }
}

// ─── Auth Storage ─────────────────────────────────────────────────────────────
const AUTH_LOGGED_KEY  = 'hiretrakkr_loggedIn'
const AUTH_CURRENT_KEY = 'hiretrakkr_currentUser'

const getStoredCurrentUser = () => {
  const s = localStorage.getItem(AUTH_CURRENT_KEY)
  return s ? JSON.parse(s) : null
}
const setStoredCurrentUser = (user) => {
  if (user) localStorage.setItem(AUTH_CURRENT_KEY, JSON.stringify(user))
  else localStorage.removeItem(AUTH_CURRENT_KEY)
}

// ─── IndexedDB ────────────────────────────────────────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = e.target.result
      STORES.forEach(store => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'id' })
        }
      })
    }
    req.onsuccess = (e) => resolve(e.target.result)
    req.onerror   = (e) => reject(e.target.error)
  })
}
function dbGetAll(db, store) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}
function dbPut(db, store, record) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).put(record)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}
function dbDelete(db, store, id) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readwrite')
    const req = tx.objectStore(store).delete(id)
    req.onsuccess = () => resolve()
    req.onerror   = () => reject(req.error)
  })
}
function dbPutMany(db, store, records) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite')
    const os = tx.objectStore(store)
    records.forEach(r => os.put(r))
    tx.oncomplete = () => resolve()
    tx.onerror    = () => reject(tx.error)
  })
}
function dbCount(db, store) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(store, 'readonly')
    const req = tx.objectStore(store).count()
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

export function AppProvider({ children }) {
  const [companies,  setCompanies]  = useState([])
  const [teams,      setTeams]      = useState([])
  const [users,      setUsers]      = useState([])
  const [recruiters, setRecruiters] = useState([])
  const [recruitmentPartners, setRecruitmentPartners] = useState([])
  const [jobs,       setJobs]       = useState([])
  const [candidates, setCandidates] = useState([])
  const [attendance, setAttendance] = useState([])
  const [toasts,     setToasts]     = useState([])
  const [loading,    setLoading]    = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const dbRef = useRef(null)

  // ── Boot ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    ;(async () => {
      try {
        const db = await openDB()
        dbRef.current = db
        const candCount = await dbCount(db, 'candidates')
        if (candCount === 0) {
          const s = seed()
          // Hash all seed user passwords before storing — plain text never saved
          const hashedUsers = await hashSeedUsers(s.users)
          await Promise.all([
            dbPutMany(db, 'companies',  s.companies),
            dbPutMany(db, 'teams',      s.teams),
            dbPutMany(db, 'users',      hashedUsers),
            dbPutMany(db, 'recruiters', s.recruiters),
            dbPutMany(db, 'recruitmentPartners', s.recruitmentPartners),
            dbPutMany(db, 'jobs',       s.jobs),
            dbPutMany(db, 'candidates', s.candidates),
          ])
        }
        const [cos, tms, usrs, recs, rps, jbs, cands, att] = await Promise.all([
          dbGetAll(db, 'companies'),
          dbGetAll(db, 'teams'),
          dbGetAll(db, 'users'),
          dbGetAll(db, 'recruiters'),
          dbGetAll(db, 'recruitmentPartners'),
          dbGetAll(db, 'jobs'),
          dbGetAll(db, 'candidates'),
          dbGetAll(db, 'attendance'),
        ])
        setCompanies(cos); setTeams(tms); setUsers(usrs)
        setRecruiters(recs); setRecruitmentPartners(rps); setJobs(jbs); setCandidates(cands); setAttendance(att)
      } catch (err) {
        console.error('IndexedDB error:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ── Restore session ────────────────────────────────────────────────────────
  useEffect(() => {
    if (localStorage.getItem(AUTH_LOGGED_KEY)) {
      const user = getStoredCurrentUser()
      if (user) { setCurrentUser(user); setIsLoggedIn(true) }
    }
  }, [])

  // ── Toast ──────────────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = 'success') => {
    const id = uid()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  // ── Role flags ─────────────────────────────────────────────────────────────
  const isSuperAdmin   = currentUser?.role === 'superAdmin'
  const isCompanyAdmin = currentUser?.role === 'companyAdmin'
  const isTeamLead     = currentUser?.role === 'teamLead'
  const isRecruiter    = currentUser?.role === 'recruiter'
  const canManage      = isSuperAdmin || isCompanyAdmin || isTeamLead
  const canEdit        = isSuperAdmin || isCompanyAdmin

  // ── Auth ───────────────────────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    // Static super admin — checked directly (never stored in DB)
    if (username === SUPER_ADMIN.username && password === SUPER_ADMIN.password) {
      const user = { username: SUPER_ADMIN.username, role: 'superAdmin', name: SUPER_ADMIN.name }
      setCurrentUser(user); setIsLoggedIn(true)
      localStorage.setItem(AUTH_LOGGED_KEY, 'true')
      setStoredCurrentUser(user)
      return true
    }
    // Dynamic users — verify against hashed password in DB
    const found = users.find(u => u.username === username)
    if (found) {
      const passwordMatch = await verifyPassword(password, found.password)
      if (passwordMatch) {
        const { password: _pw, ...user } = found  // never expose password in state
        setCurrentUser(user); setIsLoggedIn(true)
        localStorage.setItem(AUTH_LOGGED_KEY, 'true')
        setStoredCurrentUser(user)
        return true
      }
    }
    return false
  }, [users])

  const logout = useCallback(() => {
    setIsLoggedIn(false); setCurrentUser(null)
    localStorage.removeItem(AUTH_LOGGED_KEY)
    setStoredCurrentUser(null)
  }, [])

  // ── Attendance ─────────────────────────────────────────────────────────────
  const markAttendance = useCallback(async (personId, status, personType = 'recruiter') => {
    // Recruiter can only mark their own, Team Lead can only mark their own
    if (isRecruiter && currentUser?.recruiterId !== personId) return
    if (isTeamLead && currentUser?.id !== personId) return
    const today = new Date().toISOString().slice(0, 10)
    const id = `att_${personId}_${today}`
    const record = { id, personId, personType, status, date: today, markedAt: new Date().toISOString() }
    if (dbRef.current) await dbPut(dbRef.current, 'attendance', record)
    setAttendance(a => [...a.filter(x => x.id !== id), record])
    let personName = ''
    if (personType === 'recruiter') {
      const rec = recruiters.find(r => r.id === personId)
      personName = rec?.name || 'Unknown'
    } else if (personType === 'teamLead') {
      const tl = users.find(u => u.id === personId)
      personName = tl?.name || 'Unknown'
    }
    if (personName) toast(`${personName} marked ${status}`)
  }, [currentUser, isRecruiter, isTeamLead, recruiters, users, toast])

  const getTodayAttendance = useCallback((personId) => {
    const today = new Date().toISOString().slice(0, 10)
    return attendance.find(a => a.personId === personId && a.date === today) || null
  }, [attendance])

  // Backward compatibility: Get attendance by recruiterId
  const getAttendanceByRecruiterId = useCallback((recruiterId) => {
    const today = new Date().toISOString().slice(0, 10)
    return attendance.find(a => a.personId === recruiterId && a.date === today && a.personType === 'recruiter') || null
  }, [attendance])

  // ── Scoped views ───────────────────────────────────────────────────────────
  const visibleCompanies = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return companies
    return companies.filter(c => c.id === currentUser.companyId)
  }, [companies, currentUser, isSuperAdmin])

  const visibleTeams = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return teams
    if (isCompanyAdmin) return teams.filter(t => t.companyId === currentUser.companyId)
    if (isTeamLead) return teams.filter(t => t.id === currentUser.teamId)
    if (isRecruiter) return teams.filter(t => t.id === currentUser.teamId)
    return []
  }, [teams, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter])

  const visibleUsers = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return users
    // Company Admin sees all users in their company (companyAdmins, teamLeads, recruiters)
    if (isCompanyAdmin) return users.filter(u => u.companyId === currentUser.companyId)
    // Team Lead sees only recruiters in their team (cannot see other teamLeads or companyAdmins)
    if (isTeamLead) return users.filter(u => u.teamId === currentUser.teamId && u.role === 'recruiter')
    return []
  }, [users, currentUser, isSuperAdmin, isCompanyAdmin, isTeamLead])

  const visibleRecruiters = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return recruiters
    if (isCompanyAdmin) return recruiters.filter(r => r.companyId === currentUser.companyId)
    if (isTeamLead) return recruiters.filter(r => r.teamId === currentUser.teamId)
    if (isRecruiter) return recruiters.filter(r => r.id === currentUser.recruiterId)
    return []
  }, [currentUser, recruiters, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter])

  const visibleRecruitmentPartners = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return recruitmentPartners
    if (isCompanyAdmin) return recruitmentPartners.filter(rp => rp.companyId === currentUser.companyId)
    return []
  }, [currentUser, recruitmentPartners, isSuperAdmin, isCompanyAdmin])

  const visibleJobs = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return jobs
    if (isCompanyAdmin || isTeamLead) return jobs.filter(j => j.companyId === currentUser.companyId)
    if (isRecruiter) {
      const me = recruiters.find(r => r.id === currentUser.recruiterId)
      return me ? jobs.filter(j => j.companyId === me.companyId) : []
    }
    return []
  }, [currentUser, jobs, recruiters, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter])

  const visibleCandidates = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return candidates
    if (isCompanyAdmin) return candidates.filter(c => c.companyId === currentUser.companyId)
    if (isTeamLead) {
      const teamRecIds = recruiters.filter(r => r.teamId === currentUser.teamId).map(r => r.id)
      return candidates.filter(c => teamRecIds.includes(c.recruiterId))
    }
    if (isRecruiter) return candidates.filter(c => c.recruiterId === currentUser.recruiterId)
    return []
  }, [currentUser, candidates, recruiters, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter])

  const visibleAttendance = useMemo(() => {
    if (!currentUser) return []
    if (isSuperAdmin) return attendance
    if (isCompanyAdmin) {
      const recruiterIds = recruiters.filter(r => r.companyId === currentUser.companyId).map(r => r.id)
      const teamLeadIds = users.filter(u => u.companyId === currentUser.companyId && u.role === 'teamLead').map(u => u.id)
      return attendance.filter(a => 
        recruiterIds.includes(a.personId) || teamLeadIds.includes(a.personId) ||
        (a.recruiterId && recruiterIds.includes(a.recruiterId)) // backward compatibility
      )
    }
    if (isTeamLead) {
      const recruiterIds = recruiters.filter(r => r.teamId === currentUser.teamId).map(r => r.id)
      return attendance.filter(a => 
        recruiterIds.includes(a.personId) || 
        a.personId === currentUser.id ||
        (a.recruiterId && recruiterIds.includes(a.recruiterId)) // backward compatibility
      )
    }
    if (isRecruiter) return attendance.filter(a => a.personId === currentUser.recruiterId || a.recruiterId === currentUser.recruiterId)
    return []
  }, [attendance, currentUser, recruiters, users, isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter])

  // ── CRUD: Companies ────────────────────────────────────────────────────────
  const addCompany = async (data) => {
    const record = { ...data, id: uid(), color: COLORS[companies.length % COLORS.length] }
    await dbPut(dbRef.current, 'companies', record)
    setCompanies(c => [...c, record]); toast('Company created')
  }
  const updateCompany = async (id, data) => {
    const record = { ...companies.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'companies', record)
    setCompanies(c => c.map(x => x.id === id ? record : x)); toast('Company updated')
  }
  const deleteCompany = async (id) => {
    await dbDelete(dbRef.current, 'companies', id)
    setCompanies(c => c.filter(x => x.id !== id)); toast('Company deleted', 'info')
  }

  // ── CRUD: Teams ────────────────────────────────────────────────────────────
  const addTeam = async (data) => {
    const record = { ...data, id: uid() }
    await dbPut(dbRef.current, 'teams', record)
    setTeams(t => [...t, record]); toast('Team created')
  }
  const updateTeam = async (id, data) => {
    const record = { ...teams.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'teams', record)
    setTeams(t => t.map(x => x.id === id ? record : x)); toast('Team updated')
  }
  const deleteTeam = async (id) => {
    await dbDelete(dbRef.current, 'teams', id)
    setTeams(t => t.filter(x => x.id !== id)); toast('Team deleted', 'info')
  }

  // ── CRUD: Users ────────────────────────────────────────────────────────────
  const addUser = async (data) => {
    const hashedPw = await hashPassword(data.password)
    const record = { ...data, password: hashedPw, id: uid() }
    await dbPut(dbRef.current, 'users', record)
    setUsers(u => [...u, record]); toast('User created')
  }
  const updateUser = async (id, data) => {
    const existing = users.find(x => x.id === id)
    // Only re-hash if password was actually changed
    const hashedPw = data.password && data.password !== existing.password
      ? await hashPassword(data.password)
      : existing.password
    const record = { ...existing, ...data, password: hashedPw }
    await dbPut(dbRef.current, 'users', record)
    setUsers(u => u.map(x => x.id === id ? record : x)); toast('User updated')
  }
  const deleteUser = async (id) => {
    await dbDelete(dbRef.current, 'users', id)
    setUsers(u => u.filter(x => x.id !== id)); toast('User deleted', 'info')
  }

  // ── CRUD: Recruiters ───────────────────────────────────────────────────────
  const addRecruiter = async (data) => {
    const record = { ...data, id: uid() }
    await dbPut(dbRef.current, 'recruiters', record)
    setRecruiters(r => [...r, record]); toast('Recruiter created')
  }
  const updateRecruiter = async (id, data) => {
    const record = { ...recruiters.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'recruiters', record)
    setRecruiters(r => r.map(x => x.id === id ? record : x)); toast('Recruiter updated')
  }
  const deleteRecruiter = async (id) => {
    await dbDelete(dbRef.current, 'recruiters', id)
    setRecruiters(r => r.filter(x => x.id !== id)); toast('Recruiter deleted', 'info')
  }

  // ── CRUD: Recruitment Partners ─────────────────────────────────────────────
  const addRecruitmentPartner = async (data) => {
    const record = { ...data, id: uid() }
    await dbPut(dbRef.current, 'recruitmentPartners', record)
    setRecruitmentPartners(rp => [...rp, record]); toast('Recruitment Partner added')
  }
  const updateRecruitmentPartner = async (id, data) => {
    const record = { ...recruitmentPartners.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'recruitmentPartners', record)
    setRecruitmentPartners(rp => rp.map(x => x.id === id ? record : x)); toast('Recruitment Partner updated')
  }
  const deleteRecruitmentPartner = async (id) => {
    await dbDelete(dbRef.current, 'recruitmentPartners', id)
    setRecruitmentPartners(rp => rp.filter(x => x.id !== id)); toast('Recruitment Partner deleted', 'info')
  }

  // ── CRUD: Jobs ─────────────────────────────────────────────────────────────
  const addJob = async (data) => {
    const record = { ...data, id: uid(), postedDate: new Date().toISOString().slice(0, 10) }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => [...j, record]); toast('Job posting created')
  }
  const updateJob = async (id, data) => {
    const record = { ...jobs.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => j.map(x => x.id === id ? record : x)); toast('Job updated')
  }
  const deleteJob = async (id) => {
    await dbDelete(dbRef.current, 'jobs', id)
    setJobs(j => j.filter(x => x.id !== id)); toast('Job deleted', 'info')
  }
  const setJobStatus = async (id, status) => {
    const record = { ...jobs.find(x => x.id === id), status }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => j.map(x => x.id === id ? record : x)); toast(`Job marked as ${status}`)
  }

  // ── CRUD: Candidates ───────────────────────────────────────────────────────
  const addCandidate = async (data) => {
    const extra = isRecruiter
      ? { companyId: currentUser.companyId, recruiterId: currentUser.recruiterId }
      : {}
    const record = { ...extra, ...data, id: uid(), appliedDate: new Date().toISOString().slice(0, 10) }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => [...c, record]); toast('Candidate added')
  }
  const updateCandidate = async (id, data) => {
    const record = { ...candidates.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => c.map(x => x.id === id ? record : x)); toast('Candidate updated')
  }
  const deleteCandidate = async (id) => {
    await dbDelete(dbRef.current, 'candidates', id)
    setCandidates(c => c.filter(x => x.id !== id)); toast('Candidate removed', 'info')
  }
  const setCandidateStatus = async (id, status) => {
    const record = { ...candidates.find(x => x.id === id), status }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => c.map(x => x.id === id ? record : x)); toast(`Status → ${status}`)
  }

  // ── Backup & Restore ───────────────────────────────────────────────────────
  const exportAllData = () => {
    doExportBackup({ companies, teams, users, recruiters, recruitmentPartners, jobs, candidates, attendance })
    toast('Backup downloaded successfully')
  }

  const importBackup = async (file) => {
    try {
      const parsed = await readBackupFile(file)
      const d = parsed.data
      // Restore all stores
      await Promise.all([
        dbPutMany(dbRef.current, 'companies',  d.companies  || []),
        dbPutMany(dbRef.current, 'teams',      d.teams      || []),
        dbPutMany(dbRef.current, 'users',      d.users      || []),
        dbPutMany(dbRef.current, 'recruiters', d.recruiters || []),
        dbPutMany(dbRef.current, 'recruitmentPartners', d.recruitmentPartners || []),
        dbPutMany(dbRef.current, 'jobs',       d.jobs       || []),
        dbPutMany(dbRef.current, 'candidates', d.candidates || []),
        dbPutMany(dbRef.current, 'attendance', d.attendance || []),
      ])
      // Reload state from DB
      setCompanies(d.companies  || [])
      setTeams(d.teams          || [])
      setUsers(d.users          || [])
      setRecruiters(d.recruiters|| [])
      setRecruitmentPartners(d.recruitmentPartners || [])
      setJobs(d.jobs            || [])
      setCandidates(d.candidates|| [])
      setAttendance(d.attendance|| [])
      toast(`Backup restored from ${parsed.exportedDate}`)
      return true
    } catch (err) {
      toast(err.message || 'Restore failed', 'error')
      return false
    }
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', background:'var(--bg)', gap:16 }}>
      <div style={{ width:40, height:40, border:'3px solid var(--border)', borderTop:'3px solid var(--accent)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ color:'var(--text2)', fontSize:14 }}>Loading HireTrakkr...</div>
      <div style={{ color:'var(--text3)', fontSize:12 }}>Connecting to IndexedDB</div>
    </div>
  )

  return (
    <AppCtx.Provider value={{
      // Auth
      currentUser, isLoggedIn, login, logout,
      isSuperAdmin, isCompanyAdmin, isTeamLead, isRecruiter, canManage, canEdit,
      // Scoped views
      visibleCompanies, visibleTeams, visibleUsers, visibleRecruiters, visibleRecruitmentPartners,
      visibleJobs, visibleCandidates, visibleAttendance,
      // Raw data (for lookups)
      companies, teams, users, recruiters, recruitmentPartners, jobs, candidates, attendance,
      // Attendance
      markAttendance, getTodayAttendance, getAttendanceByRecruiterId,
      // Backup & Restore
      exportAllData, importBackup,
      addCompany, updateCompany, deleteCompany,
      addTeam,    updateTeam,    deleteTeam,
      addUser,    updateUser,    deleteUser,
      addRecruiter, updateRecruiter, deleteRecruiter,
      addRecruitmentPartner, updateRecruitmentPartner, deleteRecruitmentPartner,
      addJob,     updateJob,    deleteJob,     setJobStatus,
      addCandidate, updateCandidate, deleteCandidate, setCandidateStatus,
      STATUSES, toast, toasts,
    }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'} {t.msg}
          </div>
        ))}
      </div>
    </AppCtx.Provider>
  )
}
