# UI Rules - กฎการออกแบบ UI

> เอกสารนี้กำหนดกฎที่เข้มงวดสำหรับการออกแบบและพัฒนา UI เพื่อป้องกันปัญหา UI พังบนมือถือและอุปกรณ์อื่นๆ

## 🎯 หลักการสำคัญ

### ⚠️ กฎทองที่ห้ามละเมิด

1. **เกมต้องทำงานในแนวนอน (Landscape) เท่านั้น**
2. **UI ทุกส่วนต้องไม่หลุดออกนอกหน้าจอ**
3. **ต้องรองรับทุกอุปกรณ์: มือถือ, แท็บเล็ต, iPad, เดสก์ท็อป**
4. **ต้องรักษา aspect ratio ของเกม**
5. **ต้องรองรับ safe areas (notch, rounded corners)**

---

## 📱 การรองรับอุปกรณ์

### ✅ อุปกรณ์ที่ต้องรองรับ

| อุปกรณ์ | ความละเอียดตัวอย่าง | ข้อกำหนดพิเศษ |
|---------|---------------------|----------------|
| **iPhone SE** | 568x320 | Safe area insets |
| **iPhone 12/13/14** | 844x390 | Notch support |
| **iPhone 14 Pro Max** | 932x430 | Dynamic Island |
| **iPad** | 1024x768 | Larger screen |
| **iPad Pro** | 1366x1024 | Larger screen |
| **Android Phone** | 640x360 - 896x414 | Various aspect ratios |
| **Android Tablet** | 1280x800 | Larger screen |
| **Desktop** | 1920x1080+ | Mouse input |

### 📐 Aspect Ratios ที่ต้องรองรับ

- 16:9 (มาตรฐาน)
- 18:9 (มือถือสมัยใหม่)
- 19.5:9 (iPhone X+)
- 20:9 (Android flagship)
- 4:3 (iPad)

---

## 🎮 Phaser Scaling Rules

### ✅ กฎบังคับ

#### 1. ต้องใช้ `Phaser.Scale.FIT`

```typescript
const config: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,        // ✅ บังคับใช้
    autoCenter: Phaser.Scale.CENTER_BOTH,  // ✅ บังคับใช้
    width: 1280,                   // ✅ ขนาดเกมมาตรฐาน
    height: 720,                   // ✅ อัตราส่วน 16:9
  },
};
```

#### 2. ห้ามใช้ Scale Modes อื่น

```typescript
// ❌ ห้ามใช้
mode: Phaser.Scale.NONE
mode: Phaser.Scale.RESIZE
mode: Phaser.Scale.ENVELOP
mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT
mode: Phaser.Scale.HEIGHT_CONTROLS_HEIGHT

// ✅ ใช้ได้เฉพาะ
mode: Phaser.Scale.FIT
```

#### 3. ต้อง Auto Center

```typescript
// ✅ ถูกต้อง
autoCenter: Phaser.Scale.CENTER_BOTH

// ❌ ห้ามใช้
autoCenter: Phaser.Scale.NO_CENTER
autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
autoCenter: Phaser.Scale.CENTER_VERTICALLY
```

#### 4. ต้องมี Resize Handler

```typescript
// ✅ บังคับมี
const handleResize = () => {
  if (gameRef.current) {
    gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
  }
};

window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
```

---

## 🛡 Safe Area Rules

### ✅ กฎบังคับ

#### 1. ต้องรองรับ Safe Area Insets

```css
/* ✅ บังคับใช้ใน globals.css */
#game-container {
  padding: env(safe-area-inset-top) 
           env(safe-area-inset-right) 
           env(safe-area-inset-bottom) 
           env(safe-area-inset-left);
}
```

#### 2. ต้องตั้งค่า Viewport Fit

```typescript
// ✅ บังคับใน layout.tsx
export const viewport: Viewport = {
  viewportFit: "cover",  // ✅ บังคับ
};
```

#### 3. UI ต้องไม่อยู่ใน Safe Area

```typescript
// ✅ ถูกต้อง - ใช้ safe zone
const safeZoneTop = 60;      // พื้นที่ปลอดภัยด้านบน
const safeZoneBottom = 60;   // พื้นที่ปลอดภัยด้านล่าง
const safeZoneLeft = 40;     // พื้นที่ปลอดภัยด้านซ้าย
const safeZoneRight = 40;    // พื้นที่ปลอดภัยด้านขวา

// วาง UI ภายใน safe zone
const buttonY = this.cameras.main.height - safeZoneBottom - 80;
const buttonX = safeZoneLeft + 80;

// ❌ ผิด - วาง UI ชิดขอบ
const buttonY = this.cameras.main.height - 20;  // อาจถูก notch บัง
const buttonX = 20;  // อาจถูกขอบมนบัง
```

