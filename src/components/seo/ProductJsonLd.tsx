import type { Product } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

type ProductJsonLdProps = {
  product: Product;
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => absoluteUrl(img)),
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/product/${product.slug}/`),
      priceCurrency: "USD",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/OutOfStock",
    },
    brand: {
      "@type": "Brand",
      name: "HC Pet Fashion",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
