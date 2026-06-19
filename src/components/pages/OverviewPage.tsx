'use client';

import React, { useCallback } from 'react';
import { useSovereign } from '@/context/SovereignContext';
import { PAPERS } from '@/data/RESEARCH_DATA';

export default function OverviewPage() {
  const {
    state,
    navigate,
    setSelectedDate,
    totalStudyHours,
    avgMastery,
    floorMastery,
    ceilingPct,
  } = useSovereign();

  const delta = floorMastery - ceilingPct;

  const strikePaper = state.selectedStrikePaperId
    ? PAPERS.find((p) => p.paperId === state.selectedStrikePaperId)
    : null;

  const handleGoToStrike = useCallback(() => {
    navigate('strike');
  }, [navigate]);

  const handleGoToDaily = useCallback(() => {
    const now = new Date();
    const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setSelectedDate(iso);
    navigate('daily');
  }, [navigate, setSelectedDate]);

  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8" style={{ backgroundColor: '#0a0908' }}>
      {/* Page Header */}
      <header className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className="sov-font-grotesk text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ color: '#F0EDE6' }}
          >
            Command Dashboard
          </h1>
          <p
            className="sov-font-mono mt-1 text-xs tracking-widest"
            style={{ color: '#7a7570', textTransform: 'uppercase' }}
          >
            Sovereign OS v4.0 &middot; Overview
          </p>
        </div>
        <p
          className="sov-font-mono text-xs"
          style={{ color: '#7a7570' }}
        >
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </header>

      {/* ===== DUAL-BARBELL GAUGE ===== */}
      <section className="mb-6" aria-label="Dual Barbell Gauge">
        <h2
          className="sov-font-mono mb-4 text-xs font-bold tracking-widest"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Dual-Barbell Gauge
        </h2>
        <div className="sov-card p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Floor Bar — Gold */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="sov-font-mono text-xs font-bold tracking-wider"
                  style={{ color: '#C9A84C', textTransform: 'uppercase' }}
                >
                  Institutional Floor
                </span>
                <span
                  className="sov-font-mono text-sm font-bold"
                  style={{ color: '#C9A84C' }}
                >
                  {floorMastery}%
                </span>
              </div>
              <div
                className="h-5 w-full overflow-hidden"
                style={{ background: 'rgba(201, 168, 76, 0.08)', borderRadius: '2px' }}
              >
                <div
                  className="sov-bar-fill h-full"
                  style={{ width: `${Math.max(0, Math.min(100, floorMastery))}%` }}
                />
              </div>
              <p
                className="sov-font-mono mt-1.5 text-xs"
                style={{ color: '#7a7570' }}
              >
                A-Level mastery (85%) + SAT prep (15%)
              </p>
            </div>

            {/* Ceiling Bar — Purple */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="sov-font-mono text-xs font-bold tracking-wider"
                  style={{ color: '#7c6bff', textTransform: 'uppercase' }}
                >
                  Asymmetric Ceiling
                </span>
                <span
                  className="sov-font-mono text-sm font-bold"
                  style={{ color: '#7c6bff' }}
                >
                  {ceilingPct}%
                </span>
              </div>
              <div
                className="h-5 w-full overflow-hidden"
                style={{ background: 'rgba(124, 107, 255, 0.08)', borderRadius: '2px' }}
              >
                <div
                  className="dash-bar-fill h-full"
                  style={{ width: `${Math.max(0, Math.min(100, ceilingPct))}%` }}
                />
              </div>
              <p
                className="sov-font-mono mt-1.5 text-xs"
                style={{ color: '#7a7570' }}
              >
                Portfolio projects completed
              </p>
            </div>
          </div>

          {/* Delta Indicator */}
          <div className="mt-4 flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}>
            <span
              className="sov-font-mono text-xs tracking-wider"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Delta
            </span>
            <span
              className="sov-font-mono text-lg font-bold"
              style={{ color: delta >= 0 ? '#C9A84C' : '#e85050' }}
            >
              {delta >= 0 ? '+' : ''}{delta}pp
            </span>
            <span
              className="sov-font-mono text-xs"
              style={{ color: '#7a7570' }}
            >
              {delta >= 0
                ? 'Floor leads — institutional base ahead of portfolio output'
                : 'Ceiling leads — portfolio output exceeds institutional base'}
            </span>
          </div>
        </div>
      </section>

      {/* ===== LIVE TELEMETRY STRIP ===== */}
      <section className="mb-6" aria-label="Live Telemetry Strip">
        <h2
          className="sov-font-mono mb-4 text-xs font-bold tracking-widest"
          style={{ color: '#7c6bff', textTransform: 'uppercase' }}
        >
          Live Telemetry
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Study Hours */}
          <div className="sov-card p-4">
            <span
              className="sov-font-mono block text-xs font-bold tracking-wider"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Cumulative Study Hours
            </span>
            <span
              className="sov-font-grotesk mt-2 block text-3xl font-bold sm:text-4xl"
              style={{ color: '#F0EDE6' }}
            >
              {totalStudyHours}
            </span>
            <span
              className="sov-font-mono text-xs"
              style={{ color: '#7a7570' }}
            >
              hours logged across all sessions
            </span>
          </div>

          {/* Active Strike */}
          <div className="sov-card p-4">
            <span
              className="sov-font-mono block text-xs font-bold tracking-wider"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Active Strike Paper
            </span>
            {strikePaper ? (
              <>
                <span
                  className="sov-font-grotesk mt-2 block text-lg font-bold sm:text-xl"
                  style={{ color: '#C9A84C' }}
                >
                  {strikePaper.code}
                </span>
                <span
                  className="sov-font-mono block text-sm"
                  style={{ color: '#F0EDE6' }}
                >
                  {strikePaper.name}
                </span>
              </>
            ) : (
              <span
                className="sov-font-grotesk mt-2 block text-lg font-bold sm:text-xl"
                style={{ color: '#e85050' }}
              >
                — NONE SET —
              </span>
            )}
          </div>

          {/* System Mastery */}
          <div className="sov-card p-4">
            <span
              className="sov-font-mono block text-xs font-bold tracking-wider"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              System Mastery
            </span>
            <span
              className="sov-font-grotesk mt-2 block text-3xl font-bold sm:text-4xl"
              style={{ color: '#F0EDE6' }}
            >
              {avgMastery}%
            </span>
            <span
              className="sov-font-mono text-xs"
              style={{ color: '#7a7570' }}
            >
              average across 17 A-Level papers
            </span>
          </div>
        </div>
      </section>

      {/* ===== QUICK-LAUNCH DECK ===== */}
      <section aria-label="Quick Launch Deck">
        <h2
          className="sov-font-mono mb-4 text-xs font-bold tracking-widest"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Quick Launch
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={handleGoToStrike}
            className="sov-card group flex cursor-pointer flex-col items-center gap-2 p-5 text-center transition-all hover:border-[rgba(201,168,76,0.5)] sm:flex-row sm:text-left"
            aria-label="Go to Tactical Strike view"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center"
              style={{ background: 'rgba(201, 168, 76, 0.12)', borderRadius: '6px' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <span
                className="sov-font-grotesk block text-sm font-bold tracking-wide sm:text-base"
                style={{ color: '#C9A84C' }}
              >
                GO TO TACTICAL STRIKE
              </span>
              <span
                className="sov-font-mono block text-xs"
                style={{ color: '#7a7570' }}
              >
                Deep-focus mode on a single paper
              </span>
            </div>
          </button>

          <button
            onClick={handleGoToDaily}
            className="sov-card group flex cursor-pointer flex-col items-center gap-2 p-5 text-center transition-all hover:border-[rgba(124,107,255,0.4)] sm:flex-row sm:text-left"
            aria-label="Open today's timeline"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center"
              style={{ background: 'rgba(124, 107, 255, 0.12)', borderRadius: '6px' }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c6bff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div>
              <span
                className="sov-font-grotesk block text-sm font-bold tracking-wide sm:text-base"
                style={{ color: '#7c6bff' }}
              >
                OPEN TODAY&apos;S TIMELINE
              </span>
              <span
                className="sov-font-mono block text-xs"
                style={{ color: '#7a7570' }}
              >
                Plan and log today&apos;s study blocks
              </span>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}