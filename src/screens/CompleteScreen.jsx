import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function CompleteScreen() {
  const { lang, setScreen, sessionResult } = useApp();

  if (!sessionResult) {
    return (
      <div className="screen complete-screen">
        <button className="primary-btn" onClick={() => setScreen('home')}>
          {t(lang, 'goHome')}
        </button>
      </div>
    );
  }

  return (
    <div className="screen complete-screen">
      <div className="complete-icon">✅</div>
      <h1 className="complete-title">{t(lang, 'complete')}</h1>

      <div className="complete-stats">
        <div className="stat-item">
          <span className="stat-value">{sessionResult.rounds}</span>
          <span className="stat-label">{t(lang, 'roundsCompleted')}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{sessionResult.duration} {t(lang, 'min')}</span>
          <span className="stat-label">{t(lang, 'totalTime')}</span>
        </div>
      </div>

      {sessionResult.streak && sessionResult.streak.count > 0 && (
        <div className="complete-streak">
          <span className="streak-fire-large">🔥</span>
          <span className="streak-count-large">{sessionResult.streak.count}</span>
          <span className="streak-text-large">{t(lang, 'days')} {t(lang, 'streak')} 🎉</span>
        </div>
      )}

      <div className="complete-actions">
        <button className="primary-btn" onClick={() => setScreen('session')} id="restart-btn">
          {t(lang, 'restart')}
        </button>
        <button className="secondary-btn" onClick={() => setScreen('home')} id="go-home-btn">
          {t(lang, 'goHome')}
        </button>
      </div>
    </div>
  );
}
