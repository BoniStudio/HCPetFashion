import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");

const TEXT_EXT = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".ts",
  ".tsx",
  ".json",
  ".txt",
  ".xml",
  ".md",
]);

const FORBIDDEN = [
  /http:\/\/localhost/i,
  /http:\/\/127\.0\.0\.1/i,
  /https:\/\/localhost/i,
  /https:\/\/127\.0\.0\.1/i,
  /http:\/\/hcpetfashion\.red/i,
];

function isAllowedHttpInText(match, content) {
  if (/xmlns=['"]http:\/\//i.test(content)) return true;
  if (/schemas\.(sitemap|xml)/i.test(content)) return true;
  if (/react\.dev\/errors/i.test(content)) return true;
  if (/ns\.adobe\.com|purl\.org|cipa\.jp/i.test(match)) return true;
  return false;
}

function scanText(content, file) {
  const issues = [];
  const httpMatches = content.match(/http:\/\/[^\s"'<>]+/gi) ?? [];
  for (const m of httpMatches) {
    if (!isAllowedHttpInText(m, content)) {
      issues.push({ file, issue: `insecure http URL: ${m}` });
    }
  }
  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) {
      issues.push({ file, issue: `forbidden pattern: ${pattern}` });
    }
  }
  if (/\blocalhost\b/i.test(content) && !file.includes("serve-docs")) {
    issues.push({ file, issue: "contains localhost reference" });
  }
  if (/\b127\.0\.0\.1\b/.test(content)) {
    issues.push({ file, issue: "contains 127.0.0.1 reference" });
  }
  return issues;
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      walk(full, files);
    } else {
      const ext = path.extname(full).toLowerCase();
      if (TEXT_EXT.has(ext)) files.push(full);
    }
  }
  return files;
}

let issues = [];

for (const file of walk(SRC)) {
  issues.push(...scanText(fs.readFileSync(file, "utf8"), path.relative(ROOT, file)));
}

for (const file of walk(PUBLIC)) {
  issues.push(...scanText(fs.readFileSync(file, "utf8"), path.relative(ROOT, file)));
}

for (const file of walk(DOCS)) {
  if (file.includes(`${path.sep}_next${path.sep}`)) continue;
  issues.push(...scanText(fs.readFileSync(file, "utf8"), path.relative(ROOT, file)));
}

issues = issues.filter(
  (item, i, arr) =>
    arr.findIndex((x) => x.file === item.file && x.issue === item.issue) === i
);

if (issues.length) {
  console.error("❌ Security verification failed:\n");
  for (const { file, issue } of issues) {
    console.error(`  ${file}: ${issue}`);
  }
  process.exit(1);
}

console.log(
  "✅ Security verification passed (no mixed-content URLs in site HTML/CSS/JS/source)"
);
