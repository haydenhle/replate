"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

export type DonationLocation = {
  id: string;
  name: string;
  type: "Shelter" | "Food Bank" | "Community Fridge";
  address: string;
  lat: number;
  lng: number;
  hours?: string;
};

function FitToBounds({ points }: { points: Array<{ lat: number; lng: number }> }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, points]);

  return null;
}

export default function DonationsMap({
  locations,
  selectedId,
  onSelect,
}: {
  locations: DonationLocation[];
  selectedId?: string | null;
  onSelect: (loc: DonationLocation) => void;
}) {
  // Fix default marker icons in Next.js (use CDN images)
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  const points = useMemo(
    () => locations.map((l) => ({ lat: l.lat, lng: l.lng })),
    [locations]
  );

  // Fallback center if locations missing
  const fallbackCenter: [number, number] = [37.3541, -121.9552];

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden h-[320px] bg-gray-50">
      <MapContainer
        center={fallbackCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        {/* OpenStreetMap tiles */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto-fit map view to show all markers */}
        {locations.length > 0 && <FitToBounds points={points} />}

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            eventHandlers={{
              click: () => onSelect(loc),
            }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{loc.name}</div>
                <div className="text-xs text-gray-600">{loc.type}</div>
                <div className="text-xs">{loc.address}</div>
                {loc.hours && (
                  <div className="text-xs text-gray-600">Hours: {loc.hours}</div>
                )}

                <button
                  type="button"
                  onClick={() => onSelect(loc)}
                  className={`mt-2 w-full rounded-lg px-3 py-2 text-xs font-semibold transition
                    ${
                      selectedId === loc.id
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                >
                  {selectedId === loc.id ? "Selected" : "Select Partner"}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}