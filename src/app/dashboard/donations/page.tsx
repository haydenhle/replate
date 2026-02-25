export default function DonationsPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10">
        Donations
      </h1>

      <div className="bg-[#e5ded4] rounded-xl shadow-md p-8 mb-10">
        <h2 className="text-2xl font-semibold mb-6">
          Donation Locations
        </h2>

        <div className="flex gap-8">
          <div className="flex-1 border h-[300px] flex items-center justify-center bg-white">
            Map with Donation Locations
          </div>

          <div className="w-[300px] space-y-4">
            <select className="w-full border rounded-md p-3">
              <option>Food Type</option>
            </select>

            <input
              className="w-full border rounded-md p-3"
              placeholder="Item (ex: Pasta)"
            />

            <button className="bg-[#2f4f2f] text-white px-6 py-3 rounded-md w-full">
              Schedule Pickup
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#e5ded4] rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Pickups Today
        </h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Pickup Time</th>
              <th className="p-3 border">Food Bank</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border">10:00am</td>
              <td className="p-3 border">Santa Clara Shelter</td>
              <td className="p-3 border text-green-600">
                Confirmed
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}