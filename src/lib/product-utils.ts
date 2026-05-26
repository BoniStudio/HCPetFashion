import {
  CATEGORY_LABELS,
  type Product,
  type ProductCategory,
  type ShopFilterCategory,
} from "./products";

export type SortOption = "featured" | "price-asc" | "price-desc";

export function getCategoryLabel(cat: ProductCategory): string {
  return CATEGORY_LABELS[cat];
}

export function formatCategories(product: Product): string {
  return product.categories.map((c) => CATEGORY_LABELS[c]).join(" · ");
}

export function filterProducts(
  products: Product[],
  category: ShopFilterCategory,
  query: string
): Product[] {
  let list = products;

  if (category !== "all") {
    list = list.filter((p) => p.categories.includes(category));
  }

  const q = query.trim().toLowerCase();
  if (q) {
    list = list.filter((p) => {
      const hay = [
        p.name,
        p.description,
        ...p.categories.map((c) => CATEGORY_LABELS[c]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }

  return list;
}

export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "featured":
    default:
      return list.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }
}
