import React from 'react'
import { useApp } from '../context/AppContext'
import { Avatar, StatusBadge } from '../components/Shared'
import { Briefcase, Users, UserCheck, Building2, TrendingUp, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#4f7cff','#a855f7','#22c55e','#f59e0b','#06b6d4','#f97316','#ef4444']

export default function Dashboard() {
  const { jobs, candidates, companies, recruiters, STATUSES } = useApp()

  const openJobs = jobs.filter(j=>j.status==='Open').length
  const statusCounts = STATUSES.map(s => ({ name: s.replace(/[^\w\s]/g,'').trim(), value: candidates.filter(c=>c.status===s).length })).filter(x=>x.value>0)
  const companyCounts = companies.map(co => ({
    name: co.name.split(' ')[0],
    jobs: jobs.filter(j=>j.companyId===co.id).length,
    candidates: candidates.filter(c=>c.companyId===co.id).length,
  }))
  const recruiterStats = recruiters.map(r => ({
    name: r.name.split(' ')[0],
    submissions: candidates.filter(c=>c.recruiterId===r.id).length
  }))
  const recent = [...candidates].sort((a,b)=>b.appliedDate.localeCompare(a.appliedDate)).slice(0,6)

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{background:'var(--surface2)',border:'1px solid var(--border2)',borderRadius:8,padding:'10px 14px',fontSize:12}}>
        <div style={{color:'var(--text)',fontWeight:600,marginBottom:4}}>{label}</div>
        {payload.map((p,i)=><div key={i} style={{color:p.color}}>{p.name}: {p.value}</div>)}
      </div>
    )
  }

  return (
    <div className="content">
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon blue"><Briefcase /></div>
          <div className="stat-value">{jobs.length}</div>
          <div className="stat-label">Total Job Postings</div>
          <div className="stat-change up">↑ {openJobs} open positions</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon green"><Users /></div>
          <div className="stat-value">{candidates.length}</div>
          <div className="stat-label">Total Candidates</div>
          <div className="stat-change up">↑ {candidates.filter(c=>c.status==='🎉 Joined').length} joined</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon purple"><UserCheck /></div>
          <div className="stat-value">{recruiters.length}</div>
          <div className="stat-label">Active Recruiters</div>
          <div className="stat-change up">Managing {companies.length} companies</div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon orange"><Building2 /></div>
          <div className="stat-value">{companies.length}</div>
          <div className="stat-label">Client Companies</div>
          <div className="stat-change up">{jobs.filter(j=>j.status==='Open').length} open roles</div>
        </div>
        <div className="stat-card cyan">
          <div className="stat-icon cyan"><TrendingUp /></div>
          <div className="stat-value">{candidates.filter(c=>c.status==='✅ Selected').length + candidates.filter(c=>c.status==='🎉 Joined').length}</div>
          <div className="stat-label">Successful Placements</div>
          <div className="stat-change up">↑ {Math.round((candidates.filter(c=>c.status==='✅ Selected'||c.status==='🎉 Joined').length/Math.max(1,candidates.length))*100)}% success rate</div>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-card-title">Candidates by Company</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={companyCounts} margin={{top:0,right:0,left:-20,bottom:0}}>
              <XAxis dataKey="name" tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="jobs" name="Jobs" fill="#4f7cff" radius={[4,4,0,0]}/>
              <Bar dataKey="candidates" name="Candidates" fill="#a855f7" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Candidate Status Breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {statusCounts.map((_, i) => <Cell key={i} fill={COLORS[i%COLORS.length]} stroke="none"/>)}
              </Pie>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize:11,color:'var(--text3)'}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Submissions per Recruiter</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={recruiterStats} layout="vertical" margin={{top:0,right:0,left:20,bottom:0}}>
              <XAxis type="number" tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="submissions" name="Submissions" fill="#06b6d4" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title" style={{display:'flex',alignItems:'center',gap:8}}><Clock size={14}/> Recent Activity</div>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:4}}>
            {recent.map(c => {
              const job = {}
              return (
                <div key={c.id} style={{display:'flex',alignItems:'center',gap:10}}>
                  <Avatar name={c.name} size={28}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{c.appliedDate}</div>
                  </div>
                  <StatusBadge status={c.status}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
