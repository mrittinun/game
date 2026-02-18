import Phaser from "phaser";

export interface GamePanelConfig {
  width?: number;
  height?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  borderColor?: number;
  borderWidth?: number;
  cornerRadius?: number;
  padding?: number;
}

export class GamePanel extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Graphics;
  private config: Required<GamePanelConfig>;
  public panelWidth: number;
  public panelHeight: number;
  
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    config?: GamePanelConfig
  ) {
    super(scene, x, y);
    
    // Default config
    this.config = {
      width: config?.width || 400,
      height: config?.height || 500,
      backgroundColor: config?.backgroundColor || 0x1a1a2e,
      backgroundAlpha: config?.backgroundAlpha || 0.95,
      borderColor: config?.borderColor || 0x4a90e2,
      borderWidth: config?.borderWidth || 3,
      cornerRadius: config?.cornerRadius || 20,
      padding: config?.padding || 30,
    };
    
    this.panelWidth = this.config.width;
    this.panelHeight = this.config.height;
    
    // Create background
    this.bg = scene.add.graphics();
    this.drawPanel();
    
    this.add(this.bg);
    this.setSize(this.config.width, this.config.height);
    
    scene.add.existing(this);
  }
  
  private drawPanel() {
    this.bg.clear();
    
    const { width, height, backgroundColor, backgroundAlpha, borderColor, borderWidth, cornerRadius } = this.config;
    const x = -width / 2;
    const y = -height / 2;
    
    // Draw shadow
    this.bg.fillStyle(0x000000, 0.3);
    this.bg.fillRoundedRect(x + 5, y + 5, width, height, cornerRadius);
    
    // Draw background
    this.bg.fillStyle(backgroundColor, backgroundAlpha);
    this.bg.fillRoundedRect(x, y, width, height, cornerRadius);
    
    // Draw border
    this.bg.lineStyle(borderWidth, borderColor, 1);
    this.bg.strokeRoundedRect(x, y, width, height, cornerRadius);
    
    // Draw inner glow
    this.bg.lineStyle(1, borderColor, 0.3);
    this.bg.strokeRoundedRect(x + 5, y + 5, width - 10, height - 10, cornerRadius - 5);
  }
  
  public fadeIn(duration: number = 300) {
    this.setAlpha(0);
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration,
      ease: "Power2",
    });
  }
  
  public fadeOut(duration: number = 300) {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration,
      ease: "Power2",
    });
  }
}
