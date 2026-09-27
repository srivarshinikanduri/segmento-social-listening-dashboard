import React from 'react'

export default function Header({
  onToggleSidebar,
  selectedPlatform,
  onPlatformChange,
}) {
  return (
    <header
      style={{
        height: '98px',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px 0 34px',
        gap: '20px',
        boxSizing: 'border-box',
      }}
    >

      {/* LEFT SIDE */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          minWidth: '230px',
        }}
      >

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: '700',
              color: '#111827',
            }}
          >
            Social Listening
          </h1>

          <p
            style={{
              margin: '3px 0 0',
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Sample data · updated a few minutes ago
          </p>
        </div>

      </div>


      {/* RIGHT SIDE */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >

        {/* SEARCH */}

        <div
          style={{
            width: '300px',
            height: '42px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            background: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            boxSizing: 'border-box',
          }}
        >

          <span
            style={{
              fontSize: '18px',
              color: '#9ca3af',
              marginRight: '9px',
            }}
          >
            🔍
          </span>

          <span
            style={{
              fontSize: '14px',
              color: '#6b7280',
            }}
          >
            Search mentions, queries, topics
          </span>

        </div>


        {/* PLATFORM SELECTOR */}

        <div
          style={{
            height: '42px',
            padding: '0 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
          }}
        >

          <span
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#6b7280',
            }}
          >
            Platform:
          </span>

          <select
            value={selectedPlatform || 'YouTube'}
            onChange={(event) =>
              onPlatformChange &&
              onPlatformChange(event.target.value)
            }
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '600',
              color: '#111827',
              cursor: 'pointer',
            }}
          >

            <option value="YouTube">
              YouTube
            </option>

            <option value="Instagram">
              Instagram
            </option>

            <option value="Facebook">
              Facebook
            </option>

            <option value="LinkedIn">
              LinkedIn
            </option>

            <option value="X">
              X / Twitter
            </option>

          </select>

        </div>


        {/* DATE */}

        <div
          style={{
            height: '42px',
            padding: '0 15px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f8fafc',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            whiteSpace: 'nowrap',
          }}
        >

          <span>📅</span>

          <span>
            Last 7 days
          </span>

          <span>
           ⌄
          </span>

        </div>


        {/* NOTIFICATION */}

        <button
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            fontSize: '18px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >

          🔔

          <span
            style={{
              position: 'absolute',
              top: '-6px',
              right: '-5px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            3
          </span>

        </button>


        {/* PROFILE */}

        <div
          style={{
            height: '44px',
            padding: '0 12px 0 7px',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#ffffff',
          }}
        >

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: '#111827',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px',
            }}
          >
            SG
          </div>

          <div>

            <div
              style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#111827',
              }}
            >
              Sam Green
            </div>

            <div
              style={{
                fontSize: '12px',
                color: '#6b7280',
              }}
            >
              Marketing Analyst
            </div>

          </div>

          <span>
           ⌄
          </span>

        </div>

      </div>

    </header>
  )
}