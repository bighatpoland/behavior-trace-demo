import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { migratePurchasesToDatabase } from "@/lib/storage";
import { Purchase } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const purchases: Purchase[] = body.purchases || [];

    const migratedCount = await migratePurchasesToDatabase(
      session.user.id,
      purchases
    );

    return NextResponse.json({
      success: true,
      migratedCount,
      message: `Successfully migrated ${migratedCount} purchases`,
    });
  } catch (error) {
    console.error("Error migrating purchases:", error);
    return NextResponse.json(
      { error: "Failed to migrate purchases" },
      { status: 500 }
    );
  }
}
