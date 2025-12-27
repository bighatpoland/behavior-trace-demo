import { Purchase } from "@/types";

const STORAGE_KEY = "impulse-purchases";

export const getPurchases = (): Purchase[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const savePurchases = (purchases: Purchase[]): void => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const addPurchase = (purchase: Purchase): Purchase[] => {
  const purchases = getPurchases();
  const updated = [purchase, ...purchases];
  savePurchases(updated);
  return updated;
};

export const deletePurchase = (id: string): Purchase[] => {
  const purchases = getPurchases();
  const updated = purchases.filter((p) => p.id !== id);
  savePurchases(updated);
  return updated;
};
