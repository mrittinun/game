# Game Design Document

> เอกสารออกแบบเกม Turn-Based Battle สำหรับเว็บและมือถือ

## 📋 ข้อมูลพื้นฐาน

### ข้อมูลโปรเจค

| รายการ | รายละเอียด |
|--------|-----------|
| **ชื่อเกม** | Turn-Based Battle Game |
| **ประเภท** | Turn-Based RPG Battle |
| **แนวหน้าจอ** | Landscape Only (แนวนอนเท่านั้น) |
| **Platform** | Web Browser, Mobile, Tablet, Desktop |
| **Engine** | Phaser 3 + Next.js |
| **ขนาดหน้าจอ** | 1280x720 (16:9 aspect ratio) |

### เป้าหมายการออกแบบ

1. **Accessibility**: เล่นได้ง่ายบนทุกอุปกรณ์
2. **Responsive**: UI ปรับตามขนาดหน้าจออัตโนมัติ
3. **Mobile-First**: ออกแบบให้เล่นบนมือถือได้สะดวก
4. **Turn-Based**: ระบบเทิร์นที่ชัดเจนและเข้าใจง่าย
5. **Engaging**: สนุกและท้าทาย

---

## 🎮 Core Gameplay

### Game Loop

```
Start Battle
    ↓
Initialize Battle
    ↓
┌─────────────────┐
│  Player Turn    │
│  - Select Skill │
│  - Execute      │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Enemy Turn     │
│  - AI Decision  │
│  - Execute      │
└────────┬────────┘
         ↓
    Check Victory
         ↓
    ┌────┴────┐
    │ Winner? │
    └────┬────┘
         │
    Yes  │  No
         │   ↓
         │  Loop
         ↓
    End Battle
```


### Turn Flow

#### Player Turn
1. **Start Phase**
   - แสดง UI ให้เลือกสกิล
   - Highlight ปุ่มที่ใช้ได้
   - แสดงข้อมูล MP/Cooldown

2. **Selection Phase**
   - ผู้เล่นเลือกสกิล
   - แสดง preview ของสกิล (ถ้ามี)
   - ยืนยันการเลือก

3. **Execution Phase**
   - เล่น animation
   - คำนวณความเสียหาย
   - อัพเดท HP/MP
   - แสดงผลลัพธ์

4. **End Phase**
   - ตรวจสอบสถานะ (ชนะ/แพ้)
   - เปลี่ยนเป็น Enemy Turn

#### Enemy Turn
1. **AI Decision Phase**
   - AI เลือกสกิล
   - คำนวณ strategy

2. **Execution Phase**
   - เล่น animation
   - คำนวณความเสียหาย
   - อัพเดท HP/MP
   - แสดงผลลัพธ์

3. **End Phase**
   - ตรวจสอบสถานะ (ชนะ/แพ้)
   - เปลี่ยนเป็น Player Turn

---

## 🎯 Battle System

### Combat Mechanics

#### Damage Calculation

```typescript
// Base formula
baseDamage = skill.power * (attacker.attack / 100)

// Defense reduction
damage = baseDamage * (1 - defender.defense / 100)

// Random variance (90% - 110%)
damage = damage * (0.9 + Math.random() * 0.2)

// Elemental effectiveness
damage = damage * elementalMultiplier

// Critical hit (10% chance, 1.5x damage)
if (Math.random() < 0.1) {
  damage = damage * 1.5
  isCritical = true
}

// Final damage
finalDamage = Math.floor(damage)
```

#### Elemental System

| Attacker → Defender | Fire | Water | Earth | Wind |
|---------------------|------|-------|-------|------|
| **Fire** | 1.0x | 0.5x | 1.5x | 1.0x |
| **Water** | 1.5x | 1.0x | 0.5x | 1.0x |
| **Earth** | 0.5x | 1.5x | 1.0x | 1.0x |
| **Wind** | 1.0x | 1.0x | 1.5x | 1.0x |


