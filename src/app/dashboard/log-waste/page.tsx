"use client";

import { useEffect, useState } from "react";
import {
  getWasteLogs,
  saveWasteLog,
  type WasteLog,
} from "@/lib/localData";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
}

function getSavedBuffetNames(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("buffetNames") || "[]";
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveBuffetName(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return;
  const existing = getSavedBuffetNames();
  if (existing.some((n) => n.toLowerCase() === trimmed.toLowerCase())) return;
  localStorage.setItem("buffetNames", JSON.stringify([trimmed, ...existing]));
}

export default function LogWastePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [buffetName, setBuffetName] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [wasteType, setWasteType] = useState("Buffet Surplus");
  const [logDate, setLogDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [buffetNames, setBuffetNames] = useState<string[]>(() => getSavedBuffetNames());

  const wasteTimeOptions = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const [wasteTime, setWasteTime] = useState(wasteTimeOptions[0]);

  // Load from localStorage
  const [logs, setLogs] = useState<WasteLog[]>(() => getWasteLogs());

  const handleSubmit = async () => {
    if (!foodItem || !quantity) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const newLog: WasteLog = {
      id: Date.now().toString(),
      buffetName,
      foodItem,
      quantity: Number(quantity),
      wasteType,
      date: logDate,
      time: wasteTime,
    };

    // Save to localStorage
    saveWasteLog(newLog);

    // Save buffet name for next time
    if (buffetName.trim()) {
      saveBuffetName(buffetName);
      setBuffetNames(getSavedBuffetNames());
    }

    // Reload from storage
    setLogs(getWasteLogs());

    setBuffetName(buffetName.trim());
    setFoodItem("");
    setQuantity("");
    setWasteType("Buffet Surplus");
    setLogDate(todayISO());
    setSuccess(true);
    setLoading(false);
  };

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
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Buffet Name
                </label>
                <input
                  type="text"
                  list="buffet-names"
                  value={buffetName}
                  onChange={(e) => setBuffetName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                  placeholder="Ex: Campus Buffet"
                />
                <datalist id="buffet-names">
                  {mounted
                    ? buffetNames.map((n) => <option key={n} value={n} />)
                    : null}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Food Item
                </label>
                <input
                  type="text"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
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
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
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
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                >
                  <option>Buffet Surplus</option>
                  <option>Plate Waste</option>
                  <option>Spoilage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                    focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Time
                </label>
                <select
                  value={wasteTime}
                  onChange={(e) => setWasteTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition"
                >
                  {wasteTimeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white
                    hover:bg-green-800 active:scale-[0.98] transition shadow-sm disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Log Waste"}
                </button>
              </div>

              {success && (
                <p className="text-green-700 text-sm font-semibold mt-2">
                  Waste logged successfully!
                </p>
              )}
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
          </div>
        </div>
      </div>

      {/* Waste Log Table */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Recent Waste Entries
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left border-b w-[220px]">Time</th>
                <th className="p-4 text-left border-b w-[200px]">Buffet Name</th>
                <th className="p-4 text-left border-b w-[200px]">Food Item</th>
                <th className="p-4 text-left border-b w-[150px]">Quantity</th>
                <th className="p-4 text-left border-b w-[200px]">Type</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No waste logged yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">
                      {log.time}
                      {log.date ? (
                        <span className="text-gray-400"> · {formatDate(log.date)}</span>
                      ) : null}
                    </td>

                    <td className="p-4 border-b text-gray-900">
                      {log.buffetName ? log.buffetName : <span className="text-gray-400">—</span>}
                    </td>

                    <td className="p-4 border-b">{log.foodItem}</td>
                    <td className="p-4 border-b">{log.quantity} lbs</td>
                    <td className="p-4 border-b">{log.wasteType}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}