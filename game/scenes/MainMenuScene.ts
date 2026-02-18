import Phaser from "phaser";
import { SceneKey, COLORS, FONT_SIZE } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import { GameButton, GamePanel, Layout } from "@/game/ui";

export class MainMenuScene extends Phaser.Scene {
  private mainPanel?: GamePanel;
  private buttons: GameButton[] = [];
  private particles?: Phaser.GameObjects.Particles.ParticleEmitter;
  
  constructor() {
    super({ key: SceneKey.MAIN_MENU });
  }
  
  create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    // Create layered background
    this.createBackground(width, height);
    
    // Create main panel
    this.mainPanel = new GamePanel(this, centerX, centerY, {
      width: 400 * baseScale,
      height: 500 * baseScale,
      backgroundColor: 0x1a1a2e,
      backgroundAlpha: 0.95,
      borderColor: 0x4a90e2,
      borderWidth: 3,
      cornerRadius: 20,
      padding: 30,
    });
    
    // Create UI elements
    this.createTitle(baseScale);
    this.createButtons(baseScale);
    
    // Add animations
    this.animateEntrance();
    
    // Add version text
    this.createVersionText(width, height, baseScale);
  }
  
  private createBackground(width: number, height: number) {
    // Layer 1: Base gradient background
    const gradient = this.add.graphics();
    gradient.fillGradientStyle(0x0a0a1e, 0x0a0a1e, 0x1a1a3e, 0x1a1a3e, 1);
    gradient.fillRect(0, 0, width, height);
    
    // Layer 2: Decorative circles
    const circle1 = this.add.circle(width * 0.2, height * 0.3, 150, 0x4a90e2, 0.1);
    const circle2 = this.add.circle(width * 0.8, height * 0.7, 200, 0x6aa8ff, 0.08);
    
    // Animate circles
    this.tweens.add({
      targets: circle1,
      scaleX: 1.2,
      scaleY: 1.2,
      alpha: 0.15,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    
    this.tweens.add({
      targets: circle2,
      scaleX: 0.8,
      scaleY: 0.8,
      alpha: 0.12,
      duration: 4000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    
    // Layer 3: Particle effect (optional)
    this.createParticles(width, height);
  }
  
  private createParticles(width: number, height: number) {
    // Create simple particle effect
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillCircle(2, 2, 2);
    graphics.generateTexture("particle", 4, 4);
    graphics.destroy();
    
    // Create particle emitter
    this.particles = this.add.particles(0, 0, "particle", {
      x: { min: 0, max: width },
      y: { min: -10, max: -5 },
      lifespan: 8000,
      speedY: { min: 20, max: 40 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.3, end: 0 },
      frequency: 200,
      blendMode: "ADD",
    });
  }
  
  private createTitle(scale: number) {
    if (!this.mainPanel) return;
    
    const panelTop = this.mainPanel.y - this.mainPanel.panelHeight / 2;
    
    // Main title
    const title = this.add.text(this.mainPanel.x, panelTop + 80 * scale, "Turn-Based\nCard Game", {
      fontSize: `${48 * scale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
      align: "center",
    });
    title.setOrigin(0.5);
    title.setLineSpacing(10);
    
    // Add glow effect to title
    title.setShadow(0, 0, "#4a90e2", 10, true, true);
    
    // Subtitle
    const subtitle = this.add.text(
      this.mainPanel.x,
      panelTop + 180 * scale,
      "Phaser 3 + Next.js",
      {
        fontSize: `${20 * scale}px`,
        color: "#cccccc",
        fontFamily: "Arial",
        align: "center",
      }
    );
    subtitle.setOrigin(0.5);
    subtitle.setAlpha(0.7);
    
    // Pulse animation for title
    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
  
  private createButtons(scale: number) {
    if (!this.mainPanel) return;
    
    const buttonY = this.mainPanel.y + 50 * scale;
    const buttonSpacing = 80 * scale;
    
    // Start Game Button
    const startButton = new GameButton(
      this,
      this.mainPanel.x,
      buttonY,
      "Start Game",
      () => this.onStartGame(),
      {
        width: 300 * scale,
        height: 60 * scale,
        normalColor: 0x4a90e2,
        hoverColor: 0x6aa8ff,
        pressedColor: 0x357abd,
        fontSize: 24 * scale,
        cornerRadius: 10,
      }
    );
    this.buttons.push(startButton);
    
    // Character Editor Button
    const editorButton = new GameButton(
      this,
      this.mainPanel.x,
      buttonY + buttonSpacing,
      "Character Editor",
      () => this.onCharacterEditor(),
      {
        width: 300 * scale,
        height: 60 * scale,
        normalColor: 0x50c878,
        hoverColor: 0x70e898,
        pressedColor: 0x30a858,
        fontSize: 24 * scale,
        cornerRadius: 10,
      }
    );
    this.buttons.push(editorButton);
    
    // Settings Button (placeholder)
    const settingsButton = new GameButton(
      this,
      this.mainPanel.x,
      buttonY + buttonSpacing * 2,
      "Settings",
      () => this.onSettings(),
      {
        width: 300 * scale,
        height: 60 * scale,
        normalColor: 0xe94560,
        hoverColor: 0xff6580,
        pressedColor: 0xc92540,
        fontSize: 24 * scale,
        cornerRadius: 10,
      }
    );
    this.buttons.push(settingsButton);
  }
  
  private createVersionText(width: number, height: number, scale: number) {
    const version = this.add.text(
      width - GAME_CONFIG.SAFE_ZONE.RIGHT - 10,
      height - GAME_CONFIG.SAFE_ZONE.BOTTOM - 10,
      "v2.0.0",
      {
        fontSize: `${14 * scale}px`,
        color: "#666666",
        fontFamily: "Arial",
      }
    );
    version.setOrigin(1, 1);
  }
  
  private animateEntrance() {
    // Fade in panel
    if (this.mainPanel) {
      this.mainPanel.fadeIn(300);
    }
    
    // Fade in buttons with stagger
    this.buttons.forEach((button, index) => {
      button.setAlpha(0);
      button.setScale(0.8);
      
      this.tweens.add({
        targets: button,
        alpha: 1,
        scale: 1,
        duration: 300,
        delay: 100 + index * 100,
        ease: "Back.easeOut",
      });
    });
  }
  
  private onStartGame() {
    console.log("Start Game clicked");
    
    // Add click feedback
    this.cameras.main.flash(100, 74 / 255, 144 / 255, 226 / 255);
    
    // TODO: Navigate to battle scene when implemented
    // this.scene.start(SceneKey.BATTLE);
  }
  
  private onCharacterEditor() {
    console.log("Character Editor clicked");
    
    // Add click feedback
    this.cameras.main.flash(100, 80 / 255, 200 / 255, 120 / 255);
    
    // Fade out and transition
    this.fadeOutAndTransition(SceneKey.CHARACTER_EDITOR);
  }
  
  private onSettings() {
    console.log("Settings clicked");
    
    // Add click feedback
    this.cameras.main.flash(100, 233 / 255, 69 / 255, 96 / 255);
    
    // TODO: Open settings menu
  }
  
  private fadeOutAndTransition(targetScene: string) {
    // Fade out panel
    if (this.mainPanel) {
      this.mainPanel.fadeOut(200);
    }
    
    // Fade out buttons
    this.buttons.forEach((button, index) => {
      this.tweens.add({
        targets: button,
        alpha: 0,
        scale: 0.8,
        duration: 200,
        delay: index * 50,
        ease: "Power2",
      });
    });
    
    // Fade out camera and transition
    this.cameras.main.fadeOut(300);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(targetScene);
    });
  }
  
  shutdown() {
    // Cleanup
    this.buttons.forEach(button => button.destroy());
    this.buttons = [];
    this.mainPanel?.destroy();
    this.particles?.destroy();
  }
}
