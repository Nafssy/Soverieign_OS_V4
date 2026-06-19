'use client';

import React, { useMemo } from 'react';
import { PAPERS } from '@/data/RESEARCH_DATA';
import { useSovereign } from '@/context/SovereignContext';
import type { TopicState } from '@/context/SovereignContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TOPIC_COLORS: Record<TopicState, string> = {
  UNREAD: '#9898b0',
  READ: '#4a9fff',
  PRACTICE: '#e8a030',
  MASTERED: '#1fb97a',
};

const TOPIC_BG: Record<TopicState, string> = {
  UNREAD: 'rgba(152, 152, 176, 0.10)',
  READ: 'rgba(74, 159, 255, 0.10)',
  PRACTICE: 'rgba(232, 160, 48, 0.10)',
  MASTERED: 'rgba(31, 185, 122, 0.10)',
};

const TOPIC_BORDER: Record<TopicState, string> = {
  UNREAD: 'rgba(152, 152, 176, 0.25)',
  READ: 'rgba(74, 159, 255, 0.25)',
  PRACTICE: 'rgba(232, 160, 48, 0.25)',
  MASTERED: 'rgba(31, 185, 122, 0.25)',
};

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// ---------------------------------------------------------------------------
// DeadlineBadge
// ---------------------------------------------------------------------------

