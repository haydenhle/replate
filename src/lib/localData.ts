//Local data utilities for Replate
//Defines data types for saving and retrieving waste logs and donation pickups using localStorage

//Data structure for a food waste log entry
export type WasteLog = {
  id: string;
  buffetName?: string;
  foodItem: string;
  quantity: number;
  wasteType: string;
  time: string;
  date?: string;
};

//Data structure for a scheduled donation pickup
export type Pickup = {
  id: string;
  partnerName: string;
  buffetLocation?: string;
  itemDescription?: string;
  time: string;
  date?: string;
  status: "Scheduled";
};

//Retrieves all saved waste logs from localStorage
export function getWasteLogs(): WasteLog[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wasteLogs") || "[]");
}

//Saves a new waste log entry to localStorage
export function saveWasteLog(log: WasteLog) {
  const logs = getWasteLogs();
  localStorage.setItem("wasteLogs", JSON.stringify([log, ...logs]));
}

//Retrieves all scheduled donation pickups from localStorage
export function getPickups(): Pickup[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("pickups") || "[]");
}

//Saves a new donation pickup to localStorage
export function savePickup(pickup: Pickup) {
  const pickups = getPickups();
  localStorage.setItem("pickups", JSON.stringify([pickup, ...pickups]));
}