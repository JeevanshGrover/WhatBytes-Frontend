"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotalPrice, isLoaded } = useCart();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const shippingCost = subtotalPrice > 0 ? (subtotalPrice > 150 ? 0 : 12) : 0;
  const taxAmount = Math.round(subtotalPrice * 0.08 * 100) / 100;
  const grandTotal = subtotalPrice + shippingCost + taxAmount;

  const handleCheckout = () => {
    setIsCheckedOut(true);
    clearCart();
  };

  if (!isLoaded) {
    return (
      <div className="py-12 text-center text-slate-500 font-medium">
        Loading cart...
      </div>
    );
  }

  if (isCheckedOut) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600 mb-6">
          Thank you for your demo purchase! Your order has been simulated successfully.
        </p>
        <Link
          href="/"
          onClick={() => setIsCheckedOut(false)}
          className="inline-flex items-center gap-2 bg-[#0056b3] hover:bg-[#004494] text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-sm"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-12">
        <div className="w-16 h-16 bg-blue-50 text-[#0056b3] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h1>
        <p className="text-slate-600 text-sm mb-6">
          Looks like you haven't added any products to your shopping cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#0056b3] hover:bg-[#004494] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Explore Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-900 transition-colors"
            title="Back to store"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-extrabold text-[#002B49] tracking-tight">
            Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link href={`/product/${item.id}`} className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-2"
                />
              </Link>

              <div className="flex-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <Link href={`/product/${item.id}`}>
                  <h3 className="font-bold text-slate-900 text-lg hover:text-[#0056b3] transition-colors mt-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-slate-500 font-medium text-sm mt-0.5">
                  ${item.price} each
                </p>
              </div>

              <div className="flex items-center gap-4">
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                  min={1}
                />

                <div className="text-right min-w-20">
                  <p className="font-bold text-slate-900 text-lg">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-rose-500 hover:text-rose-700 font-medium inline-flex items-center gap-0.5 mt-1"
                    title="Remove item"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900">${subtotalPrice}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold text-slate-900">
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `$${shippingCost}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-slate-900">${taxAmount}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-lg font-extrabold text-slate-900">
            <span>Total</span>
            <span className="text-[#0056b3] text-2xl">${grandTotal.toFixed(2)}</span>
          </div>

          {subtotalPrice <= 150 && (
            <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              Add ${(150 - subtotalPrice).toFixed(2)} more for <strong>Free Shipping</strong>!
            </p>
          )}

          <button
            onClick={handleCheckout}
            className="w-full bg-[#0056b3] hover:bg-[#004494] text-white py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-base mt-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
