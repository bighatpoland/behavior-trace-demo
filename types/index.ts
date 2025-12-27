export type TriggerType =
  | "Boredom"
  | "Stress"
  | "Social Media"
  | "Hunger"
  | "Late Night Scrolling"
  | "Peer Pressure";

export interface Purchase {
  id: string;
  itemName: string;
  price: number;
  date: string;
  trigger: TriggerType;
  rating: number; // 1-5 stars
  barcode?: string; // Optional barcode
  createdAt: number;
}

export interface BehaviorStats {
  totalSpend: number;
  topTrigger: {
    trigger: TriggerType;
    amount: number;
  } | null;
  triggerBreakdown: Record<TriggerType, number>;
}
