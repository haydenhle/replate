// Donation map
// Displays nearby donation locations on Leaflet map and lets users select food bank or shelter

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//Data type for each donation partner shown on the map
export type DonationLocation = {
  id: string;
  name: string;
  type: "Shelter" | "Food Bank" | "Community Fridge";
  address: string;
  lat: number;
  lng: number;
  hours?: string;
};

//Automatically adjusts map view to fit all location markers
function FitToBounds({
  points,
  enabled,
}: {
  points: Array<{ lat: number; lng: number }>;
  enabled: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) return;
    if (points.length === 0) return;

    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, points, enabled]);

  return null;
}

//Moves the map to selected location and opens its popup
function FocusSelected({
  selectedId,
  markerRefs,
  locations,
}: {
  selectedId?: string | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
  locations: DonationLocation[];
}) {
  const map = useMap();

	useEffect(() => {
		if (!selectedId) return;

		const marker = markerRefs.current[selectedId];
		if (!marker) return;

		const ll = marker.getLatLng();
		const targetZoom = Math.max(map.getZoom(), 14);

		// convert to pixel position
		const point = map.project(ll, targetZoom);

		// shift upward 
		const shiftedPoint = point.subtract([0, 100]);

		const shiftedLatLng = map.unproject(shiftedPoint, targetZoom);

		map.flyTo(shiftedLatLng, targetZoom, { duration: 0.5 });

		map.once("moveend", () => {
			marker.openPopup();
		});
	}, [selectedId, map, markerRefs]);

  return null;
}

//Renders donation locations and handles marker interaction
export default function DonationsMap({
  locations,
  selectedId,
  onSelect,
  center,
}: {
  locations: DonationLocation[];
  selectedId?: string | null;
  onSelect: (loc: DonationLocation) => void;
  center?: { lat: number; lng: number };
}) {
  // Fix default marker icons
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  //Stores references to map markers so selected locations can be focused
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  //Builds a simple list of map coordinates for fitting bounds
  const points = useMemo(
    () => locations.map((l) => ({ lat: l.lat, lng: l.lng })),
    [locations]
  );

  // Fallback center
  const fallbackCenter: [number, number] = [
    center?.lat ?? 37.3541,
    center?.lng ?? -121.9552,
  ];

  const [mapKey] = useState(() => Date.now());

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden h-full min-h-[440px] bg-gray-50">
      <MapContainer
        key={mapKey}
        center={fallbackCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* auto-fit when nothing is selected */}
        {locations.length > 0 && (
          <FitToBounds points={points} enabled={!selectedId} />
        )}

        {/* When dropdown changes selectedId, open popup */}
        <FocusSelected
          selectedId={selectedId}
          markerRefs={markerRefs}
          locations={locations}
        />

        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            ref={(ref) => {
              markerRefs.current[loc.id] = ref;
            }}
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