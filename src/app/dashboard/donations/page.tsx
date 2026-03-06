"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { DonationLocation } from "../../../components/DonationMap";
import { savePickup, getPickups, type Pickup } from "@/lib/localData";

const DonationsMap = dynamic(
  () => import("../../../components/DonationMap"),
  { ssr: false }
);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
}

export default function DonationsPage() {
  const locations = useMemo<DonationLocation[]>(
    () => [
      {
        id: "st-clare-st-vincent",
        name: "Saint Clare–St. Vincent de Paul - Food Distribution Center",
        type: "Food Bank",
        address: "941 Lexington St, Santa Clara, CA",
        lat: 37.3501583645504,
        lng: -121.93732705842042,
        hours: "Call for hours",
      },
      {
        id: "river-of-life-pantry",
        name: "River of Life Foundation Food Pantry",
        type: "Food Bank",
        address: "1177 Laurelwood Rd, Santa Clara, CA",
        lat: 37.382958633344444,
        lng: -121.94813013831478,
        hours: "Tue & Thu 9:30am–12:30pm, Fri 11am–1pm, Sun 1–4pm",
      },
      {
        id: "sacred-heart-community-service",
        name: "Sacred Heart Community Service - Food Distribution Center",
        type: "Food Bank",
        address: "1381 S 1st St, San Jose, CA",
        lat: 37.31869523165384,
        lng: -121.87469347161725,
        hours: "Mon–Thu 9am–4pm, Fri 9am–12pm",
      },
      {
        id: "bill-wilson-center",
        name: "Bill Wilson Center Shelter",
        type: "Shelter",
        address: "3490 The Alameda, Santa Clara, CA",
        lat: 37.35670296674288,
        lng: -121.94140107319934,
        hours: "Mon–Fri 8am–5pm",
      },
      {
        id: "sunnyvale-community-services",
        name: "Sunnyvale Community Services",
        type: "Food Bank",
        address: "1160 Kern Ave, Sunnyvale, CA 94085",
        lat: 37.38453341198109,
        lng: -121.99667603496161,
        hours: "Mon–Fri 9am–12pm, 12:30–4pm",
      },
      {
        id: "westvalley-community-services",
        name: "West Valley Community Services",
        type: "Food Bank",
        address: "10104 Vista Dr, Cupertino, CA 95014",
        lat: 37.329013894182886,
        lng: -122.02809846216017,
        hours: "Mon–Wed & Fri 8am–12pm, 1–5pm, Thu 1–8pm",
      },
    ],
    []
  );

  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [foodType, setFoodType] = useState("");
  const [buffetLocation, setBuffetLocation] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("buffetLocation") || "";
  });
  const [item, setItem] = useState("");
  const [pickupDate, setPickupDate] = useState(todayISO());

  // pickup time dropdown
  const pickupTimeOptions = [
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
  const [pickupTime, setPickupTime] = useState(pickupTimeOptions[0]);

  // Load from localStorage
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPickups(getPickups());
    setMounted(true);
  }, []);

  const selectedPartner =
    locations.find((l) => l.id === selectedPartnerId) || null;

  const handleSchedulePickup = () => {
    if (!selectedPartner || !foodType || !item || !buffetLocation.trim()) {
      alert("Please complete all fields.");
      return;
    }

    const newPickup: Pickup = {
      id: Date.now().toString(),
      partnerName: selectedPartner.name,
      buffetLocation: buffetLocation.trim(),
      itemDescription: item.trim(),
      date: pickupDate,
      time: pickupTime, // NEW
      status: "Scheduled",
    };

    // Save to localStorage
    savePickup(newPickup);

    // Reload state from storage
    setPickups(getPickups());

    setSelectedPartnerId(null);
    setFoodType("");
    localStorage.setItem("buffetLocation", buffetLocation.trim());
    setItem("");
    setPickupDate(todayISO());
    setPickupTime(pickupTimeOptions[0]);
  };

  return (
    <>
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-700">Redistribution</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Donations
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          Select a nearby food bank or shelter on the map, choose what you&apos;re donating, and schedule a pickup.
        </p>
      </div>

      {/* Locations + Form */}
      <div className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-sm px-8 pt-0 pb-8">
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          <div className="lg:col-span-2 h-full">
            {mounted ? (
              <DonationsMap
                locations={locations}
                selectedId={selectedPartnerId}
                onSelect={(loc) => setSelectedPartnerId(loc.id)}
              />
            ) : (
              <div className="border border-gray-200 rounded-2xl bg-gray-50 h-full min-h-[440px]" />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6 h-full">
              <h3 className="text-lg font-bold text-gray-900">
                Schedule Pickup
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Donation Location</label>
                  <select
                    value={selectedPartnerId ?? ""}
                    onChange={(e) => setSelectedPartnerId(e.target.value || null)}
                    className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition ${selectedPartnerId ? "text-gray-900" : "text-gray-400"}`}
                  >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.type})
                    </option>
                  ))}
                </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Food Type</label>
                  <select
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                    className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition ${foodType ? "text-gray-900" : "text-gray-400"}`}
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
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Buffet Location</label>
                  <input
                    value={buffetLocation}
                    onChange={(e) => setBuffetLocation(e.target.value)}
                    placeholder="Ex: 500 El Camino Real, Santa Clara"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition"
                  />
                  <p className="mt-1 px-4 text-xs text-gray-400">
                    Only used to coordinate volunteer pickup.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Item Description</label>
                  <input
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Ex: 20 lbs pasta, soup containers"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Pickup Time
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
                  >
                    {pickupTimeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSchedulePickup}
                  disabled={!selectedPartnerId}
                  className={`w-full rounded-xl px-6 py-3 text-sm font-bold text-white
                    ${
                      selectedPartnerId
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}>
                  Schedule Pickup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pickups This Month */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900">
          Pickups This Month
        </h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-800 border-b w-[180px]">Pickup Time</th>
                <th className="p-4 text-left font-semibold text-gray-800 border-b w-[320px]">Food Bank</th>
                <th className="p-4 text-left font-semibold text-gray-800 border-b w-[200px]">Item Description</th>
                <th className="p-4 text-left font-semibold text-gray-800 border-b w-[150px]">Status</th>
              </tr>
            </thead>

            <tbody>
          {!mounted ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">
                Loading…
              </td>
            </tr>
          ) : pickups.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-400">
                No pickups scheduled yet. Select a location above to get started.
              </td>
            </tr>
          ) : (
            pickups.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-4 border-b text-gray-700">
                  {p.time}
                  {p.date ? (
                    <span className="text-gray-400"> · {formatDate(p.date)}</span>
                  ) : null}
                </td>

                <td className="p-4 border-b text-gray-900 font-medium">{p.partnerName}</td>

                <td className="p-4 border-b text-gray-700">
                  {p.itemDescription ? p.itemDescription : <span className="text-gray-400">—</span>}
                </td>

                <td className="p-4 border-b">
                  <span className="bg-yellow-50 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full border border-yellow-200">
                    {p.status}
                  </span>
                </td>
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