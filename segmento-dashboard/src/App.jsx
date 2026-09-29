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

import {
  kpiData,
  initialQueries,
} from './data/sampleData.js'

import {
  getYouTubeAnalytics,
} from './youtubeService.js'


export default function App() {

  const [activePage, setActivePage] =
    useState('listening')

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [queries, setQueries] =
    useState(initialQueries)

  const [dashboardData, setDashboardData] =
    useState(null)

  const [youtubeData, setYoutubeData] =
    useState(null)

  // Selected social media platform
  const [selectedPlatform, setSelectedPlatform] =
    useState('YouTube')

  const createQueryRef =
    useRef(null)


  /* =================================
     LOAD DASHBOARD DATA
  ================================= */

  useEffect(() => {

    fetch(
      'http://localhost:5000/api/dashboard'
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setDashboardData(data)
      })
      .catch((error) => {
        console.error(
          'Error fetching dashboard data:',
          error
        )
      })


    getYouTubeAnalytics()
      .then((data) => {
        setYoutubeData(data)
      })
      .catch((error) => {
        console.error(
          'Error fetching YouTube analytics:',
          error
        )
      })

  }, [])


  /* =================================
     CREATE QUERY
  ================================= */

  function handleCreateQuery(form) {

    const newQuery = {

      id: Date.now(),

      name: form.name,

      mentions: '0',

      status: 'Active',

      created:
        new Date().toLocaleDateString(
          'en-US',
          {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }
        ),

    }


    setQueries((prev) => [

      newQuery,

      ...prev,

    ])

  }


  /* =================================
     SCROLL TO CREATE QUERY
  ================================= */

  function scrollToCreateQuery() {

    createQueryRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

  }


  return (

    <div className="app">


      {/* =================================
          SIDEBAR
      ================================= */}

      <Sidebar

        activePage={activePage}

        onNavigate={setActivePage}

        isOpen={sidebarOpen}

      />


      {/* MOBILE OVERLAY */}

      {sidebarOpen && (

        <div
          className="app__overlay"

          onClick={() =>
            setSidebarOpen(false)
          }

        />

      )}


      {/* =================================
          MAIN AREA
      ================================= */}

      <div className="app__main">


        {/* =================================
            TOP HEADER

            Platform selector is now inside
            Header.jsx
        ================================= */}

        <Header

          onToggleSidebar={() =>
            setSidebarOpen(
              (value) => !value
            )
          }

          selectedPlatform={
            selectedPlatform
          }

          onPlatformChange={
            setSelectedPlatform
          }

        />


        {/* =================================
            PAGE CONTENT
        ================================= */}

        <main className="app__content">


          {/* =================================
              KPI CARDS
          ================================= */}

          <section className="kpi-grid">

            {kpiData.map((kpi) => {

              let updatedKpi = {
                ...kpi,
              }


              if (dashboardData) {

                /* TOTAL MENTIONS */

                if (
                  kpi.id === 'mentions'
                ) {

                  updatedKpi.value =
                    dashboardData
                      .mentions
                      .toLocaleString()

                }


                /* SENTIMENT */

                if (
                  kpi.id === 'sentiment'
                ) {

                  updatedKpi.value =
                    `${dashboardData.positive}%`

                }


                /* ENGAGEMENT */

                if (
                  kpi.id === 'engagement'
                ) {

                  updatedKpi.value =
                    dashboardData
                      .engagement
                      .toLocaleString()

                }

              }


              return (

                <StatCard

                  key={
                    updatedKpi.id
                  }

                  {...updatedKpi}

                />

              )

            })}

          </section>


          {/* =================================
              YOUTUBE ANALYTICS
          ================================= */}

          {selectedPlatform === 'YouTube' && (

            <>

              {/* Loading */}

              {!youtubeData && (

                <section
                  style={{
                    marginTop: '24px',
                    padding: '40px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border:
                      '1px solid #e5e7eb',
                    textAlign: 'center',
                  }}
                >

                  <p
                    style={{
                      color: '#6b7280',
                      margin: 0,
                    }}
                  >
                    Loading YouTube analytics...
                  </p>

                </section>

              )}


              {/* YouTube Data */}

              {youtubeData && (

                <section
                  style={{
                    marginTop: '24px',
                    padding: '24px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border:
                      '1px solid #e5e7eb',
                  }}
                >


                  {/* =================================
                      YOUTUBE HEADER
                  ================================= */}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      alignItems: 'center',
                      marginBottom: '24px',
                      gap: '20px',
                      flexWrap: 'wrap',
                    }}
                  >

                    <div>

                      <h2
                        style={{
                          margin: 0,
                          fontSize: '24px',
                          color: '#111827',
                        }}
                      >
                        YouTube Analytics
                      </h2>


                      <p
                        style={{
                          marginTop: '6px',
                          marginBottom: 0,
                          color: '#6b7280',
                        }}
                      >
                        {
                          youtubeData
                            .channel
                            .channelName
                        }
                      </p>

                    </div>


                    <span
                      style={{
                        padding:
                          '8px 16px',
                        borderRadius:
                          '20px',
                        background:
                          '#f3f4f6',
                        fontSize: '13px',
                        fontWeight: '600',
                      }}
                    >
                      YouTube
                    </span>

                  </div>


                  {/* =================================
                      YOUTUBE ANALYTICS CARDS
                  ================================= */}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '16px',
                      marginBottom: '32px',
                    }}
                  >

                    <AnalyticsCard
                      title="Subscribers"
                      value={
                        youtubeData
                          .summary
                          .subscribers
                      }
                    />


                    <AnalyticsCard
                      title="Total Views"
                      value={
                        youtubeData
                          .summary
                          .totalViews
                      }
                    />


                    <AnalyticsCard
                      title="Total Videos"
                      value={
                        youtubeData
                          .summary
                          .totalVideos
                      }
                    />


                    <AnalyticsCard
                      title="Recent Views"
                      value={
                        youtubeData
                          .summary
                          .recentVideoViews
                      }
                    />


                    <AnalyticsCard
                      title="Recent Likes"
                      value={
                        youtubeData
                          .summary
                          .recentVideoLikes
                      }
                    />


                    <AnalyticsCard
                      title="Recent Comments"
                      value={
                        youtubeData
                          .summary
                          .recentVideoComments
                      }
                    />

                  </div>


                  {/* =================================
                      RECENT VIDEOS
                  ================================= */}

                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: '16px',
                      color: '#111827',
                    }}
                  >
                    Recent Videos
                  </h3>


                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '18px',
                    }}
                  >

                    {youtubeData
                      .recentVideos
                      .map((video) => (

                        <div
                          key={
                            video.videoId
                          }
                          style={{
                            border:
                              '1px solid #e5e7eb',
                            borderRadius:
                              '12px',
                            overflow:
                              'hidden',
                            background:
                              '#ffffff',
                          }}
                        >


                          {/* THUMBNAIL */}

                          <img
                            src={
                              video.thumbnail
                            }

                            alt={
                              video.title
                            }

                            style={{
                              width:
                                '100%',
                              display:
                                'block',
                              aspectRatio:
                                '16 / 9',
                              objectFit:
                                'cover',
                            }}

                          />


                          {/* VIDEO DETAILS */}

                          <div
                            style={{
                              padding:
                                '14px',
                            }}
                          >

                            <h4
                              style={{
                                margin:
                                  '0 0 10px',
                                lineHeight:
                                  '1.4',
                                color:
                                  '#111827',
                              }}
                            >
                              {
                                video.title
                              }
                            </h4>


                            <p
                              style={{
                                margin:
                                  '6px 0',
                                color:
                                  '#6b7280',
                                fontSize:
                                  '13px',
                              }}
                            >
                              Views:{' '}

                              {video.views
                                .toLocaleString()}

                            </p>


                            <p
                              style={{
                                margin:
                                  '6px 0',
                                color:
                                  '#6b7280',
                                fontSize:
                                  '13px',
                              }}
                            >
                              Likes:{' '}

                              {video.likes
                                .toLocaleString()}

                            </p>


                            <p
                              style={{
                                margin:
                                  '6px 0',
                                color:
                                  '#6b7280',
                                fontSize:
                                  '13px',
                              }}
                            >
                              Comments:{' '}

                              {video.comments
                                .toLocaleString()}

                            </p>


                            <p
                              style={{
                                margin:
                                  '6px 0 0',
                                color:
                                  '#9ca3af',
                                fontSize:
                                  '12px',
                              }}
                            >
                              Published:{' '}

                              {new Date(
                                video.publishedAt
                              ).toLocaleDateString()}

                            </p>

                          </div>

                        </div>

                      ))}

                  </div>

                </section>

              )}

            </>

          )}


          {/* =================================
              OTHER PLATFORMS
          ================================= */}

          {selectedPlatform !==
            'YouTube' && (

            <section
              style={{
                marginTop: '24px',
                padding:
                  '70px 24px',
                borderRadius:
                  '16px',
                background:
                  '#ffffff',
                border:
                  '1px solid #e5e7eb',
                textAlign:
                  'center',
              }}
            >

              <h2
                style={{
                  marginTop: 0,
                  marginBottom:
                    '10px',
                  color:
                    '#111827',
                }}
              >
                {selectedPlatform}
              </h2>


              <p
                style={{
                  color:
                    '#6b7280',
                  margin: 0,
                }}
              >
                {selectedPlatform}{' '}
                analytics integration
                is coming soon.
              </p>

            </section>

          )}


          {/* =================================
              CHARTS
          ================================= */}

          <section className="charts-grid">

            <MentionTrend />

            <SentimentChart />

          </section>


          {/* =================================
              TOPICS
          ================================= */}

          <section className="mid-grid">

            <TopTopics />

            <TopMentions />

            <EmergingTopics />

          </section>


          {/* =================================
              QUERIES
          ================================= */}

          <section
            ref={createQueryRef}
            className="query-grid"
          >

            <CreateQuery
              onCreateQuery={
                handleCreateQuery
              }
            />


            <RecentQueries
              queries={queries}
            />

          </section>


          {/* =================================
              QUICK ACTIONS
          ================================= */}

          <section>

            <QuickActions
              onCreateQueryClick={
                scrollToCreateQuery
              }
            />

          </section>


        </main>

      </div>

    </div>

  )
}


/* =================================
   ANALYTICS CARD COMPONENT
================================= */

function AnalyticsCard({
  title,
  value,
}) {

  return (

    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        background: '#f9fafb',
        border:
          '1px solid #f0f0f0',
      }}
    >

      <p
        style={{
          color: '#6b7280',
          margin: 0,
          fontSize: '14px',
        }}
      >
        {title}
      </p>


      <h2
        style={{
          marginTop: '8px',
          marginBottom: 0,
          color: '#111827',
        }}
      >
        {Number(value)
          .toLocaleString()}
      </h2>

    </div>

  )
}