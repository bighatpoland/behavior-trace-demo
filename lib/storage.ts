import { prisma } from "@/lib/db";
import { Purchase } from "@/types";

// Server-side functions for authenticated users
export const getPurchasesByUserId = async (userId: string): Promise<Purchase[]> => {
  const purchases = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" },
  });

  return purchases.map((p) => ({
    id: p.id,
    itemName: p.itemName,
    price: p.price,
    currency: p.currency as any,
    category: p.category,
    trigger: p.trigger as any,
    rating: p.rating,
    notes: p.notes || undefined,
    barcode: p.barcode || undefined,
    timestamp: p.timestamp.toISOString(),
  }));
};

export const createPurchase = async (
  userId: string,
  purchase: Omit<Purchase, "id">
): Promise<Purchase> => {
  const created = await prisma.purchase.create({
    data: {
      userId,
      itemName: purchase.itemName,
      price: purchase.price,
      currency: purchase.currency,
      category: purchase.category,
      trigger: purchase.trigger,
      rating: purchase.rating,
      notes: purchase.notes,
      barcode: purchase.barcode,
      timestamp: new Date(purchase.timestamp),
    },
  });

  return {
    id: created.id,
    itemName: created.itemName,
    price: created.price,
    currency: created.currency as any,
    category: created.category,
    trigger: created.trigger as any,
    rating: created.rating,
    notes: created.notes || undefined,
    barcode: created.barcode || undefined,
    timestamp: created.timestamp.toISOString(),
  };
};

export const deletePurchaseById = async (
  userId: string,
  purchaseId: string
): Promise<void> => {
  await prisma.purchase.delete({
    where: {
      id: purchaseId,
      userId, // Ensure user can only delete their own purchases
    },
  });
};

// Migration function to move localStorage data to database
export const migratePurchasesToDatabase = async (
  userId: string,
  purchases: Purchase[]
): Promise<number> => {
  let migratedCount = 0;

  for (const purchase of purchases) {
    try {
      await prisma.purchase.create({
        data: {
          id: purchase.id, // Keep the same ID
          userId,
          itemName: purchase.itemName,
          price: purchase.price,
          currency: purchase.currency,
          category: purchase.category,
          trigger: purchase.trigger,
          rating: purchase.rating,
          notes: purchase.notes,
          barcode: purchase.barcode,
          timestamp: new Date(purchase.timestamp),
        },
      });
      migratedCount++;
    } catch (error) {
      console.error(`Failed to migrate purchase ${purchase.id}:`, error);
    }
  }

  return migratedCount;
};
