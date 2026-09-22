import React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { sentimentData } from '../data/sampleData.js'

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{item.name}</p>
        <p className="chart-tooltip__value">{item.value}%</p>
      </div>
    )
  }
  return null
}

export default function SentimentChart() {
  return (
    <div className="panel panel--sentiment">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Sentiment Breakdown</h2>
          <p className="panel__subtitle">Sample distribution</p>
        </div>
      </div>

      <div className="panel__chart panel__chart--donut">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={sentimentData}
              dataKey="value"
              nameKey="name"
              innerRadius={64}
              outerRadius={90}
              paddingAngle={3}
              stroke="none"
            >
              {sentimentData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <span className="donut-center__value">68%</span>
          <span className="donut-center__label">Positive</span>
        </div>
      </div>

      <ul className="sentiment-legend">
        {sentimentData.map((item) => (
          <li key={item.name}>
            <span className="sentiment-legend__dot" style={{ background: item.color }} />
            <span className="sentiment-legend__name">{item.name}</span>
            <span className="sentiment-legend__value">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
