import { Suspense } from "react";
import { ShopPageClient } from "./ShopPageClient";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32" />}>
      <ShopPageClient allProducts={products} />
    </Suspense>
  );
}
