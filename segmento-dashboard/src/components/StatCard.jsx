import React from 'react'
import { MessageSquare, Smile, Heart, AlertTriangle, ArrowUpRight } from 'lucide-react'

const icons = {
  MessageSquare,
  Smile,
  Heart,
  AlertTriangle,
}

export default function StatCard({ label, value, change, trend, icon }) {
  const Icon = icons[icon] || MessageSquare

  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div className="stat-card__icon">
          <Icon size={18} strokeWidth={2} />
        </div>
        <span className={`stat-card__change stat-card__change--${trend}`}>
          <ArrowUpRight size={13} />
          {change}
        </span>
      </div>
      <p className="stat-card__value">{value}</p>
      <p className="stat-card__label">{label}</p>
    </div>
  )
}
