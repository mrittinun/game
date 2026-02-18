# Turn-Based Battle Game

> เกม Turn-Based Battle แบบแนวนอน (Landscape) บนเว็บ พัฒนาด้วย Phaser 3 และ Next.js รองรับมือถือ แท็บเล็ต และเดสก์ท็อป

## 📋 ภาพรวมโปรเจค

เกมนี้เป็น Turn-Based Battle Game ที่ออกแบบมาเพื่อทำงานบนเว็บเบราว์เซอร์ รองรับการเล่นบนอุปกรณ์หลากหลายประเภท โดยเน้นประสบการณ์การเล่นแบบ landscape mode และ responsive design ที่สมบูรณ์แบบ

### ✨ คุณสมบัติหลัก

- 🎮 Turn-Based Battle System
- 📱 รองรับมือถือ (iOS, Android)
- 📲 รองรับแท็บเล็ตและ iPad
- 💻 รองรับเดสก์ท็อป
- 🌐 Progressive Web App (PWA) - ติดตั้งเป็นแอปได้
- 🔄 Responsive Scaling - ปรับขนาดอัตโนมัติ
- 🎯 Landscape Mode Only - เล่นแนวนอนเท่านั้น
- 🔊 Audio System - รองรับเสียงและดนตรี
- 📐 Safe Area Support - รองรับ notch และ safe areas

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework และ SSR |
| **React** | 19.2.3 | UI library |
| **Phaser 3** | 3.90.0 | Game engine |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.1.18 | Styling framework |
| **next-pwa** | 5.6.0 | Progressive Web App |
| **Howler.js** | 2.2.4 | Audio management |
| **PostCSS** | 8.5.6 | CSS processing |
| **Autoprefixer** | 10.4.24 | CSS vendor prefixes |

## 📦 การติดตั้ง

### ข้อกำหนดระบบ

- Node.js 18.x หรือสูงกว่า
- npm 9.x หรือสูงกว่า
- Git

### ขั้นตอนการติดตั้ง

1. Clone repository:
```bash
git clone https://github.com/mrittinun/game.git
cd game/web-game
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. รันโปรเจคในโหมด development:
```bash
npm run dev
```

4. เปิดเบราว์เซอร์ที่:
```
http://localhost:3000
```

## 🚀 คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm run dev` | รัน development server (port 3000) |
| `npm run build` | Build สำหรับ production |
| `npm start` | รัน production server |
| `npm run lint` | ตรวจสอบ code quality |

## 📁 โครงสร้าง Folder

```
web-game/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout + PWA metadata
│   ├── page.tsx                 # Home page (game entry)
│   └── globals.css              # Global styles + safe areas
│
├── components/                   # React Components
│   ├── PhaserGame.tsx           # Phaser game wrapper
│   └── OrientationOverlay.tsx   # Landscape mode enforcer
│
├── lib/                         # Utility libraries
│   └── audio.ts                 # Audio manager (Howler.js)
│
├── public/                      # Static assets
│   ├── manifest.json            # PWA manifest
│   ├── icon-192.png             # PWA icon (192x192)
│   ├── icon-512.png             # PWA icon (512x512)
│   └── [game-assets]/           # เพิ่ม sprites, sounds, etc.
│
├── scenes/                      # Phaser Game Scenes (สร้างเพิ่มเติม)
│   ├── PreloadScene.ts          # Asset loading
│   ├── MenuScene.ts             # Main menu
│   ├── BattleScene.ts           # Battle gameplay
│   └── UIScene.ts               # UI overlay
│
├── game/                        # Game Logic (สร้างเพิ่มเติม)
│   ├── entities/                # Game entities
│   ├── systems/                 # Game systems
│   └── config/                  # Game configuration
│
├── next.config.ts               # Next.js + PWA config
├── tsconfig.json                # TypeScript config
├── tailwind.config.js           # Tailwind config
├── postcss.config.mjs           # PostCSS config
│
├── README.md                    # โปรเจคภาพรวม (ไฟล์นี้)
├── UI_RULES.md                  # กฎการออกแบบ UI
├── AI_RULES.md                  # กฎสำหรับ AI development
├── GAME_DESIGN.md               # เอกสารออกแบบเกม
└── MOBILE_GUIDE.md              # คู่มือ mobile support
```

## 🎮 การพัฒนาเกม

### เพิ่ม Game Scene ใหม่

1. สร้างไฟล์ใน `scenes/`:
```typescript
// scenes/BattleScene.ts
import Phaser from "phaser";

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: "BattleScene" });
  }

  preload() {
    // โหลด assets
  }

  create() {
    // สร้าง game objects
  }

  update() {
    // Game loop
  }
}
```

2. เพิ่ม scene ใน `components/PhaserGame.tsx`:
```typescript
import { BattleScene } from "@/scenes/BattleScene";

const config: Phaser.Types.Core.GameConfig = {
  // ...
  scene: [PreloadScene, MenuScene, BattleScene, UIScene],
};
```

### เพิ่ม Assets

1. วาง assets ใน `public/`:
```
public/
├── sprites/
│   ├── player.png
│   └── enemy.png
├── sounds/
│   ├── bgm.mp3
│   └── sfx/
└── ui/
    └── buttons.png
```

2. โหลดใน Phaser:
```typescript
preload() {
  this.load.image("player", "/sprites/player.png");
  this.load.audio("bgm", "/sounds/bgm.mp3");
}
```

### ใช้ Audio System

