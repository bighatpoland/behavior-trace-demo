import { Purchase, BehaviorStats, TriggerType } from "@/types";

export const calculateStats = (purchases: Purchase[]): BehaviorStats => {
  const totalSpend = purchases.reduce((sum, p) => sum + p.price, 0);
  
  const triggerBreakdown: Record<TriggerType, number> = {
    Boredom: 0,
    Stress: 0,
    "Social Media": 0,
    Hunger: 0,
    "Late Night Scrolling": 0,
    "Peer Pressure": 0,
  };

  purchases.forEach((purchase) => {
    triggerBreakdown[purchase.trigger] += purchase.price;
  });

  let topTrigger: { trigger: TriggerType; amount: number } | null = null;
  let maxAmount = 0;

  (Object.keys(triggerBreakdown) as TriggerType[]).forEach((trigger) => {
    if (triggerBreakdown[trigger] > maxAmount) {
      maxAmount = triggerBreakdown[trigger];
      topTrigger = { trigger, amount: maxAmount };
    }
  });

  return {
    totalSpend,
    topTrigger,
    triggerBreakdown,
  };
};

export const formatCurrency = (amount: number, currency: string = "USD"): string => {
  const localeMap: Record<string, string> = {
    USD: "en-US",
    EUR: "de-DE",
    PLN: "pl-PL",
  };
  
  return new Intl.NumberFormat(localeMap[currency] || "en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
