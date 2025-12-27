/**
 * Impulse Buy Budget Tracer - Main Page
 * Copyright © 2025 Konstancja Tanjga (Big Hat Poland)
 * All rights reserved.
 */

"use client";

import { useState, useEffect } from "react";
import { Purchase } from "@/types";
import { getPurchases, addPurchase, deletePurchase } from "@/lib/localStorage";
import PurchaseForm from "@/components/PurchaseForm";
import Dashboard from "@/components/Dashboard";
import { Brain } from "lucide-react";

export default function Home() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPurchases(getPurchases());
    setIsLoaded(true);
  }, []);

  const handleAddPurchase = (purchase: Purchase) => {
    const updated = addPurchase(purchase);
    setPurchases(updated);
  };

  const handleDeletePurchase = (id: string) => {
    const updated = deletePurchase(id);
    setPurchases(updated);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-amber-50">
        <div className="text-center">
          <Brain className="w-16 h-16 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your behavior trace...</p>
        </div>
      </div>
    );
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
          <p>Your data is stored locally in your browser. No server, no tracking.</p>
        </footer>
      </div>
    </main>
  );
}
