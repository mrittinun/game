# Web Game - Phaser 3 + Next.js

เว็บเกมแนว turn-based ที่รองรับมือถือและ PWA

## คุณสมบัติ

- ✅ Phaser 3 สำหรับ game engine
- ✅ Next.js 16 + React 19
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Progressive Web App (PWA)
- ✅ รองรับมือถือ (iOS, Android)
- ✅ รองรับ iPad และ tablet
- ✅ โหมดแนวนอนเท่านั้น (Landscape only)
- ✅ Responsive scaling
- ✅ Safe area support (notch, iPhone, iPad)
- ✅ Touch และ multi-touch support
- ✅ Fullscreen mode
- ✅ Howler.js สำหรับเสียง

## การติดตั้ง

```bash
npm install
```

## การรัน

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## โครงสร้างโปรเจค

```
web-game/
├── app/
│   ├── layout.tsx          # Layout หลัก + PWA metadata
│   ├── page.tsx            # หน้าหลัก
│   └── globals.css         # Global styles + safe areas
├── components/
│   ├── PhaserGame.tsx      # Phaser game component
│   └── OrientationOverlay.tsx  # Overlay สำหรับบังคับโหมดแนวนอน
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── icon-192.png        # PWA icon 192x192
│   └── icon-512.png        # PWA icon 512x512
└── next.config.ts          # Next.js + PWA config

```

## การปรับแต่งเกม

แก้ไขไฟล์ `components/PhaserGame.tsx`:

- เพิ่ม scenes ใหม่
- โหลด assets
- เพิ่ม game logic
- ปรับแต่ง physics

## Phaser Configuration

เกมถูก config ให้:
- ขนาด: 1280x720 (16:9 aspect ratio)
- Scale mode: FIT (รักษา aspect ratio)
- Auto center: CENTER_BOTH
- รองรับ touch และ mouse input
- Resize อัตโนมัติเมื่อหมุนหน้าจอ

## PWA Features

- ติดตั้งเป็นแอปบนมือถือได้
- Fullscreen mode (ไม่มี browser UI)
- Offline support (service worker)
- Landscape orientation only

## Mobile Support

- iPhone (รวม notch models)
- iPad
- Android phones
- Android tablets
- Safe area insets สำหรับ notch
- Touch gestures
- ป้องกัน zoom และ scroll

## การ Deploy

Deploy บน Vercel:
```bash
vercel
```

หรือ platform อื่นๆ ที่รองรับ Next.js

## หมายเหตุ

- เกมจะแสดง overlay เมื่ออยู่ในโหมดแนวตั้ง
- ใช้ Howler.js สำหรับเสียงในเกม
- PWA จะ disabled ใน development mode
