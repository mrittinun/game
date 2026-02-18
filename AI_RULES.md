# AI Rules - กฎสำหรับ AI Development

> เอกสารนี้กำหนดกฎและแนวทางสำหรับ AI tools (เช่น Kiro, Cursor, GitHub Copilot) ในการพัฒนาโปรเจคเกมนี้

## 🎯 วัตถุประสงค์

เอกสารนี้ช่วยให้ AI:
1. เข้าใจข้อจำกัดและข้อกำหนดของโปรเจค
2. สร้าง code ที่ถูกต้องและรองรับมือถือ
3. หลีกเลี่ยงข้อผิดพลาดที่พบบ่อย
4. รักษามาตรฐาน code quality

---

## 🚨 กฎบังคับที่ห้ามละเมิด

### 1. Game Engine Rules

#### ✅ ต้องทำ
- ใช้ **Phaser 3** เท่านั้นสำหรับ game engine
- ใช้ **Next.js** สำหรับ framework
- ใช้ **TypeScript** สำหรับ type safety
- ใช้ **Tailwind CSS** สำหรับ styling (นอก Phaser)

#### ❌ ห้ามทำ
- ห้ามใช้ game engine อื่น (Unity, Godot, PixiJS, etc.)
- ห้ามใช้ Phaser 2 หรือ Phaser CE
- ห้ามใช้ JavaScript แทน TypeScript
- ห้ามใช้ CSS framework อื่น

### 2. Mobile Support Rules

#### ✅ ต้องทำ
- รองรับมือถือ (iOS, Android) **เสมอ**
- รองรับแท็บเล็ตและ iPad **เสมอ**
- รองรับ landscape mode **เสมอ**
- ใช้ responsive scaling **เสมอ**
- รองรับ touch input **เสมอ**

#### ❌ ห้ามทำ
- ห้ามสร้าง code ที่ทำงานเฉพาะ desktop
- ห้ามใช้ mouse-only interactions
- ห้ามสร้าง UI ที่ไม่ responsive
- ห้ามละเลย safe areas

### 3. UI Positioning Rules

#### ✅ ต้องทำ
- ใช้ **relative positioning** (camera bounds, percentages)
- ใช้ **safe zones** สำหรับ UI placement
- ใช้ **responsive scaling** สำหรับ UI elements
- ใช้ **Container** สำหรับ UI groups

#### ❌ ห้ามทำ
- ห้ามใช้ fixed pixel positioning
- ห้ามวาง UI ชิดขอบหน้าจอ
- ห้ามสร้าง UI ที่หลุดจอ
- ห้ามใช้ absolute values โดยไม่ scale

### 4. Phaser Configuration Rules

#### ✅ ต้องทำ
- ใช้ `Phaser.Scale.FIT` **เสมอ**
- ใช้ `Phaser.Scale.CENTER_BOTH` **เสมอ**
- ตั้งขนาดเกม 1280x720 (16:9)
- เพิ่ม resize handler **เสมอ**

#### ❌ ห้ามทำ
- ห้ามใช้ scale mode อื่น
- ห้ามใช้ auto center อื่น
- ห้ามเปลี่ยนขนาดเกมโดยไม่มีเหตุผล
- ห้ามลืม resize handler

---

## 📝 Coding Standards

### 1. File Organization

#### ✅ โครงสร้างที่ถูกต้อง

```
web-game/
├── app/                    # Next.js pages
├── components/             # React components
├── scenes/                 # Phaser scenes
│   ├── PreloadScene.ts
│   ├── MenuScene.ts
│   ├── BattleScene.ts
│   └── UIScene.ts
├── game/                   # Game logic
│   ├── entities/           # Game entities
│   │   ├── Player.ts
│   │   ├── Enemy.ts
│   │   └── Skill.ts
│   ├── systems/            # Game systems
│   │   ├── BattleSystem.ts
│   │   ├── TurnSystem.ts
│   │   └── DamageSystem.ts
│   ├── managers/           # Managers
│   │   ├── GameManager.ts
│   │   ├── UIManager.ts
│   │   └── AudioManager.ts
│   └── config/             # Configuration
│       ├── gameConfig.ts
│       └── constants.ts
├── lib/                    # Utilities
└── public/                 # Assets
    ├── sprites/
    ├── sounds/
    └── ui/
```