---

## 📏 Responsive UI Rules

### ✅ กฎบังคับ

#### 1. ห้ามใช้ Fixed Pixel Positioning

```typescript
// ❌ ผิด - ใช้ค่าตายตัว
const button = this.add.sprite(100, 100, "button");

// ✅ ถูกต้อง - ใช้ค่าสัมพัทธ์
const centerX = this.cameras.main.centerX;
const centerY = this.cameras.main.centerY;
const button = this.add.sprite(centerX, centerY, "button");
```

#### 2. ต้อง Anchor UI ตาม Camera Bounds

```typescript
// ✅ ถูกต้อง - Anchor ตามมุม
const topLeft = {
  x: this.cameras.main.scrollX + safeZoneLeft,
  y: this.cameras.main.scrollY + safeZoneTop,
};

const topRight = {
  x: this.cameras.main.scrollX + this.cameras.main.width - safeZoneRight,
  y: this.cameras.main.scrollY + safeZoneTop,
};

const bottomLeft = {
  x: this.cameras.main.scrollX + safeZoneLeft,
  y: this.cameras.main.scrollY + this.cameras.main.height - safeZoneBottom,
};

const bottomRight = {
  x: this.cameras.main.scrollX + this.cameras.main.width - safeZoneRight,
  y: this.cameras.main.scrollY + this.cameras.main.height - safeZoneBottom,
};

// วาง UI
const hpBar = this.add.sprite(topLeft.x, topLeft.y, "hp-bar");
const skillButton = this.add.sprite(bottomRight.x, bottomRight.y, "skill");
```

#### 3. ต้องใช้ Percentage-Based Positioning

```typescript
// ✅ ถูกต้อง - ใช้เปอร์เซ็นต์
const width = this.cameras.main.width;
const height = this.cameras.main.height;

const ui = {
  topBar: height * 0.1,      // 10% จากบน
  bottomBar: height * 0.9,   // 90% จากบน
  leftPanel: width * 0.1,    // 10% จากซ้าย
  rightPanel: width * 0.9,   // 90% จากซ้าย
};
```

#### 4. ต้องใช้ Scale สำหรับ UI Elements

```typescript
// ✅ ถูกต้อง - Scale ตามหน้าจอ
const baseScale = Math.min(
  this.cameras.main.width / 1280,
  this.cameras.main.height / 720
);

const button = this.add.sprite(x, y, "button");
button.setScale(baseScale);

// ❌ ผิด - ไม่ scale
const button = this.add.sprite(x, y, "button");
// button จะเล็กเกินไปบนหน้าจอใหญ่
```

---

## 🖥 Viewport Rules

### ✅ กฎบังคับ

#### 1. ต้องใช้ Responsive Viewport

```typescript
// ✅ บังคับใน layout.tsx
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,           // ✅ ป้องกัน zoom
  userScalable: false,       // ✅ ป้องกัน zoom
  viewportFit: "cover",      // ✅ รองรับ safe area
  themeColor: "#000000",
};
```

#### 2. ต้องป้องกัน Zoom

```css
/* ✅ บังคับใน globals.css */
html, body {
  touch-action: none;                    /* ป้องกัน gestures */
  -webkit-user-select: none;             /* ป้องกันเลือกข้อความ */
  user-select: none;
  -webkit-tap-highlight-color: transparent;  /* ไม่มี highlight */
}
```

#### 3. ต้องใช้ Fullscreen Layout

```css
/* ✅ บังคับใน globals.css */
html, body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;          /* ✅ ไม่มี scrollbar */
  position: fixed;           /* ✅ ป้องกัน scroll */
  margin: 0;
  padding: 0;
}

#game-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 🔄 Orientation Rules

### ✅ กฎบังคับ

#### 1. ต้องบังคับ Landscape Mode

```typescript
// ✅ บังคับมี OrientationOverlay component
const [isPortrait, setIsPortrait] = useState(false);

useEffect(() => {
  const checkOrientation = () => {
    const isPort = window.innerHeight > window.innerWidth;
    setIsPortrait(isPort);
  };

  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);

  return () => {
    window.removeEventListener("resize", checkOrientation);
    window.removeEventListener("orientationchange", checkOrientation);
  };
}, []);

if (isPortrait) {
  return <OrientationOverlay />;  // แสดง overlay
}
```

#### 2. ต้องซ่อนเกมเมื่ออยู่ในโหมด Portrait

```typescript
// ✅ ถูกต้อง
if (isPortrait) {
  return <OrientationOverlay />;
}
return <PhaserGame />;

