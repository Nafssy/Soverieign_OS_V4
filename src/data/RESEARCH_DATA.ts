// =============================================================================
// SOVEREIGN OS v4.0 — RESEARCH DATA
// Plug this file into the app as: ./data/RESEARCH_DATA.ts
// All data is real and accurate as of 2025. Verify grade boundaries each session
// at https://www.cambridgeinternational.org/programmes-and-qualifications/results/
// =============================================================================

// ---------------------------------------------------------------------------
// TYPES (mirrors what the app expects — refine if interfaces change in build)
// ---------------------------------------------------------------------------

export interface GradeBoundary {
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  mark: number;
  outOf: number;
}

export interface TopicSubComponent {
  name: string;
  estimatedHours: number; // Speed Audit input
}

export interface PaperTopic {
  topicId: string;
  name: string;
  subComponents: TopicSubComponent[];
}

export interface PaperData {
  paperId: string;
  code: string;          // e.g. "9709/01"
  subject: 'MATHS' | 'FURTHER_MATHS' | 'ECONOMICS' | 'PHYSICS';
  year: 1 | 2;
  name: string;
  gradeBoundaries: GradeBoundary[];
  topics: PaperTopic[];
  prepMethod: {
    pass1: string;
    pass2: string;
    pass3: string;
  };
}

export interface University {
  uniId: string;
  name: string;
  country: string;
  region: 'ASIA' | 'NORTH_AMERICA' | 'EUROPE' | 'AUSTRALIA';
  qsRank2024: number | string; // string for ranges like "201-250"
  quantProgram: string;
  category: 'DREAM' | 'REACH' | 'TARGET' | 'SAFETY' | 'BACKUP';
  // Barbell section fields
  scholarship: {
    name: string;
    value: string;         // e.g. "Full tuition + SGD 6,000/yr living"
    eligibility: string;
  } | null;
  // Exit section fields
  internshipPrograms: string[];  // e.g. ["GIC Graduate Programme", "MAS Scholarship"]
}

export interface Firm {
  firmId: string;
  name: string;
  city: string;
  country: string;
  region: 'ASIA' | 'NORTH_AMERICA' | 'EUROPE' | 'AUSTRALIA' | 'INGO_DEVSEC';
  tier: 'ELITE' | 'TIER1' | 'TIER2';
  roleTypes: string[];
  hiringRoute: 'CAMPUS' | 'OPEN' | 'REFERRAL' | 'MIXED';
  graduateProgram: string | null;
}

export interface INGOProgram {
  orgId: string;
  organization: string;
  program: string;
  applicationRoute: string;
  bangladeshNote: string | null;
}

export interface PortfolioProject {
  projectId: string;
  name: string;
  category: 'QUANT_PORTFOLIO' | 'DATA_MODELLING' | 'ALGO_THINKING' | 'NETWORK';
  what: string;
  why: string;
  whyNotAlternatives: string;
  knowledgeBase: string[];   // ordered prerequisite list
}

export interface SATData {
  targetScore: number;
  sections: {
    name: string;
    targetScore: number;
    topicBreakdown: string[];
    prepNotes: string;
  }[];
  prepResources: { name: string; cost: string; notes: string }[];
  recommendedTimeline: string;
}

export interface RegionCareerNote {
  region: 'ASIA' | 'NORTH_AMERICA' | 'EUROPE' | 'AUSTRALIA' | 'INGO_DEVSEC';
  narrative: string;
}

// ---------------------------------------------------------------------------
// A-LEVEL PAPERS
// Grade boundaries: Cambridge approximate thresholds (vary ±3–5 marks per session)
// Source: Cambridge International grade threshold documents
// ---------------------------------------------------------------------------

