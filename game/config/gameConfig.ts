import Phaser from "phaser";

// Game configuration constants
export const GAME_CONFIG = {
  // Screen dimensions (16:9 aspect ratio)
  WIDTH: 1280,
  HEIGHT: 720,
  
  // Safe zones for UI (pixels from edge)
  SAFE_ZONE: {
    TOP: 60,
    BOTTOM: 60,
    LEFT: 40,
    RIGHT: 40,
  },
  
  // Physics
  GRAVITY: { x: 0, y: 0 },
  
  // Performance
  TARGET_FPS: 60,
  
  // Debug
  DEBUG: process.env.NODE_ENV === "development",
} as const;

// Phaser game configuration
export const getPhaserConfig = (parent: HTMLElement): Phaser.Types.Core.GameConfig => ({
  type: Phaser.AUTO,
  parent,
  width: GAME_CONFIG.WIDTH,
  height: GAME_CONFIG.HEIGHT,
  backgroundColor: "#000000",
  
  // Scale configuration - CRITICAL for mobile support
  scale: {
    mode: Phaser.Scale.FIT,              // ✅ รักษา aspect ratio
    autoCenter: Phaser.Scale.CENTER_BOTH, // ✅ จัดกลางอัตโนมัติ
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
  },
  
  // Physics configuration
  physics: {
    default: "arcade",
    arcade: {
      gravity: GAME_CONFIG.GRAVITY,
      debug: GAME_CONFIG.DEBUG,
    },
  },
  
  // Input configuration - รองรับ touch
  input: {
    touch: true,
    mouse: true,
    activePointers: 3, // รองรับ multi-touch
  },
  
  // Performance
  fps: {
    target: GAME_CONFIG.TARGET_FPS,
    forceSetTimeOut: false,
  },
  
  // Render configuration
  render: {
    pixelArt: false,
    antialias: true,
    roundPixels: false,
  },
});
