//Sustainability gauge component
//Displays a visual gauge based on the sustainability score by selecting one tile from a 3x3 image grid

"use client";

import React from "react";

//Restricts a number to stay within a minimum and maximum value
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

//Converts a score (0–100) into one of 9 bins used for the gauge image grid
function scoreToBin(score: number) {
  const s = clamp(score, 0, 100);
  const bin = Math.floor(s / (100 / 9));
  return clamp(bin, 0, 8);
}

//Renders sustainability gauge image based on the score
export default function SustainabilityGauge({
  score,
  width = 360,
}: {
  score: number;
  width?: number;
}) {
  //Determine which tile of the 3x3 grid to display
  const bin = scoreToBin(score);

  const cols = 3;
  const rows = 3;

  const row = Math.floor(bin / cols);
  const col = bin % cols;

  //Size of each tile in the 3x3 gauge image grid
  const TILE_W = 448;
  const TILE_H = 335.33;

  //Calculate height so the gauge keeps the correct aspect ratio
  const height = Math.round((width * TILE_H) / TILE_W);

  //Calculate background offsets to display the correct tile
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