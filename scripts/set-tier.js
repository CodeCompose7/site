#!/usr/bin/env node
/**
 * Firebase 사용자에게 티어(Custom Claims) 설정
 *
 * 사용법:
 *   node scripts/set-tier.js --email user@example.com --tier admin
 *   node scripts/set-tier.js --email user@example.com --tier paid
 *   node scripts/set-tier.js --email user@example.com --tier free
 *   node scripts/set-tier.js --email user@example.com --show    (현재 티어 확인)
 *
 * 사전 요구:
 *   - GOOGLE_APPLICATION_CREDENTIALS 환경변수에 서비스 계정 키 JSON 경로 설정
 *   - 또는 Firebase CLI로 로그인된 상태
 */

const admin = require("firebase-admin");

// 서비스 계정 키 자동 탐색
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const VALID_TIERS = ["free", "paid", "admin"];

async function main() {
  const args = process.argv.slice(2);
  const emailIdx = args.indexOf("--email");
  const tierIdx = args.indexOf("--tier");
  const showFlag = args.includes("--show");

  if (emailIdx === -1 || args[emailIdx + 1] === undefined) {
    console.error("Usage: node set-tier.js --email <email> --tier <free|paid|admin>");
    console.error("       node set-tier.js --email <email> --show");
    process.exit(1);
  }

  const email = args[emailIdx + 1];

  // 사용자 조회
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
  } catch (err) {
    console.error(`User not found: ${email}`);
    process.exit(1);
  }

  console.log(`User: ${user.displayName || user.email} (${user.uid})`);

  // --show: 현재 티어 표시
  if (showFlag) {
    const claims = user.customClaims || {};
    console.log(`Current tier: ${claims.tier || "(none - defaults to free)"}`);
    process.exit(0);
  }

  // --tier: 티어 설정
  if (tierIdx === -1 || args[tierIdx + 1] === undefined) {
    console.error("--tier is required. Use: free, paid, or admin");
    process.exit(1);
  }

  const tier = args[tierIdx + 1];
  if (!VALID_TIERS.includes(tier)) {
    console.error(`Invalid tier: ${tier}. Must be one of: ${VALID_TIERS.join(", ")}`);
    process.exit(1);
  }

  await admin.auth().setCustomUserClaims(user.uid, { tier });
  console.log(`Tier set to: ${tier}`);
  console.log("Note: The user needs to re-login for the new tier to take effect.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
