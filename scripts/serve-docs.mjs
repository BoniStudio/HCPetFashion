/**
 * Serve docs/ at http://localhost:5080/HCPetFashion/
 * (simulates GitHub Pages project site URL)
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.join(__dirname, "..", "docs");
const BASE = "/HCPetFashion";
const PORT = 5080;

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  let url = req.url?.split("?")[0] ?? "/";

  if (url === BASE || url === `${BASE}/`) {
    url = "/index.html";
  } else if (url.startsWith(BASE)) {
    url = url.slice(BASE.length) || "/index.html";
  } else if (url === "/") {
    res.writeHead(302, { Location: `${BASE}/` });
    res.end();
    return;
  } else {
    res.writeHead(404).end("Use " + BASE + "/");
    return;
  }

  if (url.endsWith("/")) url += "index.html";

  const filePath = path.join(DOCS, url);
  if (!filePath.startsWith(DOCS) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404).end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Serving docs at http://localhost:${PORT}${BASE}/`);
});
