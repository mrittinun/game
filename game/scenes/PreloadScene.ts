import Phaser from "phaser";
import { SceneKey } from "@/game/config/constants";

export class PreloadScene extends Phaser.Scene {
  private loadingBar?: Phaser.GameObjects.Graphics;
  private progressBar?: Phaser.GameObjects.Graphics;
  private loadingText?: Phaser.GameObjects.Text;
  
  constructor() {
    super({ key: SceneKey.PRELOAD });
  }
  
  preload() {
    this.createLoadingScreen();
    this.loadAssets();
    this.setupLoadingEvents();
  }
  
  create() {
    // เมื่อโหลดเสร็จ ไปที่ MenuScene
    this.scene.start(SceneKey.MENU);
  }
  
  private createLoadingScreen() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Background
    this.add.rectangle(centerX, centerY, width, height, 0x1a1a2e);
    
    // Title
    this.add.text(centerX, centerY - 100, "Turn-Based Battle", {
      fontSize: "48px",
      color: "#ffffff",
      fontFamily: "Arial",
    }).setOrigin(0.5);
    
    // Loading text
    this.loadingText = this.add.text(centerX, centerY + 100, "Loading... 0%", {
      fontSize: "24px",
      color: "#cccccc",
      fontFamily: "Arial",
    }).setOrigin(0.5);
    
    // Progress bar background
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x333333, 1);
    this.loadingBar.fillRect(centerX - 200, centerY, 400, 30);
    
    // Progress bar
    this.progressBar = this.add.graphics();
  }
  
  private loadAssets() {
    // TODO: โหลด assets ที่จำเป็น
    // ตัวอย่าง:
    // this.load.image("player", "/sprites/player.png");
    // this.load.image("enemy", "/sprites/enemy.png");
    // this.load.audio("bgm", "/sounds/bgm.mp3");
    
    // สำหรับตอนนี้ใช้ placeholder
    // จำลองการโหลด
    for (let i = 0; i < 10; i++) {
      this.load.image(`placeholder-${i}`, "/next.svg");
    }
  }
  
  private setupLoadingEvents() {
    this.load.on("progress", (value: number) => {
      this.updateProgressBar(value);
    });
    
    this.load.on("complete", () => {
      this.loadingBar?.destroy();
      this.progressBar?.destroy();
      this.loadingText?.destroy();
    });
  }
  
  private updateProgressBar(value: number) {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Update progress bar
    this.progressBar?.clear();
    this.progressBar?.fillStyle(0x4a90e2, 1);
    this.progressBar?.fillRect(centerX - 200, centerY, 400 * value, 30);
    
    // Update text
    const percent = Math.floor(value * 100);
    this.loadingText?.setText(`Loading... ${percent}%`);
  }
}
