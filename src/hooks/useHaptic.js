import { useRef, useCallback } from 'react';

const PATTERNS = {
  INHALE: [100],
  HOLD:   [50, 50, 50],
  EXHALE: [200],
};

export function useHaptic() {
  const isSupported = useRef(!!navigator.vibrate);

  const vibrate = useCallback((phase) => {
    if (!isSupported.current) return;
    try {
      navigator.vibrate(PATTERNS[phase] || [100]);
    } catch {
      isSupported.current = false;
    }
  }, []);

  return { vibrate };
}
