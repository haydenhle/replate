"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const devBypass =
      process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

    if (!devBypass && !auth?.currentUser) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#d8d1c7] px-8 py-10">
      
      {/* Page Title */}
      <h1 className="text-4xl font-semibold mb-10">
        Surplus Forecast
      </h1>

      {/* Top Metric Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <MetricCard
          title="Predicted Surplus"
          value="X lbs"
        />
        <MetricCard
          title="Estimated Waste Cost"
          value="$Y"
        />
        <MetricCard
          title="CO₂ Saved This Month"
          value="Z kg"
        />
      </div>

      {/* Graph Section */}
      <section className="bg-[#e5ded4] rounded-2xl shadow-md p-8 mb-14">
        <h2 className="text-2xl font-semibold mb-6">
          Graph
        </h2>

        <div className="flex gap-8">
          <div className="flex-1 border border-gray-400 h-[350px] flex items-center justify-center bg-white">
            Graph with made up statistical data
          </div>

          <div className="w-[220px]">
            <h3 className="font-semibold mb-3">
              Legend:
            </h3>
            <ul className="space-y-2 text-sm">
              {Array.from({ length: 8 }).map((_, i) => (
                <li
                  key={i}
                  className={`px-3 py-1 ${
                    i % 2 === 0
                      ? "bg-[#bcaea0] text-white"
                      : "bg-[#f2ede6]"
                  }`}
                >
                  new value {i + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Donations Pickups Section */}
      <section className="bg-[#e5ded4] rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6">
          Donations Pickups
        </h2>

        <div className="flex gap-8">
          <div className="flex-1 border border-gray-400 h-[250px] flex items-center justify-center bg-white">
            Chart with made up statistical data
          </div>

          <div className="w-[220px]">
            <h3 className="font-semibold mb-3">
              Legend:
            </h3>
            <ul className="space-y-2 text-sm">
              {Array.from({ length: 8 }).map((_, i) => (
                <li
                  key={i}
                  className={`px-3 py-1 ${
                    i % 2 === 0
                      ? "bg-[#bcaea0] text-white"
                      : "bg-[#f2ede6]"
                  }`}
                >
                  new value {i + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Reusable Metric Card */
function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#e5ded4] rounded-xl shadow-md p-6">
      <p className="text-lg mb-3">
        {title}
      </p>
      <p className="text-4xl font-semibold">
        {value}
      </p>
    </div>
  );
}