"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";

export default function QuantitySelector({ quantity, onQuantityChange, min = 1 }) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50 p-1">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="w-10 text-center font-bold text-slate-800 text-sm select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        className="w-8 h-8 rounded-md flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
