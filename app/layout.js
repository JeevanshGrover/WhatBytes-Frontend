import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";

export const metadata = {
  title: "WhatBytes | E-Commerce Product Catalog",
  description: "Browse, filter, and purchase products from our catalog. Built with Next.js App Router and Tailwind CSS.",
  keywords: ["e-commerce", "catalog", "nextjs", "react", "tailwind"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased flex flex-col min-h-screen">
        <CartProvider>
          <FilterProvider>
            <Header />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
