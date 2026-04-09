import { useRef, useCallback } from 'react';

export function useWakeLock() {
  const wakeLockRef = useRef(null);

  const acquire = useCallback(async () => {
    if (!('wakeLock' in navigator)) return;

    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen');

      wakeLockRef.current.addEventListener('release', () => {
        document.addEventListener('visibilitychange', reacquire, { once: true });
      });
    } catch {
      // Permission denied or not supported → continue without wake lock
    }
  }, []);

  const reacquire = useCallback(async () => {
    if (document.visibilityState === 'visible') {
      await acquire();
    }
  }, [acquire]);

  const release = useCallback(async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
      } catch {
        // Already released → ignore
      }
      wakeLockRef.current = null;
    }
  }, []);

  return { acquire, release };
}
