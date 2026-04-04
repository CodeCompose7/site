#!/usr/bin/env node
/**
 * Slidev 빌드 결과물 (static/slides/index.html) 에
 * Firebase Auth 인증 스크립트를 삽입합니다.
 *
 * 사용법: node scripts/inject-slides-auth.js
 * (Slidev 빌드 후, Hugo 빌드 전에 실행)
 */

const fs = require("fs");
const path = require("path");

const SLIDES_DIR = path.join(__dirname, "..", "static", "slides");

const AUTH_SCRIPT = `
<style>
  #slides-auth-guard {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: #f8f9fa; z-index: 99999; font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  #slides-auth-guard .auth-card {
    background: white; border-radius: 12px; padding: 48px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    text-align: center; max-width: 400px; width: 90%;
  }
  #slides-auth-guard h2 { font-size: 24px; margin: 0 0 8px; color: #333; }
  #slides-auth-guard p { color: #666; margin: 0 0 24px; font-size: 14px; }
  #slides-auth-guard .google-btn {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 12px 24px; border: 1px solid #ddd; border-radius: 8px;
    background: white; cursor: pointer; font-size: 15px; color: #333;
  }
  #slides-auth-guard .google-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
  #slides-auth-guard .error { color: #d32f2f; margin-top: 16px; font-size: 13px; display: none; }
  #slides-auth-guard .denied p { margin-bottom: 16px; }
</style>
<div id="slides-auth-guard">
  <div class="auth-card">
    <div id="sa-loading"><p>인증 확인 중...</p></div>
    <div id="sa-login" style="display:none;">
      <h2>코드컴포즈</h2>
      <p>이 슬라이드에 접근하려면 로그인이 필요합니다.</p>
      <button class="google-btn" onclick="saSignIn()">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20">
        Google로 로그인
      </button>
      <div class="error" id="sa-error"></div>
    </div>
    <div id="sa-denied" class="denied" style="display:none;">
      <h2>접근 제한</h2>
      <p>이 슬라이드는 <strong>유료 회원</strong> 이상만 접근할 수 있습니다.</p>
      <button class="google-btn" onclick="saSignOut()">로그아웃</button>
    </div>
  </div>
</div>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js"><\/script>
<script>
(function() {
  var REQUIRED_TIER = "paid";
  var TIER_LEVELS = { "free": 1, "paid": 2, "admin": 3 };

  firebase.initializeApp({
    apiKey: "AIzaSyDhYcOsJ-IgCd1qY1Bwcpx-om43YjjpLPM",
    authDomain: "courses-web-6a6f8.firebaseapp.com",
    projectId: "courses-web-6a6f8"
  });

  var guard = document.getElementById("slides-auth-guard");
  var loadingDiv = document.getElementById("sa-loading");
  var loginDiv = document.getElementById("sa-login");
  var deniedDiv = document.getElementById("sa-denied");
  var errorDiv = document.getElementById("sa-error");

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      loadingDiv.style.display = "none";
      loginDiv.style.display = "block";
      return;
    }
    user.getIdTokenResult().then(function(tokenResult) {
      var userTier = (tokenResult.claims && tokenResult.claims.tier) || "free";
      var userLevel = TIER_LEVELS[userTier] || 0;
      var requiredLevel = TIER_LEVELS[REQUIRED_TIER] || 0;
      if (userLevel >= requiredLevel) {
        guard.remove();
      } else {
        loadingDiv.style.display = "none";
        deniedDiv.style.display = "block";
      }
    });
  });

  window.saSignIn = function() {
    errorDiv.style.display = "none";
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function(err) {
      errorDiv.textContent = err.message || "로그인에 실패했습니다.";
      errorDiv.style.display = "block";
    });
  };
  window.saSignOut = function() {
    firebase.auth().signOut().then(function() { location.reload(); });
  };
})();
<\/script>
`;

function injectAuth() {
  if (!fs.existsSync(SLIDES_DIR)) {
    console.log("static/slides/ not found — skipping.");
    return;
  }

  let count = 0;
  for (const entry of fs.readdirSync(SLIDES_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const indexPath = path.join(SLIDES_DIR, entry.name, "index.html");
    if (!fs.existsSync(indexPath)) continue;

    let html = fs.readFileSync(indexPath, "utf8");

    // 이미 주입된 경우 스킵
    if (html.includes("slides-auth-guard")) {
      console.log(`  [skip] ${entry.name}/index.html (already injected)`);
      continue;
    }

    // <body> 태그 바로 뒤에 삽입
    html = html.replace("<body>", "<body>" + AUTH_SCRIPT);
    fs.writeFileSync(indexPath, html, "utf8");

    // 404.html에도 동일 적용
    const fallbackPath = path.join(SLIDES_DIR, entry.name, "404.html");
    if (fs.existsSync(fallbackPath)) {
      let fallbackHtml = fs.readFileSync(fallbackPath, "utf8");
      if (!fallbackHtml.includes("slides-auth-guard")) {
        fallbackHtml = fallbackHtml.replace("<body>", "<body>" + AUTH_SCRIPT);
        fs.writeFileSync(fallbackPath, fallbackHtml, "utf8");
      }
    }

    count++;
    console.log(`  [injected] ${entry.name}/index.html + 404.html`);
  }

  console.log(`\nDone! Injected auth into ${count} slide(s).`);
}

injectAuth();
