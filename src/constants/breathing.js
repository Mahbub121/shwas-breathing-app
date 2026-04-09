export const PHASES = [
  { name: 'INHALE', duration: 4, durationMs: 4000 },
  { name: 'HOLD',   duration: 7, durationMs: 7000 },
  { name: 'EXHALE', duration: 8, durationMs: 8000 },
];

export const CYCLE_DURATION = PHASES.reduce((sum, p) => sum + p.duration, 0); // 19 seconds

export const ROUND_MAP = { 3: 10, 5: 16, 10: 32 };

export const DEFAULT_DURATION = 5;

export const DURATION_OPTIONS = [3, 5, 10];
