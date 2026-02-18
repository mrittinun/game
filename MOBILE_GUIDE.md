# คู่มือการรองรับมือถือ

## คุณสมบัติที่ได้รับการอัพเกรด

### 1. Phaser Configuration
- ✅ Scale mode: `Phaser.Scale.FIT` - รักษา aspect ratio
- ✅ Auto center: `Phaser.Scale.CENTER_BOTH` - จัดกลางหน้าจออัตโนมัติ
- ✅ ขนาดเกม: 1280x720 (16:9 landscape)
- ✅ Resize handler - ปรับขนาดอัตโนมัติเมื่อหมุนหน้าจอ
- ✅ Touch input enabled
- ✅ Multi-touch support

### 2. Landscape Mode Enforcement
- ✅ Orientation detection
- ✅ แสดง overlay เมื่ออยู่ในโหมดแนวตั้ง
- ✅ ซ่อน game canvas จนกว่าจะหมุนเป็นแนวนอน
- ✅ รองรับ `orientationchange` event

### 3. Progressive Web App (PWA)
- ✅ `manifest.json` พร้อม:
  - `display: fullscreen`
  - `orientation: landscape`
  - Icons 192x192 และ 512x512
- ✅ Service Worker (auto-generated โดย next-pwa)
- ✅ Installable บนมือถือ
- ✅ Fullscreen mode (ไม่มี browser UI)
- ✅ Offline support

### 4. Safe Areas Support
- ✅ CSS safe area insets:
  ```css
  padding: env(safe-area-inset-top) 
           env(safe-area-inset-right) 
           env(safe-area-inset-bottom) 
           env(safe-area-inset-left);
  ```
- ✅ รองรับ iPhone notch
- ✅ รองรับ iPad safe areas
- ✅ `viewport-fit=cover` ใน viewport meta

### 5. Touch Optimization
- ✅ `touch-action: none` - ป้องกัน browser gestures
- ✅ `-webkit-tap-highlight-color: transparent` - ไม่มี highlight เมื่อแตะ
- ✅ `user-select: none` - ป้องกันการเลือกข้อความ
- ✅ Phaser touch input configuration
- ✅ Interactive elements รองรับ touch events

### 6. Viewport Configuration
- ✅ `width=device-width`
- ✅ `initial-scale=1`
- ✅ `maximum-scale=1` - ป้องกัน zoom
- ✅ `user-scalable=no` - ปิดการ zoom
- ✅ `viewport-fit=cover` - ครอบคลุมทั้งหน้าจอ

### 7. Fullscreen Layout
- ✅ `width: 100vw`, `height: 100vh`
- ✅ `overflow: hidden` - ไม่มี scrollbar
- ✅ `position: fixed` - ป้องกัน scroll
- ✅ Container ใช้พื้นที่เต็มหน้าจอ

## การทดสอบบนอุปกรณ์

### iPhone
1. เปิด Safari
2. ไปที่ URL ของเกม
3. แตะปุ่ม Share
4. เลือก "Add to Home Screen"
5. เปิดจาก Home Screen
6. เกมจะเปิดแบบ fullscreen

### iPad
1. เปิด Safari
2. ไปที่ URL ของเกม
3. แตะปุ่ม Share
4. เลือก "Add to Home Screen"
5. เปิดจาก Home Screen
6. หมุนเป็นโหมดแนวนอน

### Android
1. เปิด Chrome
2. ไปที่ URL ของเกม
3. แตะ menu (3 จุด)
4. เลือก "Install app" หรือ "Add to Home screen"
5. เปิดจาก Home Screen
6. เกมจะเปิดแบบ fullscreen

## ไฟล์ที่สำคัญ

### `/app/layout.tsx`
- Metadata และ Viewport configuration
- PWA meta tags
- Apple Web App meta tags
- Safe area CSS

### `/components/PhaserGame.tsx`
- Phaser game configuration
- Scale และ resize handling
- Touch input setup
- Game scene

### `/components/OrientationOverlay.tsx`
- ตรวจจับ orientation
- แสดง overlay เมื่อเป็นโหมดแนวตั้ง
- รองรับ resize และ orientationchange events

### `/app/globals.css`
- Global styles
- Safe area insets
- Touch optimization
- Fullscreen layout
- Orientation overlay styles

### `/public/manifest.json`
- PWA configuration
- Display mode: fullscreen
- Orientation: landscape
- Icons และ theme colors

### `/next.config.ts`
- next-pwa configuration
- Service worker settings
- Turbopack configuration

## Audio Support (Howler.js)

ไฟล์ `/lib/audio.ts` มี AudioManager class สำหรับ:
- โหลดและเล่นเสียง
- รองรับ loop
- ควบคุมระดับเสียง
- Mute/unmute
- HTML5 Audio สำหรับ mobile

### ตัวอย่างการใช้งาน:

```typescript
import { audioManager } from "@/lib/audio";

// โหลดเสียง
audioManager.loadSound("bgm", "/sounds/background.mp3", { 
  loop: true, 
  volume: 0.5 
});

audioManager.loadSound("click", "/sounds/click.mp3");

// เล่นเสียง
audioManager.play("bgm");
audioManager.play("click");

// หยุดเสียง
audioManager.stop("bgm");

// ปรับระดับเสียง
audioManager.setMusicVolume(0.7);
audioManager.setSFXVolume(0.8);

// Mute/Unmute
audioManager.mute();
audioManager.unmute();
```

## การแก้ปัญหา

### เกมไม่แสดงบนมือถือ
- ตรวจสอบ console errors
- ตรวจสอบว่า Phaser โหลดสำเร็จ
- ลอง clear cache และ reload

### Touch ไม่ทำงาน
- ตรวจสอบว่า element มี `setInteractive()` ใน Phaser
- ตรวจสอบ `touch-action: none` ใน CSS
- ตรวจสอบ z-index ของ elements

### PWA ติดตั้งไม่ได้
- ต้องใช้ HTTPS (ยกเว้น localhost)
- ตรวจสอบ manifest.json
- ตรวจสอบว่ามี icons ครบ
- ลอง build production และทดสอบ

### Orientation overlay ไม่หาย
- ตรวจสอบว่าหมุนเป็นแนวนอนแล้ว
- ลอง reload หน้า
- ตรวจสอบ window.innerWidth > window.innerHeight

## Performance Tips

1. ใช้ sprite sheets แทนรูปภาพแยก
2. Preload assets ใน Phaser preload()
3. ใช้ object pooling สำหรับ objects ที่สร้างบ่อย
4. จำกัดจำนวน particles และ effects
5. ใช้ texture atlas
6. Optimize รูปภาพก่อน deploy
7. ใช้ WebP format สำหรับรูปภาพ
8. Enable compression บน server

## Next Steps

1. เพิ่ม game scenes และ logic
2. โหลด assets (sprites, sounds, etc.)
3. เพิ่ม UI elements
4. ทดสอบบนอุปกรณ์จริง
5. Optimize performance
6. Deploy to production
