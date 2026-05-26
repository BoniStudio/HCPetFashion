/* AUTO-GENERATED — run: npm run generate-products */
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

export const products: Product[] = [
  {
    "id": "baker-street-trench",
    "slug": "baker-street-trench",
    "name": "Baker Street Trench",
    "nameZh": "贝克街",
    "price": 76,
    "categories": [
      "custom",
      "accessories"
    ],
    "description": "A detective-inspired trench with bespoke details — urban companion wear with quiet drama.",
    "images": [
      "/products/baker-street-trench/01.jpeg",
      "/products/baker-street-trench/02.jpeg",
      "/products/baker-street-trench/03.jpeg",
      "/products/baker-street-trench/04.jpeg",
      "/products/baker-street-trench/05.jpeg",
      "/products/baker-street-trench/06.jpeg",
      "/products/baker-street-trench/07.jpeg"
    ],
    "image": "/products/baker-street-trench/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Bespoke",
      "Limited piece",
      "Hand-finished"
    ],
    "details": {
      "material": "Custom trench shell with cotton lining",
      "fitNotes": "Bespoke fit inquiry via Instagram",
      "weatherUse": "Weather-friendly layering with rain-ready option",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Custom lead time confirmed on Instagram"
    }
  },
  {
    "id": "british-stroll-harness",
    "slug": "british-stroll-harness",
    "name": "British Stroll Harness",
    "nameZh": "英伦漫步",
    "price": 78,
    "categories": [
      "accessories"
    ],
    "description": "A heritage walking harness with tailored proportions — companion wear with a British edit.",
    "images": [
      "/products/british-stroll-harness/01.png",
      "/products/british-stroll-harness/02.jpeg"
    ],
    "image": "/products/british-stroll-harness/01.png",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Limited piece",
      "Soft luxury",
      "Editorial"
    ],
    "details": {
      "material": "Structured cotton blend with metal hardware",
      "fitNotes": "Adjustable straps for chest and neck fit",
      "weatherUse": "Walking harness for daily city use",
      "care": "Spot clean straps; air dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "citrus-grove-cape",
    "slug": "citrus-grove-cape",
    "name": "Citrus Grove Cape",
    "nameZh": "橘子海",
    "price": 70,
    "categories": [
      "accessories"
    ],
    "description": "A warm-toned cape with fluid drape — editorial layering for city strolls and soft golden-hour walks.",
    "images": [
      "/products/citrus-grove-cape/01.jpeg",
      "/products/citrus-grove-cape/02.jpeg",
      "/products/citrus-grove-cape/03.jpeg",
      "/products/citrus-grove-cape/04.jpeg",
      "/products/citrus-grove-cape/05.jpeg",
      "/products/citrus-grove-cape/06.jpeg",
      "/products/citrus-grove-cape/07.jpeg",
      "/products/citrus-grove-cape/08.jpeg",
      "/products/citrus-grove-cape/09.jpeg",
      "/products/citrus-grove-cape/10.jpeg",
      "/products/citrus-grove-cape/11.jpeg"
    ],
    "image": "/products/citrus-grove-cape/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Limited piece",
      "Soft luxury",
      "Editorial"
    ],
    "details": {
      "material": "Lightweight woven blend",
      "fitNotes": "Draped cape silhouette — one size with adjustable tie",
      "weatherUse": "Layering piece for mild weather",
      "care": "Dry clean or gentle hand wash",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "dino-rain-shell",
    "slug": "dino-rain-shell",
    "name": "Dino Rain Shell",
    "nameZh": "小恐龙雨衣",
    "price": 58,
    "categories": [
      "raincoat",
      "small-dogs"
    ],
    "description": "A playful rain shell with a soft silhouette and lightweight coverage for little city walks.",
    "images": [
      "/products/dino-rain-shell/01.jpeg",
      "/products/dino-rain-shell/02.jpeg",
      "/products/dino-rain-shell/03.jpeg",
      "/products/dino-rain-shell/04.jpeg",
      "/products/dino-rain-shell/05.jpeg",
      "/products/dino-rain-shell/06.jpeg",
      "/products/dino-rain-shell/07.jpeg"
    ],
    "image": "/products/dino-rain-shell/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": true,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Lightweight shell with soft cotton lining",
      "fitNotes": "Snug but comfortable on small breeds",
      "weatherUse": "Water-repellent coverage for drizzle and city rain",
      "care": "Wipe clean; hand wash when needed",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "heritage-british-cape",
    "slug": "heritage-british-cape",
    "name": "Heritage British Cape",
    "nameZh": "英伦风",
    "price": 80,
    "categories": [
      "accessories"
    ],
    "description": "A wool-touch cape with classic British lines — understated layering for polished city walks.",
    "images": [
      "/products/heritage-british-cape/01.jpeg",
      "/products/heritage-british-cape/02.png"
    ],
    "image": "/products/heritage-british-cape/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Limited piece",
      "Soft luxury",
      "Editorial"
    ],
    "details": {
      "material": "Wool-touch blend with cotton lining",
      "fitNotes": "Classic cape drape with neck closure",
      "weatherUse": "Layering for cool, dry days",
      "care": "Dry clean recommended",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "ivory-pure-raincoat",
    "slug": "ivory-pure-raincoat",
    "name": "Ivory Pure Raincoat",
    "nameZh": "纯色白澄雨衣",
    "price": 64,
    "categories": [
      "raincoat"
    ],
    "description": "A clean ivory rain layer designed for quiet days, cloudy walks, and elevated everyday styling.",
    "images": [
      "/products/ivory-pure-raincoat/01.jpeg",
      "/products/ivory-pure-raincoat/02.jpeg",
      "/products/ivory-pure-raincoat/03.jpeg",
      "/products/ivory-pure-raincoat/04.jpeg",
      "/products/ivory-pure-raincoat/05.jpeg",
      "/products/ivory-pure-raincoat/06.jpeg",
      "/products/ivory-pure-raincoat/07.jpeg"
    ],
    "image": "/products/ivory-pure-raincoat/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": true,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Smooth rain shell with breathable lining",
      "fitNotes": "Clean straight cut with soft structure",
      "weatherUse": "Rain-ready for cloudy walks and light drizzle",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "lavender-rain-shell",
    "slug": "lavender-rain-shell",
    "name": "Lavender Rain Shell",
    "nameZh": "紫色雨衣",
    "price": 60,
    "categories": [
      "raincoat"
    ],
    "description": "A lavender rain shell with a matte finish and calm silhouette — weather-friendly, never loud.",
    "images": [
      "/products/lavender-rain-shell/01.jpeg",
      "/products/lavender-rain-shell/02.jpeg",
      "/products/lavender-rain-shell/03.jpeg"
    ],
    "image": "/products/lavender-rain-shell/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": false,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Matte rain shell with cotton lining",
      "fitNotes": "Minimal cut with clean back line",
      "weatherUse": "Water-repellent for light rain",
      "care": "Wipe clean; hand wash cold when needed",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "mint-lilac-wrap",
    "slug": "mint-lilac-wrap",
    "name": "Mint Lilac Wrap",
    "nameZh": "薄荷紫",
    "price": 58,
    "categories": [
      "accessories"
    ],
    "description": "A mint-lilac wrap with delicate color blocking — a soft spring layer for editorial everyday looks.",
    "images": [
      "/products/mint-lilac-wrap/01.jpeg",
      "/products/mint-lilac-wrap/02.jpeg",
      "/products/mint-lilac-wrap/03.jpeg",
      "/products/mint-lilac-wrap/04.jpeg",
      "/products/mint-lilac-wrap/05.jpeg",
      "/products/mint-lilac-wrap/06.jpeg",
      "/products/mint-lilac-wrap/07.jpeg"
    ],
    "image": "/products/mint-lilac-wrap/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Limited piece",
      "Soft luxury",
      "Editorial"
    ],
    "details": {
      "material": "Soft woven blend",
      "fitNotes": "Wrap-style fit with gentle overlap",
      "weatherUse": "Spring layering for mild weather",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "olive-field-raincoat",
    "slug": "olive-field-raincoat",
    "name": "Olive Field Raincoat",
    "nameZh": "军绿雨衣",
    "price": 68,
    "categories": [
      "raincoat"
    ],
    "description": "An olive rain layer with a relaxed field cut — rain-ready for park walks and soft outdoor mornings.",
    "images": [
      "/products/olive-field-raincoat/01.jpeg",
      "/products/olive-field-raincoat/02.jpeg",
      "/products/olive-field-raincoat/03.jpeg",
      "/products/olive-field-raincoat/04.jpeg",
      "/products/olive-field-raincoat/05.jpeg",
      "/products/olive-field-raincoat/06.jpeg",
      "/products/olive-field-raincoat/07.jpeg",
      "/products/olive-field-raincoat/08.png",
      "/products/olive-field-raincoat/09.png",
      "/products/olive-field-raincoat/10.png"
    ],
    "image": "/products/olive-field-raincoat/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": true,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Cotton-blend shell with water-repellent finish",
      "fitNotes": "Relaxed field cut with room for light layering",
      "weatherUse": "Rain-ready for light showers and damp walks",
      "care": "Spot clean; hand wash cold and lay flat to dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "panda-soft-knit",
    "slug": "panda-soft-knit",
    "name": "Panda Soft Knit",
    "nameZh": "熊猫",
    "price": 55,
    "categories": [
      "cats",
      "small-dogs"
    ],
    "description": "A monochrome soft knit with a gentle hand-feel — quiet luxury for cats and petite companions.",
    "images": [
      "/products/panda-soft-knit/01.jpeg",
      "/products/panda-soft-knit/02.jpeg",
      "/products/panda-soft-knit/03.png",
      "/products/panda-soft-knit/04.jpeg",
      "/products/panda-soft-knit/05.jpeg",
      "/products/panda-soft-knit/06.jpeg",
      "/products/panda-soft-knit/07.jpeg"
    ],
    "image": "/products/panda-soft-knit/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Limited piece",
      "Soft luxury",
      "Editorial"
    ],
    "details": {
      "material": "Soft-touch knit blend",
      "fitNotes": "Easy stretch fit for cats and small dogs",
      "weatherUse": "Cozy layering for cool indoor and outdoor moments",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "peter-pan-collar",
    "slug": "peter-pan-collar",
    "name": "Peter Pan Collar Piece",
    "nameZh": "彼得潘",
    "price": 65,
    "categories": [
      "custom",
      "accessories"
    ],
    "description": "A storybook collar piece with hand-finished edges — a small bespoke accent for everyday wear.",
    "images": [
      "/products/peter-pan-collar/01.jpeg",
      "/products/peter-pan-collar/02.jpeg",
      "/products/peter-pan-collar/03.jpeg",
      "/products/peter-pan-collar/04.jpeg",
      "/products/peter-pan-collar/05.jpeg"
    ],
    "image": "/products/peter-pan-collar/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": false,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Bespoke",
      "Limited piece",
      "Hand-finished"
    ],
    "details": {
      "material": "Premium cotton with hand-finished edges",
      "fitNotes": "Custom sizing available — DM for measurements",
      "weatherUse": "Everyday accessory, not rainwear",
      "care": "Spot clean only",
      "shipping": "Bespoke lead time confirmed on Instagram"
    }
  },
  {
    "id": "quack-duck-custom",
    "slug": "quack-duck-custom",
    "name": "Quack Duck Custom Set",
    "nameZh": "噗鸡鸭",
    "price": 72,
    "categories": [
      "custom",
      "small-dogs"
    ],
    "description": "A playful bespoke set with quiet charm — made to order for companions who dress with personality.",
    "images": [
      "/products/quack-duck-custom/01.jpeg",
      "/products/quack-duck-custom/02.jpeg",
      "/products/quack-duck-custom/03.jpeg",
      "/products/quack-duck-custom/04.jpeg",
      "/products/quack-duck-custom/05.jpeg",
      "/products/quack-duck-custom/06.jpeg",
      "/products/quack-duck-custom/07.jpeg",
      "/products/quack-duck-custom/08.jpeg"
    ],
    "image": "/products/quack-duck-custom/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Bespoke",
      "Limited piece",
      "Hand-finished"
    ],
    "details": {
      "material": "Custom cotton blend with hand-finished trim",
      "fitNotes": "Made to order — share measurements via Instagram",
      "weatherUse": "Style-first piece for everyday wear",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Custom pieces ship in 7–14 business days"
    }
  },
  {
    "id": "sleeved-amber-trench",
    "slug": "sleeved-amber-trench",
    "name": "Sleeved Amber Trench",
    "nameZh": "带袖黄风衣",
    "price": 75,
    "categories": [
      "raincoat"
    ],
    "description": "A full-sleeve amber trench with clean lines — rainwear that reads refined, not utilitarian.",
    "images": [
      "/products/sleeved-amber-trench/01.jpeg",
      "/products/sleeved-amber-trench/02.jpeg",
      "/products/sleeved-amber-trench/03.jpeg",
      "/products/sleeved-amber-trench/04.jpeg",
      "/products/sleeved-amber-trench/05.jpeg",
      "/products/sleeved-amber-trench/06.jpeg",
      "/products/sleeved-amber-trench/07.jpeg",
      "/products/sleeved-amber-trench/08.jpeg",
      "/products/sleeved-amber-trench/09.jpeg"
    ],
    "image": "/products/sleeved-amber-trench/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": true,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Structured rain shell with cotton lining",
      "fitNotes": "Full-sleeve trench proportions with clean shoulder line",
      "weatherUse": "Rain-ready for walks and transit days",
      "care": "Hand wash cold; hang to dry away from direct heat",
      "shipping": "Ships within 3–5 business days from the US"
    }
  },
  {
    "id": "sleeveless-plum-vest",
    "slug": "sleeveless-plum-vest",
    "name": "Sleeveless Plum Rain Vest",
    "nameZh": "无袖紫黑雨衣",
    "price": 62,
    "categories": [
      "raincoat"
    ],
    "description": "A sleeveless plum vest with a sharp, minimal profile — easy layering for drizzle and damp sidewalks.",
    "images": [
      "/products/sleeveless-plum-vest/01.jpeg",
      "/products/sleeveless-plum-vest/02.jpeg",
      "/products/sleeveless-plum-vest/03.jpeg",
      "/products/sleeveless-plum-vest/04.jpeg",
      "/products/sleeveless-plum-vest/05.jpeg",
      "/products/sleeveless-plum-vest/06.jpeg"
    ],
    "image": "/products/sleeveless-plum-vest/01.jpeg",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "featured": true,
    "hero": false,
    "limited": true,
    "stock": 1,
    "tags": [
      "Water-repellent",
      "Lightweight",
      "Limited"
    ],
    "details": {
      "material": "Bonded shell with soft inner lining",
      "fitNotes": "Sleeveless vest cut for easy movement",
      "weatherUse": "Water-repellent for light rain and mist",
      "care": "Hand wash cold; lay flat to dry",
      "shipping": "Ships within 3–5 business days from the US"
    }
  }
] as Product[];

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
