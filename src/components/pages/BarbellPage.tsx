'use client';

import React, { useState, useCallback } from 'react';
import { useSovereign } from '@/context/SovereignContext';
import { PAPERS, SAT_DATA, UNIVERSITIES, PORTFOLIO_PROJECTS } from '@/data/RESEARCH_DATA';
import type { PaperData, PortfolioProject, University } from '@/data/RESEARCH_DATA';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PaperCard({
  paper,
  paperState,
  isExpanded,
  onToggle,
}: {
  paper: PaperData;
  paperState: { masteryPct: number };
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const gradeA = paper.gradeBoundaries.find((g) => g.grade === 'A');

  return (
    <div
      className="sov-card cursor-pointer p-3 sm:p-4"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className="sov-font-mono text-xs font-bold shrink-0"
              style={{ color: '#C9A84C' }}
            >
              {paper.code}
            </span>
            <span
              className="sov-font-mono text-xs shrink-0"
              style={{
                color: '#7a7570',
                background: 'rgba(201, 168, 76, 0.08)',
                padding: '1px 6px',
                borderRadius: '2px',
              }}
            >
              {paper.subject}
            </span>
          </div>
          <p
            className="sov-font-grotesk mt-1 text-sm font-medium truncate"
            style={{ color: '#F0EDE6' }}
          >
            {paper.name}
          </p>
        </div>

        {/* Mastery mini-bar */}
        <div className="shrink-0 flex flex-col items-end gap-1">
          <span className="sov-font-mono text-xs font-bold" style={{ color: '#F0EDE6' }}>
            {paperState.masteryPct}%
          </span>
          <div
            className="h-1.5 w-12 overflow-hidden"
            style={{ background: 'rgba(201, 168, 76, 0.08)', borderRadius: '2px' }}
          >
            <div
              className="sov-bar-fill h-full"
              style={{ width: `${Math.max(0, Math.min(100, paperState.masteryPct))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grade boundary for A */}
      {gradeA && (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className="sov-font-mono text-xs"
            style={{ color: '#7a7570', textTransform: 'uppercase' }}
          >
            Grade A Boundary
          </span>
          <span
            className="sov-font-mono text-xs font-bold"
            style={{ color: '#C9A84C' }}
          >
            {gradeA.mark}/{gradeA.outOf}
          </span>
        </div>
      )}

      {/* Collapsible 3-Pass Method */}
      {isExpanded && (
        <div
          className="mt-3 border-t pt-3"
          style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}
        >
          <span
            className="sov-font-mono block text-xs font-bold tracking-wider mb-2"
            style={{ color: '#C9A84C', textTransform: 'uppercase' }}
          >
            3-Pass Preparation Method
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span
                className="sov-font-mono shrink-0 text-xs font-bold"
                style={{ color: '#C9A84C', background: 'rgba(201, 168, 76, 0.1)', padding: '2px 6px', borderRadius: '2px' }}
              >
                PASS 1
              </span>
              <span className="sov-font-mono text-xs" style={{ color: '#F0EDE6' }}>
                {paper.prepMethod.pass1}
              </span>
            </div>
            <div className="flex gap-2">
              <span
                className="sov-font-mono shrink-0 text-xs font-bold"
                style={{ color: '#C9A84C', background: 'rgba(201, 168, 76, 0.1)', padding: '2px 6px', borderRadius: '2px' }}
              >
                PASS 2
              </span>
              <span className="sov-font-mono text-xs" style={{ color: '#F0EDE6' }}>
                {paper.prepMethod.pass2}
              </span>
            </div>
            <div className="flex gap-2">
              <span
                className="sov-font-mono shrink-0 text-xs font-bold"
                style={{ color: '#C9A84C', background: 'rgba(201, 168, 76, 0.1)', padding: '2px 6px', borderRadius: '2px' }}
              >
                PASS 3
              </span>
              <span className="sov-font-mono text-xs" style={{ color: '#F0EDE6' }}>
                {paper.prepMethod.pass3}
              </span>
            </div>
          </div>

          {/* Topics list */}
          <div className="mt-3">
            <span
              className="sov-font-mono block text-xs font-bold tracking-wider mb-2"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Topics ({paper.topics.length})
            </span>
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto sov-scrollbar">
              {paper.topics.map((t) => (
                <div key={t.topicId} className="flex items-center gap-2">
                  <span className="sov-font-mono text-xs" style={{ color: '#7a7570' }}>
                    {t.name}
                  </span>
                  <span
                    className="sov-font-mono text-xs ml-auto shrink-0"
                    style={{ color: '#C9A84C' }}
                  >
                    {t.subComponents.reduce((s, c) => s + c.estimatedHours, 0)}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SATBlock() {
  return (
    <div className="sov-card p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <span
          className="sov-font-mono text-xs font-bold tracking-widest"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          SAT Strategy
        </span>
        <span
          className="sov-font-mono text-xs"
          style={{
            color: '#0a0908',
            background: '#C9A84C',
            padding: '2px 8px',
            borderRadius: '2px',
            fontWeight: 700,
          }}
        >
          TARGET {SAT_DATA.targetScore}
        </span>
      </div>

      {/* Section breakdown */}
      <div className="flex flex-col gap-4 mb-4">
        {SAT_DATA.sections.map((sec) => (
          <div key={sec.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="sov-font-mono text-sm font-bold" style={{ color: '#F0EDE6' }}>
                {sec.name}
              </span>
              <span className="sov-font-mono text-sm font-bold" style={{ color: '#C9A84C' }}>
                {sec.targetScore}
              </span>
            </div>
            <ul className="flex flex-col gap-1 mb-2">
              {sec.topicBreakdown.map((topic, i) => (
                <li
                  key={i}
                  className="sov-font-mono text-xs leading-relaxed"
                  style={{ color: '#7a7570' }}
                >
                  {topic}
                </li>
              ))}
            </ul>
            <p
              className="sov-font-mono text-xs leading-relaxed"
              style={{ color: '#F0EDE6', opacity: 0.7 }}
            >
              {sec.prepNotes}
            </p>
          </div>
        ))}
      </div>

      {/* Prep Resources */}
      <div className="border-t pt-4 mb-4" style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}>
        <span
          className="sov-font-mono block text-xs font-bold tracking-wider mb-3"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Prep Resources
        </span>
        <div className="flex flex-col gap-2">
          {SAT_DATA.prepResources.map((r, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <span className="sov-font-mono text-xs font-bold" style={{ color: '#F0EDE6' }}>
                  {r.name}
                </span>
                <span
                  className="sov-font-mono text-xs shrink-0"
                  style={{
                    color: r.cost === 'Free' ? '#1fb97a' : '#7a7570',
                  }}
                >
                  {r.cost}
                </span>
              </div>
              <span className="sov-font-mono text-xs" style={{ color: '#7a7570' }}>
                {r.notes}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Timeline */}
      <div className="border-t pt-4" style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}>
        <span
          className="sov-font-mono block text-xs font-bold tracking-wider mb-2"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Recommended Timeline
        </span>
        <p
          className="sov-font-mono text-xs leading-relaxed"
          style={{ color: '#F0EDE6', opacity: 0.7 }}
        >
          {SAT_DATA.recommendedTimeline}
        </p>
      </div>
    </div>
  );
}

type UniCategory = 'ALL' | 'DREAM' | 'REACH' | 'TARGET' | 'SAFETY' | 'BACKUP';

function UniversityBlock() {
  const [filter, setFilter] = useState<UniCategory>('ALL');

  const categories: UniCategory[] = ['ALL', 'DREAM', 'REACH', 'TARGET', 'SAFETY', 'BACKUP'];

  const filtered =
    filter === 'ALL'
      ? UNIVERSITIES
      : UNIVERSITIES.filter((u) => u.category === filter);

  return (
    <div className="sov-card p-4 sm:p-6">
      <span
        className="sov-font-mono block text-xs font-bold tracking-widest mb-4"
        style={{ color: '#C9A84C', textTransform: 'uppercase' }}
      >
        University Targeting
      </span>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="sov-font-mono cursor-pointer text-xs px-2.5 py-1 transition-all"
            style={{
              background: filter === cat ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
              color: filter === cat ? '#C9A84C' : '#7a7570',
              border: `0.5px solid ${filter === cat ? 'rgba(201, 168, 76, 0.4)' : 'rgba(201, 168, 76, 0.08)'}`,
              borderRadius: '3px',
              fontWeight: filter === cat ? 700 : 400,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* University Grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 max-h-[600px] overflow-y-auto sov-scrollbar"
      >
        {filtered.map((uni: University) => (
          <div
            key={uni.uniId}
            className="p-3 transition-all"
            style={{
              background: 'rgba(201, 168, 76, 0.03)',
              border: '0.5px solid rgba(201, 168, 76, 0.1)',
              borderRadius: '4px',
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="sov-font-grotesk text-sm font-bold" style={{ color: '#F0EDE6' }}>
                {uni.name}
              </span>
              <span
                className="sov-font-mono shrink-0 text-xs font-bold"
                style={{
                  color: uni.category === 'DREAM' ? '#e85050' : uni.category === 'REACH' ? '#e8a030' : uni.category === 'TARGET' ? '#C9A84C' : '#1fb97a',
                  background: uni.category === 'DREAM' ? 'rgba(232, 80, 80, 0.1)' : uni.category === 'REACH' ? 'rgba(232, 160, 48, 0.1)' : uni.category === 'TARGET' ? 'rgba(201, 168, 76, 0.1)' : 'rgba(31, 185, 122, 0.1)',
                  padding: '1px 6px',
                  borderRadius: '2px',
                }}
              >
                {uni.category}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="sov-font-mono text-xs" style={{ color: '#7a7570' }}>
                  {uni.country}
                </span>
                <span className="sov-font-mono text-xs" style={{ color: '#7a7570' }}>
                  &middot;
                </span>
                <span className="sov-font-mono text-xs font-bold" style={{ color: '#C9A84C' }}>
                  QS #{uni.qsRank2024}
                </span>
              </div>
              <p className="sov-font-mono text-xs" style={{ color: '#F0EDE6', opacity: 0.7 }}>
                {uni.quantProgram}
              </p>
              {uni.scholarship && (
                <div
                  className="mt-2 border-t pt-2"
                  style={{ borderColor: 'rgba(201, 168, 76, 0.08)' }}
                >
                  <span className="sov-font-mono text-xs font-bold" style={{ color: '#C9A84C' }}>
                    {uni.scholarship.name}
                  </span>
                  <p className="sov-font-mono text-xs" style={{ color: '#F0EDE6', opacity: 0.6 }}>
                    {uni.scholarship.value}
                  </p>
                  <p className="sov-font-mono text-xs" style={{ color: '#7a7570' }}>
                    {uni.scholarship.eligibility}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="sov-font-mono text-sm text-center py-8" style={{ color: '#7a7570' }}>
          No universities in this category.
        </p>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  isCompleted,
  onToggle,
}: {
  project: PortfolioProject;
  isCompleted: boolean;
  onToggle: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="sov-card overflow-hidden"
      style={{
        opacity: isCompleted ? 0.6 : 1,
        border: isCompleted ? '0.5px solid rgba(31, 185, 122, 0.3)' : undefined,
      }}
    >
      {/* Card header — clickable to expand */}
      <div
        className="flex items-start gap-3 p-3 sm:p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      >
        {/* Completion checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="mt-0.5 shrink-0 h-5 w-5 flex items-center justify-center cursor-pointer transition-all"
          style={{
            border: `1.5px solid ${isCompleted ? '#1fb97a' : 'rgba(201, 168, 76, 0.3)'}`,
            background: isCompleted ? 'rgba(31, 185, 122, 0.15)' : 'transparent',
            borderRadius: '3px',
          }}
          aria-label={`Toggle completion for ${project.name}`}
        >
          {isCompleted && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1fb97a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="sov-font-mono text-xs font-bold shrink-0"
              style={{
                color: project.category === 'QUANT_PORTFOLIO' ? '#C9A84C'
                  : project.category === 'DATA_MODELLING' ? '#7c6bff'
                  : project.category === 'ALGO_THINKING' ? '#e8a030'
                  : '#4a9fff',
                background: project.category === 'QUANT_PORTFOLIO' ? 'rgba(201, 168, 76, 0.08)'
                  : project.category === 'DATA_MODELLING' ? 'rgba(124, 107, 255, 0.08)'
                  : project.category === 'ALGO_THINKING' ? 'rgba(232, 160, 48, 0.08)'
                  : 'rgba(74, 159, 255, 0.08)',
                padding: '1px 6px',
                borderRadius: '2px',
              }}
            >
              {project.category}
            </span>
          </div>
          <p
            className="sov-font-grotesk mt-1 text-sm font-bold"
            style={{ color: '#F0EDE6', textDecoration: isCompleted ? 'line-through' : 'none' }}
          >
            {project.name}
          </p>
        </div>

        {/* Expand/collapse chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7a7570"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 mt-1 transition-transform"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          className="border-t px-3 pb-4 pt-3 sm:px-4"
          style={{ borderColor: 'rgba(201, 168, 76, 0.1)' }}
        >
          <div className="flex flex-col gap-4">
            {/* What */}
            <div>
              <span
                className="sov-font-mono block text-xs font-bold tracking-wider mb-1.5"
                style={{ color: '#C9A84C', textTransform: 'uppercase' }}
              >
                What
              </span>
              <p className="sov-font-mono text-xs leading-relaxed" style={{ color: '#F0EDE6', opacity: 0.8 }}>
                {project.what}
              </p>
            </div>

            {/* Why */}
            <div>
              <span
                className="sov-font-mono block text-xs font-bold tracking-wider mb-1.5"
                style={{ color: '#C9A84C', textTransform: 'uppercase' }}
              >
                Why
              </span>
              <p className="sov-font-mono text-xs leading-relaxed" style={{ color: '#F0EDE6', opacity: 0.8 }}>
                {project.why}
              </p>
            </div>

            {/* Why Not Alternatives */}
            <div>
              <span
                className="sov-font-mono block text-xs font-bold tracking-wider mb-1.5"
                style={{ color: '#C9A84C', textTransform: 'uppercase' }}
              >
                Why Not Alternatives
              </span>
              <p className="sov-font-mono text-xs leading-relaxed" style={{ color: '#F0EDE6', opacity: 0.8 }}>
                {project.whyNotAlternatives}
              </p>
            </div>

            {/* Knowledge Base */}
            <div>
              <span
                className="sov-font-mono block text-xs font-bold tracking-wider mb-2"
                style={{ color: '#C9A84C', textTransform: 'uppercase' }}
              >
                Knowledge Base
              </span>
              <ol className="flex flex-col gap-1.5">
                {project.knowledgeBase.map((kb, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="sov-font-mono text-xs shrink-0" style={{ color: '#7a7570' }}>
                      {i + 1}.
                    </span>
                    <span className="sov-font-mono text-xs" style={{ color: '#F0EDE6', opacity: 0.7 }}>
                      {kb}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Barbell Page
// ---------------------------------------------------------------------------

export default function BarbellPage() {
  const { state, setBarbellExpanded, toggleProject } = useSovereign();

  const handlePaperToggle = useCallback(
    (paperId: string) => {
      setBarbellExpanded(state.barbellExpandedPaper === paperId ? null : paperId);
    },
    [state.barbellExpandedPaper, setBarbellExpanded],
  );

  const year1Papers = PAPERS.filter((p) => p.year === 1);
  const year2Papers = PAPERS.filter((p) => p.year === 2);

  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8" style={{ backgroundColor: '#0a0908' }}>
      {/* Page Header */}
      <header className="mb-8">
        <h1
          className="sov-font-grotesk text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          style={{ color: '#F0EDE6' }}
        >
          Barbell Strategy
        </h1>
        <p
          className="sov-font-mono mt-1 text-xs tracking-widest"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Tier 1 &middot; Sovereign Aesthetic
        </p>
      </header>

      {/* ===== NODE 01 · INSTITUTIONAL FLOOR ===== */}
      <section className="mb-6 relative" aria-label="Institutional Floor">
        {/* Ghost watermark */}
        <span className="ghost-letter" style={{ top: '8px', right: '16px' }}>FLOOR</span>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="sov-font-grotesk text-lg font-bold sm:text-xl"
            style={{ color: '#C9A84C' }}
          >
            Node 01
          </span>
          <span
            className="sov-font-mono text-xs tracking-widest"
            style={{ color: '#F0EDE6', opacity: 0.5, textTransform: 'uppercase' }}
          >
            Institutional Floor
          </span>
        </div>

        {/* A-Level Block */}
        <div className="mb-6">
          <h2
            className="sov-font-mono mb-3 text-xs font-bold tracking-widest"
            style={{ color: '#C9A84C', textTransform: 'uppercase' }}
          >
            A-Level Papers ({PAPERS.length})
          </h2>

          {/* Year 1 */}
          <div className="mb-4">
            <span
              className="sov-font-mono block text-xs tracking-wider mb-2"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Year 1 — AS Level
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 items-start">
              {year1Papers.map((paper) => (
                <PaperCard
                  key={paper.paperId}
                  paper={paper}
                  paperState={state.paperStates[paper.paperId] || { masteryPct: 0 }}
                  isExpanded={state.barbellExpandedPaper === paper.paperId}
                  onToggle={() => handlePaperToggle(paper.paperId)}
                />
              ))}
            </div>
          </div>

          {/* Year 2 */}
          <div>
            <span
              className="sov-font-mono block text-xs tracking-wider mb-2"
              style={{ color: '#7a7570', textTransform: 'uppercase' }}
            >
              Year 2 — A Level
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 items-start">
              {year2Papers.map((paper) => (
                <PaperCard
                  key={paper.paperId}
                  paper={paper}
                  paperState={state.paperStates[paper.paperId] || { masteryPct: 0 }}
                  isExpanded={state.barbellExpandedPaper === paper.paperId}
                  onToggle={() => handlePaperToggle(paper.paperId)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SAT Block */}
        <div className="mb-6">
          <h2
            className="sov-font-mono mb-3 text-xs font-bold tracking-widest"
            style={{ color: '#C9A84C', textTransform: 'uppercase' }}
          >
            SAT Preparation
          </h2>
          <SATBlock />
        </div>

        {/* University Block */}
        <div>
          <h2
            className="sov-font-mono mb-3 text-xs font-bold tracking-widest"
            style={{ color: '#C9A84C', textTransform: 'uppercase' }}
          >
            University Targeting ({UNIVERSITIES.length})
          </h2>
          <UniversityBlock />
        </div>
      </section>

      {/* ===== PULSING CONNECTOR ===== */}
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center gap-4" style={{ width: '100%', maxWidth: '200px' }}>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3))' }} />
          <div className="connector-dot" />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201, 168, 76, 0.3), transparent)' }} />
        </div>
      </div>

      {/* ===== NODE 02 · ASYMMETRIC CEILING ===== */}
      <section className="relative" aria-label="Asymmetric Ceiling">
        {/* Ghost watermark */}
        <span className="ghost-letter" style={{ top: '8px', right: '16px' }}>CEILING</span>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="sov-font-grotesk text-lg font-bold sm:text-xl"
            style={{ color: '#C9A84C' }}
          >
            Node 02
          </span>
          <span
            className="sov-font-mono text-xs tracking-widest"
            style={{ color: '#F0EDE6', opacity: 0.5, textTransform: 'uppercase' }}
          >
            Asymmetric Ceiling
          </span>
        </div>

        <h2
          className="sov-font-mono mb-3 text-xs font-bold tracking-widest"
          style={{ color: '#C9A84C', textTransform: 'uppercase' }}
        >
          Portfolio Projects ({PORTFOLIO_PROJECTS.length})
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 items-start">
          {PORTFOLIO_PROJECTS.map((proj) => (
            <ProjectCard
              key={proj.projectId}
              project={proj}
              isCompleted={state.projectCompletions[proj.projectId]?.completed ?? false}
              onToggle={() => toggleProject(proj.projectId)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}