import Phaser from "phaser";
import { SceneKey } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import { AxieButton } from "@/game/ui/AxieButton";
import { AxieColors, AxieGradients, AxieUI, AxieFonts } from "@/game/config/axieTheme";

export class MainMenuScene extends Phaser.Scene {
  private buttons: AxieButton[] = [];
  private clouds: Phaser.GameObjects.Graphics[] = [];
  private stars: Phaser.GameObjects.Graphics[] = [];
  
  constructor() {
    super({ key: SceneKey.MAIN_MENU });
  }
  
  create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    // Create Axie-style background
    this.createAxieBackground(width, height);
    
    // Create decorative elements
    this.createClouds(width, height);
    this.createStars(width, height);
    
    // Create title with Axie style
    this.createAxieTitle(centerX, centerY - 150 * baseScale, baseScale);
    
    // Create Axie-style buttons
    this.createAxieButtons(centerX, centerY, baseScale);
    
    // Add entrance animations
    this.animateEntrance();
    
    // Add version text
    this.createVersionText(width, height, baseScale);
  }
  
  private createAxieBackground(width: number, height: number) {
    // Sky gradient (Axie-style)
    const gradient = this.add.graphics();
    gradient.fillGradientStyle(
      AxieGradients.sky[0],
      AxieGradients.sky[0],
      AxieGradients.sky[1],
      AxieGradients.sky[1],
      1
    );
    gradient.fillRect(0, 0, width, height);
    
    // Add grass at bottom
    const grassHeight = 150;
    const grass = this.add.graphics();
    grass.fillStyle(AxieColors.background.grass, 1);
    grass.fillRect(0, height - grassHeight, width, grassHeight);
    
    // Add grass details
    for (let i = 0; i < 20; i++) {
      const x = (width / 20) * i;
      const grassBlade = this.add.graphics();
      grassBlade.fillStyle(0x7cb342, 1);
      grassBlade.fillTriangle(
        x, height - grassHeight,
        x + 10, height - grassHeight - 30,
        x + 20, height - grassHeight
      );
    }
    
    // Add sun
    const sun = this.add.circle(width - 100, 100, 60, AxieColors.primary.yellow, 1);
    sun.setStrokeStyle(5, AxieColors.primary.orange, 1);
    
    // Animate sun
    this.tweens.add({
      targets: sun,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
  
  private createClouds(width: number, height: number) {
    // Create cute clouds
    for (let i = 0; i < 5; i++) {
      const cloud = this.add.graphics();
      cloud.fillStyle(0xffffff, 0.8);
      
      // Draw cloud shape
      cloud.fillCircle(0, 0, 30);
      cloud.fillCircle(25, -5, 25);
      cloud.fillCircle(50, 0, 30);
      cloud.fillCircle(25, 10, 20);
      
      cloud.x = (width / 5) * i + 50;
      cloud.y = 80 + Math.random() * 100;
      
      this.clouds.push(cloud);
      
      // Animate cloud floating
      this.tweens.add({
        targets: cloud,
        x: cloud.x + 20,
        duration: 3000 + Math.random() * 2000,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }
  }
  
  private createStars(width: number, height: number) {
    // Create twinkling stars
    for (let i = 0; i < 15; i++) {
      const star = this.add.graphics();
      star.fillStyle(AxieColors.primary.yellow, 1);
      
      // Draw star shape
      const points = [];
      for (let j = 0; j < 5; j++) {
        const angle = (j * 4 * Math.PI) / 5 - Math.PI / 2;
        const radius = j % 2 === 0 ? 8 : 4;
        points.push(Math.cos(angle) * radius);
        points.push(Math.sin(angle) * radius);
      }
      star.fillPoints(points as any, true);
      
      star.x = Math.random() * width;
      star.y = Math.random() * height * 0.5;
      star.setAlpha(0.6);
      
      this.stars.push(star);
      
      // Twinkle animation
      this.tweens.add({
        targets: star,
        alpha: 1,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 1000 + Math.random() * 1000,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }
  }
  
  private createAxieTitle(x: number, y: number, scale: number) {
    // Main title with cute style
    const title = this.add.text(x, y, "Turn-Based\nCard Battle", {
      fontSize: `${AxieFonts.title.size * scale}px`,
      color: "#ffffff",
      fontFamily: AxieFonts.title.family,
      fontStyle: AxieFonts.title.style,
      align: "center",
      stroke: "#2d1b69",
      strokeThickness: 8,
    });
    title.setOrigin(0.5);
    title.setLineSpacing(10);
    
    // Add rainbow glow
    title.setShadow(0, 0, "#ff6ec7", 20, true, true);
    
    // Subtitle with cute emoji
    const subtitle = this.add.text(
      x,
      y + 100 * scale,
      "⚔️ Collect • Battle • Win 🏆",
      {
        fontSize: `${AxieFonts.body.size * scale}px`,
        color: "#2d1b69",
        fontFamily: AxieFonts.body.family,
        fontStyle: "bold",
        align: "center",
      }
    );
    subtitle.setOrigin(0.5);
    
    // Bounce animation for title
    this.tweens.add({
      targets: title,
      y: y - 10,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
  
  private createAxieButtons(x: number, y: number, scale: number) {
    const buttonSpacing = 90 * scale;
    const startY = y + 50 * scale;
    
    // Play Button (Big and colorful)
    const playButton = new AxieButton(
      this,
      x,
      startY,
      "⚔️ Start Battle",
      () => this.onStartGame(),
      {
        width: 300 * scale,
        height: 80 * scale,
        color: "pink",
        fontSize: 28 * scale,
      }
    );
    this.buttons.push(playButton);
    
    // Character Editor Button
    const editorButton = new AxieButton(
      this,
      x,
      startY + buttonSpacing,
      "👥 My Characters",
      () => this.onCharacterEditor(),
      {
        width: 300 * scale,
        height: 70 * scale,
        color: "purple",
        fontSize: 24 * scale,
      }
    );
    this.buttons.push(editorButton);
    
    // Collection Button
    const collectionButton = new AxieButton(
      this,
      x,
      startY + buttonSpacing * 2,
      "📚 Collection",
      () => this.onCollection(),
      {
        width: 300 * scale,
        height: 70 * scale,
        color: "blue",
        fontSize: 24 * scale,
      }
    );
    this.buttons.push(collectionButton);
    
    // Settings Button
    const settingsButton = new AxieButton(
      this,
      x,
      startY + buttonSpacing * 3,
      "⚙️ Settings",
      () => this.onSettings(),
      {
        width: 300 * scale,
        height: 70 * scale,
        color: "green",
        fontSize: 24 * scale,
      }
    );
    this.buttons.push(settingsButton);
  }
  
  private createVersionText(width: number, height: number, scale: number) {
    const version = this.add.text(
      width - GAME_CONFIG.SAFE_ZONE.RIGHT - 10,
      height - GAME_CONFIG.SAFE_ZONE.BOTTOM - 10,
      "v2.1.0 Axie Style",
      {
        fontSize: `${14 * scale}px`,
        color: "#2d1b69",
        fontFamily: "Arial",
        fontStyle: "bold",
      }
    );
    version.setOrigin(1, 1);
  }
  
  private animateEntrance() {
    // Fade in buttons with bounce
    this.buttons.forEach((button, index) => {
      button.setAlpha(0);
      button.setScale(0);
      
      this.tweens.add({
        targets: button,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 500,
        delay: 200 + index * 150,
        ease: "Bounce.easeOut",
      });
    });
  }
  
  private onStartGame() {
    console.log("Start Game clicked");
    
    // Sparkle effect
    this.cameras.main.flash(200, 255, 215, 0);
    
    // TODO: Navigate to battle scene
  }
  
  private onCharacterEditor() {
    console.log("Character Editor clicked");
    
    // Sparkle effect
    this.cameras.main.flash(200, 151, 71, 255);
    
    // Transition
    this.fadeOutAndTransition(SceneKey.CHARACTER_EDITOR);
  }
  
  private onCollection() {
    console.log("Collection clicked");
    
    // Sparkle effect
    this.cameras.main.flash(200, 0, 184, 206);
  }
  
  private onSettings() {
    console.log("Settings clicked");
    
    // Sparkle effect
    this.cameras.main.flash(200, 0, 212, 170);
  }
  
  private fadeOutAndTransition(targetScene: string) {
    // Fade out buttons
    this.buttons.forEach((button, index) => {
      this.tweens.add({
        targets: button,
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 300,
        delay: index * 50,
        ease: "Back.easeIn",
      });
    });
    
    // Fade out camera
    this.cameras.main.fadeOut(400);
    this.cameras.main.once("camerafadeoutcomplete", () => {
      this.scene.start(targetScene);
    });
  }
  
  shutdown() {
    // Cleanup
    this.buttons.forEach(button => button.destroy());
    this.buttons = [];
    this.clouds.forEach(cloud => cloud.destroy());
    this.clouds = [];
    this.stars.forEach(star => star.destroy());
    this.stars = [];
  }
}
