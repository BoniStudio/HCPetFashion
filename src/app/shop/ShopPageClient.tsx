"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/shop/CategoryFilter";
import { ProductCard } from "@/components/shop/ProductCard";
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
    <div className="pt-20">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 lg:py-24">
        <Reveal>
          <p className="text-[10px] tracking-[0.35em] text-stone uppercase">
            Collection
          </p>
          <h1 className="mt-4 font-display text-4xl font-light text-charcoal md:text-5xl">
            Shop
          </h1>
          <p className="mt-6 max-w-lg text-sm text-warm">
            Rainwear and bespoke pieces — most styles are one-of-one. Message us
            on Instagram for fit help.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <input
            type="search"
            placeholder="Search by name or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md border-b border-sand bg-transparent py-3 text-sm text-charcoal outline-none placeholder:text-stone focus:border-charcoal"
            aria-label="Search products"
          />
          <label className="flex items-center gap-3 text-[11px] tracking-[0.15em] text-stone uppercase">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-sand/60 bg-ivory px-4 py-2 text-[11px] tracking-[0.1em] text-charcoal normal-case outline-none focus:border-charcoal"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price Low to High</option>
              <option value="price-desc">Price High to Low</option>
            </select>
          </label>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <CategoryFilter active={category} onChange={setCategory} />
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-20 text-center font-display text-xl font-light text-stone">
            No products found.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
