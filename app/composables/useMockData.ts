// ── Clients ────────────────────────────────────────────────────────────────────
export const useClients = () => [
  {
    id: '1',
    name: 'Maria Becker',
    initials: 'MB',
    risk: 'Konservativ',
    portfolioValue: 284500,
    change1d: +0.42,
    change1y: +6.8,
    advisor: 'Klaus Hoffmann',
    nextMeeting: '2025-04-10',
    phone: '+49 171 234 5678',
    email: 'maria.becker@email.de',
    allocation: [
      { label: 'Anleihen',    pct: 55, color: '#3b5bdb' },
      { label: 'Aktien',      pct: 25, color: '#0ca678' },
      { label: 'Immobilien',  pct: 15, color: '#f59f00' },
      { label: 'Cash',        pct: 5,  color: '#868e96' },
    ],
    positions: [
      { name: 'iShares Core € Govt Bond', type: 'ETF',   value: 92000,  change: +0.3 },
      { name: 'Deutsche Telekom AG',       type: 'Aktie', value: 34200,  change: -0.8 },
      { name: 'Amundi MSCI World',         type: 'ETF',   value: 37100,  change: +1.1 },
      { name: 'Immobilienfonds DWS',       type: 'Fonds', value: 42600,  change: +0.2 },
      { name: 'Tagesgeld',                 type: 'Cash',  value: 78600,  change:  0   },
    ],
  },
  {
    id: '2',
    name: 'Thomas Richter',
    initials: 'TR',
    risk: 'Ausgewogen',
    portfolioValue: 612300,
    change1d: -0.18,
    change1y: +11.2,
    advisor: 'Klaus Hoffmann',
    nextMeeting: '2025-04-15',
    phone: '+49 160 987 6543',
    email: 't.richter@firma.de',
    allocation: [
      { label: 'Aktien',    pct: 50, color: '#3b5bdb' },
      { label: 'Anleihen',  pct: 30, color: '#0ca678' },
      { label: 'Rohstoffe', pct: 10, color: '#f59f00' },
      { label: 'Cash',      pct: 10, color: '#868e96' },
    ],
    positions: [
      { name: 'MSCI World ETF', type: 'ETF',   value: 180000, change: +1.4 },
      { name: 'S&P 500 ETF',    type: 'ETF',   value: 126000, change: +0.9 },
      { name: 'Allianz SE',     type: 'Aktie', value: 44000,  change: -1.2 },
      { name: 'Gold ETC',       type: 'ETC',   value: 61300,  change: +0.5 },
      { name: 'Tagesgeld',      type: 'Cash',  value: 61000,  change:  0   },
    ],
  },
  {
    id: '3',
    name: 'Sandra Vogel',
    initials: 'SV',
    risk: 'Wachstum',
    portfolioValue: 139800,
    change1d: +1.23,
    change1y: +18.4,
    advisor: 'Anna Schulz',
    nextMeeting: '2025-04-22',
    phone: '+49 176 555 1234',
    email: 'svogel@privat.de',
    allocation: [
      { label: 'Aktien',   pct: 80, color: '#3b5bdb' },
      { label: 'Anleihen', pct: 10, color: '#0ca678' },
      { label: 'Cash',     pct: 10, color: '#868e96' },
    ],
    positions: [
      { name: 'Nasdaq-100 ETF', type: 'ETF',   value: 62000,  change: +2.1 },
      { name: 'Apple Inc.',     type: 'Aktie', value: 28400,  change: +1.8 },
      { name: 'Nvidia Corp.',   type: 'Aktie', value: 21600,  change: +3.2 },
      { name: 'Tagesgeld',      type: 'Cash',  value: 13980,  change:  0   },
    ],
  },
]

// ── Portfolio Valuations ────────────────────────────────────────────────────────
export const useValuations = () => ({
  lastUpdated: '2025-03-31',
  history: [
    { month: 'Okt',  value: 980000 },
    { month: 'Nov',  value: 1010000 },
    { month: 'Dez',  value: 995000 },
    { month: 'Jan',  value: 1040000 },
    { month: 'Feb',  value: 1072000 },
    { month: 'Mär',  value: 1036600 },
  ],
  byClient: [
    { clientId: '1', name: 'Maria Becker',   value: 284500, prev: 283300, change: +0.42 },
    { clientId: '2', name: 'Thomas Richter', value: 612300, prev: 613400, change: -0.18 },
    { clientId: '3', name: 'Sandra Vogel',   value: 139800, prev: 138100, change: +1.23 },
  ],
  totalAuM: 1036600,
  totalChange1d: +0.26,
})