### Skill System

#### Skill Types

1. **Attack Skills**
   - สกิลโจมตีปกติ
   - ใช้ MP
   - สร้างความเสียหาย

2. **Heal Skills**
   - ฟื้นฟู HP
   - ใช้ MP
   - รักษาตัวเองหรือพันธมิตร

3. **Buff Skills**
   - เพิ่มสถานะ (Attack, Defense)
   - ใช้ MP
   - มีระยะเวลา

4. **Debuff Skills**
   - ลดสถานะศัตรู
   - ใช้ MP
   - มีระยะเวลา

#### Skill Properties

```typescript
interface Skill {
  id: string;
  name: string;
  type: "attack" | "heal" | "buff" | "debuff";
  element: "fire" | "water" | "earth" | "wind" | "neutral";
  power: number;        // Base power
  mpCost: number;       // MP required
  cooldown: number;     // Turns until can use again
  target: "self" | "enemy" | "all";
  animation: string;    // Animation key
  description: string;
}
```

#### Example Skills

```typescript
const skills: Skill[] = [
  {
    id: "fireball",
    name: "Fireball",
    type: "attack",
    element: "fire",
    power: 120,
    mpCost: 20,
    cooldown: 0,
    target: "enemy",
    animation: "fireball-cast",
    description: "Launch a fireball at the enemy"
  },
  {
    id: "heal",
    name: "Heal",
    type: "heal",
    element: "neutral",
    power: 80,
    mpCost: 15,
    cooldown: 2,
    target: "self",
    animation: "heal-cast",
    description: "Restore HP"
  },
  {
    id: "power-up",
    name: "Power Up",
    type: "buff",
    element: "neutral",
    power: 50,  // 50% attack increase
    mpCost: 10,
    cooldown: 3,
    target: "self",
    animation: "buff-cast",
    description: "Increase attack for 3 turns"
  }
];
```

---

## 📐 Screen Layout

### Layout Zones

```
┌─────────────────────────────────────────────────────────┐
│ Safe Zone Top (60px)                                    │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Top Bar (HP/MP/Status)                              │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌───────┐         Battle Area          ┌───────┐        │
│ │ Left  │                               │ Right │        │
│ │ Panel │      ┌─────────┐             │ Panel │        │
│ │       │      │ Player  │             │       │        │
│ │       │      └─────────┘             │       │        │
│ │       │                               │       │        │
│ │       │      ┌─────────┐             │       │        │
│ │       │      │ Enemy   │             │       │        │
│ │       │      └─────────┘             │       │        │
│ └───────┘                               └───────┘        │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Bottom Bar (Skills/Actions)                         │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Safe Zone Bottom (60px)                                 │
└─────────────────────────────────────────────────────────┘
```


### UI Areas

#### 1. Top Bar (HUD)
- **ตำแหน่ง**: ด้านบน, ภายใน safe zone
- **ขนาด**: Full width × 80px
- **เนื้อหา**:
  - Player HP bar (ซ้าย)
  - Player MP bar (ซ้าย)
  - Turn indicator (กลาง)
  - Enemy HP bar (ขวา)
  - Timer (ถ้ามี)

#### 2. Battle Area (Center)
- **ตำแหน่ง**: กลางหน้าจอ
- **ขนาด**: Flexible, ปรับตามหน้าจอ
- **เนื้อหา**:
  - Player character sprite
  - Enemy character sprite
  - Battle effects/animations
  - Damage numbers
  - Status indicators

#### 3. Left Panel (Optional)
- **ตำแหน่ง**: ซ้ายสุด, ภายใน safe zone
- **ขนาด**: 200px × flexible
- **เนื้อหา**:
  - Player stats
  - Active buffs/debuffs
  - Equipment (ถ้ามี)

