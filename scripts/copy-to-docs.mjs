import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const DOCS_DIR = path.join(ROOT, "docs");

if (!fs.existsSync(OUT_DIR)) {
  console.error("out/ not found. Run: npm run build");
  process.exit(1);
}

if (!fs.existsSync(path.join(OUT_DIR, "index.html"))) {
  console.error("out/index.html missing — build may have failed.");
  process.exit(1);
}

// Replace docs/ with fresh static export
if (fs.existsSync(DOCS_DIR)) {
  fs.rmSync(DOCS_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DOCS_DIR, { recursive: true });
fs.cpSync(OUT_DIR, DOCS_DIR, { recursive: true });

// GitHub Pages: disable Jekyll
fs.writeFileSync(path.join(DOCS_DIR, ".nojekyll"), "\n");

// Custom domain
fs.writeFileSync(path.join(DOCS_DIR, "CNAME"), "hcpetfashion.red\n");

console.log("Copied out/ → docs/");
console.log("Created docs/.nojekyll and docs/CNAME");
