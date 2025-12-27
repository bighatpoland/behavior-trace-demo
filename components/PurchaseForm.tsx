"use client";

import { useState } from "react";
import { Purchase, TriggerType } from "@/types";
import { Plus, Camera } from "lucide-react";
import BarcodeScanner from "./BarcodeScanner";
import StarRating from "./StarRating";

interface PurchaseFormProps {
  onAddPurchase: (purchase: Purchase) => void;
}

const triggers: TriggerType[] = [
  "Boredom",
  "Stress",
  "Social Media",
  "Hunger",
  "Late Night Scrolling",
  "Peer Pressure",
];

export default function PurchaseForm({ onAddPurchase }: PurchaseFormProps) {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [trigger, setTrigger] = useState<TriggerType>("Boredom");
  const [rating, setRating] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName.trim() || !price || parseFloat(price) <= 0) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (rating === 0) {
      alert("Please rate how much you like this product (1-5 stars)");
      return;
    }

    const purchase: Purchase = {
      id: Date.now().toString(),
      itemName: itemName.trim(),
      price: parseFloat(price),
      date,
      trigger,
      rating,
      barcode: barcode || undefined,
      createdAt: Date.now(),
    };

    onAddPurchase(purchase);

    // Reset form
    setItemName("");
    setPrice("");
    setDate(new Date().toISOString().split("T")[0]);
    setTrigger("Boredom");
    setRating(0);
    setBarcode("");
  };

  const handleBarcodeScanned = (scannedBarcode: string) => {
    setBarcode(scannedBarcode);
    setShowScanner(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Plus className="w-6 h-6 text-amber-600" />
        Log a Purchase
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
            What did you buy?
          </label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
            placeholder="e.g., Coffee, Shoes, Snacks"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            How much? (USD)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            When?
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="trigger" className="block text-sm font-medium text-gray-700 mb-1">
            What triggered this purchase?
          </label>
          <select
            id="trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value as TriggerType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition bg-white"
            required
          >
            {triggers.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Barcode Scanner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Barcode (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              placeholder="Scan or enter barcode"
            />
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Scan
            </button>
          </div>
          {barcode && (
            <p className="text-xs text-green-600 mt-1">✓ Barcode: {barcode}</p>
          )}
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How much do you like this product? *
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg"
        >
          Track This Purchase
        </button>
      </form>

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleBarcodeScanned}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
