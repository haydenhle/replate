"use client";

import SustainabilityGauge from "@/components/SustainabilityGauge";

export default function GaugeClient({ score }: { score: number }) {
  return (
    <div className="flex justify-center">
      <SustainabilityGauge score={score} width={400} />
    </div>
  );
}