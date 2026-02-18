import Phaser from "phaser";
import { COLORS, FONT_SIZE } from "@/game/config/constants";

export class TextInput extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;
  private value: string;
  private width: number;
  private height: number;
  private isActive: boolean = false;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    initialValue: string = ""
  ) {
    super(scene, x, y);
    
    this.width = width;
    this.height = height;
    this.value = initialValue;
    
    // Background
    this.bg = scene.add.rectangle(0, 0, width, height, 0x333333);
    this.bg.setStrokeStyle(2, COLORS.TEXT_SECONDARY);
    
    // Text
    const baseScale = Math.min(
      scene.cameras.main.width / 1280,
      scene.cameras.main.height / 720
    );
    
    this.text = scene.add.text(-width / 2 + 10, 0, initialValue, {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    this.text.setOrigin(0, 0.5);
    
    this.add([this.bg, this.text]);
    this.setSize(width, height);
    
    // Make interactive
    const hitArea = new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height);
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Events
    this.on("pointerdown", this.onClick, this);
    
    scene.add.existing(this);
  }
  
  private onClick() {
    // Simple prompt-based input for now
    // In production, you'd want a proper input field
    const newValue = prompt("Enter new value:", this.value);
    
    if (newValue !== null) {
      this.setValue(newValue);
    }
  }
  
  public setValue(value: string) {
    this.value = value;
    this.text.setText(value);
  }
  
  public getValue(): string {
    return this.value;
  }
  
  public setActive(active: boolean): this {
    this.isActive = active;
    this.bg.setStrokeStyle(2, active ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY);
    return this;
  }
}
