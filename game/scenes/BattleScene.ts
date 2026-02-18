import Phaser from "phaser";
import { SceneKey, COLORS, BattleState } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";

export class BattleScene extends Phaser.Scene {
  private battleState: BattleState = BattleState.IDLE;
  private playerSprite?: Phaser.GameObjects.Sprite;
  private enemySprite?: Phaser.GameObjects.Sprite;
  
  constructor() {
    super({ key: SceneKey.BATTLE });
  }
  
  create() {
    this.setupBackground();
    this.setupCharacters();
    this.setupUI();
    this.startBattle();
  }
  
  update() {
    // Game loop
  }
  
  private setupBackground() {
    const { width, height } = this.cameras.main;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Background
    this.add.rectangle(centerX, centerY, width, height, COLORS.BACKGROUND);
    
    // Battle area
    const battleAreaWidth = width - (GAME_CONFIG.SAFE_ZONE.LEFT + GAME_CONFIG.SAFE_ZONE.RIGHT);
    const battleAreaHeight = height - (GAME_CONFIG.SAFE_ZONE.TOP + GAME_CONFIG.SAFE_ZONE.BOTTOM);
    
    this.add.rectangle(
      centerX,
      centerY,
      battleAreaWidth,
      battleAreaHeight,
      COLORS.PANEL,
      0.5
    );
  }
  
  private setupCharacters() {
    const { width, height } = this.cameras.main;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    
    // Player position (left side)
    const playerX = width * 0.3;
    const playerY = height * 0.6;
    
    // Enemy position (right side)
    const enemyX = width * 0.7;
    const enemyY = height * 0.4;
    
    // Player sprite (placeholder)
    this.playerSprite = this.add.circle(playerX, playerY, 50 * baseScale, COLORS.PRIMARY);
    this.playerSprite.setStrokeStyle(3, COLORS.TEXT);
    
    // Player label
    this.add.text(playerX, playerY + 80 * baseScale, "Player", {
      fontSize: `${24 * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    }).setOrigin(0.5);
    
    // Enemy sprite (placeholder)
    this.enemySprite = this.add.circle(enemyX, enemyY, 50 * baseScale, COLORS.DANGER);
    this.enemySprite.setStrokeStyle(3, COLORS.TEXT);
    
    // Enemy label
    this.add.text(enemyX, enemyY + 80 * baseScale, "Enemy", {
      fontSize: `${24 * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    }).setOrigin(0.5);
  }
  
  private setupUI() {
    // Launch UI scene as overlay
    this.scene.launch(SceneKey.UI);
    this.scene.bringToTop(SceneKey.UI);
  }
  
  private startBattle() {
    this.battleState = BattleState.PLAYER_TURN;
    
    // TODO: Initialize battle system
    console.log("Battle started!");
  }
  
  public playerAttack() {
    console.log("Player attacks!");
    // TODO: Implement attack logic
  }
  
  public endTurn() {
    if (this.battleState === BattleState.PLAYER_TURN) {
      this.battleState = BattleState.ENEMY_TURN;
      this.enemyTurn();
    }
  }
  
  private enemyTurn() {
    console.log("Enemy turn!");
    // TODO: Implement enemy AI
    
    // Simulate enemy action
    this.time.delayedCall(1000, () => {
      this.battleState = BattleState.PLAYER_TURN;
    });
  }
}
