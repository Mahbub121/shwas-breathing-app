import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function StreakBadge({ count }) {
  const { lang } = useApp();

  if (count <= 0) return null;

  return (
    <div className="streak-badge">
      <span className="streak-fire">🔥</span>
      <span className="streak-count">{count}</span>
      <span className="streak-text">{t(lang, 'days')} {t(lang, 'streak')}</span>
    </div>
  );
}
