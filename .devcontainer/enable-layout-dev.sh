#!/usr/bin/env bash
set -euo pipefail

cd /workspaces/courses

# 이미 replace가 있으면 스킵
if grep -q 'CodeCompose7/cc-layouts => ../cc-layouts' go.mod; then
  echo "[layout-dev] replace 이미 적용됨"
  exit 0
fi

cat <<'EOF' >> go.mod
replace github.com/CodeCompose7/cc-layouts => ../cc-layouts
EOF

hugo mod tidy
echo "[layout-dev] replace 추가 및 hugo mod tidy 완료"

