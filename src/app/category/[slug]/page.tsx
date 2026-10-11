// app/category/[slug]/page.tsx — Server Component with sorting + generateStaticParams
import { fetchCategoryBySlug, fetchCategories } from "@/lib/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProductGrid from "./CategoryProductGrid";

// Pre-render known category slugs at build time; unknown ones still render at runtime
export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    return categories.map((cat: any) => ({ slug: cat.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true; // allow runtime rendering of slugs not in list

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryData = await fetchCategoryBySlug(slug);

  if (!categoryData || !categoryData.name) {
    notFound();
  }

  const products = categoryData.products || [];

  return (
    <div className="bg-[#F3F6F3] min-h-screen pb-16">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Category Header */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl border border-gray-100 shadow-sm">
            {categoryData.emoji || "📦"}
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {categoryData.name}
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">
              {products.length}টি পণ্য পাওয়া গেছে
            </p>
          </div>
        </div>

        {/* Products Grid (client component handles sorting) */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg mb-4">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
            <Link
              href="/"
              className="inline-block bg-[#008744] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#007038] transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <CategoryProductGrid products={products} />
        )}

      </main>
    </div>
  );
}
