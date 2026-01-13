import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPurchasesByUserId, createPurchase } from "@/lib/storage";
import { Purchase } from "@/types";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchases = await getPurchasesByUserId(session.user.id);
    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const purchase: Omit<Purchase, "id"> = {
      itemName: body.itemName,
      price: body.price,
      currency: body.currency,
      category: body.category,
      trigger: body.trigger,
      rating: body.rating,
      notes: body.notes,
      barcode: body.barcode,
      timestamp: body.timestamp,
    };

    const created = await createPurchase(session.user.id, purchase);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating purchase:", error);
    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    );
  }
}
