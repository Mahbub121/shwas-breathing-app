import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

export default function PhaseLabel({ phase, timeLeft }) {
  const { lang } = useApp();

  const phaseKey = phase?.toLowerCase() || 'inhale';

  return (
    <div className="phase-info">
      <span className="phase-name">{t(lang, phaseKey)}</span>
      <span className="phase-timer">{timeLeft}s</span>
    </div>
  );
}
