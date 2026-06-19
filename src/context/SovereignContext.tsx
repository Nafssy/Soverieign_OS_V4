'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { PAPERS, PORTFOLIO_PROJECTS } from '@/data/RESEARCH_DATA';
import type { PaperData } from '@/data/RESEARCH_DATA';

// =============================================================================
// TYPES
// =============================================================================

export type TopicState = 'UNREAD' | 'READ' | 'PRACTICE' | 'MASTERED';
export type BlockType = 'ACADEMIC' | 'CUSTOM';
export type ViewId = 'overview' | 'barbell' | 'academic' | 'strike' | 'daily' | 'exit';

export interface TopicProgress {
  topicId: string;
  state: TopicState;
}

export interface PaperState {
  paperId: string;
  topicProgress: TopicProgress[];
  deadline: string | null;
  masteryPct: number;
}

export interface AcademicBlock {
  id: string;
  type: 'ACADEMIC';
  subjectId: string;
  paperId: string;
  topicId: string;
  startHour: number;
  endHour: number;
}

export interface CustomBlock {
  id: string;
  type: 'CUSTOM';
  title: string;
  startHour: number;
  endHour: number;
}

export type CalendarBlock = AcademicBlock | CustomBlock;

export interface DayLog {
  date: string;
  blocks: CalendarBlock[];
}

export interface ProjectCompletion {
  projectId: string;
  completed: boolean;
}

export interface SATChecklistItem {
  id: string;
  completed: boolean;
  label: string;
}

export interface SovereignState {
  paperStates: Record<string, PaperState>;
  calendarLogs: Record<string, DayLog>;
  selectedStrikePaperId: string | null;
  selectedDate: string;
  activeView: ViewId;
  projectCompletions: Record<string, ProjectCompletion>;
  satChecklist: SATChecklistItem[];
  academicSidePanel: string | null;
  barbellExpandedPaper: string | null;
  exitActiveRegion: string;
}

// =============================================================================
// INITIAL STATE
// =============================================================================

function buildInitialPaperStates(): Record<string, PaperState> {
  const states: Record<string, PaperState> = {};
  for (const paper of PAPERS) {
    const topicProgress: TopicProgress[] = paper.topics.map((t) => ({
      topicId: t.topicId,
      state: 'UNREAD' as TopicState,
    }));
    states[paper.paperId] = {
      paperId: paper.paperId,
      topicProgress,
      deadline: null,
      masteryPct: 0,
    };
  }
  return states;
}

function buildInitialProjectCompletions(): Record<string, ProjectCompletion> {
  const comps: Record<string, ProjectCompletion> = {};
  for (const proj of PORTFOLIO_PROJECTS) {
    comps[proj.projectId] = { projectId: proj.projectId, completed: false };
  }
  return comps;
}

function buildSatChecklist(): SATChecklistItem[] {
  return [
    { id: 'sat_diag', completed: false, label: 'Complete diagnostic test' },
    { id: 'sat_math_algebra', completed: false, label: 'Math: Algebra mastery' },
    { id: 'sat_math_adv', completed: false, label: 'Math: Advanced Math mastery' },
    { id: 'sat_math_psa', completed: false, label: 'Math: Problem-Solving & Data Analysis' },
    { id: 'sat_math_geo', completed: false, label: 'Math: Geometry & Trigonometry' },
    { id: 'sat_ebrw_reading', completed: false, label: 'EBRW: Reading comprehension' },
    { id: 'sat_ebrw_writing', completed: false, label: 'EBRW: Writing conventions' },
    { id: 'sat_practice_1', completed: false, label: 'Full practice test #1' },
    { id: 'sat_practice_2', completed: false, label: 'Full practice test #2' },
    { id: 'sat_error_review', completed: false, label: 'Error review completed' },
  ];
}

function getTodayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const STORAGE_KEY = 'sovereign_v4';

