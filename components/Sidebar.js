"use client";

import React, { useState } from "react";
import { Filter, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useFilter } from "@/context/FilterContext";
import { CATEGORIES } from "@/data/products";

export default function Sidebar() {
  const { category, setCategory, maxPrice, setMaxPrice, resetFilters } = useFilter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full bg-[#0056b3] text-white px-4 py-2.5 rounded-lg font-medium flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </div>
          {isMobileOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      <div className={`space-y-6 ${isMobileOpen ? "block" : "hidden md:block"}`}>
        <div className="bg-[#0056b3] text-white p-6 rounded-xl shadow-md border border-blue-600/30">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-blue-400/30">
            <h2 className="text-xl font-bold tracking-tight">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-100 hover:text-white flex items-center gap-1 bg-blue-900/40 hover:bg-blue-900/60 px-2.5 py-1 rounded transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 text-blue-100 uppercase tracking-wider">
              Category
            </h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group text-sm select-none"
                  >
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={isSelected}
                        onChange={() => setCategory(cat)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-white bg-white"
                            : "border-blue-200 group-hover:border-white"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#0056b3]" />
                        )}
                      </div>
                    </div>
                    <span
                      className={`transition-colors ${
                        isSelected
                          ? "font-semibold text-white"
                          : "text-blue-100 group-hover:text-white"
                      }`}
                    >
                      {cat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-blue-100 uppercase tracking-wider">
                Price
              </h3>
              <span className="text-sm font-bold bg-blue-900/50 px-2 py-0.5 rounded text-white border border-blue-400/30">
                Max: ${maxPrice}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-white bg-blue-900/50 h-2 rounded-lg cursor-pointer my-3"
            />

            <div className="flex justify-between text-xs text-blue-200 font-medium">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
