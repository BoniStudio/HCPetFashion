"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { ProductCard } from "@/components/shop/ProductCard";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { Reveal } from "@/components/ui/Reveal";
import type { Product, ProductCategory } from "@/lib/products";

type ShopPageClientProps = {
  allProducts: Product[];
};

export function ShopPageClient({ allProducts }: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ProductCategory) || "all";
  const [category, setCategory] = useState<ProductCategory | "all">(
    ["raincoat", "custom", "small-dogs", "fashion"].includes(initialCategory)
      ? initialCategory
      : "all"
  );
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    if (category === "all") return allProducts;
    return allProducts.filter((p) => p.categories.includes(category));
  }, [allProducts, category]);

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Collection
          </p>
          <h1 className="mt-4 font-display text-4xl font-light text-charcoal md:text-5xl">
            Shop
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <CategoryFilter active={category} onChange={setCategory} />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={i}
              onQuickView={setQuickView}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-20 text-center text-sm text-stone">
            No pieces in this category yet.
          </p>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
