// src/components/Navbar.tsx
// Server Component — fetches categories + products on the server; session is read client-side
import Link from "next/link";
import Image from "next/image";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { getBanglaDate } from "@/lib/utils";
import NavbarCategoryLinks from "./NavbarCategoryLinks";
import NavbarAuthButtons from "./NavbarAuthButtons";

export default async function Navbar() {
  // Safely fetch data with fallbacks so Navbar never fails to render
  let categories: any[] = [];
  let products: any[] = [];

  try {
    [categories, products] = await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ]);
  } catch (e) {
    console.error("Navbar data fetch error", e);
  }

  const banglaDate = getBanglaDate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 1. Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-[#008744] flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
            <Image
              src="/logo-icon.png"
              alt="Bazar Dor Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
              🛒 বাজার দর
            </h1>
            <p className="text-xs text-gray-500 font-semibold mt-1">{banglaDate}</p>
          </div>
        </Link>

        {/* Auth Buttons — client component reads session via useSession() */}
        <NavbarAuthButtons />
      </div>

      {/* 2. Categories Row — delegated to client component for active highlighting */}
      <div className="border-t border-gray-200/60 bg-[#F4F6F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-6 overflow-x-auto no-scrollbar">
          <NavbarCategoryLinks categories={categories} />
        </div>
      </div>

      {/* 3. Infinite Price Ticker */}
      <div className="bg-[#033026] text-white text-xs py-2 overflow-hidden whitespace-nowrap relative border-t border-emerald-900">
        {products.length > 0 && (
          <div className="inline-flex animate-marquee items-center gap-8 px-4">
            {/* Duplicate list for seamless loop */}
            {[...products, ...products].map((product: any, index: number) => {
              const isUp = product.change > 0;
              const isDown = product.change < 0;
              return (
                <div key={`${product.id}-${index}`} className="inline-flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <span>{product.emoji || "⚪"} {product.name}</span>
                    <span className="font-semibold">{product.price} টাকা/{product.unit}</span>
                    <span
                      className={`font-bold text-xs px-1.5 py-0.5 rounded ${
                        isUp
                          ? "bg-rose-600 text-white"
                          : isDown
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {isUp ? "▲" : isDown ? "▼" : "—"} {Math.abs(product.change)}%
                    </span>
                  </span>
                  <span className="text-emerald-800">•</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}