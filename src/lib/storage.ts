// Utility functions for saving and loading JSON data from browser localStorage

//Loads JSON data from localStorage using the given key
export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

//Saves a JavaScript value to localStorage as JSON
export function saveJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}