#### 4. Right Panel (Optional)
- **ตำแหน่ง**: ขวาสุด, ภายใน safe zone
- **ขนาด**: 200px × flexible
- **เนื้อหา**:
  - Enemy info
  - Battle log
  - Tips

#### 5. Bottom Bar (Skills)
- **ตำแหน่ง**: ด้านล่าง, ภายใน safe zone
- **ขนาด**: Full width × 100px
- **เนื้อหา**:
  - Skill buttons (4-6 ปุ่ม)
  - Skill cooldowns
  - MP costs
  - Action buttons (Attack, Defend, Item)

### Responsive Layout Rules

```typescript
// Layout configuration
const layout = {
  // Safe zones (ห้าม UI อยู่ในโซนนี้)
  safeZone: {
    top: 60,
    bottom: 60,
    left: 40,
    right: 40,
  },
  
  // UI zones
  topBar: {
    y: 60,
    height: 80,
  },
  
  bottomBar: {
    y: (screenHeight) => screenHeight - 140,
    height: 80,
  },
  
  battleArea: {
    x: 240,
    y: 140,
    width: (screenWidth) => screenWidth - 480,
    height: (screenHeight) => screenHeight - 280,
  },
  
  // Character positions (relative to battle area)
  player: {
    x: (battleWidth) => battleWidth * 0.3,
    y: (battleHeight) => battleHeight * 0.6,
  },
  
  enemy: {
    x: (battleWidth) => battleWidth * 0.7,
    y: (battleHeight) => battleHeight * 0.4,
  },
};
```

---

## 🎨 Visual Design

### Art Style
- **Style**: 2D Pixel Art / Anime Style
- **Color Palette**: Vibrant และ High Contrast
- **Animation**: Smooth และ Responsive

### UI Elements

#### Health Bar
```
┌─────────────────────────────┐
│ HP: 850 / 1000              │
│ ████████████████░░░░░░░░    │ 85%
└─────────────────────────────┘
```

#### Mana Bar
```
┌─────────────────────────────┐
│ MP: 60 / 100                │
│ ████████████░░░░░░░░░░░░░░  │ 60%
└─────────────────────────────┘
```

#### Skill Button
```
┌─────────┐
│  🔥     │
│ Fireball│
│ MP: 20  │
│ CD: 0   │
└─────────┘
```


### Color Scheme

```typescript
const colors = {
  // Primary colors
  primary: 0x4A90E2,      // Blue
  secondary: 0xE94560,    // Red
  success: 0x50C878,      // Green
  warning: 0xFFB347,      // Orange
  danger: 0xFF4444,       // Red
  
  // UI colors
  background: 0x1A1A2E,   // Dark blue
  panel: 0x16213E,        // Darker blue
  text: 0xFFFFFF,         // White
  textSecondary: 0xCCCCCC, // Light gray
  
  // HP/MP colors
  hp: 0xFF4444,           // Red
  hpBackground: 0x333333, // Dark gray
  mp: 0x4A90E2,           // Blue
  mpBackground: 0x333333, // Dark gray
  
  // Element colors
  fire: 0xFF6B35,         // Orange-red
  water: 0x4A90E2,        // Blue
  earth: 0x8B4513,        // Brown
  wind: 0x90EE90,         // Light green
  neutral: 0xCCCCCC,      // Gray
};
```

### Typography

```typescript
const fonts = {
  // Font families
  primary: "Arial, sans-serif",
  secondary: "Courier New, monospace",
  
  // Font sizes (base, will be scaled)
  title: 48,
  heading: 32,
  body: 24,
  small: 18,
  tiny: 14,
  
  // Font weights
  bold: "bold",
  normal: "normal",
};
```

---

## 🎬 Animation System

### Animation Types

#### 1. Character Animations
- **Idle**: วนซ้ำตลอด
- **Attack**: เล่นครั้งเดียว
- **Hit**: เล่นเมื่อโดนโจมตี
- **Heal**: เล่นเมื่อฟื้นฟู
- **Victory**: เล่นเมื่อชนะ
- **Defeat**: เล่นเมื่อแพ้

