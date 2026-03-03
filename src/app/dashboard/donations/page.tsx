// src/app/dashboard/donations/page.tsx

export default function DonationsPage() {
  return (
    <>
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-700">
          Redistribution
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Donations
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          Route surplus food to shelters and food banks. Schedule pickups and track what’s
          being collected today.
        </p>
      </div>

      {/* Donation Locations */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Donation Locations
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              View nearby partners and schedule a pickup in seconds.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 rounded-2xl h-[320px] bg-gray-50 flex items-center justify-center text-gray-500 text-sm">
              Map with Donation Locations
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Prototype: map embed can be added later (Google Maps iframe).
            </p>
          </div>

          {/* Schedule Pickup */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Schedule Pickup
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Enter the food details and choose a partner.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Food Type
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a type
                    </option>
                    <option>Prepared Meals</option>
                    <option>Produce</option>
                    <option>Baked Goods</option>
                    <option>Dairy</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Item
                  </label>
                  <input
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    placeholder="Ex: Pasta"
                  />
                </div>

                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white
                    hover:bg-green-800 active:scale-[0.98] transition shadow-sm"
                >
                  Schedule Pickup
                </button>

                <p className="text-xs text-gray-500">
                  Prototype: this button can add a row to “Pickups Today” later using localStorage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pickups Today */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Pickups Today
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track today’s scheduled pickups and their status.
            </p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700 border-b border-gray-200">
                  Pickup Time
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 border-b border-gray-200">
                  Food Bank
                </th>
                <th className="text-left p-4 font-semibold text-gray-700 border-b border-gray-200">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50 transition">
                <td className="p-4 border-b border-gray-200 text-gray-800">
                  10:00am
                </td>
                <td className="p-4 border-b border-gray-200 text-gray-800">
                  Santa Clara Shelter
                </td>
                <td className="p-4 border-b border-gray-200">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-100">
                    Confirmed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-3 text-xs text-gray-500">
            Prototype data shown for demo purposes.
          </p>
        </div>
      </div>
    </>
  );
}