// ❌ ผิด - แสดงเกมในโหมด portrait
return (
  <>
    {isPortrait && <OrientationOverlay />}
    <PhaserGame />
  </>
);
```

---

## 🎨 UI Layout Rules

### ✅ กฎบังคับ

#### 1. แบ่ง Screen Zones

```typescript
// ✅ ถูกต้อง - แบ่ง zones ชัดเจน
const zones = {
  // Safe zones
  safeTop: 60,
  safeBottom: 60,
  safeLeft: 40,
  safeRight: 40,
  
  // UI zones
  topBar: {
    y: 60,
    height: 80,
  },
  bottomBar: {
    y: this.cameras.main.height - 140,
    height: 80,
  },
  leftPanel: {
    x: 40,
    width: 200,
  },
  rightPanel: {
    x: this.cameras.main.width - 240,
    width: 200,
  },
  
  // Battle zone (center)
  battleArea: {
    x: 240,
    y: 140,
    width: this.cameras.main.width - 480,
    height: this.cameras.main.height - 280,
  },
};
```

#### 2. ต้องใช้ Container สำหรับ UI Groups

```typescript
// ✅ ถูกต้อง - ใช้ Container
const skillPanel = this.add.container(x, y);
skillPanel.add([
  this.add.sprite(0, 0, "panel-bg"),
  this.add.sprite(-60, 0, "skill-1"),
  this.add.sprite(0, 0, "skill-2"),
  this.add.sprite(60, 0, "skill-3"),
]);

// Scale ทั้ง container
skillPanel.setScale(baseScale);

// ❌ ผิด - วาง UI แยกกัน
this.add.sprite(x, y, "panel-bg");
this.add.sprite(x - 60, y, "skill-1");
this.add.sprite(x, y, "skill-2");
this.add.sprite(x + 60, y, "skill-3");
```

#### 3. ต้องใช้ ScrollFactor สำหรับ Fixed UI

```typescript
// ✅ ถูกต้อง - UI ไม่เลื่อนตาม camera
const hud = this.add.container(0, 0);
hud.setScrollFactor(0);  // ✅ บังคับสำหรับ UI

// ❌ ผิด - UI จะเลื่อนตาม camera
const hud = this.add.container(0, 0);
// ไม่มี setScrollFactor
```

---

## 📱 Touch Input Rules

### ✅ กฎบังคับ

#### 1. ต้องมี Touch Target ขนาดเหมาะสม

```typescript
// ✅ ถูกต้อง - ขนาดปุ่มเหมาะสำหรับนิ้ว
const minTouchSize = 44;  // Apple HIG recommendation

const button = this.add.sprite(x, y, "button");
button.setInteractive({
  hitArea: new Phaser.Geom.Circle(0, 0, minTouchSize),
  hitAreaCallback: Phaser.Geom.Circle.Contains,
});

// ❌ ผิด - ปุ่มเล็กเกินไป
const button = this.add.sprite(x, y, "button");
button.setInteractive();  // ใช้ขนาดรูปภาพ (อาจเล็กเกินไป)
```

#### 2. ต้องมี Visual Feedback

```typescript
// ✅ ถูกต้อง - มี feedback
button.on("pointerdown", () => {
  button.setScale(0.95);  // Scale เล็กลง
  button.setTint(0xcccccc);  // เปลี่ยนสี
});

button.on("pointerup", () => {
  button.setScale(1);
  button.clearTint();
});

// ❌ ผิด - ไม่มี feedback
button.on("pointerdown", () => {
  // ทำอะไรโดยไม่มี visual feedback
});
```

#### 3. ต้องป้องกัน Accidental Touches

```typescript
// ✅ ถูกต้อง - มีระยะห่างระหว่างปุ่ม
const buttonSpacing = 20;  // ระยะห่างขั้นต่ำ

const button1 = this.add.sprite(x, y, "button");
const button2 = this.add.sprite(x + buttonWidth + buttonSpacing, y, "button");

// ❌ ผิด - ปุ่มชิดกันเกินไป
const button1 = this.add.sprite(x, y, "button");
const button2 = this.add.sprite(x + buttonWidth, y, "button");
```

---

## 🚫 สิ่งที่ห้ามทำ

### ❌ ห้ามเด็ดขาด

1. **ห้ามใช้ Fixed Positioning ที่ไม่ Responsive**
```typescript
// ❌ ห้าม
const button = this.add.sprite(100, 100, "button");
```

2. **ห้ามวาง UI ชิดขอบหน้าจอ**
```typescript
// ❌ ห้าม
const button = this.add.sprite(0, 0, "button");
const text = this.add.text(0, 0, "HP: 100");
```

3. **ห้ามใช้ Scale Mode อื่นนอกจาก FIT**
```typescript
// ❌ ห้าม
mode: Phaser.Scale.RESIZE
mode: Phaser.Scale.ENVELOP
```

4. **ห้ามสร้าง UI ที่ใหญ่กว่าหน้าจอ**
```typescript
// ❌ ห้าม
const panel = this.add.sprite(centerX, centerY, "huge-panel");
// panel ใหญ่กว่า 1280x720
```

5. **ห้ามใช้ Absolute Pixel Values สำหรับ Font Size**
```typescript
// ❌ ห้าม
const text = this.add.text(x, y, "Hello", { fontSize: "32px" });

