"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleStarClick = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= rating;
        const isHalf = star - 0.5 === rating;

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            disabled={readonly}
            className={`transition-all ${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={`${sizeClasses[size]} transition-all ${
                isFilled
                  ? "fill-amber-500 text-amber-500"
                  : "fill-none text-gray-300"
              } ${!readonly && "hover:text-amber-400"}`}
            />
          </button>
        );
      })}
      {!readonly && (
        <span className="text-sm text-gray-500 ml-2">
          {rating > 0 ? `${rating}/5` : "Rate this"}
        </span>
      )}
    </div>
  );
}