function createInitialState(): SovereignState {
  return {
    paperStates: buildInitialPaperStates(),
    calendarLogs: {},
    selectedStrikePaperId: null,
    selectedDate: getTodayISO(),
    activeView: 'overview',
    projectCompletions: buildInitialProjectCompletions(),
    satChecklist: buildSatChecklist(),
    academicSidePanel: null,
    barbellExpandedPaper: null,
    exitActiveRegion: 'ASIA',
  };
}

// =============================================================================
// REDUCER
// =============================================================================

type Action =
  | { type: 'HYDRATE'; payload: SovereignState }
  | { type: 'SET_VIEW'; view: ViewId }
  | { type: 'CYCLE_TOPIC'; paperId: string; topicId: string }
  | { type: 'SET_DEADLINE'; paperId: string; deadline: string | null }
  | { type: 'SET_STRIKE'; paperId: string | null }
  | { type: 'SET_SELECTED_DATE'; date: string }
  | { type: 'ADD_BLOCK'; date: string; block: CalendarBlock }
  | { type: 'REMOVE_BLOCK'; date: string; blockId: string }
  | { type: 'TOGGLE_PROJECT'; projectId: string }
  | { type: 'TOGGLE_SAT_ITEM'; satId: string }
  | { type: 'SET_ACADEMIC_PANEL'; paperId: string | null }
  | { type: 'SET_BARBELL_EXPANDED'; paperId: string | null }
  | { type: 'SET_EXIT_REGION'; region: string };

function recomputeMastery(paper: PaperData, topicProgress: TopicProgress[]): number {
  if (paper.topics.length === 0) return 0;
  const mastered = topicProgress.filter((tp) => tp.state === 'MASTERED').length;
  return Math.round((mastered / paper.topics.length) * 100);
}

function sovereignReducer(state: SovereignState, action: Action): SovereignState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...action.payload };

    case 'SET_VIEW':
      return { ...state, activeView: action.view };

    case 'CYCLE_TOPIC': {
      const { paperId, topicId } = action;
      const ps = state.paperStates[paperId];
      if (!ps) return state;
      const paperData = PAPERS.find((p) => p.paperId === paperId);
      if (!paperData) return state;
      const newProgress = ps.topicProgress.map((tp) => {
        if (tp.topicId !== topicId) return tp;
        const cycle: Record<TopicState, TopicState> = {
          UNREAD: 'READ',
          READ: 'PRACTICE',
          PRACTICE: 'MASTERED',
          MASTERED: 'UNREAD',
        };
        return { ...tp, state: cycle[tp.state] };
      });
      const newMastery = recomputeMastery(paperData, newProgress);
      return {
        ...state,
        paperStates: {
          ...state.paperStates,
          [paperId]: { ...ps, topicProgress: newProgress, masteryPct: newMastery },
        },
      };
    }

    case 'SET_DEADLINE': {
      const { paperId, deadline } = action;
      const ps = state.paperStates[paperId];
      if (!ps) return state;
      return {
        ...state,
        paperStates: {
          ...state.paperStates,
          [paperId]: { ...ps, deadline },
        },
      };
    }

    case 'SET_STRIKE':
      return { ...state, selectedStrikePaperId: action.paperId };

    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.date };

    case 'ADD_BLOCK': {
      const { date, block } = action;
      const dayLog = state.calendarLogs[date] || { date, blocks: [] };
      return {
        ...state,
        calendarLogs: {
          ...state.calendarLogs,
          [date]: { ...dayLog, blocks: [...dayLog.blocks, block] },
        },
      };
    }

    case 'REMOVE_BLOCK': {
      const { date, blockId } = action;
      const dayLog = state.calendarLogs[date];
      if (!dayLog) return state;
      return {
        ...state,
        calendarLogs: {
          ...state.calendarLogs,
          [date]: {
            ...dayLog,
            blocks: dayLog.blocks.filter((b) => b.id !== blockId),
          },
        },
      };
    }

    case 'TOGGLE_PROJECT': {
      const { projectId } = action;
      const existing = state.projectCompletions[projectId];
      if (!existing) return state;
      return {
        ...state,
        projectCompletions: {
          ...state.projectCompletions,
          [projectId]: { ...existing, completed: !existing.completed },
        },
      };
    }

    case 'TOGGLE_SAT_ITEM': {
      const { satId } = action;
      return {
        ...state,
        satChecklist: state.satChecklist.map((item) =>
          item.id === satId ? { ...item, completed: !item.completed } : item,
        ),
      };
    }

    case 'SET_ACADEMIC_PANEL':
      return { ...state, academicSidePanel: action.paperId };

    case 'SET_BARBELL_EXPANDED':
      return { ...state, barbellExpandedPaper: action.paperId };

    case 'SET_EXIT_REGION':
      return { ...state, exitActiveRegion: action.region };

    default:
      return state;
  }
}

