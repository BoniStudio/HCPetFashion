import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collection",
  description:
    "Limited pet fashion pieces curated for rain, city walks, and soft everyday wear.",
};

export default function ShopPage() {
  return (
    <>
      <h1 className="sr-only">Collection</h1>
      <Suspense fallback={<div className="min-h-screen pt-32" />}>
        <ShopPageClient allProducts={products} />
      </Suspense>
    </>
  );
}
