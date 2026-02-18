import Phaser from "phaser";
import { AxieColors, AxieUI, AxieAnimations } from "@/game/config/axieTheme";

export interface AxieCardConfig {
  width?: number;
  height?: number;
  title?: string;
  subtitle?: string;
  element?: string;
  rarity?: string;
  image?: string;
  stats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
  };
}

export class AxieCard extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private config: AxieCardConfig;
  private isHovered: boolean = false;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config: AxieCardConfig
  ) {
    super(scene, x, y);
    
    this.config = {
      width: config.width || 200,
      height: config.height || 280,
      ...config,
    };
    
    // Create card
    this.bg = scene.add.graphics();
    this.drawCard();
    this.add(this.bg);
    
    // Add content
    this.createContent();
    
    // Make interactive
    this.setSize(this.config.width!, this.config.height!);
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        -this.config.width! / 2,
        -this.config.height! / 2,
        this.config.width!,
        this.config.height!
      ),
      Phaser.Geom.Rectangle.Contains
    );
    
    // Add hover effects
    this.on("pointerover", this.onHover, this);
    this.on("pointerout", this.onOut, this);
    
    // Add floating animation
    this.addFloatingAnimation();
    
    scene.add.existing(this);
  }
  
  private drawCard() {
    this.bg.clear();
    
    const { width, height } = this.config;
    const x = -width! / 2;
    const y = -height! / 2;
    const radius = AxieUI.cornerRadius.medium;
    
    // Draw shadow
    this.bg.fillStyle(AxieUI.shadow.color, AxieUI.shadow.alpha);
    this.bg.fillRoundedRect(
      x + AxieUI.shadow.offset,
      y + AxieUI.shadow.offset,
      width!,
      height!,
      radius
    );
    
    // Draw card background (white)
    this.bg.fillStyle(AxieColors.ui.panel, 1);
    this.bg.fillRoundedRect(x, y, width!, height!, radius);
    
    // Draw gradient overlay based on element
    const elementColor = this.getElementColor();
    this.bg.fillStyle(elementColor, 0.1);
    this.bg.fillRoundedRect(x, y, width!, height! * 0.3, { tl: radius, tr: radius, bl: 0, br: 0 });
    
    // Draw border
    this.bg.lineStyle(AxieUI.border.width, AxieUI.border.color, 1);
    this.bg.strokeRoundedRect(x, y, width!, height!, radius);
    
    // Draw inner glow
    this.bg.lineStyle(2, elementColor, 0.5);
    this.bg.strokeRoundedRect(x + 5, y + 5, width! - 10, height! - 10, radius - 5);
  }
  
  private createContent() {
    const { width, height, title, subtitle, stats } = this.config;
    
    // Title
    if (title) {
      const titleText = this.scene.add.text(0, -height! / 2 + 30, title, {
        fontSize: "20px",
        color: "#2d1b69",
        fontFamily: "Arial",
        fontStyle: "bold",
        align: "center",
      });
      titleText.setOrigin(0.5);
      this.add(titleText);
    }
    
    // Subtitle
    if (subtitle) {
      const subtitleText = this.scene.add.text(0, -height! / 2 + 55, subtitle, {
        fontSize: "14px",
        color: "#666666",
        fontFamily: "Arial",
        align: "center",
      });
      subtitleText.setOrigin(0.5);
      this.add(subtitleText);
    }
    
    // Character image placeholder
    const imageY = -height! / 2 + 140;
    const imageBg = this.scene.add.circle(0, imageY, 60, this.getElementColor(), 0.3);
    this.add(imageBg);
    
    // Stats
    if (stats) {
      this.createStats(stats);
    }
    
    // Element badge
    this.createElementBadge();
  }
  
  private createStats(stats: NonNullable<AxieCardConfig["stats"]>) {
    const { height } = this.config;
    const startY = height! / 2 - 80;
    const statSpacing = 20;
    
    const statIcons = [
      { key: "hp", icon: "❤️", value: stats.hp, color: "#ff6b6b" },
      { key: "attack", icon: "⚔️", value: stats.attack, color: "#ff8c42" },
      { key: "defense", icon: "🛡️", value: stats.defense, color: "#00b8ce" },
      { key: "speed", icon: "⚡", value: stats.speed, color: "#ffd700" },
    ];
    
    statIcons.forEach((stat, index) => {
      if (stat.value !== undefined) {
        const y = startY + index * statSpacing;
        
        const statText = this.scene.add.text(-40, y, `${stat.icon} ${stat.value}`, {
          fontSize: "16px",
          color: stat.color,
          fontFamily: "Arial",
          fontStyle: "bold",
        });
        statText.setOrigin(0, 0.5);
        this.add(statText);
      }
    });
  }
  
  private createElementBadge() {
    const { element, width, height } = this.config;
    if (!element) return;
    
    const badgeX = width! / 2 - 30;
    const badgeY = -height! / 2 + 20;
    
    const badge = this.scene.add.circle(badgeX, badgeY, 20, this.getElementColor(), 1);
    this.add(badge);
    
    const badgeText = this.scene.add.text(badgeX, badgeY, element.charAt(0).toUpperCase(), {
      fontSize: "16px",
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    badgeText.setOrigin(0.5);
    this.add(badgeText);
  }
  
  private getElementColor(): number {
    const { element } = this.config;
    switch (element?.toLowerCase()) {
      case "fire": return AxieColors.element.fire;
      case "water": return AxieColors.element.water;
      case "earth": return AxieColors.element.earth;
      case "wind": return AxieColors.element.wind;
      case "light": return AxieColors.element.light;
      case "dark": return AxieColors.element.dark;
      default: return AxieColors.primary.blue;
    }
  }
  
  private addFloatingAnimation() {
    this.scene.tweens.add({
      targets: this,
      y: this.y - 10,
      duration: AxieAnimations.float.duration,
      ease: AxieAnimations.float.ease,
      yoyo: AxieAnimations.float.yoyo,
      repeat: AxieAnimations.float.repeat,
    });
  }
  
  private onHover() {
    this.isHovered = true;
    
    // Scale up
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 200,
      ease: "Back.easeOut",
    });
    
    // Glow effect
    this.bg.clear();
    this.drawCard();
    const { width, height } = this.config;
    const x = -width! / 2;
    const y = -height! / 2;
    const radius = AxieUI.cornerRadius.medium;
    
    this.bg.lineStyle(6, this.getElementColor(), 0.8);
    this.bg.strokeRoundedRect(x, y, width!, height!, radius);
  }
  
  private onOut() {
    this.isHovered = false;
    
    // Scale back
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      ease: "Back.easeOut",
    });
    
    // Remove glow
    this.bg.clear();
    this.drawCard();
  }
}
