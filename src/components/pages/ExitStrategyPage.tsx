'use client';

import React, { useMemo } from 'react';
import { useSovereign } from '@/context/SovereignContext';
import {
  UNIVERSITIES,
  FIRMS,
  INGO_PROGRAMS,
  CAREER_NARRATIVES,
} from '@/data/RESEARCH_DATA';
import type { Firm, INGOProgram, RegionCareerNote } from '@/data/RESEARCH_DATA';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const REGIONS = [
  { key: 'ASIA', label: 'Asia' },
  { key: 'NORTH_AMERICA', label: 'North America' },
  { key: 'EUROPE', label: 'Europe' },
  { key: 'AUSTRALIA', label: 'Australia' },
  { key: 'INGO_DEVSEC', label: 'INGO / DevSec' },
] as const;

const TIER_ORDER: Record<string, number> = {
  ELITE: 0,
  TIER1: 1,
  TIER2: 2,
};

const TIER_LABELS: Record<string, string> = {
  ELITE: 'ELITE',
  TIER1: 'TIER 1',
  TIER2: 'TIER 2',
};

const CATEGORY_COLORS: Record<string, string> = {
  DREAM: '#e85050',
  REACH: '#e8a030',
  TARGET: '#1fb97a',
  SAFETY: '#4a9fff',
  BACKUP: '#9898b0',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function GhostWatermark({ letter }: { letter: string }) {
  return (
    <span className="ghost-letter" style={{ top: -20, right: 10 }}>
      {letter}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    ELITE: { bg: 'rgba(201, 168, 76, 0.12)', text: '#C9A84C', border: 'rgba(201, 168, 76, 0.35)' },
    TIER1: { bg: 'rgba(201, 168, 76, 0.07)', text: '#d4b85c', border: 'rgba(201, 168, 76, 0.2)' },
    TIER2: { bg: 'rgba(201, 168, 76, 0.04)', text: '#989070', border: 'rgba(201, 168, 76, 0.12)' },
  };
  const c = colors[tier] || colors.TIER2;
  return (
    <span
      className="sov-font-mono text-[9px] px-2 py-0.5 rounded-sm inline-block"
      style={{ background: c.bg, color: c.text, border: `0.5px solid ${c.border}` }}
    >
      {TIER_LABELS[tier] || tier}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className="sov-font-mono text-[9px] px-1.5 py-0.5 rounded-sm inline-block"
      style={{
        background: `${CATEGORY_COLORS[category] || '#9898b0'}15`,
        color: CATEGORY_COLORS[category] || '#9898b0',
        border: `0.5px solid ${CATEGORY_COLORS[category] || '#9898b0'}30`,
      }}
    >
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// University Matrix
// ---------------------------------------------------------------------------

function UniversityMatrix({ region }: { region: string }) {
  const unis = useMemo(
    () =>
      UNIVERSITIES.filter((u) => u.region === region).sort(
        (a, b) => {
          // Sort by QS rank numerically where possible
          const rankA = typeof a.qsRank2024 === 'number' ? a.qsRank2024 : 9999;
          const rankB = typeof b.qsRank2024 === 'number' ? b.qsRank2024 : 9999;
          return rankA - rankB;
        },
      ),
    [region],
  );

  if (unis.length === 0) return null;

  return (
    <section className="mb-8">
      <h3 className="sov-font-grotesk text-sov-gold text-[11px] tracking-[0.15em] font-semibold mb-3 uppercase">
        University Matrix
      </h3>
      <div className="space-y-2">
        {unis.map((uni) => (
          <div
            key={uni.uniId}
            className="sov-card p-4 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              {/* Left: name + country */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="sov-font-grotesk text-sov-white font-medium text-sm">
                    {uni.name}
                  </span>
                  <CategoryBadge category={uni.category} />
                </div>
                <div className="sov-font-mono text-[11px] text-sov-muted mb-1.5">
                  {uni.country}
                </div>
                <div className="sov-font-mono text-[11px]" style={{ color: '#989070' }}>
                  QS {uni.qsRank2024}
                </div>
              </div>

              {/* Right: program + internships */}
              <div className="flex-1 min-w-0">
                <div className="sov-font-mono text-[11px] text-sov-white mb-1.5" style={{ opacity: 0.85 }}>
                  {uni.quantProgram}
                </div>
                {uni.internshipPrograms.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {uni.internshipPrograms.map((ip) => (
                      <span
                        key={ip}
                        className="sov-font-mono text-[9px] px-1.5 py-0.5 rounded-sm"
                        style={{
                          background: 'rgba(201, 168, 76, 0.06)',
                          color: '#b8a050',
                          border: '0.5px solid rgba(201, 168, 76, 0.12)',
                        }}
                      >
                        {ip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Corporate Pipeline
// ---------------------------------------------------------------------------

function CorporatePipeline({ region }: { region: string }) {
  const firms = useMemo(
    () =>
      FIRMS.filter((f) => f.region === region).sort(
        (a, b) => (TIER_ORDER[a.tier] ?? 99) - (TIER_ORDER[b.tier] ?? 99),
      ),
    [region],
  );

  if (firms.length === 0) return null;

  const grouped: Record<string, Firm[]> = {};
  for (const firm of firms) {
    if (!grouped[firm.tier]) grouped[firm.tier] = [];
    grouped[firm.tier].push(firm);
  }

  const sortedTiers = Object.keys(grouped).sort(
    (a, b) => (TIER_ORDER[a] ?? 99) - (TIER_ORDER[b] ?? 99),
  );

  return (
    <section className="mb-8">
      <h3 className="sov-font-grotesk text-sov-gold text-[11px] tracking-[0.15em] font-semibold mb-3 uppercase">
        Corporate Pipeline
      </h3>
      <div className="space-y-6">
        {sortedTiers.map((tier) => (
          <div key={tier}>
            <div className="flex items-center gap-2 mb-2">
              <TierBadge tier={tier} />
              <div className="flex-1 h-px" style={{ background: 'rgba(201, 168, 76, 0.1)' }} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {grouped[tier].map((firm) => (
                <div
                  key={firm.firmId}
                  className="sov-card p-4 relative overflow-hidden"
                >
                  <div className="sov-font-grotesk text-sov-white font-medium text-sm mb-1">
                    {firm.name}
                  </div>
                  <div className="sov-font-mono text-[10px] text-sov-muted mb-2">
                    {firm.city}
                  </div>
                  <div className="sov-font-mono text-[10px] mb-2" style={{ color: '#b8a050' }}>
                    {firm.roleTypes.join(' · ')}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="sov-font-mono text-[9px] px-1.5 py-0.5 rounded-sm"
                      style={{
                        background: 'rgba(201, 168, 76, 0.06)',
                        color: '#989070',
                        border: '0.5px solid rgba(201, 168, 76, 0.1)',
                      }}
                    >
                      {firm.hiringRoute}
                    </span>
                    {firm.graduateProgram && (
                      <span
                        className="sov-font-mono text-[9px] px-1.5 py-0.5 rounded-sm"
                        style={{
                          background: 'rgba(31, 185, 122, 0.08)',
                          color: '#1fb97a',
                          border: '0.5px solid rgba(31, 185, 122, 0.15)',
                        }}
                      >
                        {firm.graduateProgram.length > 50
                          ? firm.graduateProgram.slice(0, 50) + '…'
                          : firm.graduateProgram}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// INGO Programs
// ---------------------------------------------------------------------------

function INGOSection() {
  return (
    <section className="mb-8">
      <h3 className="sov-font-grotesk text-sov-gold text-[11px] tracking-[0.15em] font-semibold mb-3 uppercase">
        INGO / Development Sector Programs
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {INGO_PROGRAMS.map((p: INGOProgram) => (
          <div
            key={p.orgId}
            className="sov-card p-4 relative overflow-hidden"
          >
            <div className="sov-font-grotesk text-sov-white font-medium text-sm mb-1">
              {p.organization}
            </div>
            <div className="sov-font-mono text-[11px] mb-2" style={{ color: '#d4b85c' }}>
              {p.program}
            </div>
            <div className="sov-font-mono text-[10px] text-sov-muted leading-relaxed mb-2">
              {p.applicationRoute}
            </div>
            {p.bangladeshNote && (
              <div
                className="sov-font-mono text-[10px] leading-relaxed p-2 rounded"
                style={{
                  background: 'rgba(31, 185, 122, 0.06)',
                  color: '#1fb97a',
                  border: '0.5px solid rgba(31, 185, 122, 0.12)',
                }}
              >
                <span className="font-bold">Bangladesh: </span>
                {p.bangladeshNote}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Career Narrative
// ---------------------------------------------------------------------------

function CareerNote({ region }: { region: string }) {
  const entry = useMemo(
    () => CAREER_NARRATIVES.find((n: RegionCareerNote) => n.region === region),
    [region],
  );

  if (!entry) return null;

  return (
    <section className="mb-8">
      <h3 className="sov-font-grotesk text-sov-gold text-[11px] tracking-[0.15em] font-semibold mb-3 uppercase">
        Career Pathway
      </h3>
      <div
        className="p-4 rounded relative overflow-hidden"
        style={{
          background: 'rgba(201, 168, 76, 0.04)',
          border: '0.5px solid rgba(201, 168, 76, 0.12)',
        }}
      >
        <GhostWatermark letter={region === 'INGO_DEVSEC' ? 'I' : region.charAt(0)} />
        <p className="sov-font-dm text-[13px] leading-relaxed relative z-10" style={{ color: '#c0b898' }}>
          {entry.narrative}
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function ExitStrategyPage() {
  const { state, setExitRegion } = useSovereign();
  const activeRegion = state.exitActiveRegion;

  const isIngo = activeRegion === 'INGO_DEVSEC';

  return (
    <div
      className="h-full overflow-y-auto sov-scrollbar p-5 lg:p-8 relative"
      style={{ background: '#0a0908' }}
    >
      {/* Ghost watermark */}
      <GhostWatermark
        letter={isIngo ? 'I' : activeRegion.charAt(0)}
      />

      {/* Page title */}
      <header className="mb-6 relative z-10">
        <h1 className="sov-font-grotesk text-sov-gold text-xl font-bold tracking-[0.08em]">
          EXIT STRATEGY
        </h1>
        <p className="sov-font-mono text-[11px] mt-1" style={{ color: '#7a7570' }}>
          Regional university matrix, corporate pipeline, and career pathway analysis
        </p>
      </header>

      {/* Regional tabs */}
      <nav className="flex gap-1 mb-8 p-1 rounded relative z-10" style={{ background: 'rgba(201, 168, 76, 0.04)', maxWidth: 'fit-content' }}>
        {REGIONS.map((r) => {
          const isActive = r.key === activeRegion;
          return (
            <button
              key={r.key}
              onClick={() => setExitRegion(r.key)}
              className="sov-font-mono text-[11px] px-3 py-1.5 rounded transition-all"
              style={{
                background: isActive ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                color: isActive ? '#C9A84C' : '#7a7570',
                border: isActive
                  ? '0.5px solid rgba(201, 168, 76, 0.35)'
                  : '0.5px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#b8a050';
                  e.currentTarget.style.background = 'rgba(201, 168, 76, 0.06)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#7a7570';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {r.label.toUpperCase()}
            </button>
          );
        })}
      </nav>

      {/* Content sections */}
      <div className="relative z-10 max-w-6xl">
        <UniversityMatrix region={activeRegion} />

        {isIngo ? <INGOSection /> : <CorporatePipeline region={activeRegion} />}

        <CareerNote region={activeRegion} />
      </div>
    </div>
  );
}