### 2. Scene Structure

#### ✅ ต้องมีโครงสร้างนี้

```typescript
export class BattleScene extends Phaser.Scene {
  // Properties
  private player?: Player;
  private enemy?: Enemy;
  private uiManager?: UIManager;
  
  constructor() {
    super({ key: "BattleScene" });
  }
  
  // Lifecycle methods
  init(data?: any) {
    // Initialize scene data
  }
  
  preload() {
    // Load assets (if needed)
  }
  
  create() {
    // Setup scene
    this.setupCamera();
    this.setupUI();
    this.setupEntities();
    this.setupInput();
  }
  
  update(time: number, delta: number) {
    // Game loop
  }
  
  // Private methods
  private setupCamera() {
    // Camera setup
  }
  
  private setupUI() {
    // UI setup with safe zones
    const { width, height } = this.cameras.main;
    const safe = { top: 60, bottom: 60, left: 40, right: 40 };
    // ...
  }
  
  private setupEntities() {
    // Entity setup
  }
  
  private setupInput() {
    // Input setup (touch + mouse)
  }
  
  // Public methods
  public cleanup() {
    // Cleanup before scene change
  }
}
```

### 3. TypeScript Standards

#### ✅ ต้องทำ

```typescript
// ใช้ interfaces สำหรับ data structures
interface PlayerData {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
}

// ใช้ types สำหรับ unions
type SkillType = "attack" | "heal" | "buff" | "debuff";

// ใช้ enums สำหรับ constants
enum BattleState {
  IDLE = "idle",
  PLAYER_TURN = "player_turn",
  ENEMY_TURN = "enemy_turn",
  ANIMATING = "animating",
  GAME_OVER = "game_over",
}

// ใช้ generics เมื่อเหมาะสม
class EventEmitter<T> {
  private listeners: Map<string, ((data: T) => void)[]> = new Map();
  
  on(event: string, callback: (data: T) => void) {
    // ...
  }
}

// ใช้ readonly เมื่อเหมาะสม
class GameConfig {
  readonly GAME_WIDTH = 1280;
  readonly GAME_HEIGHT = 720;
  readonly SAFE_ZONE_TOP = 60;
}
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามใช้ any
function processData(data: any) { }

// ✅ ใช้ proper types
function processData(data: PlayerData) { }

// ❌ ห้ามใช้ var
var count = 0;

// ✅ ใช้ const/let
const count = 0;
let mutableCount = 0;

// ❌ ห้ามละ type annotations
function calculate(a, b) {
  return a + b;
}

// ✅ ระบุ types
function calculate(a: number, b: number): number {
  return a + b;
}
```

### 4. Naming Conventions

#### ✅ ต้องทำ

```typescript
// Classes: PascalCase
class BattleManager { }
class PlayerEntity { }

// Interfaces: PascalCase with I prefix (optional)
interface ISkillData { }
interface PlayerStats { }

// Functions/Methods: camelCase
function calculateDamage() { }
private updateHealthBar() { }

// Constants: UPPER_SNAKE_CASE
const MAX_HEALTH = 100;
const SKILL_COOLDOWN = 3000;

// Variables: camelCase
let playerHealth = 100;
const enemyPosition = { x: 0, y: 0 };

// Private properties: camelCase with _ prefix
private _internalState: string;

// Files: kebab-case
battle-scene.ts
player-entity.ts
damage-calculator.ts
```

---

## 🎮 Game Development Rules

### 1. Scene Management

#### ✅ ต้องทำ

