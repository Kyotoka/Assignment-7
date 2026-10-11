"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string | number;
  slug: string;
  name: string;
  emoji?: string;
}

export default function NavbarCategoryLinks({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <>
      {categories.map((cat) => {
        const isActive = pathname === `/category/${cat.slug}`;
        return (
          <Link
            key={cat.slug || cat.id}
            href={`/category/${cat.slug}`}
            className={`flex items-center gap-1.5 text-xs font-bold shrink-0 transition px-3 py-1.5 rounded-full ${
              isActive
                ? "bg-[#008744] text-white shadow-sm"
                : "text-gray-700 hover:text-[#008744] hover:bg-emerald-50"
            }`}
          >
            <span>{cat.emoji || "📦"}</span>
            <span>{cat.name}</span>
          </Link>
        );
      })}
    </>
  );
}
