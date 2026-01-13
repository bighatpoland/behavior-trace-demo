/**
 * Impulse Buy Budget Tracer - Main Page
 * Copyright © 2025 Konstancja Tanjga (Big Hat Poland)
 * All rights reserved.
 */

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Purchase } from "@/types";
import { getPurchases } from "@/lib/localStorage";
import PurchaseForm from "@/components/PurchaseForm";
import Dashboard from "@/components/Dashboard";
import SignIn from "@/components/SignIn";
import UserAvatar from "@/components/UserAvatar";
import SignOut from "@/components/SignOut";
import { Brain } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMigrated, setIsMigrated] = useState(false);

  // Fetch purchases from API when authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchPurchases();
      // Check if we need to migrate localStorage data
      migrateLocalStorageIfNeeded();
    } else if (status === "unauthenticated") {
      setIsLoaded(true);
    }
  }, [status, session]);

  const fetchPurchases = async () => {
    try {
      const response = await fetch("/api/purchases");
      if (response.ok) {
        const data = await response.json();
        setPurchases(data);
      }
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  const migrateLocalStorageIfNeeded = async () => {
    if (isMigrated) return;

    const localPurchases = getPurchases();
    if (localPurchases.length > 0) {
      try {
        const response = await fetch("/api/purchases/migrate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ purchases: localPurchases }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`Migrated ${result.migratedCount} purchases to database`);
          // Clear localStorage after successful migration
          localStorage.removeItem("impulse-purchases");
          setIsMigrated(true);
          // Refresh purchases from database
          fetchPurchases();
        }
      } catch (error) {
        console.error("Error migrating purchases:", error);
      }
    }
  };

  const handleAddPurchase = async (purchase: Purchase) => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        const newPurchase = await response.json();
        setPurchases([newPurchase, ...purchases]);
      }
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  const handleDeletePurchase = async (id: string) => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch(`/api/purchases/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPurchases(purchases.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  // Show loading state
  if (status === "loading" || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50">
        <div className="text-center">
          <Brain className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your behavior trace...</p>
        </div>
      </div>
    );
  }

  // Show sign-in page if not authenticated
  if (status === "unauthenticated") {
    return <SignIn />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Impulse Buy Budget Tracer
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track not just your spending, but the psychology behind it. 
            Understand your emotional triggers and take control.
          </p>
          
          {/* User Info and Sign Out */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <UserAvatar />
            <SignOut />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <PurchaseForm onAddPurchase={handleAddPurchase} />
          </div>

          {/* Dashboard Section */}
          <div className="lg:col-span-2">
            <Dashboard
              purchases={purchases}
              onDeletePurchase={handleDeletePurchase}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 pb-4">
          <p>Your data is encrypted and securely stored. Only you can access it.</p>
        </footer>
      </div>
    </main>
  );
}
