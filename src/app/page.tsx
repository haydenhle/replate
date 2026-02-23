export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-green-50">
        <h1 className="text-5xl font-bold mb-6">
          Replate
        </h1>
        <p className="text-xl max-w-2xl mb-8">
          A food waste tracking and redistribution platform designed 
          for buffet restaurants.
        </p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition">
          Start Tracking Waste
        </button>
      </section>

      {/* Problem Section */}
      <section className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          The Problem
        </h2>
        <p className="text-lg text-gray-700 text-center">
          Buffet restaurants overproduce food to maintain full trays and
          customer satisfaction. This often results in 30–50% of prepared food
          being discarded daily — leading to financial loss and increased
          greenhouse gas emissions.
        </p>
      </section>

      {/* Solution Section */}
      <section className="px-8 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Our Solution
          </h2>
          <p className="text-lg text-gray-700">
            Replate helps restaurants track food waste, coordinate donations,
            monitor composting, and measure sustainability impact — turning
            waste reduction into a competitive advantage.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2026 Replate. Reducing waste, restoring value.
      </footer>

    </main>
  );
}