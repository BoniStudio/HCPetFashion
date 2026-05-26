import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DEST = path.join(ROOT, "public", "brand", "logo.png");

const logoFile = fs
  .readdirSync(ROOT)
  .find(
    (n) =>
      n.toLowerCase().includes("logo") ||
      (n.includes("品牌") && n.endsWith(".png"))
  );

if (!logoFile) {
  console.warn("⚠ Logo file not found in project root");
  process.exit(0);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.copyFileSync(path.join(ROOT, logoFile), DEST);
console.log(`Copied ${logoFile} → public/brand/logo.png`);