#### 2. Skill Animations
- **Cast**: Animation ก่อนใช้สกิล
- **Projectile**: Animation ของ projectile (ถ้ามี)
- **Impact**: Animation เมื่อโดนเป้าหมาย
- **Effect**: Particle effects

#### 3. UI Animations
- **Button Press**: Scale down + tint
- **HP/MP Change**: Smooth transition
- **Damage Number**: Float up + fade out
- **Turn Indicator**: Pulse effect

### Animation Timing

```typescript
const animationDurations = {
  // Character animations
  idle: -1,              // Loop forever
  attack: 600,           // 0.6 seconds
  hit: 300,              // 0.3 seconds
  heal: 800,             // 0.8 seconds
  
  // Skill animations
  cast: 500,             // 0.5 seconds
  projectile: 400,       // 0.4 seconds
  impact: 300,           // 0.3 seconds
  
  // UI animations
  buttonPress: 100,      // 0.1 seconds
  hpChange: 500,         // 0.5 seconds
  damageNumber: 1000,    // 1 second
  
  // Delays
  turnDelay: 500,        // Delay between turns
  actionDelay: 300,      // Delay before action
};
```

---

## 🎵 Audio Design

### Sound Categories

#### 1. Music (BGM)
- **Menu Theme**: เพลงหน้าเมนู
- **Battle Theme**: เพลงระหว่างต่อสู้
- **Victory Theme**: เพลงเมื่อชนะ
- **Defeat Theme**: เพลงเมื่อแพ้

#### 2. Sound Effects (SFX)
- **UI Sounds**:
  - Button click
  - Button hover
  - Menu open/close
  
- **Battle Sounds**:
  - Attack hit
  - Skill cast
  - Damage taken
  - Heal
  - Critical hit
  - Block/Defend
  
- **Character Sounds**:
  - Character voice (optional)
  - Footsteps
  - Victory cry
  - Defeat cry

### Audio Configuration

```typescript
const audioConfig = {
  // Volume levels (0.0 - 1.0)
  masterVolume: 1.0,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  
  // Audio settings
  html5: true,           // Use HTML5 Audio for mobile
  preload: true,         // Preload audio
  
  // Fade settings
  fadeDuration: 1000,    // 1 second fade
};
```


---

## 🤖 AI System

### Enemy AI Behavior

#### AI Difficulty Levels

1. **Easy**
   - Random skill selection
   - No strategy
   - 70% optimal moves

2. **Normal**
   - Basic strategy
   - Considers HP/MP
   - 85% optimal moves

3. **Hard**
   - Advanced strategy
   - Predicts player moves
   - 95% optimal moves

### AI Decision Making

```typescript
class EnemyAI {
  selectAction(enemy: Enemy, player: Player): Action {
    // 1. Check critical situations
    if (enemy.hp < enemy.maxHp * 0.3) {
      // Low HP - prioritize healing
      if (this.canHeal()) {
        return this.selectHealSkill();
      }
    }
    
    // 2. Check if player has low HP
    if (player.hp < player.maxHp * 0.3) {
      // Player low HP - go for kill
      return this.selectStrongestAttack();
    }
    
    // 3. Check buffs/debuffs
    if (!this.hasActiveBuff()) {
      // No buffs - consider buffing
      if (Math.random() < 0.3) {
        return this.selectBuffSkill();
      }
    }
    
    // 4. Check elemental advantage
    const advantageSkill = this.findElementalAdvantage(player);
    if (advantageSkill) {
      return advantageSkill;
    }
    
    // 5. Default - use available attack
    return this.selectRandomAttack();
  }
  
  private calculateThreat(skill: Skill): number {
    // Calculate how threatening this skill is
    let threat = skill.power;
    
    // Consider MP cost
    threat *= (1 - skill.mpCost / 100);
    
    // Consider cooldown
    threat *= (1 - skill.cooldown / 10);
    
    return threat;
  }
}
```

