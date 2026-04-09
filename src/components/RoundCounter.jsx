import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function RoundCounter({ current, total }) {
  const { lang } = useApp();

  return (
    <div className="round-counter">
      <span className="round-label">{t(lang, 'round')}</span>
      <span className="round-numbers">{current + 1} {t(lang, 'of')} {total}</span>
    </div>
  );
}
