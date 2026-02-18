# Game Folder Structure

โครงสร้างโฟลเดอร์สำหรับ game logic และ systems

## 📁 โครงสร้าง

```
game/
├── config/              # Configuration files
│   ├── gameConfig.ts   # Phaser configuration
│   └── constants.ts    # Game constants
│
├── scenes/             # Phaser scenes
│   ├── PreloadScene.ts # Asset loading
│   ├── MenuScene.ts    # Main menu
│   ├── BattleScene.ts  # Battle gameplay
│   └── UIScene.ts      # UI overlay
│
├── entities/           # Game entities
│   ├── Player.ts       # Player entity
│   ├── Enemy.ts        # Enemy entity
│   └── Skill.ts        # Skill entity
│
├── systems/            # Game systems
│   ├── BattleSystem.ts # Battle logic
│   ├── TurnSystem.ts   # Turn management
│   └── DamageSystem.ts # Damage calculation
│
├── managers/           # Managers
│   ├── GameManager.ts  # Game state manager
│   └── UIManager.ts    # UI manager
│
└── ui/                 # UI components
    ├── HealthBar.ts    # HP bar component
    ├── SkillButton.ts  # Skill button component
    └── DamageNumber.ts # Damage number display
```

## 🎮 Scenes

### PreloadScene
- โหลด assets ทั้งหมด
- แสดง loading bar
- เปลี่ยนไป MenuScene เมื่อเสร็จ

### MenuScene
- แสดงเมนูหลัก
- เลือกระดับความยาก
- เริ่มเกม

### BattleScene
- จัดการ battle logic
- จัดการ turn system
- แสดง battle animations

### UIScene
- แสดง HUD (HP, MP, Turn indicator)
- แสดง skill buttons
- จัดการ UI interactions

## 📦 การใช้งาน

### Import Scene
```typescript
import { PreloadScene } from "@/game/scenes/PreloadScene";
import { BattleScene } from "@/game/scenes/BattleScene";
```

### Import Config
```typescript
import { GAME_CONFIG } from "@/game/config/gameConfig";
import { COLORS, SceneKey } from "@/game/config/constants";
```

### Import Store
```typescript
import { useGameStore } from "@/stores/gameStore";
```

## 🔧 การพัฒนา

### เพิ่ม Scene ใหม่

1. สร้างไฟล์ใน `scenes/`:
```typescript
import Phaser from "phaser";
import { SceneKey } from "@/game/config/constants";

export class NewScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey.NEW });
  }
  
  create() {
    // Scene logic
  }
}
```

2. เพิ่ม scene key ใน `constants.ts`:
```typescript
export enum SceneKey {
  // ...
  NEW = "NewScene",
}
```

3. เพิ่ม scene ใน `PhaserGame.tsx`:
```typescript
import { NewScene } from "@/game/scenes/NewScene";

config.scene = [PreloadScene, MenuScene, BattleScene, UIScene, NewScene];
```

### เพิ่ม Entity ใหม่

1. สร้างไฟล์ใน `entities/`:
```typescript
import Phaser from "phaser";

export class NewEntity extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
  }
}
```

### เพิ่ม System ใหม่

1. สร้างไฟล์ใน `systems/`:
```typescript
export class NewSystem {
  constructor() {
    // Initialize system
  }
  
  update(delta: number) {
    // Update logic
  }
}
```

## 📚 หมายเหตุ

- ทุก scene ต้องปฏิบัติตาม UI_RULES.md
- ใช้ responsive positioning เสมอ
- รองรับ touch input
- ใช้ safe zones สำหรับ UI
