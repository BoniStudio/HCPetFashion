import type { Product } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

type ProductJsonLdProps = {
  product: Product;
};

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((img) => `${SITE_URL}${img}`),
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}/`,
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
