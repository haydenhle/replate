export default function SustainabilityPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10">
        Sustainability Score
      </h1>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#e5ded4] rounded-xl shadow-md p-8 h-[350px] flex items-center justify-center">
          Reference Visual (Score Gauge)
        </div>

        <div className="bg-[#e5ded4] rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">
            Insights
          </h2>
          <p>
            Total waste reduced by X% over the last 6 months
          </p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Waste Reduced" value="37%" />
        <StatCard title="Carbon Savings" value="Y tons" />
        <StatCard title="Meals Donated" value="Z" />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#e5ded4] rounded-xl shadow-md p-6">
      <p className="text-lg mb-2">{title}</p>
      <p className="text-3xl font-semibold">{value}</p>
    </div>
  );
}