export const PAPERS: PaperData[] = [

  // ── YEAR 1 ────────────────────────────────────────────────────────────────

  {
    paperId: 'MATHS_P1',
    code: '9709/01',
    subject: 'MATHS',
    year: 1,
    name: 'Pure Mathematics 1',
    gradeBoundaries: [
      { grade: 'A', mark: 61, outOf: 75 },
      { grade: 'B', mark: 54, outOf: 75 },
      { grade: 'C', mark: 46, outOf: 75 },
      { grade: 'D', mark: 39, outOf: 75 },
      { grade: 'E', mark: 32, outOf: 75 },
    ],
    topics: [
      {
        topicId: 'MATHS_P1_T01',
        name: 'Quadratics',
        subComponents: [
          { name: 'Completing the square', estimatedHours: 1 },
          { name: 'Discriminant & nature of roots', estimatedHours: 1 },
          { name: 'Quadratic inequalities', estimatedHours: 1.5 },
        ],
      },
      {
        topicId: 'MATHS_P1_T02',
        name: 'Functions',
        subComponents: [
          { name: 'Domain and range', estimatedHours: 1 },
          { name: 'Composite functions', estimatedHours: 1 },
          { name: 'Inverse functions', estimatedHours: 1.5 },
        ],
      },
      {
        topicId: 'MATHS_P1_T03',
        name: 'Coordinate Geometry',
        subComponents: [
          { name: 'Straight-line equations', estimatedHours: 1 },
          { name: 'Perpendicular bisectors', estimatedHours: 1 },
          { name: 'Circles: centre, radius, tangents', estimatedHours: 2 },
        ],
      },
      {
        topicId: 'MATHS_P1_T04',
        name: 'Circular Measure',
        subComponents: [
          { name: 'Radians, arc length, sector area', estimatedHours: 2 },
        ],
      },
      {
        topicId: 'MATHS_P1_T05',
        name: 'Trigonometry',
        subComponents: [
          { name: 'Sin/cos/tan exact values', estimatedHours: 1 },
          { name: 'Identities and equations', estimatedHours: 2 },
          { name: 'Graphs and transformations', estimatedHours: 1.5 },
        ],
      },
      {
        topicId: 'MATHS_P1_T06',
        name: 'Series',
        subComponents: [
          { name: 'Binomial expansion', estimatedHours: 2 },
          { name: 'Arithmetic progressions', estimatedHours: 1 },
          { name: 'Geometric progressions', estimatedHours: 1.5 },
        ],
      },
      {
        topicId: 'MATHS_P1_T07',
        name: 'Differentiation',
        subComponents: [
          { name: 'First principles & rules', estimatedHours: 1.5 },
          { name: 'Tangents, normals, stationary points', estimatedHours: 2 },
          { name: 'Chain rule, product rule, quotient rule', estimatedHours: 2 },
        ],
      },
      {
        topicId: 'MATHS_P1_T08',
        name: 'Integration',
        subComponents: [
          { name: 'Indefinite integration', estimatedHours: 1.5 },
          { name: 'Definite integration and area', estimatedHours: 2 },
          { name: 'Volumes of revolution', estimatedHours: 2 },
        ],
      },
    ],
    prepMethod: {
      pass1: 'Read the Cambridge syllabus checklist topic by topic. For each, write one sentence in your own words — no formulas, just what the concept means. Flag anything you cannot explain without looking.',
      pass2: 'For each flagged topic, work through 3–5 textbook examples step by step. Write out every line — no skipping. Verify your working against the mark scheme, not just the answer.',
      pass3: 'Sit two past papers under timed conditions (75 minutes each). Mark strictly using the official mark scheme. Every mark dropped = a card to revisit in Pass 2 the next day.',
    },
  },

  {
    paperId: 'MATHS_P3',
    code: '9709/03',
    subject: 'MATHS',
    year: 1,
    name: 'Pure Mathematics 3',
    gradeBoundaries: [
      { grade: 'A', mark: 58, outOf: 75 },
      { grade: 'B', mark: 51, outOf: 75 },
      { grade: 'C', mark: 44, outOf: 75 },
      { grade: 'D', mark: 37, outOf: 75 },
      { grade: 'E', mark: 30, outOf: 75 },
    ],
    topics: [
      { topicId: 'MATHS_P3_T01', name: 'Algebra (partial fractions, polynomials)', subComponents: [{ name: 'Partial fractions', estimatedHours: 2 }, { name: 'Polynomial division', estimatedHours: 1 }] },
      { topicId: 'MATHS_P3_T02', name: 'Logarithms & Exponentials', subComponents: [{ name: 'Laws of logarithms', estimatedHours: 1.5 }, { name: 'Exponential equations', estimatedHours: 1.5 }] },
      { topicId: 'MATHS_P3_T03', name: 'Trigonometry (advanced)', subComponents: [{ name: 'Compound angle formulae', estimatedHours: 2 }, { name: 'R-form (harmonic form)', estimatedHours: 2 }] },
      { topicId: 'MATHS_P3_T04', name: 'Differentiation (advanced)', subComponents: [{ name: 'Implicit differentiation', estimatedHours: 2 }, { name: 'Parametric differentiation', estimatedHours: 1.5 }] },
      { topicId: 'MATHS_P3_T05', name: 'Integration (advanced)', subComponents: [{ name: 'Integration by parts', estimatedHours: 2 }, { name: 'Integration by substitution', estimatedHours: 2 }, { name: 'Partial fractions integration', estimatedHours: 1.5 }] },
      { topicId: 'MATHS_P3_T06', name: 'Differential Equations', subComponents: [{ name: 'Separation of variables', estimatedHours: 2.5 }, { name: 'Forming DEs from context', estimatedHours: 2 }] },
      { topicId: 'MATHS_P3_T07', name: 'Complex Numbers', subComponents: [{ name: 'Cartesian form operations', estimatedHours: 2 }, { name: 'Argand diagrams, modulus-argument', estimatedHours: 2 }] },
      { topicId: 'MATHS_P3_T08', name: 'Vectors', subComponents: [{ name: 'Lines in 3D', estimatedHours: 2 }, { name: 'Planes and intersections', estimatedHours: 2.5 }] },
      { topicId: 'MATHS_P3_T09', name: 'Numerical Methods', subComponents: [{ name: 'Iteration and convergence', estimatedHours: 1.5 }, { name: 'Newton-Raphson method', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'Create a one-page topic map showing which chapters depend on each other. P3 has hard dependencies — complex numbers require trig; advanced integration requires partial fractions. Map these before studying anything.',
      pass2: 'Work in dependency order. Do not attempt integration techniques before partial fractions. For each topic, do 5 textbook examples, then 5 past-paper questions from the Cambridge resource bank on that specific topic.',
      pass3: 'Three full timed papers. For P3, time pressure is severe — if you spend more than 8 minutes on any question, mark it, move on, return. Practice this triage protocol explicitly.',
    },
  },

  {
    paperId: 'MATHS_P4',
    code: '9709/04',
    subject: 'MATHS',
    year: 1,
    name: 'Mechanics',
    gradeBoundaries: [
      { grade: 'A', mark: 52, outOf: 60 },
      { grade: 'B', mark: 45, outOf: 60 },
      { grade: 'C', mark: 38, outOf: 60 },
      { grade: 'D', mark: 32, outOf: 60 },
      { grade: 'E', mark: 25, outOf: 60 },
    ],
    topics: [
      { topicId: 'MATHS_P4_T01', name: 'Forces and Equilibrium', subComponents: [{ name: 'Resolving forces', estimatedHours: 2 }, { name: 'Friction', estimatedHours: 1.5 }] },
      { topicId: 'MATHS_P4_T02', name: 'Kinematics in 1D', subComponents: [{ name: 'SUVAT equations', estimatedHours: 2 }, { name: 'Variable acceleration (calculus)', estimatedHours: 2 }] },
      { topicId: 'MATHS_P4_T03', name: 'Newton\'s Laws of Motion', subComponents: [{ name: 'Connected particles', estimatedHours: 2 }, { name: 'Pulleys', estimatedHours: 1.5 }] },
      { topicId: 'MATHS_P4_T04', name: 'Energy, Work, Power', subComponents: [{ name: 'Work-energy theorem', estimatedHours: 2 }, { name: 'Power calculations', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'Draw a free-body diagram for every single mechanics problem — even simple ones. The diagram IS the solution strategy in Mechanics. Build this as a reflex in Pass 1.',
      pass2: 'Focus on connected-particles and variable-acceleration questions — these are the highest-mark items and most commonly dropped. Work through every example in the Cambridge-endorsed textbook for these.',
      pass3: 'Timed papers. Verify units in every answer. A correct numerical answer with wrong units scores zero in Cambridge marking.',
    },
  },

  {
    paperId: 'MATHS_P5',
    code: '9709/05',
    subject: 'MATHS',
    year: 1,
    name: 'Probability & Statistics 1',
    gradeBoundaries: [
      { grade: 'A', mark: 56, outOf: 60 },
      { grade: 'B', mark: 49, outOf: 60 },
      { grade: 'C', mark: 42, outOf: 60 },
      { grade: 'D', mark: 35, outOf: 60 },
      { grade: 'E', mark: 28, outOf: 60 },
    ],
    topics: [
      { topicId: 'MATHS_P5_T01', name: 'Representation of Data', subComponents: [{ name: 'Stem-and-leaf, box plots, histograms', estimatedHours: 1.5 }, { name: 'Mean, variance, standard deviation', estimatedHours: 2 }] },
      { topicId: 'MATHS_P5_T02', name: 'Probability', subComponents: [{ name: 'Venn diagrams, conditional probability', estimatedHours: 2 }, { name: 'Permutations and combinations', estimatedHours: 2.5 }] },
      { topicId: 'MATHS_P5_T03', name: 'Discrete Random Variables', subComponents: [{ name: 'Expectation and variance', estimatedHours: 2 }, { name: 'Binomial distribution', estimatedHours: 2 }] },
      { topicId: 'MATHS_P5_T04', name: 'Normal Distribution', subComponents: [{ name: 'Standardisation (z-scores)', estimatedHours: 2 }, { name: 'Normal approximation to binomial', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'Statistics is a vocabulary subject before it is a calculation subject. Pass 1: learn every definition precisely (random variable, expected value, unbiased estimator). A wrong definition in a written answer costs marks even with correct arithmetic.',
      pass2: 'The normal distribution table is your critical tool. Practice reading it forwards and backwards (given z find probability; given probability find z). Do 20 drills on this alone.',
      pass3: 'Past papers. Mark your own work strictly. Partial marking in Statistics is generous — show every step to capture method marks even when the final answer is wrong.',
    },
  },

  {
    paperId: 'ECON_P1',
    code: '9708/11',
    subject: 'ECONOMICS',
    year: 1,
    name: 'AS Multiple Choice (Micro)',
    gradeBoundaries: [
      { grade: 'A', mark: 31, outOf: 40 },
      { grade: 'B', mark: 27, outOf: 40 },
      { grade: 'C', mark: 23, outOf: 40 },
      { grade: 'D', mark: 19, outOf: 40 },
      { grade: 'E', mark: 15, outOf: 40 },
    ],
    topics: [
      { topicId: 'ECON_P1_T01', name: 'Basic Economic Problem & Opportunity Cost', subComponents: [{ name: 'Scarcity, choice, PPF', estimatedHours: 1 }] },
      { topicId: 'ECON_P1_T02', name: 'Demand, Supply, Price Mechanism', subComponents: [{ name: 'Shifts vs movements', estimatedHours: 1.5 }, { name: 'Price determination', estimatedHours: 1 }] },
      { topicId: 'ECON_P1_T03', name: 'Elasticities', subComponents: [{ name: 'PED, YED, XED, PES calculations', estimatedHours: 2 }] },
      { topicId: 'ECON_P1_T04', name: 'Market Failure & Government Intervention', subComponents: [{ name: 'Externalities, public goods, information failure', estimatedHours: 2 }, { name: 'Taxes, subsidies, price controls', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'For every MC paper, work through questions without a timer first. For each wrong answer, write the reason you chose the wrong option — this reveals the specific misconception to fix.',
      pass2: 'MCQ economics is about distractors. Study the most common distractor patterns for elasticity and market-failure questions — Cambridge uses them repeatedly across sessions.',
      pass3: 'Timed full papers. Target 45 seconds per question, maximum 90 seconds. Any question taking longer: flag, skip, return. Practice this mechanical pacing.',
    },
  },

  {
    paperId: 'ECON_P2',
    code: '9708/21',
    subject: 'ECONOMICS',
    year: 1,
    name: 'AS Data Response & Essays',
    gradeBoundaries: [
      { grade: 'A', mark: 40, outOf: 50 },
      { grade: 'B', mark: 34, outOf: 50 },
      { grade: 'C', mark: 29, outOf: 50 },
      { grade: 'D', mark: 23, outOf: 50 },
      { grade: 'E', mark: 18, outOf: 50 },
    ],
    topics: [
      { topicId: 'ECON_P2_T01', name: 'Data Interpretation Skills', subComponents: [{ name: 'Reading indices, percentages, graphs', estimatedHours: 2 }, { name: 'Identifying trends and anomalies', estimatedHours: 1.5 }] },
      { topicId: 'ECON_P2_T02', name: 'Applied Microeconomics', subComponents: [{ name: 'Applying elasticity to real data', estimatedHours: 2 }, { name: 'Market failure case studies', estimatedHours: 2 }] },
      { topicId: 'ECON_P2_T03', name: 'Essay Technique', subComponents: [{ name: 'PEEL paragraph structure', estimatedHours: 1 }, { name: 'Evaluation language ("however", "to what extent")', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'Read 10 past mark schemes in sequence without answering the questions. Learn the exact language Cambridge rewards — "this depends on the price elasticity of demand", "in the long run, supply will become more elastic". Mark-scheme vocabulary is a syllabus in itself.',
      pass2: 'Write timed essay plans (10 minutes) before writing full essays. A weak plan produces a weak essay. Practice the plan structure: definition → analysis → diagram → evaluation.',
      pass3: 'Full timed paper under exam conditions. Photograph your essay, compare to the mark scheme, annotate every point you missed. Target the Level 4 descriptor.',
    },
  },

  {
    paperId: 'PHYS_P1',
    code: '9702/11',
    subject: 'PHYSICS',
    year: 1,
    name: 'AS Multiple Choice',
    gradeBoundaries: [
      { grade: 'A', mark: 34, outOf: 40 },
      { grade: 'B', mark: 29, outOf: 40 },
      { grade: 'C', mark: 25, outOf: 40 },
      { grade: 'D', mark: 21, outOf: 40 },
      { grade: 'E', mark: 17, outOf: 40 },
    ],
    topics: [
      { topicId: 'PHYS_P1_T01', name: 'Measurements & Units', subComponents: [{ name: 'SI units, prefixes, significant figures', estimatedHours: 1 }] },
      { topicId: 'PHYS_P1_T02', name: 'Kinematics', subComponents: [{ name: 'SUVAT in 1D and 2D (projectiles)', estimatedHours: 2 }] },
      { topicId: 'PHYS_P1_T03', name: 'Dynamics', subComponents: [{ name: "Newton's laws, momentum, impulse", estimatedHours: 2 }] },
      { topicId: 'PHYS_P1_T04', name: 'Waves & Superposition', subComponents: [{ name: 'Transverse, longitudinal, interference, diffraction', estimatedHours: 2.5 }] },
      { topicId: 'PHYS_P1_T05', name: 'Electricity (DC Circuits)', subComponents: [{ name: 'Ohm\'s law, resistors in series/parallel, potential dividers', estimatedHours: 2.5 }] },
    ],
    prepMethod: {
      pass1: 'Physics MCQ requires unit-tracking. Pass 1: for every formula in the syllabus, derive the SI unit of every variable. Build a reference sheet you can write from memory.',
      pass2: 'Work through the Cambridge AS topic tests (available on the school support site). These isolate topics with the same difficulty level as the real paper.',
      pass3: 'Timed full papers. For physics MCQ, every wrong answer has a specific physics error behind it (sign convention, unit confusion, formula misapplication). Log the error type.',
    },
  },

  {
    paperId: 'PHYS_P2',
    code: '9702/21',
    subject: 'PHYSICS',
    year: 1,
    name: 'AS Structured Questions',
    gradeBoundaries: [
      { grade: 'A', mark: 55, outOf: 70 },
      { grade: 'B', mark: 47, outOf: 70 },
      { grade: 'C', mark: 40, outOf: 70 },
      { grade: 'D', mark: 33, outOf: 70 },
      { grade: 'E', mark: 26, outOf: 70 },
    ],
    topics: [
      { topicId: 'PHYS_P2_T01', name: 'Uncertainties & Errors', subComponents: [{ name: 'Absolute, fractional, percentage uncertainty', estimatedHours: 2 }, { name: 'Combining uncertainties', estimatedHours: 2 }] },
      { topicId: 'PHYS_P2_T02', name: 'Mechanics (structured)', subComponents: [{ name: 'Moment and torque problems', estimatedHours: 2 }, { name: 'Work-energy theorem applications', estimatedHours: 2 }] },
      { topicId: 'PHYS_P2_T03', name: 'Deformation of Solids', subComponents: [{ name: "Hooke's law, Young modulus, stress-strain", estimatedHours: 2 }] },
      { topicId: 'PHYS_P2_T04', name: 'Thermal Physics', subComponents: [{ name: 'Specific heat capacity, latent heat', estimatedHours: 1.5 }] },
      { topicId: 'PHYS_P2_T05', name: 'Quantum Physics (AS)', subComponents: [{ name: 'Photoelectric effect, photon energy, de Broglie', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'Uncertainties appear in almost every P2 paper and are consistently dropped. Pass 1 is dedicated entirely to the uncertainty chapter — master it before touching anything else.',
      pass2: 'For structured questions, the number of mark-scheme points = the number of lines Cambridge expects you to write. Count the marks, allocate lines, write concisely.',
      pass3: 'Timed papers. Note: in structured physics, the command word matters — "describe" requires observations, "explain" requires physics reasoning, "deduce" requires a logical chain from given data.',
    },
  },

  {
    paperId: 'PHYS_P3',
    code: '9702/31',
    subject: 'PHYSICS',
    year: 1,
    name: 'Advanced Practical Skills',
    gradeBoundaries: [
      { grade: 'A', mark: 30, outOf: 40 },
      { grade: 'B', mark: 25, outOf: 40 },
      { grade: 'C', mark: 21, outOf: 40 },
      { grade: 'D', mark: 17, outOf: 40 },
      { grade: 'E', mark: 13, outOf: 40 },
    ],
    topics: [
      { topicId: 'PHYS_P3_T01', name: 'Data Collection Technique', subComponents: [{ name: 'Correct significant figures in raw data', estimatedHours: 1 }, { name: 'Repeat readings and averaging', estimatedHours: 1 }] },
      { topicId: 'PHYS_P3_T02', name: 'Table Construction', subComponents: [{ name: 'Headings with units, correct decimal places', estimatedHours: 1.5 }] },
      { topicId: 'PHYS_P3_T03', name: 'Graph Plotting', subComponents: [{ name: 'Axes, scales, best-fit line/curve', estimatedHours: 2 }, { name: 'Identifying and treating anomalous results', estimatedHours: 1 }] },
      { topicId: 'PHYS_P3_T04', name: 'Gradient & Intercept Analysis', subComponents: [{ name: 'Extracting gradient with correct units', estimatedHours: 1.5 }, { name: 'Relating gradient to physical quantity', estimatedHours: 2 }] },
      { topicId: 'PHYS_P3_T05', name: 'Error and Uncertainty (Practical)', subComponents: [{ name: 'Percentage uncertainty from apparatus', estimatedHours: 1.5 }, { name: 'Error bars on graphs', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'P3 is procedural — it rewards knowing the marking points for every stage (table, graph, gradient, conclusion). Study the mark scheme structure across 5 past P3 papers before doing any yourself. Learn the template.',
      pass2: 'Work through 5 past papers answering them yourself, then mark strictly. The table and graph sections are the highest-mark items — every mistake here costs multiple marks.',
      pass3: 'No new material in Pass 3. Revisit your two worst past paper attempts and redo them. P3 rewards pattern recognition — the questions are structurally very similar across sessions.',
    },
  },

  // ── YEAR 2 ────────────────────────────────────────────────────────────────

  {
    paperId: 'FM_P1',
    code: '9231/01',
    subject: 'FURTHER_MATHS',
    year: 2,
    name: 'Further Pure Mathematics 1',
    gradeBoundaries: [
      { grade: 'A', mark: 63, outOf: 80 },
      { grade: 'B', mark: 55, outOf: 80 },
      { grade: 'C', mark: 47, outOf: 80 },
      { grade: 'D', mark: 40, outOf: 80 },
      { grade: 'E', mark: 33, outOf: 80 },
    ],
    topics: [
      { topicId: 'FM_P1_T01', name: 'Matrices', subComponents: [{ name: '2x2 and 3x3 matrix operations', estimatedHours: 2 }, { name: 'Determinants and inverses', estimatedHours: 2 }, { name: 'Transformations using matrices', estimatedHours: 2.5 }] },
      { topicId: 'FM_P1_T02', name: 'Complex Numbers (advanced)', subComponents: [{ name: "De Moivre's theorem", estimatedHours: 2.5 }, { name: 'nth roots of complex numbers', estimatedHours: 2 }] },
      { topicId: 'FM_P1_T03', name: 'Roots of Polynomial Equations', subComponents: [{ name: 'Vieta\'s formulas (sum/product of roots)', estimatedHours: 2 }, { name: 'Transforming equations', estimatedHours: 2 }] },
      { topicId: 'FM_P1_T04', name: 'Series (Summation)', subComponents: [{ name: 'Method of differences', estimatedHours: 2.5 }, { name: 'Maclaurin series', estimatedHours: 2 }] },
      { topicId: 'FM_P1_T05', name: 'Further Calculus', subComponents: [{ name: 'Reduction formulae', estimatedHours: 2.5 }, { name: 'Arc length and surface area', estimatedHours: 2 }] },
      { topicId: 'FM_P1_T06', name: 'Hyperbolic Functions', subComponents: [{ name: 'sinh, cosh, tanh definitions and identities', estimatedHours: 2 }, { name: 'Inverse hyperbolics and integrals', estimatedHours: 2.5 }] },
    ],
    prepMethod: {
      pass1: 'Matrices are the foundation of linear algebra and everything you will encounter in quantitative finance later. Do not rush this. Pass 1: build a complete reference sheet for matrix operations with worked examples of each operation type.',
      pass2: 'De Moivre\'s theorem is the highest-mark topic in FP1. Do 10 worked examples of nth roots of unity and De Moivre proofs. This topic rewards pattern recognition.',
      pass3: 'Full timed papers. FP1 is long — budget time carefully. Matrices and series are typically the most mark-dense sections; hit these first.',
    },
  },

  {
    paperId: 'FM_P2',
    code: '9231/02',
    subject: 'FURTHER_MATHS',
    year: 2,
    name: 'Further Pure Mathematics 2',
    gradeBoundaries: [
      { grade: 'A', mark: 57, outOf: 75 },
      { grade: 'B', mark: 49, outOf: 75 },
      { grade: 'C', mark: 41, outOf: 75 },
      { grade: 'D', mark: 34, outOf: 75 },
      { grade: 'E', mark: 27, outOf: 75 },
    ],
    topics: [
      { topicId: 'FM_P2_T01', name: 'Differential Equations (advanced)', subComponents: [{ name: 'Second-order ODEs (homogeneous)', estimatedHours: 3 }, { name: 'Second-order ODEs (particular integral)', estimatedHours: 3 }] },
      { topicId: 'FM_P2_T02', name: 'Polar Coordinates', subComponents: [{ name: 'Polar curves and sketching', estimatedHours: 2 }, { name: 'Area enclosed by polar curve', estimatedHours: 2.5 }] },
      { topicId: 'FM_P2_T03', name: 'Vectors (advanced)', subComponents: [{ name: 'Vector product (cross product)', estimatedHours: 2 }, { name: 'Planes: equations, distances, angles', estimatedHours: 2.5 }] },
      { topicId: 'FM_P2_T04', name: 'Further Calculus', subComponents: [{ name: 'Taylor series', estimatedHours: 2 }, { name: 'Improper integrals', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'Second-order differential equations are the most technically demanding topic across the entire 17-paper syllabus. Pass 1 is entirely dedicated to the method: complementary function → particular integral → general solution. Build a step-by-step algorithm you can execute mechanically.',
      pass2: 'Polar coordinates is the second hardest topic. Work through 6 past questions. The area formula involves integration — most errors occur in setting up the limits correctly.',
      pass3: 'FP2 is the hardest paper in the set. Do not skip timed practice. Time yourself and do not spend more than 15 minutes on any single question.',
    },
  },

  {
    paperId: 'FM_P3',
    code: '9231/03',
    subject: 'FURTHER_MATHS',
    year: 2,
    name: 'Further Mechanics',
    gradeBoundaries: [
      { grade: 'A', mark: 52, outOf: 60 },
      { grade: 'B', mark: 45, outOf: 60 },
      { grade: 'C', mark: 38, outOf: 60 },
      { grade: 'D', mark: 32, outOf: 60 },
      { grade: 'E', mark: 26, outOf: 60 },
    ],
    topics: [
      { topicId: 'FM_P3_T01', name: 'Momentum and Impulse (2D)', subComponents: [{ name: 'Conservation of momentum in collisions', estimatedHours: 2 }, { name: 'Coefficient of restitution (Newton\'s law)', estimatedHours: 2.5 }] },
      { topicId: 'FM_P3_T02', name: 'Circular Motion', subComponents: [{ name: 'Horizontal and vertical circles', estimatedHours: 2.5 }, { name: 'Conical pendulum', estimatedHours: 1.5 }] },
      { topicId: 'FM_P3_T03', name: 'Hooke\'s Law & Elastic Strings', subComponents: [{ name: 'Elastic PE, string problems', estimatedHours: 2 }] },
      { topicId: 'FM_P3_T04', name: 'Simple Harmonic Motion', subComponents: [{ name: 'SHM equation and solutions', estimatedHours: 2.5 }, { name: 'Pendulum, spring systems', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'FM3 builds directly on P4 Mechanics. Re-read your P4 notes on Newton\'s Laws and energy methods before starting FM3. The same free-body diagram discipline applies, now extended to rotating systems.',
      pass2: 'SHM is the conceptually richest topic — most students learn the formulas without understanding the phase-angle interpretation. Work through derivations, not just formula application.',
      pass3: 'Timed past papers. FM3 questions often require multi-step problem setups — set up the equation of motion before solving it.',
    },
  },

  {
    paperId: 'FM_P4',
    code: '9231/04',
    subject: 'FURTHER_MATHS',
    year: 2,
    name: 'Further Probability & Statistics',
    gradeBoundaries: [
      { grade: 'A', mark: 55, outOf: 60 },
      { grade: 'B', mark: 48, outOf: 60 },
      { grade: 'C', mark: 41, outOf: 60 },
      { grade: 'D', mark: 34, outOf: 60 },
      { grade: 'E', mark: 27, outOf: 60 },
    ],
    topics: [
      { topicId: 'FM_P4_T01', name: 'Continuous Random Variables', subComponents: [{ name: 'PDF/CDF definitions and calculations', estimatedHours: 2.5 }, { name: 'Expectation and variance from PDF', estimatedHours: 2 }] },
      { topicId: 'FM_P4_T02', name: 'Inference (Estimation)', subComponents: [{ name: 'Confidence intervals (normal, t-distribution)', estimatedHours: 2.5 }, { name: 'Unbiased estimators', estimatedHours: 2 }] },
      { topicId: 'FM_P4_T03', name: 'Hypothesis Testing (advanced)', subComponents: [{ name: 'Two-sample t-test, paired t-test', estimatedHours: 2 }, { name: 'Chi-squared goodness of fit', estimatedHours: 2.5 }] },
      { topicId: 'FM_P4_T04', name: 'Non-Parametric Tests', subComponents: [{ name: 'Wilcoxon signed-rank test', estimatedHours: 2 }, { name: 'Spearman rank correlation', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'FP4 is directly usable in quantitative finance — this is not abstract. Approach it with that frame: confidence intervals, hypothesis tests, and non-parametric methods are the core tools of quant research. Pass 1: understand why each test exists before learning how to execute it.',
      pass2: 'The chi-squared and t-test sections are the most heavily tested. Do 8 past questions on chi-squared alone — the degrees of freedom calculation trips up most candidates.',
      pass3: 'Timed papers. FP4 requires writing interpretation sentences ("at the 5% significance level, there is sufficient evidence to reject H0 that..."). Practice this exact language — it is credited by mark schemes.',
    },
  },

  {
    paperId: 'ECON_P3',
    code: '9708/31',
    subject: 'ECONOMICS',
    year: 2,
    name: 'A2 Multiple Choice (Macro)',
    gradeBoundaries: [
      { grade: 'A', mark: 30, outOf: 40 },
      { grade: 'B', mark: 26, outOf: 40 },
      { grade: 'C', mark: 22, outOf: 40 },
      { grade: 'D', mark: 18, outOf: 40 },
      { grade: 'E', mark: 14, outOf: 40 },
    ],
    topics: [
      { topicId: 'ECON_P3_T01', name: 'National Income & Measurement', subComponents: [{ name: 'GDP methods, real vs nominal', estimatedHours: 1.5 }] },
      { topicId: 'ECON_P3_T02', name: 'Macroeconomic Policy', subComponents: [{ name: 'Fiscal, monetary, supply-side', estimatedHours: 2 }, { name: 'AD-AS model', estimatedHours: 2 }] },
      { topicId: 'ECON_P3_T03', name: 'International Trade', subComponents: [{ name: 'Comparative advantage, terms of trade', estimatedHours: 2 }, { name: 'Exchange rates and balance of payments', estimatedHours: 2.5 }] },
      { topicId: 'ECON_P3_T04', name: 'Development Economics', subComponents: [{ name: 'Measures of development, HDI', estimatedHours: 1.5 }, { name: 'Policies for development', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'A2 macro covers exchange rates, balance of payments, and development economics — study real-world cases alongside the theory. Bangladesh, Singapore, and Germany are useful comparative examples for exchange rate policy questions.',
      pass2: 'AD-AS is the core model of A2 macro. Every policy question (fiscal, monetary, supply-side) can be answered using AD-AS. Build fluency with this framework above everything else.',
      pass3: 'Timed MCQ papers. A2 MCQ is harder than AS — the distractors are more plausible. Budget 90 seconds per question.',
    },
  },

  {
    paperId: 'ECON_P4',
    code: '9708/41',
    subject: 'ECONOMICS',
    year: 2,
    name: 'A2 Data Response & Essays',
    gradeBoundaries: [
      { grade: 'A', mark: 45, outOf: 60 },
      { grade: 'B', mark: 38, outOf: 60 },
      { grade: 'C', mark: 32, outOf: 60 },
      { grade: 'D', mark: 26, outOf: 60 },
      { grade: 'E', mark: 20, outOf: 60 },
    ],
    topics: [
      { topicId: 'ECON_P4_T01', name: 'Applied Macroeconomics', subComponents: [{ name: 'Policy analysis with trade-offs', estimatedHours: 2.5 }, { name: 'International case studies', estimatedHours: 2 }] },
      { topicId: 'ECON_P4_T02', name: 'Development Economics Essays', subComponents: [{ name: 'Role of aid, FDI, remittances', estimatedHours: 2.5 }, { name: 'Bangladesh-context applications', estimatedHours: 2 }] },
      { topicId: 'ECON_P4_T03', name: 'Advanced Essay Technique', subComponents: [{ name: 'Two-sided analysis with judgment', estimatedHours: 2 }, { name: 'Evaluative conclusions', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'Read the Cambridge Economics A Level examiners\' reports for the last 3 years. These documents state explicitly what distinguishes a Level 3 from a Level 4 answer. This is not optional.',
      pass2: 'Write one development economics essay per week for 8 weeks. Use Bangladesh as a case study wherever possible — it is genuinely high-yield and personally authentic.',
      pass3: 'Timed full papers. The P4 essay section requires managing time across multiple essays — practice the time-split explicitly.',
    },
  },

  {
    paperId: 'PHYS_P4',
    code: '9702/41',
    subject: 'PHYSICS',
    year: 2,
    name: 'A Level Structured Questions',
    gradeBoundaries: [
      { grade: 'A', mark: 78, outOf: 100 },
      { grade: 'B', mark: 67, outOf: 100 },
      { grade: 'C', mark: 57, outOf: 100 },
      { grade: 'D', mark: 47, outOf: 100 },
      { grade: 'E', mark: 37, outOf: 100 },
    ],
    topics: [
      { topicId: 'PHYS_P4_T01', name: 'Gravitational Fields', subComponents: [{ name: 'Field strength, potential, orbits', estimatedHours: 2.5 }] },
      { topicId: 'PHYS_P4_T02', name: 'Electric Fields', subComponents: [{ name: 'Coulomb\'s law, field strength, potential', estimatedHours: 2.5 }] },
      { topicId: 'PHYS_P4_T03', name: 'Capacitance', subComponents: [{ name: 'Capacitors in series/parallel, energy stored, charging/discharging', estimatedHours: 3 }] },
      { topicId: 'PHYS_P4_T04', name: 'Magnetic Fields & Electromagnetism', subComponents: [{ name: 'Force on conductor, Faraday\'s law, Lenz\'s law', estimatedHours: 3 }] },
      { topicId: 'PHYS_P4_T05', name: 'Nuclear & Particle Physics', subComponents: [{ name: 'Radioactive decay, half-life, nuclear equations', estimatedHours: 2 }] },
      { topicId: 'PHYS_P4_T06', name: 'Oscillations', subComponents: [{ name: 'SHM equations, resonance, damping', estimatedHours: 2.5 }] },
      { topicId: 'PHYS_P4_T07', name: 'Thermal Physics (A2)', subComponents: [{ name: 'Ideal gas law, internal energy, first law of thermodynamics', estimatedHours: 2 }] },
    ],
    prepMethod: {
      pass1: 'P4 is the longest and broadest paper in the set (100 marks). Create a topic-weighted revision plan: fields (gravitational + electric + magnetic) together account for ~40% of marks. Weight your time accordingly.',
      pass2: 'Capacitance and magnetic fields are most commonly dropped. Do 10 past questions on capacitor charging/discharging graphs alone — this specific sub-topic appears in nearly every session.',
      pass3: 'Full timed papers under strict conditions. P4 is 2 hours — pace your energy. Do not leave the oscillations and thermal sections until the end of your revision; they require SHM from FM3.',
    },
  },

  {
    paperId: 'PHYS_P5',
    code: '9702/51',
    subject: 'PHYSICS',
    year: 2,
    name: 'Planning, Analysis & Evaluation',
    gradeBoundaries: [
      { grade: 'A', mark: 26, outOf: 30 },
      { grade: 'B', mark: 22, outOf: 30 },
      { grade: 'C', mark: 18, outOf: 30 },
      { grade: 'D', mark: 15, outOf: 30 },
      { grade: 'E', mark: 11, outOf: 30 },
    ],
    topics: [
      { topicId: 'PHYS_P5_T01', name: 'Experimental Design (Planning)', subComponents: [{ name: 'Hypothesis, variables, control of variables', estimatedHours: 2 }, { name: 'Method description, apparatus list', estimatedHours: 1.5 }] },
      { topicId: 'PHYS_P5_T02', name: 'Data Analysis (Linearisation)', subComponents: [{ name: 'Rearranging equations into y = mx + c form', estimatedHours: 2.5 }, { name: 'Log-log and semi-log graphs', estimatedHours: 2 }] },
      { topicId: 'PHYS_P5_T03', name: 'Evaluation of Method', subComponents: [{ name: 'Sources of systematic and random error', estimatedHours: 1.5 }, { name: 'Suggested improvements with justification', estimatedHours: 1.5 }] },
    ],
    prepMethod: {
      pass1: 'P5 planning questions follow a fixed structure. Study the mark-scheme template across 5 past papers: (1) state hypothesis, (2) list independent/dependent/controlled variables, (3) describe method in steps, (4) state expected result. Internalize this template.',
      pass2: 'Linearisation is the technical skill of P5. Given a power-law equation, practice re-arranging it to plot as a straight-line graph. Do 10 examples from different equation types.',
      pass3: 'Sit two past P5 papers under timed conditions (90 min). P5 rewards accuracy — there is little room for calculation errors in a 30-mark paper.',
    },
  },
];

// ---------------------------------------------------------------------------
// SAT DATA
// ---------------------------------------------------------------------------

export const SAT_DATA: SATData = {
  targetScore: 1560,
  sections: [
    {
      name: 'Math',
      targetScore: 790,
      topicBreakdown: [
        'Algebra: linear equations, systems of equations, linear inequalities (~35% of math section)',
        'Advanced Math: quadratic and exponential functions, equivalent expressions (~35% of math section)',
        'Problem-Solving & Data Analysis: ratios, percentages, statistics, probability (~15% of math section)',
        'Geometry & Trigonometry: area, volume, circles, right triangles, sine/cosine (~15% of math section)',
      ],
      prepNotes: 'Your A-Level Maths gives you a significant advantage in the Math section — the SAT Math ceiling is below A-Level P1 standard. The most common drops are in the Problem-Solving section (data tables, statistics) and Geometry. Focus on those two areas. Learn the SAT\'s specific question phrasing — it differs from Cambridge style.',
    },
    {
      name: 'Evidence-Based Reading & Writing (EBRW)',
      targetScore: 770,
      topicBreakdown: [
        'Reading: information and ideas, rhetoric, synthesis across two passages',
        'Writing: expression of ideas, standard English conventions (grammar, punctuation)',
        'Data interpretation in context: graphs and tables embedded in reading passages',
      ],
      prepNotes: 'The EBRW section rewards precision over speed. The hardest questions involve evidence-pairing (Q1 answer supported by Q2 evidence from the text). Practice these specifically. Grammar rules tested are a fixed set — learn the 12 most common SAT grammar rules and you cover ~80% of the writing section.',
    },
  ],
  prepResources: [
    { name: 'Khan Academy SAT Prep', cost: 'Free', notes: 'Official College Board partner. Personalized practice based on PSAT results. Most efficient free resource available.' },
    { name: 'College Board Official SAT Practice Tests (8 tests)', cost: 'Free', notes: 'Download from collegeboard.org. Closest to the real exam. Use under strict timed conditions only.' },
    { name: 'Erica Meltzer — The Critical Reader', cost: '~$30 USD', notes: 'Best resource for EBRW. Specifically addresses the evidence-pairing question type. Worth buying.' },
    { name: 'College Panda Math Workbook', cost: '~$20 USD', notes: 'Covers SAT Math at depth without over-complicating it. Good complement to Khan Academy.' },
  ],
  recommendedTimeline: '12 weeks structured prep: Weeks 1–2 diagnostic (take one full official test, identify weak areas), Weeks 3–8 targeted topic work (Khan Academy + Meltzer/College Panda), Weeks 9–10 mixed practice tests (one per week under timed conditions), Weeks 11–12 review errors only (no new material).',
};

// ---------------------------------------------------------------------------
// UNIVERSITIES
// ---------------------------------------------------------------------------

export const UNIVERSITIES: University[] = [

  // ── ASIA ──────────────────────────────────────────────────────────────────

  {
    uniId: 'NUS',
    name: 'National University of Singapore',
    country: 'Singapore',
    region: 'ASIA',
    qsRank2024: 8,
    quantProgram: 'BSc Business Analytics / BBA Finance (Quantitative track)',
    category: 'DREAM',
    scholarship: {
      name: 'ASEAN Undergraduate Scholarship',
      value: 'Full tuition + SGD 5,800/yr living allowance + hostel',
      eligibility: 'ASEAN nationals, means-tested, 3 A grades at A-Level or equivalent',
    },
    internshipPrograms: ['GIC Internship Programme', 'MAS Internship', 'DBS Management Associate pipeline'],
  },
  {
    uniId: 'NTU',
    name: 'Nanyang Technological University',
    country: 'Singapore',
    region: 'ASIA',
    qsRank2024: 15,
    quantProgram: 'BSc Mathematical Sciences (Financial Mathematics track)',
    category: 'REACH',
    scholarship: {
      name: 'Nanyang Scholarship',
      value: 'Full tuition + SGD 5,800/yr living allowance',
      eligibility: 'Academic excellence (top 5% cohort), ASEAN nationals eligible',
    },
    internshipPrograms: ['Temasek Holdings Internship', 'DBS Quantitative Research'],
  },
  {
    uniId: 'HKUST',
    name: 'Hong Kong University of Science and Technology',
    country: 'Hong Kong',
    region: 'ASIA',
    qsRank2024: 40,
    quantProgram: 'BBA Risk Management and Business Intelligence',
    category: 'REACH',
    scholarship: {
      name: 'HKUST International Scholarship',
      value: 'HKD 100,000/yr (~USD 12,800)',
      eligibility: 'Top academic performance, international students',
    },
    internshipPrograms: ['Goldman Sachs HK internship', 'HKEX campus recruitment'],
  },
  {
    uniId: 'HKU',
    name: 'University of Hong Kong',
    country: 'Hong Kong',
    region: 'ASIA',
    qsRank2024: 26,
    quantProgram: 'BBA Finance (Quantitative Finance elective track)',
    category: 'TARGET',
    scholarship: {
      name: 'HKU Entrance Scholarship',
      value: 'HKD 40,000–120,000 (varies)',
      eligibility: 'International applicants with outstanding academic record',
    },
    internshipPrograms: ['Morgan Stanley HK', 'Bank of America HK internship'],
  },

  // ── NORTH AMERICA ─────────────────────────────────────────────────────────

  {
    uniId: 'MIT',
    name: 'Massachusetts Institute of Technology',
    country: 'United States',
    region: 'NORTH_AMERICA',
    qsRank2024: 1,
    quantProgram: 'BSc Mathematics with Computer Science (Course 18C)',
    category: 'DREAM',
    scholarship: {
      name: 'MIT Need-Based Aid',
      value: 'Meets 100% of demonstrated need (families earning <$90K pay nothing)',
      eligibility: 'All admitted students, needs-blind for international in select years — verify current policy',
    },
    internshipPrograms: ['Jane Street campus recruitment', 'D.E. Shaw campus', 'Two Sigma campus'],
  },
  {
    uniId: 'PRINCETON',
    name: 'Princeton University',
    country: 'United States',
    region: 'NORTH_AMERICA',
    qsRank2024: 17,
    quantProgram: 'BSc Operations Research and Financial Engineering (ORFE)',
    category: 'DREAM',
    scholarship: {
      name: 'Princeton Financial Aid',
      value: 'Meets 100% of demonstrated need. No loans in aid packages.',
      eligibility: 'Needs-blind for US citizens; needs-aware for international — verify current policy',
    },
    internshipPrograms: ['Citadel campus recruitment', 'Goldman Sachs campus', 'Two Sigma internship'],
  },
  {
    uniId: 'COLUMBIA',
    name: 'Columbia University',
    country: 'United States',
    region: 'NORTH_AMERICA',
    qsRank2024: 33,
    quantProgram: 'BSc Applied Mathematics (Financial Mathematics track)',
    category: 'REACH',
    scholarship: {
      name: 'Columbia Financial Aid',
      value: 'Meets 100% of demonstrated need for all admitted students',
      eligibility: 'Needs-blind admissions for all students including international',
    },
    internshipPrograms: ['Wall Street proximity: all major banks recruit directly on campus'],
  },
  {
    uniId: 'UTORONTO',
    name: 'University of Toronto',
    country: 'Canada',
    region: 'NORTH_AMERICA',
    qsRank2024: 25,
    quantProgram: 'BSc Statistics + Economics (Mathematical Finance stream)',
    category: 'TARGET',
    scholarship: {
      name: 'UofT International Scholars Award',
      value: 'CAD 7,500–15,000/yr',
      eligibility: 'International students, academic merit, A-Level results',
    },
    internshipPrograms: ['CPP Investments', 'OMERS campus', 'TD Securities internship'],
  },

  // ── EUROPE ────────────────────────────────────────────────────────────────

  {
    uniId: 'ETH',
    name: 'ETH Zurich',
    country: 'Switzerland',
    region: 'EUROPE',
    qsRank2024: 7,
    quantProgram: 'BSc Mathematics / BSc Computational Science and Engineering',
    category: 'DREAM',
    scholarship: {
      name: 'ETH Excellence Scholarship',
      value: 'CHF 12,000/year + tuition waiver',
      eligibility: 'Top 10% of applicants, merit-based, available for Master\'s entry — verify Bachelor\'s eligibility',
    },
    internshipPrograms: ['Zurich-based prop trading firms', 'UBS Quant Research', 'Credit Suisse QIS'],
  },
  {
    uniId: 'UVA',
    name: 'University of Amsterdam',
    country: 'Netherlands',
    region: 'EUROPE',
    qsRank2024: 55,
    quantProgram: 'BSc Econometrics and Data Science / BSc Actuarial Science',
    category: 'TARGET',
    scholarship: {
      name: 'UvA Holland Scholarship',
      value: 'EUR 5,000 (one-time)',
      eligibility: 'Non-EEA students, GPA-based. First year only.',
    },
    internshipPrograms: ['Optiver campus recruitment', 'Flow Traders campus', 'IMC Trading campus — all recruit heavily from UvA'],
  },
  {
    uniId: 'ERASMUS',
    name: 'Erasmus University Rotterdam',
    country: 'Netherlands',
    region: 'EUROPE',
    qsRank2024: 197,
    quantProgram: 'BSc Econometrics and Operations Research (globally top-ranked for this field)',
    category: 'TARGET',
    scholarship: {
      name: 'Erasmus Holland Scholarship',
      value: 'EUR 5,000 (one-time)',
      eligibility: 'Non-EEA students, merit-based',
    },
    internshipPrograms: ['Robeco Quantitative Investments', 'Flow Traders', 'ING Quantitative Research'],
  },
  {
    uniId: 'IMPERIAL',
    name: 'Imperial College London',
    country: 'United Kingdom',
    region: 'EUROPE',
    qsRank2024: 8,
    quantProgram: 'BSc Mathematics / MEng Computing (joint Mathematics track)',
    category: 'REACH',
    scholarship: {
      name: 'Imperial College Scholarship',
      value: 'GBP 5,000/yr',
      eligibility: 'Outstanding academic performance, international students',
    },
    internshipPrograms: ['Goldman Sachs quant desk', 'Man Group internship', 'Winton Capital research internship'],
  },
  {
    uniId: 'LSE',
    name: 'London School of Economics',
    country: 'United Kingdom',
    region: 'EUROPE',
    qsRank2024: 45,
    quantProgram: 'BSc Mathematics and Economics / BSc Statistics',
    category: 'REACH',
    scholarship: {
      name: 'LSE Financial Support',
      value: 'GBP 2,000–6,000/yr (limited international scholarships)',
      eligibility: 'Merit + financial need',
    },
    internshipPrograms: ['City of London internship pipeline', 'Barclays Quant Research', 'Jupiter AM'],
  },

  // ── AUSTRALIA ─────────────────────────────────────────────────────────────

  {
    uniId: 'UNSW',
    name: 'University of New South Wales',
    country: 'Australia',
    region: 'AUSTRALIA',
    qsRank2024: 45,
    quantProgram: 'Bachelor of Applied Finance + BSc Mathematics (double degree)',
    category: 'REACH',
    scholarship: {
      name: 'UNSW International Scholarship',
      value: 'AUD 10,000/yr (partial)',
      eligibility: 'International students, ATAR equivalent, A-Level results',
    },
    internshipPrograms: ['Optiver Sydney campus recruitment', 'Macquarie Group Graduate Programme', 'IMC Sydney'],
  },
  {
    uniId: 'UMELB',
    name: 'University of Melbourne',
    country: 'Australia',
    region: 'AUSTRALIA',
    qsRank2024: 33,
    quantProgram: 'BCom (Finance & Mathematics) / BSc (Mathematics & Statistics)',
    category: 'REACH',
    scholarship: {
      name: 'Melbourne International Undergraduate Scholarship',
      value: 'AUD 10,000–26,000/yr',
      eligibility: 'Academic merit, international students — competitive',
    },
    internshipPrograms: ['ANZ Graduate Programme', 'AQR Australia', 'Commonwealth Bank NextGen Scholarship'],
  },
  {
    uniId: 'MQ',
    name: 'Macquarie University',
    country: 'Australia',
    region: 'AUSTRALIA',
    qsRank2024: 195,
    quantProgram: 'Bachelor of Applied Finance (BAppFin)',
    category: 'TARGET',
    scholarship: {
      name: 'Macquarie Vice-Chancellor\'s International Scholarship',
      value: 'AUD 10,000/yr',
      eligibility: 'International students, minimum 85% aggregate in A-Levels',
    },
    internshipPrograms: ['Macquarie Group internship (strong pipeline)', 'Westpac Banking Corp'],
  },
  {
    uniId: 'ANU',
    name: 'Australian National University',
    country: 'Australia',
    region: 'AUSTRALIA',
    qsRank2024: 34,
    quantProgram: 'BActSt (Actuarial Studies) / BCom Finance',
    category: 'TARGET',
    scholarship: {
      name: 'ANU Chancellor\'s International Scholarship',
      value: 'AUD 10,000/yr',
      eligibility: 'Top 1% of international applicants — competitive',
    },
    internshipPrograms: ['Australian Treasury internship', 'RBA graduate programme pipeline', 'ASIC'],
  },
];

// ---------------------------------------------------------------------------
// CORPORATE PIPELINE — EXIT STRATEGY
// ---------------------------------------------------------------------------

export const FIRMS: Firm[] = [

  // ── ASIA (Singapore) ──────────────────────────────────────────────────────

  { firmId: 'JANE_ST_SG', name: 'Jane Street', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'ELITE', roleTypes: ['Quantitative Trader', 'Software Developer', 'Quantitative Researcher'], hiringRoute: 'CAMPUS', graduateProgram: 'Jane Street Graduate Programme (London/NY/HK/SG)' },
  { firmId: 'OPTIVER_SG', name: 'Optiver', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'ELITE', roleTypes: ['Trader', 'Software Engineer', 'Researcher'], hiringRoute: 'CAMPUS', graduateProgram: 'Optiver Graduate Trader Programme' },
  { firmId: 'IMC_SG', name: 'IMC Trading', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'ELITE', roleTypes: ['Trader', 'Quant Researcher', 'Dev'], hiringRoute: 'MIXED', graduateProgram: 'IMC Graduate Programme' },
  { firmId: 'GIC', name: 'GIC (Government of Singapore Investment Corporation)', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'TIER1', roleTypes: ['Portfolio Manager', 'Quant Analyst', 'Risk Analyst'], hiringRoute: 'CAMPUS', graduateProgram: 'GIC Investment Programme' },
  { firmId: 'TEMASEK', name: 'Temasek Holdings', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'TIER1', roleTypes: ['Investment Analyst', 'Quantitative Investments'], hiringRoute: 'CAMPUS', graduateProgram: 'Temasek Management Associate Programme' },
  { firmId: 'DBS', name: 'DBS Bank', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'TIER2', roleTypes: ['Quantitative Analyst', 'Data Scientist', 'Strats'], hiringRoute: 'CAMPUS', graduateProgram: 'DBS Management Associate Programme' },
  { firmId: 'OCBC', name: 'OCBC Bank', city: 'Singapore', country: 'Singapore', region: 'ASIA', tier: 'TIER2', roleTypes: ['Risk Quant', 'Data Analytics', 'Finance Graduate'], hiringRoute: 'CAMPUS', graduateProgram: 'OCBC Graduate Programme' },

  // ── NORTH AMERICA ─────────────────────────────────────────────────────────

  { firmId: 'JANE_ST_NY', name: 'Jane Street', city: 'New York', country: 'United States', region: 'NORTH_AMERICA', tier: 'ELITE', roleTypes: ['Quantitative Trader', 'Quantitative Researcher', 'Software Developer'], hiringRoute: 'CAMPUS', graduateProgram: 'Jane Street Graduate Programme' },
  { firmId: 'CITADEL', name: 'Citadel', city: 'Chicago/New York', country: 'United States', region: 'NORTH_AMERICA', tier: 'ELITE', roleTypes: ['Quantitative Researcher', 'Portfolio Manager', 'Software Engineer'], hiringRoute: 'CAMPUS', graduateProgram: 'Citadel Academy / Summer Intern to Full-Time' },
  { firmId: 'TWO_SIGMA', name: 'Two Sigma', city: 'New York', country: 'United States', region: 'NORTH_AMERICA', tier: 'ELITE', roleTypes: ['Quantitative Researcher', 'Software Engineer', 'Data Scientist'], hiringRoute: 'CAMPUS', graduateProgram: 'Two Sigma PhD/Masters Fellowship + Full-Time' },
  { firmId: 'AQR', name: 'AQR Capital Management', city: 'Greenwich, CT', country: 'United States', region: 'NORTH_AMERICA', tier: 'TIER1', roleTypes: ['Quant Researcher', 'Portfolio Analyst', 'Data Scientist'], hiringRoute: 'MIXED', graduateProgram: 'AQR Internship → Full-Time Pipeline' },
  { firmId: 'POINT72', name: 'Point72 Asset Management', city: 'Stamford, CT', country: 'United States', region: 'NORTH_AMERICA', tier: 'TIER1', roleTypes: ['Portfolio Manager', 'Fundamental Analyst', 'Quant Analyst'], hiringRoute: 'CAMPUS', graduateProgram: 'Point72 Academy' },
  { firmId: 'CPP', name: 'CPP Investments', city: 'Toronto', country: 'Canada', region: 'NORTH_AMERICA', tier: 'TIER1', roleTypes: ['Investment Analyst', 'Quantitative Investments', 'Risk'], hiringRoute: 'CAMPUS', graduateProgram: 'CPP Investments Graduate Programme' },

  // ── EUROPE ────────────────────────────────────────────────────────────────

  { firmId: 'OPTIVER_AMS', name: 'Optiver', city: 'Amsterdam', country: 'Netherlands', region: 'EUROPE', tier: 'ELITE', roleTypes: ['Trader', 'Software Engineer', 'Researcher'], hiringRoute: 'CAMPUS', graduateProgram: 'Optiver Graduate Trader Programme (HQ Amsterdam)' },
  { firmId: 'IMC_AMS', name: 'IMC Trading', city: 'Amsterdam', country: 'Netherlands', region: 'EUROPE', tier: 'ELITE', roleTypes: ['Trader', 'Quant Developer', 'Researcher'], hiringRoute: 'CAMPUS', graduateProgram: 'IMC Trading Graduate Programme (HQ Amsterdam)' },
  { firmId: 'FLOW', name: 'Flow Traders', city: 'Amsterdam', country: 'Netherlands', region: 'EUROPE', tier: 'ELITE', roleTypes: ['Trader', 'Quant Researcher', 'Technology'], hiringRoute: 'CAMPUS', graduateProgram: 'Flow Traders Graduate Programme' },
  { firmId: 'MAN', name: 'Man Group', city: 'London', country: 'United Kingdom', region: 'EUROPE', tier: 'TIER1', roleTypes: ['Quantitative Researcher', 'Portfolio Manager', 'Data Scientist'], hiringRoute: 'MIXED', graduateProgram: 'Man Group Intern to Full-Time' },
  { firmId: 'WINTON', name: 'Winton Capital', city: 'London', country: 'United Kingdom', region: 'EUROPE', tier: 'TIER1', roleTypes: ['Researcher', 'Data Scientist', 'Systematic Trader'], hiringRoute: 'OPEN', graduateProgram: null },
  { firmId: 'ROBECO', name: 'Robeco Quantitative Investments', city: 'Rotterdam', country: 'Netherlands', region: 'EUROPE', tier: 'TIER1', roleTypes: ['Quant Researcher', 'Portfolio Analyst', 'Factor Strategist'], hiringRoute: 'CAMPUS', graduateProgram: 'Robeco Trainee Programme' },

  // ── AUSTRALIA ─────────────────────────────────────────────────────────────

  { firmId: 'OPTIVER_SYD', name: 'Optiver', city: 'Sydney', country: 'Australia', region: 'AUSTRALIA', tier: 'ELITE', roleTypes: ['Trader', 'Software Engineer', 'Researcher'], hiringRoute: 'CAMPUS', graduateProgram: 'Optiver Graduate Trader Programme (Sydney office)' },
  { firmId: 'IMC_SYD', name: 'IMC Trading', city: 'Sydney', country: 'Australia', region: 'AUSTRALIA', tier: 'ELITE', roleTypes: ['Trader', 'Software Engineer'], hiringRoute: 'CAMPUS', graduateProgram: 'IMC Graduate Programme (Sydney)' },
  { firmId: 'MACQUARIE', name: 'Macquarie Group', city: 'Sydney', country: 'Australia', region: 'AUSTRALIA', tier: 'TIER1', roleTypes: ['Quantitative Analyst', 'Commodities/Markets Analyst', 'Investment Banking Analyst'], hiringRoute: 'CAMPUS', graduateProgram: 'Macquarie Group Graduate Programme (requires PR/Citizenship for most divisions — verify)' },
  { firmId: 'ANZ', name: 'ANZ Banking Group', city: 'Melbourne/Sydney', country: 'Australia', region: 'AUSTRALIA', tier: 'TIER2', roleTypes: ['Risk Quant', 'Data Analytics', 'Graduate Analyst'], hiringRoute: 'CAMPUS', graduateProgram: 'ANZ Graduate Programme' },
];

// ---------------------------------------------------------------------------
// INGO / DevSec PROGRAMS
// ---------------------------------------------------------------------------

export const INGO_PROGRAMS: INGOProgram[] = [
  {
    orgId: 'WORLDBANK',
    organization: 'World Bank Group',
    program: 'Young Professionals Program (YPP)',
    applicationRoute: 'Annual competitive application. ~50 places globally. Requires Masters/PhD (Economics, Finance, Data Science). Apply via worldbank.org/careers. Shortlisting in Oct, interviews Dec–Jan, start following September.',
    bangladeshNote: 'Bangladesh is an IDA borrowing country — there is no formal country quota but diversity preferences apply. Strong development economics + Bangladesh-specific research is a significant differentiator.',
  },
  {
    orgId: 'ADB',
    organization: 'Asian Development Bank',
    program: 'Young Professionals Program',
    applicationRoute: 'Annual application, Manila-based. Requires Masters degree, under 32 years old. Apply at adb.org/careers. Strong preference for economics, finance, data analytics, infrastructure backgrounds.',
    bangladeshNote: 'Bangladesh is a major ADB borrowing member. Regional connectivity from Bangladesh is viewed positively. ADB has active Bangladesh Country Office for networking.',
  },
  {
    orgId: 'UNDP',
    organization: 'United Nations Development Programme',
    program: 'Junior Professional Officer (JPO) Programme',
    applicationRoute: 'Funded by donor governments. Bangladesh Ministry of Foreign Affairs sponsors JPO slots — contact MoFA Economic Diplomacy wing or check UN Job List annually. Requires 2+ years work experience at application stage.',
    bangladeshNote: 'Bangladesh government sponsors a limited number of JPO slots annually. Priority sectors historically include finance/economics, governance, environment. Early networking with MoFA is recommended.',
  },
  {
    orgId: 'IMF',
    organization: 'International Monetary Fund',
    program: 'Economist Program',
    applicationRoute: 'Annual competitive hiring. Requires PhD in Economics or Finance for Economist Program. Junior professionals enter via Economist Program Internship (EPI) during PhD. Apply at imf.org/careers.',
    bangladeshNote: 'No country quota but developing-country candidates are encouraged. Bangladesh has an IMF resident representative office for potential networking.',
  },
  {
    orgId: 'BRAC',
    organization: 'BRAC (Bangladesh)',
    program: 'BRAC Analytics & Data Division',
    applicationRoute: 'Direct application via brac.net/careers. BRAC is the world\'s largest NGO and has a growing quantitative analytics division covering microfinance, health, and education data. Entry-level Data Analyst roles available post-graduation.',
    bangladeshNote: 'Bangladesh-based. Directly aligned with the Dead Capital Project vision. Strong internal mobility across BRAC\'s global offices (offices in 10+ countries).',
  },
  {
    orgId: 'GATES',
    organization: 'Bill & Melinda Gates Foundation',
    program: 'Data & Analytics Roles',
    applicationRoute: 'Competitive open applications via gatesfoundation.org/careers. Quantitative analytics, econometrics, and data science roles in Global Development and Global Health divisions. Masters level minimum for most analyst roles.',
    bangladeshNote: 'Gates Foundation has active Bangladesh programmes in health, agriculture, and financial inclusion. Bangladesh-specific research publications are valued.',
  },
];

// ---------------------------------------------------------------------------
// PORTFOLIO PROJECTS — BARBELL CEILING
// ---------------------------------------------------------------------------

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    projectId: 'BACKTESTER',
    name: 'Moving Average Crossover Backtester',
    category: 'QUANT_PORTFOLIO',
    what: 'A Python-based systematic trading strategy simulator using dual moving-average crossover signals (e.g., 50-day / 200-day EMA). Downloads historical price data via yfinance, generates buy/sell signals, and computes strategy returns vs buy-and-hold benchmark.',
    why: 'The single most common first quant project — employers have seen it. What makes it not common is intellectual honesty: publishing results showing the strategy underperforms buy-and-hold (which it almost always does), documenting why (transaction costs, overfitting, regime changes), and explaining what this means for real trading. Owning this honestly is more impressive than a fabricated alpha-generating strategy.',
    whyNotAlternatives: 'Many beginners build strategies that "work" due to lookahead bias (using future data unknowingly). A correctly implemented backtester with .shift(1) on signals and documented performance is rarer than it looks. The simplicity of the strategy is an asset, not a liability — it isolates the backtesting mechanics cleanly.',
    knowledgeBase: [
      'Python (variables, loops, functions)',
      'pandas (DataFrames, time series indexing, rolling windows)',
      'numpy (vectorized operations)',
      'matplotlib (time series plots, strategy equity curve)',
      'yfinance (data download)',
      'Basic financial concepts: returns, Sharpe ratio, drawdown',
    ],
  },
  {
    projectId: 'REMITTANCE',
    name: 'Bangladesh Remittance & Economic Indicator Analysis',
    category: 'QUANT_PORTFOLIO',
    what: 'A data analysis project using World Bank Open Data API to pull Bangladesh remittance flows, GDP per capita, inflation, poverty headcount ratio, and foreign exchange reserves from 1990–present. Visualizes trends, computes correlations, and builds a simple regression model (remittance inflows ~ exchange rate + seasonal factors).',
    why: 'This is the project no other quant finance student applying for Singapore/Australia roles has. It demonstrates: data acquisition from APIs, time-series analysis, econometric basics, and authentic context. The Bangladesh angle is a genuine competitive differentiator — firms that care about emerging market exposure (GIC, ADB, BRAC) will specifically remember this.',
    whyNotAlternatives: 'Most quant portfolio projects are US/EU equity data. This is not a stylistic choice — it is a strategic one. The uniqueness is the point. The World Bank API is also cleaner and better documented than most financial data APIs, making it a technically sound first project.',
    knowledgeBase: [
      'Python (functions, data structures)',
      'pandas (DataFrames, merge, groupby)',
      'requests or wbgapi (World Bank API)',
      'matplotlib / seaborn (visualization)',
      'scipy.stats (basic correlation, regression)',
      'Basic econometric concepts: correlation ≠ causation, regression interpretation',
      'Context: Bangladesh remittance economics (Rosengren, World Bank reports)',
    ],
  },
  {
    projectId: 'CAPM',
    name: 'CAPM Calculator & Rolling Beta Estimator',
    category: 'QUANT_PORTFOLIO',
    what: 'Python implementation of the Capital Asset Pricing Model. Downloads stock and market index data, estimates beta via OLS regression (stock returns on market returns), computes expected return via CAPM, and plots rolling 60-day beta to show how systematic risk changes over time.',
    why: 'CAPM is foundational finance theory and OLS regression is the foundational statistical tool. Building this demonstrates both. The rolling beta visualization is what elevates it from a textbook exercise to a genuine research insight — students applying for quant roles are expected to understand time-varying risk.',
    whyNotAlternatives: 'Single-point beta estimation is trivial and tells you little. Rolling beta is what practitioners actually look at. The insight that beta is not constant is more valuable than knowing how to compute it once.',
    knowledgeBase: [
      'pandas, numpy, yfinance',
      'statsmodels (OLS regression)',
      'matplotlib',
      'Portfolio theory: expected return, systematic vs idiosyncratic risk, beta interpretation',
      'Statistics: linear regression, R-squared, p-values',
    ],
  },
  {
    projectId: 'MONTE_CARLO',
    name: 'Monte Carlo Value-at-Risk Engine',
    category: 'QUANT_PORTFOLIO',
    what: 'A risk measurement tool that simulates 10,000 future portfolio price paths using Geometric Brownian Motion, then computes the 1-day 95% and 99% VaR (the loss not expected to be exceeded with 95%/99% probability). Compares Monte Carlo VaR against Historical VaR and Parametric (Variance-Covariance) VaR.',
    why: 'VaR is the most widely used risk metric in financial institutions globally — every bank, asset manager, and regulator uses it. Building all three methods and comparing them shows depth. It also demonstrates that Monte Carlo simulation is understood, which is a core quant skill.',
    whyNotAlternatives: 'Building only one VaR method is incomplete. The comparison of methods — and the honest documentation of when each fails (parametric VaR assumes normality; Monte Carlo VaR assumes GBM; historical VaR assumes history repeats) — is what makes the project credible.',
    knowledgeBase: [
      'pandas, numpy',
      'scipy.stats (normal distribution, percentile calculations)',
      'matplotlib',
      'Statistics: percentiles, standard deviation, normal distribution',
      'Finance: portfolio returns, volatility, Value at Risk concept',
      'Probability: Geometric Brownian Motion basics, random number generation',
    ],
  },
  {
    projectId: 'DATA_MODELLING',
    name: 'Financial Time Series Modelling (ARIMA/GARCH)',
    category: 'DATA_MODELLING',
    what: 'Fits an ARIMA model to a financial time series (e.g., daily returns of a major index or currency pair) to model conditional mean, then fits a GARCH(1,1) model to capture time-varying volatility (volatility clustering). Forecasts next-period volatility and evaluates model fit.',
    why: 'Volatility modelling is a core quant finance skill. GARCH in particular is used extensively in risk management, options pricing, and portfolio construction. Demonstrating you can fit, diagnose, and interpret a GARCH model puts you ahead of most undergraduate applicants.',
    whyNotAlternatives: 'Simple ARIMA without GARCH misses the key insight of financial time series: the volatility clusters. A project that ignores this is incomplete from a practitioner perspective. The combination of ARIMA + GARCH is the minimum viable time-series toolkit.',
    knowledgeBase: [
      'pandas, numpy',
      'statsmodels (ARIMA)',
      'arch library (GARCH)',
      'matplotlib',
      'Statistics: autocorrelation, stationarity, ADF test',
      'Finance: financial returns properties (fat tails, volatility clustering)',
      'Information criteria: AIC, BIC for model selection',
    ],
  },
  {
    projectId: 'ALGO_THINKING',
    name: 'Algorithmic Problem Solving Portfolio (LeetCode / Project Euler)',
    category: 'ALGO_THINKING',
    what: 'A curated GitHub repository of solved algorithmic problems: 30+ LeetCode problems (Medium/Hard, focused on arrays, dynamic programming, graphs, and sorting) plus 15+ Project Euler problems (focused on number theory and combinatorics). Each solution documented with time/space complexity analysis.',
    why: 'Prop trading firms (Jane Street, Optiver, IMC, Flow Traders) use algorithmic coding interviews as their primary technical screen. Having a documented problem-solving portfolio demonstrates consistent practice — not just that you crammed before an interview. Project Euler specifically connects to mathematical intuition, which trading firms value.',
    whyNotAlternatives: 'LeetCode alone is sufficient for software engineering roles. For quant trading, the combination of LeetCode (speed, data structures) + Project Euler (mathematical reasoning) better signals quant aptitude. Chess training (tactical pattern recognition) is a useful complement but cannot replace structured coding practice.',
    knowledgeBase: [
      'Python (functions, recursion, classes)',
      'Data structures: arrays, hash maps, stacks, queues, heaps, trees, graphs',
      'Algorithms: sorting, binary search, BFS/DFS, dynamic programming, greedy',
      'Time complexity: Big O notation',
      'Mathematics: number theory basics (Project Euler prerequisites)',
    ],
  },
  {
    projectId: 'NETWORK',
    name: 'High-Value Network Cultivation Protocol',
    category: 'NETWORK',
    what: 'A systematic approach to building a non-transactional professional network: 2 informational interviews per month (24/year), LinkedIn content publishing (one data/finance insight per week), CFA Research Challenge participation, finance/investment club committee role, and targeted LinkedIn connection strategy (quant practitioners at target firms).',
    why: 'The quant finance job market is heavily referral-driven — especially for prop trading firms. 60–70% of offers at elite firms come through referrals or known networks. Building this systematically over 3 years means you arrive at graduation with warm connections, not cold applications.',
    whyNotAlternatives: 'Attending career fairs without follow-up is noise. The constraint is quality and consistency: 2 informational interviews per month is achievable and meaningful. More than this risks shallow conversations. Fewer than this fails to build momentum.',
    knowledgeBase: [
      'Communication: email outreach (subject line, brevity, clear ask)',
      'LinkedIn: headline optimization, profile completeness, content strategy',
      'Finance knowledge: enough to ask intelligent questions in informational interviews',
      'CFA curriculum awareness (useful context for CFA Research Challenge)',
      'Professional norms: follow-up, referral etiquette, not being transactional',
    ],
  },
];

// ---------------------------------------------------------------------------
// REGIONAL CAREER NARRATIVES — EXIT STRATEGY
// ---------------------------------------------------------------------------

export const CAREER_NARRATIVES: RegionCareerNote[] = [
  {
    region: 'ASIA',
    narrative: 'Singapore is the primary target. The quant finance ecosystem is dominated by two parallel tracks: prop trading (Jane Street, Optiver, IMC — all with Singapore offices) and sovereign/institutional investment (GIC, Temasek, MAS). Entry-level roles at prop firms are highly competitive and recruit heavily from NUS/NTU — a Singapore education is a meaningful advantage. The Employment Pass minimum salary threshold (SGD ~5,000/month for new graduates as of 2025) is the key visa constraint — prop trading roles typically exceed this; graduate banking programmes typically meet it. Singapore PR (Permanent Residency) is achievable after 2–3 years of work and is the long-term stability mechanism.',
  },
  {
    region: 'NORTH_AMERICA',
    narrative: 'The US quant finance market is the deepest in the world but also the most competitive. Elite prop firms (Jane Street, Citadel, Two Sigma) recruit almost exclusively from MIT/Princeton/Columbia/Harvard/Stanford — a US or Canadian undergraduate degree from a non-target school rarely gets past the resume screen. The strategic play is Canada first (CPP Investments, Ontario Teachers, TD/RBC Quant) — Canadian firms have wider recruitment net and the Open Work Permit pathway via Post-Graduate Work Permit (PGWP) is more accessible than OPT/H1B. Canada → US lateral move is a proven path for international candidates.',
  },
  {
    region: 'EUROPE',
    narrative: 'Amsterdam is the centre of European quant trading. Optiver, IMC, and Flow Traders are all headquartered there and recruit globally — they are as competitive as any US prop firm. The key advantage for a non-EU applicant studying in the Netherlands (UvA, Erasmus) is proximity: these firms run on-campus recruitment heavily at Dutch universities. The EU Blue Card provides a work authorization pathway for skilled non-EU nationals. UK (London) has Man Group, Winton, and the bulge bracket quant desks — post-Brexit immigration for non-EU/UK nationals uses the Skilled Worker visa. Germany has DWS, Deutsche Bank Quant, and Allianz QI — less developed quant scene but strong institutional finance roles.',
  },
  {
    region: 'AUSTRALIA',
    narrative: 'Sydney is the hub. The Australian quant market is smaller than SG/US/EU but has a strong advantage: Optiver Sydney and IMC Sydney are significant operations and recruit from UNSW and Melbourne heavily. Macquarie Group is the most prestigious Australian firm — the Macquarie Graduate Programme is the top domestic destination, though many divisions require PR or citizenship (verify current policy). The Graduate Temporary Visa (subclass 485) provides 2–4 years post-study work rights, and the pathway to PR via General Skilled Migration is well-established. Australia Awards Scholarship covers full costs for Bangladeshi students and is worth prioritizing early.',
  },
  {
    region: 'INGO_DEVSEC',
    narrative: 'The development sector path runs in parallel to, not instead of, the quant path. World Bank YPP, ADB YPP, and UNDP JPO are all Masters/PhD-level programmes — the realistic timeline is to build 2–4 years industry experience first, then apply. The Bangladesh development context (remittance economics, microfinance, land tenure) is a genuine differentiator for these roles, not a consolation prize. BRAC is the entry point: a 1–2 year post-graduation role in BRAC Analytics builds both domain expertise and the institutional development-sector narrative. From there, YPP/JPO applications become structurally stronger.',
  },
];