// =============================================================================
// CONTEXT
// =============================================================================

interface SovereignContextValue {
  state: SovereignState;
  dispatch: React.Dispatch<Action>;
  navigate: (view: ViewId) => void;
  setView: (view: ViewId) => void;
  cycleTopic: (paperId: string, topicId: string) => void;
  setDeadline: (paperId: string, deadline: string | null) => void;
  setStrike: (paperId: string | null) => void;
  setSelectedDate: (date: string) => void;
  addBlock: (date: string, block: CalendarBlock) => void;
  removeBlock: (date: string, blockId: string) => void;
  toggleProject: (projectId: string) => void;
  toggleSatItem: (satId: string) => void;
  setAcademicPanel: (paperId: string | null) => void;
  setBarbellExpanded: (paperId: string | null) => void;
  setExitRegion: (region: string) => void;
  getPaperState: (paperId: string) => PaperState;
  getDayLog: (date: string) => DayLog;
  getTopicState: (paperId: string, topicId: string) => TopicState;
  totalStudyHours: number;
  avgMastery: number;
  floorMastery: number;
  ceilingPct: number;
}

const SovereignContext = createContext<SovereignContextValue | null>(null);

// =============================================================================
// PROVIDER
// =============================================================================

function loadState(): SovereignState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SovereignState;
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: SovereignState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function SovereignProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(sovereignReducer, null, () => {
    const initial = createInitialState();
    return initial;
  });
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      // Merge saved state with initial to pick up any new fields
      const initial = createInitialState();
      const merged: SovereignState = {
        ...initial,
        ...saved,
        paperStates: {
          ...initial.paperStates,
          ...saved.paperStates,
        },
        projectCompletions: {
          ...initial.projectCompletions,
          ...saved.projectCompletions,
        },
        satChecklist: saved.satChecklist && saved.satChecklist.length > 0
          ? saved.satChecklist
          : initial.satChecklist,
      };
      dispatch({ type: 'HYDRATE', payload: merged });
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on state change
  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  // Action helpers
  const navigate = useCallback((view: ViewId) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);

  const setView = useCallback((view: ViewId) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);

  const cycleTopic = useCallback((paperId: string, topicId: string) => {
    dispatch({ type: 'CYCLE_TOPIC', paperId, topicId });
  }, []);

  const setDeadline = useCallback((paperId: string, deadline: string | null) => {
    dispatch({ type: 'SET_DEADLINE', paperId, deadline });
  }, []);

  const setStrike = useCallback((paperId: string | null) => {
    dispatch({ type: 'SET_STRIKE', paperId });
  }, []);

  const setSelectedDate = useCallback((date: string) => {
    dispatch({ type: 'SET_SELECTED_DATE', date });
  }, []);

  const addBlock = useCallback((date: string, block: CalendarBlock) => {
    dispatch({ type: 'ADD_BLOCK', date, block });
  }, []);

  const removeBlock = useCallback((date: string, blockId: string) => {
    dispatch({ type: 'REMOVE_BLOCK', date, blockId });
  }, []);

  const toggleProject = useCallback((projectId: string) => {
    dispatch({ type: 'TOGGLE_PROJECT', projectId });
  }, []);

  const toggleSatItem = useCallback((satId: string) => {
    dispatch({ type: 'TOGGLE_SAT_ITEM', satId });
  }, []);

  const setAcademicPanel = useCallback((paperId: string | null) => {
    dispatch({ type: 'SET_ACADEMIC_PANEL', paperId });
  }, []);

  const setBarbellExpanded = useCallback((paperId: string | null) => {
    dispatch({ type: 'SET_BARBELL_EXPANDED', paperId });
  }, []);

  const setExitRegion = useCallback((region: string) => {
    dispatch({ type: 'SET_EXIT_REGION', region });
  }, []);

  // Derived data
  const getPaperState = useCallback(
    (paperId: string): PaperState => {
      return state.paperStates[paperId] || {
        paperId,
        topicProgress: [],
        deadline: null,
        masteryPct: 0,
      };
    },
    [state.paperStates],
  );

  const getDayLog = useCallback(
    (date: string): DayLog => {
      return state.calendarLogs[date] || { date, blocks: [] };
    },
    [state.calendarLogs],
  );

  const getTopicState = useCallback(
    (paperId: string, topicId: string): TopicState => {
      const ps = state.paperStates[paperId];
      if (!ps) return 'UNREAD';
      const tp = ps.topicProgress.find((t) => t.topicId === topicId);
      return tp?.state || 'UNREAD';
    },
    [state.paperStates],
  );

  const totalStudyHours = useMemo(() => {
    let total = 0;
    for (const key of Object.keys(state.calendarLogs)) {
      const day = state.calendarLogs[key];
      for (const block of day.blocks) {
        total += block.endHour - block.startHour;
      }
    }
    return total;
  }, [state.calendarLogs]);

  const avgMastery = useMemo(() => {
    const papers = PAPERS;
    if (papers.length === 0) return 0;
    let sum = 0;
    for (const paper of papers) {
      const ps = state.paperStates[paper.paperId];
      sum += ps?.masteryPct || 0;
    }
    return Math.round(sum / papers.length);
  }, [state.paperStates]);

  const floorMastery = useMemo(() => {
    // Average of all 17 paper masteries + SAT checklist
    const satDone = state.satChecklist.filter((i) => i.completed).length;
    const satPct = state.satChecklist.length > 0 ? Math.round((satDone / state.satChecklist.length) * 100) : 0;
    const paperMastery = avgMastery;
    return Math.round((paperMastery * 0.85 + satPct * 0.15));
  }, [avgMastery, state.satChecklist]);

  const ceilingPct = useMemo(() => {
    const total = PORTFOLIO_PROJECTS.length;
    if (total === 0) return 0;
    const done = Object.values(state.projectCompletions).filter((p) => p.completed).length;
    return Math.round((done / total) * 100);
  }, [state.projectCompletions]);

  const value = useMemo<SovereignContextValue>(
    () => ({
      state,
      dispatch,
      navigate,
      setView,
      cycleTopic,
      setDeadline,
      setStrike,
      setSelectedDate,
      addBlock,
      removeBlock,
      toggleProject,
      toggleSatItem,
      setAcademicPanel,
      setBarbellExpanded,
      setExitRegion,
      getPaperState,
      getDayLog,
      getTopicState,
      totalStudyHours,
      avgMastery,
      floorMastery,
      ceilingPct,
    }),
    [
      state,
      navigate,
      setView,
      cycleTopic,
      setDeadline,
      setStrike,
      setSelectedDate,
      addBlock,
      removeBlock,
      toggleProject,
      toggleSatItem,
      setAcademicPanel,
      setBarbellExpanded,
      setExitRegion,
      getPaperState,
      getDayLog,
      getTopicState,
      totalStudyHours,
      avgMastery,
      floorMastery,
      ceilingPct,
    ],
  );

  return (
    <SovereignContext.Provider value={value}>
      {children}
    </SovereignContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useSovereign(): SovereignContextValue {
  const ctx = useContext(SovereignContext);
  if (!ctx) {
    throw new Error('useSovereign must be used within a SovereignProvider');
  }
  return ctx;
}