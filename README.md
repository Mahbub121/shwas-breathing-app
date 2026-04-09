# শ্বাস | 4-7-8 Breathing PWA

A bilingual (Bengali & English) Progressive Web App for guided 4-7-8 breathing exercises. Built for stress relief and better sleep, optimized for low-end Android devices in Bangladesh.

## Features

- 🧘 **4-7-8 Breathing Technique** — Clinically proven method for reducing anxiety
- 🎯 **Animated Breathing Circle** — Visual guide synced to Inhale (4s) → Hold (7s) → Exhale (8s)
- 🗣️ **Voice Guidance** — Bengali & English TTS with graceful fallback
- 📳 **Haptic Feedback** — Vibration patterns on phase changes
- 🔒 **Screen Wake Lock** — Prevents screen sleep during sessions
- 🔥 **Streak Tracking** — Daily streak counter for motivation
- 📜 **Session History** — Records last 60 sessions
- 🌙 **Dark/Light Theme** — Beautiful dark-first design
- 🌐 **Bengali/English Toggle** — Full i18n support
- 📱 **PWA** — Installable, offline-capable, mobile-first
- ⏰ **Daily Reminders** — Web notification support
- 💾 **No Backend** — 100% client-side, localStorage only

## Tech Stack

- React 19
- Vite 8
- PWA (vite-plugin-pwa + Workbox)
- CSS Animations (no animation library)
- Web Speech API, Vibration API, Wake Lock API

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Deployed on Vercel. The app requires HTTPS for PWA features.

## License

MIT
