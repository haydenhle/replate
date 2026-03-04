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
}: {
  score: number;
  width?: number;
}) {
  const bin = scoreToBin(score);

  const cols = 3;
  const rows = 3;

  const row = Math.floor(bin / cols);
  const col = bin % cols;

  // 1344/3 = 448 width, 1006/3 = 335.33 length
  const TILE_W = 448;
  const TILE_H = 335.33;

  // Keep same aspect ratio 
  const height = Math.round((width * TILE_H) / TILE_W);

  // cropping 
  const bgW = width * cols;
  const bgH = height * rows;
  const bgX = -col * width;
  const bgY = -row * height;

  return (
    <div
      aria-label={`Sustainability gauge for score ${score}`}
      style={{
        width,
        height,
        backgroundImage: "url(/gauges/SustainabilityScore.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        borderRadius: 12,
      }}
    />
  );
}