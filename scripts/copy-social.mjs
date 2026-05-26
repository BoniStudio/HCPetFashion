import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "Instagram", "HCPet_Ins.png");
const DEST = path.join(ROOT, "public", "social", "HCPet_Ins.png");

if (!fs.existsSync(SRC)) {
  console.warn("⚠ Instagram/HCPet_Ins.png not found — skip social copy");
  process.exit(0);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.copyFileSync(SRC, DEST);
console.log("Copied Instagram QR → public/social/HCPet_Ins.png");