```typescript
import { audioManager } from "@/lib/audio";

// โหลดเสียง
audioManager.loadSound("bgm", "/sounds/bgm.mp3", { loop: true });
audioManager.loadSound("click", "/sounds/click.mp3");

// เล่นเสียง
audioManager.play("bgm");
audioManager.play("click");

// ควบคุมระดับเสียง
audioManager.setMusicVolume(0.7);
audioManager.setSFXVolume(0.8);
```

## 📱 การรองรับอุปกรณ์

### ✅ อุปกรณ์ที่รองรับ

| อุปกรณ์ | สถานะ | หมายเหตุ |
|---------|-------|----------|
| 📱 iPhone | ✅ รองรับ | รวม notch models |
| 📱 Android Phone | ✅ รองรับ | ทุกขนาดหน้าจอ |
| 📲 iPad | ✅ รองรับ | ทุกรุ่น |
| 📲 Android Tablet | ✅ รองรับ | ทุกขนาดหน้าจอ |
| 💻 Desktop | ✅ รองรับ | ทุก resolution |
| 🖥 Laptop | ✅ รองรับ | ทุก resolution |

### 📐 Responsive Breakpoints

- **Mobile Portrait**: 320px - 768px (แสดง orientation overlay)
- **Mobile Landscape**: 568px - 896px (เล่นได้)
- **Tablet Landscape**: 1024px - 1366px (เล่นได้)
- **Desktop**: 1920px+ (เล่นได้)

### 🎯 Orientation Support

- **Landscape Mode**: ✅ รองรับ (โหมดหลัก)
- **Portrait Mode**: ⚠️ แสดง overlay ให้หมุนอุปกรณ์

## 🏗 Build และ Deploy

### Build สำหรับ Production

```bash
npm run build
```

ไฟล์ที่ build จะอยู่ใน `.next/` folder

### รัน Production Server

```bash
npm start
```

### Deploy บน Vercel

1. Push code ขึ้น GitHub
2. เชื่อมต่อ repository กับ Vercel
3. Vercel จะ deploy อัตโนมัติ

หรือใช้ Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Deploy บน Platform อื่น

โปรเจคนี้รองรับ platform ที่รองรับ Next.js:
- Vercel
- Netlify
- AWS Amplify
- Google Cloud Run
- Docker

## 🧪 การทดสอบ

### ทดสอบบนมือถือ

1. **ผ่าน Network**:
   - รัน `npm run dev`
   - เปิด `http://[your-ip]:3000` บนมือถือ

2. **ผ่าน PWA**:
   - Build production
   - Deploy หรือใช้ ngrok
   - เปิดบนมือถือและ "Add to Home Screen"

### ทดสอบ Responsive

1. เปิด Chrome DevTools (F12)
2. คลิก Toggle Device Toolbar (Ctrl+Shift+M)
3. ทดสอบหลาย device profiles

## 📚 เอกสารเพิ่มเติม

- [UI_RULES.md](./UI_RULES.md) - กฎการออกแบบ UI และ responsive design
- [AI_RULES.md](./AI_RULES.md) - กฎสำหรับ AI development
- [GAME_DESIGN.md](./GAME_DESIGN.md) - เอกสารออกแบบเกมและระบบ
- [MOBILE_GUIDE.md](./MOBILE_GUIDE.md) - คู่มือ mobile support โดยละเอียด

## 🔧 การแก้ปัญหา

### เกมไม่แสดงบนมือถือ

1. ตรวจสอบ console errors (F12)
2. ตรวจสอบว่า Phaser โหลดสำเร็จ
3. Clear cache และ reload
4. ตรวจสอบ network connection

### Touch ไม่ทำงาน

1. ตรวจสอบว่า element มี `setInteractive()` ใน Phaser
2. ตรวจสอบ `touch-action: none` ใน CSS
3. ตรวจสอบ z-index ของ elements

### PWA ติดตั้งไม่ได้

1. ต้องใช้ HTTPS (ยกเว้น localhost)
2. ตรวจสอบ `manifest.json` ถูกต้อง
3. ตรวจสอบว่ามี icons ครบ (192x192, 512x512)
4. Build production และทดสอบ

### UI หลุดจอ

1. อ่าน [UI_RULES.md](./UI_RULES.md)
2. ตรวจสอบ Phaser scale config
3. ตรวจสอบ safe area insets
4. ทดสอบบนอุปกรณ์จริง

## 🤝 การมีส่วนร่วม

### Coding Standards

- ใช้ TypeScript สำหรับ type safety
- ปฏิบัติตาม [AI_RULES.md](./AI_RULES.md)
- ปฏิบัติตาม [UI_RULES.md](./UI_RULES.md)
- เขียน code ที่ maintain ได้ง่าย
- Comment code ที่ซับซ้อน

### Git Workflow

1. สร้าง branch ใหม่: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add: your feature"`
3. Push: `git push origin feature/your-feature`
4. สร้าง Pull Request

## 📄 License

[ระบุ license ของโปรเจค]

## 👥 ทีมพัฒนา

[ระบุข้อมูลทีมพัฒนา]

## 📞 ติดต่อ

- Repository: https://github.com/mrittinun/game
- Issues: https://github.com/mrittinun/game/issues

---

**หมายเหตุ**: โปรเจคนี้ออกแบบมาเพื่อรองรับการพัฒนาโดย AI tools เช่น Kiro โปรดอ่านเอกสาร [AI_RULES.md](./AI_RULES.md) และ [UI_RULES.md](./UI_RULES.md) ก่อนเริ่มพัฒนา
