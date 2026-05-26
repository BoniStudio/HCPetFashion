import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PRODUCTS_DIR = path.join(ROOT, "public", "products");
const REPORT_PATH = path.join(ROOT, "IMAGE_OPTIMIZATION_REPORT.md");
const BACKUP_DIR = path.join(ROOT, "public", "products-backup");

const MB = 1024 * 1024;
const APPLY = process.argv.includes("--apply");

function formatSize(bytes) {
  if (bytes >= MB) return `${(bytes / MB).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.warn("sharp not installed — report only. Run: npm install sharp");
  }

  const files = walk(PRODUCTS_DIR);
  const rows = [];
  let optimized = 0;

  for (const file of files) {
    const stat = fs.statSync(file);
    const rel = path.relative(ROOT, file);
    const isHero = /01\.(jpe?g|png|webp)$/i.test(file);
    const maxWidth = isHero ? 2000 : 1400;
    const targetMax = isHero ? MB : 500 * 1024;

    let after = stat.size;
    let note = stat.size > MB ? "Compress recommended" : "OK";

    if (APPLY && sharp && stat.size > 500 * 1024) {
      const backupTarget = path.join(BACKUP_DIR, path.relative(PRODUCTS_DIR, file));
      fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
      if (!fs.existsSync(backupTarget)) {
        fs.copyFileSync(file, backupTarget);
      }

      const ext = path.extname(file).toLowerCase();
      let pipeline = sharp(file).rotate().resize({
        width: maxWidth,
        withoutEnlargement: true,
      });

      if (ext === ".png") {
        pipeline = pipeline.png({ quality: 82, compressionLevel: 9 });
      } else if (ext === ".webp") {
        pipeline = pipeline.webp({ quality: 82 });
      } else {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
      }

      const buf = await pipeline.toBuffer();
      if (buf.length < stat.size) {
        fs.writeFileSync(file, buf);
        after = buf.length;
        optimized++;
        note = "Optimized in place";
      }
    }

    rows.push({
      rel,
      before: stat.size,
      after,
      note: after > targetMax && note === "OK" ? "Still large — review manually" : note,
    });
  }

  const report = [
    "# Image Optimization Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    APPLY
      ? `Applied optimizations to ${optimized} file(s). Backups in \`public/products-backup/\`.`
      : "Report only. Run `npm run optimize-images -- --apply` to compress in place (with backup).",
    "",
    "| File | Before | After | Note |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (r) =>
        `| ${r.rel} | ${formatSize(r.before)} | ${formatSize(r.after)} | ${r.note} |`
    ),
    "",
    "## Targets",
    "- Card images: < 500 KB",
    "- Hero / primary images: < 1 MB",
    "",
  ].join("\n");

  fs.writeFileSync(REPORT_PATH, report, "utf8");
  console.log(`Wrote ${REPORT_PATH} (${rows.length} files)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
