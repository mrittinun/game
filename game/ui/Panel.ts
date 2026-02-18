import Phaser from "phaser";
import { COLORS, FONT_SIZE } from "@/game/config/constants";

export class Panel extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Rectangle;
  private border: Phaser.GameObjects.Rectangle;
  private titleText?: Phaser.GameObjects.Text;
  public width: number;
  public height: number;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    title?: string
  ) {
    super(scene, x, y);
    
    this.width = width;
    this.height = height;
    
    // Background
    this.bg = scene.add.rectangle(0, 0, width, height, COLORS.PANEL, 0.9);
    
    // Border
    this.border = scene.add.rectangle(0, 0, width, height);
    this.border.setStrokeStyle(3, COLORS.PRIMARY);
    this.border.setFillStyle(0x000000, 0);
    
    this.add([this.bg, this.border]);
    
    // Title
    if (title) {
      const baseScale = Math.min(
        scene.cameras.main.width / 1280,
        scene.cameras.main.height / 720
      );
      
      this.titleText = scene.add.text(0, -height / 2 + 30 * baseScale, title, {
        fontSize: `${FONT_SIZE.HEADING * baseScale}px`,
        color: "#ffffff",
        fontFamily: "Arial",
        fontStyle: "bold",
      });
      this.titleText.setOrigin(0.5);
      this.add(this.titleText);
    }
    
    scene.add.existing(this);
  }
  
  public setTitle(title: string) {
    if (this.titleText) {
      this.titleText.setText(title);
    }
  }
}
