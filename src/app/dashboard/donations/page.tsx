"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { DonationLocation } from "../../../components/DonationMap";

const DonationsMap = dynamic(
  () => import("../../../components/DonationMap"),
  { ssr: false }
);

export default function DonationsPage() {
  // Demo locations near Santa Clara (replace with your real list later)
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
      hours: "Mon-Fri 8am–5pm",
      },
      {
      id: "sunnyvale-community-services",
      name: "Sunnyvale Community Services",
      type: "Food Bank",
      address: "1160 Kern Ave, Sunnyvale, CA 94085",
      lat: 37.38453341198109,
      lng: -121.99667603496161,
      hours: "Mon-Fri 9am–12pm, 12:30-4pm",
      },
      {
      id: "westvalley-community-services",
      name: "West Valley Community Services",
      type: "Food Bank",
      address: "10104 Vista Dr, Cupertino, CA 95014",
      lat: 37.329013894182886,
      lng: -122.02809846216017,
      hours: "Mon-Wed & Fri 8am–12pm, 1-5pm, Thur 8am–12pm, 1-8pm",
      },
    ],
    []
  );

  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const selectedPartner = locations.find((l) => l.id === selectedPartnerId) || null;

  return (
    <>
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-green-700">Redistribution</p>

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Donations
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          Route surplus food to shelters and food banks. Schedule pickups and track what’s being
          collected today.
        </p>
      </div>

      {/* Donation Locations */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Donation Locations</h2>
            <p className="mt-2 text-sm text-gray-600">
              View nearby partners and schedule a pickup in seconds.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Map */}
          <div className="lg:col-span-2">
            <DonationsMap
              locations={locations}
              selectedId={selectedPartnerId}
              onSelect={(loc) => setSelectedPartnerId(loc.id)}
            />

            <p className="mt-3 text-xs text-gray-500">
              Tip: drag to move the map. Use scroll / trackpad to zoom.
            </p>
          </div>

          {/* Schedule Pickup */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900">Schedule Pickup</h3>
              <p className="mt-2 text-sm text-gray-600">
                Enter the food details and choose a partner.
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Partner
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm
                      focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-700 transition"
                    value={selectedPartnerId ?? ""}
                    onChange={(e) => setSelectedPartnerId(e.target.value || null)}
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

                  {selectedPartner && (
                    <p className="mt-2 text-xs text-gray-500">
                      Selected: {selectedPartner.address}
                    </p>
                  )}
                </div>

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
                  disabled={!selectedPartnerId}
                  className={`w-full inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-white
                    active:scale-[0.98] transition shadow-sm
                    ${
                      selectedPartnerId
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  Schedule Pickup
                </button>

                <p className="text-xs text-gray-500">
                  Prototype: clicking a map marker selects a partner.
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
            <h2 className="text-xl font-bold text-gray-900">Pickups Today</h2>
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
                <td className="p-4 border-b border-gray-200 text-gray-800">10:00am</td>
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

          <p className="mt-3 text-xs text-gray-500">Prototype data shown for demo purposes.</p>
        </div>
      </div>
    </>
  );
}