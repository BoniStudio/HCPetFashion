import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "Website Image");
const PUBLIC_DIR = path.join(ROOT, "public", "products");
const OUTPUT_FILE = path.join(ROOT, "src", "lib", "products.ts");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

const FOLDER_META = {
  军绿雨衣: {
    nameEn: "Olive Field Raincoat",
    categories: ["raincoat"],
    description:
      "An olive rain layer with a relaxed field cut — rain-ready for park walks and soft outdoor mornings.",
    price: 68,
    featured: true,
    hero: true,
  },
  噗鸡鸭: {
    nameEn: "Quack Duck Custom Set",
    categories: ["custom", "small-dogs"],
    description:
      "A playful bespoke set with quiet charm — made to order for companions who dress with personality.",
    price: 72,
    featured: true,
  },
  小恐龙雨衣: {
    nameEn: "Dino Rain Shell",
    categories: ["raincoat", "small-dogs"],
    description:
      "A playful rain shell with a soft silhouette and lightweight coverage for little city walks.",
    price: 58,
    featured: true,
    hero: true,
  },
  带袖黄风衣: {
    nameEn: "Sleeved Amber Trench",
    categories: ["raincoat"],
    description:
      "A full-sleeve amber trench with clean lines — rainwear that reads refined, not utilitarian.",
    price: 75,
    featured: true,
    hero: true,
  },
  彼得潘: {
    nameEn: "Peter Pan Collar Piece",
    categories: ["custom", "accessories"],
    description:
      "A storybook collar piece with hand-finished edges — a small bespoke accent for everyday wear.",
    price: 65,
    featured: false,
  },
  无袖紫黑雨衣: {
    nameEn: "Sleeveless Plum Rain Vest",
    categories: ["raincoat"],
    description:
      "A sleeveless plum vest with a sharp, minimal profile — easy layering for drizzle and damp sidewalks.",
    price: 62,
    featured: true,
  },
  橘子海: {
    nameEn: "Citrus Grove Cape",
    categories: ["accessories"],
    description:
      "A warm-toned cape with fluid drape — editorial layering for city strolls and soft golden-hour walks.",
    price: 70,
    featured: true,
  },
  熊猫: {
    nameEn: "Panda Soft Knit",
    categories: ["cats", "small-dogs"],
    description:
      "A monochrome soft knit with a gentle hand-feel — quiet luxury for cats and petite companions.",
    price: 55,
    featured: true,
  },
  紫色雨衣: {
    nameEn: "Lavender Rain Shell",
    categories: ["raincoat"],
    description:
      "A lavender rain shell with a matte finish and calm silhouette — weather-friendly, never loud.",
    price: 60,
    featured: false,
  },
  纯色白澄雨衣: {
    nameEn: "Ivory Pure Raincoat",
    categories: ["raincoat"],
    description:
      "A clean ivory rain layer designed for quiet days, cloudy walks, and elevated everyday styling.",
    price: 64,
    featured: true,
    hero: true,
  },
  英伦漫步: {
    nameEn: "British Stroll Harness",
    categories: ["accessories"],
    description:
      "A heritage walking harness with tailored proportions — companion wear with a British edit.",
    price: 78,
    featured: true,
  },
  英伦风: {
    nameEn: "Heritage British Cape",
    categories: ["accessories"],
    description:
      "A wool-touch cape with classic British lines — understated layering for polished city walks.",
    price: 80,
    featured: true,
  },
  薄荷紫: {
    nameEn: "Mint Lilac Wrap",
    categories: ["accessories"],
    description:
      "A mint-lilac wrap with delicate color blocking — a soft spring layer for editorial everyday looks.",
    price: 58,
    featured: true,
  },
  贝克街: {
    nameEn: "Baker Street Trench",
    categories: ["custom", "accessories"],
    description:
      "A detective-inspired trench with bespoke details — urban companion wear with quiet drama.",
    price: 76,
    featured: true,
  },
};