---

## 📊 Game Balance

### Character Stats

#### Player Base Stats
```typescript
const playerStats = {
  hp: 1000,
  maxHp: 1000,
  mp: 100,
  maxMp: 100,
  attack: 100,
  defense: 50,
  speed: 80,
  level: 1,
};
```

#### Enemy Base Stats (by difficulty)
```typescript
const enemyStats = {
  easy: {
    hp: 800,
    maxHp: 800,
    mp: 80,
    maxMp: 80,
    attack: 80,
    defense: 40,
    speed: 60,
  },
  normal: {
    hp: 1000,
    maxHp: 1000,
    mp: 100,
    maxMp: 100,
    attack: 100,
    defense: 50,
    speed: 80,
  },
  hard: {
    hp: 1200,
    maxHp: 1200,
    mp: 120,
    maxMp: 120,
    attack: 120,
    defense: 60,
    speed: 100,
  },
};
```

### Skill Balance

```typescript
// Skill power vs MP cost ratio
const skillBalance = {
  // Attack skills: ~5-6 damage per MP
  basicAttack: { power: 100, mpCost: 0 },    // Free
  fireball: { power: 120, mpCost: 20 },      // 6 dmg/MP
  lightning: { power: 150, mpCost: 30 },     // 5 dmg/MP
  meteor: { power: 200, mpCost: 40 },        // 5 dmg/MP
  
  // Heal skills: ~4-5 HP per MP
  smallHeal: { power: 80, mpCost: 15 },      // 5.3 HP/MP
  mediumHeal: { power: 150, mpCost: 30 },    // 5 HP/MP
  largeHeal: { power: 250, mpCost: 50 },     // 5 HP/MP
  
  // Buff skills: duration matters
  attackBuff: { power: 50, mpCost: 10, duration: 3 },
  defenseBuff: { power: 50, mpCost: 10, duration: 3 },
};
```

---

## 📱 Mobile Optimization

### Touch Controls

#### Touch Targets
- **Minimum Size**: 44×44 pixels (Apple HIG)
- **Recommended Size**: 60×60 pixels
- **Spacing**: 20 pixels minimum

#### Touch Feedback
```typescript
// Visual feedback for touch
button.on("pointerdown", () => {
  button.setScale(0.95);
  button.setTint(0xCCCCCC);
  audioManager.play("button-press");
});

button.on("pointerup", () => {
  button.setScale(1.0);
  button.clearTint();
});

button.on("pointerout", () => {
  button.setScale(1.0);
  button.clearTint();
});
```

### Performance Optimization

#### Target Performance
- **FPS**: 60 FPS (stable)
- **Load Time**: < 3 seconds
- **Memory**: < 200 MB
- **Battery**: Optimized for mobile

#### Optimization Techniques
1. **Texture Atlas**: รวมรูปภาพเป็น atlas
2. **Object Pooling**: ใช้ซ้ำ objects
3. **Lazy Loading**: โหลดเมื่อจำเป็น
4. **Audio Sprites**: รวมเสียงเป็น sprite
5. **Minimize Draw Calls**: ลด draw calls


---

## 🎯 User Experience (UX)

### Player Feedback

#### Visual Feedback
- **Damage Numbers**: แสดงตัวเลขความเสียหาย
- **HP Bar Animation**: Smooth transition
- **Screen Shake**: เมื่อโดนโจมตีหนัก
- **Flash Effect**: เมื่อ critical hit
- **Particle Effects**: สำหรับสกิล

#### Audio Feedback
- **Hit Sound**: เมื่อโจมตีโดน
- **Miss Sound**: เมื่อโจมตีพลาด
- **Critical Sound**: เมื่อ critical hit
- **Skill Sound**: เมื่อใช้สกิล
- **UI Sound**: เมื่อกดปุ่ม

