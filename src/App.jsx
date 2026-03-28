import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Candidates from './pages/Candidates'
import Recruiters from './pages/Recruiters'
import Companies from './pages/Companies'
import Pipeline from './pages/Pipeline'
import Attendance from './pages/Attendance'
import Teams from './pages/Teams'
import UserManagement from './pages/UserManagement'

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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/recruiters" element={<Recruiters />} />
        <Route path="/attendance" element={<Attendance />} />
        {(isSuperAdmin || isCompanyAdmin) && (
          <Route path="/companies" element={<Companies />} />
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <Route path="/teams" element={<Teams />} />
        )}
        {(isSuperAdmin || isCompanyAdmin || isTeamLead) && (
          <Route path="/users" element={<UserManagement />} />
        )}
        <Route path="*" element={<Dashboard />} />
      </Routes>
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
