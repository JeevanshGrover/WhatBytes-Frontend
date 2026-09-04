"use client";

import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, X, User, TreePine } from "lucide-react";
import { useFilter } from "@/context/FilterContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { search, setSearch } = useFilter();
  const { totalItemsCount, isLoaded } = useCart();

  return (
    <header className="bg-[#0056b3] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity">
          <span><TreePine /></span>
        </Link>

        <div className="flex-1 max-w-xl mx-2 sm:mx-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-200">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-9 pr-9 py-2 bg-blue-900/40 border border-blue-400/40 rounded-md text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/80 focus:bg-blue-900/60 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-200 hover:text-white"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-[#003d80] hover:bg-[#003366] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors border border-blue-400/30"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {isLoaded && totalItemsCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center shadow-sm animate-pulse">
                {totalItemsCount}
              </span>
            )}
          </Link>

          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-800/80 border border-blue-400/30 text-white hover:bg-blue-700 transition-colors cursor-pointer" title="User Profile">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
