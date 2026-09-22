import React from 'react'
import { Eye, PlusCircle, FileBarChart, ShieldAlert } from 'lucide-react'

export default function QuickActions({ onCreateQueryClick }) {
  const actions = [
    { id: 'view', label: 'View All Mentions', icon: Eye },
    { id: 'create', label: 'Create New Query', icon: PlusCircle },
    { id: 'report', label: 'Generate Report', icon: FileBarChart },
    { id: 'manage', label: 'Manage Alerts', icon: ShieldAlert },
  ]

  function handleClick(id) {
    if (id === 'create') {
      onCreateQueryClick?.()
    }
  }

  return (
    <div className="panel quick-actions">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Quick Actions</h2>
        </div>
      </div>
      <div className="quick-actions__grid">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              className="quick-action-btn"
              onClick={() => handleClick(action.id)}
            >
              <Icon size={18} />
              <span>{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
