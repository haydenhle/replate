"use client";

import SustainabilityGauge from "@/components/SustainabilityGauge";

export default function GaugeClient() {
  // demo score for now
  const score = 60;

  return (
    <div className="flex justify-center">
      <SustainabilityGauge score={score} width={400} />
    </div>
  );
}