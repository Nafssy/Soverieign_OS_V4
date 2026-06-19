'use client';

import React, { useMemo } from 'react';
import { PAPERS } from '@/data/RESEARCH_DATA';
import { useSovereign } from '@/context/SovereignContext';
import type { TopicState } from '@/context/SovereignContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const STATE_BADGE_STYLES: Record<TopicState, { color: string; bg: string; border: string }> = {
  UNREAD: { color: '#9898b0', bg: 'rgba(152, 152, 176, 0.08)', border: 'rgba(152, 152, 176, 0.2)' },
  READ: { color: '#4a9fff', bg: 'rgba(74, 159, 255, 0.08)', border: 'rgba(74, 159, 255, 0.2)' },
  PRACTICE: { color: '#e8a030', bg: 'rgba(232, 160, 48, 0.08)', border: 'rgba(232, 160, 48, 0.2)' },
  MASTERED: { color: '#1fb97a', bg: 'rgba(31, 185, 122, 0.08)', border: 'rgba(31, 185, 122, 0.2)' },
};

// ---------------------------------------------------------------------------
// NoStrikeState
// ---------------------------------------------------------------------------

function NoStrikeState({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ background: '#0a0908' }}
    >
      {/* Decorative crosshair */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full" style={{ border: '0.5px solid rgba(201, 168, 76, 0.15)' }} />
        <div className="absolute inset-3 rounded-full" style={{ border: '0.5px solid rgba(201, 168, 76, 0.10)' }} />
        <div
          className="h-1 w-1 rounded-full"
          style={{ background: '#C9A84C', animation: 'pulse-gold 2s ease-in-out infinite' }}
        />
      </div>

      <div>
        <h2
          className="sov-font-grotesk mb-2 text-xl font-bold tracking-tight"
          style={{ color: '#F0EDE6' }}
        >
          NO STRIKE SELECTED
        </h2>
        <p
          className="sov-font-dm mx-auto max-w-md text-[13px] leading-relaxed"
          style={{ color: '#7a7570' }}
        >
          Navigate to Academic Fortress and set a paper as your Global Strike to activate the engagement playbook.
        </p>
      </div>

      <button
        type="button"
        onClick={onNavigate}
        className="sov-font-mono cursor-pointer rounded px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all hover:brightness-110"
        style={{
          color: '#0a0908',
          background: '#C9A84C',
          border: 'none',
        }}
      >
        Open Academic Fortress
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// StrikeCard — individual engagement topic card
// ---------------------------------------------------------------------------

function StrikeCard({
  topicName,
  topicState,
  subComponents,
}: {
  topicName: string;
  topicState: TopicState;
  subComponents: { name: string; estimatedHours: number }[];
}) {
  const totalHours = subComponents.reduce((s, sc) => s + sc.estimatedHours, 0);

  return (
    <div
      className="sov-card relative p-5"
      style={{
        borderColor: topicState === 'READ'
          ? 'rgba(74, 159, 255, 0.22)'
          : 'rgba(201, 168, 76, 0.18)',
      }}
    >
      {/* Topic name + state */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className="sov-font-grotesk flex-1 text-sm font-semibold"
          style={{ color: '#F0EDE6' }}
        >
          {topicName}
        </div>
        <span
          className="sov-font-mono rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
          style={{
            color: STATE_BADGE_STYLES[topicState].color,
            background: STATE_BADGE_STYLES[topicState].bg,
            border: `0.5px solid ${STATE_BADGE_STYLES[topicState].border}`,
          }}
        >
          {topicState}
        </span>
      </div>

      {/* Step 1 — Error Extraction */}
      <div className="mb-4 rounded px-3.5 py-2.5" style={{ background: 'rgba(201, 168, 76, 0.04)', border: '0.5px solid rgba(201, 168, 76, 0.08)' }}>
        <div className="sov-font-mono mb-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
          Step 1 — Error Extraction
        </div>
        <p className="sov-font-dm text-[12px] leading-relaxed" style={{ color: '#7a7570' }}>
          Identify what you got wrong last time. Write it down before opening a new example.
        </p>
      </div>

      {/* Step 2 — Focus Splitting */}
      <div className="mb-4">
        <div className="sov-font-mono mb-2 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
          Step 2 — Focus Splitting
        </div>
        <div className="flex flex-col gap-1.5">
          {subComponents.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded px-3 py-1.5"
              style={{ background: 'rgba(201, 168, 76, 0.03)' }}
            >
              <span className="sov-font-dm text-[12px]" style={{ color: '#F0EDE6' }}>
                {sc.name}
              </span>
              <span className="sov-font-mono text-[10px]" style={{ color: '#7a7570' }}>
                {sc.estimatedHours}h
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3 — Speed Audit */}
      <div className="rounded px-3.5 py-2.5" style={{ background: 'rgba(201, 168, 76, 0.04)', border: '0.5px solid rgba(201, 168, 76, 0.08)' }}>
        <div className="sov-font-mono mb-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
          Step 3 — Speed Audit
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="sov-font-grotesk text-lg font-bold" style={{ color: '#C9A84C' }}>
            {totalHours}
          </span>
          <span className="sov-font-mono text-[11px]" style={{ color: '#7a7570' }}>
            estimated hours
          </span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CompletedBadge
// ---------------------------------------------------------------------------

function CompletedBadge({ state }: { state: TopicState }) {
  const s = STATE_BADGE_STYLES[state];
  return (
    <span
      className="sov-font-mono rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest"
      style={{
        color: s.color,
        background: s.bg,
        border: `0.5px solid ${s.border}`,
      }}
    >
      {state}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ActiveStrikeView
// ---------------------------------------------------------------------------

function ActiveStrikeView() {
  const { state, getPaperState, getTopicState } = useSovereign();

  const paper = PAPERS.find((p) => p.paperId === state.selectedStrikePaperId);
  if (!paper) return null;

  const ps = getPaperState(paper.paperId);
  const deadline = ps.deadline;
  const days = daysUntil(deadline);

  // Split topics
  const activeTopics = useMemo(() => {
    return paper.topics.filter((t) => {
      const st = getTopicState(paper.paperId, t.topicId);
      return st === 'UNREAD' || st === 'READ';
    });
  }, [paper, paper.paperId, getTopicState]);

  const completedTopics = useMemo(() => {
    return paper.topics.filter((t) => {
      const st = getTopicState(paper.paperId, t.topicId);
      return st === 'PRACTICE' || st === 'MASTERED';
    });
  }, [paper, paper.paperId, getTopicState]);

  const masteredCount = ps.topicProgress.filter((tp) => tp.state === 'MASTERED').length;
  const totalTopics = paper.topics.length;
  const masteryPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;

  // Countdown styling
  let countdownColor = '#C9A84C';
  let countdownLabel = '';
  if (days === null) {
    countdownLabel = 'No deadline set';
    countdownColor = '#7a7570';
  } else if (days < 0) {
    countdownColor = '#e85050';
    countdownLabel = `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
  } else if (days === 0) {
    countdownColor = '#e85050';
    countdownLabel = 'Due today';
  } else {
    countdownLabel = `${days} day${days !== 1 ? 's' : ''} remaining`;
    if (days <= 7) countdownColor = '#e85050';
    else if (days <= 14) countdownColor = '#e8a030';
  }

  return (
    <div
      className="sov-scrollbar h-full overflow-y-auto"
      style={{ background: '#0a0908' }}
    >
      <div className="mx-auto max-w-3xl px-6 py-6">
        {/* ── Strike Box Header ─────────────────────────────────────── */}
        <div
          className="mb-6 p-5"
          style={{
            background: '#111009',
            border: '0.5px solid rgba(201, 168, 76, 0.18)',
            borderRadius: 6,
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="sov-font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
                  {paper.code}
                </span>
                <span className="sov-font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(201, 168, 76, 0.4)' }}>
                  •
                </span>
                <span
                  className="sov-font-mono text-[9px] uppercase tracking-widest"
                  style={{ color: '#C9A84C', animation: 'pulse-gold 2s ease-in-out infinite' }}
                >
                  Global Strike
                </span>
              </div>
              <h1 className="sov-font-grotesk text-xl font-bold tracking-tight" style={{ color: '#F0EDE6' }}>
                {paper.name}
              </h1>
            </div>
            {deadline && (
              <div className="flex flex-col items-end">
                <span className="sov-font-mono text-[10px] uppercase tracking-wider" style={{ color: '#7a7570' }}>
                  {deadline}
                </span>
                <span className="sov-font-grotesk text-sm font-bold" style={{ color: countdownColor }}>
                  {countdownLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Mastery Overview ──────────────────────────────────────── */}
        <div
          className="mb-6 p-4"
          style={{
            background: '#111009',
            border: '0.5px solid rgba(201, 168, 76, 0.12)',
            borderRadius: 6,
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="sov-font-mono text-[10px] uppercase tracking-widest" style={{ color: '#7a7570' }}>
              Mastery Overview
            </span>
            <span className="sov-font-grotesk text-sm font-bold" style={{ color: '#C9A84C' }}>
              {masteredCount} of {totalTopics} MASTERED
            </span>
          </div>
          <div
            className="h-[4px] w-full overflow-hidden rounded-full"
            style={{ background: 'rgba(201, 168, 76, 0.08)' }}
          >
            <div
              className="sov-bar-fill h-full rounded-full"
              style={{ width: `${masteryPct}%` }}
            />
          </div>
        </div>

        {/* ── Engagement Playbook ───────────────────────────────────── */}
        {activeTopics.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="sov-font-grotesk text-xs font-bold uppercase tracking-widest" style={{ color: '#C9A84C' }}>
                Engagement Playbook
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(201, 168, 76, 0.1)' }} />
              <span className="sov-font-mono text-[10px]" style={{ color: '#7a7570' }}>
                {activeTopics.length} topic{activeTopics.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {activeTopics.map((topic) => (
                <StrikeCard
                  key={topic.topicId}
                  topicName={topic.name}
                  topicState={getTopicState(paper.paperId, topic.topicId)}
                  subComponents={topic.subComponents}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Completed Topics ──────────────────────────────────────── */}
        {completedTopics.length > 0 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <div className="sov-font-grotesk text-xs font-bold uppercase tracking-widest" style={{ color: '#7a7570' }}>
                Completed
              </div>
              <div className="h-px flex-1" style={{ background: 'rgba(201, 168, 76, 0.06)' }} />
            </div>
            <div
              className="flex flex-col gap-1 rounded p-3"
              style={{
                background: '#111009',
                border: '0.5px solid rgba(201, 168, 76, 0.06)',
              }}
            >
              {completedTopics.map((topic) => (
                <div
                  key={topic.topicId}
                  className="flex items-center justify-between rounded px-2 py-1.5"
                >
                  <span className="sov-font-dm text-[12px]" style={{ color: '#7a7570' }}>
                    {topic.name}
                  </span>
                  <CompletedBadge state={getTopicState(paper.paperId, topic.topicId)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── All complete ──────────────────────────────────────────── */}
        {activeTopics.length === 0 && completedTopics.length > 0 && (
          <div className="mb-8 flex flex-col items-center gap-3 py-10 text-center">
            <div
              className="sov-font-grotesk text-base font-bold"
              style={{ color: '#C9A84C' }}
            >
              All topics in practice or mastered
            </div>
            <p className="sov-font-dm text-[12px]" style={{ color: '#7a7570' }}>
              Every topic in this strike paper has progressed beyond the initial reading phase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TacticalStrikePage (main export)
// ---------------------------------------------------------------------------

export default function TacticalStrikePage() {
  const { state, navigate } = useSovereign();

  if (!state.selectedStrikePaperId) {
    return <NoStrikeState onNavigate={() => navigate('academic')} />;
  }

  return <ActiveStrikeView />;
}