```typescript
// แยก scenes ตามหน้าที่
class PreloadScene extends Phaser.Scene {
  // โหลด assets เท่านั้น
}

class MenuScene extends Phaser.Scene {
  // แสดง menu เท่านั้น
}

class BattleScene extends Phaser.Scene {
  // จัดการ battle logic เท่านั้น
}

class UIScene extends Phaser.Scene {
  // จัดการ UI overlay เท่านั้น
}

// เปลี่ยน scene อย่างถูกต้อง
this.scene.start("BattleScene", { level: 1 });

// รัน scene แบบ parallel
this.scene.launch("UIScene");
this.scene.bringToTop("UIScene");
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามใส่ทุกอย่างใน scene เดียว
class GameScene extends Phaser.Scene {
  // โหลด assets, แสดง menu, battle, UI ทั้งหมดใน scene เดียว
}

// ❌ ห้ามเปลี่ยน scene โดยไม่ cleanup
this.scene.start("NextScene");  // ไม่มี cleanup
```

### 2. Asset Management

#### ✅ ต้องทำ

```typescript
class PreloadScene extends Phaser.Scene {
  preload() {
    // แสดง loading bar
    this.createLoadingBar();
    
    // โหลด assets แบบมีระเบียบ
    this.loadSprites();
    this.loadAudio();
    this.loadUI();
    
    // Listen to progress
    this.load.on("progress", (value: number) => {
      this.updateLoadingBar(value);
    });
  }
  
  private loadSprites() {
    // Group related assets
    this.load.image("player-idle", "/sprites/player/idle.png");
    this.load.image("player-attack", "/sprites/player/attack.png");
    
    // Use atlas for multiple sprites
    this.load.atlas(
      "characters",
      "/sprites/characters.png",
      "/sprites/characters.json"
    );
  }
  
  private loadAudio() {
    // Preload audio
    this.load.audio("bgm-battle", "/sounds/bgm/battle.mp3");
    this.load.audio("sfx-hit", "/sounds/sfx/hit.mp3");
  }
}
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามโหลด assets ใน create()
create() {
  this.load.image("sprite", "/sprite.png");  // ผิด!
}

// ❌ ห้ามโหลดทีละไฟล์โดยไม่จัดกลุ่ม
this.load.image("sprite1", "/sprite1.png");
this.load.image("sprite2", "/sprite2.png");
// ... 100 files
```

### 3. Entity Management

#### ✅ ต้องทำ

```typescript
// สร้าง base class
abstract class Entity extends Phaser.GameObjects.Container {
  protected hp: number;
  protected maxHp: number;
  protected sprite: Phaser.GameObjects.Sprite;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);
  }
  
  abstract takeDamage(amount: number): void;
  abstract heal(amount: number): void;
  
  protected updateHealthBar() {
    // Update health bar
  }
}

// Extend สำหรับ specific entities
class Player extends Entity {
  private skills: Skill[];
  
  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
    this.updateHealthBar();
    this.playHitAnimation();
  }
  
  useSkill(skillIndex: number) {
    const skill = this.skills[skillIndex];
    if (skill && skill.canUse()) {
      skill.use();
    }
  }
}

class Enemy extends Entity {
  private aiController: AIController;
  
  takeDamage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
    this.updateHealthBar();
    this.playHitAnimation();
  }
  
  selectAction(): Action {
    return this.aiController.selectAction(this);
  }
}
```

### 4. UI Management

#### ✅ ต้องทำ

```typescript
class UIManager {
  private scene: Phaser.Scene;
  private containers: Map<string, Phaser.GameObjects.Container>;
  private safeZones: SafeZones;
  
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.calculateSafeZones();
    this.containers = new Map();
  }
  
  private calculateSafeZones() {
    const { width, height } = this.scene.cameras.main;
    this.safeZones = {
      top: 60,
      bottom: 60,
      left: 40,
      right: 40,
      width: width - 80,
      height: height - 120,
    };
  }
  
  createHealthBar(x: number, y: number): HealthBar {
    // ใช้ safe zones
    const safeX = Math.max(x, this.safeZones.left);
    const safeY = Math.max(y, this.safeZones.top);
    
    const healthBar = new HealthBar(this.scene, safeX, safeY);
    this.containers.set("healthBar", healthBar);
    
    return healthBar;
  }
  
  resize() {
    // Recalculate safe zones
    this.calculateSafeZones();
    
    // Update all UI positions
    this.containers.forEach((container) => {
      container.updatePosition(this.safeZones);
    });
  }
  
  cleanup() {
    this.containers.forEach((container) => container.destroy());
    this.containers.clear();
  }
}
```