#### Haptic Feedback (Mobile)
```typescript
// Vibrate on important events
if (navigator.vibrate) {
  // Light tap for button press
  navigator.vibrate(10);
  
  // Medium tap for hit
  navigator.vibrate(50);
  
  // Strong tap for critical hit
  navigator.vibrate([50, 30, 50]);
}
```

### Tutorial System

#### First Time User Experience (FTUE)

1. **Welcome Screen**
   - แนะนำเกม
   - อธิบายเป้าหมาย

2. **Basic Controls**
   - แสดงวิธีเลือกสกิล
   - แสดงวิธีโจมตี

3. **First Battle**
   - ศัตรูอ่อนแอ
   - มี hints
   - ไม่สามารถแพ้ได้

4. **Advanced Mechanics**
   - อธิบาย elements
   - อธิบาย buffs/debuffs
   - อธิบาย strategy

### Accessibility

#### Visual Accessibility
- **Color Blind Mode**: ใช้ patterns นอกจากสี
- **High Contrast Mode**: เพิ่ม contrast
- **Text Size**: ปรับขนาดตัวอักษรได้

#### Audio Accessibility
- **Subtitles**: สำหรับเสียงพูด (ถ้ามี)
- **Visual Indicators**: แทนเสียง
- **Volume Controls**: ปรับแยกได้

---

## 🏆 Progression System

### Level System

```typescript
interface PlayerProgress {
  level: number;
  experience: number;
  experienceToNext: number;
  skillPoints: number;
  unlockedSkills: string[];
}

// Experience curve
function calculateExpToNext(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Level up rewards
function onLevelUp(player: Player) {
  player.level++;
  player.maxHp += 50;
  player.maxMp += 10;
  player.attack += 5;
  player.defense += 3;
  player.skillPoints += 1;
  
  // Heal to full
  player.hp = player.maxHp;
  player.mp = player.maxMp;
}
```

### Skill Unlock System

```typescript
const skillTree = {
  tier1: {
    requiredLevel: 1,
    skills: ["basic-attack", "small-heal"],
  },
  tier2: {
    requiredLevel: 5,
    skills: ["fireball", "ice-shard"],
  },
  tier3: {
    requiredLevel: 10,
    skills: ["lightning-bolt", "medium-heal"],
  },
  tier4: {
    requiredLevel: 15,
    skills: ["meteor", "large-heal"],
  },
};
```

### Reward System

#### Battle Rewards
- **Experience**: ตามระดับศัตรู
- **Gold**: สำหรับซื้อไอเทม (ถ้ามี)
- **Items**: สุ่มได้ไอเทม (ถ้ามี)

```typescript
function calculateBattleRewards(enemy: Enemy, victory: boolean) {
  if (!victory) {
    return { exp: 0, gold: 0, items: [] };
  }
  
  const baseExp = enemy.level * 50;
  const baseGold = enemy.level * 20;
  
  // Bonus for perfect victory (no damage taken)
  const perfectBonus = player.hp === player.maxHp ? 1.5 : 1.0;
  
  return {
    exp: Math.floor(baseExp * perfectBonus),
    gold: Math.floor(baseGold * perfectBonus),
    items: rollRandomItems(enemy.level),
  };
}
```

---

## 🔧 Technical Implementation

### Scene Architecture

```typescript
// Scene flow
PreloadScene → MenuScene → BattleScene → ResultScene
                    ↑            ↓
                    └────────────┘
```

#### Scene Responsibilities

1. **PreloadScene**
   - โหลด assets ทั้งหมด
   - แสดง loading bar
   - เปลี่ยนไป MenuScene

2. **MenuScene**
   - แสดงเมนูหลัก
   - เลือกระดับความยาก
   - เริ่มเกม

3. **BattleScene**
   - จัดการ battle logic
   - จัดการ turn system
   - แสดง battle animations

