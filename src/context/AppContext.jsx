import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadSettings, saveSettings } from '../utils/storage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [screen, setScreen] = useState('home'); // 'home' | 'session' | 'complete' | 'history'
  const [sessionConfig, setSessionConfig] = useState({ duration: 5, rounds: 16 });
  const [sessionResult, setSessionResult] = useState(null);

  // Persist settings on change
  useEffect(() => {
    saveSettings(settings);
    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings]);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const lang = settings.language;
  const theme = settings.theme;

  return (
    <AppContext.Provider value={{
      settings, updateSetting, lang, theme,
      screen, setScreen,
      sessionConfig, setSessionConfig,
      sessionResult, setSessionResult,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
