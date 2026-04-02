import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'

// Lazy load heavy pages to reduce initial bundle size
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Jobs = React.lazy(() => import('./pages/Jobs'))
const Candidates = React.lazy(() => import('./pages/Candidates'))
const Recruiters = React.lazy(() => import('./pages/Recruiters'))
const Companies = React.lazy(() => import('./pages/Companies'))
const RecruitmentPartners = React.lazy(() => import('./pages/RecruitmentPartners'))
const Pipeline = React.lazy(() => import('./pages/Pipeline'))
const Attendance = React.lazy(() => import('./pages/Attendance'))
const Teams = React.lazy(() => import('./pages/Teams'))
const UserManagement = React.lazy(() => import('./pages/UserManagement'))

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">{children}</div>
    </div>
  )
}

function AppContent() {
  const { isLoggedIn, isSuperAdmin, isCompanyAdmin, isTeamLead } = useApp()

  if (!isLoggedIn) return <Login />

  // Loading component shown while page chunks are being loaded
  const PageLoader = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text2)' }}>
      Loading page...
    </div>
  )

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/recruiters" element={<Recruiters />} />
          <Route path="/attendance" element={<Attendance />} />
          {(isSuperAdmin || isCompanyAdmin) && (
            <>
              <Route path="/companies" element={<Companies />} />
              <Route path="/recruitment-partners" element={<RecruitmentPartners />} />
            </>
          )}
          {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
            <>
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<UserManagement />} />
            </>
          )}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  )
}
