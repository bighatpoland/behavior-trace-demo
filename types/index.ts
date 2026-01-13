export type TriggerType =
  | "Boredom"
  | "Stress"
  | "Social Media"
  | "Hunger"
  | "Late Night Scrolling"
  | "Peer Pressure";

export type Currency = "USD" | "EUR" | "PLN";

export interface Purchase {
  id: string;
  itemName: string;
  price: number;
  currency: Currency;
  category: string;
  trigger: TriggerType;
  rating: number; // 1-5 stars
  notes?: string;
  barcode?: string; // Optional barcode
  timestamp: string;
  // Legacy fields for backward compatibility
  date?: string;
  createdAt?: number;
}

export interface BehaviorStats {
  totalSpend: number;
  topTrigger: {
    trigger: TriggerType;
    amount: number;
  } | null;
  triggerBreakdown: Record<TriggerType, number>;
}