// ── CRM Notes ──────────────────────────────────────────────────────────────────
export const useCrmNotes = () => [
  {
    id: 'n1', clientId: '1', clientName: 'Maria Becker',
    date: '2025-03-28', advisor: 'Klaus Hoffmann', tag: 'Meeting',
    text: 'Jahresgespräch. Kundin zufrieden mit Performance. Wunsch: leichte Erhöhung der Aktienquote auf 30% bei nächster Überprüfung. Keine Änderungen aktuell.',
  },
  {
    id: 'n2', clientId: '2', clientName: 'Thomas Richter',
    date: '2025-03-25', advisor: 'Klaus Hoffmann', tag: 'Telefon',
    text: 'Rückruf wegen Marktvolatilität. Beruhigt. Hält an Strategie fest. Interessiert an Rohstoff-ETFs als Beimischung.',
  },
  {
    id: 'n3', clientId: '3', clientName: 'Sandra Vogel',
    date: '2025-03-20', advisor: 'Anna Schulz', tag: 'E-Mail',
    text: 'Depot-Auszug versendet. Nachfrage zu Nvidia-Position — Empfehlung: halten. Nächster Termin April vereinbart.',
  },
  {
    id: 'n4', clientId: '1', clientName: 'Maria Becker',
    date: '2025-03-10', advisor: 'Klaus Hoffmann', tag: 'Notiz',
    text: 'Steueroptimierung geprüft. Freistellungsauftrag ausgeschöpft. Empfehlung: Verlustverrechnung Q4 prüfen.',
  },
  {
    id: 'n5', clientId: '2', clientName: 'Thomas Richter',
    date: '2025-02-28', advisor: 'Klaus Hoffmann', tag: 'Meeting',
    text: 'Rebalancing durchgeführt. Aktienquote von 55% auf 50% reduziert. Gold-ETC neu aufgenommen (10%).',
  },
]

// ── Cashflow Plans ─────────────────────────────────────────────────────────────
export const useCashflowPlans = () => [
  {
    clientId: '1', clientName: 'Maria Becker', initials: 'MB',
    goal: 'Ruhestand 2032',
    targetValue: 400000,
    currentValue: 284500,
    monthlyContribution: 800,
    projectedValue: 412000,
    onTrack: true,
    years: [
      { year: '2025', actual: 284500,  projected: 295000 },
      { year: '2026', actual: null,    projected: 312000 },
      { year: '2027', actual: null,    projected: 330000 },
      { year: '2028', actual: null,    projected: 350000 },
      { year: '2029', actual: null,    projected: 371000 },
      { year: '2030', actual: null,    projected: 393000 },
      { year: '2031', actual: null,    projected: 412000 },
    ],
  },
  {
    clientId: '2', clientName: 'Thomas Richter', initials: 'TR',
    goal: 'Vermögenserhalt',
    targetValue: 700000,
    currentValue: 612300,
    monthlyContribution: 2000,
    projectedValue: 695000,
    onTrack: false,
    years: [
      { year: '2025', actual: 612300,  projected: 640000 },
      { year: '2026', actual: null,    projected: 652000 },
      { year: '2027', actual: null,    projected: 665000 },
      { year: '2028', actual: null,    projected: 678000 },
      { year: '2029', actual: null,    projected: 695000 },
    ],
  },
  {
    clientId: '3', clientName: 'Sandra Vogel', initials: 'SV',
    goal: 'Immobilienkauf 2028',
    targetValue: 200000,
    currentValue: 139800,
    monthlyContribution: 1500,
    projectedValue: 218000,
    onTrack: true,
    years: [
      { year: '2025', actual: 139800,  projected: 158000 },
      { year: '2026', actual: null,    projected: 177000 },
      { year: '2027', actual: null,    projected: 198000 },
      { year: '2028', actual: null,    projected: 218000 },
    ],
  },
]
