"use client";

import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/products";

const filters: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "raincoat", label: CATEGORY_LABELS.raincoat },
  { id: "custom", label: CATEGORY_LABELS.custom },
  { id: "small-dogs", label: CATEGORY_LABELS["small-dogs"] },
  { id: "fashion", label: CATEGORY_LABELS.fashion },
];

type CategoryFilterProps = {
  active: ProductCategory | "all";
  onChange: (category: ProductCategory | "all") => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-sand/60 pb-8">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          className={cn(
            "text-[11px] tracking-[0.2em] uppercase transition-colors",
            active === f.id
              ? "text-charcoal border-b border-charcoal pb-1"
              : "text-stone hover:text-warm"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
