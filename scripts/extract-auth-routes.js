#!/usr/bin/env node
/**
 * Hugo 콘텐츠의 front matter에서 auth 필드를 추출하여
 * 1) functions/protected-routes.json 생성
 * 2) firebase.json의 rewrites 업데이트
 *
 * 사용법: node scripts/extract-auth-routes.js
 */

const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "content");
const FIREBASE_JSON = path.join(__dirname, "..", "firebase.json");
const PROTECTED_ROUTES_JSON = path.join(
  __dirname,
  "..",
  "functions",
  "protected-routes.json"
);

// front matter 파싱 (YAML 간이 파서 — auth와 url 필드만 추출)
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const fm = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.+)/);
    if (kv) {
      fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
    }
  }
  return fm;
}

// content 파일 경로에서 Hugo URL 추론
function inferUrl(filePath, frontMatter) {
  // front matter에 url이 명시되어 있으면 그대로 사용
  if (frontMatter.url) {
    return frontMatter.url;
  }

  // 파일 경로에서 추론
  const rel = path.relative(CONTENT_DIR, filePath);
  // content/courses/lmm_detail/index.ko.md → /ko/courses/lmm_detail/
  // content/courses/devops.ko.md → /ko/courses/devops/

  // 언어 코드 추출
  const langMatch = rel.match(/\.(\w{2})\.md$/);
  const lang = langMatch ? langMatch[1] : "ko";

  let urlPath = rel
    .replace(/\.(\w{2})\.md$/, "") // 언어 접미사 제거
    .replace(/\/index$/, "") // index 파일 제거
    .replace(/\\/g, "/"); // Windows 경로 처리

  return `/${lang}/${urlPath}/`;
}

// 모든 md 파일에서 auth 경로 수집
function collectAuthRoutes() {
  const routes = {};

  function scanDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith(".md")) {
        const content = fs.readFileSync(fullPath, "utf8");
        const fm = parseFrontMatter(content);
        if (fm.auth) {
          const url = inferUrl(fullPath, fm);
          routes[url + "**"] = fm.auth;
          console.log(`  [auth:${fm.auth}] ${url}`);
        }
      }
    }
  }

  scanDir(CONTENT_DIR);
  return routes;
}

// firebase.json 업데이트
function updateFirebaseJson(authRoutes) {
  const config = JSON.parse(fs.readFileSync(FIREBASE_JSON, "utf8"));

  // 기존 rewrites에서 고정 항목(slides, session) 유지
  const fixedRewrites = config.hosting.rewrites.filter(
    (r) =>
      r.source === "/slides/**" || r.source === "/__/auth/session"
  );

  // auth 경로에서 동적 rewrites 생성
  const authRewrites = Object.keys(authRoutes).map((source) => ({
    source,
    function: {
      functionId: "authMiddleware",
      region: "asia-northeast3",
    },
  }));

  // 고정 항목 먼저, auth 경로 그 뒤
  config.hosting.rewrites = [...fixedRewrites, ...authRewrites];

  fs.writeFileSync(FIREBASE_JSON, JSON.stringify(config, null, 2) + "\n");
  console.log(`\nfirebase.json updated (${config.hosting.rewrites.length} rewrites)`);
}

// protected-routes.json 생성
function writeProtectedRoutes(authRoutes) {
  // slides 기본 포함
  const allRoutes = {
    "/slides/**": "paid",
    ...authRoutes,
  };

  fs.writeFileSync(
    PROTECTED_ROUTES_JSON,
    JSON.stringify(allRoutes, null, 2) + "\n"
  );
  console.log(
    `functions/protected-routes.json updated (${Object.keys(allRoutes).length} routes)`
  );
}

// 실행
console.log("Extracting auth routes from content...\n");
const authRoutes = collectAuthRoutes();

if (Object.keys(authRoutes).length === 0) {
  console.log("\nNo auth-protected pages found.");
} else {
  console.log(`\nFound ${Object.keys(authRoutes).length} protected page(s).`);
}

updateFirebaseJson(authRoutes);
writeProtectedRoutes(authRoutes);
console.log("\nDone!");
