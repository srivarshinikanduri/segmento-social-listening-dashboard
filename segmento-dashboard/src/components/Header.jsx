import React from 'react'
import { Search, Bell, ChevronDown, Menu, Calendar } from 'lucide-react'

export default function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="header__title">Social Listening</h1>
          <p className="header__subtitle">Sample data · updated a few minutes ago</p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__search">
          <Search size={16} />
          <input type="text" placeholder="Search mentions, queries, topics..." />
        </div>

        <button className="header__date-filter">
          <Calendar size={15} />
          <span>Last 7 days</span>
          <ChevronDown size={14} />
        </button>

        <button className="header__icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="header__badge">3</span>
        </button>

        <div className="header__profile">
          <div className="header__avatar">SG</div>
          <div className="header__profile-info">
            <span className="header__profile-name">Sam Green</span>
            <span className="header__profile-role">Marketing Analyst</span>
          </div>
          <ChevronDown size={14} />
        </div>
      </div>
    </header>
  )
}
