export type WasteLog = {
  id: string;
  foodItem: string;
  quantity: number;
  wasteType: string;
  time: string;
};

export type Pickup = {
  id: string;
  partnerName: string;
  time: string;
  status: "Scheduled";
};

export function getWasteLogs(): WasteLog[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wasteLogs") || "[]");
}

export function saveWasteLog(log: WasteLog) {
  const logs = getWasteLogs();
  localStorage.setItem("wasteLogs", JSON.stringify([log, ...logs]));
}

export function getPickups(): Pickup[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("pickups") || "[]");
}

export function savePickup(pickup: Pickup) {
  const pickups = getPickups();
  localStorage.setItem("pickups", JSON.stringify([pickup, ...pickups]));
}