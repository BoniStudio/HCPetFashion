/* AUTO-GENERATED — run: npm run generate-products */
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

export const products: Product[] = [
  {
    "id": "baker-street-trench",
    "slug": "baker-street-trench",
    "name": "Baker Street Trench",
    "nameZh": "贝克街",
    "price": 76,
    "categories": [
      "fashion",
      "custom"
    ],
    "description": "Detective-inspired trench with bespoke touches and urban sophistication.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
    }
  },
  {
    "id": "british-stroll-harness",
    "slug": "british-stroll-harness",
    "name": "British Stroll Harness",
    "nameZh": "英伦漫步",
    "price": 78,
    "categories": [
      "fashion"
    ],
    "description": "Heritage-inspired walking harness with tailored British proportions.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
    }
  },
  {
    "id": "citrus-grove-cape",
    "slug": "citrus-grove-cape",
    "name": "Citrus Grove Cape",
    "nameZh": "橘子海",
    "price": 70,
    "categories": [
      "fashion"
    ],
    "description": "Editorial cape with warm citrus tones and fluid drape for city strolls.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
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
    "description": "Lightweight waterproof shell tailored for small breeds with playful charm.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
    }
  },
  {
    "id": "heritage-british-cape",
    "slug": "heritage-british-cape",
    "name": "Heritage British Cape",
    "nameZh": "英伦风",
    "price": 80,
    "categories": [
      "fashion"
    ],
    "description": "Classic British styling with wool-blend texture and understated elegance.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
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
    "description": "Clean ivory raincoat with seamless lines and quiet sophistication.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
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
    "description": "Minimal lavender rain shell with matte waterproof coating.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
    }
  },
  {
    "id": "mint-lilac-wrap",
    "slug": "mint-lilac-wrap",
    "name": "Mint Lilac Wrap",
    "nameZh": "薄荷紫",
    "price": 58,
    "categories": [
      "fashion"
    ],
    "description": "Soft mint-lilac wrap with delicate layering for spring editorial looks.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
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
    "description": "Water-resistant olive raincoat with structured silhouette for outdoor adventures.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
    }
  },
  {
    "id": "panda-soft-knit",
    "slug": "panda-soft-knit",
    "name": "Panda Soft Knit",
    "nameZh": "熊猫",
    "price": 55,
    "categories": [
      "fashion",
      "small-dogs"
    ],
    "description": "Ultra-soft knit with monochrome palette — cozy luxury for petite pets.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
    }
  },
  {
    "id": "peter-pan-collar",
    "slug": "peter-pan-collar",
    "name": "Peter Pan Custom Collar",
    "nameZh": "彼得潘",
    "price": 65,
    "categories": [
      "custom"
    ],
    "description": "Hand-finished custom collar piece inspired by timeless storytelling.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
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
      "fashion"
    ],
    "description": "Playful bespoke ensemble with artisan detailing for statement-making companions.",
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
    "tags": [
      "Handcrafted",
      "Limited run",
      "Soft luxury"
    ],
    "details": {
      "fabric": "Premium cotton blend with soft-touch finish.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": false
    }
  },
  {
    "id": "sleeved-amber-trench",
    "slug": "sleeved-amber-trench",
    "name": "Sleeved Amber Trench",
    "nameZh": "带袖黄风衣",
    "price": 75,
    "categories": [
      "raincoat",
      "fashion"
    ],
    "description": "Full-sleeve amber trench with premium finish and refined tailoring.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
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
    "description": "Sleeveless plum-and-charcoal vest with bonded seams for wet weather.",
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
    "tags": [
      "Waterproof",
      "Outdoor-ready",
      "Premium fabric"
    ],
    "details": {
      "fabric": "Bonded waterproof shell with breathable cotton lining.",
      "care": "Hand wash cold. Lay flat to dry. Do not bleach.",
      "waterproof": true
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
