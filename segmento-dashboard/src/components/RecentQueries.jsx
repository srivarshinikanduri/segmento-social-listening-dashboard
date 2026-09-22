import React from 'react'

export default function RecentQueries({ queries }) {
  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Recent Queries</h2>
          <p className="panel__subtitle">{queries.length} total queries</p>
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Query name</th>
              <th>Mentions</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id}>
                <td className="table__name">{q.name}</td>
                <td>{q.mentions}</td>
                <td>
                  <span className={`status-tag status-tag--${q.status.toLowerCase()}`}>
                    {q.status}
                  </span>
                </td>
                <td className="table__muted">{q.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