// ✅ ใช้ Scale แทน
const baseFontSize = 32;
const scaledFontSize = baseFontSize * baseScale;
const text = this.add.text(x, y, "Hello", { 
  fontSize: `${scaledFontSize}px` 
});
```

---

## ✅ Checklist ก่อน Deploy

### UI Validation Checklist

- [ ] ทดสอบบน iPhone SE (หน้าจอเล็กสุด)
- [ ] ทดสอบบน iPhone 14 Pro Max (มี notch)
- [ ] ทดสอบบน iPad (aspect ratio 4:3)
- [ ] ทดสอบบน Android phone (หลาย aspect ratios)
- [ ] ทดสอบบน Desktop (1920x1080)
- [ ] ทดสอบการหมุนหน้าจอ (portrait → landscape)
- [ ] ทดสอบ touch input บนทุกปุ่ม
- [ ] ตรวจสอบ UI ไม่หลุดจอ
- [ ] ตรวจสอบ safe area insets
- [ ] ตรวจสอบ orientation overlay ทำงาน
- [ ] ตรวจสอบ scale mode เป็น FIT
- [ ] ตรวจสอบ auto center ทำงาน
- [ ] ตรวจสอบ resize handler ทำงาน
- [ ] ตรวจสอบ viewport config ถูกต้อง
- [ ] ตรวจสอบ fullscreen layout

---

## 📚 ตัวอย่าง Code ที่ถูกต้อง

### ตัวอย่างที่ 1: Battle UI Layout

```typescript
export class BattleScene extends Phaser.Scene {
  create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Safe zones
    const safe = { top: 60, bottom: 60, left: 40, right: 40 };
    
    // Base scale
    const baseScale = Math.min(width / 1280, height / 720);
    
    // Top bar (HP, MP)
    const topBarY = safe.top + 40;
    this.createHPBar(safe.left + 100, topBarY, baseScale);
    this.createMPBar(safe.left + 100, topBarY + 40, baseScale);
    
    // Bottom bar (Skills)
    const bottomBarY = height - safe.bottom - 60;
    this.createSkillButtons(centerX, bottomBarY, baseScale);
    
    // Battle area (center)
    this.createBattleArea(centerX, centerY, baseScale);
  }
  
  createHPBar(x: number, y: number, scale: number) {
    const container = this.add.container(x, y);
    container.setScale(scale);
    container.setScrollFactor(0);
    
    // Add HP bar elements
    const bg = this.add.rectangle(0, 0, 200, 20, 0x333333);
    const bar = this.add.rectangle(-100, 0, 200, 20, 0xff0000);
    bar.setOrigin(0, 0.5);
    
    container.add([bg, bar]);
    return container;
  }
  
  createSkillButtons(centerX: number, y: number, scale: number) {
    const container = this.add.container(centerX, y);
    container.setScale(scale);
    container.setScrollFactor(0);
    
    const buttonSpacing = 80;
    const buttons = [];
    
    for (let i = 0; i < 4; i++) {
      const x = (i - 1.5) * buttonSpacing;
      const button = this.add.sprite(x, 0, "skill-button");
      button.setInteractive({
        hitArea: new Phaser.Geom.Circle(0, 0, 44),
        hitAreaCallback: Phaser.Geom.Circle.Contains,
      });
      
      button.on("pointerdown", () => {
        button.setScale(0.95);
      });
      
      button.on("pointerup", () => {
        button.setScale(1);
        this.useSkill(i);
      });
      
      buttons.push(button);
    }
    
    container.add(buttons);
    return container;
  }
}
```

---

## 🎓 สรุป

การปฏิบัติตามกฎเหล่านี้จะทำให้:

1. ✅ UI ไม่พังบนมือถือ
2. ✅ รองรับทุกอุปกรณ์
3. ✅ รองรับ safe areas
4. ✅ Responsive ถูกต้อง
5. ✅ Touch input ทำงานดี
6. ✅ ประสบการณ์ผู้เล่นดี

**หมายเหตุ**: กฎเหล่านี้เป็นข้อบังคับ ไม่ใช่คำแนะนำ การละเมิดจะทำให้ UI พังบนอุปกรณ์จริง
