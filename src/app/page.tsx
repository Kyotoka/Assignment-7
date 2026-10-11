import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import { toBengaliNumber, getBanglaDate } from "@/lib/utils";
import Image from "next/image";

export default async function HomePage() {
  const products = await fetchProducts();

  // Top 6 risers (highest % change first)
  const increasedProducts = products
    .filter((p: any) => p.change > 0)
    .sort((a: any, b: any) => b.change - a.change)
    .slice(0, 6);

  // Top 6 fallers (biggest % drop first)
  const decreasedProducts = products
    .filter((p: any) => p.change < 0)
    .sort((a: any, b: any) => a.change - b.change)
    .slice(0, 6);

  const banglaDate = getBanglaDate();

  return (
    <div className="bg-[#F3F6F3] min-h-screen text-gray-900 pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

        {/* HERO BANNER */}
        <div className="bg-[#FAFDFB] rounded-3xl p-6 sm:p-10 border border-emerald-100 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-4 max-w-xl">
            <span className="inline-block bg-[#E2F2EB] text-[#008744] text-xs font-bold px-3.5 py-1.5 rounded-full">
              {banglaDate}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div>
              <a
                href="#all-products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#008744] hover:bg-[#007038] text-white font-bold text-sm shadow-xs transition"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="relative w-full max-w-sm h-56 sm:h-64 flex items-center justify-center shrink-0">
            <Image
              src="/bazar-hero.png"
              alt="Bazar Basket"
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* SECTION A: PRICE INCREASED (top 6) */}
        {increasedProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-rose-600 font-bold text-lg">▲</span>
              <h2 className="text-xl font-extrabold text-gray-900">আজ দাম বেড়েছে</h2>
              <span className="ml-auto text-xs text-gray-400 font-medium">শীর্ষ {toBengaliNumber(increasedProducts.length)}টি</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {increasedProducts.map((product: any) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION B: PRICE DECREASED (top 6) */}
        {decreasedProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-lg">▼</span>
              <h2 className="text-xl font-extrabold text-gray-900">আজ দাম কমেছে</h2>
              <span className="ml-auto text-xs text-gray-400 font-medium">শীর্ষ {toBengaliNumber(decreasedProducts.length)}টি</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {decreasedProducts.map((product: any) => (
                <ProductCard key={product.id || product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION C: ALL PRODUCTS */}
        <section id="all-products" className="space-y-4 pt-2">
          <div>
            <h2 className="text-2xl font-black text-gray-900">সব পণ্য</h2>
            <p className="text-xs text-gray-500 font-medium mt-1">
              দেশের বিভিন্ন বাজারের আজকের পণ্যের দাম — মোট {toBengaliNumber(products.length)}টি পণ্য।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product: any) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-[#FAFDFB] rounded-2xl p-5 border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl border border-gray-100 shrink-0">
          {product.emoji || "🛒"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 font-medium">প্রতি {product.unit}</p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-[11px] text-gray-400 font-semibold">আজকের দাম</p>
          <p className="text-xl font-extrabold text-gray-900 tracking-tight">
            {toBengaliNumber(product.price)}{" "}
            <span className="text-xs font-semibold text-gray-600">টাকা</span>
          </p>
        </div>

        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
            isUp
              ? "bg-rose-50 text-rose-600 border border-rose-100"
              : isDown
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliNumber(Math.abs(product.change))}%
        </span>
      </div>
    </Link>
  );
}