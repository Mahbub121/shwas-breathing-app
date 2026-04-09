import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { ROUND_MAP } from '../constants/breathing';
import { useStreak } from '../hooks/useStreak';
import DurationSelector from '../components/DurationSelector';
import StreakBadge from '../components/StreakBadge';
import SettingsPanel from '../components/SettingsPanel';

export default function HomeScreen() {
  const { lang, setScreen, sessionConfig, setSessionConfig } = useApp();
  const { streak } = useStreak();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(sessionConfig.duration);

  const handleDurationSelect = (dur) => {
    setSelectedDuration(dur);
    setSessionConfig({ duration: dur, rounds: ROUND_MAP[dur] });
  };

  const handleStart = () => {
    setSessionConfig({ duration: selectedDuration, rounds: ROUND_MAP[selectedDuration] });
    setScreen('session');
  };

  return (
    <div className="screen home-screen">
      <div className="home-header">
        <div className="home-moon">🌙</div>
        <h1 className="home-title">{t(lang, 'appName')}</h1>
        <p className="home-tagline">{t(lang, 'tagline')}</p>
      </div>

      <div className="home-body">
        <DurationSelector
          selected={selectedDuration}
          onSelect={handleDurationSelect}
        />

        <button className="start-btn" onClick={handleStart} id="start-session-btn">
          <span className="start-btn-text">{t(lang, 'start')}</span>
          <span className="start-btn-glow"></span>
        </button>

        <StreakBadge count={streak.count} />
      </div>

      <div className="home-footer">
        <button className="footer-btn" onClick={() => setShowSettings(true)} id="settings-btn">
          ⚙️ {t(lang, 'settings')}
        </button>
        <button className="footer-btn" onClick={() => setScreen('history')} id="history-btn">
          📜 {t(lang, 'history')}
        </button>
      </div>

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
}
