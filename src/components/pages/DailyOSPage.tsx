'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useSovereign } from '@/context/SovereignContext';
import { PAPERS } from '@/data/RESEARCH_DATA';
import type { AcademicBlock, CustomBlock } from '@/context/SovereignContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Pixel constants for the timeline overlay. ROW_HEIGHT must exactly match
// `.hour-row { height: ... }` in globals.css, or block boxes will drift out
// of alignment with the hour grid lines.
const ROW_HEIGHT = 40;
const TIME_LABEL_WIDTH = 110;

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  // month is 0-indexed
  const feb = isLeapYear(year) ? 29 : 28;
  return [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function toISODate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatSelectedDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase();
}

function padHour(h: number): string {
  return String(h).padStart(2, '0');
}

// ---------------------------------------------------------------------------
// Subject options for modal
// ---------------------------------------------------------------------------

const SUBJECT_OPTIONS = [
  { value: 'MATHS', label: 'Maths' },
  { value: 'FURTHER_MATHS', label: 'Further Maths' },
  { value: 'ECONOMICS', label: 'Economics' },
  { value: 'PHYSICS', label: 'Physics' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DailyOSPage() {
  const { state, setSelectedDate, addBlock, removeBlock, getDayLog } = useSovereign();

  // Local month/year navigation
  const [navYear, setNavYear] = useState(() => new Date().getFullYear());
  const [navMonth, setNavMonth] = useState(() => new Date().getMonth());

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'ACADEMIC' | 'CUSTOM'>('ACADEMIC');

  // Academic form state
  const [formSubject, setFormSubject] = useState('');
  const [formPaper, setFormPaper] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formStartH, setFormStartH] = useState<number | ''>('');
  const [formEndH, setFormEndH] = useState<number | ''>('');

  // Custom form state
  const [customTitle, setCustomTitle] = useState('');
  const [customStartH, setCustomStartH] = useState<number | ''>('');
  const [customEndH, setCustomEndH] = useState<number | ''>('');

  // Error state
  const [formError, setFormError] = useState('');

  const todayStr = useMemo(() => getTodayISO(), []);

  // ---- Calendar grid ----
  const calendarDays = useMemo(() => {
    const firstDay = new Date(navYear, navMonth, 1).getDay(); // 0=Sun
    const offset = firstDay === 0 ? 6 : firstDay - 1; // convert to Mon=0
    const totalDays = daysInMonth(navYear, navMonth);
    const cells: { day: number; iso: string }[] = [];

    for (let d = 1; d <= totalDays; d++) {
      cells.push({ day: d, iso: toISODate(navYear, navMonth, d) });
    }
    return { offset, cells };
  }, [navYear, navMonth]);

  const prevMonth = useCallback(() => {
    if (navMonth === 0) {
      setNavMonth(11);
      setNavYear((y) => y - 1);
    } else {
      setNavMonth((m) => m - 1);
    }
  }, [navMonth]);

  const nextMonth = useCallback(() => {
    if (navMonth === 11) {
      setNavMonth(0);
      setNavYear((y) => y + 1);
    } else {
      setNavMonth((m) => m + 1);
    }
  }, [navMonth]);

  // ---- Timeline data ----
  const dayLog = useMemo(() => getDayLog(state.selectedDate), [state.selectedDate, getDayLog]);

  // ---- Form helpers ----
  const filteredPapers = useMemo(
    () => (formSubject ? PAPERS.filter((p) => p.subject === formSubject) : []),
    [formSubject],
  );

  const selectedPaperData = useMemo(
    () => PAPERS.find((p) => p.paperId === formPaper) || null,
    [formPaper],
  );

  const filteredTopics = useMemo(
    () => (selectedPaperData ? selectedPaperData.topics : []),
    [selectedPaperData],
  );

  const resetForm = useCallback(() => {
    setFormSubject('');
    setFormPaper('');
    setFormTopic('');
    setFormStartH('');
    setFormEndH('');
    setCustomTitle('');
    setCustomStartH('');
    setCustomEndH('');
    setFormError('');
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    resetForm();
  }, [resetForm]);

  const openModal = useCallback(() => {
    setModalOpen(true);
    setModalTab('ACADEMIC');
    resetForm();
  }, [resetForm]);

  const checkOverlap = useCallback(
    (start: number, end: number): boolean => {
      return dayLog.blocks.some(
        (b) => start < b.endHour && end > b.startHour,
      );
    },
    [dayLog],
  );

  const commitBlock = useCallback(() => {
    if (modalTab === 'ACADEMIC') {
      if (!formSubject || !formPaper || !formTopic || formStartH === '' || formEndH === '') {
        setFormError('All fields are required.');
        return;
      }
      if (formEndH <= formStartH) {
        setFormError('End hour must be greater than start hour.');
        return;
      }
      if (checkOverlap(formStartH, formEndH)) {
        setFormError('This block overlaps with an existing block.');
        return;
      }

      const block: AcademicBlock = {
        id: crypto.randomUUID(),
        type: 'ACADEMIC',
        subjectId: formSubject,
        paperId: formPaper,
        topicId: formTopic,
        startHour: formStartH,
        endHour: formEndH,
      };
      addBlock(state.selectedDate, block);
      closeModal();
    } else {
      if (!customTitle.trim() || customStartH === '' || customEndH === '') {
        setFormError('Title and hours are required.');
        return;
      }
      if (customEndH <= customStartH) {
        setFormError('End hour must be greater than start hour.');
        return;
      }
      if (checkOverlap(customStartH, customEndH)) {
        setFormError('This block overlaps with an existing block.');
        return;
      }

      const block: CustomBlock = {
        id: crypto.randomUUID(),
        type: 'CUSTOM',
        title: customTitle.trim(),
        startHour: customStartH,
        endHour: customEndH,
      };
      addBlock(state.selectedDate, block);
      closeModal();
    }
  }, [
    modalTab, formSubject, formPaper, formTopic, formStartH, formEndH,
    customTitle, customStartH, customEndH,
    checkOverlap, addBlock, state.selectedDate, closeModal,
  ]);

  // ---- Lookup helpers ----
  const lookupTopicName = useCallback((paperId: string, topicId: string): string => {
    const paper = PAPERS.find((p) => p.paperId === paperId);
    if (!paper) return topicId;
    const topic = paper.topics.find((t) => t.topicId === topicId);
    return topic ? topic.name : topicId;
  }, []);

  const lookupSubjectLabel = useCallback((subjectId: string): string => {
    const map: Record<string, string> = {
      MATHS: 'Maths',
      FURTHER_MATHS: 'F. Maths',
      ECONOMICS: 'Economics',
      PHYSICS: 'Physics',
    };
    return map[subjectId] || subjectId;
  }, []);

  // ---- Hour options ----
  const startHourOptions = useMemo(() => {
    const opts: { value: number; label: string }[] = [];
    for (let h = 0; h <= 23; h++) {
      opts.push({ value: h, label: `${padHour(h)}:00` });
    }
    return opts;
  }, []);

  const endHourOptionsAcademic = useMemo(() => {
    if (formStartH === '' || formStartH === undefined) return [];
    const opts: { value: number; label: string }[] = [];
    for (let h = (formStartH as number) + 1; h <= 24; h++) {
      opts.push({ value: h, label: h === 24 ? '24:00' : `${padHour(h)}:00` });
    }
    return opts;
  }, [formStartH]);

  const endHourOptionsCustom = useMemo(() => {
    if (customStartH === '' || customStartH === undefined) return [];
    const opts: { value: number; label: string }[] = [];
    for (let h = (customStartH as number) + 1; h <= 24; h++) {
      opts.push({ value: h, label: h === 24 ? '24:00' : `${padHour(h)}:00` });
    }
    return opts;
  }, [customStartH]);

  // ===========================================================================
  // RENDER
  // ===========================================================================

  return (
    <div className="flex h-full" style={{ background: '#0a0a0b' }}>
      {/* ========== LEFT PANEL — Month Grid ========== */}
      <aside
        className="flex-shrink-0 flex flex-col border-r p-4"
        style={{
          width: 320,
          borderColor: 'rgba(124, 107, 255, 0.1)',
          background: '#0a0a0b',
        }}
      >
        {/* Month / Year Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="text-dash-text-sec hover:text-dash-nafs transition-colors sov-font-mono text-sm px-2 py-1"
            aria-label="Previous month"
          >
            &lt;
          </button>
          <h2 className="sov-font-syne text-dash-text font-semibold text-sm tracking-wide">
            {MONTH_NAMES[navMonth]} {navYear}
          </h2>
          <button
            onClick={nextMonth}
            className="text-dash-text-sec hover:text-dash-nafs transition-colors sov-font-mono text-sm px-2 py-1"
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAY_NAMES_SHORT.map((d) => (
            <div
              key={d}
              className="text-center sov-font-mono text-[10px] text-dash-text-sec py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1.5 content-start">
          {/* Empty offset cells */}
          {Array.from({ length: calendarDays.offset }).map((_, i) => (
            <div key={`empty-${i}`} className="cal-cell opacity-0 pointer-events-none" />
          ))}

          {/* Day cells */}
          {calendarDays.cells.map(({ day, iso }) => {
            const hasBlocks =
              state.calendarLogs[iso] && state.calendarLogs[iso].blocks.length > 0;
            const isToday = iso === todayStr;
            const isSelected = iso === state.selectedDate;

            return (
              <button
                key={iso}
                className={`cal-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedDate(iso)}
                aria-label={`${MONTH_NAMES[navMonth]} ${day}`}
              >
                <span>{day}</span>
                {hasBlocks && (
                  <span
                    className="w-[5px] h-[5px] rounded-full mt-[2px]"
                    style={{ background: '#7c6bff' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* ========== RIGHT PANEL — 24-Hour Timeline ========== */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(124, 107, 255, 0.1)' }}>
          <h1 className="sov-font-syne text-dash-text font-semibold text-xs tracking-[0.15em]">
            {formatSelectedDate(state.selectedDate)}
          </h1>
          <button
            onClick={openModal}
            className="sov-font-mono text-[11px] tracking-wider px-3 py-1.5 rounded transition-all"
            style={{
              background: 'rgba(124, 107, 255, 0.12)',
              border: '0.5px solid rgba(124, 107, 255, 0.3)',
              color: '#7c6bff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124, 107, 255, 0.6)';
              e.currentTarget.style.background = 'rgba(124, 107, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(124, 107, 255, 0.3)';
              e.currentTarget.style.background = 'rgba(124, 107, 255, 0.12)';
            }}
          >
            ＋ NEW BLOCK
          </button>
        </div>

        {/* Timeline track */}
        <div className="flex-1 overflow-y-auto dash-scrollbar">
          <div className="timeline-track" style={{ height: ROW_HEIGHT * 24 }}>
            {/* Background grid lines + hour labels (no blocks rendered here) */}
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="hour-row">
                <span
                  className="flex-shrink-0 text-dash-text-sec text-[10px] select-none"
                  style={{ width: TIME_LABEL_WIDTH, color: '#6a6a80' }}
                >
                  {padHour(hour)}:00 – {padHour(hour + 1 === 24 ? 0 : hour + 1)}:00
                </span>
              </div>
            ))}

            {/* Block overlay — one box per logged block, height driven by duration */}
            {dayLog.blocks.map((block) => {
              const duration = block.endHour - block.startHour;
              return (
                <div
                  key={block.id}
                  className={`timeline-block ${block.type === 'ACADEMIC' ? 'academic' : 'custom'}`}
                  style={{
                    top: block.startHour * ROW_HEIGHT + 1,
                    height: duration * ROW_HEIGHT - 2,
                    left: TIME_LABEL_WIDTH + 8,
                    right: 8,
                  }}
                >
                  {block.type === 'ACADEMIC' ? (
                    <>
                      <span style={{ color: '#c4b5fd' }}>
                        {lookupTopicName(block.paperId, block.topicId)}
                      </span>
                      <span style={{ color: '#9898b0' }}>
                        [{lookupSubjectLabel(block.subjectId)}]
                      </span>
                      <span style={{ color: '#7c6bff' }}>
                        {duration}h
                      </span>
                    </>
                  ) : (
                    <>
                      <span style={{ color: '#d4b85c' }}>{block.title}</span>
                      <span style={{ color: '#C9A84C' }}>{duration}h</span>
                    </>
                  )}
                  <button
                    onClick={() => removeBlock(state.selectedDate, block.id)}
                    className="ml-auto flex-shrink-0 text-[10px] opacity-50 hover:opacity-100 transition-opacity"
                    style={{ color: '#e85050' }}
                    aria-label="Delete block"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* ========== NEW BLOCK MODAL ========== */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={closeModal}
        >
          <div
            className="dash-card p-5 w-full max-w-md relative"
            style={{ background: '#111114', border: '0.5px solid rgba(124, 107, 255, 0.25)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="sov-font-syne text-dash-text font-semibold text-sm tracking-[0.12em] mb-4">
              NEW BLOCK
            </h2>

            {/* Toggle: ACADEMIC | CUSTOM */}
            <div className="flex gap-1 mb-5 p-1 rounded" style={{ background: 'rgba(124, 107, 255, 0.06)' }}>
              <button
                onClick={() => { setModalTab('ACADEMIC'); resetForm(); }}
                className="flex-1 sov-font-mono text-[11px] py-1.5 rounded transition-all"
                style={{
                  background: modalTab === 'ACADEMIC' ? 'rgba(124, 107, 255, 0.2)' : 'transparent',
                  color: modalTab === 'ACADEMIC' ? '#c4b5fd' : '#6a6a80',
                  border: modalTab === 'ACADEMIC' ? '0.5px solid rgba(124, 107, 255, 0.3)' : '0.5px solid transparent',
                }}
              >
                ACADEMIC
              </button>
              <button
                onClick={() => { setModalTab('CUSTOM'); resetForm(); }}
                className="flex-1 sov-font-mono text-[11px] py-1.5 rounded transition-all"
                style={{
                  background: modalTab === 'CUSTOM' ? 'rgba(124, 107, 255, 0.2)' : 'transparent',
                  color: modalTab === 'CUSTOM' ? '#c4b5fd' : '#6a6a80',
                  border: modalTab === 'CUSTOM' ? '0.5px solid rgba(124, 107, 255, 0.3)' : '0.5px solid transparent',
                }}
              >
                CUSTOM
              </button>
            </div>

            {/* Form fields */}
            {modalTab === 'ACADEMIC' ? (
              <div className="flex flex-col gap-3">
                {/* Subject */}
                <select
                  className="sov-select w-full"
                  value={formSubject}
                  onChange={(e) => { setFormSubject(e.target.value); setFormPaper(''); setFormTopic(''); }}
                >
                  <option value="">— Select Subject —</option>
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>

                {/* Paper */}
                <select
                  className="sov-select w-full"
                  value={formPaper}
                  disabled={!formSubject}
                  onChange={(e) => { setFormPaper(e.target.value); setFormTopic(''); }}
                >
                  <option value="">— Select Paper —</option>
                  {filteredPapers.map((p) => (
                    <option key={p.paperId} value={p.paperId}>
                      {p.code} — {p.name}
                    </option>
                  ))}
                </select>

                {/* Topic */}
                <select
                  className="sov-select w-full"
                  value={formTopic}
                  disabled={!formPaper}
                  onChange={(e) => setFormTopic(e.target.value)}
                >
                  <option value="">— Select Topic —</option>
                  {filteredTopics.map((t) => (
                    <option key={t.topicId} value={t.topicId}>{t.name}</option>
                  ))}
                </select>

                {/* Start Hour */}
                <select
                  className="sov-select w-full"
                  value={formStartH === '' ? '' : formStartH}
                  disabled={!formTopic}
                  onChange={(e) => { setFormStartH(e.target.value === '' ? '' : Number(e.target.value)); setFormEndH(''); }}
                >
                  <option value="">— Start Hour —</option>
                  {startHourOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                {/* End Hour */}
                <select
                  className="sov-select w-full"
                  value={formEndH === '' ? '' : formEndH}
                  disabled={formStartH === '' || !formTopic}
                  onChange={(e) => setFormEndH(e.target.value === '' ? '' : Number(e.target.value))}
                >
                  <option value="">— End Hour —</option>
                  {endHourOptionsAcademic.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Title */}
                <input
                  type="text"
                  className="sov-input w-full"
                  placeholder="Block title..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                />

                {/* Start Hour */}
                <select
                  className="sov-select w-full"
                  value={customStartH === '' ? '' : customStartH}
                  onChange={(e) => { setCustomStartH(e.target.value === '' ? '' : Number(e.target.value)); setCustomEndH(''); }}
                >
                  <option value="">— Start Hour —</option>
                  {startHourOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                {/* End Hour */}
                <select
                  className="sov-select w-full"
                  value={customEndH === '' ? '' : customEndH}
                  disabled={customStartH === ''}
                  onChange={(e) => setCustomEndH(e.target.value === '' ? '' : Number(e.target.value))}
                >
                  <option value="">— End Hour —</option>
                  {endHourOptionsCustom.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Error */}
            {formError && (
              <p className="sov-font-mono text-[11px] mt-3" style={{ color: '#e85050' }}>
                {formError}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={closeModal}
                className="flex-1 sov-font-mono text-[11px] py-2 rounded transition-all"
                style={{
                  background: 'transparent',
                  border: '0.5px solid rgba(124, 107, 255, 0.15)',
                  color: '#6a6a80',
                }}
              >
                CANCEL
              </button>
              <button
                onClick={commitBlock}
                className="flex-1 sov-font-mono text-[11px] py-2 rounded transition-all"
                style={{
                  background: 'rgba(124, 107, 255, 0.15)',
                  border: '0.5px solid rgba(124, 107, 255, 0.4)',
                  color: '#c4b5fd',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 107, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(124, 107, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 107, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(124, 107, 255, 0.4)';
                }}
              >
                COMMIT BLOCK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}