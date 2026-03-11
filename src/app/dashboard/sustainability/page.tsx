//Sustainability page
//Displays sustainability score and provide insights

"use client";

import { useState, useEffect } from "react";
import GaugeClient from "./GaugeClient";
import { getWasteLogs, getPickups } from "@/lib/localData";

//Determines sustainability category based on score
function scoreCategory(score: number) {
  if (score >= 78) return "Excellent";
  if (score >= 56) return "Good Standing";
  if (score >= 34) return "Needs Improvement";
  return "Poor";
}

//Returns styling classes for category badge
function categoryPillClasses(category: string) {
  if (category === "Excellent")
    return "bg-green-50 text-green-700 border-green-100";
  if (category === "Good Standing")
    return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (category === "Needs Improvement")
    return "bg-yellow-50 text-yellow-800 border-yellow-100";
  return "bg-red-50 text-red-700 border-red-100";
}

//Renders sustainability dashboard showing score, impact metrics, and insights
export default function SustainabilityPage() {
  //Ensures data is loaded only after component mounts
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  //Load saved waste logs and donation pickups from localStorage
  const wasteLogs = ready ? getWasteLogs() : [];
  const pickups = ready ? getPickups() : [];

  //Calculate sustainability impact metrics
  const totalWaste = wasteLogs.reduce((sum, l) => sum + l.quantity, 0);
  const foodSaved = pickups.length * 20;
  const mealsProvided = Math.round(foodSaved / 1.2);
  const co2Reduced = Math.round(foodSaved * 3.8);

  //Calculate sustainability score based on donations and waste levels
  const rawScore = Math.min(100, Math.max(0, 50 + (pickups.length * 5) - Math.round(totalWaste * 0.3)));
  const score = wasteLogs.length === 0 && pickups.length === 0 ? 0 : rawScore;

  const category = scoreCategory(score);

  return (
    <>
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-700">
          Impact
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Sustainability Score
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          A quick snapshot of your waste reduction impact. Track progress over time and
          see how today’s actions contribute to meals saved and emissions reduced.
        </p>
      </div>

      {/* Top Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Score / Visual */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Sustainability Chart
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                A quick snapshot of your food waste reduction and donation impact. Higher scores indicate stronger sustainability performance.
              </p>
            </div>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${categoryPillClasses(
                category
              )}`}
            >
              {category}
            </span>
          </div>

          {/* Gauge */}
          <div className="mt-8 border border-gray-200 rounded-2xl bg-gray-50 p-6 flex items-center justify-center">
            <GaugeClient score={score} />
          </div>

          {/* Small caption */}
          <p className="mt-3 text-xs text-gray-500">
            Tip: logging waste consistently improves score accuracy.
          </p>
        </div>

        {/* Insights */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Insights
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Highlights based on recent activity.
          </p>

          <div className="mt-6 space-y-4">
            <InsightRow
              title="Waste trend"
              text={totalWaste > 0
                ? `${totalWaste} lbs of waste logged across ${wasteLogs.length} entries.`
                : "No waste logged yet. Start logging to track your trend."}
            />
            <InsightRow
              title="Donation impact"
              text={pickups.length > 0
                ? `${pickups.length} pickup${pickups.length !== 1 ? "s" : ""} scheduled — est. ${mealsProvided} meals provided and ${co2Reduced} kg CO₂ offset.`
                : "No donations yet. Schedule a pickup to start redistributing surplus."}
            />
            <InsightRow
              title="Next improvement"
              text={totalWaste > 50
                ? "Waste is trending high. Try reducing prep on your most-wasted items."
                : "Log surplus by category to identify your biggest source of waste."}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm font-semibold text-green-900">
              Recommended next step
            </p>
            <p className="mt-2 text-sm text-green-900/80">
              Log waste daily this week to generate clearer trends and improve prediction accuracy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

//Component for displaying insight rows
function InsightRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-semibold text-gray-900">
        {title}
      </p>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}