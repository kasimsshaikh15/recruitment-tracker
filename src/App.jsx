import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Candidates from './pages/Candidates'
import Recruiters from './pages/Recruiters'
import Companies from './pages/Companies'
import Pipeline from './pages/Pipeline'

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        {children}
      </div>
    </div>
  )
}

function Topbar({ title, sub }) {
  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        {sub && <div className="topbar-sub">{sub}</div>}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}
