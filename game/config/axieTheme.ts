// Axie Infinity inspired color palette and theme

export const AxieColors = {
  // Primary colors (vibrant and playful)
  primary: {
    blue: 0x00b8ce,
    purple: 0x9747ff,
    pink: 0xff6ec7,
    green: 0x00d4aa,
    yellow: 0xffd700,
    orange: 0xff8c42,
  },
  
  // Background colors
  background: {
    sky: 0x87ceeb,
    grass: 0x90ee90,
    dark: 0x2d1b69,
    light: 0xf0f8ff,
    gradient1: 0x667eea,
    gradient2: 0x764ba2,
  },
  
  // UI colors
  ui: {
    panel: 0xffffff,
    panelDark: 0x2d1b69,
    border: 0xffd700,
    shadow: 0x000000,
    success: 0x00d4aa,
    warning: 0xff8c42,
    danger: 0xff6b9d,
    info: 0x00b8ce,
  },
  
  // Text colors
  text: {
    primary: 0x2d1b69,
    secondary: 0x666666,
    white: 0xffffff,
    gold: 0xffd700,
  },
  
  // Element colors (for cards)
  element: {
    fire: 0xff6b6b,
    water: 0x4ecdc4,
    earth: 0x8b7355,
    wind: 0xb8e994,
    light: 0xffd93d,
    dark: 0x6c5ce7,
  },
  
  // Rarity colors
  rarity: {
    common: 0x95a5a6,
    uncommon: 0x2ecc71,
    rare: 0x3498db,
    epic: 0x9b59b6,
    legendary: 0xf39c12,
    mythic: 0xe74c3c,
  },
} as const;

export const AxieGradients = {
  sky: [0x87ceeb, 0xffffff],
  sunset: [0xff6b6b, 0xffd93d],
  ocean: [0x00b8ce, 0x4ecdc4],
  forest: [0x00d4aa, 0x90ee90],
  purple: [0x667eea, 0x764ba2],
  pink: [0xff6ec7, 0xffd93d],
  rainbow: [0xff6b6b, 0xffd93d, 0x00d4aa, 0x00b8ce, 0x9747ff],
} as const;

export const AxieFonts = {
  title: {
    size: 56,
    style: "bold",
    family: "Arial, sans-serif",
  },
  heading: {
    size: 32,
    style: "bold",
    family: "Arial, sans-serif",
  },
  body: {
    size: 20,
    style: "normal",
    family: "Arial, sans-serif",
  },
  small: {
    size: 16,
    style: "normal",
    family: "Arial, sans-serif",
  },
  tiny: {
    size: 12,
    style: "normal",
    family: "Arial, sans-serif",
  },
} as const;

export const AxieAnimations = {
  bounce: {
    duration: 500,
    ease: "Bounce.easeOut",
  },
  float: {
    duration: 2000,
    ease: "Sine.easeInOut",
    yoyo: true,
    repeat: -1,
  },
  pulse: {
    duration: 1000,
    ease: "Sine.easeInOut",
    yoyo: true,
    repeat: -1,
  },
  shake: {
    duration: 100,
    ease: "Power2",
  },
} as const;

export const AxieUI = {
  cornerRadius: {
    small: 10,
    medium: 20,
    large: 30,
  },
  shadow: {
    offset: 5,
    blur: 10,
    color: 0x000000,
    alpha: 0.3,
  },
  border: {
    width: 4,
    color: 0xffd700,
  },
  spacing: {
    tiny: 5,
    small: 10,
    medium: 20,
    large: 30,
    xlarge: 40,
  },
} as const;
