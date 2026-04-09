import { useApp } from '../context/AppContext';
import '../styles/animations.css';

export default function BreathingCircle({ phase }) {
  const { lang } = useApp();

  const phaseClass =
    phase === 'INHALE' ? 'circle--inhale' :
    phase === 'HOLD'   ? 'circle--hold' :
    phase === 'EXHALE' ? 'circle--exhale' : '';

  const phaseLabels = {
    bn: { INHALE: 'শ্বাস নিন', HOLD: 'ধরে রাখুন', EXHALE: 'শ্বাস ছাড়ুন' },
    en: { INHALE: 'Inhale', HOLD: 'Hold', EXHALE: 'Exhale' },
  };

  return (
    <div className="breathing-circle-container">
      <div className={`breathing-circle ${phaseClass}`} key={`${phase}-${Date.now()}`}>
        <div className="circle-inner">
          <span className="circle-label">{phaseLabels[lang]?.[phase] || phase}</span>
        </div>
      </div>
      <div className="circle-ring"></div>
    </div>
  );
}
