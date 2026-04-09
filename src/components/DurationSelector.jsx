import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { DURATION_OPTIONS } from '../constants/breathing';

export default function DurationSelector({ selected, onSelect }) {
  const { lang } = useApp();

  return (
    <div className="duration-selector">
      {DURATION_OPTIONS.map(dur => (
        <button
          key={dur}
          className={`duration-btn ${selected === dur ? 'duration-btn--active' : ''}`}
          onClick={() => onSelect(dur)}
        >
          {dur} {t(lang, 'min')}
        </button>
      ))}
    </div>
  );
}
