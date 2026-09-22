import React from 'react'
import { topTopics } from '../data/sampleData.js'

export default function TopTopics() {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Top Topics</h2>
          <p className="panel__subtitle">What people mention most</p>
        </div>
      </div>

      <ul className="topic-list">
        {topTopics.map((item) => (
          <li key={item.topic} className="topic-list__item">
            <div className="topic-list__row">
              <span className="topic-list__name">{item.topic}</span>
              <span className="topic-list__count">{item.mentions.toLocaleString()}</span>
            </div>
            <div className="topic-list__bar-track">
              <div className="topic-list__bar-fill" style={{ width: `${item.percent}%` }} />
            </div>
            <span className="topic-list__percent">{item.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
