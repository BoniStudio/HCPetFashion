import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const DOCS_DIR = path.join(ROOT, "docs");

const REQUIRED_MARKERS = [
  "HC Pet Fashion",
  "Rainwear for",
  "Little Storms",
  "Cyber Boutique",
];

const FORBIDDEN_MARKERS = [
  "快速开始",
  "GitHub Pages 部署",
  "Deploy from a branch",
  "项目结构",
  "npm install",
  "轻奢宠物时尚独立站 — Next.js",
];

function validateSiteHtml(html, file) {
  for (const marker of REQUIRED_MARKERS) {
    if (!html.includes(marker)) {
      throw new Error(`${file} missing required content: "${marker}"`);
    }
  }
  for (const marker of FORBIDDEN_MARKERS) {
    if (html.includes(marker)) {
      throw new Error(`${file} looks like README/docs — found: "${marker}"`);
    }
  }
}

function assertFile(relPath) {
  const full = path.join(DOCS_DIR, relPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required page: docs/${relPath}`);
  }
}

if (!fs.existsSync(OUT_DIR)) {
  console.error("❌ out/ not found. Run: npm run generate-products && next build");
  process.exit(1);
}

const outIndex = path.join(OUT_DIR, "index.html");
if (!fs.existsSync(outIndex)) {
  console.error("❌ out/index.html missing — Next.js static export failed.");
  process.exit(1);
}

const outHtml = fs.readFileSync(outIndex, "utf8");
validateSiteHtml(outHtml, "out/index.html");

// Wipe docs/ completely — never merge with old README/markdown
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });

// Copy ONLY Next.js export output
fs.cpSync(OUT_DIR, DOCS_DIR, { recursive: true, filter: (src) => {
  const base = path.basename(src);
  if (base === "README.md" || base.endsWith(".md")) return false;
  return true;
}});

// GitHub Pages requirements
fs.writeFileSync(path.join(DOCS_DIR, ".nojekyll"), "");
fs.writeFileSync(path.join(DOCS_DIR, "CNAME"), "hcpetfashion.red\n");

// Validate copied site
const docsIndex = path.join(DOCS_DIR, "index.html");
validateSiteHtml(fs.readFileSync(docsIndex, "utf8"), "docs/index.html");

assertFile("shop/index.html");
assertFile("contact/index.html");
assertFile("cart/index.html");
const cssDir = path.join(DOCS_DIR, "_next", "static", "css");
if (!fs.existsSync(cssDir) || fs.readdirSync(cssDir).length === 0) {
  throw new Error("Missing docs/_next/static/css — JS/CSS assets not exported");
}

console.log("✅ Copied out/ → docs/");
console.log("✅ docs/index.html is the pet store homepage");
console.log("✅ docs/.nojekyll and docs/CNAME created");
