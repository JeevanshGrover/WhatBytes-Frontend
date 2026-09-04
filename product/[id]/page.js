"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingCart, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id, 10);
  const product = products.find((p) => p.id === productId);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="bg-white rounded-xl p-12 text-center border border-slate-200 my-12 max-w-lg mx-auto shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h1>
        <p className="text-slate-600 mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0056b3] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#004494] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
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
            className={`h-5 w-5 ${
              i < fullStars
                ? "fill-amber-400 text-amber-400"
                : i === fullStars && hasHalf
                ? "fill-amber-200 text-amber-400"
                : "text-slate-300"
            }`}
          />
        ))}
        <span className="text-sm font-semibold text-slate-700 ml-2">
          {rating.toFixed(1)} ({product.reviewsCount} reviews)
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0056b3] transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Products</span>
      </Link>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative w-full h-80 sm:h-96 md:h-[450px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain hover:scale-105 transition-transform duration-300 p-4"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#0056b3] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              )}
              {product.inStock && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full ml-auto">
                  In Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="mb-4">{renderStars(product.rating)}</div>

            <div className="text-3xl font-extrabold text-[#0056b3] mb-6">
              ${product.price}
            </div>

            <div className="border-t border-slate-100 pt-4 mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Description
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-800">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                min={1}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-base transition-all shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0056b3] hover:bg-[#004494] text-white hover:shadow-lg"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-medium">
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                <Truck className="h-4 w-4 text-[#0056b3]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-[#0056b3]" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-lg">
                <RefreshCw className="h-4 w-4 text-[#0056b3]" />
                <span>30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