---

## 🔧 Performance Rules

### 1. Object Pooling

#### ✅ ต้องทำ

```typescript
class ProjectilePool {
  private pool: Phaser.GameObjects.Sprite[];
  private scene: Phaser.Scene;
  
  constructor(scene: Phaser.Scene, size: number) {
    this.scene = scene;
    this.pool = [];
    
    // Pre-create objects
    for (let i = 0; i < size; i++) {
      const projectile = scene.add.sprite(0, 0, "projectile");
      projectile.setActive(false);
      projectile.setVisible(false);
      this.pool.push(projectile);
    }
  }
  
  spawn(x: number, y: number): Phaser.GameObjects.Sprite | null {
    const projectile = this.pool.find(p => !p.active);
    
    if (projectile) {
      projectile.setPosition(x, y);
      projectile.setActive(true);
      projectile.setVisible(true);
      return projectile;
    }
    
    return null;
  }
  
  despawn(projectile: Phaser.GameObjects.Sprite) {
    projectile.setActive(false);
    projectile.setVisible(false);
  }
}
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามสร้าง object ใหม่ทุกครั้ง
function shootProjectile() {
  const projectile = this.add.sprite(x, y, "projectile");
  // สร้างใหม่ทุกครั้ง = memory leak
}
```

### 2. Event Management

#### ✅ ต้องทำ

```typescript
class BattleScene extends Phaser.Scene {
  private eventHandlers: Map<string, Function>;
  
  create() {
    this.eventHandlers = new Map();
    this.setupEvents();
  }
  
  private setupEvents() {
    const onPlayerAttack = () => this.handlePlayerAttack();
    this.events.on("player-attack", onPlayerAttack);
    this.eventHandlers.set("player-attack", onPlayerAttack);
  }
  
  cleanup() {
    // Remove all event listeners
    this.eventHandlers.forEach((handler, event) => {
      this.events.off(event, handler);
    });
    this.eventHandlers.clear();
  }
  
  shutdown() {
    this.cleanup();
  }
}
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามลืม remove event listeners
create() {
  this.events.on("player-attack", () => {
    // ...
  });
  // ไม่มี cleanup = memory leak
}
```

### 3. Texture Management

#### ✅ ต้องทำ

```typescript
// ใช้ texture atlas
this.load.atlas(
  "game-sprites",
  "/sprites/atlas.png",
  "/sprites/atlas.json"
);

// ใช้ sprite sheet
this.load.spritesheet(
  "player-animations",
  "/sprites/player.png",
  { frameWidth: 64, frameHeight: 64 }
);

// Destroy textures ที่ไม่ใช้แล้ว
this.textures.remove("unused-texture");
```

#### ❌ ห้ามทำ

```typescript
// ❌ ห้ามโหลดรูปแยกทีละไฟล์
this.load.image("sprite1", "/sprite1.png");
this.load.image("sprite2", "/sprite2.png");
// ... 100 files
```

---

## 🧪 Testing Rules

### 1. ต้องทดสอบบนอุปกรณ์จริง

#### ✅ Checklist

- [ ] ทดสอบบน iPhone (Safari)
- [ ] ทดสอบบน Android (Chrome)
- [ ] ทดสอบบน iPad
- [ ] ทดสอบบน Desktop
- [ ] ทดสอบการหมุนหน้าจอ
- [ ] ทดสอบ touch input
- [ ] ทดสอบ safe areas
- [ ] ทดสอบ performance

### 2. ต้องทดสอบ Edge Cases

```typescript
// ทดสอบ boundary conditions
function takeDamage(amount: number) {
  // ✅ ป้องกัน negative HP
  this.hp = Math.max(0, this.hp - amount);
  
  // ✅ ป้องกัน overflow
  this.hp = Math.min(this.maxHp, this.hp);
  
  // ✅ ตรวจสอบ death
  if (this.hp <= 0) {
    this.handleDeath();
  }
}

// ทดสอบ null/undefined
function getSkill(index: number): Skill | null {
  // ✅ ตรวจสอบ bounds
  if (index < 0 || index >= this.skills.length) {
    return null;
  }
  
  return this.skills[index];
}
```

