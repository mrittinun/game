import Phaser from "phaser";
import { SceneKey, COLORS, FONT_SIZE, MIN_TOUCH_SIZE } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey.MENU });
  }
  
  create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    // Background
    this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);
    
    // Title
    const title = this.add.text(centerX, centerY - 150, "Turn-Based Battle", {
      fontSize: `${FONT_SIZE.TITLE * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    title.setOrigin(0.5);
    
    // Subtitle
    const subtitle = this.add.text(centerX, centerY - 80, "Phaser 3 + Next.js", {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#cccccc",
      fontFamily: "Arial",
    });
    subtitle.setOrigin(0.5);
    
    // Start button
    this.createButton(
      centerX,
      centerY + 50,
      "Start Battle",
      baseScale,
      () => this.startBattle()
    );
    
    // Settings button
    this.createButton(
      centerX,
      centerY + 150,
      "Settings",
      baseScale,
      () => this.openSettings()
    );
    
    // Instructions
    const instructions = this.add.text(
      centerX,
      height - GAME_CONFIG.SAFE_ZONE.BOTTOM - 20,
      "แตะปุ่มเพื่อเริ่มเกม",
      {
        fontSize: `${FONT_SIZE.SMALL * baseScale}px`,
        color: "#888888",
        fontFamily: "Arial",
      }
    );
    instructions.setOrigin(0.5);
  }
  
  private createButton(
    x: number,
    y: number,
    text: string,
    scale: number,
    callback: () => void
  ) {
    const buttonWidth = 300 * scale;
    const buttonHeight = 80 * scale;
    const fontSize = FONT_SIZE.HEADING * scale;
    
    // Button container
    const container = this.add.container(x, y);
    
    // Button background
    const bg = this.add.rectangle(0, 0, buttonWidth, buttonHeight, COLORS.PRIMARY);
    bg.setStrokeStyle(2, COLORS.TEXT);
    
    // Button text
    const buttonText = this.add.text(0, 0, text, {
      fontSize: `${fontSize}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    buttonText.setOrigin(0.5);
    
    container.add([bg, buttonText]);
    container.setSize(buttonWidth, buttonHeight);
    
    // Make interactive with proper touch target
    const hitArea = new Phaser.Geom.Rectangle(
      -buttonWidth / 2,
      -buttonHeight / 2,
      Math.max(buttonWidth, MIN_TOUCH_SIZE),
      Math.max(buttonHeight, MIN_TOUCH_SIZE)
    );
    
    container.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
    
    // Hover effect
    container.on("pointerover", () => {
      bg.setFillStyle(COLORS.SECONDARY);
    });
    
    container.on("pointerout", () => {
      bg.setFillStyle(COLORS.PRIMARY);
      container.setScale(1);
    });
    
    // Press effect
    container.on("pointerdown", () => {
      container.setScale(0.95);
    });
    
    container.on("pointerup", () => {
      container.setScale(1);
      callback();
    });
    
    return container;
  }
  
  private startBattle() {
    // เริ่ม BattleScene
    this.scene.start(SceneKey.BATTLE);
  }
  
  private openSettings() {
    // TODO: เปิด settings menu
    console.log("Settings clicked");
  }
}
