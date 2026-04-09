import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { useNotification } from '../hooks/useNotification';

export default function SettingsPanel({ onClose }) {
  const { settings, updateSetting, lang } = useApp();
  const { requestPermission } = useNotification();
  const [reminderTime, setReminderTime] = useState(settings.reminderTime || '21:00');

  const handleLanguageToggle = () => {
    updateSetting('language', settings.language === 'bn' ? 'en' : 'bn');
  };

  const handleThemeToggle = () => {
    updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');
  };

  const handleReminderToggle = async () => {
    if (!settings.reminderEnabled) {
      const granted = await requestPermission();
      if (granted) {
        updateSetting('reminderEnabled', true);
      }
    } else {
      updateSetting('reminderEnabled', false);
    }
  };

  const handleTimeChange = (e) => {
    setReminderTime(e.target.value);
    updateSetting('reminderTime', e.target.value);
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h2>{t(lang, 'settings')}</h2>
          <button className="settings-close" onClick={onClose}>✕</button>
        </div>

        <div className="settings-body">
          {/* Language */}
          <div className="setting-row">
            <span className="setting-label">{t(lang, 'language')}</span>
            <button className="setting-toggle" onClick={handleLanguageToggle}>
              {settings.language === 'bn' ? 'বাংলা → EN' : 'EN → বাংলা'}
            </button>
          </div>

          {/* Theme */}
          <div className="setting-row">
            <span className="setting-label">{t(lang, 'theme')}</span>
            <button className="setting-toggle" onClick={handleThemeToggle}>
              {settings.theme === 'dark' ? '🌙 ' + t(lang, 'dark') : '☀️ ' + t(lang, 'light')}
            </button>
          </div>

          {/* Reminder */}
          <div className="setting-row">
            <span className="setting-label">{t(lang, 'reminder')}</span>
            <button className="setting-toggle" onClick={handleReminderToggle}>
              {settings.reminderEnabled ? '🔔 ON' : '🔕 OFF'}
            </button>
          </div>

          {settings.reminderEnabled && (
            <div className="setting-row">
              <span className="setting-label">⏰</span>
              <input
                type="time"
                className="setting-time"
                value={reminderTime}
                onChange={handleTimeChange}
              />
            </div>
          )}

          {/* Voice Status */}
          <div className="setting-row setting-row--info">
            <span className="setting-label">🎙️</span>
            <span className="setting-value">
              {typeof window !== 'undefined' && window.speechSynthesis
                ? t(lang, 'voiceActive')
                : t(lang, 'voiceUnavailable')
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
