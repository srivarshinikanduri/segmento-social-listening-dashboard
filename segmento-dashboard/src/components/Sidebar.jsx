import React from 'react'
import {
  Radio,
  Home,
  Ear,
  Search,
  BarChart2,
  Bell,
  FileText,
  Settings,
} from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'listening', label: 'Social Listening', icon: Ear },
  { id: 'queries', label: 'Queries', icon: Search },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activePage, onNavigate, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <Radio size={20} strokeWidth={2.4} />
        </div>
        <span className="sidebar__brand-name">Segmento</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = activePage === item.id
          return (
            <button
              key={item.id}
              className={`sidebar__link ${active ? 'sidebar__link--active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__plan">
          <p className="sidebar__plan-title">Demo mode</p>
          <p className="sidebar__plan-sub">Running on sample data</p>
        </div>
      </div>
    </aside>
  )
}
