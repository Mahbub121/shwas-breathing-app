import { PHASES, ROUND_MAP, CYCLE_DURATION } from '../constants/breathing';

export function getRoundsForDuration(durationMinutes) {
  return ROUND_MAP[durationMinutes] || ROUND_MAP[5];
}

export function getActualDuration(durationMinutes) {
  const rounds = getRoundsForDuration(durationMinutes);
  return rounds * CYCLE_DURATION;
}

export function getPhaseByIndex(index) {
  return PHASES[index % PHASES.length];
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
