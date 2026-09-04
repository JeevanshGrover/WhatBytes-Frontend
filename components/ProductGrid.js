"use client";

import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import ProductCard from "./ProductCard";
import { useFilter } from "@/context/FilterContext";
import { products } from "@/data/products";

export default function ProductGrid() {
  const { search, category, maxPrice, resetFilters } = useFilter();

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(search.toLowerCase()));

    const categoryMatch =
      category === "All" || product.category === category;

    const priceMatch = product.price <= maxPrice;

    return searchMatch && categoryMatch && priceMatch;
  });

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#002B49] tracking-tight">
          Product Listing
        </h1>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8">
          <div className="w-16 h-16 bg-blue-50 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchX className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            No products found
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            We couldn't find any products matching your search criteria or price filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#0056b3] hover:bg-[#004494] text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
