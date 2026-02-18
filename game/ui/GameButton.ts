import Phaser from "phaser";
import { MIN_TOUCH_SIZE } from "@/game/config/constants";

export interface GameButtonConfig {
  width?: number;
  height?: number;
  normalColor?: number;
  hoverColor?: number;
  pressedColor?: number;
  textColor?: string;
  fontSize?: number;
  cornerRadius?: number;
}

export class GameButton extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private text: Phaser.GameObjects.Text;
  private callback: () => void;
  private config: Required<GameButtonConfig>;
  private isPressed: boolean = false;
  private isHovered: boolean = false;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    callback: () => void,
    config?: GameButtonConfig
  ) {
    super(scene, x, y);
    
    this.callback = callback;
    
    // Default config
    this.config = {
      width: config?.width || 300,
      height: config?.height || 60,
      normalColor: config?.normalColor || 0x4a90e2,
      hoverColor: config?.hoverColor || 0x6aa8ff,
      pressedColor: config?.pressedColor || 0x357abd,
      textColor: config?.textColor || "#ffffff",
      fontSize: config?.fontSize || 24,
      cornerRadius: config?.cornerRadius || 10,
    };
    
    // Create background
    this.bg = scene.add.graphics();
    this.drawButton(this.config.normalColor);
    
    // Create text
    this.text = scene.add.text(0, 0, label, {
      fontSize: `${this.config.fontSize}px`,
      color: this.config.textColor,
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    this.text.setOrigin(0.5);
    
    this.add([this.bg, this.text]);
    this.setSize(this.config.width, this.config.height);
    
    // Make interactive
    const hitArea = new Phaser.Geom.Rectangle(
      -this.config.width / 2,
      -this.config.height / 2,
      Math.max(this.config.width, MIN_TOUCH_SIZE),
      Math.max(this.config.height, MIN_TOUCH_SIZE)
    );
    
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Events
    this.on("pointerover", this.onHover, this);
    this.on("pointerout", this.onOut, this);
    this.on("pointerdown", this.onDown, this);
    this.on("pointerup", this.onUp, this);
    
    scene.add.existing(this);
  }
  
  private drawButton(color: number) {
    this.bg.clear();
    
    const { width, height, cornerRadius } = this.config;
    const x = -width / 2;
    const y = -height / 2;
    
    // Draw rounded rectangle
    this.bg.fillStyle(color, 1);
    this.bg.fillRoundedRect(x, y, width, height, cornerRadius);
    
    // Draw border
    this.bg.lineStyle(2, 0xffffff, 0.3);
    this.bg.strokeRoundedRect(x, y, width, height, cornerRadius);
  }
  
  private onHover() {
    if (this.isPressed) return;
    this.isHovered = true;
    
    // Smooth color transition
    this.scene.tweens.add({
      targets: this,
      duration: 150,
      onUpdate: () => {
        this.drawButton(this.config.hoverColor);
      },
    });
    
    // Scale up slightly
    this.scene.tweens.add({
      targets: this,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 150,
      ease: "Power2",
    });
  }
  
  private onOut() {
    if (this.isPressed) return;
    this.isHovered = false;
    
    // Smooth color transition back
    this.scene.tweens.add({
      targets: this,
      duration: 150,
      onUpdate: () => {
        this.drawButton(this.config.normalColor);
      },
    });
    
    // Scale back
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      scaleY: 1,
      duration: 150,
      ease: "Power2",
    });
  }
  
  private onDown() {
    this.isPressed = true;
    this.drawButton(this.config.pressedColor);
    
    // Scale down
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 100,
      ease: "Power2",
    });
  }
  
  private onUp() {
    this.isPressed = false;
    
    // Scale back
    this.scene.tweens.add({
      targets: this,
      scaleX: this.isHovered ? 1.05 : 1,
      scaleY: this.isHovered ? 1.05 : 1,
      duration: 100,
      ease: "Power2",
    });
    
    // Update color
    this.drawButton(this.isHovered ? this.config.hoverColor : this.config.normalColor);
    
    // Execute callback
    this.callback();
  }
  
  public setText(label: string) {
    this.text.setText(label);
  }
  
  public setEnabled(enabled: boolean) {
    this.setInteractive(enabled);
    this.setAlpha(enabled ? 1 : 0.5);
  }
}
