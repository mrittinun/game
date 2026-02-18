"use client";

import dynamic from "next/dynamic";
import OrientationOverlay from "@/components/OrientationOverlay";

const PhaserGame = dynamic(() => import("@/components/PhaserGame"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <OrientationOverlay />
      <PhaserGame />
    </>
  );
}
