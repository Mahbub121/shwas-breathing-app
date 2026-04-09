import { useState, useEffect } from 'react';
import { loadStreak } from '../utils/storage';

export function useStreak() {
  const [streak, setStreak] = useState({ count: 0, lastSessionDate: null });

  useEffect(() => {
    const data = loadStreak();
    // Check if streak is still valid (not broken)
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (data.lastSessionDate === today || data.lastSessionDate === yesterday) {
      setStreak(data);
    } else {
      // Streak broken
      setStreak({ count: 0, lastSessionDate: data.lastSessionDate });
    }
  }, []);

  const refreshStreak = () => {
    const data = loadStreak();
    setStreak(data);
  };

  return { streak, refreshStreak };
}
