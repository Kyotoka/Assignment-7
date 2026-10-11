"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { fetchProductById } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { toBengaliNumber } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toasted, setToasted] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      if (!toasted) {
        toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
        setToasted(true);
      }
      router.push("/signin");
    }
  }, [session, isPending, router, toasted]);

  useEffect(() => {
    if (!session || isPending) return;
    async function loadData() {
      setLoading(true);
      const pData = await fetchProductById(slug);
      setProduct(pData);
      setLoading(false);
    }
    loadData();
  }, [slug, session, isPending]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 h-44 border border-gray-200"></div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 h-96 border border-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F4F6F4] flex flex-col items-center justify-center p-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">পণ্যটি পাওয়া যায়নি</h1>
        <Link
          href="/"
          className="bg-[#008744] text-white px-5 py-2.5 rounded-xl hover:bg-[#007038] font-medium mt-3 text-sm transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product.change > 0;
  const isDown = product.change < 0;
  const priceDiff = Math.abs(
    Math.round(
      product.yesterdayPrice
        ? product.price - product.yesterdayPrice
        : (product.price * Math.abs(product.change)) / 100
    )
  );

  return (
    <div className="bg-[#F3F6F3] min-h-screen py-6 px-4 sm:px-6 lg:px-8 text-gray-900 pb-16">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-emerald-700 transition">
            হোম
          </Link>
          <span>›</span>
          {product.category && (
            <>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-emerald-700 transition"
              >
                {product.categoryNameBn || product.category}
              </Link>
              <span>›</span>
            </>
          )}
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>

        {/* 2. Top Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F4F6F4] border border-gray-100 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-2xs">
              {product.emoji || "🛒"}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                প্রতি {product.unit || "কেজি"} • {product.categoryNameBn || product.category || "সাধারণ"}
              </p>
              <p className="text-xs text-gray-600 font-medium mt-2">
                গতকালের তুলনায় আজ দাম{" "}
                <span className={isUp ? "font-bold text-rose-600" : isDown ? "font-bold text-emerald-600" : "font-bold text-gray-600"}>
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                </span>
                {priceDiff > 0 && ` - ${toBengaliNumber(priceDiff)} টাকা`}
              </p>
            </div>
          </div>

          {/* Right Price Pill Card */}
          <div className="bg-[#FAFDFB] border border-gray-200/80 rounded-2xl p-4 sm:px-6 sm:py-4 text-center shrink-0 min-w-[140px] shadow-2xs">
            <span className="text-[11px] font-semibold text-gray-400 block">
              আজকের দাম
            </span>
            <span className="text-3xl sm:text-4xl font-black text-gray-900 block my-0.5 tracking-tight">
              {toBengaliNumber(product.price)}
            </span>
            <span className="text-[11px] font-medium text-gray-500 block">
              টাকা / {product.unit || "কেজি"}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md mt-2 ${
                isUp
                  ? "text-rose-600 bg-rose-50"
                  : isDown
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-600 bg-gray-100"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {toBengaliNumber(Math.abs(product.change))}%
            </span>
          </div>
        </div>

        {/* 3. Main Detail Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-8">

          {/* Price Summary Cards ("দামের সারসংক্ষেপ") */}
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-900 mb-4">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Min Price Card */}
              <div className="border border-gray-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <span className="text-xs text-gray-500 font-semibold block mb-1">
                  সর্বনিম্ন দাম
                </span>
                <p className="text-2xl font-black text-emerald-600 tracking-tight">
                  {toBengaliNumber(product.minPrice || product.price)} টাকা
                </p>
                <span className="text-[11px] text-gray-400 font-medium block mt-1">
                  সবচেয়ে কম দামের বাজার
                </span>
              </div>

              {/* Max Price Card */}
              <div className="border border-gray-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <span className="text-xs text-gray-500 font-semibold block mb-1">
                  সর্বোচ্চ দাম
                </span>
                <p className="text-2xl font-black text-rose-500 tracking-tight">
                  {toBengaliNumber(product.maxPrice || product.price)} টাকা
                </p>
                <span className="text-[11px] text-gray-400 font-medium block mt-1">
                  সবচেয়ে বেশি দামের বাজার
                </span>
              </div>

              {/* Avg Price Card */}
              <div className="border border-gray-200/80 rounded-2xl p-4 sm:p-5 bg-white shadow-2xs">
                <span className="text-xs text-gray-500 font-semibold block mb-1">
                  গড় দাম
                </span>
                <p className="text-2xl font-black text-[#008744] tracking-tight">
                  {toBengaliNumber(product.avgPrice || product.price)} টাকা
                </p>
                <span className="text-[11px] text-gray-400 font-medium block mt-1">
                  প্রতি কেজি-এর হিসাবে
                </span>
              </div>
            </div>
          </div>

          {/* Market-wise Breakdown Table ("বাজারভিত্তিক আজকের দাম") */}
          <div>
            <h2 className="text-base sm:text-lg font-black text-gray-900 mb-4">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAFDFB] border-b border-gray-200 text-gray-500 text-xs font-semibold">
                    <th className="py-3 px-4">বাজার</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-center">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-center">সর্বাধিক</th>
                    <th className="py-3 px-4 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                  {(product.markets || []).map((m: any, idx: number) => (
                    <tr
                      key={idx}
                      className="hover:bg-[#F9FCFA] transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-gray-900">
                        {m.market || m.name}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {m.division || "ঢাকা"}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {toBengaliNumber(m.min || m.price)} টাকা
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {toBengaliNumber(m.max || m.price)} টাকা
                      </td>
                      <td className="py-3 px-4 text-right font-black text-gray-900">
                        {toBengaliNumber(m.avg || m.price)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}