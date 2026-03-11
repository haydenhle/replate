//User wrapper component for the sustainability gauge
//Ensures the chart renders only on the user side

"use client";

import SustainabilityGauge from "@/components/SustainabilityGauge";

//Renders the SustainabilityGauge component with provided score
export default function GaugeClient({ score }: { score: number }) {
  return (
    <div className="flex justify-center">
      <SustainabilityGauge score={score} width={400} />
    </div>
  );
}