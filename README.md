# Hugo Multi-language Tech Blog

택규의 기술 블로그 및 강의 소개 사이트

## 프로젝트 구조

```text
.
├── .devcontainer/          # VS Code devcontainer 설정
├── content/                # 마크다운 컨텐츠
│   ├── about.ko.md         # 한국어 소개 페이지
│   ├── about.en.md         # 영어 소개 페이지
│   └── posts/              # 블로그 글 및 강의 소개
│       ├── *.ko.md         # 한국어 글
│       └── *.en.md         # 영어 글
├── themes/                 # Hugo 테마 (설치 필요)
├── hugo.toml               # Hugo 설정 파일
└── README.md
```

## 시작하기

### 1. Devcontainer로 개발 환경 열기

VS Code에서:

1. 이 폴더를 열기
2. Command Palette (Ctrl+Shift+P) 열기
3. "Dev Containers: Reopen in Container" 선택

### 2. Hugo 테마 설치

```bash
# Congo 테마 설치
git init
git submodule add --depth=1 https://github.com/jpanther/congo.git themes/congo
```

### 3. 로컬 서버 실행

```bash
hugo server -D
```

브라우저에서 `http://localhost:1313` 접속

## 컨텐츠 작성

### 새 글 작성

```bash
# 한국어 블로그 글
hugo new posts/my-post.ko.md

# 영어 블로그 글
hugo new posts/my-post.en.md
```

### Front Matter 예시

**강의 글:**

```yaml
---
title: "쿠버네티스 기초 강의"
date: 2024-11-27
categories: ["강의"]
tags: ["쿠버네티스", "K3s", "DevOps"]
description: "쿠버네티스의 기초부터 실전까지"
---
```

**블로그 글:**

```yaml
---
title: "K3s 클러스터 구축하기"
date: 2024-11-27
categories: ["블로그"]
tags: ["쿠버네티스", "K3s", "실습"]
description: "경량 쿠버네티스 K3s로 클러스터 만들기"
---
```

## GitHub Pages 배포

### 1. GitHub Repository 생성

`yourusername.github.io` 이름으로 repository 생성

### 2. GitHub Actions 워크플로우 설정

`.github/workflows/hugo.yml` 파일 생성:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
          
      - name: Build
        run: hugo --minify
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 3. Repository 설정

1. Settings > Pages
2. Source: GitHub Actions 선택

### 4. Push & 배포

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

## 커스텀 도메인 연결 (선택)

1. 도메인 구매 (가비아, GoDaddy 등)
2. DNS 설정:

   ```text
   A Record:
   @ -> 185.199.108.153
   @ -> 185.199.109.153
   @ -> 185.199.110.153
   @ -> 185.199.111.153
   
   CNAME Record:
   www -> yourusername.github.io
   ```

3. GitHub Settings > Pages > Custom domain에 도메인 입력
4. `hugo.toml`의 `baseURL` 업데이트

## 댓글 시스템 (Giscus)

1. GitHub Discussions를 repository에 활성화
2. [https://giscus.app] 에서 설정 생성
3. `hugo.toml`에 설정 추가

## 유용한 명령어

```bash
# 새 글 작성
hugo new posts/title.ko.md

# 로컬 서버 (draft 포함)
hugo server -D

# 빌드 (public 폴더에 생성)
hugo

# 테마 업데이트
git submodule update --remote --merge
```

## 다음 단계

1. `hugo.toml`에서 본인 정보 수정
2. 테마 설치 및 커스터마이징
3. About 페이지 내용 업데이트
4. 첫 강의/블로그 글 작성
5. GitHub에 push하여 배포

## 참고 자료

- [Hugo 공식 문서](https://gohugo.io/documentation/)
- [Congo 테마 문서](https://github.com/jpanther/congo)
- [Congo 테마 데모](https://themes.gohugo.io/themes/congo/)
- [Hugo 테마 갤러리](https://themes.gohugo.io/)
