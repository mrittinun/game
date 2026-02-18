import Phaser from "phaser";
import { SceneKey, COLORS, FONT_SIZE } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import { Button } from "@/game/ui";

export class MainMenuScene extends Phaser.Scene {
  private buttons: Button[] = [];
  
  constructor() {
    super({ key: SceneKey.MAIN_MENU });
  }
  
  create() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    // Background
    this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);
    
    // Game Title
    const title = this.add.text(centerX, centerY - 150 * baseScale, "Turn-Based Card Game", {
      fontSize: `${FONT_SIZE.TITLE * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    title.setOrigin(0.5);
    
    // Subtitle
    const subtitle = this.add.text(centerX, centerY - 80 * baseScale, "Phaser 3 + Next.js", {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#cccccc",
      fontFamily: "Arial",
    });
    subtitle.setOrigin(0.5);
    
    // Start Game Button
    const startButton = new Button(
      this,
      centerX,
      centerY + 20 * baseScale,
      "Start Game",
      300 * baseScale,
      80 * baseScale,
      () => this.onStartGame()
    );
    this.buttons.push(startButton);
    
    // Character Editor Button
    const editorButton = new Button(
      this,
      centerX,
      centerY + 120 * baseScale,
      "Character Editor",
      300 * baseScale,
      80 * baseScale,
      () => this.onCharacterEditor()
    );
    this.buttons.push(editorButton);
    
    // Version text
    const version = this.add.text(
      width - GAME_CONFIG.SAFE_ZONE.RIGHT - 10,
      height - GAME_CONFIG.SAFE_ZONE.BOTTOM - 10,
      "v1.0.0",
      {
        fontSize: `${FONT_SIZE.TINY * baseScale}px`,
        color: "#666666",
        fontFamily: "Arial",
      }
    );
    version.setOrigin(1, 1);
  }
  
  private onStartGame() {
    console.log("Start Game clicked");
    // TODO: Navigate to battle scene when implemented
  }
  
  private onCharacterEditor() {
    console.log("Character Editor clicked");
    this.scene.start(SceneKey.CHARACTER_EDITOR);
  }
  
  shutdown() {
    // Cleanup
    this.buttons.forEach(button => button.destroy());
    this.buttons = [];
  }
}
