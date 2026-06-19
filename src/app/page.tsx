'use client';

import React, { useState } from 'react';
import { useSovereign } from '@/context/SovereignContext';
import type { ViewId } from '@/context/SovereignContext';
import OverviewPage from '@/components/pages/OverviewPage';
import BarbellPage from '@/components/pages/BarbellPage';
import AcademicFortressPage from '@/components/pages/AcademicFortressPage';
import TacticalStrikePage from '@/components/pages/TacticalStrikePage';
import DailyOSPage from '@/components/pages/DailyOSPage';
import ExitStrategyPage from '@/components/pages/ExitStrategyPage';

// =============================================================================
// NAVIGATION CONFIG
// =============================================================================

interface NavItem {
  id: ViewId;
  label: string;
  icon: React.ReactNode;
  tier: 1 | 2;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'OVERVIEW',
    tier: 1,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'barbell',
    label: 'BARBELL',
    tier: 1,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v18" /><path d="M18 3v18" /><rect x="2" y="7" width="4" height="10" rx="1" /><rect x="18" y="7" width="4" height="10" rx="1" /><path d="M6 12h12" />
      </svg>
    ),
  },
  {
    id: 'academic',
    label: 'FORTRESS',
    tier: 2,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    id: 'strike',
    label: 'STRIKE',
    tier: 1,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'daily',
    label: 'DAILY OS',
    tier: 2,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'exit',
    label: 'EXIT',
    tier: 1,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  },
];

// =============================================================================
// SIDEBAR
// =============================================================================

function Sidebar() {
  const { state, navigate } = useSovereign();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      style={{
        width: collapsed ? '56px' : '200px',
        background: '#0a0908',
        borderRight: '0.5px solid rgba(201, 168, 76, 0.12)',
        transition: 'width 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        zIndex: 40,
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          padding: collapsed ? '16px 8px' : '16px 16px',
          borderBottom: '0.5px solid rgba(201, 168, 76, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: '60px',
        }}
      >
        {!collapsed && (
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                color: '#C9A84C',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              SOVEREIGN
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px',
                color: '#7a7570',
                letterSpacing: '2px',
                marginTop: '2px',
              }}
            >
              v4.0 — OFFLINE
            </div>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              color: '#C9A84C',
            }}
          >
            S
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            border: '0.5px solid rgba(201, 168, 76, 0.15)',
            borderRadius: '4px',
            color: '#7a7570',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#C9A84C';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#7a7570';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.15)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {collapsed ? (
              <>
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = state.activeView === item.id;
          const accentColor = item.tier === 1 ? '#C9A84C' : '#7c6bff';
          const activeBg = item.tier === 1 ? 'rgba(201,168,76,0.1)' : 'rgba(124,107,255,0.1)';

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? '0' : '10px',
                width: '100%',
                padding: collapsed ? '10px 0' : '10px 16px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                border: 'none',
                borderLeft: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
                background: isActive ? activeBg : 'transparent',
                color: isActive ? accentColor : '#7a7570',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: "'Space Mono', monospace",
                fontSize: '10px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase' as const,
                whiteSpace: 'nowrap' as const,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#F0EDE6';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#7a7570';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '12px 16px',
          borderTop: '0.5px solid rgba(201, 168, 76, 0.08)',
        }}
      >
        {!collapsed && (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '8px',
              color: '#7a7570',
              letterSpacing: '1px',
              lineHeight: 1.5,
            }}
          >
            100% CLIENT-SIDE<br />
            ZERO CLOUD DEPENDENCY
          </div>
        )}
        {collapsed && (
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: '#7a7570',
              textAlign: 'center',
            }}
          >
            ◉
          </div>
        )}
      </div>
    </aside>
  );
}

// =============================================================================
// MAIN APP SHELL
// =============================================================================

export default function SovereignApp() {
  const { state } = useSovereign();

  const renderView = () => {
    switch (state.activeView) {
      case 'overview':
        return <OverviewPage />;
      case 'barbell':
        return <BarbellPage />;
      case 'academic':
        return <AcademicFortressPage />;
      case 'strike':
        return <TacticalStrikePage />;
      case 'daily':
        return <DailyOSPage />;
      case 'exit':
        return <ExitStrategyPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0a0908',
        color: '#F0EDE6',
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top bar with current view indicator */}
        <header
          style={{
            height: '48px',
            borderBottom: '0.5px solid rgba(201, 168, 76, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: '#0a0908',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: '14px',
              color: '#F0EDE6',
              letterSpacing: '1px',
            }}
          >
            {NAV_ITEMS.find((n) => n.id === state.activeView)?.label || 'OVERVIEW'}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              color: '#7a7570',
              letterSpacing: '1px',
            }}
          >
            SOVEREIGN OS v4.0
          </div>
        </header>

        {/* Page content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '24px',
          }}
          className="sov-scrollbar"
        >
          {renderView()}
        </div>
      </main>
    </div>
  );
}