const PRODUCT_DETAILS = {
  军绿雨衣: {
    material: "Cotton-blend shell with water-repellent finish",
    fitNotes: "Relaxed field cut with room for light layering",
    weatherUse: "Rain-ready for light showers and damp walks",
    care: "Spot clean; hand wash cold and lay flat to dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  噗鸡鸭: {
    material: "Custom cotton blend with hand-finished trim",
    fitNotes: "Made to order — share measurements via Instagram",
    weatherUse: "Style-first piece for everyday wear",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Custom pieces ship in 7–14 business days",
  },
  小恐龙雨衣: {
    material: "Lightweight shell with soft cotton lining",
    fitNotes: "Snug but comfortable on small breeds",
    weatherUse: "Water-repellent coverage for drizzle and city rain",
    care: "Wipe clean; hand wash when needed",
    shipping: "Ships within 3–5 business days from the US",
  },
  带袖黄风衣: {
    material: "Structured rain shell with cotton lining",
    fitNotes: "Full-sleeve trench proportions with clean shoulder line",
    weatherUse: "Rain-ready for walks and transit days",
    care: "Hand wash cold; hang to dry away from direct heat",
    shipping: "Ships within 3–5 business days from the US",
  },
  彼得潘: {
    material: "Premium cotton with hand-finished edges",
    fitNotes: "Custom sizing available — DM for measurements",
    weatherUse: "Everyday accessory, not rainwear",
    care: "Spot clean only",
    shipping: "Bespoke lead time confirmed on Instagram",
  },
  无袖紫黑雨衣: {
    material: "Bonded shell with soft inner lining",
    fitNotes: "Sleeveless vest cut for easy movement",
    weatherUse: "Water-repellent for light rain and mist",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  橘子海: {
    material: "Lightweight woven blend",
    fitNotes: "Draped cape silhouette — one size with adjustable tie",
    weatherUse: "Layering piece for mild weather",
    care: "Dry clean or gentle hand wash",
    shipping: "Ships within 3–5 business days from the US",
  },
  熊猫: {
    material: "Soft-touch knit blend",
    fitNotes: "Easy stretch fit for cats and small dogs",
    weatherUse: "Cozy layering for cool indoor and outdoor moments",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  紫色雨衣: {
    material: "Matte rain shell with cotton lining",
    fitNotes: "Minimal cut with clean back line",
    weatherUse: "Water-repellent for light rain",
    care: "Wipe clean; hand wash cold when needed",
    shipping: "Ships within 3–5 business days from the US",
  },
  纯色白澄雨衣: {
    material: "Smooth rain shell with breathable lining",
    fitNotes: "Clean straight cut with soft structure",
    weatherUse: "Rain-ready for cloudy walks and light drizzle",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  英伦漫步: {
    material: "Structured cotton blend with metal hardware",
    fitNotes: "Adjustable straps for chest and neck fit",
    weatherUse: "Walking harness for daily city use",
    care: "Spot clean straps; air dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  英伦风: {
    material: "Wool-touch blend with cotton lining",
    fitNotes: "Classic cape drape with neck closure",
    weatherUse: "Layering for cool, dry days",
    care: "Dry clean recommended",
    shipping: "Ships within 3–5 business days from the US",
  },
  薄荷紫: {
    material: "Soft woven blend",
    fitNotes: "Wrap-style fit with gentle overlap",
    weatherUse: "Spring layering for mild weather",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Ships within 3–5 business days from the US",
  },
  贝克街: {
    material: "Custom trench shell with cotton lining",
    fitNotes: "Bespoke fit inquiry via Instagram",
    weatherUse: "Weather-friendly layering with rain-ready option",
    care: "Hand wash cold; lay flat to dry",
    shipping: "Custom lead time confirmed on Instagram",
  },
};

function slugify(text) {
  const map = {
    军绿雨衣: "olive-field-raincoat",
    噗鸡鸭: "quack-duck-custom",
    小恐龙雨衣: "dino-rain-shell",
    带袖黄风衣: "sleeved-amber-trench",
    彼得潘: "peter-pan-collar",
    无袖紫黑雨衣: "sleeveless-plum-vest",
    橘子海: "citrus-grove-cape",
    熊猫: "panda-soft-knit",
    紫色雨衣: "lavender-rain-shell",
    纯色白澄雨衣: "ivory-pure-raincoat",
    英伦漫步: "british-stroll-harness",
    英伦风: "heritage-british-cape",
    薄荷紫: "mint-lilac-wrap",
    贝克街: "baker-street-trench",
  };
  return (
    map[text] ||
    text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fff]+/g, "-")
      .replace(/^-|-$/g, "") ||
    `product-${Date.now()}`
  );
}

function sanitizeFilename(name) {
  return name.replace(/[^\w.\-]/g, "_");
}

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function scanProducts() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error("Source directory not found:", SOURCE_DIR);
    process.exit(1);
  }

  if (fs.existsSync(PUBLIC_DIR)) {
    fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const folders = fs
    .readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const products = [];

  for (const folderName of folders) {
    const folderPath = path.join(SOURCE_DIR, folderName);
    const files = fs
      .readdirSync(folderPath)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, "en"));

    if (files.length === 0) continue;

    const meta = FOLDER_META[folderName] || {
      nameEn: folderName,
      categories: ["accessories"],
      description: `Premium pet fashion piece — ${folderName}.`,
      price: 65,
      featured: false,
    };

    const isRaincoat = meta.categories.includes("raincoat");
    const customDetails = PRODUCT_DETAILS[folderName];

    const slug = slugify(folderName);
    const productDir = path.join(PUBLIC_DIR, slug);
    fs.mkdirSync(productDir, { recursive: true });

    const images = files.map((file, index) => {
      const ext = path.extname(file).toLowerCase();
      const destName = `${String(index + 1).padStart(2, "0")}${ext}`;
      const srcPath = path.join(folderPath, file);
      const destPath = path.join(productDir, destName);
      copyFile(srcPath, destPath);
      return `/products/${slug}/${destName}`;
    });

    const sizes = ["XS", "S", "M", "L", "XL"];

    products.push({
      id: slug,
      slug,
      name: meta.nameEn,
      nameZh: folderName,
      price: meta.price,
      categories: meta.categories,
      description: meta.description,
      images,
      image: images[0],
      sizes,
      featured: meta.featured ?? false,
      hero: meta.hero ?? false,
      limited: true,
      stock: 1,
      tags: isRaincoat
        ? ["Water-repellent", "Lightweight", "Limited"]
        : meta.categories.includes("custom")
          ? ["Bespoke", "Limited piece", "Hand-finished"]
          : ["Limited piece", "Soft luxury", "Editorial"],
      details: customDetails ?? {
        material: "Premium cotton blend",
        fitNotes: "Everyday companion fit",
        weatherUse: isRaincoat
          ? "Water-repellent for light rain"
          : "Style-first layering",
        care: "Hand wash cold; lay flat to dry",
        shipping: "Ships within 3–5 business days from the US",
      },
    });
  }

  products.sort((a, b) => a.name.localeCompare(b.name));

  const ts = `/* AUTO-GENERATED — run: npm run generate-products */
export type ProductCategory =
  | "raincoat"
  | "custom"
  | "small-dogs"
  | "cats"
  | "accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  nameZh: string;
  price: number;
  categories: ProductCategory[];
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  featured: boolean;
  hero: boolean;
  limited: boolean;
  stock: number;
  tags: string[];
  details: {
    material: string;
    fitNotes: string;
    weatherUse: string;
    care: string;
    shipping: string;
    bestFor?: string;
    waterResistance?: string;
  };
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  raincoat: "Rainwear",
  custom: "Bespoke",
  "small-dogs": "Small Companions",
  cats: "Feline Edit",
  accessories: "Companion Wear",
};

export const SHOP_FILTER_CATEGORIES = [
  "all",
  "raincoat",
  "custom",
  "small-dogs",
  "cats",
  "accessories",
] as const;

export type ShopFilterCategory = (typeof SHOP_FILTER_CATEGORIES)[number];

export const products: Product[] = ${JSON.stringify(products, null, 2)} as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getHeroProducts(): Product[] {
  return products.filter((p) => p.hero);
}

export function getRaincoatProducts(): Product[] {
  return products.filter((p) => p.categories.includes("raincoat"));
}

export function getProductsByCategory(category: ProductCategory | "all"): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.categories.includes(category));
}
`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, ts, "utf8");

  console.log(`Generated ${products.length} products → ${OUTPUT_FILE}`);
  console.log(`Copied images → ${PUBLIC_DIR}`);
}

scanProducts();
