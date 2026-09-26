import React, { useState, useRef, useEffect } from 'react'
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
import { getYouTubeData } from './youtubeService.js'

export default function App() {
  const [activePage, setActivePage] = useState('listening')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [queries, setQueries] = useState(initialQueries)
  const createQueryRef = useRef(null)

  // Data received from dashboard backend
  const [dashboardData, setDashboardData] = useState(null)

  // YouTube data received from MongoDB
  const [youtubeData, setYoutubeData] = useState(null)

  // Connect React to backend APIs
  useEffect(() => {
    // Dashboard data
    fetch('/api/dashboard')
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data)
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error)
      })

    // YouTube data from MongoDB
    getYouTubeData()
      .then((data) => {
        setYoutubeData(data)
      })
      .catch((error) => {
        console.error('Error fetching YouTube data:', error)
      })
  }, [])

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
    createQueryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="app__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="app__main">
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <main className="app__content">

          {/* KPI CARDS */}
          <section className="kpi-grid">
            {kpiData.map((kpi) => {
              let updatedKpi = { ...kpi }

              if (dashboardData) {
                if (kpi.id === 'mentions') {
                  updatedKpi.value =
                    dashboardData.mentions.toLocaleString()
                }

                if (kpi.id === 'sentiment') {
                  updatedKpi.value = `${dashboardData.positive}%`
                }

                if (kpi.id === 'engagement') {
                  updatedKpi.value =
                    dashboardData.engagement.toLocaleString()
                }
              }

              return (
                <StatCard
                  key={updatedKpi.id}
                  {...updatedKpi}
                />
              )
            })}
          </section>

          {/* YOUTUBE DATA FROM MONGODB */}
          {youtubeData && (
            <section
              style={{
                marginTop: '24px',
                padding: '24px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
              }}
            >
              <h2 style={{ marginBottom: '20px' }}>
                YouTube
              </h2>

              <p>
                <strong>Channel:</strong>{' '}
                {youtubeData.channelName}
              </p>

              <p>
                <strong>Subscribers:</strong>{' '}
                {Number(youtubeData.subscribers).toLocaleString()}
              </p>

              <p>
                <strong>Videos:</strong>{' '}
                {Number(youtubeData.videos).toLocaleString()}
              </p>

              <p>
                <strong>Total Views:</strong>{' '}
                {Number(youtubeData.views).toLocaleString()}
              </p>

              <p>
                <strong>Channel ID:</strong>{' '}
                {youtubeData.channelId}
              </p>

              <p>
                <strong>Updated:</strong>{' '}
                {new Date(youtubeData.updatedAt).toLocaleString()}
              </p>
            </section>
          )}

          {/* CHARTS */}
          <section className="charts-grid">
            <MentionTrend />
            <SentimentChart />
          </section>

          {/* TOPICS AND MENTIONS */}
          <section className="mid-grid">
            <TopTopics />
            <TopMentions />
            <EmergingTopics />
          </section>

          {/* QUERIES */}
          <section
            ref={createQueryRef}
            className="query-grid"
          >
            <CreateQuery onCreateQuery={handleCreateQuery} />
            <RecentQueries queries={queries} />
          </section>

          {/* QUICK ACTIONS */}
          <section>
            <QuickActions
              onCreateQueryClick={scrollToCreateQuery}
            />
          </section>

        </main>
      </div>
    </div>
  )
}