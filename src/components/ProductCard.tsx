"use client";

import Link from "next/link";
import { toBengaliNumber } from "@/lib/utils";

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

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;
  const productSlug = product.slug || product.id;

  return (
    <Link
      href={`/product/${productSlug}`}
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="text-4xl mb-3 flex items-center justify-center h-16 bg-slate-50 rounded-lg">
          {product.emoji || "🛒"}
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-1">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-3">{product.unit || "প্রতি কেজি"}</p>
      </div>

      <div className="border-t border-slate-100 pt-3 mt-2 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block">আজকের দাম</span>
          <span className="font-bold text-slate-900 text-base">
            {toBengaliNumber(product.price)} টাকা
          </span>
        </div>
        <div
          className={`text-xs font-semibold px-2 py-1 rounded-md ${
            isUp
              ? "bg-emerald-100 text-emerald-700"
              : isDown
              ? "bg-rose-100 text-rose-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isUp
            ? `▲ ${toBengaliNumber(product.change)}%`
            : isDown
            ? `▼ ${toBengaliNumber(Math.abs(product.change))}%`
            : `— ০.০%`}
        </div>
      </div>
    </Link>
  );
}