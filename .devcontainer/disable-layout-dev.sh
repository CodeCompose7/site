#!/usr/bin/env bash
set -euo pipefail

cd /workspaces/courses

# replace가 있을 때만 제거
if ! grep -q '^replace github.com/CodeCompose7/cc-layouts => ../cc-layouts$' go.mod; then
  echo "[layout-disable] 제거할 replace 없음"
  exit 0
fi

# 해당 replace 라인 삭제
tmpfile=$(mktemp)
grep -v '^replace github.com/CodeCompose7/cc-layouts => ../cc-layouts$' go.mod > "$tmpfile"
mv "$tmpfile" go.mod

hugo mod tidy
echo "[layout-disable] replace 제거 및 hugo mod tidy 완료"

