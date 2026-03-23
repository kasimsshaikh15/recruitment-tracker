import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const COLORS = ['#4f7cff','#a855f7','#22c55e','#f59e0b','#06b6d4','#f97316','#ec4899','#14b8a6']
const DB_NAME = 'RecruitProDB'
const DB_VERSION = 1
const STORES = ['candidates','recruiters','jobs','companies']
export const STATUSES = ['📅 Interview Scheduled','➡️ Next Level','✅ Selected','🎉 Joined','❌ Rejected','🚫 Exit','⏸️ On Hold']

let _id = Date.now()
const uid = () => String(++_id)

// ─── Seed Data ────────────────────────────────────────────────────────────────
const seed = () => {
  const companies = [
    { id:'c1', name:'XYZ Corp',    industry:'Technology', location:'Bangalore', website:'xyz.com',       contacts:'Ravi Kumar',   color:'#4f7cff' },
    { id:'c2', name:'Infosys',     industry:'IT Services',location:'Pune',      website:'infosys.com',   contacts:'Meera Nair',   color:'#a855f7' },
    { id:'c3', name:'TCS',         industry:'IT Services',location:'Mumbai',    website:'tcs.com',       contacts:'Suresh Patel', color:'#22c55e' },
    { id:'c4', name:'Wipro',       industry:'Technology', location:'Hyderabad', website:'wipro.com',     contacts:'Anita Singh',  color:'#f59e0b' },
    { id:'c5', name:'Accenture',   industry:'Consulting', location:'Delhi',     website:'accenture.com', contacts:'John Mathew',  color:'#06b6d4' },
  ]
  const recruiters = [
    { id:'r1', name:'Jane Smith',   email:'jane@recruitpro.com',  phone:'9876543210', specialization:'Engineering',  companyId:'c1' },
    { id:'r2', name:'Arun Kumar',   email:'arun@recruitpro.com',  phone:'9876543211', specialization:'Finance',      companyId:'c2' },
    { id:'r3', name:'Priya Sharma', email:'priya@recruitpro.com', phone:'9876543212', specialization:'Product',      companyId:'c3' },
    { id:'r4', name:'Rahul Verma',  email:'rahul@recruitpro.com', phone:'9876543213', specialization:'Data Science', companyId:'c4' },
    { id:'r5', name:'Sneha Iyer',   email:'sneha@recruitpro.com', phone:'9876543214', specialization:'Design',       companyId:'c5' },
  ]
  const jobs = [
    { id:'j1', title:'Software Engineer',    companyId:'c1', location:'Bangalore', experience:'2-5 years', skills:['Python','Java'],                  qualification:'B.Tech/M.Tech', status:'Open',   postedDate:'2025-12-01', description:'Build scalable backend services.' },
    { id:'j2', title:'Senior Data Scientist',companyId:'c2', location:'Pune',      experience:'4-8 years', skills:['Python','ML','SQL'],               qualification:'M.Tech/PhD',    status:'Open',   postedDate:'2025-12-05', description:'Lead ML initiatives.' },
    { id:'j3', title:'Product Manager',      companyId:'c3', location:'Mumbai',    experience:'3-6 years', skills:['Product Strategy','Agile','SQL'],  qualification:'MBA',           status:'Open',   postedDate:'2025-12-10', description:'Own product roadmap.' },
    { id:'j4', title:'DevOps Engineer',      companyId:'c4', location:'Hyderabad', experience:'2-4 years', skills:['Docker','Kubernetes','AWS'],        qualification:'B.Tech',        status:'Closed', postedDate:'2025-11-20', description:'Manage CI/CD pipelines.' },
    { id:'j5', title:'UI/UX Designer',       companyId:'c5', location:'Delhi',     experience:'1-3 years', skills:['Figma','Adobe XD','CSS'],           qualification:'B.Des',         status:'Open',   postedDate:'2025-12-12', description:'Design user-centric interfaces.' },
    { id:'j6', title:'Frontend Developer',   companyId:'c1', location:'Bangalore', experience:'2-4 years', skills:['React','TypeScript','CSS'],         qualification:'B.Tech',        status:'Open',   postedDate:'2025-12-15', description:'Build responsive UIs.' },
    { id:'j7', title:'Backend Engineer',     companyId:'c2', location:'Pune',      experience:'3-6 years', skills:['Node.js','PostgreSQL','Redis'],     qualification:'B.Tech/M.Tech', status:'Open',   postedDate:'2025-12-18', description:'Design APIs and microservices.' },
    { id:'j8', title:'QA Engineer',          companyId:'c3', location:'Chennai',   experience:'2-5 years', skills:['Selenium','Jest','Python'],         qualification:'B.Tech',        status:'Closed', postedDate:'2025-11-25', description:'Ensure product quality.' },
  ]
  const names = ['John Doe','Amit Sharma','Priya Gupta','Rahul Singh','Sneha Patel','Arjun Reddy','Meera Joshi','Siddharth Kumar','Kavitha Nair','Rohit Verma','Ananya Das','Vikas Mishra','Pooja Iyer','Suraj Pandey','Divya Menon','Karthik Rajan']
  const candidates = names.map((name, i) => ({
    id: `can${i+1}`,
    name,
    jobId:       jobs[i % jobs.length].id,
    companyId:   companies[i % companies.length].id,
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
  return { companies, recruiters, jobs, candidates }
}

// ─── IndexedDB Helper ─────────────────────────────────────────────────────────
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
  const [recruiters, setRecruiters] = useState([])
  const [jobs,       setJobs]       = useState([])
  const [candidates, setCandidates] = useState([])
  const [toasts,     setToasts]     = useState([])
  const [loading,    setLoading]    = useState(true)
  const dbRef = useRef(null)

  // ── Boot: open DB, seed if empty, load all data ──────────────────────────
  useEffect(() => {
    ;(async () => {
      try {
        const db = await openDB()
        dbRef.current = db

        // Check if DB is empty → seed it
        const candCount = await dbCount(db, 'candidates')
        if (candCount === 0) {
          const s = seed()
          await Promise.all([
            dbPutMany(db, 'companies',  s.companies),
            dbPutMany(db, 'recruiters', s.recruiters),
            dbPutMany(db, 'jobs',       s.jobs),
            dbPutMany(db, 'candidates', s.candidates),
          ])
        }

        // Load all data from DB into state
        const [cos, recs, jbs, cands] = await Promise.all([
          dbGetAll(db, 'companies'),
          dbGetAll(db, 'recruiters'),
          dbGetAll(db, 'jobs'),
          dbGetAll(db, 'candidates'),
        ])
        setCompanies(cos)
        setRecruiters(recs)
        setJobs(jbs)
        setCandidates(cands)
      } catch (err) {
        console.error('IndexedDB error:', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ── Toast ─────────────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = 'success') => {
    const id = uid()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000)
  }, [])

  // ── Companies ─────────────────────────────────────────────────────────────
  const addCompany = async (data) => {
    const record = { ...data, id: uid(), color: COLORS[companies.length % COLORS.length] }
    await dbPut(dbRef.current, 'companies', record)
    setCompanies(c => [...c, record])
    toast('Company created')
  }
  const updateCompany = async (id, data) => {
    const record = { ...companies.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'companies', record)
    setCompanies(c => c.map(x => x.id === id ? record : x))
    toast('Company updated')
  }
  const deleteCompany = async (id) => {
    await dbDelete(dbRef.current, 'companies', id)
    setCompanies(c => c.filter(x => x.id !== id))
    toast('Company deleted', 'info')
  }

  // ── Recruiters ────────────────────────────────────────────────────────────
  const addRecruiter = async (data) => {
    const record = { ...data, id: uid() }
    await dbPut(dbRef.current, 'recruiters', record)
    setRecruiters(r => [...r, record])
    toast('Recruiter created')
  }
  const updateRecruiter = async (id, data) => {
    const record = { ...recruiters.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'recruiters', record)
    setRecruiters(r => r.map(x => x.id === id ? record : x))
    toast('Recruiter updated')
  }
  const deleteRecruiter = async (id) => {
    await dbDelete(dbRef.current, 'recruiters', id)
    setRecruiters(r => r.filter(x => x.id !== id))
    toast('Recruiter deleted', 'info')
  }

  // ── Jobs ──────────────────────────────────────────────────────────────────
  const addJob = async (data) => {
    const record = { ...data, id: uid(), postedDate: new Date().toISOString().slice(0, 10) }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => [...j, record])
    toast('Job posting created')
  }
  const updateJob = async (id, data) => {
    const record = { ...jobs.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => j.map(x => x.id === id ? record : x))
    toast('Job updated')
  }
  const deleteJob = async (id) => {
    await dbDelete(dbRef.current, 'jobs', id)
    setJobs(j => j.filter(x => x.id !== id))
    toast('Job deleted', 'info')
  }
  const setJobStatus = async (id, status) => {
    const record = { ...jobs.find(x => x.id === id), status }
    await dbPut(dbRef.current, 'jobs', record)
    setJobs(j => j.map(x => x.id === id ? record : x))
    toast(`Job marked as ${status}`)
  }

  // ── Candidates ────────────────────────────────────────────────────────────
  const addCandidate = async (data) => {
    const record = { ...data, id: uid(), appliedDate: new Date().toISOString().slice(0, 10) }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => [...c, record])
    toast('Candidate added')
  }
  const updateCandidate = async (id, data) => {
    const record = { ...candidates.find(x => x.id === id), ...data }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => c.map(x => x.id === id ? record : x))
    toast('Candidate updated')
  }
  const deleteCandidate = async (id) => {
    await dbDelete(dbRef.current, 'candidates', id)
    setCandidates(c => c.filter(x => x.id !== id))
    toast('Candidate removed', 'info')
  }
  const setCandidateStatus = async (id, status) => {
    const record = { ...candidates.find(x => x.id === id), status }
    await dbPut(dbRef.current, 'candidates', record)
    setCandidates(c => c.map(x => x.id === id ? record : x))
    toast(`Status → ${status}`)
  }

  // ── Loading screen ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        height:'100vh', background:'var(--bg)', gap:16
      }}>
        <div style={{
          width:40, height:40, border:'3px solid var(--border)',
          borderTop:'3px solid var(--accent)', borderRadius:'50%',
          animation:'spin 0.8s linear infinite'
        }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <div style={{color:'var(--text2)', fontSize:14}}>Loading RecruitPro...</div>
        <div style={{color:'var(--text3)', fontSize:12}}>Connecting to IndexedDB</div>
      </div>
    )
  }

  return (
    <AppCtx.Provider value={{
      companies, recruiters, jobs, candidates,
      addCompany,    updateCompany,    deleteCompany,
      addRecruiter,  updateRecruiter,  deleteRecruiter,
      addJob,        updateJob,        deleteJob,        setJobStatus,
      addCandidate,  updateCandidate,  deleteCandidate,  setCandidateStatus,
      STATUSES, toast, toasts
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
