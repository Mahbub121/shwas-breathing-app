import { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';
import { useBreathingTimer } from '../hooks/useBreathingTimer';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { useHaptic } from '../hooks/useHaptic';
import { useWakeLock } from '../hooks/useWakeLock';
import { saveSession, updateStreak } from '../utils/storage';
import { CYCLE_DURATION } from '../constants/breathing';
import BreathingCircle from '../components/BreathingCircle';
import RoundCounter from '../components/RoundCounter';
import PhaseLabel from '../components/PhaseLabel';

export default function SessionScreen() {
  const { lang, setScreen, sessionConfig, setSessionResult } = useApp();
  const { unlock, speak } = useVoiceGuide(lang);
  const { vibrate } = useHaptic();
  const { acquire, release } = useWakeLock();

  const handlePhaseChange = useCallback((phaseName, round) => {
    speak(phaseName);
    vibrate(phaseName);
  }, [speak, vibrate]);

  const handleComplete = useCallback(() => {
    release();
    const result = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      duration: sessionConfig.duration,
      rounds: sessionConfig.rounds,
      completed: true,
      timestamp: Date.now(),
    };
    saveSession(result);
    const newStreak = updateStreak();
    setSessionResult({ ...result, streak: newStreak });
    setScreen('complete');
  }, [release, sessionConfig, setSessionResult, setScreen]);

  const { start, stop, isRunning, currentPhase, currentRound, phaseTimeLeft } = useBreathingTimer({
    totalRounds: sessionConfig.rounds,
    onPhaseChange: handlePhaseChange,
    onComplete: handleComplete,
  });

  useEffect(() => {
    acquire();
    unlock();

    // Small delay to ensure unlock happens in user gesture context
    const timer = setTimeout(() => {
      start();
    }, 100);

    return () => {
      clearTimeout(timer);
      release();
      stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStop = () => {
    stop();
    release();
    // Save incomplete session
    const result = {
      id: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      duration: sessionConfig.duration,
      rounds: currentRound,
      completed: false,
      timestamp: Date.now(),
    };
    saveSession(result);
    setScreen('home');
  };

  return (
    <div className="screen session-screen">
      <RoundCounter current={currentRound} total={sessionConfig.rounds} />

      <div className="session-circle-area">
        <BreathingCircle phase={currentPhase} />
      </div>

      <PhaseLabel phase={currentPhase} timeLeft={phaseTimeLeft} />

      <button className="stop-btn" onClick={handleStop} id="stop-session-btn">
        {t(lang, 'stop')}
      </button>
    </div>
  );
}
