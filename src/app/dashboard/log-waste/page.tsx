// src/app/dashboard/log-waste/page.tsx

export default function LogWastePage() {
  return (
    <>
        {/* Header */}
        <div>
          <p className="text-sm font-semibold text-green-700">
            Waste Tracking
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Waste Logging
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
            Log surplus food by item, quantity, and type. This helps Replate track patterns
            and improve future waste predictions.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Food Item
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    placeholder="Ex: Pasta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Quantity Wasted (lbs)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    placeholder="Ex: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Waste Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    defaultValue="Buffet Surplus"
                  >
                    <option>Buffet Surplus</option>
                    <option>Plate Waste</option>
                    <option>Spoilage</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white
                      hover:bg-green-800 active:scale-[0.98] transition shadow-sm"
                  >
                    Log Waste
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Tips Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <h2 className="text-lg font-bold text-gray-900">
                Tips
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Keep entries consistent so your dashboard trends stay accurate.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>• Use clear names like “rice”, “pasta”, “chicken”.</li>
                <li>• Enter pounds (lbs) for the quantity wasted.</li>
                <li>• Pick the waste type that best matches the cause.</li>
              </ul>

              <div className="mt-6 rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm text-green-900 font-semibold">
                  Example entry
                </p>
                <p className="mt-2 text-sm text-green-900/80">
                  Food Item: Pasta <br />
                  Quantity: 25 lbs <br />
                  Type: Buffet Surplus
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}