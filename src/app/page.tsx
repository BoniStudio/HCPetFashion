import { BespokeSection } from "@/components/home/BespokeSection";
import { FeaturedRainwear } from "@/components/home/FeaturedRainwear";
import { Hero } from "@/components/home/Hero";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ShopPreview } from "@/components/home/ShopPreview";
import {
  getFeaturedProducts,
  getHeroProducts,
  getRaincoatProducts,
  products,
} from "@/lib/products";

export default function HomePage() {
  const heroProducts = getHeroProducts();
  const raincoats = getRaincoatProducts();
  const featured = getFeaturedProducts();
  const preview = (featured.length >= 8 ? featured : products)
    .slice(0, 8);

  return (
    <>
      <Hero heroProducts={heroProducts.length ? heroProducts : featured} />
      <FeaturedRainwear products={raincoats} />
      <ShopPreview products={preview} />
      <BespokeSection />
      <InstagramSection />
    </>
  );
}
