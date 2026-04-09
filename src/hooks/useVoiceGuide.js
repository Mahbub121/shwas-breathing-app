import { useRef, useCallback } from 'react';

const PHRASES = {
  en: { INHALE: 'Inhale', HOLD: 'Hold', EXHALE: 'Exhale' },
  bn: { INHALE: 'শ্বাস নিন', HOLD: 'ধরে রাখুন', EXHALE: 'শ্বাস ছাড়ুন' },
};

function selectBestVoice(voices, language) {
  const match =
    voices.find(v => v.lang.startsWith('bn') && v.name.toLowerCase().includes('female')) ||
    voices.find(v => v.lang.startsWith('bn')) ||
    voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null;

  return match;
}

export function useVoiceGuide(language = 'bn') {
  const isUnlockedRef = useRef(false);
  const isSupportedRef = useRef(typeof window !== 'undefined' && !!window.speechSynthesis);
  const preferredVoiceRef = useRef(null);
  const voiceStatusRef = useRef('unknown'); // 'bengali' | 'english' | 'unavailable' | 'unknown'

  const unlock = useCallback(() => {
    if (!window.speechSynthesis) {
      isSupportedRef.current = false;
      voiceStatusRef.current = 'unavailable';
      return;
    }

    try {
      const silent = new SpeechSynthesisUtterance('');
      silent.volume = 0;
      window.speechSynthesis.speak(silent);
      isUnlockedRef.current = true;

      // Pre-load and cache the best available voice
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          preferredVoiceRef.current = selectBestVoice(voices, language);
          if (preferredVoiceRef.current) {
            voiceStatusRef.current = preferredVoiceRef.current.lang.startsWith('bn') ? 'bengali' : 'english';
          } else {
            voiceStatusRef.current = 'english';
          }
        }
      };

      loadVoices();
      // Some browsers load voices async
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    } catch {
      isSupportedRef.current = false;
      voiceStatusRef.current = 'unavailable';
    }
  }, [language]);

  const speak = useCallback((phase) => {
    if (!isSupportedRef.current || !isUnlockedRef.current) return;

    try {
      window.speechSynthesis.cancel();
      const text = PHRASES[language]?.[phase] || PHRASES.en[phase];
      const utterance = new SpeechSynthesisUtterance(text);

      if (preferredVoiceRef.current) {
        utterance.voice = preferredVoiceRef.current;
        utterance.lang = preferredVoiceRef.current.lang;
      } else {
        utterance.lang = 'en-US';
      }

      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onerror = () => {
        isSupportedRef.current = false;
        voiceStatusRef.current = 'unavailable';
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      isSupportedRef.current = false;
      voiceStatusRef.current = 'unavailable';
    }
  }, [language]);

  return { unlock, speak, isSupported: isSupportedRef, voiceStatus: voiceStatusRef };
}
