const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

admin.initializeApp();

// 티어 계층 (높을수록 상위)
const TIER_LEVELS = {
  free: 1,
  paid: 2,
  admin: 3,
};

// 보호 경로 설정 로드
// 빌드 시 scripts/extract-auth-routes.js 가 생성
function loadProtectedRoutes() {
  const routesPath = path.join(__dirname, "protected-routes.json");
  if (fs.existsSync(routesPath)) {
    return JSON.parse(fs.readFileSync(routesPath, "utf8"));
  }
  return {};
}

// 세션 쿠키로부터 사용자 검증
async function verifySession(req) {
  const sessionCookie = req.cookies?.__session;
  if (!sessionCookie) return null;

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    return decoded;
  } catch {
    return null;
  }
}

// 요청 경로에 필요한 최소 티어 반환
function getRequiredTier(requestPath) {
  const routes = loadProtectedRoutes();

  // 슬라이드는 기본 paid
  if (requestPath.startsWith("/slides/")) {
    return routes["/slides/**"] || "paid";
  }

  // 정확한 경로 매칭
  for (const [pattern, tier] of Object.entries(routes)) {
    if (pattern === "/slides/**") continue;

    // /ko/courses/lmm/detail/ 형태의 경로 매칭
    // 패턴 끝에 ** 가 있으면 접두사 매칭
    const cleanPattern = pattern.replace(/\*\*$/, "");
    if (requestPath.startsWith(cleanPattern)) {
      return tier;
    }
  }

  return null; // 보호 불필요
}

// 사용자 티어 확인
function getUserTier(decodedToken) {
  return decodedToken?.tier || "free";
}

// 티어 접근 권한 확인
function hasAccess(userTier, requiredTier) {
  const userLevel = TIER_LEVELS[userTier] || 0;
  const requiredLevel = TIER_LEVELS[requiredTier] || 0;
  return userLevel >= requiredLevel;
}

// 로그인 페이지 HTML
function getLoginPageHtml(redirectUrl) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>로그인 - 코드컴포즈</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh;
      background: #f8f9fa;
      color: #333;
    }
    .login-card {
      background: white; border-radius: 12px; padding: 48px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      text-align: center; max-width: 400px; width: 90%;
    }
    h1 { font-size: 24px; margin-bottom: 8px; }
    p { color: #666; margin-bottom: 32px; font-size: 14px; }
    .google-btn {
      display: inline-flex; align-items: center; gap: 12px;
      padding: 12px 24px; border: 1px solid #ddd; border-radius: 8px;
      background: white; cursor: pointer; font-size: 15px;
      transition: box-shadow 0.2s;
    }
    .google-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
    .google-btn img { width: 20px; height: 20px; }
    .error { color: #d32f2f; margin-top: 16px; font-size: 13px; display: none; }
    .loading { display: none; margin-top: 16px; color: #666; }
  </style>
</head>
<body>
  <div class="login-card">
    <h1>코드컴포즈</h1>
    <p>이 콘텐츠에 접근하려면 로그인이 필요합니다.</p>
    <button class="google-btn" onclick="signInWithGoogle()">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google">
      Google로 로그인
    </button>
    <div class="loading" id="loading">로그인 중...</div>
    <div class="error" id="error"></div>
  </div>

  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"></script>
  <script>
    firebase.initializeApp({
      apiKey: "AIzaSyDhYcOsJ-IgCd1qY1Bwcpx-om43YjjpLPM",
      authDomain: "courses-web-6a6f8.firebaseapp.com",
      projectId: "courses-web-6a6f8"
    });

    async function signInWithGoogle() {
      const errorEl = document.getElementById("error");
      const loadingEl = document.getElementById("loading");
      errorEl.style.display = "none";
      loadingEl.style.display = "block";

      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const idToken = await result.user.getIdToken();

        // 서버에 세션 쿠키 생성 요청
        const response = await fetch("/__/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        if (response.ok) {
          window.location.href = "${redirectUrl}";
        } else {
          const data = await response.json();
          throw new Error(data.error || "세션 생성 실패");
        }
      } catch (err) {
        loadingEl.style.display = "none";
        errorEl.textContent = err.message || "로그인에 실패했습니다.";
        errorEl.style.display = "block";
      }
    }
  </script>
</body>
</html>`;
}

// 접근 거부 페이지 HTML
function getAccessDeniedHtml(requiredTier) {
  const tierNames = { free: "무료 회원", paid: "유료 회원", admin: "관리자" };
  const tierName = tierNames[requiredTier] || requiredTier;
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>접근 제한 - 코드컴포즈</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; background: #f8f9fa; color: #333;
    }
    .card {
      background: white; border-radius: 12px; padding: 48px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      text-align: center; max-width: 400px; width: 90%;
    }
    h1 { font-size: 24px; margin-bottom: 12px; }
    p { color: #666; margin-bottom: 24px; font-size: 14px; }
    a { color: #1a73e8; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h1>접근 제한</h1>
    <p>이 콘텐츠는 <strong>${tierName}</strong> 이상만 접근할 수 있습니다.</p>
    <a href="/">홈으로 돌아가기</a>
  </div>
</body>
</html>`;
}

// 메인 인증 미들웨어
exports.authMiddleware = functions.https.onRequest(async (req, res) => {
  cookieParser()(req, res, async () => {
    const requestPath = req.path;
    const requiredTier = getRequiredTier(requestPath);

    // 보호 불필요한 경로 → 정적 파일 직접 서빙
    if (!requiredTier) {
      return serveStaticFile(req, res);
    }

    const user = await verifySession(req);

    // 미인증 → 로그인 페이지
    if (!user) {
      return res.status(401).send(getLoginPageHtml(requestPath));
    }

    // 티어 확인
    const userTier = getUserTier(user);
    if (!hasAccess(userTier, requiredTier)) {
      return res.status(403).send(getAccessDeniedHtml(requiredTier));
    }

    // 인증 통과 → 정적 파일 서빙
    return serveStaticFile(req, res);
  });
});

// 정적 파일 서빙
function serveStaticFile(req, res) {
  let filePath = req.path;

  // 디렉토리 요청이면 index.html 추가
  if (filePath.endsWith("/")) {
    filePath += "index.html";
  }
  // 확장자 없으면 /index.html 추가
  if (!path.extname(filePath)) {
    filePath += "/index.html";
  }

  const fullPath = path.join(__dirname, "..", "public", filePath);

  if (fs.existsSync(fullPath)) {
    const ext = path.extname(fullPath);
    const contentTypes = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css",
      ".js": "application/javascript",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".woff2": "font/woff2",
    };
    res.set("Content-Type", contentTypes[ext] || "application/octet-stream");
    return res.send(fs.readFileSync(fullPath));
  }

  return res.status(404).send("Not found");
}

// 세션 쿠키 생성 엔드포인트
exports.sessionLogin = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: "ID token required" });
  }

  try {
    // 세션 쿠키 유효기간: 14일
    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    res.cookie("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    return res.json({ status: "success" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid ID token" });
  }
});
