import Phaser from "phaser";
import { SceneKey } from "@/game/config/constants";

export class SceneManager {
  private static instance: SceneManager;
  private currentScene?: Phaser.Scene;
  
  private constructor() {}
  
  public static getInstance(): SceneManager {
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }
  
  public setCurrentScene(scene: Phaser.Scene) {
    this.currentScene = scene;
  }
  
  public goToMainMenu() {
    if (this.currentScene) {
      this.currentScene.scene.start(SceneKey.MAIN_MENU);
    }
  }
  
  public goToCharacterEditor() {
    if (this.currentScene) {
      this.currentScene.scene.start(SceneKey.CHARACTER_EDITOR);
    }
  }
  
  public goToBattle() {
    if (this.currentScene) {
      this.currentScene.scene.start(SceneKey.BATTLE);
    }
  }
  
  public goToPreload() {
    if (this.currentScene) {
      this.currentScene.scene.start(SceneKey.PRELOAD);
    }
  }
}

// Export singleton instance
export const sceneManager = SceneManager.getInstance();
