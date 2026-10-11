"use client";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  change: number;
  emoji?: string;
}

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="bg-emerald-900 text-white text-sm py-2 overflow-hidden border-t border-emerald-800 flex items-center">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {products.concat(products).map((item, index) => {
          const isUp = item.change > 0;
          const isDown = item.change < 0;
          return (
            <div key={`${item.id}-${index}`} className="flex items-center gap-2">
              <span>{item.emoji || "🛒"}</span>
              <span className="font-medium">{item.name}</span>
              <span>{item.price} টাকা/{item.unit?.replace("প্রতি ", "") || "কেজি"}</span>
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  isUp
                    ? "bg-emerald-600 text-white"
                    : isDown
                    ? "bg-rose-600 text-white"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {isUp ? `▲ ${item.change}%` : isDown ? `▼ ${Math.abs(item.change)}%` : `— 0.0%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}