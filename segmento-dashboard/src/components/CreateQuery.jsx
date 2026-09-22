import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { sourceOptions, sentimentOptions, languageOptions } from '../data/sampleData.js'

const emptyForm = {
  name: '',
  keywords: '',
  source: sourceOptions[0],
  sentiment: sentimentOptions[0],
  language: languageOptions[0],
}

export default function CreateQuery({ onCreateQuery }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim() || !form.keywords.trim()) {
      setError('Query name and keywords are required.')
      return
    }

    onCreateQuery(form)
    setForm(emptyForm)
    setError('')
  }

  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Create Listening Query</h2>
          <p className="panel__subtitle">Track a new keyword, brand, or topic</p>
        </div>
      </div>

      <form className="query-form" onSubmit={handleSubmit}>
        <div className="query-form__field">
          <label htmlFor="query-name">Query name</label>
          <input
            id="query-name"
            type="text"
            placeholder="e.g. Product X Complaints"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>

        <div className="query-form__field">
          <label htmlFor="query-keywords">Keywords</label>
          <input
            id="query-keywords"
            type="text"
            placeholder="e.g. Product X, delivery, refund"
            value={form.keywords}
            onChange={(e) => handleChange('keywords', e.target.value)}
          />
        </div>

        <div className="query-form__row">
          <div className="query-form__field">
            <label htmlFor="query-source">Source</label>
            <select
              id="query-source"
              value={form.source}
              onChange={(e) => handleChange('source', e.target.value)}
            >
              {sourceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="query-form__field">
            <label htmlFor="query-sentiment">Sentiment</label>
            <select
              id="query-sentiment"
              value={form.sentiment}
              onChange={(e) => handleChange('sentiment', e.target.value)}
            >
              {sentimentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="query-form__field">
            <label htmlFor="query-language">Language</label>
            <select
              id="query-language"
              value={form.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              {languageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="query-form__error">{error}</p>}

        <button type="submit" className="btn btn--primary query-form__submit">
          <Plus size={16} />
          Create Query
        </button>
      </form>
    </div>
  )
}
