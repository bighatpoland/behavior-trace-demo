"use client";

import { Purchase } from "@/types";
import { calculateStats, formatCurrency } from "@/lib/utils";
import { TrendingUp, Brain, Trash2, Barcode } from "lucide-react";
import StarRating from "./StarRating";

interface DashboardProps {
  purchases: Purchase[];
  onDeletePurchase: (id: string) => void;
}

export default function Dashboard({ purchases, onDeletePurchase }: DashboardProps) {
  const stats = calculateStats(purchases);

  if (purchases.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-rose-100 text-center">
        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No purchases tracked yet
        </h3>
        <p className="text-gray-500">
          Start logging your impulse buys to see your behavior patterns
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Spend Card */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-700">Total Impulse Spend</h3>
          </div>
          <p className="text-4xl font-bold text-amber-700">
            {formatCurrency(stats.totalSpend)}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Across {purchases.length} {purchases.length === 1 ? "purchase" : "purchases"}
          </p>
        </div>

        {/* Top Trigger Card */}
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl shadow-lg p-6 border border-rose-200">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-6 h-6 text-rose-600" />
            <h3 className="text-lg font-semibold text-gray-700">Top Emotional Trigger</h3>
          </div>
          {stats.topTrigger ? (
            <>
              <p className="text-3xl font-bold text-rose-700 mb-1">
                {stats.topTrigger.trigger}
              </p>
              <p className="text-xl font-semibold text-rose-600">
                {formatCurrency(stats.topTrigger.amount)}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No data yet</p>
          )}
        </div>
      </div>

      {/* Behavior Trace List */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Behavior Trace</h3>
        <p className="text-gray-600 mb-6">
          Understanding the connection between your emotions and spending
        </p>
        
        <div className="space-y-3">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl p-4 border border-amber-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {purchase.itemName}
                    </span>
                    <span className="text-lg font-bold text-amber-600">
                      {formatCurrency(purchase.price)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Triggered by:</span>{" "}
                    <span className="text-rose-600 font-semibold">{purchase.trigger}</span>
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700">Rating:</span>
                    <StarRating rating={purchase.rating} readonly size="sm" />
                  </div>
                  {purchase.barcode && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Barcode className="w-3 h-3" />
                      <span>{purchase.barcode}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(purchase.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    "You spent {formatCurrency(purchase.price)} because of '{purchase.trigger}'"
                  </p>
                </div>
                <button
                  onClick={() => onDeletePurchase(purchase.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  aria-label="Delete purchase"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Breakdown */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-rose-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Spending by Trigger</h3>
        <div className="space-y-3">
          {Object.entries(stats.triggerBreakdown)
            .filter(([_, amount]) => amount > 0)
            .sort(([_, a], [__, b]) => b - a)
            .map(([trigger, amount]) => {
              const percentage = (amount / stats.totalSpend) * 100;
              return (
                <div key={trigger} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{trigger}</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-rose-500 h-2.5 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
