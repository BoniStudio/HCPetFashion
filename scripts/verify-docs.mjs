import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.join(__dirname, "..", "docs");

const checks = [
  { file: "index.html", must: ["HC Pet Fashion", "Rainwear for", "Shop", "Cart"] },
  { file: "shop/index.html", must: ["Collection", "Limited pet fashion"] },
  { file: "contact/index.html", must: ["Contact"] },
  { file: "cart/index.html", must: ["Cart"] },
];

let ok = true;

for (const { file, must } of checks) {
  const full = path.join(DOCS, file);
  if (!fs.existsSync(full)) {
    console.error(`❌ Missing docs/${file}`);
    ok = false;
    continue;
  }
  const html = fs.readFileSync(full, "utf8");
  for (const m of must) {
    if (!html.includes(m)) {
      console.error(`❌ docs/${file} missing "${m}"`);
      ok = false;
    }
  }
  if (html.includes("快速开始") || html.includes("GitHub Pages 部署")) {
    console.error(`❌ docs/${file} contains README content`);
    ok = false;
  }
  if (html.includes("/HCPetFashion/")) {
    console.error(`❌ docs/${file} still uses /HCPetFashion/ paths (custom domain needs root paths)`);
    ok = false;
  }
}

const indexHtml = fs.readFileSync(path.join(DOCS, "index.html"), "utf8");
if (!indexHtml.includes("/_next/static/css/")) {
  console.error("❌ docs/index.html missing /_next/static/css/ stylesheet path");
  ok = false;
}
if (indexHtml.includes("/HCPetFashion/_next/")) {
  console.error("❌ docs/index.html CSS/JS still prefixed with /HCPetFashion/");
  ok = false;
}

const cnamePath = path.join(DOCS, "CNAME");
if (!fs.existsSync(cnamePath)) {
  console.error("❌ Missing docs/CNAME");
  ok = false;
} else {
  const cname = fs.readFileSync(cnamePath, "utf8").trim();
  if (cname !== "hcpetfashion.red") {
    console.error(`❌ docs/CNAME should be "hcpetfashion.red", got "${cname}"`);
    ok = false;
  }
}

if (!fs.existsSync(path.join(DOCS, ".nojekyll"))) {
  console.error("❌ Missing docs/.nojekyll");
  ok = false;
}

if (!ok) process.exit(1);
console.log("✅ All docs/ verification checks passed (root paths, custom domain ready)");
