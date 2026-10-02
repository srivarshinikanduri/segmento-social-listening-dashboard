import React, { useState, useRef } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'
import MentionTrend from './components/MentionTrend.jsx'
import SentimentChart from './components/SentimentChart.jsx'
import TopTopics from './components/TopTopics.jsx'
import TopMentions from './components/TopMentions.jsx'
import EmergingTopics from './components/EmergingTopics.jsx'
import CreateQuery from './components/CreateQuery.jsx'
import RecentQueries from './components/RecentQueries.jsx'
import QuickActions from './components/QuickActions.jsx'
import { kpiData, initialQueries } from './data/sampleData.js'

export default function App() {
  const [activePage, setActivePage] = useState('listening')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [queries, setQueries] = useState(initialQueries)
  const createQueryRef = useRef(null)

  function handleCreateQuery(form) {
    const newQuery = {
      id: Date.now(),
      name: form.name,
      mentions: '0',
      status: 'Active',
      created: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
    }
    setQueries((prev) => [newQuery, ...prev])
  }

  function scrollToCreateQuery() {
    createQueryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} isOpen={sidebarOpen} />

      {sidebarOpen && (
        <div className="app__overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="app__main">
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="app__content">
          <section className="kpi-grid">
            {kpiData.map((kpi) => (
              <StatCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <section className="charts-grid">
            <MentionTrend />
            <SentimentChart />
          </section>

          <section className="mid-grid">
            <TopTopics />
            <TopMentions />
            <EmergingTopics />
          </section>

          <section ref={createQueryRef} className="query-grid">
            <CreateQuery onCreateQuery={handleCreateQuery} />
            <RecentQueries queries={queries} />
          </section>

          <section>
            <QuickActions onCreateQueryClick={scrollToCreateQuery} />
          </section>
        </main>
      </div>
    </div>
  )
}
