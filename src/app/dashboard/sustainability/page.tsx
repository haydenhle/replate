// src/app/dashboard/sustainability/page.tsx

export default function SustainabilityPage() {
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
                Current Score
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Prototype visual (gauge can be replaced with a real chart later).
              </p>
            </div>

            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
              Good Standing
            </span>
          </div>

          {/* Gauge Placeholder */}
          <div className="mt-8 border border-gray-200 rounded-2xl bg-gray-50 h-[300px] flex items-center justify-center text-gray-500 text-sm">
            Reference Visual (Score Gauge)
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
              text="Total waste reduced by X% over the last 6 months."
            />
            <InsightRow
              title="Donation impact"
              text="Donations helped provide meals to local shelters and food banks."
            />
            <InsightRow
              title="Next improvement"
              text="Try logging surplus by category to identify your biggest source of waste."
            />
          </div>

          <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5">
            <p className="text-sm font-semibold text-green-900">
              Recommended next step
            </p>
            <p className="mt-2 text-sm text-green-900/80">
              Log waste daily this week to unlock a clearer trend line and more accurate
              predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Waste Reduced" value="37%" subtitle="last 6 months" />
        <StatCard title="Carbon Savings" value="Y tons" subtitle="estimated offset" />
        <StatCard title="Meals Donated" value="Z" subtitle="to local partners" />
      </div>
    </>
  );
}

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

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <p className="text-sm font-semibold text-gray-700">
        {title}
      </p>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
        {value}
      </p>
      <p className="mt-2 text-xs text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}