import Phaser from "phaser";
import { SceneKey, COLORS, FONT_SIZE } from "@/game/config/constants";
import { GAME_CONFIG } from "@/game/config/gameConfig";
import { Button } from "@/game/ui";
import { Panel } from "@/game/ui";
import { TextInput } from "@/game/ui";
import { useCardStore } from "@/game/stores/cardStore";

export class CharacterEditorScene extends Phaser.Scene {
  private selectedCardId: string | null = null;
  private leftPanel?: Panel;
  private rightPanel?: Panel;
  private cardButtons: Button[] = [];
  private statInputs: Map<string, TextInput> = new Map();
  private skillInputs: Map<number, TextInput> = new Map();
  private saveButton?: Button;
  private backButton?: Button;
  
  constructor() {
    super({ key: SceneKey.CHARACTER_EDITOR });
  }
  
  create() {
    const { width, height } = this.cameras.main;
    const baseScale = Math.min(width / GAME_CONFIG.WIDTH, height / GAME_CONFIG.HEIGHT);
    const safe = GAME_CONFIG.SAFE_ZONE;
    
    // Background
    this.add.rectangle(width / 2, height / 2, width, height, COLORS.BACKGROUND);
    
    // Title
    const title = this.add.text(width / 2, safe.TOP + 30 * baseScale, "Character Editor", {
      fontSize: `${FONT_SIZE.HEADING * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    title.setOrigin(0.5);
    
    // Left Panel - Character List
    this.createLeftPanel(baseScale, safe);
    
    // Right Panel - Character Details
    this.createRightPanel(baseScale, safe);
    
    // Back Button
    this.backButton = new Button(
      this,
      safe.LEFT + 100 * baseScale,
      height - safe.BOTTOM - 40 * baseScale,
      "Back",
      150 * baseScale,
      60 * baseScale,
      () => this.goBack()
    );
    
    // Save Button
    this.saveButton = new Button(
      this,
      width - safe.RIGHT - 100 * baseScale,
      height - safe.BOTTOM - 40 * baseScale,
      "Save",
      150 * baseScale,
      60 * baseScale,
      () => this.saveChanges()
    );
    
    // Load cards
    this.loadCardList();
  }
  
  private createLeftPanel(scale: number, safe: typeof GAME_CONFIG.SAFE_ZONE) {
    const { width, height } = this.cameras.main;
    const panelWidth = 350 * scale;
    const panelHeight = height - safe.TOP - safe.BOTTOM - 150 * scale;
    const panelX = safe.LEFT + panelWidth / 2 + 20 * scale;
    const panelY = safe.TOP + 100 * scale + panelHeight / 2;
    
    this.leftPanel = new Panel(
      this,
      panelX,
      panelY,
      panelWidth,
      panelHeight,
      "Characters"
    );
  }
  
  private createRightPanel(scale: number, safe: typeof GAME_CONFIG.SAFE_ZONE) {
    const { width, height } = this.cameras.main;
    const panelWidth = width - safe.LEFT - safe.RIGHT - 400 * scale;
    const panelHeight = height - safe.TOP - safe.BOTTOM - 150 * scale;
    const panelX = width - safe.RIGHT - panelWidth / 2 - 20 * scale;
    const panelY = safe.TOP + 100 * scale + panelHeight / 2;
    
    this.rightPanel = new Panel(
      this,
      panelX,
      panelY,
      panelWidth,
      panelHeight,
      "Character Details"
    );
  }
  
  private loadCardList() {
    if (!this.leftPanel) return;
    
    const cards = useCardStore.getState().cards;
    const baseScale = Math.min(
      this.cameras.main.width / GAME_CONFIG.WIDTH,
      this.cameras.main.height / GAME_CONFIG.HEIGHT
    );
    
    // Clear existing buttons
    this.cardButtons.forEach(btn => btn.destroy());
    this.cardButtons = [];
    
    // Create button for each card
    cards.forEach((card, index) => {
      const buttonY = this.leftPanel!.y - this.leftPanel!.height / 2 + 60 * baseScale + index * 80 * baseScale;
      
      const buttonText = `${card.name}\n${card.element} | ${card.role}`;
      
      const button = new Button(
        this,
        this.leftPanel!.x,
        buttonY,
        buttonText,
        300 * baseScale,
        70 * baseScale,
        () => this.selectCard(card.id),
        FONT_SIZE.SMALL * baseScale
      );
      
      this.cardButtons.push(button);
      this.leftPanel!.add(button);
    });
  }
  
  private selectCard(cardId: string) {
    this.selectedCardId = cardId;
    this.displayCardDetails(cardId);
  }
  
  private displayCardDetails(cardId: string) {
    if (!this.rightPanel) return;
    
    const card = useCardStore.getState().getCardById(cardId);
    if (!card) return;
    
    const baseScale = Math.min(
      this.cameras.main.width / GAME_CONFIG.WIDTH,
      this.cameras.main.height / GAME_CONFIG.HEIGHT
    );
    
    // Clear existing inputs
    this.statInputs.forEach(input => input.destroy());
    this.statInputs.clear();
    this.skillInputs.forEach(input => input.destroy());
    this.skillInputs.clear();
    
    const startY = this.rightPanel.y - this.rightPanel.height / 2 + 60 * baseScale;
    const labelX = this.rightPanel.x - this.rightPanel.width / 2 + 40 * baseScale;
    const inputX = this.rightPanel.x + 50 * baseScale;
    let currentY = startY;
    
    // Card Name (read-only)
    this.add.text(labelX, currentY, `Name: ${card.name}`, {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    currentY += 50 * baseScale;
    
    // Element (read-only)
    this.add.text(labelX, currentY, `Element: ${card.element}`, {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    currentY += 50 * baseScale;
    
    // Role (read-only)
    this.add.text(labelX, currentY, `Role: ${card.role}`, {
      fontSize: `${FONT_SIZE.BODY * baseScale}px`,
      color: "#ffffff",
      fontFamily: "Arial",
    });
    currentY += 70 * baseScale;
    
    // Stats Header
    this.add.text(labelX, currentY, "Stats:", {
      fontSize: `${FONT_SIZE.HEADING * baseScale}px`,
      color: "#ffff00",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    currentY += 50 * baseScale;
    
    // Editable Stats
    const stats = ["hp", "attack", "defense", "speed"];
    stats.forEach(stat => {
      this.add.text(labelX, currentY, `${stat.toUpperCase()}:`, {
        fontSize: `${FONT_SIZE.BODY * baseScale}px`,
        color: "#ffffff",
        fontFamily: "Arial",
      });
      
      const input = new TextInput(
        this,
        inputX,
        currentY,
        150 * baseScale,
        40 * baseScale,
        card.stats[stat as keyof typeof card.stats].toString()
      );
      
      this.statInputs.set(stat, input);
      // Don't add to panel, just track it
      
      currentY += 60 * baseScale;
    });
    
    currentY += 20 * baseScale;
    
    // Skills Header
    this.add.text(labelX, currentY, "Skills:", {
      fontSize: `${FONT_SIZE.HEADING * baseScale}px`,
      color: "#ffff00",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    currentY += 50 * baseScale;
    
    // Editable Skills
    card.skills.forEach((skillId, index) => {
      this.add.text(labelX, currentY, `Skill ${index + 1}:`, {
        fontSize: `${FONT_SIZE.BODY * baseScale}px`,
        color: "#ffffff",
        fontFamily: "Arial",
      });
      
      const input = new TextInput(
        this,
        inputX,
        currentY,
        200 * baseScale,
        40 * baseScale,
        skillId
      );
      
      this.skillInputs.set(index, input);
      // Don't add to panel, just track it
      
      currentY += 60 * baseScale;
    });
  }
  
  private saveChanges() {
    if (!this.selectedCardId) {
      console.log("No card selected");
      return;
    }
    
    const card = useCardStore.getState().getCardById(this.selectedCardId);
    if (!card) return;
    
    // Collect updated stats
    const updatedStats: any = {};
    this.statInputs.forEach((input, stat) => {
      updatedStats[stat] = parseInt(input.getValue()) || 0;
    });
    
    // Collect updated skills
    const updatedSkills: string[] = [];
    this.skillInputs.forEach((input, index) => {
      updatedSkills[index] = input.getValue();
    });
    
    // Update store
    useCardStore.getState().updateCardStats(this.selectedCardId, updatedStats);
    useCardStore.getState().updateCardSkills(this.selectedCardId, updatedSkills);
    
    console.log("Changes saved!", { cardId: this.selectedCardId, updatedStats, updatedSkills });
    
    // Show feedback
    const { width, height } = this.cameras.main;
    const feedback = this.add.text(width / 2, height / 2, "Saved!", {
      fontSize: "48px",
      color: "#00ff00",
      fontFamily: "Arial",
      fontStyle: "bold",
    });
    feedback.setOrigin(0.5);
    
    this.tweens.add({
      targets: feedback,
      alpha: 0,
      duration: 1000,
      onComplete: () => feedback.destroy(),
    });
  }
  
  private goBack() {
    this.scene.start(SceneKey.MAIN_MENU);
  }
  
  shutdown() {
    // Cleanup
    this.cardButtons.forEach(btn => btn.destroy());
    this.cardButtons = [];
    this.statInputs.forEach(input => input.destroy());
    this.statInputs.clear();
    this.skillInputs.forEach(input => input.destroy());
    this.skillInputs.clear();
    this.leftPanel?.destroy();
    this.rightPanel?.destroy();
    this.saveButton?.destroy();
    this.backButton?.destroy();
  }
}
