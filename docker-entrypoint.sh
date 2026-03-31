#!/bin/sh
set -e

# Slidev 슬라이드 빌드 (slides/ 하위 프로젝트)
for dir in /src/slides/*/; do
  if [ -f "$dir/package.json" ]; then
    name=$(basename "$dir")
    echo "==> Building slides: $name"
    cd "$dir"
    npm install --prefer-offline 2>/dev/null || npm install
    npx slidev build --base "/slides/$name/" --out "/src/static/slides/$name/"
    # SPA 폴백: 새로고침 시 index.html로 라우팅 (GitHub Pages용)
    cp "/src/static/slides/$name/index.html" "/src/static/slides/$name/404.html"
    echo "==> Slides $name → static/slides/$name/ (+ 404.html)"
    cd /src
  fi
done

# Hugo 실행 (CMD로 전달된 인자 사용)
echo "==> Starting Hugo..."
exec hugo "$@"
