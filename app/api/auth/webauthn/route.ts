import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Get WebAuthn credentials for user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const credentials = await (prisma as any).webAuthnCredential.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        deviceName: true,
        createdAt: true,
        lastUsedAt: true,
      },
    });

    return NextResponse.json(credentials);
  } catch (error) {
    console.error("Error fetching WebAuthn credentials:", error);
    return NextResponse.json(
      { error: "Failed to fetch credentials" },
      { status: 500 }
    );
  }
}

// Register WebAuthn credential
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { credentialId, publicKey, deviceName } = body;

    if (!credentialId || !publicKey) {
      return NextResponse.json(
        { error: "Credential data required" },
        { status: 400 }
      );
    }

    const credential = await (prisma as any).webAuthnCredential.create({
      data: {
        userId: session.user.id,
        credentialId,
        publicKey,
        deviceName: deviceName || "Unknown Device",
      },
    });

    return NextResponse.json({
      success: true,
      credential: {
        id: credential.id,
        deviceName: credential.deviceName,
      },
    });
  } catch (error) {
    console.error("Error registering WebAuthn credential:", error);
    return NextResponse.json(
      { error: "Failed to register credential" },
      { status: 500 }
    );
  }
}

// Delete WebAuthn credential
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const credentialId = searchParams.get("id");

    if (!credentialId) {
      return NextResponse.json(
        { error: "Credential ID required" },
        { status: 400 }
      );
    }

    await (prisma as any).webAuthnCredential.delete({
      where: {
        id: credentialId,
        userId: session.user.id, // Ensure user can only delete their own
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting WebAuthn credential:", error);
    return NextResponse.json(
      { error: "Failed to delete credential" },
      { status: 500 }
    );
  }
}
