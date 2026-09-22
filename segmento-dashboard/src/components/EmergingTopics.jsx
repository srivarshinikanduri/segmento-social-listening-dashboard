import React from 'react'
import { TrendingUp } from 'lucide-react'
import { emergingTopics } from '../data/sampleData.js'

export default function EmergingTopics() {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Emerging Topics</h2>
          <p className="panel__subtitle">Fastest-rising this week</p>
        </div>
      </div>

      <ul className="emerging-list">
        {emergingTopics.map((item) => (
          <li key={item.topic} className="emerging-item">
            <div className="emerging-item__icon">
              <TrendingUp size={15} />
            </div>
            <span className="emerging-item__name">{item.topic}</span>
            <span className="emerging-item__change">{item.change}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
