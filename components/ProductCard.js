"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, isFeatured = false }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : i === fullStars && hasHalf
                ? "fill-amber-200 text-amber-400"
                : "text-slate-300"
            }`}
          />
        ))}
        <span className="text-xs text-slate-500 font-medium ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (isFeatured) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col md:flex-row items-center gap-6 col-span-1 md:col-span-2">
        <Link href={`/product/${product.id}`} className="w-full md:w-1/2 relative h-64 overflow-hidden rounded-lg group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="w-full md:w-1/2 flex flex-col justify-between h-full">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Category: {product.category}
            </span>
            <Link href={`/product/${product.id}`}>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 hover:text-[#0056b3] transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-2xl font-extrabold text-[#0056b3] mt-1">
              ${product.price}
            </p>
            <div className="my-2">{renderStars(product.rating)}</div>
            <p className="text-sm text-slate-600 line-clamp-3 mt-2">
              {product.description}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-[#0056b3] hover:bg-[#004494] text-white shadow-sm hover:shadow"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between group">
      <div>
        <Link
          href={`/product/${product.id}`}
          className="block relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-slate-50"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="space-y-1">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-800 text-base line-clamp-1 hover:text-[#0056b3] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-lg font-bold text-slate-900">${product.price}</p>
          {product.rating && (
            <div className="pt-1">{renderStars(product.rating)}</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-[#0056b3] hover:bg-[#004494] text-white shadow-sm hover:shadow"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              <span>Added</span>
            </>
          ) : (
            <>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
