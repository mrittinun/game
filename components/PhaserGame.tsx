"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || gameRef.current) return;

    // Main game scene
    class GameScene extends Phaser.Scene {
      constructor() {
        super({ key: "GameScene" });
      }

      preload() {
        // Load assets here
      }

      create() {
        // Sample game content
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        // Background
        this.add.rectangle(centerX, centerY, 1280, 720, 0x1a1a2e);

        // Title
        const title = this.add.text(centerX, centerY - 100, "Web Game", {
          fontSize: "64px",
          color: "#ffffff",
          fontFamily: "Arial",
        });
        title.setOrigin(0.5);

        // Subtitle
        const subtitle = this.add.text(
          centerX,
          centerY,
          "Phaser 3 + Next.js",
          {
            fontSize: "32px",
            color: "#16213e",
            fontFamily: "Arial",
          }
        );
        subtitle.setOrigin(0.5);

        // Interactive circle
        const circle = this.add.circle(centerX, centerY + 100, 50, 0x0f3460);
        circle.setInteractive();
        circle.on("pointerdown", () => {
          circle.setFillStyle(0xe94560);
        });
        circle.on("pointerup", () => {
          circle.setFillStyle(0x0f3460);
        });

        // Instructions
        const instructions = this.add.text(
          centerX,
          centerY + 200,
          "แตะวงกลมเพื่อโต้ตอบ",
          {
            fontSize: "24px",
            color: "#888888",
            fontFamily: "Arial",
          }
        );
        instructions.setOrigin(0.5);
      }

      update() {
        // Game loop
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current || undefined,
      width: 1280,
      height: 720,
      backgroundColor: "#000000",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [GameScene],
      input: {
        touch: true,
        mouse: true,
      },
    };

    gameRef.current = new Phaser.Game(config);

    // Handle window resize
    const handleResize = () => {
      if (gameRef.current) {
        gameRef.current.scale.resize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" ref={containerRef} />;
}
