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
      "Water-resistant olive raincoat with structured silhouette for outdoor adventures.",
    price: 68,
    featured: true,
    hero: true,
  },
  噗鸡鸭: {
    nameEn: "Quack Duck Custom Set",
    categories: ["custom", "fashion"],
    description:
      "Playful bespoke ensemble with artisan detailing for statement-making companions.",
    price: 72,
    featured: true,
  },
  小恐龙雨衣: {
    nameEn: "Dino Rain Shell",
    categories: ["raincoat", "small-dogs"],
    description:
      "Lightweight waterproof shell tailored for small breeds with playful charm.",
    price: 58,
    featured: true,
    hero: true,
  },
  带袖黄风衣: {
    nameEn: "Sleeved Amber Trench",
    categories: ["raincoat", "fashion"],
    description:
      "Full-sleeve amber trench with premium finish and refined tailoring.",
    price: 75,
    featured: true,
    hero: true,
  },
  彼得潘: {
    nameEn: "Peter Pan Custom Collar",
    categories: ["custom"],
    description:
      "Hand-finished custom collar piece inspired by timeless storytelling.",
    price: 65,
    featured: false,
  },
  无袖紫黑雨衣: {
    nameEn: "Sleeveless Plum Rain Vest",
    categories: ["raincoat"],
    description:
      "Sleeveless plum-and-charcoal vest with bonded seams for wet weather.",
    price: 62,
    featured: true,
  },
  橘子海: {
    nameEn: "Citrus Grove Cape",
    categories: ["fashion"],
    description:
      "Editorial cape with warm citrus tones and fluid drape for city strolls.",
    price: 70,
    featured: true,
  },
  熊猫: {
    nameEn: "Panda Soft Knit",
    categories: ["fashion", "small-dogs"],
    description:
      "Ultra-soft knit with monochrome palette — cozy luxury for petite pets.",
    price: 55,
    featured: true,
  },
  紫色雨衣: {
    nameEn: "Lavender Rain Shell",
    categories: ["raincoat"],
    description:
      "Minimal lavender rain shell with matte waterproof coating.",
    price: 60,
    featured: false,
  },
  纯色白澄雨衣: {
    nameEn: "Ivory Pure Raincoat",
    categories: ["raincoat"],
    description:
      "Clean ivory raincoat with seamless lines and quiet sophistication.",
    price: 64,
    featured: true,
    hero: true,
  },
  英伦漫步: {
    nameEn: "British Stroll Harness",
    categories: ["fashion"],
    description:
      "Heritage-inspired walking harness with tailored British proportions.",
    price: 78,
    featured: true,
  },
  英伦风: {
    nameEn: "Heritage British Cape",
    categories: ["fashion"],
    description:
      "Classic British styling with wool-blend texture and understated elegance.",
    price: 80,
    featured: true,
  },
  薄荷紫: {
    nameEn: "Mint Lilac Wrap",
    categories: ["fashion"],
    description:
      "Soft mint-lilac wrap with delicate layering for spring editorial looks.",
    price: 58,
    featured: true,
  },
  贝克街: {
    nameEn: "Baker Street Trench",
    categories: ["fashion", "custom"],
    description:
      "Detective-inspired trench with bespoke touches and urban sophistication.",
    price: 76,
    featured: true,
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
      categories: ["fashion"],
      description: `Premium pet fashion piece — ${folderName}.`,
      price: 65,
      featured: false,
    };

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
      tags: meta.categories.includes("raincoat")
        ? ["Waterproof", "Outdoor-ready", "Premium fabric"]
        : ["Handcrafted", "Limited run", "Soft luxury"],
      details: {
        fabric:
          meta.categories.includes("raincoat")
            ? "Bonded waterproof shell with breathable cotton lining."
            : "Premium cotton blend with soft-touch finish.",
        care: "Hand wash cold. Lay flat to dry. Do not bleach.",
        waterproof: meta.categories.includes("raincoat"),
      },
    });
  }

  products.sort((a, b) => a.name.localeCompare(b.name));

  const ts = `/* AUTO-GENERATED — run: npm run generate-products */
export type ProductCategory = "raincoat" | "custom" | "small-dogs" | "fashion";

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
  tags: string[];
  details: {
    fabric: string;
    care: string;
    waterproof: boolean;
  };
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  raincoat: "Raincoat",
  custom: "Custom",
  "small-dogs": "Small Dogs",
  fashion: "Fashion Style",
};

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
