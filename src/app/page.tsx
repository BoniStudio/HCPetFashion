import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { Hero } from "@/components/home/Hero";
import { RaincoatEditorial } from "@/components/home/RaincoatEditorial";
import {
  getFeaturedProducts,
  getHeroProducts,
  getRaincoatProducts,
} from "@/lib/products";

export default function HomePage() {
  const heroProducts = getHeroProducts();
  const raincoats = getRaincoatProducts();
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero heroProducts={heroProducts.length ? heroProducts : featured} />
      <RaincoatEditorial products={raincoats} />
      <FeaturedCarousel products={featured} />
      <BrandPhilosophy />
    </>
  );
}
