# Code Compose 강의 및 기술 사이트

코드컴포즈 기술 블로그 및 강의 소개 사이트

```bash
# 로컬 개발용 (baseURL 오버라이드)
hugo server -D --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313
```

## 프로젝트 구조

```text
.
├── .devcontainer/          # VS Code devcontainer 설정
├── assets/                 # 커스텀 스타일, 이미지 등
│   ├── css/
│   └── img/
├── content/                # 마크다운 컨텐츠
│   ├── _index.ko.md        # 한국어 홈
│   ├── _index.en.md        # 영어 홈
│   ├── about.ko.md         # 한국어 소개 페이지
│   ├── about.en.md         # 영어 소개 페이지
│   ├── blog/               # 블로그 글
│   │   ├── _index.*.md
│   │   └── *.ko.md / *.en.md
│   └── courses/            # 강의 소개
│       ├── _index.*.md
│       └── *.ko.md / *.en.md
├── layouts/                # 커스텀 레이아웃 (Congo 테마 확장)
├── themes/
│   └── congo/              # Hugo 테마 (이미 포함됨)
├── hugo.toml               # Hugo 설정 파일
└── README.md
```

## 시작하기

### 1. Devcontainer로 개발 환경 열기

VS Code에서:

1. 이 폴더를 열기
2. Command Palette (Ctrl+Shift+P) 열기
3. "Dev Containers: Reopen in Container" 선택

### 2. Hugo 테마 확인

이 템플릿에는 `themes/congo` 디렉터리에 Congo 테마가 **이미 포함**되어 있습니다.

별도의 새 Hugo 프로젝트를 만들고 이 README만 참고해서 Congo 테마를 추가하고 싶다면, 아래 예시처럼 submodule을 사용할 수 있습니다:

```bash
# (새 프로젝트에서만) Congo 테마를 submodule로 추가
git submodule add --depth=1 https://github.com/jpanther/congo.git themes/congo
```

### 3. 로컬 서버 실행

```bash
# 로컬 개발용 (baseURL 오버라이드)
hugo server -D --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313
```

```bash
# 로컬 개발용 (baseURL 오버라이드) - Draft 제외
hugo server --bind 0.0.0.0 --port 1313 --baseURL http://localhost:1313
```

자동 실행을 하려면, `start-hugo.sh` 파일의 `로컬 개발용 baseURL 오버라이드` 부분을 주석 해제하세요.

또는 환경 변수 사용:

```bash
HUGO_BASEURL=http://localhost:1313 hugo server -D
```

브라우저에서 `http://localhost:1313` 접속

> **참고**: `hugo.toml`의 `baseURL`은 프로덕션용 커스텀 도메인  
> `https://courses.codecompose.net/` 으로 설정되어 있습니다.  
> 로컬 개발 시에는 위 명령어처럼 `--baseURL http://localhost:1313` 옵션이나  
> `HUGO_BASEURL` 환경 변수로 **반드시 오버라이드**해야 정상적으로 작동합니다.

## 컨텐츠 작성

### 새 글 작성

이 프로젝트는 **블로그(`blog`) 섹션**과 **강의(`courses`) 섹션**을 분리해서 운영합니다.

```bash
# 한국어 블로그 글
hugo new blog/my-post.ko.md

# 영어 블로그 글
hugo new blog/my-post.en.md

# 한국어 강의 소개 페이지
hugo new courses/my-course.ko.md

# 영어 강의 소개 페이지
hugo new courses/my-course.en.md
```

### 다른 글로 링크 걸기 (참조)

Hugo에서는 **shortcode 링크**를 이용해서 다른 컨텐츠를 안정적으로 참조할 수 있습니다.  
파일 경로 기준으로 `relref`를 쓰는 것을 추천합니다.

```markdown
다음 글도 함께 보세요:

- [트랜스포머 논문 리뷰]({{< relref "blog/transformer-review.ko.md" >}})
- [딥러닝 입문 강의 소개]({{< relref "courses/deeplearning-course.ko.md" >}})
```

- **한국어 글에서 링크**: `.ko.md` 파일을 대상으로 `relref`를 사용  
  예) `{{< relref "blog/transformer-review.ko.md" >}}`  
- **영어 글에서 링크**: `.en.md` 파일을 대상으로 `relref`를 사용  
  예) `{{< relref "blog/transformer-review.en.md" >}}`

`relref`를 사용하면:

- 언어별 서브 경로(`/ko/`, `/en/`)와 `baseURL`이 자동으로 반영되고,
- 나중에 슬러그나 URL 구조를 바꿔도 **링크를 일일이 수정할 필요가 없습니다.**

### Front Matter 예시

**강의 글(`content/courses/`):**

```yaml
---
title: "쿠버네티스 기초 강의"
date: 2024-11-27
categories: ["ai-learning"]          # 예: content/courses/categories/ai-learning/
tags: ["쿠버네티스", "K3s", "DevOps"]
description: "쿠버네티스의 기초부터 실전까지"
---
```

**블로그 글(`content/blog/`):**

```yaml
---
title: "K3s 클러스터 구축하기"
date: 2024-11-27
categories: ["paper-review"]         # 예: content/blog/categories/paper-review/
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
4. 이 프로젝트에서는 `hugo.toml`의 `baseURL`을 커스텀 도메인(`https://courses.codecompose.net/`)으로 고정해 두고,  
   로컬 개발 및 프리뷰 환경에서만 `--baseURL`/`HUGO_BASEURL`로 오버라이드하는 방식을 사용합니다.

## 댓글 시스템 (Giscus)

1. GitHub Discussions를 repository에 활성화
2. [https://giscus.app] 에서 설정 생성
3. `hugo.toml`에 설정 추가

## 유용한 명령어

```bash
# 새 글 작성 (예시)
hugo new blog/title.ko.md

# 로컬 서버 (draft 포함, baseURL 오버라이드)
hugo server -D --baseURL http://localhost:1313

# 빌드 (public 폴더에 생성, 프로덕션용)
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
