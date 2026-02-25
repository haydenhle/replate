export default function LogWastePage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-10">
        Waste Logging
      </h1>

      <div className="bg-[#e5ded4] rounded-xl shadow-md p-8 max-w-xl">
        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Food Item
            </label>
            <input
              type="text"
              className="w-full border rounded-md p-3"
              placeholder="Ex: Pasta"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Quantity Wasted (lbs)
            </label>
            <input
              type="number"
              className="w-full border rounded-md p-3"
              placeholder="Ex: 25"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Waste Type
            </label>
            <select className="w-full border rounded-md p-3">
              <option>Buffet Surplus</option>
              <option>Plate Waste</option>
              <option>Spoilage</option>
            </select>
          </div>

          <button className="bg-[#2f4f2f] text-white px-6 py-3 rounded-md">
            Log Waste
          </button>
        </form>
      </div>
    </div>
  );
}