// Game constants

// Battle states
export enum BattleState {
  IDLE = "idle",
  PLAYER_TURN = "player_turn",
  ENEMY_TURN = "enemy_turn",
  ANIMATING = "animating",
  VICTORY = "victory",
  DEFEAT = "defeat",
}

// Skill types
export enum SkillType {
  ATTACK = "attack",
  HEAL = "heal",
  BUFF = "buff",
  DEBUFF = "debuff",
}

// Elements
export enum Element {
  FIRE = "fire",
  WATER = "water",
  EARTH = "earth",
  WIND = "wind",
  NEUTRAL = "neutral",
}

// Scene keys
export enum SceneKey {
  PRELOAD = "PreloadScene",
  MENU = "MenuScene",
  BATTLE = "BattleScene",
  UI = "UIScene",
  RESULT = "ResultScene",
}

// Animation durations (milliseconds)
export const ANIMATION_DURATION = {
  ATTACK: 600,
  HIT: 300,
  HEAL: 800,
  CAST: 500,
  PROJECTILE: 400,
  IMPACT: 300,
  BUTTON_PRESS: 100,
  HP_CHANGE: 500,
  DAMAGE_NUMBER: 1000,
  TURN_DELAY: 500,
} as const;

// Colors
export const COLORS = {
  PRIMARY: 0x4a90e2,
  SECONDARY: 0xe94560,
  SUCCESS: 0x50c878,
  WARNING: 0xffb347,
  DANGER: 0xff4444,
  
  BACKGROUND: 0x1a1a2e,
  PANEL: 0x16213e,
  TEXT: 0xffffff,
  TEXT_SECONDARY: 0xcccccc,
  
  HP: 0xff4444,
  HP_BG: 0x333333,
  MP: 0x4a90e2,
  MP_BG: 0x333333,
  
  FIRE: 0xff6b35,
  WATER: 0x4a90e2,
  EARTH: 0x8b4513,
  WIND: 0x90ee90,
  NEUTRAL: 0xcccccc,
} as const;

// Font sizes (will be scaled)
export const FONT_SIZE = {
  TITLE: 48,
  HEADING: 32,
  BODY: 24,
  SMALL: 18,
  TINY: 14,
} as const;

// Touch target minimum size (Apple HIG)
export const MIN_TOUCH_SIZE = 44;

// Elemental effectiveness multipliers
export const ELEMENTAL_EFFECTIVENESS: Record<Element, Record<Element, number>> = {
  [Element.FIRE]: {
    [Element.FIRE]: 1.0,
    [Element.WATER]: 0.5,
    [Element.EARTH]: 1.5,
    [Element.WIND]: 1.0,
    [Element.NEUTRAL]: 1.0,
  },
  [Element.WATER]: {
    [Element.FIRE]: 1.5,
    [Element.WATER]: 1.0,
    [Element.EARTH]: 0.5,
    [Element.WIND]: 1.0,
    [Element.NEUTRAL]: 1.0,
  },
  [Element.EARTH]: {
    [Element.FIRE]: 0.5,
    [Element.WATER]: 1.5,
    [Element.EARTH]: 1.0,
    [Element.WIND]: 1.0,
    [Element.NEUTRAL]: 1.0,
  },
  [Element.WIND]: {
    [Element.FIRE]: 1.0,
    [Element.WATER]: 1.0,
    [Element.EARTH]: 1.5,
    [Element.WIND]: 1.0,
    [Element.NEUTRAL]: 1.0,
  },
  [Element.NEUTRAL]: {
    [Element.FIRE]: 1.0,
    [Element.WATER]: 1.0,
    [Element.EARTH]: 1.0,
    [Element.WIND]: 1.0,
    [Element.NEUTRAL]: 1.0,
  },
};
