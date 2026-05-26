"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { ProductCard } from "@/components/shop/ProductCard";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import {
  filterProducts,
  sortProducts,
  type SortOption,
} from "@/lib/product-utils";
import type { Product } from "@/lib/products";
import {
  SHOP_FILTER_CATEGORIES,
  type ShopFilterCategory,
} from "@/lib/products";

type ShopPageClientProps = {
  allProducts: Product[];
};

function parseCategory(param: string | null): ShopFilterCategory {
  if (param && SHOP_FILTER_CATEGORIES.includes(param as ShopFilterCategory)) {
    return param as ShopFilterCategory;
  }
  return "all";
}

export function ShopPageClient({ allProducts }: ShopPageClientProps) {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ShopFilterCategory>(() =>
    parseCategory(searchParams.get("category"))
  );
  const [sort, setSort] = useState<SortOption>("featured");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const list = filterProducts(allProducts, category, query);
    return sortProducts(list, sort);
  }, [allProducts, category, query, sort]);

  return (
    <div className="pt-[4.5rem] md:pt-20">
      <Marquee
        items={["RAINWEAR", "BESPOKE", "LIMITED", "COMPANION WEAR"]}
        className="mt-0"
      />

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
        <Reveal>
          <p className="font-display text-[10px] tracking-[0.38em] text-muted uppercase">
            Collection
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.03em] text-ink md:text-6xl">
            Collection
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Limited pet fashion pieces curated for rain, city walks, and soft
            everyday wear.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <input
            type="search"
            placeholder="Search collection…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-future max-w-md rounded-sm"
            aria-label="Search products"
          />
          <label className="flex items-center gap-3 font-display text-[10px] tracking-[0.18em] text-muted uppercase">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="input-future w-auto min-w-[180px] rounded-sm py-2.5 normal-case"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price — Low to High</option>
              <option value="price-desc">Price — High to Low</option>
            </select>
          </label>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <CategoryFilter active={category} onChange={setCategory} />
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-20 text-center font-display text-xl font-light text-muted">
            No pieces match your search.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {filtered.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
