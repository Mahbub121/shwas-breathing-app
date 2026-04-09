import { useCallback } from 'react';

export function useNotification() {
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false;

    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
  }, []);

  const scheduleReminder = useCallback((timeStr) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return null;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 1);
    }

    const delay = target - now;

    const timeoutId = setTimeout(() => {
      try {
        new Notification('শ্বাস — Breathing Reminder', {
          body: 'সময় হয়েছে! আজকের breathing session শুরু করুন 🧘',
          icon: '/icons/icon-192.png',
          tag: 'breathing-reminder',
        });
      } catch {
        // Notification failed silently
      }
    }, delay);

    return timeoutId;
  }, []);

  return { requestPermission, scheduleReminder };
}
