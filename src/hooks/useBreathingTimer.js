import { useRef, useCallback, useState } from 'react';
import { PHASES } from '../constants/breathing';

export function useBreathingTimer({ totalRounds, onPhaseChange, onComplete }) {
  const phaseIndexRef = useRef(0);
  const roundRef = useRef(0);
  const phaseStartRef = useRef(null);
  const rafRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(PHASES[0].name);
  const [currentRound, setCurrentRound] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(PHASES[0].duration);

  const tick = useCallback(() => {
    const now = performance.now();
    const phaseIndex = phaseIndexRef.current;
    const currentPhaseObj = PHASES[phaseIndex];
    const phaseElapsed = now - phaseStartRef.current;
    const remaining = currentPhaseObj.durationMs - phaseElapsed;

    // Update countdown timer (rounded up to nearest second)
    const remainingSec = Math.max(0, Math.ceil(remaining / 1000));
    setPhaseTimeLeft(remainingSec);

    if (remaining <= 0) {
      const nextPhaseIndex = (phaseIndex + 1) % PHASES.length;
      if (nextPhaseIndex === 0) {
        roundRef.current += 1;
        if (roundRef.current >= totalRounds) {
          setIsRunning(false);
          onComplete();
          return;
        }
        setCurrentRound(roundRef.current);
      }
      phaseIndexRef.current = nextPhaseIndex;
      phaseStartRef.current = now;
      const nextPhase = PHASES[nextPhaseIndex];
      setCurrentPhase(nextPhase.name);
      setPhaseTimeLeft(nextPhase.duration);
      onPhaseChange(nextPhase.name, roundRef.current);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [totalRounds, onPhaseChange, onComplete]);

  const start = useCallback(() => {
    phaseIndexRef.current = 0;
    roundRef.current = 0;
    phaseStartRef.current = performance.now();
    setIsRunning(true);
    setCurrentPhase(PHASES[0].name);
    setCurrentRound(0);
    setPhaseTimeLeft(PHASES[0].duration);
    onPhaseChange(PHASES[0].name, 0);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick, onPhaseChange]);

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsRunning(false);
  }, []);

  return { start, stop, isRunning, currentPhase, currentRound, phaseTimeLeft };
}
