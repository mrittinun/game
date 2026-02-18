"use client";

import { useEffect, useState } from "react";

export default function OrientationOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPort = window.innerHeight > window.innerWidth;
      setIsPortrait(isPort);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="orientation-overlay">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
      <h2>กรุณาหมุนอุปกรณ์</h2>
      <p>เกมนี้รองรับเฉพาะโหมดแนวนอนเท่านั้น</p>
    </div>
  );
}
