import React from "react";

export default function RatingStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating / 2));
  return (
    <div className="flex">
      {stars.map((filled, index) => (
        <span
          key={index}
          className={filled ? "text-yellow-400" : "text-gray-400"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
