import fs from "fs";

const html = fs.readFileSync("out/index.html", "utf8");
const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
const productSrcs = srcs.filter((s) => s.includes("product"));
console.log("Product image src samples:");
[...new Set(productSrcs)].slice(0, 8).forEach((s) => console.log(s));

const bad = productSrcs.filter(
  (s) => s.startsWith("/products/") && !s.startsWith("/HCPetFashion/")
);
console.log("\nMissing basePath count:", bad.length);
if (bad.length) console.log("Example:", bad[0]);

const links = [...html.matchAll(/href="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => !s.startsWith("http") && !s.includes("_next"));
console.log("\nLink href samples:");
[...new Set(links)].slice(0, 10).forEach((s) => console.log(s));
