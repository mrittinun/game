import Phaser from "phaser";
import { SceneKey, COLORS, FONT_SIZE, MIN_TOUCH_SIZE } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";

export class UIScene extends Phaser.Scene {
  private hpBar?: Phaser.GameObjects.Graphics;
  private mpBar?: Phaser.GameObjects.Graphics;
  private skillButtons: Phaser.GameObjects.Container[] = [];
  
  constructor() {
    super({ key: SceneKey.UI });
  }
  
  create() {
    this.setupTopBar();
    this.setupBottomBar();
  }
  
  private setupTopBar() {
    const { width } = this.cameras.main;
    const safe = GAME_CONFIG.SAFE_ZONE;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, this.cameras.main.height / GAME_CONFIG.HEIGHT);
    
    const topY = safe.TOP + 40;
    
    // Player HP/MP (left side)
    this.createHPBar(safe.LEFT + 20, topY, baseScale);
    this.createMPBar(safe.LEFT + 20, topY + 40 * baseScale, baseScale);
    
    // Turn indicator (center)
    const turnText = this.add.text(width / 2, topY, "Player Turn", {
      fontSize: `${FONT_SIZE.HEADING * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    turnText.setOrigin(0.5);
    turnText.setScrollFactor(0);
    
    // Enemy HP (right side)
    this.createEnemyHPBar(width - safe.RIGHT - 220 * baseScale, topY, baseScale);
  }
  
  private setupBottomBar() {
    const { width, height } = this.cameras.main;
    const safe = GAME_CONFIG.SAFE_ZONE;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    const bottomY = height - safe.BOTTOM - 60;
    const centerX = width / 2;
    
    // Skill buttons
    const skills = [
      { name: "Attack", color: COLORS.DANGER },
      { name: "Heal", color: COLORS.SUCCESS },
      { name: "Buff", color: COLORS.WARNING },
      { name: "Special", color: COLORS.PRIMARY },
    ];
    
    const buttonSpacing = 100 * baseScale;
    const startX = centerX - (skills.length - 1) * buttonSpacing / 2;
    
    skills.forEach((skill, index) => {
      const x = startX + index * buttonSpacing;
      const button = this.createSkillButton(x, bottomY, skill.name, skill.color, baseScale);
      this.skillButtons.push(button);
    });
  }
  
  private createHPBar(x: number, y: number, scale: number) {
    const barWidth = 200 * scale;
    const barHeight = 20 * scale;
    
    // Background
    const bg = this.add.rectangle(x, y, barWidth, barHeight, COLORS.HP_BG);
    bg.setOrigin(0, 0.5);
    bg.setScrollFactor(0);
    
    // HP bar
    this.hpBar = this.add.graphics();
    this.hpBar.setScrollFactor(0);
    this.updateHPBar(x, y, barWidth, barHeight, 1.0); // 100% HP
    
    // Label
    const label = this.add.text(x, y - 20 * scale, "HP", {
      fontSize: `${FONT_SIZE.SMALL * scale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    label.setScrollFactor(0);
  }
  
  private createMPBar(x: number, y: number, scale: number) {
    const barWidth = 200 * scale;
    const barHeight = 20 * scale;
    
    // Background
    const bg = this.add.rectangle(x, y, barWidth, barHeight, COLORS.MP_BG);
    bg.setOrigin(0, 0.5);
    bg.setScrollFactor(0);
    
    // MP bar
    this.mpBar = this.add.graphics();
    this.mpBar.setScrollFactor(0);
    this.updateMPBar(x, y, barWidth, barHeight, 1.0); // 100% MP
    
    // Label
    const label = this.add.text(x, y - 20 * scale, "MP", {
      fontSize: `${FONT_SIZE.SMALL * scale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    label.setScrollFactor(0);
  }
  
  private createEnemyHPBar(x: number, y: number, scale: number) {
    const barWidth = 200 * scale;
    const barHeight = 20 * scale;
    
    // Background
    const bg = this.add.rectangle(x, y, barWidth, barHeight, COLORS.HP_BG);
    bg.setOrigin(0, 0.5);
    bg.setScrollFactor(0);
    
    // HP bar
    const hpBar = this.add.graphics();
    hpBar.setScrollFactor(0);
    hpBar.fillStyle(COLORS.HP, 1);
    hpBar.fillRect(x, y - barHeight / 2, barWidth, barHeight);
    
    // Label
    const label = this.add.text(x, y - 20 * scale, "Enemy HP", {
      fontSize: `${FONT_SIZE.SMALL * scale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    label.setScrollFactor(0);
  }
  
  private createSkillButton(
    x: number,
    y: number,
    name: string,
    color: number,
    scale: number
  ): Phaser.GameObjects.Container {
    const buttonSize = 70 * scale;
    const container = this.add.container(x, y);
    container.setScrollFactor(0);
    
    // Button background
    const bg = this.add.circle(0, 0, buttonSize / 2, color);
    bg.setStrokeStyle(3, COLORS.TEXT);
    
    // Button text
    const text = this.add.text(0, buttonSize / 2 + 20 * scale, name, {
      fontSize: `${FONT_SIZE.SMALL * scale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    text.setOrigin(0.5);
    
    container.add([bg, text]);
    
    // Make interactive
    const hitArea = new Phaser.Geom.Circle(0, 0, Math.max(buttonSize / 2, MIN_TOUCH_SIZE / 2));
    container.setInteractive(hitArea, Phaser.Geom.Circle.Contains);
    
    // Touch feedback
    container.on("pointerdown", () => {
      container.setScale(0.95);
      bg.setFillStyle(COLORS.TEXT_SECONDARY);
    });
    
    container.on("pointerup", () => {
      container.setScale(1);
      bg.setFillStyle(color);
      this.onSkillClick(name);
    });
    
    container.on("pointerout", () => {
      container.setScale(1);
      bg.setFillStyle(color);
    });
    
    return container;
  }
  
  private updateHPBar(x: number, y: number, width: number, height: number, percent: number) {
    this.hpBar?.clear();
    this.hpBar?.fillStyle(COLORS.HP, 1);
    this.hpBar?.fillRect(x, y - height / 2, width * percent, height);
  }
  
  private updateMPBar(x: number, y: number, width: number, height: number, percent: number) {
    this.mpBar?.clear();
    this.mpBar?.fillStyle(COLORS.MP, 1);
    this.mpBar?.fillRect(x, y - height / 2, width * percent, height);
  }
  
  private onSkillClick(skillName: string) {
    console.log(`Skill clicked: ${skillName}`);
    
    // Get BattleScene and execute action
    const battleScene = this.scene.get(SceneKey.BATTLE) as any;
    if (battleScene && battleScene.playerAttack) {
      battleScene.playerAttack();
    }
  }
}
