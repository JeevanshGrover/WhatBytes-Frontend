"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterContext = createContext();

export function FilterProvider({ children }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setCategory(searchParams.get("category") || "All");
        setMaxPrice(Number(searchParams.get("price")) || 1000);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        if (search.trim()) {
            params.set("search", search.trim());
        }

        if (category !== "All") {
            params.set("category", category);
        }

        if (maxPrice < 1000) {
            params.set("price", maxPrice.toString());
        }

        const query = params.toString();

        router.replace(query ? `/?${query}` : "/", {
            scroll: false,
        });

    }, [search, category, maxPrice, router]);

    const resetFilters = () => {
        setSearch("");
        setCategory("All");
        setMaxPrice(1000);
    };

    return (
        <FilterContext.Provider
            value={{
                search,
                setSearch,
                category,
                setCategory,
                maxPrice,
                setMaxPrice,
                resetFilters,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
}