4. **UIScene** (Parallel)
   - แสดง HUD
   - แสดง skill buttons
   - จัดการ UI interactions

5. **ResultScene**
   - แสดงผลการต่อสู้
   - แสดง rewards
   - กลับไป MenuScene


### Data Management

#### Game State

```typescript
interface GameState {
  // Player data
  player: {
    stats: PlayerStats;
    skills: Skill[];
    inventory: Item[];
    progress: PlayerProgress;
  };
  
  // Battle data
  currentBattle?: {
    enemy: Enemy;
    turn: "player" | "enemy";
    turnCount: number;
    battleLog: BattleEvent[];
  };
  
  // Settings
  settings: {
    musicVolume: number;
    sfxVolume: number;
    difficulty: "easy" | "normal" | "hard";
    language: string;
  };
  
  // Flags
  flags: {
    tutorialCompleted: boolean;
    firstBattle: boolean;
    [key: string]: boolean;
  };
}
```

#### Save System

```typescript
class SaveManager {
  private readonly SAVE_KEY = "turn-based-game-save";
  
  save(gameState: GameState) {
    try {
      const saveData = JSON.stringify(gameState);
      localStorage.setItem(this.SAVE_KEY, saveData);
      return true;
    } catch (error) {
      console.error("Save failed:", error);
      return false;
    }
  }
  
  load(): GameState | null {
    try {
      const saveData = localStorage.getItem(this.SAVE_KEY);
      if (saveData) {
        return JSON.parse(saveData);
      }
      return null;
    } catch (error) {
      console.error("Load failed:", error);
      return null;
    }
  }
  
  delete() {
    localStorage.removeItem(this.SAVE_KEY);
  }
  
  exists(): boolean {
    return localStorage.getItem(this.SAVE_KEY) !== null;
  }
}
```

### Event System

```typescript
// Global event bus
class EventBus extends Phaser.Events.EventEmitter {
  private static instance: EventBus;
  
  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  
  // Battle events
  static readonly BATTLE_START = "battle:start";
  static readonly BATTLE_END = "battle:end";
  static readonly TURN_START = "turn:start";
  static readonly TURN_END = "turn:end";
  
  // Action events
  static readonly SKILL_USED = "skill:used";
  static readonly DAMAGE_DEALT = "damage:dealt";
  static readonly HEAL_APPLIED = "heal:applied";
  
  // UI events
  static readonly UI_BUTTON_CLICK = "ui:button:click";
  static readonly UI_SKILL_SELECT = "ui:skill:select";
}

// Usage
const eventBus = EventBus.getInstance();

// Emit event
eventBus.emit(EventBus.SKILL_USED, { skill, target });

// Listen to event
eventBus.on(EventBus.SKILL_USED, (data) => {
  console.log("Skill used:", data.skill.name);
});
```

---

## 📊 Analytics & Metrics

### Key Metrics to Track

#### Engagement Metrics
- **Session Length**: ระยะเวลาเล่นต่อครั้ง
- **Sessions per Day**: จำนวนครั้งที่เล่นต่อวัน
- **Retention Rate**: อัตราผู้เล่นกลับมาเล่น
- **DAU/MAU**: Daily/Monthly Active Users

#### Gameplay Metrics
- **Battles Played**: จำนวนการต่อสู้
- **Win Rate**: อัตราการชนะ
- **Average Battle Duration**: ระยะเวลาต่อสู้เฉลี่ย
- **Most Used Skills**: สกิลที่ใช้บ่อยที่สุด
- **Death Rate**: อัตราการตาย

#### Technical Metrics
- **Load Time**: เวลาโหลดเกม
- **FPS**: Frames per second
- **Crash Rate**: อัตราการ crash
- **Error Rate**: อัตราการเกิด error

### Analytics Implementation