---

## 📚 Documentation Rules

### 1. ต้อง Comment Code ที่ซับซ้อน

```typescript
/**
 * คำนวณความเสียหายจากการโจมตี
 * @param attacker ผู้โจมตี
 * @param defender ผู้ถูกโจมตี
 * @param skill สกิลที่ใช้
 * @returns ความเสียหายที่เกิดขึ้น
 */
function calculateDamage(
  attacker: Entity,
  defender: Entity,
  skill: Skill
): number {
  // Base damage from skill
  let damage = skill.baseDamage;
  
  // Apply attacker's attack stat
  damage *= (1 + attacker.attack / 100);
  
  // Apply defender's defense stat
  damage *= (1 - defender.defense / 100);
  
  // Apply random variance (90% - 110%)
  damage *= 0.9 + Math.random() * 0.2;
  
  // Apply elemental effectiveness
  const effectiveness = this.getElementalEffectiveness(
    skill.element,
    defender.element
  );
  damage *= effectiveness;
  
  return Math.floor(damage);
}
```

### 2. ต้องมี README ในแต่ละ Module

```typescript
/**
 * Battle System Module
 * 
 * จัดการระบบการต่อสู้แบบ turn-based
 * 
 * Features:
 * - Turn management
 * - Damage calculation
 * - Status effects
 * - Victory/defeat conditions
 * 
 * Usage:
 * ```typescript
 * const battleSystem = new BattleSystem(scene);
 * battleSystem.startBattle(player, enemy);
 * ```
 */
export class BattleSystem {
  // ...
}
```

---

## ⚠️ Common Mistakes to Avoid

### 1. UI ที่พบบ่อย

```typescript
// ❌ ผิด
const button = this.add.sprite(100, 100, "button");

// ✅ ถูกต้อง
const centerX = this.cameras.main.centerX;
const centerY = this.cameras.main.centerY;
const button = this.add.sprite(centerX, centerY, "button");
```

### 2. Scale ที่พบบ่อย

```typescript
// ❌ ผิด
scale: {
  mode: Phaser.Scale.RESIZE,  // ผิด!
}

// ✅ ถูกต้อง
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1280,
  height: 720,
}
```

### 3. Memory Leaks ที่พบบ่อย

```typescript
// ❌ ผิด - ไม่มี cleanup
create() {
  this.events.on("event", () => {});
  this.time.addEvent({});
  this.tweens.add({});
}

// ✅ ถูกต้อง - มี cleanup
create() {
  this.setupEvents();
}

shutdown() {
  this.cleanup();
}

cleanup() {
  this.events.removeAllListeners();
  this.time.removeAllEvents();
  this.tweens.killAll();
}
```

---

## ✅ Pre-commit Checklist

ก่อน commit code ต้องตรวจสอบ:

- [ ] Code ใช้ TypeScript (ไม่มี any)
- [ ] Code ปฏิบัติตาม UI_RULES.md
- [ ] Code รองรับมือถือ
- [ ] Code ใช้ responsive positioning
- [ ] Code ใช้ safe zones
- [ ] Code มี proper cleanup
- [ ] Code มี comments ที่จำเป็น
- [ ] Code ผ่าน linter
- [ ] ทดสอบบนมือถือแล้ว
- [ ] ไม่มี console.log ที่ไม่จำเป็น

---

## 🎓 สรุป

AI ต้อง:

1. ✅ ใช้ Phaser 3 + Next.js + TypeScript
2. ✅ รองรับมือถือเสมอ
3. ✅ ใช้ responsive design
4. ✅ ปฏิบัติตาม UI_RULES.md
5. ✅ เขียน code ที่ maintain ได้
6. ✅ Optimize performance
7. ✅ Document code ที่ซับซ้อน
8. ✅ ทดสอบบนอุปกรณ์จริง

**หมายเหตุ**: กฎเหล่านี้เป็นข้อบังคับ ไม่ใช่คำแนะนำ การละเมิดจะทำให้เกมไม่ทำงานบนมือถือ
