"use client";

import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  SHOP_FILTER_CATEGORIES,
  type ShopFilterCategory,
} from "@/lib/products";

const labels: Record<ShopFilterCategory, string> = {
  all: "All",
  raincoat: CATEGORY_LABELS.raincoat,
  custom: CATEGORY_LABELS.custom,
  "small-dogs": CATEGORY_LABELS["small-dogs"],
  cats: CATEGORY_LABELS.cats,
  accessories: CATEGORY_LABELS.accessories,
};

type CategoryFilterProps = {
  active: ShopFilterCategory;
  onChange: (category: ShopFilterCategory) => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-sand/60 pb-8">
      {SHOP_FILTER_CATEGORIES.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "text-[11px] tracking-[0.2em] uppercase transition-colors",
            active === id
              ? "text-charcoal border-b border-charcoal pb-1"
              : "text-stone hover:text-warm"
          )}
        >
          {labels[id]}
        </button>
      ))}
    </div>
  );
}
