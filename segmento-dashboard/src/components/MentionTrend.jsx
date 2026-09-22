import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { mentionTrendData } from '../data/sampleData.js'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="chart-tooltip__label">{label}</p>
        <p className="chart-tooltip__value">{payload[0].value.toLocaleString()} mentions</p>
      </div>
    )
  }
  return null
}

export default function MentionTrend() {
  return (
    <div className="panel panel--trend">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Mention Trend</h2>
          <p className="panel__subtitle">Sample volume, last 8 days</p>
        </div>
      </div>
      <div className="panel__chart">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={mentionTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="mentionFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0E9384" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#0E9384" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAECF2" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#8A8FA3' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#8A8FA3' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="mentions"
              stroke="#0E9384"
              strokeWidth={2.5}
              fill="url(#mentionFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
