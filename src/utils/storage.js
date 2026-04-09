const HISTORY_KEY = 'breathing_history';
const SETTINGS_KEY = 'breathing_settings';
const STREAK_KEY = 'breathing_streak';
const MAX_HISTORY = 90;
const DISPLAY_LIMIT = 60;

// ─── Settings ──────────────────────────────────────
export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt data → return defaults
  }
  return {
    language: 'bn',
    theme: 'dark',
    reminderTime: '21:00',
    reminderEnabled: false,
    defaultDuration: 5,
  };
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    console.warn('Could not save settings.');
  }
}

// ─── Streak ────────────────────────────────────────
export function loadStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Corrupt data → return defaults
  }
  return { count: 0, lastSessionDate: null };
}

export function saveStreak(streak) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  } catch {
    console.warn('Could not save streak.');
  }
}

// ─── History ───────────────────────────────────────
export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getDisplayHistory() {
  return loadHistory().slice(0, DISPLAY_LIMIT);
}

export function saveSession(entry) {
  let history = loadHistory();

  // Prepend new entry (newest first)
  history.unshift(entry);

  // Enforce cap — remove oldest entries beyond limit
  if (history.length > MAX_HISTORY) {
    history = history.slice(0, MAX_HISTORY);
  }

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      // Emergency trim — drop oldest 20 entries and retry
      history = history.slice(0, MAX_HISTORY - 20);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      } catch {
        console.warn('Storage full. History not saved.');
      }
    }
  }
}

// ─── Streak Logic ──────────────────────────────────
export function updateStreak() {
  const streak = loadStreak();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (streak.lastSessionDate === today) {
    // Already recorded today
    return streak;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (streak.lastSessionDate === yesterday) {
    // Continuing streak
    streak.count += 1;
  } else {
    // Streak broken — restart
    streak.count = 1;
  }

  streak.lastSessionDate = today;
  saveStreak(streak);
  return streak;
}
