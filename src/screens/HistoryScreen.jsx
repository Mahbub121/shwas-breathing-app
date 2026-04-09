import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { getDisplayHistory } from '../utils/storage';

export default function HistoryScreen() {
  const { lang, setScreen } = useApp();
  const history = getDisplayHistory();

  return (
    <div className="screen history-screen">
      <div className="history-header">
        <h2>{t(lang, 'history')}</h2>
        <button className="back-btn" onClick={() => setScreen('home')}>✕</button>
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>{t(lang, 'noHistory')}</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((session) => (
            <div
              key={session.id}
              className={`history-item ${session.completed ? 'history-item--completed' : 'history-item--incomplete'}`}
            >
              <div className="history-date">{session.date}</div>
              <div className="history-details">
                <span>{session.duration} {t(lang, 'min')}</span>
                <span className="history-dot">•</span>
                <span>{session.rounds} {t(lang, 'rounds')}</span>
              </div>
              <div className="history-status">
                {session.completed ? '✅' : '❌'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
