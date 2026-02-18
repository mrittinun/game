import Phaser from "phaser";
import { COLORS, FONT_SIZE, MIN_TOUCH_SIZE } from "@/game/config/constants";

export class Button extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Rectangle;
  private text: Phaser.GameObjects.Text;
  private callback: () => void;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    label: string,
    width: number,
    height: number,
    callback: () => void,
    fontSize?: number
  ) {
    super(scene, x, y);
    
    this.callback = callback;
    
    // Background
    this.bg = scene.add.rectangle(0, 0, width, height, COLORS.PRIMARY);
    this.bg.setStrokeStyle(2, COLORS.TEXT);
    
    // Text
    const textSize = fontSize || FONT_SIZE.BODY;
    this.text = scene.add.text(0, 0, label, {
      fontSize: `${textSize}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
      align: "center",
    });
    this.text.setOrigin(0.5);
    
    this.add([this.bg, this.text]);
    this.setSize(width, height);
    
    // Make interactive
    const hitArea = new Phaser.Geom.Rectangle(
      -width / 2,
      -height / 2,
      Math.max(width, MIN_TOUCH_SIZE),
      Math.max(height, MIN_TOUCH_SIZE)
    );
    
    this.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Events
    this.on("pointerover", this.onHover, this);
    this.on("pointerout", this.onOut, this);
    this.on("pointerdown", this.onDown, this);
    this.on("pointerup", this.onUp, this);
    
    scene.add.existing(this);
  }
  
  private onHover() {
    this.bg.setFillStyle(COLORS.SECONDARY);
  }
  
  private onOut() {
    this.bg.setFillStyle(COLORS.PRIMARY);
    this.setScale(1);
  }
  
  private onDown() {
    this.setScale(0.95);
  }
  
  private onUp() {
    this.setScale(1);
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
