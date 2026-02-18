"use client";

import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { getPhaserConfig } from "@/game/config/gameConfig";
import { PreloadScene } from "@/game/scenes/PreloadScene";
import { MenuScene } from "@/game/scenes/MenuScene";
import { BattleScene } from "@/game/scenes/BattleScene";
import { UIScene } from "@/game/scenes/UIScene";

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || gameRef.current || !containerRef.current) return;

    // Get Phaser configuration
    const config = getPhaserConfig(containerRef.current);
    
    // Add scenes
    config.scene = [PreloadScene, MenuScene, BattleScene, UIScene];

    // Create game instance
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
