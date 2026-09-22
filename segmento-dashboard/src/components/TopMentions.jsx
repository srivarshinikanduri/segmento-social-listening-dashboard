import React from 'react'
import { Twitter, Instagram, Facebook, Heart } from 'lucide-react'
import { topMentions } from '../data/sampleData.js'

const platformIcons = {
  Twitter: Twitter,
  Instagram: Instagram,
  Facebook: Facebook,
}

export default function TopMentions() {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Top Mentions</h2>
          <p className="panel__subtitle">Highest engagement this week</p>
        </div>
      </div>

      <ul className="mention-list">
        {topMentions.map((mention) => {
          const PlatformIcon = platformIcons[mention.platform] || Twitter
          return (
            <li key={mention.id} className="mention-item">
              <div className="mention-item__platform">
                <PlatformIcon size={16} />
              </div>
              <div className="mention-item__body">
                <div className="mention-item__head">
                  <span className="mention-item__username">{mention.username}</span>
                  <span
                    className={`sentiment-tag sentiment-tag--${mention.sentiment.toLowerCase()}`}
                  >
                    {mention.sentiment}
                  </span>
                </div>
                <p className="mention-item__text">{mention.text}</p>
                <div className="mention-item__meta">
                  <Heart size={13} />
                  <span>{mention.engagement} engagements</span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