```typescript
class Analytics {
  // Track event
  trackEvent(category: string, action: string, label?: string, value?: number) {
    // Send to analytics service
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }
  
  // Track battle
  trackBattle(result: "win" | "lose", duration: number, enemy: Enemy) {
    this.trackEvent("Battle", result, enemy.name, duration);
  }
  
  // Track skill usage
  trackSkillUsage(skill: Skill) {
    this.trackEvent("Skill", "use", skill.name);
  }
  
  // Track performance
  trackPerformance(fps: number, loadTime: number) {
    this.trackEvent("Performance", "fps", undefined, fps);
    this.trackEvent("Performance", "load_time", undefined, loadTime);
  }
}
```

---

## 🚀 Future Features

### Phase 1 (MVP)
- [x] Basic battle system
- [x] Turn-based combat
- [x] 4 basic skills
- [x] 1 enemy type
- [x] Mobile support
- [x] PWA support

### Phase 2 (Enhancement)
- [ ] Multiple enemy types
- [ ] More skills (8-12)
- [ ] Elemental system
- [ ] Status effects
- [ ] Battle animations
- [ ] Sound effects

### Phase 3 (Progression)
- [ ] Level system
- [ ] Skill tree
- [ ] Equipment system
- [ ] Inventory
- [ ] Save/Load
- [ ] Multiple battles

### Phase 4 (Content)
- [ ] Story mode
- [ ] Boss battles
- [ ] Achievements
- [ ] Leaderboard
- [ ] Daily challenges
- [ ] Events

### Phase 5 (Social)
- [ ] Multiplayer (PvP)
- [ ] Friend system
- [ ] Guilds/Clans
- [ ] Chat
- [ ] Trading

---

## 📋 Development Checklist

### Pre-Development
- [x] Game design document
- [x] UI/UX design
- [x] Technical architecture
- [x] Asset list
- [ ] Prototype

### Core Development
- [ ] Scene setup
- [ ] Battle system
- [ ] Turn system
- [ ] Skill system
- [ ] Damage calculation
- [ ] UI implementation
- [ ] Animation system
- [ ] Audio system

### Polish
- [ ] Visual effects
- [ ] Sound effects
- [ ] UI animations
- [ ] Transitions
- [ ] Feedback systems

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Mobile testing
- [ ] Performance testing
- [ ] User testing

### Launch
- [ ] Bug fixes
- [ ] Optimization
- [ ] Documentation
- [ ] Marketing materials
- [ ] Deployment

---

## 📚 References

### Design References
- **Pokemon**: Turn-based battle system
- **Final Fantasy**: ATB system inspiration
- **Hearthstone**: Card game UI
- **Clash Royale**: Mobile-first design

### Technical References
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [UI_RULES.md](./UI_RULES.md)
- [AI_RULES.md](./AI_RULES.md)
- [MOBILE_GUIDE.md](./MOBILE_GUIDE.md)

---

## 🎓 สรุป

เกมนี้เป็น Turn-Based Battle Game ที่:

1. **รองรับมือถือ**: ออกแบบมาสำหรับมือถือเป็นหลัก
2. **Responsive**: ปรับตามขนาดหน้าจออัตโนมัติ
3. **Accessible**: เล่นได้ง่ายสำหรับทุกคน
4. **Engaging**: สนุกและท้าทาย
5. **Scalable**: ขยายเพิ่มเติมได้ง่าย

### Core Pillars

1. **Mobile-First**: ทุกอย่างออกแบบสำหรับมือถือก่อน
2. **Responsive Design**: UI ต้องไม่พังบนอุปกรณ์ใดๆ
3. **Clear Feedback**: ผู้เล่นต้องเข้าใจสิ่งที่เกิดขึ้น
4. **Strategic Depth**: มีความลึกในการเล่น
5. **Polish**: ทุกอย่างต้องลื่นไหลและสวยงาม

---

**เอกสารนี้เป็น living document ที่จะอัพเดทตามการพัฒนาโปรเจค**

**Last Updated**: 2026-02-18
**Version**: 1.0.0
