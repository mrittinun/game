import Phaser from "phaser";
import { AxieColors, AxieUI, AxieAnimations } from "@/game/config/axieTheme";

export interface AxieButtonConfig {
  width?: number;
  height?: number;
  color?: "blue" | "purple" | "pink" | "green" | "yellow" | "orange";
  icon?: string;
  fontSize?: number;
}

export class AxieButton extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private icon?: Phaser.GameObjects.Text;
  private callback: () => void;
  private config: Required<AxieButtonConfig>;
  private baseColor: number;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    callback: () => void,
    config?: AxieButtonConfig
  ) {
    super(scene, x, y);
    
    this.callback = callback;
    
    // Default config
    this.config = {
      width: config?.width || 250,
      height: config?.height || 70,
      color: config?.color || "blue",
      icon: config?.icon || "",
      fontSize: config?.fontSize || 24,
    };
    
    this.baseColor = this.getColorFromName(this.config.color);
    
    // Create background
    this.bg = scene.add.graphics();
    this.drawButton(false, false);
    
    // Create icon if provided
    if (this.config.icon) {
      this.icon = scene.add.text(-this.config.width / 2 + 30, 0, this.config.icon, {
        fontSize: `${this.config.fontSize + 4}px`,
        fontFamily: "Arial",
      });
      this.icon.setOrigin(0.5);
      this.add(this.icon);
    }
    
    // Create text
    const textX = this.config.icon ? 15 : 0;
    this.text = scene.add.text(textX, 0, label, {
      fontSize: `${this.config.fontSize}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    this.text.setOrigin(0.5);
    this.text.setShadow(2, 2, "#000000", 5);
    
    this.add([this.bg, this.text]);
    this.setSize(this.config.width, this.config.height);
    
    // Make interactive
    const hitArea = new Phaser.Geom.Rectangle(
      -this.config.width / 2,
      -this.config.height / 2,
      this.config.width,
      this.config.height
    );
    
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Events
    this.on("pointerover", this.onHover, this);
    this.on("pointerout", this.onOut, this);
    this.on("pointerdown", this.onDown, this);
    this.on("pointerup", this.onUp, this);
    
    scene.add.existing(this);
  }
  
  private getColorFromName(colorName: string): number {
    switch (colorName) {
      case "blue": return AxieColors.primary.blue;
      case "purple": return AxieColors.primary.purple;
      case "pink": return AxieColors.primary.pink;
      case "green": return AxieColors.primary.green;
      case "yellow": return AxieColors.primary.yellow;
      case "orange": return AxieColors.primary.orange;
      default: return AxieColors.primary.blue;
    }
  }
  
  private drawButton(isHovered: boolean, isPressed: boolean) {
    this.bg.clear();
    
    const { width, height } = this.config;
    const x = -width / 2;
    const y = -height / 2;
    const radius = AxieUI.cornerRadius.large;
    
    // Draw shadow
    if (!isPressed) {
      this.bg.fillStyle(AxieUI.shadow.color, AxieUI.shadow.alpha);
      this.bg.fillRoundedRect(
        x + AxieUI.shadow.offset,
        y + AxieUI.shadow.offset,
        width,
        height,
        radius
      );
    }
    
    // Draw button background with gradient effect
    const color = isPressed ? this.darkenColor(this.baseColor) : 
                  isHovered ? this.lightenColor(this.baseColor) : 
                  this.baseColor;
    
    this.bg.fillStyle(color, 1);
    this.bg.fillRoundedRect(x, y, width, height, radius);
    
    // Draw highlight
    this.bg.fillStyle(0xffffff, 0.3);
    this.bg.fillRoundedRect(x, y, width, height / 2, { tl: radius, tr: radius, bl: 0, br: 0 });
    
    // Draw border
    this.bg.lineStyle(AxieUI.border.width, AxieUI.border.color, 1);
    this.bg.strokeRoundedRect(x, y, width, height, radius);
    
    // Draw inner glow
    if (isHovered) {
      this.bg.lineStyle(3, 0xffffff, 0.5);
      this.bg.strokeRoundedRect(x + 5, y + 5, width - 10, height - 10, radius - 5);
    }
  }
  
  private lightenColor(color: number): number {
    const r = Math.min(255, ((color >> 16) & 0xff) + 30);
    const g = Math.min(255, ((color >> 8) & 0xff) + 30);
    const b = Math.min(255, (color & 0xff) + 30);
    return (r << 16) | (g << 8) | b;
  }
  
  private darkenColor(color: number): number {
    const r = Math.max(0, ((color >> 16) & 0xff) - 30);
    const g = Math.max(0, ((color >> 8) & 0xff) - 30);
    const b = Math.max(0, (color & 0xff) - 30);
    return (r << 16) | (g << 8) | b;
  }
  
  private onHover() {
    this.drawButton(true, false);
    
    // Bounce animation
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 200,
      ease: "Back.easeOut",
    });
  }
  
  private onOut() {
    this.drawButton(false, false);
    
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
      ease: "Back.easeOut",
    });
  }
  
  private onDown() {
    this.drawButton(false, true);
    
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.95,
      scaleY: 0.95,
      y: this.y + 3,
      duration: 100,
      ease: "Power2",
    });
  }
  
  private onUp() {
    this.drawButton(true, false);
    
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.05,
      scaleY: 1.05,
      y: this.y - 3,
      duration: 100,
      ease: "Power2",
    });
    
    // Bounce effect
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: AxieAnimations.bounce.duration,
      ease: AxieAnimations.bounce.ease,
      delay: 100,
    });
    
    this.callback();
  }
  
  public setText(label: string) {
    this.text.setText(label);
  }
}
