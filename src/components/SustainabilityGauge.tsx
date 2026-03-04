"use client";

import React from "react";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Map 0–100 to 9 bins 
function scoreToBin(score: number) {
  const s = clamp(score, 0, 100);
  const bin = Math.floor(s / (100 / 9));
  return clamp(bin, 0, 8);
}

export default function SustainabilityGauge({
  score,
  width = 360,
  aspect = 1.30, 
}: {
  score: number;
  width?: number;
  aspect?: number;
}) {
  const bin = scoreToBin(score);

  // 3x3 grid:
  const cols = 3;
  const row = Math.floor(bin / cols); 
  const col = bin % cols;  

  const posX = col === 0 ? "0%" : col === 1 ? "50%" : "100%";
  const posY = row === 0 ? "0%" : row === 1 ? "50%" : "100%";

  const height = Math.round(width / aspect);

  return (
    <div
      aria-label={`Sustainability gauge for score ${score}`}
      style={{
        width,
        height,
        backgroundImage: "url(/gauges/SustainabilityScore.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "300% 300%",
        backgroundPosition: `${posX} ${posY}`,
        borderRadius: 12,
      }}
    />
  );
}