function DeadlineBadge({ deadline }: { deadline: string | null }) {
  if (!deadline) {
    return (
      <span
        className="sov-font-mono inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] uppercase tracking-wider"
        style={{ color: '#9898b0', background: 'rgba(152, 152, 176, 0.08)', border: '0.5px solid rgba(152, 152, 176, 0.15)' }}
      >
        No Deadline
      </span>
    );
  }

  const days = daysUntil(deadline);

  let color: string;
  let bg: string;
  let border: string;

  if (days === null || days < 0) {
    color = '#e85050';
    bg = 'rgba(232, 80, 80, 0.10)';
    border = 'rgba(232, 80, 80, 0.25)';
  } else if (days <= 14) {
    color = '#e8a030';
    bg = 'rgba(232, 160, 48, 0.10)';
    border = 'rgba(232, 160, 48, 0.25)';
  } else {
    color = '#9898b0';
    bg = 'rgba(152, 152, 176, 0.08)';
    border = 'rgba(152, 152, 176, 0.15)';
  }

  const label = days === null ? deadline : days < 0 ? `${Math.abs(days)}d overdue` : `${days}d remaining`;

  return (
    <span
      className="sov-font-mono inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] uppercase tracking-wider"
      style={{ color, background: bg, border: `0.5px solid ${border}` }}
    >
      {deadline}
      <span style={{ marginLeft: 4, opacity: 0.7 }}>•</span>
      {label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// PaperCard (collapsed)
// ---------------------------------------------------------------------------

function PaperCard({
  paperId,
  code,
  name,
  masteryPct,
  deadline,
  isStrike,
  onClick,
}: {
  paperId: string;
  code: string;
  name: string;
  masteryPct: number;
  deadline: string | null;
  isStrike: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="dash-card dash-scrollbar group relative w-full cursor-pointer overflow-hidden p-4 text-left"
      style={{
        borderColor: isStrike ? 'rgba(201, 168, 76, 0.4)' : undefined,
        boxShadow: isStrike ? '0 0 12px rgba(201, 168, 76, 0.08)' : undefined,
      }}
    >
      {/* Active Strike indicator */}
      {isStrike && (
        <div
          className="sov-font-mono absolute right-3 top-3 flex items-center gap-1 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            color: '#C9A84C',
            background: 'rgba(201, 168, 76, 0.12)',
            border: '0.5px solid rgba(201, 168, 76, 0.3)',
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A84C', animation: 'pulse-gold 2s ease-in-out infinite' }} />
          Active Strike
        </div>
      )}

      {/* Paper code */}
      <div className="sov-font-mono mb-1 text-[11px] uppercase tracking-wider" style={{ color: '#7c6bff' }}>
        {code}
      </div>

      {/* Paper name */}
      <div className="sov-font-syne mb-3 text-sm font-semibold leading-tight" style={{ color: '#e8e8f0' }}>
        {name}
      </div>

      {/* Mastery bar */}
      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="sov-font-mono text-[10px] uppercase tracking-wider" style={{ color: '#9898b0' }}>
            Mastery
          </span>
          <span className="sov-font-mono text-[11px] font-bold" style={{ color: '#7c6bff' }}>
            {masteryPct}%
          </span>
        </div>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ background: 'rgba(124, 107, 255, 0.1)' }}
        >
          <div
            className="dash-bar-fill h-full rounded-full"
            style={{ width: `${masteryPct}%` }}
          />
        </div>
      </div>

      {/* Deadline badge */}
      <DeadlineBadge deadline={deadline} />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Side Panel
// ---------------------------------------------------------------------------

function SidePanel({
  paperId,
}: {
  paperId: string;
}) {
  const { state, cycleTopic, setDeadline, setStrike, setAcademicPanel, getPaperState, getTopicState } = useSovereign();

  const paper = PAPERS.find((p) => p.paperId === paperId);
  if (!paper) return null;

  const ps = getPaperState(paperId);
  const isStrike = state.selectedStrikePaperId === paperId;

  return (
    <aside
      className="dash-scrollbar absolute right-0 top-0 z-20 flex h-full w-[380px] max-w-full flex-col border-l"
      style={{
        background: '#111114',
        borderColor: 'rgba(124, 107, 255, 0.15)',
        animation: 'fadeUp 0.2s ease-out',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between border-b p-5 pb-4" style={{ borderColor: 'rgba(124, 107, 255, 0.1)' }}>
        <div className="pr-4">
          <div className="sov-font-mono mb-1 text-[11px] uppercase tracking-wider" style={{ color: '#7c6bff' }}>
            {paper.code}
          </div>
          <div className="sov-font-syne text-base font-bold leading-tight" style={{ color: '#e8e8f0' }}>
            {paper.name}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setAcademicPanel(null)}
          className="sov-font-mono flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded text-sm transition-colors hover:bg-white/5"
          style={{ color: '#9898b0' }}
          aria-label="Close panel"
        >
          ✕
        </button>
      </div>

      {/* Scrollable content */}
      <div className="dash-scrollbar flex-1 overflow-y-auto p-5">
        {/* Topic Checklist */}
        <div className="mb-6">
          <div className="sov-font-mono mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#9898b0' }}>
            Topic Progress
          </div>
          <div className="flex flex-col gap-2">
            {paper.topics.map((topic) => {
              const tState = getTopicState(paperId, topic.topicId);
              return (
                <button
                  key={topic.topicId}
                  type="button"
                  onClick={() => cycleTopic(paperId, topic.topicId)}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded px-3 py-2.5 text-left transition-colors"
                  style={{
                    background: TOPIC_BG[tState],
                    border: `0.5px solid ${TOPIC_BORDER[tState]}`,
                  }}
                  aria-label={`Cycle topic ${topic.name} — currently ${tState}`}
                >
                  {/* State dot */}
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-full transition-transform group-hover:scale-125"
                    style={{ background: TOPIC_COLORS[tState] }}
                  />
                  {/* Topic name */}
                  <span className="sov-font-dm flex-1 text-[13px] leading-snug" style={{ color: '#e8e8f0' }}>
                    {topic.name}
                  </span>
                  {/* State label */}
                  <span
                    className="sov-font-mono text-[10px] uppercase tracking-wider transition-opacity group-hover:opacity-80"
                    style={{ color: TOPIC_COLORS[tState] }}
                  >
                    {tState}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mastery bar */}
        <div className="mb-6">
          <div className="mb-1 flex items-center justify-between">
            <span className="sov-font-mono text-[10px] uppercase tracking-wider" style={{ color: '#9898b0' }}>
              Overall Mastery
            </span>
            <span className="sov-font-mono text-[11px] font-bold" style={{ color: '#7c6bff' }}>
              {ps.masteryPct}%
            </span>
          </div>
          <div
            className="h-[4px] w-full overflow-hidden rounded-full"
            style={{ background: 'rgba(124, 107, 255, 0.1)' }}
          >
            <div
              className="dash-bar-fill h-full rounded-full"
              style={{ width: `${ps.masteryPct}%` }}
            />
          </div>
        </div>

        {/* Deadline editor */}
        <div className="mb-6">
          <div className="sov-font-mono mb-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#9898b0' }}>
            Deadline
          </div>
          <input
            type="date"
            value={ps.deadline ?? ''}
            onChange={(e) => setDeadline(paperId, e.target.value || null)}
            className="sov-font-mono w-full cursor-pointer rounded px-3 py-2 text-[12px] outline-none transition-colors"
            style={{
              background: 'rgba(124, 107, 255, 0.08)',
              border: '0.5px solid rgba(124, 107, 255, 0.18)',
              color: '#e8e8f0',
              colorScheme: 'dark',
            }}
          />
        </div>
      </div>

      {/* Footer — Strike button */}
      <div className="border-t p-5 pt-4" style={{ borderColor: 'rgba(124, 107, 255, 0.1)' }}>
        {isStrike ? (
          <div
            className="sov-font-mono flex w-full items-center justify-center gap-2 rounded py-2.5 text-[11px] font-bold uppercase tracking-widest"
            style={{
              color: '#C9A84C',
              background: 'rgba(201, 168, 76, 0.10)',
              border: '0.5px solid rgba(201, 168, 76, 0.25)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C' }} />
            Active Strike ✓
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setStrike(paperId)}
            className="sov-font-mono w-full cursor-pointer rounded py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all hover:brightness-110"
            style={{
              color: '#C9A84C',
              background: 'rgba(201, 168, 76, 0.06)',
              border: '0.5px solid rgba(201, 168, 76, 0.22)',
            }}
          >
            Set as Global Strike
          </button>
        )}
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// AcademicFortressPage
// ---------------------------------------------------------------------------

export default function AcademicFortressPage() {
  const { state, setAcademicPanel, getPaperState } = useSovereign();

  const year1Papers = useMemo(() => PAPERS.filter((p) => p.year === 1), []);
  const year2Papers = useMemo(() => PAPERS.filter((p) => p.year === 2), []);

  const panelOpen = state.academicSidePanel !== null;

  return (
    <section
      className="relative h-full overflow-hidden"
      style={{ background: '#0a0a0b' }}
    >
      {/* Page header */}
      <header className="border-b px-6 py-5" style={{ borderColor: 'rgba(124, 107, 255, 0.1)' }}>
        <h1 className="sov-font-syne text-lg font-bold tracking-tight" style={{ color: '#e8e8f0' }}>
          Academic Fortress
        </h1>
        <p className="sov-font-dm mt-0.5 text-[12px]" style={{ color: '#9898b0' }}>
          {PAPERS.length} papers • {PAPERS.reduce((s, p) => s + p.topics.length, 0)} topics
        </p>
      </header>

      {/* Scrollable body */}
      <div className="dash-scrollbar relative h-[calc(100%-73px)] overflow-y-auto">
        <div className={`p-6 ${panelOpen ? 'pr-[396px]' : ''}`} style={{ transition: 'padding-right 0.25s ease' }}>
          {/* Year 1 */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="sov-font-syne text-xs font-bold uppercase tracking-widest" style={{ color: '#7c6bff' }}>
                Year 1
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(124, 107, 255, 0.1)' }} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {year1Papers.map((paper) => {
                const ps = getPaperState(paper.paperId);
                return (
                  <PaperCard
                    key={paper.paperId}
                    paperId={paper.paperId}
                    code={paper.code}
                    name={paper.name}
                    masteryPct={ps.masteryPct}
                    deadline={ps.deadline}
                    isStrike={state.selectedStrikePaperId === paper.paperId}
                    onClick={() =>
                      setAcademicPanel(
                        state.academicSidePanel === paper.paperId ? null : paper.paperId,
                      )
                    }
                  />
                );
              })}
            </div>
          </div>

          {/* Year 2 */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="sov-font-syne text-xs font-bold uppercase tracking-widest" style={{ color: '#7c6bff' }}>
                Year 2
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(124, 107, 255, 0.1)' }} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {year2Papers.map((paper) => {
                const ps = getPaperState(paper.paperId);
                return (
                  <PaperCard
                    key={paper.paperId}
                    paperId={paper.paperId}
                    code={paper.code}
                    name={paper.name}
                    masteryPct={ps.masteryPct}
                    deadline={ps.deadline}
                    isStrike={state.selectedStrikePaperId === paper.paperId}
                    onClick={() =>
                      setAcademicPanel(
                        state.academicSidePanel === paper.paperId ? null : paper.paperId,
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Side panel */}
        {panelOpen && state.academicSidePanel && (
          <SidePanel paperId={state.academicSidePanel} />
        )}
      </div>
    </section>
  );
}