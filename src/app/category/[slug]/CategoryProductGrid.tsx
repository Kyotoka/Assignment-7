"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { toBengaliNumber } from "@/lib/utils";

type SortOrder = "default" | "price-asc" | "price-desc";

interface Product {
  id: string | number;
  slug?: string;
  name: string;
  price: number;
  unit: string;
  change: number;
  emoji?: string;
  category?: string;
}

function parseBengaliNumber(n: number): number {
  return n; // prices are already numeric from the API
}

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOrder>("default");

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return parseBengaliNumber(a.price) - parseBengaliNumber(b.price);
    if (sort === "price-desc") return parseBengaliNumber(b.price) - parseBengaliNumber(a.price);
    return 0; // default order preserved
  });

  return (
    <div className="space-y-4">
      {/* Sorting Control */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-700">সাজান:</span>
        <div className="flex items-center gap-2 flex-wrap">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSort(option.value)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition ${
                sort === option.value
                  ? "bg-[#008744] text-white border-[#008744] shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#008744] hover:text-[#008744]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-400 font-medium hidden sm:block">
          {toBengaliNumber(sorted.length)}টি পণ্য
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
